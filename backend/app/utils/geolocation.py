"""
Geolocation utilities for Guwahati Heritage Experiences
Handles location calculations, distance, and mapping
"""

import math
from typing import Dict, List, Tuple, Optional, Any
from geopy.distance import geodesic
import requests
from backend.app.core.config import settings

# Guwahati bounding coordinates (approx)
GUWAHATI_BOUNDS = {
    "north": 26.25,  # Max latitude
    "south": 26.10,  # Min latitude
    "east": 91.85,  # Max longitude
    "west": 91.65  # Min longitude
}

# Key landmarks in Guwahati with coordinates
GUWAHATI_LANDMARKS = {
    "kamakhya_temple": {"name": "Kamakhya Temple", "lat": 26.1664, "lng": 91.7065},
    "umananda_island": {"name": "Umananda Island", "lat": 26.1897, "lng": 91.7436},
    "brahmaputra_riverfront": {"name": "Brahmaputra Riverfront", "lat": 26.1839, "lng": 91.7464},
    "sualkuchi": {"name": "Sualkuchi Silk Village", "lat": 26.1700, "lng": 91.7500},
    "pan_bazaar": {"name": "Pan Bazaar", "lat": 26.1864, "lng": 91.7432},
    "dighalipukhuri": {"name": "Dighalipukhuri Park", "lat": 26.1864, "lng": 91.7432},
    "kaziranga": {"name": "Kaziranga National Park", "lat": 26.5727, "lng": 93.1720},  # Nearby attraction
    "assam_state_museum": {"name": "Assam State Museum", "lat": 26.1872, "lng": 91.7461},
    "guwahati_railway_station": {"name": "Guwahati Railway Station", "lat": 26.1852, "lng": 91.7511},
    "lokpriya_gopinath_bordoloi_airport": {"name": "LGBI Airport", "lat": 26.1065, "lng": 91.5859}
}

# Meeting points for itineraries
MEETING_POINTS = {
    "kamakhya_main_gate": {
        "name": "Kamakhya Temple Main Gate",
        "lat": 26.1665,
        "lng": 91.7065,
        "address": "Kamakhya Temple Main Gate, Nilachal Hill, Guwahati",
        "type": "temple",
        "landmark": "kamakhya_temple"
    },
    "kachari_ghat": {
        "name": "Kachari Ghat",
        "lat": 26.1839,
        "lng": 91.7464,
        "address": "Brahmaputra Riverfront near Kachari Ghat, Guwahati",
        "type": "riverfront",
        "landmark": "brahmaputra_riverfront"
    },
    "dighalipukhuri_park": {
        "name": "Dighalipukhuri Park Entrance",
        "lat": 26.1864,
        "lng": 91.7432,
        "address": "Dighalipukhuri Park Entrance, Guwahati",
        "type": "park",
        "landmark": "dighalipukhuri"
    },
    "lakhra_market": {
        "name": "Lakhra Market Entrance",
        "lat": 26.1800,
        "lng": 91.7400,
        "address": "Lakhra Market Entrance, Guwahati",
        "type": "market",
        "landmark": "pan_bazaar"
    }
}


def haversine_distance(
        lat1: float,
        lon1: float,
        lat2: float,
        lon2: float
) -> float:
    """
    Calculate the great-circle distance between two points
    using the Haversine formula (in kilometers)

    Args:
        lat1, lon1: Latitude and longitude of point 1 (in degrees)
        lat2, lon2: Latitude and longitude of point 2 (in degrees)

    Returns:
        Distance in kilometers
    """
    # Convert latitude and longitude from degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # Haversine formula
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))

    # Radius of earth in kilometers
    r = 6371

    return c * r


def calculate_distance(
        point1: Tuple[float, float],
        point2: Tuple[float, float],
        method: str = "haversine"
) -> float:
    """
    Calculate distance between two points using specified method

    Args:
        point1: Tuple of (latitude, longitude)
        point2: Tuple of (latitude, longitude)
        method: "haversine" (default) or "geopy" if installed

    Returns:
        Distance in kilometers
    """
    lat1, lon1 = point1
    lat2, lon2 = point2

    if method == "geopy" and 'geopy' in globals():
        return geodesic(point1, point2).kilometers
    else:
        return haversine_distance(lat1, lon1, lat2, lon2)


