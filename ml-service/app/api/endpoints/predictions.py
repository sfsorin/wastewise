from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.prediction_service import PredictionService

router = APIRouter()

@router.post("/quantity", response_model=PredictionResponse)
def predict_quantity(
    request: PredictionRequest,
    db: Session = Depends(get_db)
):
    """
    Generează predicții pentru cantitățile de deșeuri.
    """
    try:
        prediction_service = PredictionService(db)
        result = prediction_service.predict_quantity(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la generarea predicției: {str(e)}")

@router.post("/financial", response_model=PredictionResponse)
def predict_financial(
    request: PredictionRequest,
    db: Session = Depends(get_db)
):
    """
    Generează predicții financiare.
    """
    try:
        prediction_service = PredictionService(db)
        result = prediction_service.predict_financial(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la generarea predicției: {str(e)}")

@router.post("/route", response_model=PredictionResponse)
def optimize_route(
    request: PredictionRequest,
    db: Session = Depends(get_db)
):
    """
    Optimizează rutele de colectare.
    """
    try:
        prediction_service = PredictionService(db)
        result = prediction_service.optimize_route(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la optimizarea rutei: {str(e)}")
