import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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

// Simple recipe data
const recipes = [
  {
    id: 1,
    title: "Rice and Rajma Curry",
    description: "A delicious combination of rice and kidney beans",
    ingredients: ["Rice", "Rajma (Kidney Beans)", "Onion", "Tomato", "Spices"],
    time: "45",
    difficulty: "Easy",
    matchScore: 2
  },
  {
    id: 2,
    title: "Vegetable Biryani",
    description: "Aromatic rice dish with mixed vegetables",
    ingredients: ["Basmati Rice", "Mixed Vegetables", "Onion", "Spices", "Ghee", "Saffron"],
    time: "60",
    difficulty: "Medium",
    matchScore: 1
  },
  {
    id: 3,
    title: "Rajma Chawal",
    description: "Classic North Indian comfort food",
    ingredients: ["Rice", "Rajma (Kidney Beans)", "Onion", "Ginger", "Garlic"],
    time: "50",
    difficulty: "Easy",
    matchScore: 2
  },
  {
    id: 4,
    title: "Mixed Vegetable Pulao",
    description: "Flavorful rice with seasonal vegetables",
    ingredients: ["Rice", "Carrots", "Peas", "Onion", "Spices"],
    time: "40",
    difficulty: "Easy",
    matchScore: 1
  },
  {
    id: 5,
    title: "Rajma Masala",
    description: "Spicy kidney beans curry",
    ingredients: ["Rajma (Kidney Beans)", "Onion", "Tomato", "Spices", "Oil"],
    time: "35",
    difficulty: "Medium",
    matchScore: 1
  },
  {
    id: 6,
    title: "Simple Rice Bowl",
    description: "Quick and easy rice preparation",
    ingredients: ["Rice", "Salt", "Water", "Ghee"],
    time: "20",
    difficulty: "Easy",
    matchScore: 1
  },
  {
    id: 7,
    title: "Chicken Biryani",
    description: "Aromatic biryani with tender chicken",
    ingredients: ["Basmati Rice", "Chicken", "Onion", "Spices", "Yogurt", "Saffron", "Ghee"],
    time: "75",
    difficulty: "Hard",
    matchScore: 1
  },
  {
    id: 8,
    title: "Paneer Tikka Masala",
    description: "Creamy curry with soft paneer",
    ingredients: ["Paneer", "Tomato", "Cream", "Spices", "Onion", "Ginger", "Garlic"],
    time: "30",
    difficulty: "Medium",
    matchScore: 1
  },
  {
    id: 9,
    title: "Dal Khichdi",
    description: "Comforting one-pot rice and lentil dish",
    ingredients: ["Rice", "Moong Dal", "Onion", "Spices", "Ghee"],
    time: "35",
    difficulty: "Easy",
    matchScore: 1
  },
  {
    id: 10,
    title: "Vegetable Upma",
    description: "Quick breakfast with semolina and vegetables",
    ingredients: ["Sooji (Semolina)", "Mixed Vegetables", "Onion", "Mustard Seeds", "Curry Leaves"],
    time: "20",
    difficulty: "Easy",
    matchScore: 1
  },
  {
    id: 11,
    title: "Roti with Sabzi",
    description: "Fresh rotis with vegetable curry",
    ingredients: ["Wheat Flour", "Mixed Vegetables", "Onion", "Spices", "Oil"],
    time: "45",
    difficulty: "Medium",
    matchScore: 1
  },
  {
    id: 12,
    title: "Fish Curry",
    description: "Spicy fish curry with coconut milk",
    ingredients: ["Fish", "Onion", "Tomato", "Coconut Milk", "Spices", "Curry Leaves"],
    time: "40",
    difficulty: "Medium",
    matchScore: 1
  },
  {
    id: 13,
    title: "Egg Curry",
    description: "Hard-boiled eggs in spicy gravy",
    ingredients: ["Eggs", "Onion", "Tomato", "Spices", "Oil"],
    time: "25",
    difficulty: "Easy",
    matchScore: 1
  },
  {
    id: 14,
    title: "Mixed Vegetable Curry",
    description: "Colorful vegetable medley",
    ingredients: ["Mixed Vegetables", "Onion", "Tomato", "Spices", "Oil"],
    time: "30",
    difficulty: "Easy",
    matchScore: 1
  },
  {
    id: 15,
    title: "Chana Masala",
    description: "Spicy chickpea curry",
    ingredients: ["Chickpeas", "Onion", "Tomato", "Spices", "Oil"],
    time: "35",
    difficulty: "Easy",
    matchScore: 1
  },
  {
    id: 16,
    title: "Masala Dosa",
    description: "Crispy dosa with potato filling",
    ingredients: ["Rice", "Urad Dal", "Potato", "Onion", "Spices"],
    time: "50",
    difficulty: "Medium",
    matchScore: 1
  },
  {
    id: 17,
    title: "Idli with Sambar",
    description: "Soft idlis with lentil sambar",
    ingredients: ["Rice", "Urad Dal", "Mixed Vegetables", "Spices", "Oil"],
    time: "60",
    difficulty: "Medium",
    matchScore: 1
  },
  {
    id: 18,
    title: "Pav Bhaji",
    description: "Spicy vegetable mash with bread",
    ingredients: ["Mixed Vegetables", "Bread", "Onion", "Pav Bhaji Masala", "Butter"],
    time: "30",
    difficulty: "Easy",
    matchScore: 1
  },
  {
    id: 19,
    title: "Aloo Paratha",
    description: "Stuffed potato flatbread",
    ingredients: ["Wheat Flour", "Potato", "Onion", "Spices", "Ghee"],
    time: "40",
    difficulty: "Medium",
    matchScore: 1
  },
  {
    id: 20,
    title: "Mixed Dal",
    description: "Nutritious mixed lentil curry",
    ingredients: ["Moong Dal", "Masoor Dal", "Toor Dal", "Onion", "Spices"],
    time: "40",
    difficulty: "Easy",
    matchScore: 1
  }
];

