from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app import models

from app.routers import (
    auth,
    business,
    conversations,
    email,
    messages,
    pdf,
)

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BusinessFlow AI API",
    version="1.0.0",
    description="Backend API for BusinessFlow AI",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# Register Routers
# ============================

app.include_router(auth.router)
app.include_router(conversations.router)
app.include_router(messages.router)
app.include_router(pdf.router)
app.include_router(email.router)
app.include_router(business.router)

# ============================
# Root
# ============================

@app.get("/")
def root():
    return {
        "status": "OK",
        "message": "BusinessFlow AI Backend Running 🚀"
    }