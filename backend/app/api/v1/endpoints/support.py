from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Optional
from backend.app.utils.validation import sanitize_input

router = APIRouter()


@router.get("/phrasebook")
async def get_phrasebook(
        category: Optional[str] = Query(None)
):
    """
    Get local language phrasebook with input sanitization
    """
    try:
        # Sanitize category input
        if category:
            category = sanitize_input(category)

        # Your existing phrasebook logic...
        phrases = [...]

        if category:
            phrases = [p for p in phrases if p["category"] == category]

        # Sanitize output
        sanitized_phrases = [sanitize_input(phrase) for phrase in phrases]

        return {
            "phrases": sanitized_phrases,
            "total": len(sanitized_phrases)
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch phrasebook: {str(e)}"
        )


@router.get("/translate")
async def translate_text(
        text: str = Query(..., description="Text to translate"),
        target_lang: str = Query("as", description="Target language code")
):
    """
    Translate text with input sanitization
    """
    try:
        # Sanitize inputs
        sanitized_text = sanitize_input(text)
        sanitized_lang = sanitize_input(target_lang)

        # Validate text length
        if len(sanitized_text) > 500:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Text too long. Maximum 500 characters allowed."
            )

        # Validate language code
        valid_languages = ["as", "hi", "en", "bn"]
        if sanitized_lang not in valid_languages:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid language code. Must be one of: {', '.join(valid_languages)}"
            )

        # Your translation logic...
        translations = {...}

        text_lower = sanitized_text.lower()
        translated = translations.get(text_lower, f"{sanitized_text} (Translation not available)")

        return {
            "original": sanitized_text,
            "translated": translated.split(" (")[0],
            "phonetic": translated.split(" (")[1].rstrip(")") if "(" in translated else "",
            "language": "Assamese" if sanitized_lang == "as" else sanitized_lang.upper()
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Translation failed: {str(e)}"
        )