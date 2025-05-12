from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime

class TrainingRequest(BaseModel):
    """
    Schema pentru cererea de antrenare a modelului.
    """
    model_type: str  # quantity, financial, route
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    parameters: Optional[Dict[str, Any]] = None
    features: Optional[List[str]] = None

class TrainingResponse(BaseModel):
    """
    Schema pentru răspunsul de antrenare a modelului.
    """
    status: str
    message: str
    job_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
