import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecipeCard } from '@/components/RecipeCard';
import { LocationSetup } from '@/components/LocationSetup';
import ShuffleRecipe from '@/components/ShuffleRecipe';
import { mockRecipes, Recipe, getQuizPreferences, getRecommendedRecipes } from '@/data/mockData';
import { Shuffle, ChefHat, Sparkles, TrendingUp, MapPin, Clock, Heart, Flame } from 'lucide-react';
import { isLocationSet, getUserLocation, getRecipesByLocation } from '@/utils/location';

export default function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [recipeOfTheDay, setRecipeOfTheDay] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [showLocationSetup, setShowLocationSetup] = useState(false);
  const [userLocation, setUserLocation] = useState<{ city: string; state: string } | null>(null);
  const [locationBasedRecipes, setLocationBasedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Load saved recipes from localStorage
    const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
    setSavedRecipes(saved);
    
    // Check if location is set
    const location = getUserLocation();
    if (location) {
      setUserLocation(location);
      const recipes = getRecipesByLocation(location.city, location.state);
      setLocationBasedRecipes(recipes);
    } else {
      // Show location setup popup if no location is set
      setShowLocationSetup(true);
    }

    // Use quiz preferences to filter recipes if available
    const quizPrefs = getQuizPreferences();
    let filteredRecipes = mockRecipes;
    if (quizPrefs) {
      filteredRecipes = getRecommendedRecipes(quizPrefs);
    }

    // Set featured recipes (first 6)
    setFeaturedRecipes(filteredRecipes.slice(0, 6));

    // Set recipe of the day (random)
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    setRecipeOfTheDay(filteredRecipes[randomIndex]);
  }, []);

  const shuffleRecipes = () => {
    const shuffled = [...mockRecipes].sort(() => Math.random() - 0.5);
    setFeaturedRecipes(shuffled.slice(0, 6));
  };

  const handleSaveRecipe = (recipeId: string) => {
    const newSaved = savedRecipes.includes(recipeId)
      ? savedRecipes.filter(id => id !== recipeId)
      : [...savedRecipes, recipeId];
    
    setSavedRecipes(newSaved);
    localStorage.setItem('saved-recipes', JSON.stringify(newSaved));
  };

  const handleLocationSet = (city: string, state: string) => {
    setUserLocation({ city, state });
    const recipes = getRecipesByLocation(city, state);
    setLocationBasedRecipes(recipes);
    setShowLocationSetup(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
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
            Discover Authentic
            <span className="block gradient-text">Indian Recipes</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95 leading-relaxed">
            From Kashmir to Kerala, explore traditional recipes from every Indian state
          </p>
          {userLocation && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Discovering recipes near {userLocation.city}, {userLocation.state}
                </span>
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="btn-accent btn-shimmer">
              <Link to="/explore">
                <TrendingUp className="mr-2 h-5 w-5" />
                Explore Recipes
              </Link>
            </Button>
            <Button asChild size="lg" className="btn-premium btn-shimmer">
              <Link to="/reverse-cooking">
                <Sparkles className="mr-2 h-5 w-5" />
                Reverse Cooking
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Recipe of the Day */}
        {recipeOfTheDay && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                <Sparkles className="mr-1 h-4 w-4" />
                Recipe of the Day
              </Badge>
              <h2 className="text-3xl font-serif font-bold gradient-text">Today's Special</h2>
            </div>
            <Card className="card-hero max-w-4xl mx-auto overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={recipeOfTheDay.image}
                    alt={recipeOfTheDay.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-accent-glow text-accent-foreground">
                    {recipeOfTheDay.cuisine}
                  </Badge>
                  <h3 className="text-2xl font-serif font-bold mb-4">
                    {recipeOfTheDay.title}
                  </h3>
                  <p className="mb-6 opacity-90">
                    {recipeOfTheDay.culturalFact}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm">⏱️ {recipeOfTheDay.cookingTime} min</span>
                    <span className="text-sm">🌶️ {recipeOfTheDay.spiceLevel}</span>
                    <span className="text-sm">👨‍🍳 {recipeOfTheDay.effort}</span>
                  </div>
                  <Button asChild className="btn-accent">
                    <Link to={`/recipe/${recipeOfTheDay.id}`}>
                      View Recipe
                      <ChefHat className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </section>
        )}

        {/* Shuffle Recipe Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="mr-1 h-4 w-4" />
              Feeling Lucky?
            </Badge>
            <h2 className="text-3xl font-serif font-bold gradient-text">
              Random Recipe Discovery
            </h2>
            <p className="text-muted-foreground mt-2">
              Let us surprise you with a random recipe from around the world
            </p>
          </div>
          
          <ShuffleRecipe />
        </section>

        {/* Featured Recipes */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
                Featured Recipes
              </h2>
              <p className="text-muted-foreground">
                Handpicked favorites from our culinary experts
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={shuffleRecipes}
              className="hover:scale-105 transition-transform"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Shuffle
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {featuredRecipes.map((recipe) => (
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

        {/* Location-Based Recipes */}
        {locationBasedRecipes.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                Taste of {userLocation?.state}
              </Badge>
              <h2 className="text-3xl font-serif font-bold gradient-text">
                Local Favorites
              </h2>
              <p className="text-muted-foreground mt-2">
                Traditional recipes from your region
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {locationBasedRecipes.slice(0, 3).map((recipe) => (
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

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <Card className="card-premium max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-serif gradient-text">
                Ready to Start Cooking?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Discover recipes that match your taste preferences and dietary needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-premium">
                  <Link to="/quiz">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Take Taste Quiz
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/search">
                    Explore All Recipes
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Location Setup Popup */}
      <LocationSetup
        isOpen={showLocationSetup}
        onClose={() => setShowLocationSetup(false)}
        onLocationSet={handleLocationSet}
      />
    </div>
  );
}