from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)

# Simple recipe database
RECIPES_DATABASE = [
    {
        "id": "1",
        "title": "Butter Chicken",
        "description": "Creamy and flavorful Indian curry",
        "ingredients": ["chicken", "butter", "tomato", "cream", "spices", "rice"],
        "cuisine": "North Indian",
        "region": "North",
        "difficulty": "Medium",
        "cookingTime": 45,
        "calories": 450,
        "dietType": ["Non-Veg"],
        "spiceLevel": "Medium",
        "mealType": "Dinner",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500"
    },
    {
        "id": "2",
        "title": "Dal Khichdi",
        "description": "Comforting rice and lentil dish",
        "ingredients": ["rice", "dal", "vegetables", "spices", "ghee"],
        "cuisine": "Gujarati",
        "region": "West",
        "difficulty": "Quick",
        "cookingTime": 30,
        "calories": 320,
        "dietType": ["Veg"],
        "spiceLevel": "Mild",
        "mealType": "Lunch",
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500"
    },
    {
        "id": "3",
        "title": "Paneer Tikka",
        "description": "Grilled cottage cheese with spices",
        "ingredients": ["paneer", "yogurt", "spices", "onion", "capsicum"],
        "cuisine": "North Indian",
        "region": "North",
        "difficulty": "Medium",
        "cookingTime": 25,
        "calories": 280,
        "dietType": ["Veg"],
        "spiceLevel": "Medium",
        "mealType": "Appetizer",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500"
    },
    {
        "id": "4",
        "title": "Masala Dosa",
        "description": "Crispy rice crepe with potato filling",
        "ingredients": ["rice", "urad dal", "potato", "onion", "spices"],
        "cuisine": "South Indian",
        "region": "South",
        "difficulty": "Hard",
        "cookingTime": 60,
        "calories": 350,
        "dietType": ["Veg"],
        "spiceLevel": "Medium",
        "mealType": "Breakfast",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500"
    },
    {
        "id": "5",
        "title": "Chicken Biryani",
        "description": "Aromatic rice dish with chicken",
        "ingredients": ["chicken", "basmati rice", "spices", "onion", "yogurt"],
        "cuisine": "Hyderabadi",
        "region": "South",
        "difficulty": "Hard",
        "cookingTime": 90,
        "calories": 550,
        "dietType": ["Non-Veg"],
        "spiceLevel": "Spicy",
        "mealType": "Dinner",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500"
    },
    {
        "id": "6",
        "title": "Aloo Paratha",
        "description": "Stuffed flatbread with potato",
        "ingredients": ["wheat flour", "potato", "spices", "oil", "butter"],
        "cuisine": "North Indian",
        "region": "North",
        "difficulty": "Medium",
        "cookingTime": 40,
        "calories": 300,
        "dietType": ["Veg"],
        "spiceLevel": "Mild",
        "mealType": "Breakfast",
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500"
    },
    {
        "id": "7",
        "title": "Fish Curry",
        "description": "Spicy fish curry with coconut",
        "ingredients": ["fish", "coconut", "spices", "onion", "tomato"],
        "cuisine": "Kerala",
        "region": "South",
        "difficulty": "Medium",
        "cookingTime": 35,
        "calories": 380,
        "dietType": ["Non-Veg"],
        "spiceLevel": "Spicy",
        "mealType": "Lunch",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500"
    },
    {
        "id": "8",
        "title": "Roti Sabzi",
        "description": "Simple flatbread with vegetables",
        "ingredients": ["wheat flour", "vegetables", "spices", "oil"],
        "cuisine": "North Indian",
        "region": "North",
        "difficulty": "Quick",
        "cookingTime": 25,
        "calories": 250,
        "dietType": ["Veg"],
        "spiceLevel": "Mild",
        "mealType": "Lunch",
        "rating": 4.0,
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500"
    }
]

def calculate_match_score(recipe, ingredients, leftovers, quiz_preferences, user_location):
    """Calculate match score for a recipe"""
    score = 0
    
    # Ingredient matching
    recipe_ingredients = [ing.lower() for ing in recipe.get('ingredients', [])]
    selected_items = [item.lower() for item in ingredients + leftovers]
    
    for item in selected_items:
        for recipe_ing in recipe_ingredients:
            if item in recipe_ing or recipe_ing in item:
                score += 2
                break
    
    # Quiz preferences matching
    if quiz_preferences:
        # Spice level matching
        if quiz_preferences.get('spiceLevel') == recipe.get('spiceLevel', '').lower():
            score += 1
        
        # Cuisine matching
        if quiz_preferences.get('cuisine') == recipe.get('region', '').lower():
            score += 1
        
        # Diet type matching
        if quiz_preferences.get('dietType') in recipe.get('dietType', []):
            score += 2
    
    # Location matching
    if user_location and user_location.get('region') == recipe.get('region'):
        score += 1
    
    return score

@app.route('/')
def home():
    return jsonify({
        "message": "CookWise Simple ML API",
        "status": "running",
        "endpoints": ["/health", "/recipes", "/recommend"]
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": "2024-01-01T00:00:00Z",
        "version": "1.0.0"
    })

@app.route('/recipes')
def get_recipes():
    return jsonify({
        "status": "success",
        "recipes": RECIPES_DATABASE,
        "count": len(RECIPES_DATABASE)
    })

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        
        ingredients = data.get('ingredients', [])
        leftovers = data.get('leftovers', [])
        quiz_preferences = data.get('quiz_preferences', {})
        user_location = data.get('user_location', {})
        top_k = data.get('top_k', 10)
        
        # Calculate scores for all recipes
        scored_recipes = []
        for recipe in RECIPES_DATABASE:
            score = calculate_match_score(recipe, ingredients, leftovers, quiz_preferences, user_location)
            if score > 0:  # Only include recipes with some match
                scored_recipes.append({
                    **recipe,
                    "matchScore": score,
                    "matchPercentage": min(score * 20, 100),  # Convert score to percentage
                    "quizMatch": score > 2,
                    "locationMatch": user_location.get('region') == recipe.get('region'),
                    "leftoverCompatibility": len([item for item in leftovers if any(item.lower() in ing.lower() for ing in recipe.get('ingredients', []))])
                })
        
        # Sort by score and take top_k
        scored_recipes.sort(key=lambda x: x['matchScore'], reverse=True)
        recommendations = scored_recipes[:top_k]
        
        # If no matches, return random recipes
        if not recommendations:
            recommendations = random.sample(RECIPES_DATABASE, min(top_k, len(RECIPES_DATABASE)))
            for recipe in recommendations:
                recipe.update({
                    "matchScore": 1,
                    "matchPercentage": 20,
                    "quizMatch": False,
                    "locationMatch": False,
                    "leftoverCompatibility": 0
                })
        
        return jsonify({
            "status": "success",
            "recommendations": recommendations,
            "count": len(recommendations),
            "query": {
                "ingredients": ingredients,
                "leftovers": leftovers,
                "quiz_preferences": quiz_preferences,
                "user_location": user_location
            }
        })
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/test', methods=['POST'])
def test_recommendations():
    """Test endpoint with sample data"""
    test_data = {
        "ingredients": ["rice", "chicken", "spices"],
        "leftovers": [],
        "quiz_preferences": {
            "spiceLevel": "medium",
            "cuisine": "north",
            "experience": "medium",
            "time": "medium",
            "dietType": "non-veg"
        },
        "user_location": {
            "state": "Maharashtra",
            "region": "West"
        },
        "top_k": 5
    }
    
    # Simulate the recommendation logic
    return get_recommendations()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 