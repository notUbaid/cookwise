# CookWise ML Features Deployment Guide

## Overview

Your CookWise app now has enhanced ML-powered recipe recommendations. This guide explains how to deploy these features to work with your Vercel-hosted frontend.

## Deployment Options

### Option 1: Vercel Serverless Functions (Recommended for Vercel)

**Pros:**
- ✅ Works directly with Vercel deployment
- ✅ No additional hosting costs
- ✅ Automatic scaling
- ✅ Integrated with your existing Vercel setup

**Cons:**
- ❌ Limited execution time (30 seconds max)
- ❌ Simplified ML logic (JavaScript version)
- ❌ No persistent model training

**Setup:**
1. The serverless functions are already created in `vercel-ml-functions/`
2. Vercel configuration is in `vercel.json`
3. Just push to GitHub and Vercel will automatically deploy

**How it works:**
- Frontend sends quiz preferences + recipe data to `/api/recipe-recommendations`
- Serverless function processes recommendations using JavaScript ML logic
- Returns personalized recipe suggestions with match reasons

### Option 2: Separate Backend Deployment

**Pros:**
- ✅ Full Python ML capabilities
- ✅ Advanced algorithms (TF-IDF, cosine similarity, PCA)
- ✅ Persistent model training
- ✅ More sophisticated recommendations

**Cons:**
- ❌ Additional hosting costs
- ❌ Separate deployment process
- ❌ Need to manage CORS and API endpoints

**Recommended Platforms:**

#### Railway (Easiest)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Render
1. Connect your GitHub repo
2. Create new Web Service
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `python ml_api.py`
5. Add environment variables if needed

#### Heroku
```bash
# Install Heroku CLI and create app
heroku create your-cookwise-ml-api
git push heroku main
```

### Option 3: Hybrid Approach (Best of Both)

**Setup:**
1. Deploy Python ML API to Railway/Render
2. Update `ML_API_BASE_URL` in `src/services/mlService.ts`:

```typescript
const ML_API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-ml-api.railway.app'  // Your deployed Python API
  : 'http://localhost:5000';
```

3. Keep Vercel serverless functions as fallback

## Current Implementation

### What's Already Working

1. **Enhanced Quiz System**: Quiz results now show detailed preference analysis
2. **Weighted Scoring**: Recipes are scored based on multiple factors:
   - Spice level (25% weight)
   - Cuisine preference (20% weight)
   - Cooking experience (20% weight)
   - Time availability (15% weight)
   - Dietary preferences (20% weight)

3. **Fallback System**: If ML API fails, falls back to TypeScript implementation
4. **Detailed Recommendations**: Shows match reasons and confidence scores

### Files Structure

```
cookwise-1/
├── src/
│   ├── data/mockData.ts          # Enhanced with ML scoring
│   ├── services/mlService.ts     # API communication layer
│   └── pages/Quiz.tsx           # Enhanced quiz interface
├── vercel-ml-functions/         # Vercel serverless functions
│   ├── recipe-recommendations.js
│   └── ml-utils.js
├── ml_recipe_recommender.py     # Python ML component
├── ml_api.py                   # Flask API
├── requirements.txt            # Python dependencies
└── vercel.json                # Vercel configuration
```

## Deployment Steps

### For Vercel Serverless Functions (Immediate)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add ML-powered recipe recommendations with Vercel serverless functions"
   git push origin main
   ```

2. **Vercel will automatically deploy** the serverless functions

3. **Test the deployment:**
   - Go to your Vercel app
   - Take the quiz
   - Check that recommendations work

### For Separate Python Backend

1. **Deploy Python API:**
   ```bash
   # Choose one platform from above
   # Example for Railway:
   railway up
   ```

2. **Update environment variables:**
   - Get your API URL from the deployment
   - Update `ML_API_BASE_URL` in the code

3. **Redeploy frontend:**
   ```bash
   git add .
   git commit -m "Update ML API endpoint"
   git push origin main
   ```

## Testing Your Deployment

### Test Quiz Recommendations
1. Go to your deployed app
2. Navigate to Quiz page
3. Answer all questions
4. Verify that:
   - Recommendations are personalized
   - Match reasons are shown
   - Scores are displayed as percentages

### Test API Endpoints
```bash
# Test Vercel serverless function
curl -X POST https://your-app.vercel.app/api/recipe-recommendations \
  -H "Content-Type: application/json" \
  -d '{"preferences":{"spiceLevel":"spicy","cuisine":"south","experience":"medium","time":"quick","dietType":"veg"},"recipes":[...]}'

# Test Python API (if deployed separately)
curl -X POST https://your-ml-api.railway.app/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"preferences":{"spiceLevel":"spicy","cuisine":"south","experience":"medium","time":"quick","dietType":"veg"}}'
```

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Check that your Python API has CORS enabled
   - Verify the API URL is correct

2. **Serverless Function Timeout:**
   - Reduce the number of recipes processed
   - Optimize the JavaScript ML logic

3. **API Not Responding:**
   - Check the fallback system is working
   - Verify environment variables

### Debug Mode

Enable debug logging in `src/services/mlService.ts`:
```typescript
console.log('ML API URL:', ML_API_BASE_URL);
console.log('Request payload:', { preferences, recipes });
```

## Performance Optimization

### For Vercel Serverless Functions
- Limit recipes to top 50-100 most popular
- Cache recommendations in localStorage
- Use lightweight scoring algorithms

### For Python API
- Implement Redis caching
- Use async processing for large datasets
- Optimize model loading

## Cost Considerations

### Vercel Serverless Functions
- **Free tier**: 100GB-hours/month
- **Pro tier**: $20/month for unlimited

### Separate Backend
- **Railway**: $5/month for basic plan
- **Render**: Free tier available
- **Heroku**: $7/month for basic dyno

## Next Steps

1. **Immediate**: Push to GitHub and test Vercel deployment
2. **Short-term**: Monitor performance and user feedback
3. **Long-term**: Consider upgrading to full Python ML API for advanced features

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify API endpoints are accessible
3. Test the fallback system
4. Review the ML recommendation logic in the code

The system is designed to gracefully degrade - if ML features fail, users still get good recommendations from the TypeScript implementation. 