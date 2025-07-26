import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { RecipeCard } from '@/components/RecipeCard';
import { mockRecipes, Recipe } from '@/data/mockData';
import { 
  Heart, 
  Trash2, 
  Search, 
  Clock, 
  History, 
  Star,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  Eye,
  Bookmark,
  MoreHorizontal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  getFavorites, 
  getFavoriteEntries, 
  getHistory, 
  addToFavorites, 
  removeFromFavorites, 
  removeFromHistory, 
  clearAllFavorites, 
  clearAllHistory,
  formatDate,
  type HistoryEntry,
  type FavoriteEntry
} from '@/utils/storage';

export default function Saved() {
  const [activeTab, setActiveTab] = useState('favorites');
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  const [favoriteEntries, setFavoriteEntries] = useState<FavoriteEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'cuisine'>('recent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  // Load data from localStorage
  useEffect(() => {
    loadFavorites();
    loadHistory();
  }, []);

  const loadFavorites = () => {
    const saved = getFavorites();
    const favorites = getFavoriteEntries();
    setSavedIds(saved);
    setFavoriteEntries(favorites);
    const recipes = mockRecipes.filter(recipe => saved.includes(recipe.id));
    setSavedRecipes(recipes);
  };

  const loadHistory = () => {
    const history = getHistory();
    setHistoryEntries(history);
  };

  // Save recipe to favorites
  const saveRecipe = (recipe: Recipe) => {
    addToFavorites(recipe);
    loadFavorites(); // Reload data
    toast({
      title: "Recipe saved",
      description: `${recipe.title} added to favorites`,
    });
  };

  // Remove recipe from favorites
  const handleRemoveRecipe = (recipeId: string) => {
    removeFromFavorites(recipeId);
    loadFavorites(); // Reload data
    
    const recipe = mockRecipes.find(r => r.id === recipeId);
    toast({
      title: "Recipe removed",
      description: `${recipe?.title} removed from favorites`,
    });
  };

  // Add recipe to history (this function is now handled by the storage utility)
  const addToHistory = (recipe: Recipe) => {
    // This is now handled automatically when viewing recipes
    // Keeping for compatibility but not used in this component
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    clearAllFavorites();
    loadFavorites(); // Reload data
    toast({
      title: "All favorites removed",
      description: "Your favorites list has been cleared",
    });
  };

  // Clear all history
  const clearAllHistory = () => {
    clearAllHistory();
    loadHistory(); // Reload data
    toast({
      title: "History cleared",
      description: "Your recipe history has been cleared",
    });
  };

  // Remove single history entry
  const removeHistoryEntry = (recipeId: string) => {
    removeFromHistory(recipeId);
    loadHistory(); // Reload data
    
    const entry = historyEntries.find(e => e.id === recipeId);
    toast({
      title: "Entry removed",
      description: `${entry?.title} removed from history`,
    });
  };

  // Sort and filter functions
  const sortFavorites = (favorites: FavoriteEntry[]) => {
    return [...favorites].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return sortOrder === 'desc' ? b.addedAt - a.addedAt : a.addedAt - b.addedAt;
        case 'name':
          return sortOrder === 'desc' 
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title);
        case 'cuisine':
          return sortOrder === 'desc'
            ? b.cuisine.localeCompare(a.cuisine)
            : a.cuisine.localeCompare(b.cuisine);
        default:
          return 0;
      }
    });
  };

  const sortHistory = (history: HistoryEntry[]) => {
    return [...history].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return sortOrder === 'desc' ? b.lastViewed - a.lastViewed : a.lastViewed - b.lastViewed;
        case 'name':
          return sortOrder === 'desc'
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  const filterFavorites = (favorites: FavoriteEntry[]) => {
    if (!searchTerm) return favorites;
    return favorites.filter(fav => 
      fav.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fav.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fav.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterHistory = (history: HistoryEntry[]) => {
    if (!searchTerm) return history;
    return history.filter(entry => 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get recipe data for display
  const getRecipeById = (id: string) => mockRecipes.find(recipe => recipe.id === id);

  // formatDate is now imported from storage utility

  const sortedAndFilteredFavorites = filterFavorites(sortFavorites(favoriteEntries));
  const sortedAndFilteredHistory = filterHistory(sortHistory(historyEntries));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold gradient-text mb-4">
          My Recipes
        </h1>
        <p className="text-muted-foreground">
          Your saved favorites and viewing history
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Favorites ({savedRecipes.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History ({historyEntries.length})
          </TabsTrigger>
        </TabsList>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          {savedRecipes.length > 0 ? (
            <>
              {/* Search and Sort Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter & Sort
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search favorites..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'recent' | 'name' | 'cuisine')}
                        className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="recent">Recently Added</option>
                        <option value="name">Name</option>
                        <option value="cuisine">Cuisine</option>
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      >
                        {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>{sortedAndFilteredFavorites.length} favorite{sortedAndFilteredFavorites.length !== 1 ? 's' : ''}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={clearAllFavorites} 
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>

              {/* Favorites Grid */}
              {sortedAndFilteredFavorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedAndFilteredFavorites.map((favorite) => {
                    const recipe = getRecipeById(favorite.id);
                    if (!recipe) return null;
                    
                    return (
                      <Card key={favorite.id} className="group hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <Link to={`/recipe/${recipe.id}`}>
                            <RecipeCard
                              recipe={recipe}
                              onSave={handleRemoveRecipe}
                              isSaved={true}
                            />
                          </Link>
                          <div className="p-4 pt-0">
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>Added {formatDate(favorite.addedAt)}</span>
                              <div className="flex gap-1">
                                <Badge variant="secondary" className="text-xs">
                                  {favorite.cuisine}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {favorite.spiceLevel}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No favorites found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms</p>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="card-premium text-center py-16">
              <CardContent>
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">No saved recipes yet</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Start exploring recipes and save your favorites by clicking the heart icon
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="btn-premium">
                    <Link to="/search">
                      <Search className="mr-2 h-4 w-4" />
                      Discover Recipes
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/explore">
                      Explore Categories
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          {historyEntries.length > 0 ? (
            <>
              {/* Search and Sort Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter & Sort
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search history..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'recent' | 'name')}
                        className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="recent">Recently Viewed</option>
                        <option value="name">Name</option>
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      >
                        {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <History className="h-5 w-5 text-blue-500" />
                  <span>{sortedAndFilteredHistory.length} recent view{sortedAndFilteredHistory.length !== 1 ? 's' : ''}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={clearAllHistory} 
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear History
                </Button>
              </div>

              {/* History List */}
              {sortedAndFilteredHistory.length > 0 ? (
                <div className="space-y-3">
                  {sortedAndFilteredHistory.map((entry) => {
                    const recipe = getRecipeById(entry.id);
                    if (!recipe) return null;
                    
                    const isSaved = savedIds.includes(entry.id);
                    
                    return (
                      <Card key={entry.id} className="group hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={recipe.image || '/placeholder.svg'}
                                  alt={recipe.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder.svg';
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <Link to={`/recipe/${recipe.id}`}>
                                  <h3 className="font-semibold hover:text-primary transition-colors truncate">
                                    {entry.title}
                                  </h3>
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {recipe.cuisine}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {recipe.spiceLevel}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    Viewed {entry.viewCount} time{entry.viewCount !== 1 ? 's' : ''}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Last viewed {formatDate(entry.lastViewed)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => isSaved ? handleRemoveRecipe(entry.id) : saveRecipe(recipe)}
                                className={isSaved ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-primary'}
                              >
                                {isSaved ? <Heart className="h-4 w-4 fill-current" /> : <Heart className="h-4 w-4" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeHistoryEntry(entry.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No history found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms</p>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="card-premium text-center py-16">
              <CardContent>
                <History className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">No viewing history yet</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Start exploring recipes and your viewing history will appear here
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="btn-premium">
                    <Link to="/search">
                      <Search className="mr-2 h-4 w-4" />
                      Discover Recipes
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/explore">
                      Explore Categories
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}