def is_within_guwahati(lat: float, lng: float, buffer_km: float = 5.0) -> bool:
    """
    Check if coordinates are within Guwahati area (with buffer)

    Args:
        lat: Latitude
        lng: Longitude
        buffer_km: Buffer distance in kilometers

    Returns:
        True if within Guwahati area
    """
    # Simple bounding box check
    if not (GUWAHATI_BOUNDS["south"] <= lat <= GUWAHATI_BOUNDS["north"]):
        return False
    if not (GUWAHATI_BOUNDS["west"] <= lng <= GUWAHATI_BOUNDS["east"]):
        return False

    # Optional: Check distance from city center
    city_center = (26.1839, 91.7464)  # Brahmaputra riverfront
    distance = calculate_distance((lat, lng), city_center)

    return distance <= (20 + buffer_km)  # Within ~20km of city center


def find_nearest_landmark(lat: float, lng: float) -> Dict[str, Any]:
    """
    Find the nearest landmark to given coordinates

    Args:
        lat: Latitude
        lng: Longitude

    Returns:
        Dictionary with landmark info and distance
    """
    nearest = None
    min_distance = float('inf')

    for landmark_id, landmark in GUWAHATI_LANDMARKS.items():
        distance = calculate_distance(
            (lat, lng),
            (landmark["lat"], landmark["lng"])
        )

        if distance < min_distance:
            min_distance = distance
            nearest = {
                "id": landmark_id,
                "name": landmark["name"],
                "distance_km": round(distance, 2),
                "coordinates": {"lat": landmark["lat"], "lng": landmark["lng"]}
            }

    return nearest if nearest else {
        "id": "unknown",
        "name": "Unknown Location",
        "distance_km": 0,
        "coordinates": {"lat": lat, "lng": lng}
    }


def get_safe_meeting_points(
        lat: float,
        lng: float,
        max_distance_km: float = 3.0
) -> List[Dict[str, Any]]:
    """
    Get safe meeting points near given coordinates

    Args:
        lat: User's latitude
        lng: User's longitude
        max_distance_km: Maximum distance in kilometers

    Returns:
        List of safe meeting points with distances
    """
    safe_points = []

    for point_id, point in MEETING_POINTS.items():
        distance = calculate_distance(
            (lat, lng),
            (point["lat"], point["lng"])
        )

        if distance <= max_distance_km:
            safe_points.append({
                "id": point_id,
                "name": point["name"],
                "address": point["address"],
                "type": point["type"],
                "distance_km": round(distance, 2),
                "coordinates": {"lat": point["lat"], "lng": point["lng"]},
                "walking_time_minutes": int(distance * 15)  # Approx 4km/h walking speed
            })

    # Sort by distance
    safe_points.sort(key=lambda x: x["distance_km"])

    return safe_points


def calculate_travel_time(
        start_lat: float,
        start_lng: float,
        end_lat: float,
        end_lng: float,
        mode: str = "walking"
) -> Dict[str, Any]:
    """
    Calculate estimated travel time between two points

    Args:
        start_lat, start_lng: Starting coordinates
        end_lat, end_lng: Ending coordinates
        mode: "walking", "driving", or "bicycling"

    Returns:
        Dictionary with distance and estimated time
    """
    distance_km = calculate_distance(
        (start_lat, start_lng),
        (end_lat, end_lng)
    )

    # Average speeds in km/h
    speeds = {
        "walking": 4,
        "bicycling": 15,
        "driving": 30,
        "auto": 20  # Auto-rickshaw
    }

    speed = speeds.get(mode, 4)  # Default to walking
    travel_time_hours = distance_km / speed
    travel_time_minutes = travel_time_hours * 60

    return {
        "distance_km": round(distance_km, 2),
        "estimated_time_minutes": int(travel_time_minutes),
        "mode": mode,
        "speed_kmh": speed
    }


