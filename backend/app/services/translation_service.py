from typing import Dict, List, Optional
import requests
from backend.app.core.config import settings


class TranslationService:
    """Service for local language support (Assamese)"""

    PHRASES = {
        "greetings": {
            "hello": "নমস্কাৰ (Nomoskar)",
            "thank_you": "ধন্যবাদ (Dhonnobad)",
            "welcome": "স্বাগতম (Swagotom)"
        },
        "directions": {
            "where_is": "ক'ত আছে? (Kot ase?)",
            "go_straight": "সঠিকে যাওক (Sothike jaok)",
            "turn_left": "বাওঁফালে ঘূৰক (Baom fale ghurok)",
            "turn_right": "সোঁফালে ঘূৰক (Xom fale ghurok)"
        },
        "emergency": {
            "help": "সাহায্য কৰক (Xahayyo korok)",
            "police": "পুলিচ (Police)",
            "hospital": "হস্পিতাল (Hospitol)"
        },
        "shopping": {
            "how_much": "কিমান দাম? (Kiman dam?)",
            "too_expensive": "বহুত দামী (Bohut dami)",
            "can_you_reduce": "কমাব পাৰিবনে? (Komab paribone?)"
        }
    }

    @staticmethod
    async def translate_text(text: str, target_lang: str = "as") -> Optional[str]:
        """Translate text using Google Translate API"""
        if not settings.GOOGLE_TRANSLATE_API_KEY:
            return None

        try:
            url = "https://translation.googleapis.com/language/translate/v2"
            params = {
                "q": text,
                "target": target_lang,
                "key": settings.GOOGLE_TRANSLATE_API_KEY,
                "format": "text"
            }

            response = requests.post(url, params=params)
            if response.status_code == 200:
                data = response.json()
                return data["data"]["translations"][0]["translatedText"]
        except Exception:
            pass

        return None

    @staticmethod
    def get_phrase(category: str, phrase_key: str) -> Dict[str, str]:
        """Get phrase with translation and phonetic guide"""
        if category in TranslationService.PHRASES and phrase_key in TranslationService.PHRASES[category]:
            assamese_phrase = TranslationService.PHRASES[category][phrase_key]
            english_phrase = phrase_key.replace("_", " ").title()

            return {
                "english": english_phrase,
                "assamese": assamese_phrase.split(" (")[0],
                "phonetic": assamese_phrase.split(" (")[1].rstrip(")") if "(" in assamese_phrase else "",
                "category": category
            }
        return {}

    @staticmethod
    def get_common_phrases() -> List[Dict[str, str]]:
        """Get list of common phrases for phrasebook"""
        phrases = []
        for category, category_phrases in TranslationService.PHRASES.items():
            for key, value in category_phrases.items():
                phrases.append({
                    "id": f"{category}_{key}",
                    "english": key.replace("_", " ").title(),
                    "assamese": value.split(" (")[0],
                    "phonetic": value.split(" (")[1].rstrip(")") if "(" in value else "",
                    "category": category
                })
        return phrases

    @staticmethod
    def get_emergency_contacts() -> List[Dict[str, str]]:
        """Get emergency contacts for Guwahati"""
        return [
            {
                "name": "Police Control Room",
                "phone": "100",
                "type": "police",
                "language": "Assamese, English, Hindi"
            },
            {
                "name": "Ambulance",
                "phone": "102",
                "type": "ambulance",
                "language": "Assamese, English, Hindi"
            },
            {
                "name": "Fire Station",
                "phone": "101",
                "type": "fire",
                "language": "Assamese, English, Hindi"
            },
            {
                "name": "Tourist Police",
                "phone": "0361-2547100",
                "type": "tourist_police",
                "language": "Assamese, English"
            },
            {
                "name": "GMCH Emergency",
                "phone": "0361-2529442",
                "type": "hospital",
                "language": "Assamese, English"
            }
        ]