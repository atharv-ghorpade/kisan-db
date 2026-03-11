import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from models.scheme import Scheme
from database.base import Base
from app.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

schemes_data = [
    {
        "title": "PM-Kisan Samman Nidhi",
        "description": "Direct income support of Rs 6,000 per year to farmer families across the country, paid in three equal installments.",
        "type": "Central",
        "benefit": "Rs 6,000/year",
        "benefitAmount": "6000",
        "matchPercentage": 92,
        "slug": "pm-kisan"
    },
    {
        "title": "Soil Health Card Scheme",
        "description": "Free soil testing and health cards with recommendations for crop-wise fertilizer usage to improve soil health.",
        "type": "Central",
        "benefit": "Free soil testing",
        "matchPercentage": 88,
        "slug": "soil-health"
    },
    {
        "title": "Pradhan Mantri Fasal Bima Yojana",
        "description": "Comprehensive crop insurance scheme to provide financial support to farmers in case of crop failure due to natural calamities.",
        "type": "Central",
        "benefit": "Crop insurance coverage",
        "matchPercentage": 85,
        "slug": "fasal-bima"
    },
    {
        "title": "Kisan Credit Card",
        "description": "Easy access to credit for farmers to meet their agricultural and farm-related expenses at subsidized interest rates.",
        "type": "Central",
        "benefit": "Up to Rs 3 lakh credit",
        "matchPercentage": 78,
        "slug": "kisan-credit"
    },
    {
        "title": "Pradhan Mantri Krishi Sinchayee Yojana",
        "description": "Subsidy for micro-irrigation systems including drip and sprinkler irrigation to improve water use efficiency.",
        "type": "Central",
        "benefit": "55-90% subsidy",
        "matchPercentage": 72,
        "slug": "drip-irrigation"
    },
    {
        "title": "Agriculture Infrastructure Fund",
        "description": "Credit facility for investment in post-harvest management infrastructure and community farming assets.",
        "type": "Central",
        "benefit": "Rs 1 crore loan at 3% interest",
        "matchPercentage": 65,
        "slug": "agri-infra"
    }
]

async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with AsyncSessionLocal() as session:
        for data in schemes_data:
            # Note: The model 'Scheme' might have different field names like 'title' vs 'name'
            # Let's check models/scheme.py again
            new_scheme = Scheme(
                title=data["title"],
                description=data["description"],
                ministry=data["type"],
                eligibility=f"Match Percentage: {data['matchPercentage']}%",
                max_subsidy_amount=float(data.get("benefitAmount", 0)) if str(data.get("benefitAmount", "")).isdigit() else 0.0,
                is_active=True
            )
            session.add(new_scheme)
        await session.commit()
    print("Seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed())
