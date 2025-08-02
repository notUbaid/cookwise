#!/usr/bin/env python3
"""
Flask API for serving ML-powered recipe recommendations
This API bridges the Python ML component with the React frontend
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from ml_recipe_recommender import RecipeRecommender, save_model, load_model
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Global recommender instance
recommender = None
MODEL_PATH = 'recipe_recommender_model.pkl'

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'ML API is running'})

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    """Get personalized recipe recommendations"""
    try:
        data = request.get_json()
        
        if not data or 'preferences' not in data:
            return jsonify({'error': 'Missing preferences data'}), 400
        
        user_preferences = data['preferences']
        
        # Validate preferences
        required_fields = ['spiceLevel', 'cuisine', 'experience', 'time', 'dietType']
        for field in required_fields:
            if field not in user_preferences:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Get recommendations
        if recommender:
            recommendations = recommender.get_personalized_recommendations(
                user_preferences, 
                n_recommendations=data.get('limit', 12)
            )
            return jsonify(recommendations)
        else:
            return jsonify({'error': 'Recommender not initialized'}), 500
            
    except Exception as e:
        logger.error(f"Error in recommendations endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/recommendations/content-based', methods=['POST'])
def get_content_based_recommendations():
    """Get content-based recommendations for a specific recipe"""
    try:
        data = request.get_json()
        
        if not data or 'recipe_id' not in data:
            return jsonify({'error': 'Missing recipe_id'}), 400
        
        recipe_id = data['recipe_id']
        limit = data.get('limit', 10)
        
        if recommender:
            recommendations = recommender.content_based_recommendations(recipe_id, limit)
            return jsonify({'recommendations': recommendations})
        else:
            return jsonify({'error': 'Recommender not initialized'}), 500
            
    except Exception as e:
        logger.error(f"Error in content-based recommendations: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/recommendations/preference-based', methods=['POST'])
def get_preference_based_recommendations():
    """Get preference-based recommendations"""
    try:
        data = request.get_json()
        
        if not data or 'preferences' not in data:
            return jsonify({'error': 'Missing preferences data'}), 400
        
        user_preferences = data['preferences']
        limit = data.get('limit', 10)
        
        if recommender:
            recommendations = recommender.preference_based_recommendations(user_preferences, limit)
            return jsonify({'recommendations': recommendations})
        else:
            return jsonify({'error': 'Recommender not initialized'}), 500
            
    except Exception as e:
        logger.error(f"Error in preference-based recommendations: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/model/load', methods=['POST'])
def load_recipe_data():
    """Load recipe data and initialize the model"""
    try:
        data = request.get_json()
        
        if not data or 'recipes' not in data:
            return jsonify({'error': 'Missing recipes data'}), 400
        
        recipes = data['recipes']
        
        if not recipes:
            return jsonify({'error': 'No recipes provided'}), 400
        
        global recommender
        recommender = RecipeRecommender()
        recommender.load_recipes(recipes)
        
        # Save the model for future use
        save_model(recommender, MODEL_PATH)
        
        return jsonify({
            'message': 'Model loaded successfully',
            'recipes_count': len(recipes)
        })
        
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/model/status', methods=['GET'])
def get_model_status():
    """Get the current status of the ML model"""
    try:
        if recommender and recommender.recipes_df is not None:
            return jsonify({
                'status': 'loaded',
                'recipes_count': len(recommender.recipes_df),
                'model_ready': True
            })
        else:
            return jsonify({
                'status': 'not_loaded',
                'recipes_count': 0,
                'model_ready': False
            })
    except Exception as e:
        logger.error(f"Error getting model status: {e}")
        return jsonify({'error': 'Internal server error'}), 500

def initialize_model():
    """Initialize the model on startup if saved model exists"""
    global recommender
    
    try:
        if os.path.exists(MODEL_PATH):
            recommender = load_model(MODEL_PATH)
            logger.info("Model loaded from saved file")
        else:
            logger.info("No saved model found. Use /api/model/load to initialize.")
    except Exception as e:
        logger.error(f"Error initializing model: {e}")

if __name__ == '__main__':
    # Initialize model on startup
    initialize_model()
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    ) 