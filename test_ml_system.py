#!/usr/bin/env python3
"""
Test script for the ML Recipe Recommendation System
This script demonstrates the enhanced recommendation capabilities
"""

import json
from ml_recipe_recommender import RecipeRecommender

def create_sample_recipes():
    """Create sample recipe data for testing"""
    return [
        {
            "id": "1",
            "title": "Hyderabadi Biryani",
            "cuisine": "Hyderabadi",
            "region": "South",
            "spiceLevel": "Medium",
            "mealType": "Lunch",
            "dietType": ["Non-Veg"],
            "tags": ["biryani", "rice", "spicy"],
            "cookingTime": 90,
            "prepTime": 30,
            "calories": 450,
            "macros": {"protein": 25, "carbs": 60, "fat": 15},
            "effort": "Hard",
            "difficulty": "Long",
            "isHealthy": False,
            "isStreetFood": False
        },
        {
            "id": "2",
            "title": "Masala Dosa",
            "cuisine": "South Indian",
            "region": "South",
            "spiceLevel": "Mild",
            "mealType": "Breakfast",
            "dietType": ["Veg"],
            "tags": ["dosa", "breakfast", "fermented"],
            "cookingTime": 30,
            "prepTime": 15,
            "calories": 200,
            "macros": {"protein": 8, "carbs": 35, "fat": 5},
            "effort": "Medium",
            "difficulty": "Quick",
            "isHealthy": True,
            "isStreetFood": True
        },
        {
            "id": "3",
            "title": "Butter Chicken",
            "cuisine": "North Indian",
            "region": "North",
            "spiceLevel": "Medium",
            "mealType": "Dinner",
            "dietType": ["Non-Veg"],
            "tags": ["chicken", "curry", "creamy"],
            "cookingTime": 45,
            "prepTime": 20,
            "calories": 350,
            "macros": {"protein": 30, "carbs": 15, "fat": 20},
            "effort": "Medium",
            "difficulty": "Medium",
            "isHealthy": False,
            "isStreetFood": False
        },
        {
            "id": "4",
            "title": "Poha",
            "cuisine": "Maharashtrian",
            "region": "West",
            "spiceLevel": "Mild",
            "mealType": "Breakfast",
            "dietType": ["Veg"],
            "tags": ["poha", "breakfast", "quick"],
            "cookingTime": 15,
            "prepTime": 5,
            "calories": 180,
            "macros": {"protein": 5, "carbs": 30, "fat": 3},
            "effort": "Easy",
            "difficulty": "Quick",
            "isHealthy": True,
            "isStreetFood": True
        },
        {
            "id": "5",
            "title": "Vindaloo",
            "cuisine": "Goan",
            "region": "West",
            "spiceLevel": "Spicy",
            "mealType": "Dinner",
            "dietType": ["Non-Veg"],
            "tags": ["vindaloo", "spicy", "goan"],
            "cookingTime": 60,
            "prepTime": 25,
            "calories": 400,
            "macros": {"protein": 35, "carbs": 20, "fat": 25},
            "effort": "Hard",
            "difficulty": "Long",
            "isHealthy": False,
            "isStreetFood": False
        }
    ]

def test_recommendation_system():
    """Test the recommendation system with different user preferences"""
    
    # Create sample recipes
    recipes = create_sample_recipes()
    
    # Initialize recommender
    recommender = RecipeRecommender()
    recommender.load_recipes(recipes)
    
    print("🍳 ML Recipe Recommendation System Test")
    print("=" * 50)
    
    # Test case 1: Spicy food lover
    print("\n1. Testing for Spicy Food Lover:")
    print("-" * 30)
    spicy_prefs = {
        "spiceLevel": "spicy",
        "cuisine": "west",
        "experience": "medium",
        "time": "medium",
        "dietType": "non-veg"
    }
    
    result = recommender.get_personalized_recommendations(spicy_prefs)
    print(f"Found {result['total_recommendations']} recommendations")
    print("Top recommendations:")
    for i, rec in enumerate(result['recommendations'][:3], 1):
        print(f"  {i}. {rec['title']} (Score: {rec['preference_score']})")
        print(f"     Match reasons: {', '.join(rec['match_reasons'])}")
    
    # Test case 2: Quick vegetarian breakfast
    print("\n2. Testing for Quick Vegetarian Breakfast:")
    print("-" * 40)
    quick_veg_prefs = {
        "spiceLevel": "mild",
        "cuisine": "south",
        "experience": "easy",
        "time": "quick",
        "dietType": "veg"
    }
    
    result = recommender.get_personalized_recommendations(quick_veg_prefs)
    print(f"Found {result['total_recommendations']} recommendations")
    print("Top recommendations:")
    for i, rec in enumerate(result['recommendations'][:3], 1):
        print(f"  {i}. {rec['title']} (Score: {rec['preference_score']})")
        print(f"     Match reasons: {', '.join(rec['match_reasons'])}")
    
    # Test case 3: Content-based recommendations
    print("\n3. Testing Content-Based Recommendations:")
    print("-" * 40)
    content_recs = recommender.content_based_recommendations("1", 3)  # Similar to Hyderabadi Biryani
    print("Recipes similar to Hyderabadi Biryani:")
    for i, rec in enumerate(content_recs, 1):
        print(f"  {i}. {rec['title']} (Similarity: {rec['similarity_score']:.2f})")
    
    # Test case 4: Preference analysis
    print("\n4. Testing Preference Analysis:")
    print("-" * 30)
    analysis = recommender._analyze_preferences(spicy_prefs)
    for key, value in analysis.items():
        print(f"  {key.replace('_', ' ').title()}: {value}")
    
    # Test case 5: Insights generation
    print("\n5. Testing Insights Generation:")
    print("-" * 30)
    insights = recommender._generate_insights(result['recommendations'], spicy_prefs)
    for insight in insights:
        print(f"  • {insight}")

if __name__ == "__main__":
    test_recommendation_system() 