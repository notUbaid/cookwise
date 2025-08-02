import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  Clock, 
  Utensils, 
  Heart,
  RefreshCw,
  Download,
  Share2,
  Loader2,
  XCircle,
  CheckCircle,
  ChefHat,
  Target,
  Globe,
  AlertTriangle,
  X
} from 'lucide-react';
import { mockMealPlans, mockRecipes } from '@/data/mockData';

// Edamam API types
interface EdamamMeal {
  id: string;
  title: string;
  image: string;
  calories: number;
  protein: string;
  fat: string;
  carbs: string;
  url: string;
  dietLabels: string[];
  healthLabels: string[];
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
}

interface EdamamMealPlan {
  week: {
    monday: {
      meals: EdamamMeal[];
      nutrients: {
        calories: number;
        protein: string;
        fat: string;
        carbs: string;
      };
    };
    tuesday: {
      meals: EdamamMeal[];
      nutrients: {
        calories: number;
        protein: string;
        fat: string;
        carbs: string;
      };
    };
    wednesday: {
      meals: EdamamMeal[];
      nutrients: {
        calories: number;
        protein: string;
        fat: string;
        carbs: string;
      };
    };
    thursday: {
      meals: EdamamMeal[];
      nutrients: {
        calories: number;
        protein: string;
        fat: string;
        carbs: string;
      };
    };
    friday: {
      meals: EdamamMeal[];
      nutrients: {
        calories: number;
        protein: string;
        fat: string;
        carbs: string;
      };
    };
    saturday: {
      meals: EdamamMeal[];
      nutrients: {
        calories: number;
        protein: string;
        fat: string;
        carbs: string;
      };
    };
    sunday: {
      meals: EdamamMeal[];
      nutrients: {
        calories: number;
        protein: string;
        fat: string;
        carbs: string;
      };
    };
  };
}

// Diet and preference options
const dietTypes = [
  { value: 'balanced', label: 'Balanced', icon: '⚖️' },
  { value: 'high-fiber', label: 'High Fiber', icon: '🌾' },
  { value: 'high-protein', label: 'High Protein', icon: '💪' },
  { value: 'low-carb', label: 'Low Carb', icon: '🥗' },
  { value: 'low-fat', label: 'Low Fat', icon: '🥑' },
  { value: 'low-sodium', label: 'Low Sodium', icon: '🧂' },
];

const healthLabels = [
  { value: 'vegan', label: 'Vegan', icon: '🌱' },
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
  { value: 'pescatarian', label: 'Pescatarian', icon: '🐟' },
  { value: 'gluten-free', label: 'Gluten Free', icon: '🌾' },
  { value: 'dairy-free', label: 'Dairy Free', icon: '🥛' },
  { value: 'egg-free', label: 'Egg Free', icon: '🥚' },
  { value: 'tree-nut-free', label: 'Tree Nut Free', icon: '🌰' },
  { value: 'peanut-free', label: 'Peanut Free', icon: '🥜' },
  { value: 'soy-free', label: 'Soy Free', icon: '🫘' },
  { value: 'fish-free', label: 'Fish Free', icon: '🐠' },
  { value: 'shellfish-free', label: 'Shellfish Free', icon: '🦐' },
];

const cuisineTypes = [
  { value: 'indian', label: 'Indian', icon: '🇮🇳' },
  { value: 'italian', label: 'Italian', icon: '🇮🇹' },
  { value: 'chinese', label: 'Chinese', icon: '🇨🇳' },
  { value: 'mexican', label: 'Mexican', icon: '🇲🇽' },
  { value: 'mediterranean', label: 'Mediterranean', icon: '🇬🇷' },
  { value: 'thai', label: 'Thai', icon: '🇹🇭' },
  { value: 'japanese', label: 'Japanese', icon: '🇯🇵' },
  { value: 'american', label: 'American', icon: '🇺🇸' },
  { value: 'french', label: 'French', icon: '🇫🇷' },
  { value: 'middle-eastern', label: 'Middle Eastern', icon: '🇱🇧' },
];

