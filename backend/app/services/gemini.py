from collections.abc import Sequence
from os import getenv
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[2] / ".env")


class GeminiConfigurationError(RuntimeError):
    """Raised when Gemini has not been configured for the application."""


class GeminiGenerationError(RuntimeError):
    """Raised when Gemini cannot produce a reply."""


def _format_business_memory(memory) -> str:
    """
    Converts the BusinessMemory model into prompt text.
    """

    if not memory:
        return "No business profile has been configured."

    return f"""
Business Profile

Company Name:
{memory.company_name}

Industry:
{memory.industry}

Products / Services:
{memory.products}

Target Audience:
{memory.target_audience}

Brand Tone:
{memory.brand_tone}

Website:
{memory.website}

Business Email:
{memory.email}

Phone:
{memory.phone}

Additional Notes:
{memory.notes}
""".strip()


def _get_client():
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

    return genai.Client(api_key=api_key)


# ==========================================================
# AI Chat
# ==========================================================

def generate_reply(
    history: Sequence[tuple[str, str]],
    business_memory=None,
) -> str:

    transcript = "\n".join(
        f"{'User' if sender == 'user' else 'BusinessFlow AI'}: {message}"
        for sender, message in history[-20:]
    )

    memory = _format_business_memory(business_memory)

    prompt = f"""
You are BusinessFlow AI.

You are an intelligent AI assistant that represents the following business.

{memory}

Instructions:

- Always answer according to the business profile.
- Recommend the company's services whenever appropriate.
- Maintain the configured brand tone.
- Never contradict the business profile.
- Be concise, practical and professional.

Conversation:

{transcript}

BusinessFlow AI:
"""

    try:

        client = _get_client()

        response = client.models.generate_content(
            model=getenv("GEMINI_MODEL", "gemini-3.6-flash"),
            contents=prompt,
        )

        reply = (response.text or "").strip()

    except Exception as error:
        print(f"Gemini API Error: {error}")

        raise GeminiGenerationError(
            "Gemini could not generate a reply. Check your API key, model access, and quota.",
        ) from error

    if not reply:
        raise GeminiGenerationError(
            "Gemini returned an empty reply."
        )

    return reply


# ==========================================================
# Email Generator
# ==========================================================

def generate_email(
    purpose: str,
    recipient: str,
    tone: str,
    instructions: str,
    business_memory=None,
) -> str:

    memory = _format_business_memory(business_memory)

    prompt = f"""
You are BusinessFlow AI.

You are writing emails on behalf of the following business.

{memory}

Write a professional business email.

Purpose:
{purpose}

Recipient:
{recipient}

Tone:
{tone}

Additional Instructions:
{instructions}

Requirements:

- Use the business information wherever appropriate.
- Mention the company naturally.
- Match the requested tone.
- Include a suitable subject.
- Return plain text only.

Format:

Subject:

Dear ...

...

Best Regards,
"""

    try:

        client = _get_client()

        response = client.models.generate_content(
            model=getenv("GEMINI_MODEL", "gemini-3.6-flash"),
            contents=prompt,
        )

        email = (response.text or "").strip()

    except Exception as error:

        print(f"Gemini API Error: {error}")

        raise GeminiGenerationError(
            "Gemini could not generate the email."
        ) from error

    if not email:
        raise GeminiGenerationError(
            "Gemini returned an empty email."
        )

    return email