# 🚀 CookWise ML-Powered Recipe App - Deployment Guide

## Overview
This guide will help you deploy the CookWise application with ML-powered recipe recommendations on Vercel.

## 🏗️ Architecture
- **Frontend**: React + TypeScript + Vite
- **ML API**: Python Flask with scikit-learn
- **Deployment**: Vercel (Frontend + Serverless Functions)

## 📋 Prerequisites
1. **GitHub Account** - Your code should be on GitHub
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Python 3.8+** - For local testing
4. **Node.js 16+** - For frontend development

## 🔧 Local Development Setup

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd cookwise-1
npm install
```

### 2. Test ML API Locally
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start ML API server
cd api
python app.py
```

### 3. Test Frontend
```bash
# In another terminal
npm run dev
```

### 4. Test ML Integration
- Go to Reverse Cooking page
- Select ingredients
- Check if ML recommendations appear

## 🌐 Vercel Deployment

### Step 1: Prepare Your Repository
Make sure your repository has:
- ✅ `package.json` (React app)
- ✅ `api/app.py` (ML API)
- ✅ `requirements.txt` (Python dependencies)
- ✅ `vercel.json` (Vercel configuration)
- ✅ `ml_recipe_recommender.py` (ML model)

### Step 2: Deploy to Vercel

1. **Connect GitHub to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables** (Optional)
   ```
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Step 3: Update API URL
After deployment, update the API URL in your code:

1. **Get your Vercel domain** (e.g., `your-app.vercel.app`)

2. **Update the API URL** in these files:
   - `src/pages/ReverseCooking.tsx`
   - `src/services/mlApiService.ts`

   Replace:
   ```typescript
   'https://your-vercel-domain.vercel.app/api'
   ```
   
   With your actual domain:
   ```typescript
   'https://your-app.vercel.app/api'
   ```

3. **Redeploy** after making changes

## 🧪 Testing Your Deployment

### 1. Test Frontend
- Visit your Vercel URL
- Navigate through all pages
- Check if React app loads correctly

### 2. Test ML API
```bash
# Test health endpoint
curl https://your-app.vercel.app/api/health

# Test recommendations
curl -X POST https://your-app.vercel.app/api/test
```

### 3. Test Full Integration
1. Go to Reverse Cooking page
2. Select ingredients (e.g., "rice", "tomato")
3. Check if ML recommendations appear
4. Verify progress bars and match percentages

## 🔍 Troubleshooting

### Common Issues

#### 1. ML API Not Working
**Symptoms**: No recommendations, API errors
**Solutions**:
- Check Vercel function logs
- Verify `requirements.txt` is correct
- Ensure Python dependencies are installed

#### 2. Build Failures
**Symptoms**: Vercel build fails
**Solutions**:
- Check `vercel.json` configuration
- Verify all files are in correct locations
- Check for syntax errors in Python/JavaScript

#### 3. CORS Issues
**Symptoms**: Frontend can't call ML API
**Solutions**:
- Verify CORS is enabled in Flask app
- Check API URL is correct
- Ensure proper headers in requests

### Debug Steps

1. **Check Vercel Logs**
   - Go to your project dashboard
   - Click on "Functions" tab
   - Check for errors in `/api/app.py`

2. **Test API Endpoints**
   ```bash
   # Health check
   curl https://your-app.vercel.app/api/health
   
   # Test recommendations
   curl -X POST https://your-app.vercel.app/api/test
   ```

3. **Check Browser Console**
   - Open Developer Tools
   - Look for network errors
   - Check for JavaScript errors

## 📊 Monitoring

### Vercel Analytics
- Enable Vercel Analytics in dashboard
- Monitor API function performance
- Check for cold starts

### ML Model Performance
- Monitor recommendation accuracy
- Track API response times
- Check for model drift

## 🔄 Updates and Maintenance

### Updating ML Model
1. Modify `ml_recipe_recommender.py`
2. Test locally
3. Push to GitHub
4. Vercel auto-deploys

### Adding New Features
1. Develop locally
2. Test thoroughly
3. Push to GitHub
4. Monitor deployment

## 🎯 Production Checklist

Before going live:
- ✅ All pages load correctly
- ✅ ML API responds within 10 seconds
- ✅ Error handling works
- ✅ Fallback to local recipes works
- ✅ Quiz data integration works
- ✅ Location-based recommendations work
- ✅ Progress bars show correctly
- ✅ Mobile responsiveness works

## 📞 Support

If you encounter issues:
1. Check Vercel documentation
2. Review this deployment guide
3. Check GitHub issues
4. Contact support with specific error messages

## 🎉 Success!

Once deployed successfully, you'll have:
- 🍳 ML-powered recipe recommendations
- 📍 Location-based suggestions
- 🧠 Quiz preference integration
- 📱 Responsive design
- ⚡ Fast loading times
- 🔄 Real-time updates

Your CookWise app is now live with intelligent recipe recommendations! 🚀 