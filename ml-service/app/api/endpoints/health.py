from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db

router = APIRouter()

@router.get("/")
def health_check(db: Session = Depends(get_db)):
    """
    Verifică starea serviciului ML și conexiunea la baza de date.
    """
    try:
        # Verifică conexiunea la baza de date
        db.execute("SELECT 1")
        db_status = "ok"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "status": "ok",
        "database": db_status,
        "service": "ml-service"
    }