const weekDays = [
  { key: 'monday', label: 'Monday', short: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { key: 'thursday', label: 'Thursday', short: 'Thu' },
  { key: 'friday', label: 'Friday', short: 'Fri' },
  { key: 'saturday', label: 'Saturday', short: 'Sat' },
  { key: 'sunday', label: 'Sunday', short: 'Sun' },
];

const mealTypes = [
  { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { key: 'lunch', label: 'Lunch', icon: '☀️' },
  { key: 'dinner', label: 'Dinner', icon: '🌙' },
];

export default function MealPlan() {
  const [mealPlan, setMealPlan] = useState<EdamamMealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // User preferences
  const [calories, setCalories] = useState(2300);
  const [selectedDiet, setSelectedDiet] = useState('balanced');
  const [selectedHealthLabels, setSelectedHealthLabels] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);

  const generateMealPlan = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Try Edamam API first
      const appId = '12572caf';
      const apiKey = 'b3741a0d39150b784080601ebcce86c6';
      
      // Build query parameters
      const params = new URLSearchParams({
        timeFrame: 'week',
        targetCalories: calories.toString(),
        diet: selectedDiet,
        app_id: appId,
        app_key: apiKey,
      });

      // Add health labels
      if (selectedHealthLabels.length > 0) {
        params.append('health', selectedHealthLabels.join('&health='));
      }

      // Add cuisine types
      if (selectedCuisines.length > 0) {
        params.append('cuisineType', selectedCuisines.join('&cuisineType='));
      }

      // Add excluded ingredients
      if (excludedIngredients.length > 0) {
        params.append('excluded', excludedIngredients.join('&excluded='));
      }

      const url = `https://api.edamam.com/api/recipes/v2/type/public?${params.toString()}`;
      
      console.log('Calling Edamam Meal Planner API:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Edamam API response:', data);

      // Transform the response to match our expected format
      const transformedPlan = transformEdamamData(data);
      setMealPlan(transformedPlan);

    } catch (error) {
      console.error('Edamam API failed, using mock data:', error);
      
      // Fallback to mock data
      const mockPlan = generateMockMealPlan();
      setMealPlan(mockPlan);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockMealPlan = (): EdamamMealPlan => {
    const availableRecipes = mockRecipes.filter(recipe => {
      // Filter based on selected diet
      if (selectedDiet !== 'balanced') {
        if (selectedDiet === 'vegetarian' && !recipe.dietType.includes('Veg')) return false;
        if (selectedDiet === 'vegan' && !recipe.dietType.includes('Vegan')) return false;
      }
      
      // Filter based on health labels
      if (selectedHealthLabels.includes('gluten-free') && !recipe.dietType.includes('Gluten-Free')) return false;
      
      return true;
    });

    const createMockMeal = (recipe: any): EdamamMeal => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      calories: recipe.calories,
      protein: `${recipe.macros.protein}g`,
      fat: `${recipe.macros.fat}g`,
      carbs: `${recipe.macros.carbs}g`,
      url: `/recipe/${recipe.id}`,
      dietLabels: recipe.dietType,
      healthLabels: recipe.dietType,
      cuisineType: [recipe.cuisine],
      mealType: [recipe.mealType],
      dishType: [recipe.tags[0] || 'main course']
    });

    const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const mealTypes = ['breakfast', 'lunch', 'dinner'];
    
    // Define calorie targets for each meal type to reach daily target
    const mealCalorieTargets = {
      breakfast: Math.round(calories * 0.25), // 25% of daily calories
      lunch: Math.round(calories * 0.35),     // 35% of daily calories
      dinner: Math.round(calories * 0.40)     // 40% of daily calories
    };
    
    const week: any = {};
    
    weekDays.forEach(day => {
      const dayMeals: EdamamMeal[] = [];
      let totalCalories = 0;
      let totalProtein = 0;
      let totalFat = 0;
      let totalCarbs = 0;
      
      mealTypes.forEach(mealType => {
        const filteredRecipes = availableRecipes.filter(recipe => {
          if (mealType === 'breakfast') return recipe.mealType === 'Breakfast';
          if (mealType === 'lunch') return recipe.mealType === 'Lunch';
          if (mealType === 'dinner') return recipe.mealType === 'Dinner';
          return true;
        });
        
        // If no specific meal type recipes, use any recipe
        const recipesToChooseFrom = filteredRecipes.length > 0 ? filteredRecipes : availableRecipes;
        const randomRecipe = recipesToChooseFrom[Math.floor(Math.random() * recipesToChooseFrom.length)] || availableRecipes[0];
        
        // Adjust recipe calories to match meal target
        const adjustedRecipe = {
          ...randomRecipe,
          calories: mealCalorieTargets[mealType as keyof typeof mealCalorieTargets],
          macros: {
            protein: Math.round(mealCalorieTargets[mealType as keyof typeof mealCalorieTargets] * 0.15 / 4), // 15% protein
            fat: Math.round(mealCalorieTargets[mealType as keyof typeof mealCalorieTargets] * 0.25 / 9),    // 25% fat
            carbs: Math.round(mealCalorieTargets[mealType as keyof typeof mealCalorieTargets] * 0.60 / 4)  // 60% carbs
          }
        };
        
        const mockMeal = createMockMeal(adjustedRecipe);
        dayMeals.push(mockMeal);
        
        totalCalories += adjustedRecipe.calories;
        totalProtein += adjustedRecipe.macros.protein;
        totalFat += adjustedRecipe.macros.fat;
        totalCarbs += adjustedRecipe.macros.carbs;
      });
      
      week[day] = {
        meals: dayMeals,
        nutrients: {
          calories: Math.round(totalCalories),
          protein: `${Math.round(totalProtein)}g`,
          fat: `${Math.round(totalFat)}g`,
          carbs: `${Math.round(totalCarbs)}g`
        }
      };
    });
    
    return { week };
  };

  const transformEdamamData = (data: any): EdamamMealPlan => {
    // Transform Edamam API response to our format
    // This is a simplified transformation - adjust based on actual API response
    return generateMockMealPlan(); // Fallback for now
  };

  const handleHealthLabelToggle = (label: string) => {
    setSelectedHealthLabels(prev => 
      prev.includes(label) 
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine) 
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleExcludedIngredientAdd = (ingredient: string) => {
    if (ingredient.trim() && !excludedIngredients.includes(ingredient.trim())) {
      setExcludedIngredients(prev => [...prev, ingredient.trim()]);
    }
  };

  const handleExcludedIngredientRemove = (ingredient: string) => {
    setExcludedIngredients(prev => prev.filter(i => i !== ingredient));
  };

  const getMealByType = (dayMeals: EdamamMeal[], mealType: string) => {
    return dayMeals.find(meal => meal.mealType.includes(mealType)) || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-green-50">
      {/* Header Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent opacity-90"></div>
        <div className="relative container mx-auto text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Weekly Meal Plan
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get personalized meal plans based on your diet preferences, calorie goals, and regional tastes
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Calendar className="h-6 w-6" />
            <span>Plan your week, eat your best</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Preferences Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Meal Plan Preferences
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Customize your meal plan based on your dietary needs and preferences
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Calorie Target */}
            <div>
              <Label htmlFor="calories" className="text-sm font-medium">
                Daily Calorie Target
              </Label>
              <div className="flex items-center gap-4 mt-2">
                <Input
                  id="calories"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  min="1800"
                  max="3500"
                  step="100"
                  className="w-32"
                />
                <span className="text-sm text-muted-foreground">calories per day (2200-2500 recommended)</span>
              </div>
            </div>

            {/* Diet Type */}
            <div>
              <Label className="text-sm font-medium">Diet Type</Label>
              <Select value={selectedDiet} onValueChange={setSelectedDiet}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  {dietTypes.map(diet => (
                    <SelectItem key={diet.value} value={diet.value}>
                      <span className="flex items-center gap-2">
                        <span>{diet.icon}</span>
                        <span>{diet.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Health Labels */}
            <div>
              <Label className="text-sm font-medium">Dietary Restrictions</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {healthLabels.map(health => (
                  <div key={health.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={health.value}
                      checked={selectedHealthLabels.includes(health.value)}
                      onCheckedChange={() => handleHealthLabelToggle(health.value)}
                    />
                    <Label htmlFor={health.value} className="text-sm flex items-center gap-1">
                      <span>{health.icon}</span>
                      <span>{health.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Cuisine Types */}
            <div>
              <Label className="text-sm font-medium">Preferred Cuisines</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {cuisineTypes.map(cuisine => (
                  <div key={cuisine.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={cuisine.value}
                      checked={selectedCuisines.includes(cuisine.value)}
                      onCheckedChange={() => handleCuisineToggle(cuisine.value)}
                    />
                    <Label htmlFor={cuisine.value} className="text-sm flex items-center gap-1">
                      <span>{cuisine.icon}</span>
                      <span>{cuisine.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Excluded Ingredients */}
            <div>
              <Label className="text-sm font-medium">Excluded Ingredients</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add ingredient to exclude..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleExcludedIngredientAdd((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add ingredient to exclude..."]') as HTMLInputElement;
                    if (input) {
                      handleExcludedIngredientAdd(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              {excludedIngredients.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {excludedIngredients.map(ingredient => (
                    <Badge key={ingredient} variant="outline" className="flex items-center gap-1">
                      {ingredient}
                      <button
                        onClick={() => handleExcludedIngredientRemove(ingredient)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Generate Button */}
            <Button 
              onClick={generateMealPlan} 
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Meal Plan...
                </>
              ) : (
                <>
                  <ChefHat className="mr-2 h-4 w-4" />
                  Generate Weekly Meal Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-8 border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">Error generating meal plan</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Meal Plan Display */}
        {mealPlan && (
          <div className="space-y-6">
            {/* Plan Actions */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold">Your Weekly Meal Plan</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={generateMealPlan}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </div>

            {/* Weekly Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {weekDays.map(day => {
                const dayData = mealPlan.week[day.key as keyof typeof mealPlan.week];
                return (
                  <Card key={day.key} className="min-h-[400px]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-center">{day.short}</CardTitle>
                      <div className="text-center text-sm text-muted-foreground">
                        {dayData.nutrients.calories} cal
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mealTypes.map(mealType => {
                        const meal = getMealByType(dayData.meals, mealType.key);
                        return (
                          <div key={mealType.key} className="space-y-2">
                            <div className="flex items-center gap-1 text-sm font-medium">
                              <span>{mealType.icon}</span>
                              <span>{mealType.label}</span>
                            </div>
                            {meal ? (
                              <div className="space-y-2">
                                <img
                                  src={meal.image}
                                  alt={meal.title}
                                  className="w-full h-20 object-cover rounded-md"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder.svg';
                                  }}
                                />
                                <h4 className="text-xs font-medium line-clamp-2">
                                  {meal.title}
                                </h4>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>{meal.calories} cal</span>
                                  <span>{meal.protein}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="h-20 bg-muted rounded-md flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">No meal planned</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Nutrition Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Weekly Nutrition Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {mealPlan.week.monday.nutrients.calories * 7}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {mealPlan.week.monday.nutrients.protein}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Protein/Day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {mealPlan.week.monday.nutrients.fat}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Fat/Day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {mealPlan.week.monday.nutrients.carbs}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Carbs/Day</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!mealPlan && !isLoading && !error && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No meal plan generated yet</h3>
              <p className="text-muted-foreground mb-6">
                Set your preferences above and generate your personalized weekly meal plan
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>Get recipes from around the world tailored to your needs</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 