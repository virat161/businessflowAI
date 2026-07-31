from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.schemas import EmailRequest, EmailResponse
from app.services.gemini import (
    GeminiConfigurationError,
    GeminiGenerationError,
    generate_email,
)

router = APIRouter(
    prefix="/email",
    tags=["Email Generator"],
)


@router.post(
    "/generate",
    response_model=EmailResponse,
)
def generate_business_email(
    request: EmailRequest,
    db: Session = Depends(get_db),
):
    business_memory = crud.get_business_memory(db)

    try:
        email = generate_email(
            purpose=request.purpose,
            recipient=request.recipient,
            tone=request.tone,
            instructions=request.instructions,
            business_memory=business_memory,
        )

        return EmailResponse(email=email)

    except GeminiConfigurationError as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        ) from error

    except GeminiGenerationError as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        ) from error

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected server error: {error}",
        ) from error