from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.pdf_service import extract_text_from_pdf, summarize_pdf_text

router = APIRouter(
    prefix="/api/pdf",
    tags=["PDF Analyzer"]
)


class PDFSummaryResponse(BaseModel):
    document_type: str

    summary: str

    key_points: List[str]

    important_dates: List[str]

    people_organizations: List[str]

    financial_data: List[str]

    action_items: List[str]

    risks: List[str]

    recommendations: List[str]


@router.post("/summarize", response_model=PDFSummaryResponse)
async def summarize_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF, extract text, analyze it with Gemini,
    and return structured business insights.
    """

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Uploaded file must be a PDF."
        )

    try:
        # Read uploaded PDF
        file_bytes = await file.read()

        # Extract text
        text = extract_text_from_pdf(file_bytes)

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract any text from the PDF."
            )

        # AI Analysis
        summary_dict = summarize_pdf_text(text)

        # Return validated response
        return PDFSummaryResponse(**summary_dict)

    except ValueError as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing the PDF: {str(e)}"
        )