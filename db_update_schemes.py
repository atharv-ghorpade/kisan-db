import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

async def main():
    db_url = os.getenv("DATABASE_URL", "postgresql://postgres:root@localhost:5432/kisan_db")
    db_url = db_url.replace("+asyncpg", "")
    conn = await asyncpg.connect(db_url)

    # Add columns if they don't exist
    await conn.execute('''
        ALTER TABLE schemes 
        ALTER COLUMN title DROP NOT NULL,
        ALTER COLUMN description DROP NOT NULL,
        ADD COLUMN IF NOT EXISTS state TEXT,
        ADD COLUMN IF NOT EXISTS scheme_name TEXT,
        ADD COLUMN IF NOT EXISTS benefits TEXT,
        ADD COLUMN IF NOT EXISTS performance_metric TEXT,
        ADD COLUMN IF NOT EXISTS required_documents TEXT[],
        ADD COLUMN IF NOT EXISTS category TEXT,
        ADD COLUMN IF NOT EXISTS scheme_type TEXT;
    ''')

    # Truncate and insert 41 schemes
    await conn.execute('''TRUNCATE TABLE schemes RESTART IDENTITY CASCADE;''')
    
    await conn.execute("""
    INSERT INTO schemes (state, scheme_name, eligibility, benefits, performance_metric)
    VALUES
    ('Nationwide','Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)','All small and marginal landholder farmers with cultivable land up to 2 hectares as per land records of the concerned State/UT. Excludes institutional land holders, farmer families holding constitutional posts, serving/retired officers, pensioners with Rs 10,000+ monthly pension, income tax payers, professionals like doctors/lawyers.','Financial support of Rs 6,000 per year, payable in three equal instalments of Rs 2,000 each, directly transferred to the farmer''s bank account to supplement income for procuring inputs and household needs.','Total beneficiaries: ~10.697 crore farmers (as of 05.01.2021); Funds disbursed: ₹1,14,743.289 crore (as of 05.01.2021).'),
    ('Nationwide','Pradhan Mantri Kisan MaanDhan Yojana (PM-KMY)','Small and marginal farmers aged 18-40 years with cultivable land up to 2 hectares. Voluntary and contributory scheme, subject to exclusion criteria similar to PM-KISAN.','Assured monthly pension of Rs 3,000 after attaining 60 years of age. Central Government matches the farmer''s contribution (Rs 55 to Rs 200 per month based on age).','Registered beneficiaries: 21,11,317 (as of 05.01.2021).'),
    ('Nationwide','Pradhan Mantri Fasal Bima Yojana (PMFBY)','All farmers growing notified crops in notified areas, including loanee and non-loanee farmers.','Comprehensive crop insurance against non-preventable natural risks from pre-sowing to post-harvest. Low premium rates: 2% for Kharif, 1.5% for Rabi, 5% for commercial/horticultural crops. Claims paid directly to bank accounts.','Claims paid: ₹90,180 crore since inception. COVID-19 beneficiaries: 69.70 lakh farmers.'),
    ('Nationwide','Kisan Credit Card (KCC) Scheme','All farmers - individuals/joint borrowers who are owner cultivators, tenant farmers, sharecroppers, or self-help groups.','Short-term credit for crop production and allied activities at low interest rates (4% effective with timely repayment). Limit up to Rs 3 lakh with flexible repayment terms.','Active beneficiaries: 6.86 crore.'),
    ('Nationwide','Pradhan Mantri Krishi Sinchai Yojana (PMKSY)','All farmers, with priority to small and marginal farmers.','Improved irrigation coverage and water use efficiency. Subsidies for micro-irrigation systems like drip and sprinkler (up to 55% for small farmers).','Micro-Irrigation coverage: 50.11 lakh ha (2015-20).'),
    ('Nationwide','Soil Health Card Scheme','All farmers.','Soil testing every 2-3 years to provide nutrient status and recommendations for balanced fertilizer use. Helps in reducing costs and improving yield.','Cycle 1: 10.74 crore cards distributed. Cycle 2: 11.83 crore cards.'),
    ('Telangana','Rythu Bandhu Scheme','Land-owning farmers of Telangana with valid land records and Aadhaar.','Rs 10,000 per acre per year for cultivation expenses. Around 70 lakh farmers benefited.','No specific performance metric for this state scheme.'),
    ('Andhra Pradesh','YSR Rythu Bharosa','Small and marginal farmers, including tenant farmers with Aadhaar-linked bank account.','Rs 13,500 per year (including PM-KISAN share). Over 50 lakh farmers benefited.','No specific performance metric for this state scheme.'),
    ('Odisha','KALIA Scheme','Small and marginal farmers; landless agricultural households.','Rs 10,000 per family per year. Around 60 lakh farming families benefited.','No specific performance metric for this state scheme.'),
    ('Madhya Pradesh','Mukhyamantri Kisan Kalyan Yojana','Registered farmers of Madhya Pradesh who are active PM-KISAN beneficiaries.','Rs 4,000 per year (in addition to PM-KISAN). Around 80 lakh farmers benefited.','No specific performance metric for this state scheme.'),
    ('Chhattisgarh','Rajiv Gandhi Kisan Nyay Yojana','Farmers registered with the State Agriculture Department.','Rs 9,000–12,000 per acre (crop-dependent). Around 25 lakh farmers benefited.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Chief Minister Farmer Accident Welfare Scheme','Farmers aged 18–70 years, including landowners, co-owners, leaseholders, sharecroppers, landless farmers.','Up to Rs 5 lakh for death or total disability; Rs 2.5 lakh for >50% disability; Rs 1.75 lakh for 25–50% disability.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','National Mission on Natural Farming (NMNF)','Farmers in selected blocks of every district.','Guidance on Zero Budget Natural Farming. Improves soil health, reduces costs, better prices for natural produce.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Sheep Rearing Subsidy','Small and marginal farmers; SC/ST and OBC; unemployed youth; women livestock farmers.','Up to 50% of total cost for starting sheep rearing.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Soil Health Card Scheme','All farmers.','Soil nutrient analysis and fertilizer recommendations to reduce costs and increase yield.','National metrics apply.'),
    ('Uttar Pradesh','PM Kusum C1 Yojana','Permanent resident with agricultural land; priority to non-beneficiaries of other schemes.','Subsidy for solar pumps; reduced electricity costs, better irrigation.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Prime Minister Agriculture Irrigation Scheme – Pipeline Subsidy','Resident engaged in agriculture interested in pipeline irrigation.','50–70% subsidy on pipeline cost based on farm size.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Hi-Tech Nursery Subsidy','Individuals or institutions establishing nurseries.','Up to Rs 1 crore for nursery setup.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Vegetable & Spice Seed Production Subsidy','Registered farmers with own land.','Partial subsidy for seed production costs.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','New Orchard Establishment Grant','Farmers with land meeting criteria.','Financial assistance for planting and care, varies by orchard type.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Flower Cultivation Grant (Rose, Marigold, Gerbera, Jasmine, Tuberose)','Permanent residents with cultivable land.','Up to 50% of project cost.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Spice Cultivation Grant','Resident farmers, including small and marginal.','Covers seeds, fertilizers, equipment, training.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Vegetable Production Subsidy Grant','Registered farmers.','Subsidy for seeds, equipment, fertilizers, irrigation.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Beekeeping Subsidy','Farmers and entrepreneurs aged 18+ with agriculture/entrepreneur certificate.','50% subsidy for equipment, colonies, etc.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Tractor Grant','Farmers aged 18+, registered landowners.','25–50% subsidy on tractor cost.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Fruit Orchard Development Scheme','Farmers.','Subsidy for fruit plants, training, pest management.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Grant for Drip, Sprinkler, and Greenhouse','Small and marginal farmers owning land.','Subsidy for irrigation equipment based on land area.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Subsidy for Mushroom Units','Permanent residents with experience/qualification in agriculture; permission for farm or own land.','25–50% subsidy, higher for small/marginal farmers.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Subsidy on Vermicompost','Permanent residents engaged in cultivation or establishing unit.','Up to 50% of investment.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Plant Health Care Center','All farmers.','Crop health testing, disease/pest guidance, training.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Grant on Agricultural Equipment and Diesel Pump Sets','Permanent residents with land ownership; small/marginal priority.','25–50% subsidy on equipment like tractors, harvesters.','No specific performance metric for this state scheme.'),
    ('Uttar Pradesh','Fencing Scheme (Tarbandi Yojana)','Small and marginal farmers unable to afford protection.','Subsidy on fencing cost to protect from animals.','No specific performance metric for this state scheme.'),
    ('Maharashtra','Pradhan Mantri Fasal Bima Yojana (PMFBY)','Farmers facing natural disasters, crop failure, pest/disease attacks.','Crop insurance: 2% Kharif, 1.5% Rabi, 5% horticulture premium; direct compensation to bank.','Women enrolment in Maharashtra: 18-19% in recent seasons.'),
    ('Maharashtra','Solar Spray Pump Subsidy','Farmers adopting eco-friendly spraying.','High subsidies for solar spray pumps.','No specific performance metric for this state scheme.'),
    ('Maharashtra','Mini Tractor Subsidy Yojana','Small farmers, SC/ST, women, socially backward.','Up to 90% subsidy for mini tractors.','No specific performance metric for this state scheme.'),
    ('Maharashtra','PM Kisan Samman Nidhi','Eligible farmers in Maharashtra.','Rs 6,000 per year in 3 installments.','Beneficiaries in Maharashtra: 90,73,782.'),
    ('Maharashtra','Free Seed Mini Kits (Oilseed Promotion Scheme)','Farmers in many districts.','Free seed minikits for oilseed promotion.','No specific performance metric for this state scheme.'),
    ('Maharashtra','State Agriculture Mechanization Scheme','Farmers with Aadhaar, 7/12 and 8-A certificates; SC/ST if applicable.','Financial assistance for purchasing agricultural machinery to promote mechanization.','No specific performance metric for this state scheme.');
    """)

    await conn.execute("""
    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','Land ownership records (Khatauni/7-12)',
      'Bank passbook (account + IFSC)','Mobile number linked to Aadhaar'
    ] WHERE scheme_name ILIKE '%PM-KISAN%' OR scheme_name ILIKE '%PM Kisan Samman%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','Land records','Bank passbook',
      'Sowing certificate from Patwari'
    ] WHERE scheme_name ILIKE '%Fasal Bima%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','Land records','Passport size photo',
      'Bank account details','Income certificate'
    ] WHERE scheme_name ILIKE '%Kisan Credit Card%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','Land records (Pattadar passbook)',
      'Bank account linked to Aadhaar'
    ] WHERE scheme_name ILIKE '%Rythu Bandhu%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','Land records or tenant certificate','Bank passbook'
    ] WHERE scheme_name ILIKE '%Rythu Bharosa%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','Land records or landless certificate','Bank passbook'
    ] WHERE scheme_name ILIKE '%KALIA%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','PM-KISAN registration proof','Bank passbook'
    ] WHERE scheme_name ILIKE '%Kisan Kalyan%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','State agriculture dept registration',
      'Land records','Bank passbook'
    ] WHERE scheme_name ILIKE '%Kisan Nyay%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','FIR or accident report',
      'Medical certificate','Land or farming proof','Bank passbook'
    ] WHERE scheme_name ILIKE '%Accident%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','Caste certificate','Land records',
      'Bank passbook','Project report'
    ] WHERE scheme_name ILIKE '%Sheep%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','Land records','Bank passbook',
      'Driving licence','Quotation from tractor dealer'
    ] WHERE scheme_name ILIKE '%Tractor%';

    UPDATE schemes SET required_documents = ARRAY[
      'Aadhaar card','7/12 extract','Caste certificate',
      'Bank passbook','Quotation from equipment supplier'
    ] WHERE scheme_name ILIKE '%Mechanization%' OR scheme_name ILIKE '%Mini Tractor%';

    UPDATE schemes 
    SET required_documents = ARRAY[
      'Aadhaar card','Land records','Bank passbook','State residency proof'
    ]
    WHERE required_documents IS NULL;
    """)
    
    val = await conn.fetchval("SELECT COUNT(*) FROM schemes;")
    print(f"Total schemes: {val}")

    await conn.close()
    
asyncio.run(main())
