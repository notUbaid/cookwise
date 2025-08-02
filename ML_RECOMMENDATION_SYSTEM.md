# Enhanced Recipe Recommendation System

This document describes the enhanced recipe recommendation system that provides personalized recipe suggestions based on user quiz preferences using both TypeScript and Python ML components.

## Overview

The system has been significantly enhanced to provide more sophisticated and personalized recipe recommendations with the following improvements:

### Key Enhancements

1. **Weighted Scoring Algorithm**: Recipes are scored based on multiple factors with different weights
2. **Detailed Match Explanations**: Users can see why each recipe was recommended
3. **Python ML Integration**: Advanced machine learning capabilities using scikit-learn
4. **Hybrid Recommendation Approach**: Combines content-based and preference-based filtering
5. **Fallback System**: Graceful degradation when ML API is unavailable

## Architecture

### Frontend (TypeScript/React)
- Enhanced `getRecommendedRecipes()` function with weighted scoring
- New `getDetailedRecommendations()` function with explanations
- Improved Quiz interface showing detailed preference analysis
- ML service integration with fallback capabilities

### Backend (Python/Flask)
- `RecipeRecommender` class with advanced ML algorithms
- Content-based filtering using TF-IDF and cosine similarity
- Preference-based filtering with weighted scoring
- Hybrid approach combining both methods
- Flask API for serving recommendations

## Scoring System

The enhanced algorithm uses a weighted scoring system:

| Factor | Weight | Description |
|--------|--------|-------------|
| Spice Level | 25% | Perfect match or adjacent levels |
| Cuisine/Region | 20% | Regional cuisine matching |
| Cooking Time | 20% | Time preference alignment |
| Dietary Preference | 20% | Dietary restrictions and preferences |
| Experience Level | 15% | Cooking difficulty matching |
| Bonus Points | 5-10% | Special combinations (healthy quick meals, street food for spicy lovers) |

## Features

### 1. Enhanced Quiz Results
- **Preference Analysis**: Visual breakdown of user preferences
- **Match Percentage**: Each recipe shows a match score
- **Explanation Cards**: Why each recipe was recommended
- **AI-Powered**: Advanced ML algorithms for better suggestions

### 2. ML-Powered Recommendations
- **Content-Based Filtering**: Similar recipes based on features
- **Preference-Based Filtering**: User preference matching
- **Hybrid Approach**: Best of both worlds
- **Insights Generation**: Automated analysis of recommendations

### 3. Fallback System
- **Graceful Degradation**: Works even when ML API is down
- **TypeScript Implementation**: Local fallback with same scoring logic
- **Seamless Experience**: Users don't notice the difference

## Installation & Setup

### Python ML Component

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the ML API server:
```bash
python ml_api.py
```

The API will be available at `http://localhost:5000`

### Frontend Integration

The React app automatically detects if the ML API is available and uses it for enhanced recommendations. If not available, it falls back to the TypeScript implementation.

## API Endpoints

### Health Check
```
GET /health
```

### Model Status
```
GET /api/model/status
```

### Load Recipe Data
```
POST /api/model/load
Body: { "recipes": [...] }
```

### Get Recommendations
```
POST /api/recommendations
Body: { "preferences": {...}, "limit": 12 }
```

### Content-Based Recommendations
```
POST /api/recommendations/content-based
Body: { "recipe_id": "...", "limit": 10 }
```

### Preference-Based Recommendations
```
POST /api/recommendations/preference-based
Body: { "preferences": {...}, "limit": 10 }
```

## Usage Examples

### Basic Usage (TypeScript)
```typescript
import { getDetailedRecommendations, QuizPreferences } from '@/data/mockData';

const preferences: QuizPreferences = {
  spiceLevel: 'medium',
  cuisine: 'south',
  experience: 'medium',
  time: 'quick',
  dietType: 'veg'
};

const recommendations = getDetailedRecommendations(preferences);
```

### ML API Usage
```typescript
import { mlService } from '@/services/mlService';

const result = await mlService.getPersonalizedRecommendations(preferences);
console.log(result.recommendations);
console.log(result.insights);
```

## Quiz Enhancement

The quiz now provides:

1. **Detailed Preference Analysis**: Visual breakdown of all preferences
2. **Match Scores**: Percentage match for each recipe
3. **Explanation Cards**: Why each recipe was recommended
4. **AI Insights**: Automated analysis of the recommendations
5. **Enhanced UI**: Better visual presentation of results

## Benefits

### For Users
- **More Accurate Recommendations**: Better matching based on preferences
- **Transparency**: See why recipes were recommended
- **Personalization**: Truly personalized experience
- **Better Discovery**: Find recipes they might not have considered

### For Developers
- **Modular Architecture**: Easy to extend and modify
- **Fallback System**: Robust error handling
- **Type Safety**: Full TypeScript support
- **Scalable**: Can handle large recipe datasets

## Future Enhancements

1. **Collaborative Filtering**: User behavior analysis
2. **Seasonal Recommendations**: Time-based suggestions
3. **Nutritional Optimization**: Health-focused recommendations
4. **Real-time Learning**: Adapt to user feedback
5. **Multi-language Support**: International cuisine support

## Troubleshooting

### ML API Not Starting
- Check Python dependencies are installed
- Ensure port 5000 is available
- Check logs for error messages

### Recommendations Not Working
- Verify quiz preferences are saved correctly
- Check browser console for errors
- Ensure fallback system is working

### Performance Issues
- Consider reducing recipe dataset size
- Optimize ML model parameters
- Use caching for repeated requests

## Contributing

When contributing to the recommendation system:

1. Maintain the weighted scoring approach
2. Add tests for new algorithms
3. Update documentation
4. Ensure fallback compatibility
5. Follow TypeScript best practices

This enhanced system provides a much more sophisticated and user-friendly recipe recommendation experience while maintaining robustness and scalability. 