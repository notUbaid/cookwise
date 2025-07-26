import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecipeCard } from '@/components/RecipeCard';
import { SpoonacularRecipeCard } from '@/components/SpoonacularRecipeCard';
import { 
  mockRecipes, 
  Recipe, 
  commonIngredients,
  leftoverRecipes
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
  BookOpen
} from 'lucide-react';

export default function ReverseCooking() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState<SpoonacularRecipe[]>([]);
  const [leftoverSuggestions, setLeftoverSuggestions] = useState<any[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    // Load saved recipes from localStorage
    const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
    setSavedRecipes(saved);
    
    // Find recipes based on selected ingredients
    findRecipesByIngredients();
  }, [selectedIngredients]);

  const findRecipesByIngredients = async () => {
    if (selectedIngredients.length === 0) {
      setSuggestedRecipes([]);
      setLeftoverSuggestions([]);
      setApiError(null);
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      // Call Spoonacular API
      const ingredients = selectedIngredients.join(',');
      const apiKey = '9890ecaff45543cdbe2d3ce0d62a94ef';
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&apiKey=${apiKey}&number=20&ranking=2&ignorePantry=true`;

      console.log('Calling Spoonacular API:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data: SpoonacularRecipe[] = await response.json();
      console.log('Spoonacular API response:', data);

      setSuggestedRecipes(data);

      // Find leftover recipes (fallback to mock data)
      const leftoverMatches = leftoverRecipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients.join(' ').toLowerCase();
        return selectedIngredients.some(ingredient => 
          recipeIngredients.includes(ingredient.toLowerCase())
        );
      });
      setLeftoverSuggestions(leftoverMatches);

    } catch (error) {
      console.error('Error fetching recipes:', error);
      setApiError(error instanceof Error ? error.message : 'Failed to fetch recipes');
      
      // Fallback to mock data if API fails
      const matchingRecipes = mockRecipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients.join(' ').toLowerCase();
        return selectedIngredients.some(ingredient => 
          recipeIngredients.includes(ingredient.toLowerCase())
        );
      });

      const scoredRecipes = matchingRecipes.map(recipe => {
        const recipeIngredients = recipe.ingredients.join(' ').toLowerCase();
        const matchCount = selectedIngredients.filter(ingredient => 
          recipeIngredients.includes(ingredient.toLowerCase())
        ).length;
        return { ...recipe, matchScore: matchCount };
      });

      scoredRecipes.sort((a, b) => b.matchScore - a.matchScore);
      setSuggestedRecipes(scoredRecipes as any);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIngredientSelect = (ingredientName: string) => {
    if (!selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  const handleIngredientRemove = (ingredientName: string) => {
    setSelectedIngredients(selectedIngredients.filter(name => name !== ingredientName));
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
    setSearchQuery('');
  };

  const getFilteredIngredients = () => {
    if (!searchQuery) return commonIngredients;
    return commonIngredients.filter(ingredient => 
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getIngredientCategory = (category: string) => {
    const categoryIngredients = commonIngredients.filter(ingredient => ingredient.category === category);
    return categoryIngredients;
  };

  const categories = [...new Set(commonIngredients.map(ingredient => ingredient.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-green-50">
      {/* Header Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent opacity-90"></div>
        <div className="relative container mx-auto text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Reverse Cooking
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Tell us what ingredients you have, and we'll suggest delicious recipes you can make
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <ChefHat className="h-6 w-6" />
            <span>Transform your ingredients into amazing dishes</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredient Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Select Your Ingredients
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose the ingredients you have available
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search ingredients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
                  />
                </div>

                {/* Selected Ingredients */}
                {selectedIngredients.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Selected Ingredients:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedIngredients.map(ingredient => (
                        <Badge 
                          key={ingredient} 
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {ingredient}
                          <button
                            onClick={() => handleIngredientRemove(ingredient)}
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

                {/* Ingredient Categories */}
                <div className="space-y-4">
                  {categories.map(category => (
                    <div key={category}>
                      <h3 className="text-sm font-medium mb-2">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {getIngredientCategory(category)
                          .filter(ingredient => 
                            !searchQuery || 
                            ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map(ingredient => (
                            <button
                              key={ingredient.name}
                              onClick={() => handleIngredientSelect(ingredient.name)}
                              disabled={selectedIngredients.includes(ingredient.name)}
                              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs border transition-colors ${
                                selectedIngredients.includes(ingredient.name)
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-background hover:bg-muted'
                              }`}
                            >
                              <span>{ingredient.icon}</span>
                              <span>{ingredient.name.split(' ')[0]}</span>
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
            {selectedIngredients.length === 0 ? (
              /* Empty State */
              <Card className="text-center py-12">
                <CardContent>
                  <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No ingredients selected</h3>
                  <p className="text-muted-foreground mb-6">
                    Select ingredients from the left panel to see recipe suggestions
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4" />
                    <span>We'll find the perfect recipes for your ingredients</span>
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
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <h3 className="text-xl font-semibold mb-2">Finding recipes...</h3>
                      <p className="text-muted-foreground">
                        Searching for recipes with your ingredients
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* API Error */}
                {apiError && (
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
                        Showing fallback recipes from our database
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Recipe Matches */}
                {suggestedRecipes.length > 0 && !isLoading && (
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <BookOpen className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-serif font-bold">
                        Recipe Suggestions ({suggestedRecipes.length})
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

                {/* Leftover Recipes */}
                {leftoverSuggestions.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-serif font-bold">
                        Leftover Ideas ({leftoverSuggestions.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {leftoverSuggestions.map((recipe, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-lg">{recipe.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{recipe.description}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <span className="text-sm font-medium">Ingredients:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {recipe.ingredients.map((ingredient: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {ingredient}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="text-xs">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {recipe.time}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {recipe.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

                {/* No Matches */}
                {suggestedRecipes.length === 0 && leftoverSuggestions.length === 0 && selectedIngredients.length > 0 && !isLoading && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Utensils className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                      <p className="text-muted-foreground mb-6">
                        We couldn't find recipes with your selected ingredients. Try adding more ingredients or different combinations.
                      </p>
                      <Button variant="outline" onClick={clearSelection}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Different Ingredients
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
                <Sparkles className="h-5 w-5" />
                Reverse Cooking Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">💡 Smart Ingredient Selection</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Start with staple ingredients like rice, onions, tomatoes</li>
                    <li>• Add proteins like chicken, fish, or paneer</li>
                    <li>• Include spices and herbs for authentic flavors</li>
                    <li>• Don't forget cooking essentials like oil and salt</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🍽️ Recipe Matching</h4>
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
        </section>
      </div>
    </div>
  );
} 