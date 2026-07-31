import fitz
import json
import os
import re
import google.generativeai as genai


def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""

    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()

    return text


def summarize_pdf_text(text: str) -> dict:

    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    model = genai.GenerativeModel("gemini-3.6-flash")

    prompt = f"""
You are an expert business analyst.

Summarize the following document.

Return ONLY valid JSON.

{{
  "summary":"",
  "key_points":[],
  "action_items":[],
  "risks":[],
  "recommendations":[]
}}

Document:

{text[:80000]}
"""

    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json"
        ),
    )

    try:
        ai = json.loads(response.text)
    except Exception:
        ai = {}

    # ----------------------------
    # Rule-based extraction
    # ----------------------------

    document_type = "General PDF"

    lower = text.lower()

    if "meeting minutes" in lower:
        document_type = "Meeting Minutes"
    elif "invoice" in lower:
        document_type = "Invoice"
    elif "resume" in lower:
        document_type = "Resume"
    elif "contract" in lower:
        document_type = "Contract"
    elif "financial report" in lower:
        document_type = "Financial Report"

    # Dates
    dates = re.findall(
        r"(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}",
        text,
    )

    # Money
    money = re.findall(r"\$\s?\d[\d,]*", text)

    # Attendees
    people = []

    attendee_match = re.search(
        r"Attendees:(.*?)(Meeting Notes|Next Steps|Action Items)",
        text,
        re.DOTALL | re.IGNORECASE,
    )

    if attendee_match:
        raw = attendee_match.group(1)

        raw = raw.replace("\n", " ")

        people = [x.strip() for x in raw.split(",") if x.strip()]

    return {
        "document_type": document_type,

        "summary": ai.get("summary", ""),

        "key_points": ai.get("key_points", []),

        "important_dates": list(dict.fromkeys(dates)),

        "people_organizations": people,

        "financial_data": list(dict.fromkeys(money)),

        "action_items": ai.get("action_items", []),

        "risks": ai.get("risks", []),

        "recommendations": ai.get("recommendations", []),
    }