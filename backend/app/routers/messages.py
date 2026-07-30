from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db
from app.services.gemini import (
    GeminiConfigurationError,
    GeminiGenerationError,
    generate_reply,
)

router = APIRouter(
    prefix="/messages",
    tags=["Messages"],
)
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


@router.post(
    "/conversation/{conversation_id}/chat",
    response_model=schemas.ChatResponse,
)
def create_chat_response(
    conversation_id: int,
    request: schemas.ChatRequest,
    db: Session = Depends(get_db),
):
    conversation = crud.get_conversation(db, conversation_id)

    if not conversation:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    user_text = request.message.strip()

    if not user_text:
        raise HTTPException(
            status_code=422,
            detail="Message cannot be empty",
        )

    history = [
        (message.sender, message.message)
        for message in crud.get_messages(db, conversation_id)
    ]

    try:
        assistant_text = generate_reply([
            *history,
            ("user", user_text),
        ])
    except GeminiConfigurationError as error:
        raise HTTPException(
            status_code=503,
            detail=str(error),
        ) from error
    except GeminiGenerationError as error:
        raise HTTPException(
            status_code=502,
            detail=str(error),
        ) from error

    user_message = crud.create_message(
        db,
        conversation_id,
        schemas.MessageCreate(sender="user", message=user_text),
    )
    assistant_message = crud.create_message(
        db,
        conversation_id,
        schemas.MessageCreate(sender="ai", message=assistant_text),
    )

    return schemas.ChatResponse(
        user_message=user_message,
        assistant_message=assistant_message,
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
@router.delete("/conversation/{conversation_id}")
def clear_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
):
    conversation = crud.clear_conversation(
        db,
        conversation_id,
    )

    if not conversation:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return {
        "message": "Conversation cleared successfully"
    }