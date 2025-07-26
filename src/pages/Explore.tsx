import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecipeCard } from '@/components/RecipeCard';
import { 
  mockRecipes, 
  Recipe, 
  regionalCategories, 
  festivalCategories, 
  mealCategories,
  difficultyLevels,
  dietTypes,
  spiceLevels,
  locationBasedSuggestions,
  indianStates
} from '@/data/mockData';
import { getUserLocation, getRecipesByLocation } from '@/utils/location';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Utensils, 
  Flame, 
  Leaf, 
  Star,
  TrendingUp,
  Heart,
  Sparkles,
  Compass,
  Filter
} from 'lucide-react';

export default function Explore() {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedFestival, setSelectedFestival] = useState<string>('');
  const [selectedMeal, setSelectedMeal] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedDiet, setSelectedDiet] = useState<string>('');
  const [selectedSpice, setSelectedSpice] = useState<string>('');
  const [userLocation, setUserLocation] = useState<string>('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  useEffect(() => {
    // Load saved recipes from localStorage
    const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
    setSavedRecipes(saved);
    
    // Detect user location (mock implementation)
    detectUserLocation();
    
    // Apply filters
    applyFilters();
  }, [selectedRegion, selectedFestival, selectedMeal, selectedDifficulty, selectedDiet, selectedSpice]);

  const detectUserLocation = () => {
    // Get user location from localStorage
    const savedLocation = getUserLocation();
    if (savedLocation) {
      setUserLocation(savedLocation.state);
    } else {
      // Fallback to mock location if no saved location
      const mockLocations = ['Maharashtra', 'Gujarat', 'Punjab', 'Karnataka', 'Kerala'];
      const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      setUserLocation(randomLocation);
    }
  };

  const applyFilters = () => {
    let filtered = [...mockRecipes];

    if (selectedRegion) {
      filtered = filtered.filter(recipe => recipe.region === selectedRegion);
    }

    if (selectedFestival) {
      const festival = festivalCategories.find(f => f.name === selectedFestival);
      if (festival) {
        filtered = filtered.filter(recipe => festival.recipes.includes(recipe.id));
      }
    }

    if (selectedMeal) {
      filtered = filtered.filter(recipe => recipe.mealType === selectedMeal);
    }

    if (selectedDifficulty) {
      const difficulty = difficultyLevels.find(d => d.name === selectedDifficulty);
      if (difficulty) {
        filtered = filtered.filter(recipe => difficulty.recipes.includes(recipe.id));
      }
    }

    if (selectedDiet) {
      const diet = dietTypes.find(d => d.name === selectedDiet);
      if (diet) {
        filtered = filtered.filter(recipe => diet.recipes.includes(recipe.id));
      }
    }

    if (selectedSpice) {
      filtered = filtered.filter(recipe => recipe.spiceLevel === selectedSpice);
    }

    setFilteredRecipes(filtered);
  };

  const handleSaveRecipe = (recipeId: string) => {
    const newSaved = savedRecipes.includes(recipeId)
      ? savedRecipes.filter(id => id !== recipeId)
      : [...savedRecipes, recipeId];
    
    setSavedRecipes(newSaved);
    localStorage.setItem('saved-recipes', JSON.stringify(newSaved));
  };

  const clearFilters = () => {
    setSelectedRegion('');
    setSelectedFestival('');
    setSelectedMeal('');
    setSelectedDifficulty('');
    setSelectedDiet('');
    setSelectedSpice('');
  };

  const getLocationBasedRecipes = () => {
    if (!userLocation) return [];
    
    // Get saved location for more accurate results
    const savedLocation = getUserLocation();
    if (savedLocation) {
      return getRecipesByLocation(savedLocation.city, savedLocation.state);
    }
    
    // Fallback to state-based filtering
    const locationData = locationBasedSuggestions[userLocation as keyof typeof locationBasedSuggestions];
    if (!locationData) return [];
    return mockRecipes.filter(recipe => locationData.recipes.includes(recipe.id));
  };

  const getFestiveRecipes = () => {
    return mockRecipes.filter(recipe => recipe.isFestive);
  };

  const getHealthyRecipes = () => {
    return mockRecipes.filter(recipe => recipe.isHealthy);
  };

  const getStreetFoodRecipes = () => {
    return mockRecipes.filter(recipe => recipe.isStreetFood);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-green-50">
      {/* Header Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent opacity-90"></div>
        <div className="relative container mx-auto text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Explore Indian Cuisine
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover recipes from every corner of India, from street food to royal feasts
          </p>
          {userLocation && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="h-5 w-5" />
              <span>Discovering recipes near {userLocation}</span>
            </div>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold">Filters</h2>
            <Button variant="outline" onClick={clearFilters} size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Region Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Region</label>
              <select 
                value={selectedRegion} 
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">All Regions</option>
                {Object.entries(regionalCategories).map(([key, region]) => (
                  <option key={key} value={key}>{region.name}</option>
                ))}
              </select>
            </div>

            {/* Festival Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Festival</label>
              <select 
                value={selectedFestival} 
                onChange={(e) => setSelectedFestival(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">All Festivals</option>
                {festivalCategories.map(festival => (
                  <option key={festival.name} value={festival.name}>{festival.name}</option>
                ))}
              </select>
            </div>

            {/* Meal Type Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Meal Type</label>
              <select 
                value={selectedMeal} 
                onChange={(e) => setSelectedMeal(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">All Meals</option>
                {mealCategories.map(meal => (
                  <option key={meal.name} value={meal.name}>{meal.name}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Difficulty</label>
              <select 
                value={selectedDifficulty} 
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">All Levels</option>
                {difficultyLevels.map(difficulty => (
                  <option key={difficulty.name} value={difficulty.name}>{difficulty.name}</option>
                ))}
              </select>
            </div>

            {/* Diet Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Diet</label>
              <select 
                value={selectedDiet} 
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">All Diets</option>
                {dietTypes.map(diet => (
                  <option key={diet.name} value={diet.name}>{diet.name}</option>
                ))}
              </select>
            </div>

            {/* Spice Level Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Spice Level</label>
              <select 
                value={selectedSpice} 
                onChange={(e) => setSelectedSpice(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">All Levels</option>
                {spiceLevels.map(spice => (
                  <option key={spice.name} value={spice.name}>{spice.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Location-Based Suggestions */}
        {userLocation && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-serif font-bold">
                Taste of {userLocation}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getLocationBasedRecipes().map((recipe) => (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                  <RecipeCard
                    recipe={recipe}
                    onSave={handleSaveRecipe}
                    isSaved={savedRecipes.includes(recipe.id)}
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Regional Categories */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Explore by Region</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(regionalCategories).map(([key, region]) => (
              <Card key={key} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">{region.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{region.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Popular Dishes:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {region.popularDishes.slice(0, 2).map(dish => (
                          <Badge key={dish} variant="secondary" className="text-xs">
                            {dish}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Key Spices:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {region.spices.slice(0, 2).map(spice => (
                          <Badge key={spice} variant="outline" className="text-xs">
                            {spice}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Festival Favorites */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Festive Favorites</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {festivalCategories.map(festival => (
              <Card key={festival.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">{festival.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{festival.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {festival.colors.map(color => (
                        <div 
                          key={color} 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{festival.period}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Categories */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Quick Categories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quick Indian Meals */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Quick Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Under 30 minutes recipes
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore
                </Button>
              </CardContent>
            </Card>

            {/* Healthy Desi Recipes */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Healthy Desi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Nutritious Indian dishes
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore
                </Button>
              </CardContent>
            </Card>

            {/* Street Food */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Street Food
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Popular street delicacies
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore
                </Button>
              </CardContent>
            </Card>

            {/* Festive Specials */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Festive Specials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Celebration recipes
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Filtered Results */}
        {filteredRecipes.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold">
                {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                  <RecipeCard
                    recipe={recipe}
                    onSave={handleSaveRecipe}
                    isSaved={savedRecipes.includes(recipe.id)}
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredRecipes.length === 0 && (selectedRegion || selectedFestival || selectedMeal || selectedDifficulty || selectedDiet || selectedSpice) && (
          <section className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Utensils className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to find more recipes
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
} 