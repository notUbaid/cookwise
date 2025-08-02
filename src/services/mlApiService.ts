interface MLRecommendationRequest {
  ingredients: string[];
  leftovers: string[];
  quiz_preferences: Record<string, any>;
  user_location: Record<string, any>;
  top_k: number;
}

interface MLRecommendationResponse {
  status: string;
  recommendations: any[];
  count: number;
  query: MLRecommendationRequest;
}

class MLApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://your-vercel-domain.vercel.app/api'
      : 'http://localhost:5000';
  }

  async getRecommendations(request: MLRecommendationRequest): Promise<MLRecommendationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`ML API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('ML API call failed:', error);
      throw error;
    }
  }

  async testAPI(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (response.ok) {
        const data = await response.json();
        return data.status === 'healthy';
      }
      return false;
    } catch (error) {
      console.error('ML API health check failed:', error);
      return false;
    }
  }

  async getTestRecommendations(): Promise<MLRecommendationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`ML API test error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('ML API test failed:', error);
      throw error;
    }
  }
}

export const mlApiService = new MLApiService();
export type { MLRecommendationRequest, MLRecommendationResponse }; 