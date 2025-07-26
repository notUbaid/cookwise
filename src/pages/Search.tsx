import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecipeCard } from '@/components/RecipeCard';
import { mockRecipes, Recipe } from '@/data/mockData';
import { Search as SearchIcon, Filter, Mic, X } from 'lucide-react';

interface Filters {
  mealType: string[];
  cuisine: string[];
  dietType: string[];
  spiceLevel: string[];
  cookingTime: string;
  effort: string[];
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(mockRecipes);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    mealType: [],
    cuisine: [],
    dietType: [],
    spiceLevel: [],
    cookingTime: '',
    effort: []
  });

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert'];
  const cuisines = ['Thai', 'Italian', 'Indian', 'Mexican', 'Japanese', 'French', 'Greek', 'Korean'];
  const dietTypes = ['Veg', 'Non-Veg', 'Vegan', 'Gluten-Free', 'Keto'];
  const spiceLevels = ['Mild', 'Medium', 'Hot'];
  const effortLevels = ['Easy', 'Medium', 'Hard'];
  const timeRanges = ['< 15 mins', '15-30 mins', '30+ mins'];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
    setSavedRecipes(saved);
  }, []);

  useEffect(() => {
    let filtered = mockRecipes;

    // Text search
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.mealType.length > 0) {
      filtered = filtered.filter(recipe => filters.mealType.includes(recipe.mealType));
    }

    if (filters.cuisine.length > 0) {
      filtered = filtered.filter(recipe => filters.cuisine.includes(recipe.cuisine));
    }

    if (filters.dietType.length > 0) {
      filtered = filtered.filter(recipe =>
        filters.dietType.some(diet => recipe.dietType.includes(diet))
      );
    }

    if (filters.spiceLevel.length > 0) {
      filtered = filtered.filter(recipe => filters.spiceLevel.includes(recipe.spiceLevel));
    }

    if (filters.effort.length > 0) {
      filtered = filtered.filter(recipe => filters.effort.includes(recipe.effort));
    }

    if (filters.cookingTime) {
      filtered = filtered.filter(recipe => {
        const time = recipe.cookingTime;
        switch (filters.cookingTime) {
          case '< 15 mins':
            return time < 15;
          case '15-30 mins':
            return time >= 15 && time <= 30;
          case '30+ mins':
            return time > 30;
          default:
            return true;
        }
      });
    }

    setFilteredRecipes(filtered);
  }, [searchQuery, filters]);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => {
      if (filterType === 'cookingTime') {
        return { ...prev, [filterType]: prev[filterType] === value ? '' : value };
      } else {
        const currentValues = prev[filterType] as string[];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [filterType]: newValues };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      mealType: [],
      cuisine: [],
      dietType: [],
      spiceLevel: [],
      cookingTime: '',
      effort: []
    });
    setSearchQuery('');
  };

  const handleSaveRecipe = (recipeId: string) => {
    const newSaved = savedRecipes.includes(recipeId)
      ? savedRecipes.filter(id => id !== recipeId)
      : [...savedRecipes, recipeId];
    
    setSavedRecipes(newSaved);
    localStorage.setItem('saved-recipes', JSON.stringify(newSaved));
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (event: any) => {
        setSearchQuery(event.results[0][0].transcript);
      };
      recognition.start();
    }
  };

  const activeFiltersCount = Object.values(filters).flat().filter(Boolean).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold gradient-text mb-4">Search Recipes</h1>
        <p className="text-muted-foreground">Find the perfect recipe for any occasion</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Search by recipe name, ingredients, or cuisine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-12 h-12 text-lg"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleVoiceSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Mic className="h-5 w-5" />
        </Button>
      </div>

      {/* Filter Toggle & Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant={showFilters ? 'default' : 'outline'}
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-accent text-accent-foreground">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
        <div className="text-muted-foreground">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="lg:col-span-1">
            <Card className="card-premium sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Meal Type */}
                <div>
                  <h3 className="font-medium mb-3">Meal Type</h3>
                  <div className="space-y-2">
                    {mealTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`meal-${type}`}
                          checked={filters.mealType.includes(type)}
                          onCheckedChange={() => handleFilterChange('mealType', type)}
                        />
                        <label htmlFor={`meal-${type}`} className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cuisine */}
                <div>
                  <h3 className="font-medium mb-3">Cuisine</h3>
                  <div className="space-y-2">
                    {cuisines.map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cuisine-${cuisine}`}
                          checked={filters.cuisine.includes(cuisine)}
                          onCheckedChange={() => handleFilterChange('cuisine', cuisine)}
                        />
                        <label htmlFor={`cuisine-${cuisine}`} className="text-sm">{cuisine}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diet Type */}
                <div>
                  <h3 className="font-medium mb-3">Diet Type</h3>
                  <div className="space-y-2">
                    {dietTypes.map((diet) => (
                      <div key={diet} className="flex items-center space-x-2">
                        <Checkbox
                          id={`diet-${diet}`}
                          checked={filters.dietType.includes(diet)}
                          onCheckedChange={() => handleFilterChange('dietType', diet)}
                        />
                        <label htmlFor={`diet-${diet}`} className="text-sm">{diet}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spice Level */}
                <div>
                  <h3 className="font-medium mb-3">Spice Level</h3>
                  <div className="space-y-2">
                    {spiceLevels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`spice-${level}`}
                          checked={filters.spiceLevel.includes(level)}
                          onCheckedChange={() => handleFilterChange('spiceLevel', level)}
                        />
                        <label htmlFor={`spice-${level}`} className="text-sm">{level}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cooking Time */}
                <div>
                  <h3 className="font-medium mb-3">Cooking Time</h3>
                  <Select value={filters.cookingTime} onValueChange={(value) => handleFilterChange('cookingTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeRanges.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Effort Level */}
                <div>
                  <h3 className="font-medium mb-3">Effort Level</h3>
                  <div className="space-y-2">
                    {effortLevels.map((effort) => (
                      <div key={effort} className="flex items-center space-x-2">
                        <Checkbox
                          id={`effort-${effort}`}
                          checked={filters.effort.includes(effort)}
                          onCheckedChange={() => handleFilterChange('effort', effort)}
                        />
                        <label htmlFor={`effort-${effort}`} className="text-sm">{effort}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Grid */}
        <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
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
          ) : (
            <Card className="card-premium text-center py-12">
              <CardContent>
                <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}