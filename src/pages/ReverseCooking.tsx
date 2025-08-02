import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { RecipeCard } from '@/components/RecipeCard';
import { SpoonacularRecipeCard } from '@/components/SpoonacularRecipeCard';
import { 
  mockRecipes, 
  Recipe, 
  commonIngredients,
  leftoverRecipes,
  getRandomRecipes
} from '@/data/mockData';

// Spoonacular API types
interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    name: string;
  }>;
  usedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    name: string;
  }>;
  unusedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    name: string;
  }>;
  likes: number;
}

import { 
  Search, 
  ChefHat, 
  Clock, 
  Utensils, 
  Plus,
  X,
  Sparkles,
  RefreshCw,
  BookOpen,
  Loader2,
  XCircle,
  CheckCircle,
  Lightbulb,
  Zap,
  Star,
  TrendingUp,
  Heart,
  Timer,
  Users,
  Award
} from 'lucide-react';

// Enhanced leftover categories with more comprehensive data
const leftoverCategories = [
  {
    name: 'Grains & Breads',
    icon: '🍞',
    items: ['Roti', 'Rice', 'Bread', 'Naan', 'Paratha', 'Pasta', 'Quinoa', 'Oats', 'Chapati', 'Poori', 'Bhatura']
  },
  {
    name: 'Proteins',
    icon: '🥩',
    items: ['Chicken', 'Fish', 'Paneer', 'Eggs', 'Dal', 'Beans', 'Tofu', 'Meat', 'Mutton', 'Prawns', 'Lentils']
  },
  {
    name: 'Vegetables',
    icon: '🥬',
    items: ['Potato', 'Onion', 'Tomato', 'Carrot', 'Peas', 'Spinach', 'Cauliflower', 'Capsicum', 'Brinjal', 'Okra', 'Cabbage']
  },
  {
    name: 'Dairy & Sauces',
    icon: '🥛',
    items: ['Milk', 'Yogurt', 'Cheese', 'Butter', 'Cream', 'Curry', 'Gravy', 'Sauce', 'Raita', 'Chutney', 'Pickle']
  },
  {
    name: 'Snacks & Sides',
    icon: '🍟',
    items: ['Chips', 'Nuts', 'Seeds', 'Pickles', 'Chutney', 'Papad', 'Fries', 'Salad', 'Poha', 'Upma', 'Idli']
  }
];