// Available ingredients
const availableIngredients = [
  // Grains & Rice
  "Rice", "Basmati Rice", "Brown Rice", "Sooji (Semolina)", "Poha (Flattened Rice)", 
  "Wheat Flour", "Maida (Refined Flour)", "Bajra (Pearl Millet)", "Jowar (Sorghum)",
  "Ragi Flour", "Barley", "Vermicelli", "Bread", "Naan", "Roti", "Paratha", 
  "Chapati", "Poori", "Bhatura", "Dosa", "Idli", "Appam", "Puttu", "Upma", "Khichdi",
  
  // Pulses & Beans
  "Rajma (Kidney Beans)", "Lentils", "Chickpeas", "Moong Dal", "Masoor Dal", 
  "Lobia (Black-eyed Peas)", "Urad Dal", "Toor Dal", "Chana Dal",
  
  // Vegetables
  "Onion", "Tomato", "Potato", "Carrot", "Peas", "Spinach", "Capsicum", 
  "Brinjal (Eggplant)", "Cauliflower", "Cabbage", "Okra", "Cucumber", 
  "Mixed Vegetables", "Bell Pepper", "Green Chilies", "Mushroom",
  
  // Aromatics & Spices
  "Ginger", "Garlic", "Spices", "Salt", "Turmeric", "Red Chili Powder", 
  "Coriander Powder", "Cumin Seeds", "Mustard Seeds", "Cardamom", "Cinnamon",
  "Black Pepper", "Garam Masala", "Pav Bhaji Masala", "Curry Leaves",
  
  // Dairy & Fats
  "Oil", "Ghee", "Butter", "Paneer", "Cheese", "Cream", "Milk", "Yogurt", "Curd",
  
  // Other Essentials
  "Water", "Sugar", "Honey", "Lemon", "Coriander Leaves", "Mint Leaves",
  "Saffron", "Rose Water", "Vinegar", "Soy Sauce", "Coconut Milk",
  
  // Proteins
  "Chicken", "Fish", "Eggs", "Mutton", "Prawns", "Tofu",
  
  // Nuts & Seeds
  "Almonds", "Cashews", "Pistachios", "Sesame Seeds", "Pumpkin Seeds",
  
  // Fruits
  "Apple", "Banana", "Mango", "Pineapple", "Grapes", "Pomegranate"
];

