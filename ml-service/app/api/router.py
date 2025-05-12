from fastapi import APIRouter

from app.api.endpoints import predictions, training, health

api_router = APIRouter()

# Include routers from endpoints
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(predictions.router, prefix="/predictions", tags=["predictions"])
api_router.include_router(training.router, prefix="/training", tags=["training"])