// Enhanced mock recipes specifically for reverse cooking
const enhancedReverseRecipes = [
  {
    id: 'rc1',
    title: 'Quick Vegetable Fried Rice',
    description: 'Transform leftover rice into a delicious meal',
    ingredients: ['Leftover rice', 'Mixed vegetables', 'Soy sauce', 'Oil', 'Garlic', 'Ginger'],
    image: '/hackimage/dosa.jpg',
    difficulty: 'Easy',
    time: 15,
    calories: 320,
    cuisine: 'Indo-Chinese',
    tags: ['Quick', 'One-pot', 'Versatile'],
    type: 'reverse',
    matchScore: 5,
    leftoverCompatibility: 3
  },
  {
    id: 'rc9',
    title: 'Basmati Rice Biryani',
    description: 'Aromatic biryani with basmati rice',
    ingredients: ['Basmati Rice', 'Spices', 'Onion', 'Yogurt', 'Saffron', 'Ghee'],
    image: '/hackimage/hyderabadibiryani.jpg',
    difficulty: 'Medium',
    time: 60,
    calories: 450,
    cuisine: 'North Indian',
    tags: ['Biryani', 'Aromatic', 'Festive'],
    type: 'reverse',
    matchScore: 4,
    leftoverCompatibility: 2
  },
  {
    id: 'rc10',
    title: 'Bajra Roti with Sabzi',
    description: 'Healthy pearl millet flatbread with vegetables',
    ingredients: ['Bajra (Pearl Millet)', 'Wheat Flour', 'Vegetables', 'Spices', 'Oil'],
    image: '/hackimage/thepla.jpg',
    difficulty: 'Medium',
    time: 30,
    calories: 280,
    cuisine: 'North Indian',
    tags: ['Healthy', 'Gluten-free', 'Traditional'],
    type: 'reverse',
    matchScore: 4,
    leftoverCompatibility: 2
  },
  {
    id: 'rc11',
    title: 'Maida Naan',
    description: 'Soft and fluffy refined flour bread',
    ingredients: ['Maida (Refined Flour)', 'Yogurt', 'Yeast', 'Oil', 'Salt'],
    image: '/hackimage/malabar parotha.jpg',
    difficulty: 'Medium',
    time: 45,
    calories: 250,
    cuisine: 'North Indian',
    tags: ['Bread', 'Soft', 'Restaurant-style'],
    type: 'reverse',
    matchScore: 3,
    leftoverCompatibility: 1
  },
  {
    id: 'rc12',
    title: 'Bread Upma',
    description: 'Quick breakfast from leftover bread',
    ingredients: ['Bread', 'Onion', 'Tomato', 'Spices', 'Oil', 'Mustard seeds'],
    image: '/hackimage/upma.jpg',
    difficulty: 'Easy',
    time: 15,
    calories: 200,
    cuisine: 'South Indian',
    tags: ['Breakfast', 'Quick', 'Leftover'],
    type: 'reverse',
    matchScore: 3,
    leftoverCompatibility: 2
  },
  {
    id: 'rc2',
    title: 'Roti Churma Delight',
    description: 'Sweet dessert from leftover rotis',
    ingredients: ['Leftover rotis', 'Ghee', 'Sugar', 'Cardamom', 'Nuts', 'Saffron'],
    image: '/hackimage/puranpoli.jpg',
    difficulty: 'Easy',
    time: 20,
    calories: 280,
    cuisine: 'North Indian',
    tags: ['Dessert', 'Sweet', 'Quick'],
    type: 'reverse',
    matchScore: 4,
    leftoverCompatibility: 2
  },
  {
    id: 'rc3',
    title: 'Dal Paratha Stuffed',
    description: 'Nutritious stuffed bread with leftover dal',
    ingredients: ['Leftover dal', 'Wheat flour', 'Spices', 'Oil', 'Onions', 'Coriander'],
    image: '/hackimage/daal.jpg',
    difficulty: 'Medium',
    time: 30,
    calories: 350,
    cuisine: 'North Indian',
    tags: ['Bread', 'Stuffed', 'Protein'],
    type: 'reverse',
    matchScore: 4,
    leftoverCompatibility: 2
  },
  {
    id: 'rc4',
    title: 'Paneer Tikka Masala',
    description: 'Creamy curry with leftover paneer',
    ingredients: ['Leftover paneer', 'Tomatoes', 'Cream', 'Spices', 'Onions', 'Ginger-garlic'],
    image: '/hackimage/paneerpakoda.jpg',
    difficulty: 'Medium',
    time: 25,
    calories: 380,
    cuisine: 'North Indian',
    tags: ['Creamy', 'Vegetarian', 'Rich'],
    type: 'reverse',
    matchScore: 3,
    leftoverCompatibility: 1
  },
  {
    id: 'rc5',
    title: 'Sabzi Paratha',
    description: 'Stuffed paratha with leftover vegetables',
    ingredients: ['Leftover sabzi', 'Wheat flour', 'Spices', 'Oil', 'Ajwain'],
    image: '/hackimage/thepla.jpg',
    difficulty: 'Medium',
    time: 35,
    calories: 300,
    cuisine: 'North Indian',
    tags: ['Vegetarian', 'Stuffed', 'Healthy'],
    type: 'reverse',
    matchScore: 3,
    leftoverCompatibility: 2
  },
  {
    id: 'rc6',
    title: 'Chicken Biryani',
    description: 'Aromatic biryani using leftover chicken',
    ingredients: ['Leftover chicken', 'Basmati rice', 'Spices', 'Onions', 'Yogurt', 'Saffron'],
    image: '/hackimage/awadhibiryani.jpg',
    difficulty: 'Hard',
    time: 60,
    calories: 450,
    cuisine: 'Hyderabadi',
    tags: ['Biryani', 'Non-veg', 'Festive'],
    type: 'reverse',
    matchScore: 4,
    leftoverCompatibility: 1
  },
  {
    id: 'rc7',
    title: 'Quick Upma',
    description: 'Breakfast from leftover semolina',
    ingredients: ['Sooji', 'Vegetables', 'Mustard seeds', 'Curry leaves', 'Oil'],
    image: '/hackimage/upma.jpg',
    difficulty: 'Easy',
    time: 15,
    calories: 250,
    cuisine: 'South Indian',
    tags: ['Breakfast', 'Quick', 'Healthy'],
    type: 'reverse',
    matchScore: 2,
    leftoverCompatibility: 1
  },
  {
    id: 'rc8',
    title: 'Raita Bowl',
    description: 'Refreshing yogurt dish with leftover vegetables',
    ingredients: ['Yogurt', 'Cucumber', 'Tomatoes', 'Onions', 'Spices', 'Mint'],
    image: '/hackimage/khandvi.jpg',
    difficulty: 'Easy',
    time: 10,
    calories: 120,
    cuisine: 'North Indian',
    tags: ['Side dish', 'Cooling', 'Quick'],
    type: 'reverse',
    matchScore: 2,
    leftoverCompatibility: 2
  }
];