def get_address_from_coordinates(lat: float, lng: float) -> Optional[Dict[str, Any]]:
    """
    Reverse geocode coordinates to get address (using Google Maps API if available)

    Args:
        lat: Latitude
        lng: Longitude

    Returns:
        Address information or None
    """
    if not settings.GOOGLE_MAPS_API_KEY:
        # Return mock address for development
        landmark = find_nearest_landmark(lat, lng)
        return {
            "formatted_address": f"Near {landmark['name']}, Guwahati, Assam",
            "landmark": landmark["name"],
            "city": "Guwahati",
            "state": "Assam",
            "country": "India"
        }

    try:
        url = "https://maps.googleapis.com/maps/api/geocode/json"
        params = {
            "latlng": f"{lat},{lng}",
            "key": settings.GOOGLE_MAPS_API_KEY
        }

        response = requests.get(url, params=params)
        data = response.json()

        if data["status"] == "OK" and data["results"]:
            result = data["results"][0]
            address_components = result.get("address_components", [])

            # Extract address components
            address_info = {
                "formatted_address": result.get("formatted_address", ""),
                "street": "",
                "area": "",
                "city": "",
                "state": "",
                "country": "",
                "postal_code": ""
            }

            for component in address_components:
                types = component.get("types", [])
                if "route" in types:
                    address_info["street"] = component.get("long_name", "")
                elif "sublocality" in types or "neighborhood" in types:
                    address_info["area"] = component.get("long_name", "")
                elif "locality" in types:
                    address_info["city"] = component.get("long_name", "")
                elif "administrative_area_level_1" in types:
                    address_info["state"] = component.get("long_name", "")
                elif "country" in types:
                    address_info["country"] = component.get("long_name", "")
                elif "postal_code" in types:
                    address_info["postal_code"] = component.get("long_name", "")

            return address_info
    except Exception as e:
        print(f"Error reverse geocoding: {e}")

    return None


def suggest_itinerary_route(
        stops: List[Dict[str, Any]],
        start_point: Optional[Tuple[float, float]] = None
) -> Dict[str, Any]:
    """
    Suggest optimal route for an itinerary with multiple stops

    Args:
        stops: List of stops with coordinates
        start_point: Starting coordinates (optional)

    Returns:
        Optimized route with total distance and time
    """
    if not stops:
        return {"route": [], "total_distance_km": 0, "total_time_minutes": 0}

    # Simple nearest-neighbor algorithm for routing
    route = []
    unvisited = stops.copy()

    # Start from given point or first stop
    if start_point:
        current_point = {"coordinates": {"lat": start_point[0], "lng": start_point[1]}}
    else:
        current_point = unvisited.pop(0)
        route.append(current_point)

    total_distance = 0
    total_time = 0

    while unvisited:
        # Find nearest unvisited stop
        nearest = None
        min_distance = float('inf')

        for stop in unvisited:
            distance = calculate_distance(
                (current_point["coordinates"]["lat"], current_point["coordinates"]["lng"]),
                (stop["coordinates"]["lat"], stop["coordinates"]["lng"])
            )

            if distance < min_distance:
                min_distance = distance
                nearest = stop

        if nearest:
            route.append(nearest)
            unvisited.remove(nearest)

            total_distance += min_distance
            # Estimate 4km/h walking speed
            total_time += (min_distance / 4) * 60

            current_point = nearest

    return {
        "route": route,
        "total_distance_km": round(total_distance, 2),
        "total_time_minutes": int(total_time),
        "stops_count": len(route)
    }


def validate_coordinates(lat: float, lng: float) -> bool:
    """
    Validate if coordinates are valid

    Args:
        lat: Latitude (-90 to 90)
        lng: Longitude (-180 to 180)

    Returns:
        True if valid coordinates
    """
    if not isinstance(lat, (int, float)) or not isinstance(lng, (int, float)):
        return False

    if not (-90 <= lat <= 90):
        return False

    if not (-180 <= lng <= 180):
        return False

    return True


def format_coordinates(lat: float, lng: float, format: str = "decimal") -> str:
    """
    Format coordinates in different formats

    Args:
        lat, lng: Coordinates
        format: "decimal", "dms" (degrees-minutes-seconds), or "geojson"

    Returns:
        Formatted coordinates string
    """
    if format == "dms":
        # Convert decimal to degrees, minutes, seconds
        lat_dir = "N" if lat >= 0 else "S"
        lng_dir = "E" if lng >= 0 else "W"

        lat_abs = abs(lat)
        lat_deg = int(lat_abs)
        lat_min = int((lat_abs - lat_deg) * 60)
        lat_sec = (lat_abs - lat_deg - lat_min / 60) * 3600

        lng_abs = abs(lng)
        lng_deg = int(lng_abs)
        lng_min = int((lng_abs - lng_deg) * 60)
        lng_sec = (lng_abs - lng_deg - lng_min / 60) * 3600

        return f"{lat_deg}°{lat_min}'{lat_sec:.2f}\"{lat_dir}, {lng_deg}°{lng_min}'{lng_sec:.2f}\"{lng_dir}"

    elif format == "geojson":
        return f'{{"type": "Point", "coordinates": [{lng}, {lat}]}}'

    else:  # decimal
        return f"{lat:.6f}, {lng:.6f}"


