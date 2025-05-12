from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.training import TrainingRequest, TrainingResponse
from app.services.training_service import TrainingService

router = APIRouter()

@router.post("/quantity-model", response_model=TrainingResponse)
def train_quantity_model(
    request: TrainingRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Antrenează modelul de predicție a cantităților.
    """
    try:
        training_service = TrainingService(db)
        # Antrenarea poate dura mult, așa că o rulăm în background
        background_tasks.add_task(
            training_service.train_quantity_model,
            request
        )
        return {"status": "success", "message": "Antrenarea modelului a început în background"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la antrenarea modelului: {str(e)}")

@router.post("/financial-model", response_model=TrainingResponse)
def train_financial_model(
    request: TrainingRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Antrenează modelul de predicție financiară.
    """
    try:
        training_service = TrainingService(db)
        # Antrenarea poate dura mult, așa că o rulăm în background
        background_tasks.add_task(
            training_service.train_financial_model,
            request
        )
        return {"status": "success", "message": "Antrenarea modelului a început în background"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la antrenarea modelului: {str(e)}")

@router.post("/route-model", response_model=TrainingResponse)
def train_route_model(
    request: TrainingRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Antrenează modelul de optimizare a rutelor.
    """
    try:
        training_service = TrainingService(db)
        # Antrenarea poate dura mult, așa că o rulăm în background
        background_tasks.add_task(
            training_service.train_route_model,
            request
        )
        return {"status": "success", "message": "Antrenarea modelului a început în background"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la antrenarea modelului: {str(e)}")
