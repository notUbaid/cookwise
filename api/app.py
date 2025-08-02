from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
import json
import traceback
from datetime import datetime

# Add the parent directory to the path to import the ML module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from ml_recipe_recommender import RecipeRecommender
    import numpy as np
    import pandas as pd
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.preprocessing import StandardScaler, LabelEncoder
    from sklearn.ensemble import RandomForestRegressor
    import pickle
except ImportError as e:
    print(f"Import error: {e}")
    # Fallback for missing dependencies
    pass

app = Flask(__name__)
CORS(app)

# Global variables
recommender = None
recipes_data = None

def load_mock_data():
    """Load mock recipe data"""
    try:
        # This will be replaced with actual data loading
        mock_recipes = [
            {
                "id": "1",
                "title": "Butter Chicken",
                "description": "Creamy and flavorful Indian curry",
                "ingredients": ["chicken", "butter", "tomato", "cream", "spices"],
                "cuisine": "North Indian",
                "region": "North",
                "state": "Punjab",
                "difficulty": "Medium",
                "cookingTime": 45,
                "calories": 450,
                "servings": 4,
                "dietType": ["Non-Veg"],
                "spiceLevel": "Medium",
                "mealType": "Dinner",
                "isHealthy": False,
                "isFestive": True,
                "isStreetFood": False,
                "tags": ["curry", "chicken", "creamy"],
                "rating": 4.5
            },
            {
                "id": "2",
                "title": "Dal Khichdi",
                "description": "Comforting rice and lentil dish",
                "ingredients": ["rice", "dal", "vegetables", "spices", "ghee"],
                "cuisine": "Gujarati",
                "region": "West",
                "state": "Gujarat",
                "difficulty": "Easy",
                "cookingTime": 30,
                "calories": 320,
                "servings": 4,
                "dietType": ["Veg"],
                "spiceLevel": "Mild",
                "mealType": "Lunch",
                "isHealthy": True,
                "isFestive": False,
                "isStreetFood": False,
                "tags": ["comfort", "healthy", "one-pot"],
                "rating": 4.2
            },
            {
                "id": "3",
                "title": "Masala Dosa",
                "description": "Crispy South Indian crepe with potato filling",
                "ingredients": ["rice", "urad dal", "potato", "onion", "spices"],
                "cuisine": "South Indian",
                "region": "South",
                "state": "Karnataka",
                "difficulty": "Hard",
                "cookingTime": 60,
                "calories": 280,
                "servings": 2,
                "dietType": ["Veg"],
                "spiceLevel": "Medium",
                "mealType": "Breakfast",
                "isHealthy": True,
                "isFestive": False,
                "isStreetFood": True,
                "tags": ["breakfast", "crispy", "traditional"],
                "rating": 4.7
            }
        ]
        return mock_recipes
    except Exception as e:
        print(f"Error loading mock data: {e}")
        return []

def initialize_recommender():
    """Initialize the ML recommender"""
    global recommender, recipes_data
    try:
        recommender = RecipeRecommender()
        recipes_data = load_mock_data()
        print(f"Initialized recommender with {len(recipes_data)} recipes")
        return True
    except Exception as e:
        print(f"Error initializing recommender: {e}")
        traceback.print_exc()
        return False

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "CookWise ML Recipe Recommender API",
        "timestamp": datetime.now().isoformat(),
        "endpoints": {
            "/recommend": "POST - Get recipe recommendations",
            "/health": "GET - Health check",
            "/recipes": "GET - List all recipes"
        }
    })

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "recommender_initialized": recommender is not None,
        "recipes_loaded": len(recipes_data) if recipes_data else 0,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/recipes')
def get_recipes():
    """Get all available recipes"""
    try:
        return jsonify({
            "status": "success",
            "recipes": recipes_data,
            "count": len(recipes_data)
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    """Get personalized recipe recommendations"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "status": "error",
                "message": "No data provided"
            }), 400
        
        # Extract parameters
        selected_ingredients = data.get('ingredients', [])
        selected_leftovers = data.get('leftovers', [])
        quiz_preferences = data.get('quiz_preferences', {})
        user_location = data.get('user_location', {})
        top_k = data.get('top_k', 10)
        
        # Validate inputs
        if not selected_ingredients and not selected_leftovers:
            return jsonify({
                "status": "error",
                "message": "At least one ingredient or leftover must be selected"
            }), 400
        
        # Get recommendations
        if recommender and recipes_data:
            recommendations = recommender.get_recommendations(
                recipes_data=recipes_data,
                selected_ingredients=selected_ingredients,
                selected_leftovers=selected_leftovers,
                quiz_preferences=quiz_preferences,
                user_location=user_location,
                top_k=top_k
            )
            
            return jsonify({
                "status": "success",
                "recommendations": recommendations,
                "count": len(recommendations),
                "query": {
                    "ingredients": selected_ingredients,
                    "leftovers": selected_leftovers,
                    "quiz_preferences": quiz_preferences,
                    "user_location": user_location
                }
            })
        else:
            return jsonify({
                "status": "error",
                "message": "Recommender not initialized"
            }), 500
            
    except Exception as e:
        print(f"Error in recommendations: {e}")
        traceback.print_exc()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/test', methods=['POST'])
def test_recommendations():
    """Test endpoint with sample data"""
    try:
        test_data = {
            "ingredients": ["rice", "tomato", "onion"],
            "leftovers": ["dal"],
            "quiz_preferences": {
                "diet": "Vegetarian",
                "spiceLevel": "Medium",
                "cookingTime": "Quick",
                "cuisine": "Indian",
                "healthFocus": "Healthy"
            },
            "user_location": {
                "state": "Maharashtra",
                "region": "West"
            },
            "top_k": 5
        }
        
        # Get recommendations
        if recommender and recipes_data:
            recommendations = recommender.get_recommendations(
                recipes_data=recipes_data,
                selected_ingredients=test_data["ingredients"],
                selected_leftovers=test_data["leftovers"],
                quiz_preferences=test_data["quiz_preferences"],
                user_location=test_data["user_location"],
                top_k=test_data["top_k"]
            )
            
            return jsonify({
                "status": "success",
                "test_data": test_data,
                "recommendations": recommendations,
                "count": len(recommendations)
            })
        else:
            return jsonify({
                "status": "error",
                "message": "Recommender not initialized"
            }), 500
            
    except Exception as e:
        print(f"Error in test: {e}")
        traceback.print_exc()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

# Initialize the recommender when the app starts
if __name__ == '__main__':
    print("Initializing CookWise ML API...")
    success = initialize_recommender()
    if success:
        print("✅ ML API initialized successfully!")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("❌ Failed to initialize ML API")
        sys.exit(1)
else:
    # For Vercel deployment
    print("Initializing for Vercel deployment...")
    initialize_recommender() 