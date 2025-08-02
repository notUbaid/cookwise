import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Shuffle, 
  Loader2, 
  Heart, 
  Clock, 
  ChefHat, 
  Star,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addToFavorites, isFavorite, removeFromFavorites } from '@/utils/storage';

interface RandomRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  nutrition: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
  summary: string;
  instructions: string;
  analyzedInstructions: Array<{
    name: string;
    steps: Array<{
      number: number;
      step: string;
      ingredients: Array<{
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }>;
    }>;
  }>;
}

export default function ShuffleRecipe() {
  const [randomRecipe, setRandomRecipe] = useState<RandomRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [useAPI, setUseAPI] = useState(true);
  const { toast } = useToast();

  const fetchRandomRecipe = async () => {
    setIsLoading(true);
    setRandomRecipe(null);

    try {
      // Only try Spoonacular API if enabled
      if (useAPI) {
        const apiKey = 'e24c011006b64874b7e968b89f5ddffe';
        const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&addRecipeInformation=true&fillIngredients=true&includeNutrition=true`;

        console.log('Fetching random recipe from Spoonacular...');
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const response = await fetch(url, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          if (response.status === 402) {
            throw new Error('API quota exceeded');
          } else if (response.status === 404) {
            throw new Error('API endpoint not found');
          } else {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
          }
        }

        const data = await response.json();
        console.log('Spoonacular random recipe response:', data);

        if (data.recipes && data.recipes.length > 0) {
          const recipe = data.recipes[0];
          setRandomRecipe(recipe);
          
          // Check if recipe is already saved
          setIsSaved(isFavorite(recipe.id.toString()));
          
          toast({
            title: "🎲 Feeling Lucky!",
            description: `Here's a random recipe: ${recipe.title}`,
          });
          return; // Success, exit early
        } else {
          throw new Error('No recipes returned from API');
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        console.log('Spoonacular API failed, trying local recipes:', fetchError);
        throw fetchError; // Re-throw to trigger fallback
      }

    } catch (error) {
      console.error('Error fetching random recipe:', error);
      
      // Fallback to local recipes
      try {
        console.log('Using local recipe fallback...');
        const localRecipes = [
          {
            id: 1,
            title: "Chicken Tikka Masala",
            image: "/hackimage/chetinad chicken.jpg",
            readyInMinutes: 45,
            servings: 4,
            cuisines: ["Indian"],
            dishTypes: ["main course"],
            diets: ["non-vegetarian"],
            nutrition: {
              nutrients: [{ name: "Calories", amount: 450, unit: "kcal" }]
            },
            summary: "A creamy and flavorful Indian curry with tender chicken pieces in a rich tomato-based sauce.",
            instructions: "1. Marinate chicken with spices\n2. Cook chicken until golden\n3. Prepare sauce with tomatoes and cream\n4. Combine and simmer",
            analyzedInstructions: [{
              name: "Chicken Tikka Masala",
              steps: [
                {
                  number: 1,
                  step: "Marinate chicken with yogurt and spices",
                  ingredients: [{ id: 1, name: "chicken", localizedName: "chicken", image: "" }]
                },
                {
                  number: 2,
                  step: "Cook chicken until golden brown",
                  ingredients: [{ id: 2, name: "oil", localizedName: "oil", image: "" }]
                }
              ]
            }]
          },
          {
            id: 2,
            title: "Vegetable Biryani",
            image: "/hackimage/hyderabadibiryani.jpg",
            readyInMinutes: 60,
            servings: 6,
            cuisines: ["Indian"],
            dishTypes: ["main course"],
            diets: ["vegetarian"],
            nutrition: {
              nutrients: [{ name: "Calories", amount: 380, unit: "kcal" }]
            },
            summary: "Aromatic rice dish with mixed vegetables and fragrant spices.",
            instructions: "1. Cook basmati rice\n2. Prepare vegetable mixture\n3. Layer rice and vegetables\n4. Steam until done",
            analyzedInstructions: [{
              name: "Vegetable Biryani",
              steps: [
                {
                  number: 1,
                  step: "Cook basmati rice until 70% done",
                  ingredients: [{ id: 3, name: "basmati rice", localizedName: "basmati rice", image: "" }]
                },
                {
                  number: 2,
                  step: "Prepare vegetable mixture with spices",
                  ingredients: [{ id: 4, name: "mixed vegetables", localizedName: "mixed vegetables", image: "" }]
                }
              ]
            }]
          },
          {
            id: 3,
            title: "Masala Dosa",
            image: "/hackimage/dosa.jpg",
            readyInMinutes: 30,
            servings: 2,
            cuisines: ["South Indian"],
            dishTypes: ["breakfast"],
            diets: ["vegetarian"],
            nutrition: {
              nutrients: [{ name: "Calories", amount: 280, unit: "kcal" }]
            },
            summary: "Crispy fermented rice and lentil crepe served with potato filling.",
            instructions: "1. Prepare dosa batter\n2. Make potato filling\n3. Spread batter on hot griddle\n4. Fill and fold",
            analyzedInstructions: [{
              name: "Masala Dosa",
              steps: [
                {
                  number: 1,
                  step: "Spread dosa batter on hot griddle",
                  ingredients: [{ id: 5, name: "dosa batter", localizedName: "dosa batter", image: "" }]
                },
                {
                  number: 2,
                  step: "Add potato filling and fold",
                  ingredients: [{ id: 6, name: "potato filling", localizedName: "potato filling", image: "" }]
                }
              ]
            }]
          }
        ];
        
        const randomIndex = Math.floor(Math.random() * localRecipes.length);
        const fallbackRecipe = localRecipes[randomIndex];
        
        setRandomRecipe(fallbackRecipe);
        setIsSaved(isFavorite(fallbackRecipe.id.toString()));
        
        toast({
          title: "🎲 Local Recipe Found!",
          description: `Here's a delicious recipe: ${fallbackRecipe.title}`,
        });
        
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        toast({
          title: "Error",
          description: "Unable to load recipes. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRecipe = () => {
    if (!randomRecipe) return;

    const recipeData = {
      id: randomRecipe.id.toString(),
      title: randomRecipe.title,
      image: randomRecipe.image,
      cookingTime: randomRecipe.readyInMinutes,
      servings: randomRecipe.servings,
      cuisine: randomRecipe.cuisines[0] || 'International',
      region: randomRecipe.cuisines[0] || 'International',
      spiceLevel: 'Medium',
      effort: 'Medium',
      calories: Math.round(randomRecipe.nutrition?.nutrients.find(n => n.name === 'Calories')?.amount || 0),
      ingredients: randomRecipe.analyzedInstructions[0]?.steps.flatMap(step => 
        step.ingredients.map(ing => ing.name)
      ) || [],
      steps: randomRecipe.analyzedInstructions[0]?.steps.map(step => step.step) || [],
      culturalFact: `This is a delicious ${randomRecipe.cuisines[0] || 'international'} dish that's ready in ${randomRecipe.readyInMinutes} minutes!`,
      tags: [...(randomRecipe.diets || []), ...(randomRecipe.dishTypes || [])],
      isVeg: randomRecipe.diets?.includes('vegetarian') || false,
      isVegan: randomRecipe.diets?.includes('vegan') || false,
      isGlutenFree: randomRecipe.diets?.includes('gluten-free') || false,
    };

    if (isSaved) {
      removeFromFavorites(randomRecipe.id.toString());
      setIsSaved(false);
      toast({
        title: "Recipe removed",
        description: `${randomRecipe.title} removed from favorites`,
      });
    } else {
      addToFavorites(recipeData);
      setIsSaved(true);
      toast({
        title: "Recipe saved!",
        description: `${randomRecipe.title} added to favorites`,
      });
    }
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getCuisineBadge = (cuisines: string[]) => {
    if (!cuisines || cuisines.length === 0) return 'International';
    return cuisines[0];
  };

  const getDietBadges = (diets: string[]) => {
    if (!diets || diets.length === 0) return [];
    return diets.slice(0, 3); // Show max 3 diet badges
  };

  return (
    <div className="space-y-6">
      {/* API Toggle */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl border border-blue-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ExternalLink className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Online Recipe Database</p>
              <p className="text-xs text-muted-foreground">Get recipes from Spoonacular API</p>
            </div>
          </div>
          <Button
            variant={useAPI ? "default" : "outline"}
            size="sm"
            className="btn-shimmer"
            onClick={() => setUseAPI(!useAPI)}
          >
            {useAPI ? "ON" : "OFF"}
          </Button>
        </div>
      </div>

      {/* Shuffle Button */}
      <div className="text-center">
        <Button
          onClick={fetchRandomRecipe}
          disabled={isLoading}
          size="lg"
          className="btn-premium text-lg px-8 py-6 h-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              Finding Your Lucky Recipe...
            </>
          ) : (
            <>
              <Shuffle className="mr-3 h-6 w-6" />
              Feeling Lucky? 🎲
            </>
          )}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          {useAPI ? "Discover recipes from around the world" : "Discover local recipes"}
        </p>
      </div>

      {/* Random Recipe Display */}
      {randomRecipe && (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Recipe Image */}
            <div className="relative h-64 lg:h-full">
              <img
                src={randomRecipe.image}
                alt={randomRecipe.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveRecipe}
                  className={`rounded-full w-10 h-10 p-0 ${
                    isSaved 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Recipe Info */}
            <div className="p-6">
              <CardHeader className="p-0 pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl font-serif leading-tight">
                    {randomRecipe.title}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={fetchRandomRecipe}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0 space-y-4">
                {/* Quick Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{randomRecipe.readyInMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="h-4 w-4" />
                    <span>Serves {randomRecipe.servings}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>Random Pick</span>
                  </div>
                </div>

                {/* Cuisine and Diet Badges */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      {getCuisineBadge(randomRecipe.cuisines)}
                    </Badge>
                    {getDietBadges(randomRecipe.diets).map((diet, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {diet}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Nutrition Info */}
                {randomRecipe.nutrition && (
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Nutrition (per serving)</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {randomRecipe.nutrition.nutrients
                        .filter(nutrient => 
                          ['Calories', 'Protein', 'Fat', 'Carbohydrates'].includes(nutrient.name)
                        )
                        .map((nutrient, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-muted-foreground">{nutrient.name}:</span>
                            <span className="font-medium">
                              {Math.round(nutrient.amount)}{nutrient.unit}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Recipe Summary */}
                <div>
                  <h4 className="text-sm font-medium mb-2">About this dish</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {stripHtml(randomRecipe.summary).substring(0, 200)}...
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1">
                    <Link to={`/recipe/${randomRecipe.id}`}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Full Recipe
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={fetchRandomRecipe}
                    className="flex items-center gap-2"
                  >
                    <Shuffle className="h-4 w-4" />
                    Try Another
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!randomRecipe && !isLoading && (
        <Card className="text-center py-12">
          <CardContent>
            <Shuffle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready for a Surprise?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Click "Feeling Lucky" to discover a random recipe from our collection
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Discover recipes from around the world</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 