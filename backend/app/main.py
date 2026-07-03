from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine, seed_database
from app.routers.analysis import router as analysis_router
from app.routers.health import router as health_router
from app.routers.parties import router as parties_router
from app.routers.samples import router as samples_router

# Create tables and seed initial data
Base.metadata.create_all(bind=engine)
seed_database()

app = FastAPI(
    title="Lab Forms API",
    version="1.0.0",
    description="FastAPI backend for party, sample, and master analysis form management.",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/", tags=["Home"])
def root():
    return {
        "message": "Lab Forms API is running successfully!",
        "version": "1.0.0",
        "documentation": "/docs",
        "health": "/health",
    }

# Routers
app.include_router(health_router, tags=["Health"])
app.include_router(parties_router, prefix="/parties", tags=["Parties"])
app.include_router(samples_router, tags=["Samples"])
app.include_router(analysis_router, tags=["Analysis"])