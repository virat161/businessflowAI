from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database imports (Aapke existing architecture ke hisaab se)
from app.database import engine
from app import models

# Routers imports
from app.routers import conversations, messages, pdf

# Create database tables automatically
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BusinessFlow AI API",
    description="Backend API for BusinessFlow AI platform"
)

# CORS Configuration - Ye bahut zaroori hai taki aapka Vite frontend (localhost:5176) FastAPI se baat kar sake
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Development ke time saare ports allow karne ke liye
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registering all your routers
app.include_router(conversations.router)
app.include_router(messages.router)
app.include_router(pdf.router)  # <-- Naya PDF router yahan connect ho gaya

@app.get("/")
def read_root():
    """Health check endpoint"""
    return {"status": "Online", "message": "Welcome to BusinessFlow AI API"}