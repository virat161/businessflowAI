from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import SessionLocal

router = APIRouter(
    prefix="/messages",
    tags=["Messages"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get(
    "/conversation/{conversation_id}",
    response_model=list[schemas.MessageResponse],
)
def get_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
):
    return crud.get_messages(db, conversation_id)


@router.post(
    "/conversation/{conversation_id}",
    response_model=schemas.MessageResponse,
)
def create_message(
    conversation_id: int,
    message: schemas.MessageCreate,
    db: Session = Depends(get_db),
):
    conversation = crud.get_conversation(db, conversation_id)

    if not conversation:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return crud.create_message(
        db,
        conversation_id,
        message,
    )


@router.delete("/{message_id}")
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
):
    message = crud.delete_message(
        db,
        message_id,
    )

    if not message:
        raise HTTPException(
            status_code=404,
            detail="Message not found",
        )

    return {
        "message": "Message deleted successfully"
    }