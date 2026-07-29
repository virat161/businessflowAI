from datetime import datetime
from pydantic import BaseModel, ConfigDict


# ==========================
# Message Schemas
# ==========================

class MessageBase(BaseModel):
    sender: str
    message: str


class MessageCreate(MessageBase):
    pass


class MessageResponse(MessageBase):
    id: int
    conversation_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================
# Conversation Schemas
# ==========================

class ConversationBase(BaseModel):
    title: str


class ConversationCreate(ConversationBase):
    pass


class ConversationUpdate(BaseModel):
    title: str


class ConversationResponse(ConversationBase):
    id: int
    created_at: datetime
    updated_at: datetime
    messages: list[MessageResponse] = []

    model_config = ConfigDict(from_attributes=True)