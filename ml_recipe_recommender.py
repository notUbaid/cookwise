import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor
import json
import pickle
from typing import List, Dict, Any, Tuple
import re

class RecipeRecommender:
    def __init__(self):
        self.tfidf_vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.recipes_data = None
        self.recipe_features = None
        self.recipe_embeddings = None
        
    def preprocess_recipe_data(self, recipes_data: List[Dict]) -> pd.DataFrame:
        """Preprocess recipe data for ML features"""
        df = pd.DataFrame(recipes_data)
        
        # Create comprehensive feature set
        df['ingredients_text'] = df['ingredients'].apply(lambda x: ' '.join(x) if isinstance(x, list) else str(x))
        df['tags_text'] = df['tags'].apply(lambda x: ' '.join(x) if isinstance(x, list) else str(x))
        df['cuisine_text'] = df['cuisine'].fillna('')
        df['region_text'] = df['region'].fillna('')
        df['state_text'] = df['state'].fillna('')
        
        # Combine all text features
        df['combined_text'] = (
            df['ingredients_text'] + ' ' + 
            df['tags_text'] + ' ' + 
            df['cuisine_text'] + ' ' + 
            df['region_text'] + ' ' + 
            df['state_text'] + ' ' + 
            df['title'] + ' ' + 
            df['description']
        )
        
        # Encode categorical features
        categorical_features = ['cuisine', 'region', 'state', 'difficulty', 'mealType', 'spiceLevel']
        for feature in categorical_features:
            if feature in df.columns:
                le = LabelEncoder()
                df[f'{feature}_encoded'] = le.fit_transform(df[feature].fillna('Unknown'))
                self.label_encoders[feature] = le
        
        # Normalize numerical features
        numerical_features = ['cookingTime', 'calories', 'servings']
        for feature in numerical_features:
            if feature in df.columns:
                df[f'{feature}_normalized'] = (df[feature] - df[feature].mean()) / df[feature].std()
        
        # Create diet type features
        df['is_veg'] = df['dietType'].apply(lambda x: 1 if isinstance(x, list) and 'Veg' in x else 0)
        df['is_vegan'] = df['dietType'].apply(lambda x: 1 if isinstance(x, list) and 'Vegan' in x else 0)
        df['is_gluten_free'] = df['dietType'].apply(lambda x: 1 if isinstance(x, list) and 'Gluten-Free' in x else 0)
        df['is_healthy'] = df['isHealthy'].apply(lambda x: 1 if x else 0)
        df['is_festive'] = df['isFestive'].apply(lambda x: 1 if x else 0)
        df['is_street_food'] = df['isStreetFood'].apply(lambda x: 1 if x else 0)
        
        return df
    
    def create_recipe_embeddings(self, df: pd.DataFrame):
        """Create TF-IDF embeddings for recipe text"""
        # Create TF-IDF embeddings
        text_features = self.tfidf_vectorizer.fit_transform(df['combined_text'])
        self.recipe_embeddings = text_features.toarray()
        
        # Create numerical feature matrix
        feature_columns = [
            'cuisine_encoded', 'region_encoded', 'state_encoded', 
            'difficulty_encoded', 'mealType_encoded', 'spiceLevel_encoded',
            'cookingTime_normalized', 'calories_normalized', 'servings_normalized',
            'is_veg', 'is_vegan', 'is_gluten_free', 'is_healthy', 'is_festive', 'is_street_food'
        ]
        
        available_features = [col for col in feature_columns if col in df.columns]
        numerical_features = df[available_features].fillna(0).values
        
        # Combine TF-IDF and numerical features
        self.recipe_features = np.hstack([self.recipe_embeddings, numerical_features])
        
        return self.recipe_features
    
    def calculate_ingredient_similarity(self, selected_ingredients: List[str], recipe_ingredients: List[str]) -> float:
        """Calculate similarity between selected ingredients and recipe ingredients"""
        if not selected_ingredients or not recipe_ingredients:
            return 0.0
        
        # Normalize ingredients
        selected_norm = [ing.lower().strip() for ing in selected_ingredients]
        recipe_norm = [ing.lower().strip() for ing in recipe_ingredients]
        
        # Calculate intersection
        matches = 0
        for sel_ing in selected_norm:
            for rec_ing in recipe_norm:
                if sel_ing in rec_ing or rec_ing in sel_ing:
                    matches += 1
                    break
        
        return matches / len(selected_ingredients) if selected_ingredients else 0.0
    
    def calculate_quiz_preference_score(self, quiz_preferences: Dict, recipe: Dict) -> float:
        """Calculate preference score based on quiz data"""
        score = 0.0
        
        # Diet preferences
        if quiz_preferences.get('diet') == 'Vegetarian' and 'Veg' in recipe.get('dietType', []):
            score += 2.0
        elif quiz_preferences.get('diet') == 'Vegan' and 'Vegan' in recipe.get('dietType', []):
            score += 2.0
        elif quiz_preferences.get('diet') == 'Non-Vegetarian' and 'Non-Veg' in recipe.get('dietType', []):
            score += 2.0
        
        # Spice level preferences
        quiz_spice = quiz_preferences.get('spiceLevel', '')
        recipe_spice = recipe.get('spiceLevel', '')
        if quiz_spice == recipe_spice:
            score += 1.5
        
        # Cooking time preferences
        quiz_time = quiz_preferences.get('cookingTime', '')
        recipe_time = recipe.get('cookingTime', 0)
        if quiz_time == 'Quick' and recipe_time <= 30:
            score += 1.0
        elif quiz_time == 'Medium' and 30 < recipe_time <= 60:
            score += 1.0
        elif quiz_time == 'Long' and recipe_time > 60:
            score += 1.0
        
        # Cuisine preferences
        quiz_cuisine = quiz_preferences.get('cuisine', '')
        recipe_cuisine = recipe.get('cuisine', '')
        if quiz_cuisine and quiz_cuisine.lower() in recipe_cuisine.lower():
            score += 1.5
        
        # Health preferences
        if quiz_preferences.get('healthFocus') == 'Healthy' and recipe.get('isHealthy', False):
            score += 1.0
        
        return score
    
    def calculate_location_score(self, user_location: Dict, recipe: Dict) -> float:
        """Calculate location-based preference score"""
        score = 0.0
        
        user_state = user_location.get('state', '').lower()
        user_region = user_location.get('region', '').lower()
        
        recipe_state = recipe.get('state', '').lower()
        recipe_region = recipe.get('region', '').lower()
        
        # State match (highest priority)
        if user_state and recipe_state and user_state == recipe_state:
            score += 3.0
        # Region match
        elif user_region and recipe_region and user_region == recipe_region:
            score += 2.0
        
        return score
    
    def get_recommendations(
        self, 
        recipes_data: List[Dict],
        selected_ingredients: List[str],
        selected_leftovers: List[str],
        quiz_preferences: Dict = None,
        user_location: Dict = None,
        top_k: int = 10
    ) -> List[Dict]:
        """Get personalized recipe recommendations"""
        
        # Preprocess recipe data
        df = self.preprocess_recipe_data(recipes_data)
        self.recipes_data = df
        
        # Create recipe embeddings
        recipe_features = self.create_recipe_embeddings(df)
        
        # Calculate scores for each recipe
        recipe_scores = []
        all_selected = selected_ingredients + selected_leftovers
        
        for idx, recipe in enumerate(recipes_data):
            score = 0.0
            
            # 1. Ingredient similarity (40% weight)
            ingredient_sim = self.calculate_ingredient_similarity(all_selected, recipe.get('ingredients', []))
            score += ingredient_sim * 0.4
            
            # 2. Quiz preferences (25% weight)
            if quiz_preferences:
                quiz_score = self.calculate_quiz_preference_score(quiz_preferences, recipe)
                score += (quiz_score / 10.0) * 0.25  # Normalize to 0-1
            
            # 3. Location preferences (20% weight)
            if user_location:
                location_score = self.calculate_location_score(user_location, recipe)
                score += (location_score / 5.0) * 0.20  # Normalize to 0-1
            
            # 4. Recipe popularity/quality (15% weight)
            popularity_score = 0.0
            if recipe.get('isHealthy', False):
                popularity_score += 0.3
            if recipe.get('isFestive', False):
                popularity_score += 0.2
            if recipe.get('rating', 0) > 4.0:
                popularity_score += 0.3
            if recipe.get('cookingTime', 0) <= 30:
                popularity_score += 0.2
            
            score += popularity_score * 0.15
            
            recipe_scores.append({
                'recipe': recipe,
                'score': score,
                'ingredient_match': ingredient_sim,
                'quiz_match': self.calculate_quiz_preference_score(quiz_preferences, recipe) if quiz_preferences else 0,
                'location_match': self.calculate_location_score(user_location, recipe) if user_location else 0,
                'match_percentage': score * 100
            })
        
        # Sort by score and return top recommendations
        recipe_scores.sort(key=lambda x: x['score'], reverse=True)
        
        # Add match details to recipes
        recommendations = []
        for item in recipe_scores[:top_k]:
            recipe = item['recipe'].copy()
            recipe['matchScore'] = item['ingredient_match']
            recipe['matchPercentage'] = item['match_percentage']
            recipe['quizMatch'] = item['quiz_match']
            recipe['locationMatch'] = item['location_match']
            recipe['leftoverCompatibility'] = len([l for l in selected_leftovers if any(l.lower() in ing.lower() for ing in recipe.get('ingredients', []))])
            recommendations.append(recipe)
        
        return recommendations
    
    def save_model(self, filepath: str):
        """Save the trained model"""
        model_data = {
            'tfidf_vectorizer': self.tfidf_vectorizer,
            'scaler': self.scaler,
            'label_encoders': self.label_encoders,
            'rf_model': self.rf_model,
            'recipe_features': self.recipe_features,
            'recipe_embeddings': self.recipe_embeddings
        }
        with open(filepath, 'wb') as f:
            pickle.dump(model_data, f)
    
    def load_model(self, filepath: str):
        """Load a trained model"""
        with open(filepath, 'rb') as f:
            model_data = pickle.load(f)
        
        self.tfidf_vectorizer = model_data['tfidf_vectorizer']
        self.scaler = model_data['scaler']
        self.label_encoders = model_data['label_encoders']
        self.rf_model = model_data['rf_model']
        self.recipe_features = model_data['recipe_features']
        self.recipe_embeddings = model_data['recipe_embeddings']

# Example usage and testing
if __name__ == "__main__":
    # This will be used for testing the model
    recommender = RecipeRecommender()
    print("Recipe Recommender initialized successfully!") 