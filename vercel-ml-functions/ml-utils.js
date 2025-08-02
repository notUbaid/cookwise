// JavaScript ML utilities for Vercel serverless functions
// This is a simplified version of the Python ML logic

export class RecipeRecommender {
  constructor(recipes) {
    this.recipes = recipes;
    this.featureVectors = this._createFeatureVectors();
  }

  _createFeatureVectors() {
    return this.recipes.map(recipe => ({
      id: recipe.id,
      features: {
        spiceLevel: this._normalizeSpiceLevel(recipe.spiceLevel),
        cuisine: this._normalizeCuisine(recipe.cuisine),
        difficulty: this._normalizeDifficulty(recipe.difficulty),
        dietType: this._normalizeDietType(recipe.dietType),
        timeRequired: this._normalizeTime(recipe.timeRequired),
        tags: recipe.tags || []
      }
    }));
  }

  _normalizeSpiceLevel(level) {
    const levels = { 'mild': 1, 'medium': 2, 'spicy': 3 };
    return levels[level] || 2;
  }

  _normalizeCuisine(cuisine) {
    const cuisines = { 'north': 1, 'south': 2, 'east': 3, 'west': 4 };
    return cuisines[cuisine] || 1;
  }

  _normalizeDifficulty(difficulty) {
    const difficulties = { 'Quick': 1, 'Medium': 2, 'Long': 3 };
    return difficulties[difficulty] || 2;
  }

  _normalizeDietType(diet) {
    const diets = { 'veg': 1, 'vegan': 2, 'non-veg': 3, 'flexible': 4 };
    return diets[diet] || 4;
  }

  _normalizeTime(time) {
    const times = { '15min': 1, '30min': 2, '45min': 3, '60min': 4 };
    return times[time] || 2;
  }

  _calculateSimilarity(preferences, recipeFeatures) {
    let score = 0;
    let totalWeight = 0;

    // Spice level matching (weight: 25%)
    const spiceWeight = 0.25;
    const spiceMatch = 1 - Math.abs(preferences.spiceLevel - recipeFeatures.spiceLevel) / 2;
    score += spiceMatch * spiceWeight;
    totalWeight += spiceWeight;

    // Cuisine matching (weight: 20%)
    const cuisineWeight = 0.20;
    const cuisineMatch = preferences.cuisine === recipeFeatures.cuisine ? 1 : 0.3;
    score += cuisineMatch * cuisineWeight;
    totalWeight += cuisineWeight;

    // Experience/difficulty matching (weight: 20%)
    const expWeight = 0.20;
    const expMatch = 1 - Math.abs(preferences.experience - recipeFeatures.difficulty) / 2;
    score += expMatch * expWeight;
    totalWeight += expWeight;

    // Time preference matching (weight: 15%)
    const timeWeight = 0.15;
    const timeMatch = 1 - Math.abs(preferences.time - recipeFeatures.timeRequired) / 3;
    score += timeMatch * timeWeight;
    totalWeight += timeWeight;

    // Diet type matching (weight: 20%)
    const dietWeight = 0.20;
    let dietMatch = 0;
    if (preferences.dietType === 'flexible') {
      dietMatch = 1; // Flexible users can eat anything
    } else if (preferences.dietType === recipeFeatures.dietType) {
      dietMatch = 1;
    } else if (preferences.dietType === 'veg' && recipeFeatures.dietType === 'vegan') {
      dietMatch = 0.8; // Veg users can eat vegan
    } else {
      dietMatch = 0; // No match
    }
    score += dietMatch * dietWeight;
    totalWeight += dietWeight;

    return score / totalWeight;
  }

  _generateMatchReasons(preferences, recipeFeatures, score) {
    const reasons = [];
    
    if (score > 0.8) reasons.push("Perfect match for your preferences");
    else if (score > 0.6) reasons.push("Great match for your taste");
    else if (score > 0.4) reasons.push("Good option based on your choices");
    
    // Add specific reasons
    if (preferences.spiceLevel === recipeFeatures.spiceLevel) {
      reasons.push("Matches your spice preference");
    }
    
    if (preferences.cuisine === recipeFeatures.cuisine) {
      reasons.push("Your preferred cuisine style");
    }
    
    if (preferences.dietType === 'flexible' || preferences.dietType === recipeFeatures.dietType) {
      reasons.push("Suits your dietary preferences");
    }

    return reasons.length > 0 ? reasons : ["Recommended based on your quiz answers"];
  }

  getPersonalizedRecommendations(preferences) {
    const scoredRecipes = this.featureVectors.map(vector => {
      const recipe = this.recipes.find(r => r.id === vector.id);
      const score = this._calculateSimilarity(preferences, vector.features);
      const matchReasons = this._generateMatchReasons(preferences, vector.features, score);
      
      return {
        recipe,
        score,
        matchReasons
      };
    });

    return scoredRecipes
      .filter(item => item.score > 0.3) // Only show relevant matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }

  getContentBasedRecommendations(targetRecipeId, limit = 6) {
    const targetRecipe = this.recipes.find(r => r.id === targetRecipeId);
    if (!targetRecipe) return [];

    const targetFeatures = this.featureVectors.find(v => v.id === targetRecipeId).features;
    
    const scoredRecipes = this.featureVectors
      .filter(v => v.id !== targetRecipeId)
      .map(vector => {
        const recipe = this.recipes.find(r => r.id === vector.id);
        const score = this._calculateSimilarity(targetFeatures, vector.features);
        
        return {
          recipe,
          score,
          matchReasons: [`Similar to ${targetRecipe.title}`]
        };
      });

    return scoredRecipes
      .filter(item => item.score > 0.4)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
} 