export default function ReverseCooking() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedLeftovers, setSelectedLeftovers] = useState<string[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState<SpoonacularRecipe[]>([]);
  const [localRecipes, setLocalRecipes] = useState<any[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [useMLApi, setUseMLApi] = useState(false);
  const [useSpoonacularApi, setUseSpoonacularApi] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    // Load saved recipes from localStorage
    const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
    setSavedRecipes(saved);
  }, []);

  useEffect(() => {
    // Generate local recipes immediately when ingredients change
    const allSelected = [...selectedIngredients, ...selectedLeftovers];
    console.log('useEffect triggered with:', allSelected);
    
    if (allSelected.length === 0) {
      console.log('No ingredients selected, clearing recipes');
      setLocalRecipes([]);
      setSuggestedRecipes([]);
      setApiError(null);
      return;
    }

    // Generate local recipes immediately for instant feedback
    console.log('Generating local recipes...');
    const enhancedRecipes = generateEnhancedRecipes();
    console.log('Generated recipes:', enhancedRecipes);
    console.log('Setting local recipes:', enhancedRecipes.length);
    
    // Always set some recipes, even if matching fails
    if (enhancedRecipes.length === 0) {
      console.log('No matches found, setting fallback recipes');
      const fallbackRecipes = enhancedReverseRecipes.slice(0, 4).map(recipe => ({
        ...recipe,
        type: 'fallback',
        matchScore: 1,
        leftoverCompatibility: 0
      }));
      setLocalRecipes(fallbackRecipes);
    } else {
      setLocalRecipes(enhancedRecipes);
    }



    // Then try to fetch API recipes
    findRecipes();
  }, [selectedIngredients, selectedLeftovers]);

  const findRecipes = async () => {
    const allSelected = [...selectedIngredients, ...selectedLeftovers];
    if (allSelected.length === 0) {
      setSuggestedRecipes([]);
      setApiError(null);
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      if (useSpoonacularApi) {
        // Call Spoonacular API
        const apiKey = 'e24c011006b64874b7e968b89f5ddffe';
        const ingredients = allSelected.join(',');
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&apiKey=${apiKey}&number=15&ranking=2&ignorePantry=true`;
        
        console.log('Calling Spoonacular API:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          if (response.status === 402) {
            throw new Error('Spoonacular API quota exceeded. Using local recipes instead.');
          } else {
            throw new Error(`Spoonacular API request failed: ${response.status} ${response.statusText}`);
          }
        }

        const data = await response.json();
        console.log('Spoonacular API response:', data);
        
        if (Array.isArray(data)) {
          setSuggestedRecipes(data);
        } else {
          throw new Error('Invalid response format from Spoonacular API');
        }
      } else if (useMLApi) {
        // Call our ML API
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? 'https://cookwise.vercel.app/api/recommend'
          : 'http://localhost:5000/recommend';

        // Get quiz preferences from localStorage
        const quizPreferences = JSON.parse(localStorage.getItem('quiz-preferences') || '{}');
        
        // Get user location from localStorage
        const userLocation = JSON.parse(localStorage.getItem('user-location') || '{}');

        const requestData = {
          ingredients: selectedIngredients,
          leftovers: selectedLeftovers,
          quiz_preferences: quizPreferences,
          user_location: userLocation,
          top_k: 15
        };

        console.log('Calling ML API:', apiUrl);
        console.log('Request data:', requestData);
        
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('ML API endpoint not found. Please check your deployment.');
            } else if (response.status === 500) {
              throw new Error('ML API server error. Using local recipes instead.');
            } else {
              throw new Error(`ML API request failed: ${response.status} ${response.statusText}`);
            }
          }

          const data = await response.json();
          console.log('ML API response:', data);

          if (data.status === 'success' && data.recommendations) {
            // Convert ML API response to Spoonacular format for compatibility
            const convertedRecipes = data.recommendations.map((recipe: any) => ({
              id: recipe.id,
              title: recipe.title,
              image: recipe.image || '/placeholder.svg',
              usedIngredientCount: recipe.matchScore || 0,
              missedIngredientCount: 0,
              usedIngredients: recipe.ingredients?.map((ing: string) => ({ name: ing })) || [],
              missedIngredients: [],
              unusedIngredients: [],
              likes: recipe.rating || 0,
              // Add ML-specific data
              matchPercentage: recipe.matchPercentage,
              quizMatch: recipe.quizMatch,
              locationMatch: recipe.locationMatch,
              leftoverCompatibility: recipe.leftoverCompatibility
            }));
            
            setSuggestedRecipes(convertedRecipes);
          } else {
            throw new Error('Invalid response format from ML API');
          }
        } catch (fetchError) {
          clearTimeout(timeoutId);
          if (fetchError instanceof Error) {
            if (fetchError.name === 'AbortError') {
              throw new Error('ML API request timed out. Using local recipes instead.');
            }
            throw fetchError;
          }
          throw new Error('Network error occurred');
        }
      }

      // Note: Local recipes are already generated in the useEffect above
      // No need to regenerate them here

    } catch (error) {
      console.error('Error fetching recipes:', error);
      
      // Set appropriate error message
      let errorMessage = 'Failed to fetch recipes';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setApiError(errorMessage);
      
      // Clear suggested recipes on error
      setSuggestedRecipes([]);
      
      // Local recipes are already available from the useEffect
    } finally {
      setIsLoading(false);
    }
  };

  const generateEnhancedRecipes = () => {
    const allSelected = [...selectedIngredients, ...selectedLeftovers];
    
    console.log('Generating recipes for:', allSelected);
    
    if (allSelected.length === 0) {
      console.log('No ingredients selected, returning empty array');
      return [];
    }

    // Enhanced matching logic with better debugging
    const findMatches = (recipes: any[], recipeType: string) => {
      console.log(`Checking ${recipeType} recipes...`);
      const matches = recipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients || [];
        const recipeIngredientsText = Array.isArray(recipeIngredients) 
          ? recipeIngredients.join(' ').toLowerCase()
          : recipeIngredients.toLowerCase();
        
        const selectedItems = allSelected.map(item => item.toLowerCase());
        
        // Check if any selected item matches any recipe ingredient
        const hasMatch = selectedItems.some(selectedItem => {
          // Split selected item into words for better matching
          const selectedWords = selectedItem.split(/[\s,()]+/).filter(word => word.length > 2);
          
          return selectedWords.some(word => {
            return recipeIngredientsText.includes(word) ||
                   recipeIngredients.some((ing: string) => 
                     ing.toLowerCase().includes(word) || 
                     word.includes(ing.toLowerCase())
                   );
          });
        });
        
        if (hasMatch) {
          console.log(`Match found in ${recipeType}:`, recipe.title || recipe.name);
        }
        
        return hasMatch;
      });

      console.log(`${recipeType} matches found:`, matches.length);
      return matches.map(recipe => ({
        ...recipe,
        type: recipeType,
        matchScore: allSelected.filter(item => {
          const itemLower = item.toLowerCase();
          const recipeIngredientsText = (recipe.ingredients || []).join(' ').toLowerCase();
          return recipeIngredientsText.includes(itemLower) ||
                 itemLower.split(/[\s,()]+/).some(word => 
                   word.length > 2 && recipeIngredientsText.includes(word)
                 );
        }).length,
        leftoverCompatibility: selectedLeftovers.filter(leftover => {
          const leftoverLower = leftover.toLowerCase();
          const recipeIngredientsText = (recipe.ingredients || []).join(' ').toLowerCase();
          return recipeIngredientsText.includes(leftoverLower) ||
                 leftoverLower.split(/[\s,()]+/).some(word => 
                   word.length > 2 && recipeIngredientsText.includes(word)
                 );
        }).length
      }));
    };

    // Check all recipe sources
    const reverseMatches = findMatches(enhancedReverseRecipes, 'reverse');
    const leftoverMatches = findMatches(leftoverRecipes, 'leftover');
    const mockMatches = findMatches(mockRecipes, 'mock');

    // Combine all matches
    const combinedRecipes = [...reverseMatches, ...leftoverMatches, ...mockMatches];
    combinedRecipes.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    console.log('Total combined recipes:', combinedRecipes.length);

    // If no specific matches, return fallback recipes
    if (combinedRecipes.length === 0) {
      console.log('No matches found, returning fallback recipes');
      const fallbackRecipes = [
        ...enhancedReverseRecipes.slice(0, 3), 
        ...leftoverRecipes.slice(0, 3), 
        ...getRandomRecipes(2)
      ].map(recipe => ({
        ...recipe,
        type: 'fallback',
        matchScore: 1,
        leftoverCompatibility: 0
      }));
      console.log('Fallback recipes:', fallbackRecipes.length);
      return fallbackRecipes;
    }

    console.log('Returning combined recipes:', combinedRecipes.length);
    return combinedRecipes;
  };

  const handleIngredientSelect = (ingredientName: string) => {
    console.log('handleIngredientSelect called with:', ingredientName);
    console.log('Current selectedIngredients:', selectedIngredients);
    
    if (!selectedIngredients.includes(ingredientName)) {
      const newIngredients = [...selectedIngredients, ingredientName];
      console.log('Setting new ingredients:', newIngredients);
      setSelectedIngredients(newIngredients);
    } else {
      console.log('Ingredient already selected:', ingredientName);
    }
  };

  const handleIngredientRemove = (ingredientName: string) => {
    setSelectedIngredients(selectedIngredients.filter(name => name !== ingredientName));
  };

  const handleLeftoverSelect = (leftoverName: string) => {
    console.log('handleLeftoverSelect called with:', leftoverName);
    console.log('Current selectedLeftovers:', selectedLeftovers);
    
    if (!selectedLeftovers.includes(leftoverName)) {
      const newLeftovers = [...selectedLeftovers, leftoverName];
      console.log('Setting new leftovers:', newLeftovers);
      setSelectedLeftovers(newLeftovers);
    } else {
      console.log('Leftover already selected:', leftoverName);
    }
  };

  const handleLeftoverRemove = (leftoverName: string) => {
    setSelectedLeftovers(selectedLeftovers.filter(name => name !== leftoverName));
  };

  const handleSaveRecipe = (recipeId: string) => {
    const newSaved = savedRecipes.includes(recipeId)
      ? savedRecipes.filter(id => id !== recipeId)
      : [...savedRecipes, recipeId];
    
    setSavedRecipes(newSaved);
    localStorage.setItem('saved-recipes', JSON.stringify(newSaved));
  };

  const clearSelection = () => {
    setSelectedIngredients([]);
    setSelectedLeftovers([]);
    setSearchQuery('');
  };

  const getFilteredIngredients = () => {
    if (!searchQuery) return commonIngredients;
    return commonIngredients.filter(ingredient => 
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getFilteredLeftovers = () => {
    const allLeftovers = leftoverCategories.flatMap(category => 
      category.items.map(item => ({ name: item, category: category.name, icon: category.icon }))
    );
    
    if (!searchQuery) return allLeftovers;
    
    return allLeftovers.filter(leftover => 
      leftover.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leftover.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getIngredientCategory = (category: string) => {
    const categoryIngredients = commonIngredients.filter(ingredient => ingredient.category === category);
    return categoryIngredients;
  };

  const getLeftoverCategory = (categoryName: string) => {
    return leftoverCategories.find(category => category.name === categoryName);
  };

  const getCategoryIcon = (category: string) => {
    const categoryIcons: { [key: string]: string } = {
      'Grains': '🌾',
      'Pulses': '🥣',
      'Vegetables': '🥬',
      'Spices': '🧂',
      'Dairy': '🥛',
      'Oils & Fats': '🛢️',
      'Proteins': '🍗',
      'Fruits': '🍎',
      'Other': '🧂'
    };
    return categoryIcons[category] || '🍽️';
  };

  const categories = [...new Set(commonIngredients.map(ingredient => ingredient.category))];
  
  // Debug logging
  console.log('commonIngredients length:', commonIngredients.length);
  console.log('categories:', categories);
  console.log('Sample ingredients:', commonIngredients.slice(0, 3));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent opacity-95"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative container mx-auto text-center text-primary-foreground">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Recipe Discovery</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 float">
            Reverse Cooking
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-95 leading-relaxed">
            Transform your ingredients and leftovers into delicious meals. Our smart recipe finder helps you create amazing dishes from what you have.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <ChefHat className="h-5 w-5" />
              <span className="font-medium">Ingredient-based recipes</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Lightbulb className="h-5 w-5" />
              <span className="font-medium">Leftover transformations</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Smart recommendations</span>
            </div>
          </div>
          <div className="w-32 h-1 bg-white/30 rounded-full mx-auto"></div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Left Column - Selection Panel */}
          <div className="lg:col-span-1 h-full">
            <Card className="card-premium h-full flex flex-col">
              <CardHeader className="pb-4 flex-shrink-0">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg">
                    <Utensils className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span>What do you have?</span>
                      {selectedIngredients.length > 0 || selectedLeftovers.length > 0 ? (
                        <Badge variant="secondary" className="ml-2">
                          {selectedIngredients.length + selectedLeftovers.length} selected
                        </Badge>
                      ) : null}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select your ingredients and leftovers to find perfect recipes
                    </p>
                  </div>
                </CardTitle>
                {(selectedIngredients.length > 0 || selectedLeftovers.length > 0) && (
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      onClick={findRecipes}
                      disabled={isLoading}
                      className="btn-shimmer flex-1"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Finding Recipes...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Find Recipes
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={clearSelection}
                      variant="outline"
                      size="sm"
                      className="btn-shimmer"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {/* API Toggles */}
                  <div className="space-y-3">
                    {/* ML API Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">ML-Powered Recommendations</p>
                          <p className="text-xs text-muted-foreground">Personalized suggestions using quiz data & location</p>
                        </div>
                      </div>
                      <Button
                        variant={useMLApi ? "default" : "outline"}
                        size="sm"
                        className={`btn-shimmer ${useMLApi ? 'pulse-glow' : ''}`}
                        onClick={() => setUseMLApi(!useMLApi)}
                      >
                        {useMLApi ? "ON" : "OFF"}
                      </Button>
                    </div>

                    {/* Spoonacular API Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl border border-blue-500/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Online Recipe Database</p>
                          <p className="text-xs text-muted-foreground">Get suggestions from Spoonacular API</p>
                        </div>
                      </div>
                      <Button
                        variant={useSpoonacularApi ? "default" : "outline"}
                        size="sm"
                        className="btn-shimmer"
                        onClick={() => setUseSpoonacularApi(!useSpoonacularApi)}
                      >
                        {useSpoonacularApi ? "ON" : "OFF"}
                      </Button>
                    </div>
                  </div>

                  {/* Tabs for Ingredients and Leftovers */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="ingredients" className="flex items-center gap-2">
                        <ChefHat className="h-4 w-4" />
                        Ingredients
                      </TabsTrigger>
                      <TabsTrigger value="leftovers" className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Leftovers
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="ingredients" className="space-y-4">
                      {/* Search */}
                      <div className="search-modern">
                        <Search className="search-icon h-4 w-4" />
                        <Input
                          placeholder="Search ingredients..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="input-modern"
                        />
                      </div>

                      {/* Selected Ingredients */}
                      {selectedIngredients.length > 0 && (
                        <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Selected Ingredients ({selectedIngredients.length})
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedIngredients.map(ingredient => (
                              <Badge 
                                key={ingredient} 
                                variant="secondary"
                                className="flex items-center gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                              >
                                {ingredient}
                                <button
                                  onClick={() => handleIngredientRemove(ingredient)}
                                  className="ml-1 hover:text-destructive transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Ingredient Categories */}
                      <div className="space-y-4" style={{ fontVariantEmoji: 'none' }}>
                        {categories.map(category => (
                          <div key={category}>
                            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                              {getCategoryIcon(category)}
                              {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {getIngredientCategory(category)
                                .filter(ingredient => 
                                  !searchQuery || 
                                  ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map(ingredient => (
                                  <button
                                    key={ingredient.name}
                                    onClick={() => {
                                      console.log('Ingredient button clicked:', ingredient.name);
                                      handleIngredientSelect(ingredient.name);
                                    }}
                                    disabled={selectedIngredients.includes(ingredient.name)}
                                    className={`ingredient-btn-modern ${
                                      selectedIngredients.includes(ingredient.name) ? 'selected' : ''
                                    }`}
                                    style={{ 
                                      fontFamily: 'system-ui, -apple-system, sans-serif',
                                      fontVariantEmoji: 'none',
                                      textEmoji: 'none',
                                      fontFeatureSettings: '"liga" 0, "dlig" 0',
                                      textRendering: 'optimizeLegibility'
                                    }}
                                  >
                                    {ingredient.name}
                                    {selectedIngredients.includes(ingredient.name) && (
                                      <CheckCircle className="h-3 w-3 ml-1" />
                                    )}
                                  </button>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="leftovers" className="space-y-4">
                      {/* Search */}
                      <div className="search-modern">
                        <Search className="search-icon h-4 w-4" />
                        <Input
                          placeholder="Search leftovers..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="input-modern"
                        />
                      </div>

                      {/* Selected Leftovers */}
                      {selectedLeftovers.length > 0 && (
                        <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-orange-600" />
                            Selected Leftovers ({selectedLeftovers.length})
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedLeftovers.map(leftover => (
                              <Badge 
                                key={leftover} 
                                variant="secondary"
                                className="flex items-center gap-1 bg-accent/10 text-accent-foreground border-accent/20 hover:bg-accent/20 transition-colors"
                              >
                                {leftover}
                                <button
                                  onClick={() => handleLeftoverRemove(leftover)}
                                  className="ml-1 hover:text-destructive transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Leftover Categories */}
                      <div className="space-y-4">
                        {leftoverCategories.map(category => (
                          <div key={category.name}>
                            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <span>{category.icon}</span>
                              {category.name}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {category.items
                                .filter(item => 
                                  !searchQuery || 
                                  item.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map(item => (
                                  <button
                                    key={item}
                                    onClick={() => handleLeftoverSelect(item)}
                                    disabled={selectedLeftovers.includes(item)}
                                    className={`ingredient-btn-modern ${
                                      selectedLeftovers.includes(item) ? 'selected' : ''
                                    }`}
                                  >
                                    <span>{item}</span>
                                    {selectedLeftovers.includes(item) && (
                                      <CheckCircle className="h-3 w-3 ml-1" />
                                    )}
                                  </button>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Clear All Button */}
                  {(selectedIngredients.length > 0 || selectedLeftovers.length > 0) && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearSelection}
                      className="w-full btn-shimmer"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Clear All
                    </Button>
                  )}
                </CardContent>
              </Card>
          </div>

          {/* Tips Section - Moved to better position */}
          <div className="lg:col-span-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Reverse Cooking Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <ChefHat className="h-4 w-4" />
                      Smart Ingredient Selection
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Start with staple ingredients like rice, onions, tomatoes</li>
                      <li>• Add proteins like chicken, fish, or paneer</li>
                      <li>• Include spices and herbs for authentic flavors</li>
                      <li>• Don't forget cooking essentials like oil and salt</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Creative Leftover Ideas
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Leftover rice → Fried rice or rice pudding</li>
                      <li>• Extra roti → Roti chips or roti upma</li>
                      <li>• Cooked dal → Dal paratha or dal soup</li>
                      <li>• Vegetable scraps → Vegetable stock</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Recipe Matching
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• More ingredients = better recipe matches</li>
                      <li>• Recipes are ranked by ingredient compatibility</li>
                      <li>• Check leftover suggestions for creative uses</li>
                      <li>• Save your favorite recipes for later</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recipe Suggestions */}
          <div className="lg:col-span-2 h-full overflow-y-auto">
            {/* Debug Info - Temporary */}
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Debug Info</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>Selected ingredients: {selectedIngredients.length} - {selectedIngredients.join(', ')}</p>
                <p>Selected leftovers: {selectedLeftovers.length} - {selectedLeftovers.join(', ')}</p>
                <p>Local recipes: {localRecipes.length}</p>
                <p>Suggested recipes: {suggestedRecipes.length}</p>
                <p>Is loading: {isLoading.toString()}</p>
                <p>Use ML API: {useMLApi.toString()}</p>
                <p>Use Spoonacular: {useSpoonacularApi.toString()}</p>
              </div>
            </div>
            
            {(selectedIngredients.length === 0 && selectedLeftovers.length === 0) ? (
              /* Empty State */
              <Card className="text-center py-12">
                <CardContent>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <ChefHat className="h-16 w-16 text-muted-foreground" />
                    <Lightbulb className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No ingredients or leftovers selected</h3>
                  <p className="text-muted-foreground mb-6">
                    Select ingredients and leftovers from the left panel to see recipe suggestions
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4" />
                    <span>We'll find the perfect recipes for what you have</span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Recipe Suggestions */
              <div className="space-y-8">
                {/* Loading State */}
                {isLoading && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Finding recipes...</h3>
                      <p className="text-muted-foreground">
                        Searching for recipes with your ingredients and leftovers
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* API Error */}
                {apiError && useMLApi && (
                  <Card className="text-center py-8 border-destructive/20 bg-destructive/5">
                    <CardContent>
                      <div className="text-destructive mb-4">
                        <XCircle className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-destructive">API Error</h3>
                      <p className="text-muted-foreground mb-4">
                        {apiError}
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setApiError(null);
                            findRecipes();
                          }}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setUseMLApi(false)}
                        >
                          Use Local Recipes
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Showing local recipes instead
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* ML Recipe Suggestions */}
                {suggestedRecipes.length > 0 && !isLoading && useMLApi && (
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <BookOpen className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-serif font-bold">
                        ML-Powered Recipe Suggestions ({suggestedRecipes.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {suggestedRecipes.map((recipe) => (
                        <div key={recipe.id}>
                          <SpoonacularRecipeCard
                            recipe={recipe}
                            onSave={handleSaveRecipe}
                            isSaved={savedRecipes.includes(recipe.id.toString())}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Local Recipe Suggestions */}
                {(localRecipes.length > 0 || (selectedIngredients.length > 0 || selectedLeftovers.length > 0)) && !isLoading && (
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-serif font-bold">
                        Smart Recipe Suggestions ({localRecipes.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(localRecipes.length > 0 ? localRecipes : enhancedReverseRecipes.slice(0, 4)).map((recipe, index) => {
                        const allSelected = [...selectedIngredients, ...selectedLeftovers];
                        const matchCount = recipe.matchScore || 0;
                        const matchPercentage = allSelected.length > 0 ? (matchCount / allSelected.length) * 100 : 0;
                        
                        return (
                          <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-lg">{recipe.title || recipe.name}</CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {recipe.description || 'Perfect for your ingredients'}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSaveRecipe(recipe.id || recipe.title)}
                                  className="text-muted-foreground hover:text-primary"
                                >
                                  <Heart className={`h-4 w-4 ${savedRecipes.includes(recipe.id || recipe.title) ? 'fill-current text-primary' : ''}`} />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {/* Progress Bar */}
                                <div>
                                  <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="font-medium">Ingredient Match</span>
                                    <span className="text-muted-foreground">{Math.round(matchPercentage)}%</span>
                                  </div>
                                  <Progress value={matchPercentage} className="h-2" />
                                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                    <span>{matchCount} of {allSelected.length} ingredients match</span>
                                  </div>
                                </div>

                                {/* Ingredients with matching indicators */}
                                <div>
                                  <span className="text-sm font-medium">Ingredients:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {(recipe.ingredients || []).map((ingredient: string, idx: number) => {
                                      const isMatched = allSelected.some(item => 
                                        ingredient.toLowerCase().includes(item.toLowerCase()) ||
                                        item.toLowerCase().includes(ingredient.toLowerCase())
                                      );
                                      return (
                                        <Badge 
                                          key={idx} 
                                          variant={isMatched ? "default" : "outline"}
                                          className={`text-xs ${isMatched ? 'bg-green-100 text-green-800 border-green-200' : ''}`}
                                        >
                                          {isMatched && <CheckCircle className="h-3 w-3 mr-1" />}
                                          {ingredient}
                                        </Badge>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Recipe details */}
                                <div className="flex items-center justify-between">
                                  <Badge variant="secondary" className="text-xs">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {recipe.time || recipe.cookingTime || '30'} min
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {recipe.difficulty || recipe.effort || 'Medium'}
                                  </Badge>
                                </div>

                                {/* Additional indicators */}
                                <div className="flex items-center justify-between text-xs">
                                  {recipe.leftoverCompatibility && recipe.leftoverCompatibility > 0 && (
                                    <div className="flex items-center gap-1 text-blue-600">
                                      <Lightbulb className="h-3 w-3" />
                                      Uses {recipe.leftoverCompatibility} leftover{recipe.leftoverCompatibility > 1 ? 's' : ''}
                                    </div>
                                  )}
                                  {matchPercentage >= 80 && (
                                    <div className="flex items-center gap-1 text-green-600">
                                      <Star className="h-3 w-3" />
                                      Perfect Match!
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </section>
                )}



                {/* No Matches - This should rarely show now with our fallback logic */}
                {suggestedRecipes.length === 0 && localRecipes.length === 0 && (selectedIngredients.length > 0 || selectedLeftovers.length > 0) && !isLoading && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Utensils className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                      <p className="text-muted-foreground mb-6">
                        We couldn't find recipes with your selected ingredients and leftovers. Try adding more items or different combinations.
                      </p>
                      {/* Debug info */}
                      <div className="mb-4 p-3 bg-red-50 rounded-lg text-sm text-left">
                        <p><strong>Debug Info:</strong></p>
                        <p>Selected ingredients: {selectedIngredients.join(', ') || 'None'}</p>
                        <p>Selected leftovers: {selectedLeftovers.join(', ') || 'None'}</p>
                        <p>Local recipes count: {localRecipes.length}</p>
                        <p>Suggested recipes count: {suggestedRecipes.length}</p>
                        <p>Is loading: {isLoading.toString()}</p>
                        <p>Use ML API: {useMLApi.toString()}</p>
                      </div>
                      <Button variant="outline" onClick={clearSelection}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Different Items
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
} 