from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud
from app import schemas

router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"]
)


@router.get(
    "/",
    response_model=list[schemas.ConversationResponse]
)
def get_all_conversations(
    db: Session = Depends(get_db)
):
    return crud.get_conversations(db)


@router.post(
    "/",
    response_model=schemas.ConversationResponse
)
def create_conversation(
    conversation: schemas.ConversationCreate,
    db: Session = Depends(get_db)
):
    return crud.create_conversation(
        db,
        conversation
    )


@router.put(
    "/{conversation_id}",
    response_model=schemas.ConversationResponse
)
def update_conversation(
    conversation_id: int,
    conversation: schemas.ConversationUpdate,
    db: Session = Depends(get_db)
):
    updated = crud.update_conversation(
        db,
        conversation_id,
        conversation,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found"
        )

    return updated


@router.delete("/{conversation_id}")
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db)
):
    deleted = crud.delete_conversation(
        db,
        conversation_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found"
        )

    return {
        "message": "Conversation deleted successfully"
    }