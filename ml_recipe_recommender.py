#!/usr/bin/env python3
"""
Advanced Recipe Recommendation System using Machine Learning
This module provides sophisticated recipe recommendations using:
1. Content-based filtering based on recipe features
2. Collaborative filtering for user preferences
3. Hybrid approach combining both methods
"""

import json
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import pickle
from typing import List, Dict, Tuple, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RecipeRecommender:
    def __init__(self):
        self.recipes_df = None
        self.tfidf_matrix = None
        self.cosine_sim = None
        self.scaler = StandardScaler()
        self.pca = PCA(n_components=10)
        self.user_preferences = {}
        
    def load_recipes(self, recipes_data: List[Dict]) -> None:
        """Load and preprocess recipe data"""
        logger.info("Loading and preprocessing recipe data...")
        
        # Convert to DataFrame
        self.recipes_df = pd.DataFrame(recipes_data)
        
        # Create feature vectors
        self._create_feature_vectors()
        
        # Calculate similarity matrix
        self._calculate_similarity_matrix()
        
        logger.info(f"Loaded {len(self.recipes_df)} recipes")
    
    def _create_feature_vectors(self) -> None:
        """Create feature vectors for content-based filtering"""
        # Combine text features for TF-IDF
        self.recipes_df['text_features'] = (
            self.recipes_df['title'] + ' ' +
            self.recipes_df['cuisine'] + ' ' +
            self.recipes_df['region'] + ' ' +
            self.recipes_df['spiceLevel'] + ' ' +
            self.recipes_df['mealType'] + ' ' +
            ' '.join(self.recipes_df['dietType'].apply(lambda x: ' '.join(x) if isinstance(x, list) else str(x))) + ' ' +
            ' '.join(self.recipes_df['tags'].apply(lambda x: ' '.join(x) if isinstance(x, list) else str(x)))
        )
        
        # Create TF-IDF matrix
        tfidf = TfidfVectorizer(stop_words='english', max_features=1000)
        self.tfidf_matrix = tfidf.fit_transform(self.recipes_df['text_features'])
        
        # Create numerical features
        numerical_features = self.recipes_df[[
            'cookingTime', 'prepTime', 'calories', 
            'macros.protein', 'macros.carbs', 'macros.fat'
        ]].fillna(0)
        
        # Scale numerical features
        self.numerical_features_scaled = self.scaler.fit_transform(numerical_features)
        
        # Apply PCA for dimensionality reduction
        self.numerical_features_pca = self.pca.fit_transform(self.numerical_features_scaled)
    
    def _calculate_similarity_matrix(self) -> None:
        """Calculate cosine similarity matrix"""
        # Combine TF-IDF and numerical features
        combined_features = np.hstack([
            self.tfidf_matrix.toarray(),
            self.numerical_features_pca
        ])
        
        # Calculate cosine similarity
        self.cosine_sim = cosine_similarity(combined_features)
    
    def content_based_recommendations(self, recipe_id: str, n_recommendations: int = 10) -> List[Dict]:
        """Get content-based recommendations for a recipe"""
        try:
            # Find recipe index
            recipe_idx = self.recipes_df[self.recipes_df['id'] == recipe_id].index[0]
            
            # Get similarity scores
            sim_scores = list(enumerate(self.cosine_sim[recipe_idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            
            # Get top similar recipes (excluding the recipe itself)
            sim_scores = sim_scores[1:n_recommendations+1]
            recipe_indices = [i[0] for i in sim_scores]
            
            recommendations = []
            for idx in recipe_indices:
                recipe = self.recipes_df.iloc[idx].to_dict()
                recipe['similarity_score'] = float(sim_scores[recipe_indices.index(idx)][1])
                recommendations.append(recipe)
            
            return recommendations
            
        except (IndexError, KeyError) as e:
            logger.error(f"Error in content-based recommendations: {e}")
            return []
    
    def preference_based_recommendations(self, user_preferences: Dict, n_recommendations: int = 10) -> List[Dict]:
        """Get recommendations based on user preferences"""
        logger.info("Generating preference-based recommendations...")
        
        # Create preference vector
        preference_scores = []
        
        for _, recipe in self.recipes_df.iterrows():
            score = 0
            match_reasons = []
            
            # Spice level matching
            spice_map = {'mild': 'Mild', 'medium': 'Medium', 'spicy': 'Spicy'}
            if user_preferences.get('spiceLevel') and recipe['spiceLevel'] == spice_map.get(user_preferences['spiceLevel']):
                score += 25
                match_reasons.append(f"Perfect spice level: {recipe['spiceLevel']}")
            
            # Cuisine/region matching
            cuisine_region_map = {
                'north': ['North', 'Northeast'],
                'south': ['South'],
                'east': ['East'],
                'west': ['West']
            }
            if user_preferences.get('cuisine') and recipe['region'] in cuisine_region_map.get(user_preferences['cuisine'], []):
                score += 20
                match_reasons.append(f"Regional cuisine: {recipe['region']} Indian")
            
            # Cooking time matching
            time_map = {'quick': 'Quick', 'medium': 'Medium', 'long': 'Long'}
            if user_preferences.get('time') and recipe['difficulty'] == time_map.get(user_preferences['time']):
                score += 20
                match_reasons.append(f"Ideal cooking time: {recipe['difficulty']}")
            
            # Dietary preference matching
            if user_preferences.get('dietType'):
                diet_matches = {
                    'veg': any('Veg' in diet and 'Non' not in diet for diet in recipe['dietType']),
                    'vegan': any('Vegan' in diet for diet in recipe['dietType']),
                    'non-veg': any('Non-Veg' in diet for diet in recipe['dietType']),
                    'flexible': True
                }
                if diet_matches.get(user_preferences['dietType']):
                    score += 20
                    match_reasons.append(f"Dietary match: {', '.join(recipe['dietType'])}")
            
            # Experience level matching
            experience_map = {'easy': 'Easy', 'medium': 'Medium', 'hard': 'Hard'}
            if user_preferences.get('experience') and recipe['effort'] == experience_map.get(user_preferences['experience']):
                score += 15
                match_reasons.append(f"Perfect difficulty: {recipe['effort']}")
            
            # Bonus points
            if user_preferences.get('time') == 'quick' and recipe.get('isHealthy'):
                score += 5
                match_reasons.append('Healthy quick option')
            
            if user_preferences.get('spiceLevel') == 'spicy' and recipe.get('isStreetFood'):
                score += 5
                match_reasons.append('Authentic street food')
            
            preference_scores.append({
                'recipe': recipe.to_dict(),
                'score': score,
                'match_reasons': match_reasons
            })
        
        # Sort by score and return top recommendations
        preference_scores.sort(key=lambda x: x['score'], reverse=True)
        
        recommendations = []
        for item in preference_scores[:n_recommendations]:
            if item['score'] > 0:  # Only include recipes with some match
                recipe = item['recipe']
                recipe['preference_score'] = item['score']
                recipe['match_reasons'] = item['match_reasons']
                recommendations.append(recipe)
        
        return recommendations
    
    def hybrid_recommendations(self, user_preferences: Dict, n_recommendations: int = 10) -> List[Dict]:
        """Get hybrid recommendations combining content-based and preference-based approaches"""
        logger.info("Generating hybrid recommendations...")
        
        # Get preference-based recommendations
        pref_recommendations = self.preference_based_recommendations(user_preferences, n_recommendations * 2)
        
        # If we have enough preference-based recommendations, return them
        if len(pref_recommendations) >= n_recommendations:
            return pref_recommendations[:n_recommendations]
        
        # Otherwise, supplement with content-based recommendations
        content_recommendations = []
        for recipe in pref_recommendations[:n_recommendations//2]:
            similar_recipes = self.content_based_recommendations(recipe['id'], 5)
            content_recommendations.extend(similar_recipes)
        
        # Combine and deduplicate
        all_recommendations = pref_recommendations + content_recommendations
        seen_ids = set()
        final_recommendations = []
        
        for recipe in all_recommendations:
            if recipe['id'] not in seen_ids and len(final_recommendations) < n_recommendations:
                seen_ids.add(recipe['id'])
                final_recommendations.append(recipe)
        
        return final_recommendations
    
    def get_personalized_recommendations(self, user_preferences: Dict, n_recommendations: int = 12) -> Dict:
        """Get comprehensive personalized recommendations with explanations"""
        logger.info("Generating personalized recommendations...")
        
        # Get hybrid recommendations
        recommendations = self.hybrid_recommendations(user_preferences, n_recommendations)
        
        # Analyze user preferences
        preference_analysis = self._analyze_preferences(user_preferences)
        
        # Generate recommendation insights
        insights = self._generate_insights(recommendations, user_preferences)
        
        return {
            'recommendations': recommendations,
            'preference_analysis': preference_analysis,
            'insights': insights,
            'total_recommendations': len(recommendations)
        }
    
    def _analyze_preferences(self, user_preferences: Dict) -> Dict:
        """Analyze user preferences and provide insights"""
        analysis = {
            'spice_tolerance': 'Moderate',
            'cuisine_preference': 'Balanced',
            'cooking_style': 'Traditional',
            'time_availability': 'Flexible',
            'dietary_focus': 'Inclusive'
        }
        
        # Analyze spice preference
        if user_preferences.get('spiceLevel') == 'spicy':
            analysis['spice_tolerance'] = 'High'
        elif user_preferences.get('spiceLevel') == 'mild':
            analysis['spice_tolerance'] = 'Low'
        
        # Analyze cuisine preference
        cuisine = user_preferences.get('cuisine', '')
        if cuisine in ['north', 'south']:
            analysis['cuisine_preference'] = f'{cuisine.title()} Indian'
        
        # Analyze cooking style
        experience = user_preferences.get('experience', '')
        if experience == 'hard':
            analysis['cooking_style'] = 'Experimental'
        elif experience == 'easy':
            analysis['cooking_style'] = 'Simple'
        
        # Analyze time availability
        time = user_preferences.get('time', '')
        if time == 'quick':
            analysis['time_availability'] = 'Limited'
        elif time == 'long':
            analysis['time_availability'] = 'Generous'
        
        # Analyze dietary focus
        diet = user_preferences.get('dietType', '')
        if diet in ['veg', 'vegan']:
            analysis['dietary_focus'] = 'Plant-based'
        elif diet == 'non-veg':
            analysis['dietary_focus'] = 'Protein-rich'
        
        return analysis
    
    def _generate_insights(self, recommendations: List[Dict], user_preferences: Dict) -> List[str]:
        """Generate insights about the recommendations"""
        insights = []
        
        if not recommendations:
            insights.append("No specific recommendations found. Try adjusting your preferences.")
            return insights
        
        # Analyze spice levels
        spice_levels = [r['spiceLevel'] for r in recommendations]
        if len(set(spice_levels)) == 1:
            insights.append(f"All recommendations are {spice_levels[0].lower()} - perfect for your spice preference!")
        
        # Analyze cooking times
        quick_recipes = [r for r in recommendations if r['cookingTime'] <= 30]
        if quick_recipes and user_preferences.get('time') == 'quick':
            insights.append(f"{len(quick_recipes)} quick recipes (≤30 min) match your time preference.")
        
        # Analyze regional diversity
        regions = [r['region'] for r in recommendations]
        unique_regions = len(set(regions))
        if unique_regions >= 3:
            insights.append(f"Diverse regional cuisine: {unique_regions} different regions represented.")
        
        # Analyze dietary options
        veg_options = [r for r in recommendations if any('Veg' in diet and 'Non' not in diet for diet in r['dietType'])]
        if veg_options and user_preferences.get('dietType') in ['veg', 'vegan']:
            insights.append(f"{len(veg_options)} vegetarian options available.")
        
        return insights

def save_model(model: RecipeRecommender, filepath: str) -> None:
    """Save the trained model"""
    with open(filepath, 'wb') as f:
        pickle.dump(model, f)
    logger.info(f"Model saved to {filepath}")

def load_model(filepath: str) -> RecipeRecommender:
    """Load a trained model"""
    with open(filepath, 'rb') as f:
        model = pickle.load(f)
    logger.info(f"Model loaded from {filepath}")
    return model

# Example usage and testing
if __name__ == "__main__":
    # Example usage
    recommender = RecipeRecommender()
    
    # Load sample data (you would load your actual recipe data here)
    sample_recipes = [
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
        }
        # Add more sample recipes here
    ]
    
    # Load recipes
    recommender.load_recipes(sample_recipes)
    
    # Example user preferences
    user_prefs = {
        "spiceLevel": "medium",
        "cuisine": "south",
        "experience": "medium",
        "time": "medium",
        "dietType": "flexible"
    }
    
    # Get recommendations
    recommendations = recommender.get_personalized_recommendations(user_prefs)
    print(json.dumps(recommendations, indent=2)) 