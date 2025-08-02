import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecipeCard } from '@/components/RecipeCard';
import { 
  mockRecipes, 
  Recipe, 
  mockCategories,
  regionalCategories, 
  festivalCategories, 
  mealCategories,
  difficultyLevels,
  dietTypes,
  spiceLevels,
  locationBasedSuggestions,
  indianStates,
  mockFeaturedSections,
  getRandomRecipes,
  getTrendingRecipes,
  getRecommendedRecipes
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
  Filter,
  ArrowLeft,
  ChefHat
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
  const [selectedState, setSelectedState] = useState<string>('');
  const [stateRecipes, setStateRecipes] = useState<Recipe[]>([]);
  const [stateSearchQuery, setStateSearchQuery] = useState<string>('');
  const [selectedFestivalView, setSelectedFestivalView] = useState<string>('');
  const [festivalRecipes, setFestivalRecipes] = useState<Recipe[]>([]);
  const [festivalSearchQuery, setFestivalSearchQuery] = useState<string>('');
  const [selectedQuickCategory, setSelectedQuickCategory] = useState<string>('');
  const [quickCategoryRecipes, setQuickCategoryRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Load saved recipes from localStorage
    const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
    setSavedRecipes(saved);
    
    // Detect user location (mock implementation)
    detectUserLocation();
    
    // Apply filters
    applyFilters();
  }, [selectedRegion, selectedFestival, selectedMeal, selectedDifficulty, selectedDiet, selectedSpice]);

  useEffect(() => {
    if (selectedState) {
      const recipes = getRecipesByState(selectedState);
      setStateRecipes(recipes);
    } else {
      setStateRecipes([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedFestivalView) {
      const recipes = getRecipesByFestival(selectedFestivalView);
      setFestivalRecipes(recipes);
    } else {
      setFestivalRecipes([]);
    }
  }, [selectedFestivalView]);

  useEffect(() => {
    if (selectedQuickCategory) {
      const recipes = getRecipesByQuickCategory(selectedQuickCategory);
      setQuickCategoryRecipes(recipes);
    } else {
      setQuickCategoryRecipes([]);
    }
  }, [selectedQuickCategory]);

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
    setSelectedQuickCategory('');
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

  const getRecipesByState = (stateName: string): Recipe[] => {
    return mockRecipes.filter(recipe => recipe.state === stateName);
  };

  const getRecipesByFestival = (festivalName: string): Recipe[] => {
    return mockRecipes.filter(recipe => recipe.isFestive && recipe.festival === festivalName);
  };

  const getFilteredFestivals = () => {
    if (festivalSearchQuery) {
      return festivalCategories.filter(festival => 
        festival.name.toLowerCase().includes(festivalSearchQuery.toLowerCase()) ||
        festival.festival.toLowerCase().includes(festivalSearchQuery.toLowerCase())
      );
    }
    return festivalCategories;
  };

  const getStatesByRegion = (region: string) => {
    const states = indianStates.filter(state => state.region === region);
    if (stateSearchQuery) {
      return states.filter(state => 
        state.name.toLowerCase().includes(stateSearchQuery.toLowerCase()) ||
        state.capital.toLowerCase().includes(stateSearchQuery.toLowerCase())
      );
    }
    return states;
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    setSelectedState('');
    setStateSearchQuery('');
  };

  const handleStateClick = (stateName: string) => {
    setSelectedState(stateName);
  };

  const handleFestivalClick = (festivalName: string) => {
    setSelectedFestivalView(festivalName);
  };

  const clearStateSelection = () => {
    setSelectedState('');
    setSelectedRegion('');
    setStateSearchQuery('');
  };

  const clearFestivalSelection = () => {
    setSelectedFestivalView('');
    setFestivalSearchQuery('');
  };

  const clearQuickCategorySelection = () => {
    setSelectedQuickCategory('');
  };

  const getRecipesByQuickCategory = (category: string): Recipe[] => {
    switch (category) {
      case 'Quick Meals':
        return mockRecipes.filter(recipe => recipe.cookTime <= 30);
      case 'Healthy Desi':
        return mockRecipes.filter(recipe => recipe.isHealthy);
      case 'Street Food':
        return mockRecipes.filter(recipe => recipe.isStreetFood);
      case 'Festive Specials':
        return mockRecipes.filter(recipe => recipe.isFestive);
      default:
        return [];
    }
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

        {/* Featured Categories */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Featured Categories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map(category => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.recipeCount} recipes</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {category.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Regional Categories */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Explore by Region</h2>
          </div>
          
          {selectedState ? (
            // Show selected state's dishes
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  variant="outline" 
                  onClick={clearStateSelection}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Regions
                </Button>
                <div>
                  <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-primary" />
                    {selectedState} Cuisine
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {stateRecipes.length} traditional dishes from {selectedState}
                  </p>
                </div>
              </div>
              
              {stateRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stateRecipes.map(recipe => (
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                      <RecipeCard
                        recipe={recipe}
                        onSave={handleSaveRecipe}
                        isSaved={savedRecipes.includes(recipe.id)}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No dishes found</h3>
                  <p className="text-muted-foreground">
                    We're working on adding more dishes from {selectedState}
                  </p>
                </div>
              )}
            </div>
          ) : selectedRegion ? (
            // Show states in selected region
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedRegion('')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Regions
                </Button>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold">
                    States in {selectedRegion} India
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Click on a state to explore its local dishes
                  </p>
                </div>
              </div>
              
              {/* Search States */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Search states or capitals..."
                    value={stateSearchQuery}
                    onChange={(e) => setStateSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {stateSearchQuery && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Found {getStatesByRegion(selectedRegion).length} states matching "{stateSearchQuery}"
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getStatesByRegion(selectedRegion).map(state => {
                  const stateRecipes = getRecipesByState(state.name);
                  return (
                    <Card 
                      key={state.name} 
                      className="hover:shadow-lg transition-shadow cursor-pointer group"
                      onClick={() => handleStateClick(state.name)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg font-serif flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          {state.name}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                          Capital: {state.capital}
                        </p>
                      </CardHeader>
                      <CardContent>
                                               <div className="space-y-2">
                         <div>
                           <span className="text-sm font-medium">Available Dishes:</span>
                           <Badge 
                             variant={stateRecipes.length > 5 ? "default" : "secondary"} 
                             className="text-xs ml-2"
                           >
                             {stateRecipes.length} recipes
                           </Badge>
                           {stateRecipes.length > 10 && (
                             <Badge variant="destructive" className="text-xs ml-1">
                               Popular!
                             </Badge>
                           )}
                         </div>
                         <div>
                           <span className="text-sm font-medium">Region:</span>
                           <Badge variant="outline" className="text-xs ml-1">
                             {state.region}
                           </Badge>
                         </div>
                         {stateRecipes.length > 0 && (
                           <div>
                             <span className="text-sm font-medium">Popular Dishes:</span>
                             <div className="flex flex-wrap gap-1 mt-1">
                               {stateRecipes.slice(0, 2).map(recipe => (
                                 <Badge key={recipe.id} variant="secondary" className="text-xs">
                                   {recipe.title}
                                 </Badge>
                               ))}
                               {stateRecipes.length > 2 && (
                                 <Badge variant="outline" className="text-xs">
                                   +{stateRecipes.length - 2} more
                                 </Badge>
                               )}
                             </div>
                           </div>
                         )}
                       </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            // Show all regions
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionalCategories.map(region => (
                <Card 
                  key={region.name} 
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => handleRegionClick(region.region)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-serif flex items-center gap-2">
                      <span>{region.icon}</span>
                      {region.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      Traditional {region.cuisine} cuisine from {region.region} India
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">States:</span>
                        <Badge variant="secondary" className="text-xs ml-2">
                          {getStatesByRegion(region.region).length} states
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Region:</span>
                        <Badge variant="outline" className="text-xs ml-1">
                          {region.region}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Total Dishes:</span>
                        <Badge variant="secondary" className="text-xs ml-2">
                          {getStatesByRegion(region.region).reduce((total, state) => 
                            total + getRecipesByState(state.name).length, 0
                          )} recipes
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Festival Favorites */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Festive Favorites</h2>
          </div>
          
          {selectedFestivalView ? (
            // Show selected festival's dishes
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  variant="outline" 
                  onClick={clearFestivalSelection}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Festivals
                </Button>
                <div>
                  <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {selectedFestivalView} Specials
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {festivalRecipes.length} traditional dishes for {selectedFestivalView} celebrations
                  </p>
                </div>
              </div>
              
              {festivalRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {festivalRecipes.map(recipe => (
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                      <RecipeCard
                        recipe={recipe}
                        onSave={handleSaveRecipe}
                        isSaved={savedRecipes.includes(recipe.id)}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No recipes found</h3>
                  <p className="text-muted-foreground">
                    We're working on adding more recipes for {selectedFestivalView} celebrations
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Show all festivals
            <div>
              {/* Search Festivals */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Search festivals..."
                    value={festivalSearchQuery}
                    onChange={(e) => setFestivalSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {festivalSearchQuery && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Found {getFilteredFestivals().length} festivals matching "{festivalSearchQuery}"
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredFestivals().map(festival => {
                const festivalRecipes = getRecipesByFestival(festival.name);
                return (
                  <Card 
                    key={festival.name} 
                    className="hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => handleFestivalClick(festival.name)}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-serif flex items-center gap-2">
                        <span>{festival.icon}</span>
                        {festival.name}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        Traditional recipes for {festival.festival} celebrations
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Available Recipes:</span>
                          <Badge 
                            variant={festivalRecipes.length > 3 ? "default" : "secondary"} 
                            className="text-xs ml-2"
                          >
                            {festivalRecipes.length} recipes
                          </Badge>
                          {festivalRecipes.length > 5 && (
                            <Badge variant="destructive" className="text-xs ml-1">
                              Popular!
                            </Badge>
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-medium">Festival:</span>
                          <Badge variant="outline" className="text-xs ml-1">
                            {festival.festival}
                          </Badge>
                        </div>
                        {festivalRecipes.length > 0 && (
                          <div>
                            <span className="text-sm font-medium">Popular Dishes:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {festivalRecipes.slice(0, 2).map(recipe => (
                                <Badge key={recipe.id} variant="secondary" className="text-xs">
                                  {recipe.title}
                                </Badge>
                              ))}
                              {festivalRecipes.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{festivalRecipes.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Trending Recipes */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Trending This Week</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getTrendingRecipes().map((recipe) => (
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

        {/* Quick Categories */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Quick Categories</h2>
          </div>
          
          {selectedQuickCategory ? (
            // Show selected category's recipes
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  variant="outline" 
                  onClick={clearQuickCategorySelection}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Categories
                </Button>
                <div>
                  <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {selectedQuickCategory}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {quickCategoryRecipes.length} recipes in this category
                  </p>
                </div>
              </div>
              
              {quickCategoryRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quickCategoryRecipes.map(recipe => (
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                      <RecipeCard
                        recipe={recipe}
                        onSave={handleSaveRecipe}
                        isSaved={savedRecipes.includes(recipe.id)}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No recipes found</h3>
                  <p className="text-muted-foreground">
                    We're working on adding more recipes for {selectedQuickCategory}
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Show all categories
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
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedQuickCategory('Quick Meals')}>
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
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedQuickCategory('Healthy Desi')}>
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
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedQuickCategory('Street Food')}>
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
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedQuickCategory('Festive Specials')}>
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
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