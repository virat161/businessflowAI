from sqlalchemy.orm import Session, joinedload

from app import models, schemas


# ==========================================================
# Conversation CRUD
# ==========================================================

def get_conversations(db: Session):
    return (
        db.query(models.Conversation)
        .options(joinedload(models.Conversation.messages))
        .order_by(models.Conversation.updated_at.desc())
        .all()
    )


def get_conversation(db: Session, conversation_id: int):
    return (
        db.query(models.Conversation)
        .options(joinedload(models.Conversation.messages))
        .filter(models.Conversation.id == conversation_id)
        .first()
    )


def create_conversation(
    db: Session,
    conversation: schemas.ConversationCreate,
):
    db_conversation = models.Conversation(
        title=conversation.title
    )

    db.add(db_conversation)
    db.commit()
    db.refresh(db_conversation)

    return db_conversation


def update_conversation(
    db: Session,
    conversation_id: int,
    conversation: schemas.ConversationUpdate,
):
    db_conversation = get_conversation(db, conversation_id)

    if not db_conversation:
        return None

    db_conversation.title = conversation.title

    db.commit()
    db.refresh(db_conversation)

    return db_conversation


def delete_conversation(
    db: Session,
    conversation_id: int,
):
    db_conversation = get_conversation(db, conversation_id)

    if not db_conversation:
        return None

    db.delete(db_conversation)
    db.commit()

    return db_conversation


# ==========================================================
# Message CRUD
# ==========================================================

def get_messages(
    db: Session,
    conversation_id: int,
):
    return (
        db.query(models.Message)
        .filter(
            models.Message.conversation_id == conversation_id
        )
        .order_by(models.Message.created_at)
        .all()
    )


def create_message(
    db: Session,
    conversation_id: int,
    message: schemas.MessageCreate,
):
    db_message = models.Message(
        conversation_id=conversation_id,
        sender=message.sender,
        message=message.message,
    )

    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    return db_message


def delete_message(
    db: Session,
    message_id: int,
):
    db_message = (
        db.query(models.Message)
        .filter(models.Message.id == message_id)
        .first()
    )

    if not db_message:
        return None

    db.delete(db_message)
    db.commit()

    return db_message