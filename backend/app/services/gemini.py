from collections.abc import Sequence
from os import getenv
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[2] / ".env")


class GeminiConfigurationError(RuntimeError):
    """Raised when Gemini has not been configured for the application."""


class GeminiGenerationError(RuntimeError):
    """Raised when Gemini cannot produce a reply."""


def generate_reply(history: Sequence[tuple[str, str]]) -> str:
    api_key = getenv("GEMINI_API_KEY")

    if not api_key:
        raise GeminiConfigurationError(
            "Gemini is not configured. Add GEMINI_API_KEY to backend/.env and restart the API.",
        )

    try:
        from google import genai
    except ImportError as error:
        raise GeminiConfigurationError(
            "The Google Gen AI SDK is not installed. Install backend requirements and restart the API.",
        ) from error

    transcript = "\n".join(
        f"{'User' if sender == 'user' else 'BusinessFlow AI'}: {message}"
        for sender, message in history[-20:]
    )
    
    prompt = (
        "You are BusinessFlow AI, a concise and practical assistant for business work. "
        "Give clear, helpful answers.\n\n"
        f"Conversation:\n{transcript}\n\nBusinessFlow AI:"
    )

    try:
        client = genai.Client(api_key=api_key)
        
        # Sahi Gemini API SDK function call
        response = client.models.generate_content(
            model=getenv("GEMINI_MODEL", "gemini-1.5-flash"),
            contents=prompt,
        )
        
        # Sahi response object property
        reply = (response.text or "").strip()
        
    except Exception as error:
        print(f"Gemini API Error: {error}") # Terminal mein error dikhane ke liye
        raise GeminiGenerationError(
            "Gemini could not generate a reply. Check your API key, model access, and quota.",
        ) from error

    if not reply:
        raise GeminiGenerationError("Gemini returned an empty reply. Please try again.")

    return reply