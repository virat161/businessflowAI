from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.pdf_service import extract_text_from_pdf, summarize_pdf_text

router = APIRouter(prefix="/api/pdf", tags=["PDF Summarizer"])

class PDFSummaryResponse(BaseModel):
    summary: str
    key_points: List[str]
    action_items: List[str]

@router.post("/summarize", response_model=PDFSummaryResponse)
async def summarize_pdf(file: UploadFile = File(...)):
    """Endpoint to upload a PDF, extract text, and return an AI-generated summary."""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Uploaded file must be a PDF.")
    
    try:
        # Read file asynchronously
        file_bytes = await file.read()
        
        # Extract text
        text = extract_text_from_pdf(file_bytes)
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract any text from the provided PDF.")
        
        # Get structured summary from Gemini
        summary_dict = summarize_pdf_text(text)
        
        # Validate and return using Pydantic model
        return PDFSummaryResponse(**summary_dict)
        
    except ValueError as ve:
        raise HTTPException(status_code=500, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred processing the PDF: {str(e)}")