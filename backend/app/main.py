from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database imports
from app.database import engine
from app import models

# Routers imports
from app.routers import conversations, messages, pdf, email

# Create database tables automatically
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BusinessFlow AI API",
    description="Backend API for BusinessFlow AI platform"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all routers
app.include_router(conversations.router)
app.include_router(messages.router)
app.include_router(pdf.router)
app.include_router(email.router)

@app.get("/")
def read_root():
    """Health check endpoint"""
    return {
        "status": "Online",
        "message": "Welcome to BusinessFlow AI API",
    }