import fitz  # PyMuPDF
import json
import os
import google.generativeai as genai

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts text content from a PDF file byte stream using PyMuPDF."""
    text = ""
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

def summarize_pdf_text(text: str) -> dict:
    """Sends extracted text to Gemini API and returns structured JSON summary."""
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    
    # Using Gemini 1.5 Pro for high-quality professional summarization
    model = genai.GenerativeModel('gemini-3.6-flash')
    
    prompt = f"""
    Summarize the PDF professionally.

    Return JSON in this format:
    {{
        "summary": "...",
        "key_points":[
            "...",
            "...",
            "..."
        ],
        "action_items":[
            "...",
            "..."
        ]
    }}
    
    PDF Content:
    {text[:80000]}
    """
    
    response = model.generate_content(
        prompt, 
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json"
        )
    )
    
    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        raise ValueError("Failed to parse Gemini response as JSON.")