def get_weather_at_location(lat: float, lng: float) -> Optional[Dict[str, Any]]:
    """
    Get weather information at location (mock implementation)
    In production, integrate with weather API

    Args:
        lat, lng: Coordinates

    Returns:
        Weather information
    """
    # Mock weather data for Guwahati
    # In production, use OpenWeatherMap or similar API

    seasons = {
        1: {"season": "Winter", "avg_temp": 17, "condition": "Clear"},
        2: {"season": "Winter", "avg_temp": 19, "condition": "Partly Cloudy"},
        3: {"season": "Spring", "avg_temp": 24, "condition": "Clear"},
        4: {"season": "Spring", "avg_temp": 26, "condition": "Partly Cloudy"},
        5: {"season": "Summer", "avg_temp": 28, "condition": "Humid"},
        6: {"season": "Monsoon", "avg_temp": 30, "condition": "Rainy"},
        7: {"season": "Monsoon", "avg_temp": 31, "condition": "Rainy"},
        8: {"season": "Monsoon", "avg_temp": 31, "condition": "Rainy"},
        9: {"season": "Monsoon", "avg_temp": 30, "condition": "Rainy"},
        10: {"season": "Autumn", "avg_temp": 28, "condition": "Clear"},
        11: {"season": "Autumn", "avg_temp": 24, "condition": "Clear"},
        12: {"season": "Winter", "avg_temp": 20, "condition": "Clear"}
    }

    import datetime
    month = datetime.datetime.now().month
    season_info = seasons.get(month, {"season": "Unknown", "avg_temp": 25, "condition": "Clear"})

    return {
        "temperature_c": season_info["avg_temp"],
        "condition": season_info["condition"],
        "season": season_info["season"],
        "humidity": "75%" if season_info["condition"] == "Humid" else "65%",
        "recommendation": self._get_weather_recommendation(season_info["condition"]),
        "icon": self._get_weather_icon(season_info["condition"])
    }


def _get_weather_recommendation(condition: str) -> str:
    """Get weather-based recommendations"""
    recommendations = {
        "Rainy": "Carry umbrella/raincoat. Waterproof bags recommended.",
        "Humid": "Stay hydrated. Wear light cotton clothes.",
        "Clear": "Perfect for outdoor activities. Use sunscreen.",
        "Partly Cloudy": "Good weather for exploration. Hat recommended."
    }
    return recommendations.get(condition, "Enjoy your tour!")


def _get_weather_icon(condition: str) -> str:
    """Get emoji icon for weather condition"""
    icons = {
        "Rainy": "🌧️",
        "Humid": "🌡️",
        "Clear": "☀️",
        "Partly Cloudy": "⛅"
    }
    return icons.get(condition, "🌤️")


