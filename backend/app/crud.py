from datetime import datetime

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
    conversation = db.get(models.Conversation, conversation_id)

    if not conversation:
        return None

    db_message = models.Message(
        conversation_id=conversation_id,
        sender=message.sender,
        message=message.message,
    )

    db.add(db_message)

    conversation.updated_at = datetime.utcnow()

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


def clear_conversation(
    db: Session,
    conversation_id: int,
):
    conversation = db.get(
        models.Conversation,
        conversation_id,
    )

    if not conversation:
        return None

    db.query(models.Message).filter(
        models.Message.conversation_id == conversation_id
    ).delete()

    conversation.updated_at = datetime.utcnow()

    db.commit()

    return conversation


# ==========================================================
# Business Memory CRUD
# ==========================================================

def get_business_memory(db: Session):
    """
    Returns the single Business Memory record.
    """

    return (
        db.query(models.BusinessMemory)
        .first()
    )


def save_business_memory(
    db: Session,
    memory: schemas.BusinessMemoryCreate,
):
    """
    Creates or updates the Business Memory.
    Only one Business Memory exists.
    """

    db_memory = get_business_memory(db)

    if db_memory:

        db_memory.company_name = memory.company_name
        db_memory.industry = memory.industry
        db_memory.products = memory.products
        db_memory.target_audience = memory.target_audience
        db_memory.brand_tone = memory.brand_tone
        db_memory.website = memory.website
        db_memory.email = memory.email
        db_memory.phone = memory.phone
        db_memory.notes = memory.notes

        db_memory.updated_at = datetime.utcnow()

    else:

        db_memory = models.BusinessMemory(
            company_name=memory.company_name,
            industry=memory.industry,
            products=memory.products,
            target_audience=memory.target_audience,
            brand_tone=memory.brand_tone,
            website=memory.website,
            email=memory.email,
            phone=memory.phone,
            notes=memory.notes,
        )

        db.add(db_memory)

    db.commit()
    db.refresh(db_memory)

    return db_memory