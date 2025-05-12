from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime

class PredictionRequest(BaseModel):
    """
    Schema pentru cererea de predicție.
    """
    client_id: Optional[int] = None
    location_id: Optional[int] = None
    waste_category_id: Optional[int] = None
    start_date: datetime
    end_date: datetime
    interval: str = "monthly"  # daily, weekly, monthly
    additional_params: Optional[Dict[str, Any]] = None

class PredictionResult(BaseModel):
    """
    Schema pentru un rezultat individual de predicție.
    """
    date: datetime
    value: float
    confidence_lower: Optional[float] = None
    confidence_upper: Optional[float] = None

class PredictionResponse(BaseModel):
    """
    Schema pentru răspunsul de predicție.
    """
    status: str
    message: str
    model_version: str
    results: List[PredictionResult]
    metadata: Optional[Dict[str, Any]] = None