def calculate_safety_score(
        lat: float,
        lng: float,
        time_of_day: str = "day"
) -> Dict[str, Any]:
    """
    Calculate safety score for a location

    Args:
        lat, lng: Coordinates
        time_of_day: "day" or "night"

    Returns:
        Safety score and recommendations
    """
    # Factors affecting safety score
    factors = []
    score = 10  # Start with perfect score

    # Check if near police station (mock data)
    police_stations = [
        {"name": "Pan Bazaar Police Station", "lat": 26.1870, "lng": 91.7440},
        {"name": "Paltan Bazaar Police Station", "lat": 26.1840, "lng": 91.7480}
    ]

    nearest_police = None
    min_police_distance = float('inf')

    for station in police_stations:
        distance = calculate_distance((lat, lng), (station["lat"], station["lng"]))
        if distance < min_police_distance:
            min_police_distance = distance
            nearest_police = station

    if min_police_distance <= 1.0:  # Within 1km of police station
        factors.append({"factor": "Police proximity", "impact": "+2", "note": "Close to police station"})
        score += 2
    elif min_police_distance <= 3.0:
        factors.append({"factor": "Police proximity", "impact": "+1", "note": "Moderately close to police station"})
        score += 1
    else:
        factors.append({"factor": "Police proximity", "impact": "-1", "note": "Far from police station"})
        score -= 1

    # Check if in tourist area
    tourist_areas = [
        {"name": "Kamakhya Temple Area", "lat": 26.1664, "lng": 91.7065},
        {"name": "Riverfront Area", "lat": 26.1839, "lng": 91.7464}
    ]

    is_tourist_area = False
    for area in tourist_areas:
        if calculate_distance((lat, lng), (area["lat"], area["lng"])) <= 2.0:
            is_tourist_area = True
            break

    if is_tourist_area:
        factors.append({"factor": "Tourist area", "impact": "+1", "note": "Popular tourist location"})
        score += 1
    else:
        factors.append({"factor": "Tourist area", "impact": "0", "note": "Regular area"})

    # Time of day factor
    if time_of_day == "night":
        factors.append({"factor": "Time of day", "impact": "-2", "note": "Night time - extra caution needed"})
        score -= 2

    # Calculate safety level
    if score >= 9:
        safety_level = "Very Safe"
        color = "green"
    elif score >= 7:
        safety_level = "Safe"
        color = "lightgreen"
    elif score >= 5:
        safety_level = "Moderate"
        color = "yellow"
    elif score >= 3:
        safety_level = "Caution"
        color = "orange"
    else:
        safety_level = "Avoid"
        color = "red"

    return {
        "safety_score": max(1, min(10, score)),  # Clamp between 1-10
        "safety_level": safety_level,
        "color": color,
        "factors": factors,
        "recommendations": self._get_safety_recommendations(score, time_of_day),
        "nearest_police": nearest_police,
        "police_distance_km": round(min_police_distance, 2) if nearest_police else None
    }


def _get_safety_recommendations(score: int, time_of_day: str) -> List[str]:
    """Get safety recommendations based on score"""
    recommendations = []

    if score <= 5:
        recommendations.append("Travel in groups")
        recommendations.append("Avoid carrying valuables")

    if time_of_day == "night":
        recommendations.append("Use well-lit routes")
        recommendations.append("Inform someone about your location")

    if score <= 3:
        recommendations.append("Consider postponing visit")
        recommendations.append("Use verified transportation only")

    # Always recommended
    recommendations.append("Save emergency contacts")
    recommendations.append("Share live location with trusted contact")

    return recommendations


def generate_map_url(
        lat: float,
        lng: float,
        zoom: int = 15,
        map_type: str = "roadmap"
) -> str:
    """
    Generate Google Maps URL for coordinates

    Args:
        lat, lng: Coordinates
        zoom: Map zoom level (1-20)
        map_type: "roadmap", "satellite", "hybrid", "terrain"

    Returns:
        Google Maps URL
    """
    if settings.GOOGLE_MAPS_API_KEY:
        # Embedded map with API key
        return f"https://www.google.com/maps/embed/v1/view?key={settings.GOOGLE_MAPS_API_KEY}&center={lat},{lng}&zoom={zoom}&maptype={map_type}"
    else:
        # Regular Google Maps link
        return f"https://www.google.com/maps?q={lat},{lng}&z={zoom}"


# Add methods to the module for easy access
def get_safety_recommendations(score: int, time_of_day: str) -> List[str]:
    return _get_safety_recommendations(score, time_of_day)


def get_weather_recommendation(condition: str) -> str:
    return _get_weather_recommendation(condition)


def get_weather_icon(condition: str) -> str:
    return _get_weather_icon(condition)


# Export constants and functions
__all__ = [
    'haversine_distance',
    'calculate_distance',
    'is_within_guwahati',
    'find_nearest_landmark',
    'get_safe_meeting_points',
    'calculate_travel_time',
    'get_address_from_coordinates',
    'suggest_itinerary_route',
    'validate_coordinates',
    'format_coordinates',
    'get_weather_at_location',
    'calculate_safety_score',
    'generate_map_url',
    'GUWAHATI_LANDMARKS',
    'MEETING_POINTS',
    'GUWAHATI_BOUNDS'
]