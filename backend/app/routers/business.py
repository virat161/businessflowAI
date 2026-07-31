from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(
    prefix="/business",
    tags=["Business Memory"],
)


@router.get(
    "/",
    response_model=schemas.BusinessMemoryResponse | None,
)
def get_business_memory(
    db: Session = Depends(get_db),
):
    return crud.get_business_memory(db)


@router.post(
    "/",
    response_model=schemas.BusinessMemoryResponse,
)
def save_business_memory(
    memory: schemas.BusinessMemoryCreate,
    db: Session = Depends(get_db),
):
    return crud.save_business_memory(
        db,
        memory,
    )