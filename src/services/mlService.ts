import { QuizPreferences } from '@/data/mockData';

// Use Vercel serverless functions in production, local Flask API in development
const ML_API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000';

export interface MLRecommendation {
  recipe: any;
  score: number;
  matchReasons: string[];
}

export interface MLRecommendationResponse {
  recommendations: MLRecommendation[];
  preference_analysis: {
    spice_tolerance: string;
    cuisine_preference: string;
    cooking_style: string;
    time_availability: string;
    dietary_focus: string;
  };
  insights: string[];
  total_recommendations: number;
}

export interface ModelStatus {
  status: 'loaded' | 'not_loaded';
  recipes_count: number;
  model_ready: boolean;
}

class MLService {
  private baseUrl: string;

  constructor(baseUrl: string = ML_API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('ML API request failed:', error);
      throw error;
    }
  }

  async checkHealth(): Promise<{ status: string; message: string }> {
    return this.makeRequest('/health');
  }

  async getModelStatus(): Promise<ModelStatus> {
    return this.makeRequest('/api/model/status');
  }

  async loadRecipeData(recipes: any[]): Promise<{ message: string; recipes_count: number }> {
    return this.makeRequest('/api/model/load', {
      method: 'POST',
      body: JSON.stringify({ recipes }),
    });
  }

  async getPersonalizedRecommendations(
    preferences: QuizPreferences,
    limit: number = 12
  ): Promise<MLRecommendationResponse> {
    try {
      // For Vercel deployment, we need to send recipes data with the request
      const { mockRecipes } = await import('@/data/mockData');
      
      return this.makeRequest('/recipe-recommendations', {
        method: 'POST',
        body: JSON.stringify({ 
          preferences, 
          recipes: mockRecipes,
          limit 
        }),
      });
    } catch (error) {
      console.warn('ML API failed, using fallback:', error);
      return this.getFallbackRecommendations(preferences);
    }
  }

  async getContentBasedRecommendations(
    recipeId: string,
    limit: number = 10
  ): Promise<{ recommendations: any[] }> {
    return this.makeRequest('/api/recommendations/content-based', {
      method: 'POST',
      body: JSON.stringify({ recipe_id: recipeId, limit }),
    });
  }

  async getPreferenceBasedRecommendations(
    preferences: QuizPreferences,
    limit: number = 10
  ): Promise<{ recommendations: any[] }> {
    return this.makeRequest('/api/recommendations/preference-based', {
      method: 'POST',
      body: JSON.stringify({ preferences, limit }),
    });
  }

  // Fallback method when ML API is not available
  async getFallbackRecommendations(preferences: QuizPreferences): Promise<MLRecommendation[]> {
    // This would use the TypeScript implementation as fallback
    const { getDetailedRecommendations } = await import('@/data/mockData');
    return getDetailedRecommendations(preferences);
  }
}

// Create singleton instance
export const mlService = new MLService();

// Hook for using ML service with fallback
export const useMLRecommendations = () => {
  const getRecommendations = async (preferences: QuizPreferences) => {
    try {
      // First try the ML API
      const status = await mlService.getModelStatus();
      
      if (status.model_ready) {
        const result = await mlService.getPersonalizedRecommendations(preferences);
        return {
          recommendations: result.recommendations,
          analysis: result.preference_analysis,
          insights: result.insights,
          source: 'ml-api'
        };
      } else {
        // Fallback to TypeScript implementation
        const fallbackRecs = await mlService.getFallbackRecommendations(preferences);
        return {
          recommendations: fallbackRecs,
          analysis: null,
          insights: [],
          source: 'fallback'
        };
      }
    } catch (error) {
      console.warn('ML API unavailable, using fallback:', error);
      // Fallback to TypeScript implementation
      const fallbackRecs = await mlService.getFallbackRecommendations(preferences);
      return {
        recommendations: fallbackRecs,
        analysis: null,
        insights: [],
        source: 'fallback'
      };
    }
  };

  return { getRecommendations };
}; 