from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


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


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=10_000)


class ChatResponse(BaseModel):
    user_message: MessageResponse
    assistant_message: MessageResponse
# ==========================
# Email Generator Schemas
# ==========================

class EmailRequest(BaseModel):
    purpose: str = Field(min_length=1, max_length=500)
    recipient: str = Field(min_length=1, max_length=200)
    tone: str = Field(min_length=1, max_length=100)
    instructions: str = Field(default="", max_length=5000)


class EmailResponse(BaseModel):
    email: str