// Vercel serverless function for recipe recommendations
// This runs on Vercel's serverless infrastructure

import { RecipeRecommender } from './ml-utils.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { preferences, recipes } = req.body;

    if (!preferences || !recipes) {
      return res.status(400).json({ 
        error: 'Missing required fields: preferences and recipes' 
      });
    }

    // Initialize recommender with provided recipes
    const recommender = new RecipeRecommender(recipes);
    
    // Get personalized recommendations
    const recommendations = recommender.getPersonalizedRecommendations(preferences);

    return res.status(200).json({
      success: true,
      recommendations,
      modelType: 'serverless-ml'
    });

  } catch (error) {
    console.error('ML recommendation error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
} 