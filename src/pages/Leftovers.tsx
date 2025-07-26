import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SpoonacularRecipeCard } from '@/components/SpoonacularRecipeCard';
import { 
  mockRecipes, 
  Recipe, 
  leftoverRecipes 
} from '@/data/mockData';
import { 
  ChefHat, 
  Clock, 
  Utensils, 
  Plus,
  X,
  Sparkles,
  RefreshCw,
  BookOpen,
  Search,
  Loader2,
  XCircle,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

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

// Leftover categories
const leftoverCategories = [
  {
    name: 'Grains & Breads',
    icon: '🍞',
    items: ['Roti', 'Rice', 'Bread', 'Naan', 'Paratha', 'Pasta', 'Quinoa', 'Oats']
  },
  {
    name: 'Proteins',
    icon: '🥩',
    items: ['Chicken', 'Fish', 'Paneer', 'Eggs', 'Dal', 'Beans', 'Tofu', 'Meat']
  },
  {
    name: 'Vegetables',
    icon: '🥬',
    items: ['Potato', 'Onion', 'Tomato', 'Carrot', 'Peas', 'Spinach', 'Cauliflower', 'Capsicum']
  },
  {
    name: 'Dairy & Sauces',
    icon: '🥛',
    items: ['Milk', 'Yogurt', 'Cheese', 'Butter', 'Cream', 'Curry', 'Gravy', 'Sauce']
  },
  {
    name: 'Snacks & Sides',
    icon: '🍟',
    items: ['Chips', 'Nuts', 'Seeds', 'Pickles', 'Chutney', 'Papad', 'Fries', 'Salad']
  }
];

export default function Leftovers() {
  const [selectedLeftovers, setSelectedLeftovers] = useState<string[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState<SpoonacularRecipe[]>([]);
  const [localLeftoverRecipes, setLocalLeftoverRecipes] = useState<any[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [useApi, setUseApi] = useState(true);

  useEffect(() => {
    // Load saved recipes from localStorage
    const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
    setSavedRecipes(saved);
    
    // Find recipes based on selected leftovers
    findRecipesByLeftovers();
  }, [selectedLeftovers]);

  const findRecipesByLeftovers = async () => {
    if (selectedLeftovers.length === 0) {
      setSuggestedRecipes([]);
      setLocalLeftoverRecipes([]);
      setApiError(null);
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      if (useApi) {
        // Call Spoonacular API
        const ingredients = selectedLeftovers.join(',');
        const apiKey = '9890ecaff45543cdbe2d3ce0d62a94ef';
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&apiKey=${apiKey}&number=15&ranking=2&ignorePantry=true`;

        console.log('Calling Spoonacular API for leftovers:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data: SpoonacularRecipe[] = await response.json();
        console.log('Spoonacular API response for leftovers:', data);

        setSuggestedRecipes(data);
      }

      // Find local leftover recipes
      const leftoverMatches = leftoverRecipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients.join(' ').toLowerCase();
        return selectedLeftovers.some(leftover => 
          recipeIngredients.includes(leftover.toLowerCase())
        );
      });

      // Also check mock recipes for leftover-friendly dishes
      const mockLeftoverMatches = mockRecipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients.join(' ').toLowerCase();
        return selectedLeftovers.some(leftover => 
          recipeIngredients.includes(leftover.toLowerCase())
        );
      }).map(recipe => ({
        ...recipe,
        type: 'mock',
        leftoverCompatibility: selectedLeftovers.filter(leftover => 
          recipe.ingredients.join(' ').toLowerCase().includes(leftover.toLowerCase())
        ).length
      }));

      setLocalLeftoverRecipes([...leftoverMatches, ...mockLeftoverMatches]);

    } catch (error) {
      console.error('Error fetching leftover recipes:', error);
      setApiError(error instanceof Error ? error.message : 'Failed to fetch recipes');
      setUseApi(false); // Fallback to local recipes only
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeftoverSelect = (leftoverName: string) => {
    if (!selectedLeftovers.includes(leftoverName)) {
      setSelectedLeftovers([...selectedLeftovers, leftoverName]);
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
    setSelectedLeftovers([]);
    setSearchQuery('');
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

  const getLeftoverCategory = (categoryName: string) => {
    return leftoverCategories.find(category => category.name === categoryName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-green-50">
      {/* Header Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent opacity-90"></div>
        <div className="relative container mx-auto text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Smart Leftovers
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Transform your leftovers into delicious new meals with creative recipe suggestions
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Lightbulb className="h-6 w-6" />
            <span>Waste less, taste more</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Leftover Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Your Leftovers
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select what leftovers you have available
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* API Toggle */}
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Use Online Recipes</p>
                    <p className="text-xs text-muted-foreground">Get suggestions from Spoonacular API</p>
                  </div>
                  <Button
                    variant={useApi ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUseApi(!useApi)}
                  >
                    {useApi ? "ON" : "OFF"}
                  </Button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leftovers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Selected Leftovers */}
                {selectedLeftovers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Selected Leftovers:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLeftovers.map(leftover => (
                        <Badge 
                          key={leftover} 
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {leftover}
                          <button
                            onClick={() => handleLeftoverRemove(leftover)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearSelection}
                      className="mt-2"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Clear All
                    </Button>
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
                            item.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            category.name.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map(item => (
                            <button
                              key={item}
                              onClick={() => handleLeftoverSelect(item)}
                              disabled={selectedLeftovers.includes(item)}
                              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs border transition-colors ${
                                selectedLeftovers.includes(item)
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-background hover:bg-muted'
                              }`}
                            >
                              <span>{item}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recipe Suggestions */}
          <div className="lg:col-span-2">
            {selectedLeftovers.length === 0 ? (
              /* Empty State */
              <Card className="text-center py-12">
                <CardContent>
                  <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No leftovers selected</h3>
                  <p className="text-muted-foreground mb-6">
                    Select your leftovers from the left panel to see creative recipe suggestions
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4" />
                    <span>We'll help you create amazing meals from what you have</span>
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
                        Searching for creative ways to use your leftovers
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* API Error */}
                {apiError && useApi && (
                  <Card className="text-center py-8 border-destructive/20 bg-destructive/5">
                    <CardContent>
                      <div className="text-destructive mb-4">
                        <XCircle className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-destructive">API Error</h3>
                      <p className="text-muted-foreground mb-4">
                        {apiError}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Showing local leftover recipes instead
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Online Recipe Suggestions */}
                {suggestedRecipes.length > 0 && !isLoading && useApi && (
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <BookOpen className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-serif font-bold">
                        Online Recipe Suggestions ({suggestedRecipes.length})
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

                {/* Local Leftover Recipes */}
                {localLeftoverRecipes.length > 0 && !isLoading && (
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-serif font-bold">
                        Leftover-Friendly Recipes ({localLeftoverRecipes.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {localLeftoverRecipes.map((recipe, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-lg">{recipe.name || recipe.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {recipe.description || 'Perfect for using up leftovers'}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <span className="text-sm font-medium">Ingredients:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {recipe.ingredients.map((ingredient: string, idx: number) => (
                                    <Badge 
                                      key={idx} 
                                      variant={selectedLeftovers.some(leftover => 
                                        ingredient.toLowerCase().includes(leftover.toLowerCase())
                                      ) ? "secondary" : "outline"} 
                                      className="text-xs"
                                    >
                                      {ingredient}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="text-xs">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {recipe.time || recipe.cookingTime} min
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {recipe.difficulty || recipe.effort}
                                </Badge>
                              </div>
                              {recipe.leftoverCompatibility && (
                                <div className="flex items-center gap-1 text-xs text-green-600">
                                  <CheckCircle className="h-3 w-3" />
                                  Uses {recipe.leftoverCompatibility} of your leftovers
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

                {/* No Matches */}
                {suggestedRecipes.length === 0 && localLeftoverRecipes.length === 0 && selectedLeftovers.length > 0 && !isLoading && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Utensils className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                      <p className="text-muted-foreground mb-6">
                        We couldn't find recipes for your selected leftovers. Try adding more items or different combinations.
                      </p>
                      <Button variant="outline" onClick={clearSelection}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Different Leftovers
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <section className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Smart Leftovers Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">💡 Creative Leftover Ideas</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Leftover rice → Fried rice or rice pudding</li>
                    <li>• Extra roti → Roti chips or roti upma</li>
                    <li>• Cooked dal → Dal paratha or dal soup</li>
                    <li>• Vegetable scraps → Vegetable stock</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🍽️ Storage & Safety</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Store leftovers in airtight containers</li>
                    <li>• Refrigerate within 2 hours of cooking</li>
                    <li>• Use within 3-4 days for best quality</li>
                    <li>• Reheat thoroughly before consuming</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
} 