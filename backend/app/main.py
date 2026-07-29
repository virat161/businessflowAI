from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import conversations, messages

Base.metadata.create_all(bind=engine)

app = FastAPI(title="BusinessFlow AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(conversations.router)
app.include_router(messages.router)


@app.get("/")
def root():
    return {"message": "BusinessFlow AI Backend Running 🚀"}


@app.get("/health")
def health():
    return {"status": "healthy"}