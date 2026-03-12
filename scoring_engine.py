from database.init import get_db_connection

HARD_RULES = {
    "pm-kisan": lambda f: (
        f["is_income_tax_payer"] or
        f["is_government_employee"] or
        f["is_pensioner_above_10k"] or
        f["land_hectares"] > 2.0 or
        f["land_ownership"] == "landless"
    ),
    "pm-kmy": lambda f: (
        f["age"] < 18 or f["age"] > 40 or
        f["land_hectares"] > 2.0 or
        f["is_income_tax_payer"]
    ),
    "pmfby": lambda f: f["land_ownership"] == "landless",
    "kcc": lambda f: f["land_ownership"] == "landless",
    "rythu bandhu": lambda f: (
        f["state"] != "Telangana" or
        f["land_ownership"] != "owner" or
        not f["has_land_records"]
    ),
    "ysr rythu bharosa": lambda f: (
        f["state"] != "Andhra Pradesh" or
        not f["has_aadhaar"]
    ),
    "kalia": lambda f: (
        f["state"] != "Odisha" or
        (f["land_hectares"] > 2.0 and f["land_ownership"] != "landless")
    ),
    "kisan kalyan": lambda f: (
        f["state"] != "Madhya Pradesh" or
        not f["is_pm_kisan_beneficiary"]
    ),
    "kisan nyay": lambda f: f["state"] != "Chhattisgarh",
    "accident welfare": lambda f: (
        f["state"] != "Uttar Pradesh" or
        f["age"] < 18 or f["age"] > 70
    ),
    "tractor grant": lambda f: f["land_ownership"] != "owner",
    "mini tractor": lambda f: f["state"] != "Maharashtra",
    "mechanization": lambda f: (
        f["state"] != "Maharashtra" or
        f["land_ownership"] != "owner" or
        not f["has_aadhaar"] or
        not f["has_land_records"]
    ),
    "sheep rearing": lambda f: (
        f["state"] != "Uttar Pradesh" or
        (f["land_hectares"] > 2.0 and f["land_ownership"] != "landless")
    ),
    "fencing": lambda f: (
        f["state"] != "Uttar Pradesh" or
        f["land_hectares"] > 2.0
    ),
    "drip, sprinkler": lambda f: (
        f["state"] != "Uttar Pradesh" or
        f["land_ownership"] != "owner"
    ),
}

def is_hard_fail(scheme_name: str, farmer: dict) -> bool:
    name_lower = scheme_name.lower()
    for key, rule in HARD_RULES.items():
        if key in name_lower:
            return rule(farmer)
    # For all remaining state-specific schemes
    # scheme.state already filtered by DB query
    return False

def calculate_score(scheme: dict, farmer: dict) -> int:
    score = 50
    name = scheme["scheme_name"].lower()
    eligibility = (scheme.get("eligibility") or "").lower()

    # Land size bonuses
    if farmer["land_hectares"] <= 1.0:
        score += 10
    elif farmer["land_hectares"] <= 2.0:
        score += 7

    # Boundary penalty
    if 1.8 <= farmer["land_hectares"] <= 2.0:
        score -= 10

    # Caste bonus (if scheme mentions SC/ST)
    if farmer["caste"] in ("SC", "ST") and any(
        x in eligibility for x in ["sc", "st", "scheduled"]
    ):
        score += 10

    # Gender bonus
    if farmer["gender"] == "female" and "women" in eligibility:
        score += 8

    # Irrigation bonus
    irrigation_schemes = ["sinchai", "irrigation", "drip", "sprinkler", 
                          "kusum", "pipeline"]
    if any(x in name for x in irrigation_schemes):
        if farmer.get("irrigation_type") in ("rainfed", "open_well", "none"):
            score += 10

    # Income bonus
    if farmer.get("annual_income_rs", 999999) <= 100000:
        score += 7

    # Document readiness bonus
    if farmer.get("has_aadhaar") and farmer.get("has_land_records"):
        score += 5

    # PM-KISAN beneficiary bonus
    if farmer.get("is_pm_kisan_beneficiary") and "pm-kisan" in eligibility:
        score += 8

    # Age bonus for pension scheme
    age = farmer.get("age", 0)
    if "maandhan" in name and 18 <= age <= 40:
        score += 5

    # No PM-KISAN penalty
    if "kisan kalyan" in name and not farmer.get("is_pm_kisan_beneficiary"):
        score -= 5

    return max(1, min(100, score))

def get_priority(score: int) -> str:
    if score >= 75: return "HIGH"
    if score >= 50: return "MEDIUM"
    return "LOW"

def recommend_schemes(farmer: dict) -> dict:
    conn = get_db_connection()
    cursor = conn.cursor()

    # Real-time DB query
    cursor.execute("""
        SELECT id, state, scheme_name, eligibility, 
               benefits, performance_metric, required_documents
        FROM schemes
        WHERE state = 'Nationwide' OR state = %s
        ORDER BY state
    """, (farmer["state"],))

    schemes = cursor.fetchall()
    cursor.close()
    conn.close()

    results = []
    for s in schemes:
        scheme = {
            "id": s[0], "state": s[1], "scheme_name": s[2],
            "eligibility": s[3], "benefits": s[4],
            "performance_metric": s[5], "required_documents": s[6] or []
        }

        if is_hard_fail(scheme["scheme_name"], farmer):
            continue

        score = calculate_score(scheme, farmer)
        results.append({
            "rank": 0,
            "scheme_id": scheme["id"],
            "scheme_name": scheme["scheme_name"],
            "state": scheme["state"],
            "score": score,
            "priority": get_priority(score),
            "benefit": scheme["benefits"],
            "eligibility_summary": scheme["eligibility"],
            "required_documents": scheme["required_documents"],
            "performance_metric": scheme["performance_metric"],
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    for i, r in enumerate(results):
        r["rank"] = i + 1

    return {
        "farmer_state": farmer["state"],
        "total_matched": len(results),
        "high_count": sum(1 for r in results if r["priority"] == "HIGH"),
        "medium_count": sum(1 for r in results if r["priority"] == "MEDIUM"),
        "low_count": sum(1 for r in results if r["priority"] == "LOW"),
        "results": results
    }