export default function ReverseCooking() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ingredients');
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  // Filter recipes based on selected ingredients
  const filteredRecipes = recipes.filter(recipe => {
    if (selectedIngredients.length === 0) return false;
    
    const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
    const selected = selectedIngredients.map(ing => ing.toLowerCase());
    
    // Check if any selected ingredient matches recipe ingredients
    return selected.some(selectedIng => 
      recipeIngredients.some(recipeIng => 
        recipeIng.includes(selectedIng) || selectedIng.includes(recipeIng)
      )
    );
  });

  // Calculate match percentage for each recipe
  const recipesWithMatch = filteredRecipes.map(recipe => {
    const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
    const selected = selectedIngredients.map(ing => ing.toLowerCase());
    
    const matchCount = selected.filter(selectedIng => 
      recipeIngredients.some(recipeIng => 
        recipeIng.includes(selectedIng) || selectedIng.includes(recipeIng)
      )
    ).length;
    
    const matchPercentage = (matchCount / selectedIngredients.length) * 100;
    
    return {
      ...recipe,
      matchCount,
      matchPercentage
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  const handleIngredientSelect = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleIngredientRemove = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(ing => ing !== ingredient));
  };

  const clearSelection = () => {
    setSelectedIngredients([]);
    setSearchQuery('');
  };

  const handleSaveRecipe = (recipeId: string) => {
    if (savedRecipes.includes(recipeId)) {
      setSavedRecipes(savedRecipes.filter(id => id !== recipeId));
    } else {
      setSavedRecipes([...savedRecipes, recipeId]);
    }
  };

  const filteredIngredients = availableIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent opacity-95"></div>
        <div className="relative container mx-auto text-center text-primary-foreground">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Reverse Cooking
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-95">
            Transform your ingredients into delicious meals
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredient Selection */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Utensils className="h-6 w-6 text-primary" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span>What do you have?</span>
                      {selectedIngredients.length > 0 && (
                        <Badge variant="secondary">
                          {selectedIngredients.length} selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select your ingredients to find perfect recipes
                    </p>
                  </div>
                </CardTitle>
                {selectedIngredients.length > 0 && (
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      onClick={clearSelection}
                      variant="outline"
                      size="sm"
                      className="btn-shimmer"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search ingredients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
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
                          className="flex items-center gap-1 bg-primary/10 text-primary border-primary/20"
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

                {/* Available Ingredients */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Available Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {filteredIngredients.map(ingredient => (
                      <button
                        key={ingredient}
                        onClick={() => handleIngredientSelect(ingredient)}
                        disabled={selectedIngredients.includes(ingredient)}
                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                          selectedIngredients.includes(ingredient)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background border-border hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        {ingredient}
                        {selectedIngredients.includes(ingredient) && (
                          <CheckCircle className="h-3 w-3 ml-1 inline" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recipe Suggestions */}
          <div className="lg:col-span-2">
            {selectedIngredients.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No ingredients selected</h3>
                  <p className="text-muted-foreground">
                    Select ingredients from the left panel to see recipe suggestions
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-serif font-bold">
                    Recipe Suggestions ({recipesWithMatch.length})
                  </h2>
                </div>

                {/* Recipes Grid */}
                {recipesWithMatch.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recipesWithMatch.map((recipe) => (
                      <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{recipe.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {recipe.description}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSaveRecipe(recipe.id.toString())}
                              className="text-muted-foreground hover:text-primary"
                            >
                              <Heart className={`h-4 w-4 ${savedRecipes.includes(recipe.id.toString()) ? 'fill-current text-primary' : ''}`} />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {/* Match Percentage */}
                            <div>
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="font-medium">Ingredient Match</span>
                                <span className="text-muted-foreground">{Math.round(recipe.matchPercentage)}%</span>
                              </div>
                              <Progress value={recipe.matchPercentage} className="h-2" />
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                <span>{recipe.matchCount} of {selectedIngredients.length} ingredients match</span>
                              </div>
                            </div>

                            {/* Ingredients */}
                            <div>
                              <span className="text-sm font-medium">Ingredients:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {recipe.ingredients.map((ingredient, idx) => {
                                  const isMatched = selectedIngredients.some(selected => 
                                    ingredient.toLowerCase().includes(selected.toLowerCase()) ||
                                    selected.toLowerCase().includes(ingredient.toLowerCase())
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

                            {/* Recipe Details */}
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="mr-1 h-3 w-3" />
                                {recipe.time} min
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
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Utensils className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                      <p className="text-muted-foreground mb-6">
                        We couldn't find recipes with your selected ingredients. Try adding more items.
                      </p>
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