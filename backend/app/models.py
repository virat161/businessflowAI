from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    messages = relationship(
        "Message",
        back_populates="conversation",
        cascade="all, delete-orphan",
        order_by="Message.created_at",
    )


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)

    conversation_id = Column(
        Integer,
        ForeignKey("conversations.id", ondelete="CASCADE"),
        nullable=False,
    )

    sender = Column(String, nullable=False)
    message = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    conversation = relationship(
        "Conversation",
        back_populates="messages",
    )


class BusinessMemory(Base):
    __tablename__ = "business_memory"

    id = Column(Integer, primary_key=True, index=True)

    company_name = Column(String, nullable=False)
    industry = Column(String, nullable=False)
    products = Column(String, nullable=False)
    target_audience = Column(String, nullable=False)
    brand_tone = Column(String, nullable=False)

    website = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)

    notes = Column(String, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )