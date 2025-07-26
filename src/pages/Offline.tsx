import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecipeCard } from '@/components/RecipeCard';
import { mockRecipes, Recipe } from '@/data/mockData';
import { Wifi, WifiOff, Download, HardDrive, RotateCcw } from 'lucide-react';

export default function Offline() {
  const [offlineRecipes, setOfflineRecipes] = useState<Recipe[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  useEffect(() => {
    // Get offline available recipes
    const offline = mockRecipes.filter(recipe => recipe.isOfflineAvailable);
    setOfflineRecipes(offline);

    // Load saved recipes
    const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
    setSavedRecipes(saved);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSaveRecipe = (recipeId: string) => {
    const newSaved = savedRecipes.includes(recipeId)
      ? savedRecipes.filter(id => id !== recipeId)
      : [...savedRecipes, recipeId];
    
    setSavedRecipes(newSaved);
    localStorage.setItem('saved-recipes', JSON.stringify(newSaved));
  };

  const syncData = () => {
    // Mock sync functionality
    console.log('Syncing offline data...');
  };

  const getTotalOfflineSize = () => {
    // Mock calculation of offline storage size
    return (offlineRecipes.length * 0.5).toFixed(1); // ~0.5MB per recipe
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold gradient-text mb-4">
          Offline Recipes
        </h1>
        <p className="text-muted-foreground">
          Recipes available without an internet connection
        </p>
      </div>

      {/* Connection Status */}
      <Card className="card-premium mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            {isOnline ? (
              <Wifi className="mr-2 h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="mr-2 h-5 w-5 text-red-500" />
            )}
            Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Badge className={isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                {isOnline 
                  ? 'All features available' 
                  : 'Only offline recipes are accessible'
                }
              </p>
            </div>
            {isOnline && (
              <Button variant="outline" onClick={syncData}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Sync Data
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Storage Info */}
      <Card className="card-premium mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HardDrive className="mr-2 h-5 w-5" />
            Offline Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{offlineRecipes.length}</div>
              <div className="text-sm text-muted-foreground">Recipes Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{getTotalOfflineSize()}</div>
              <div className="text-sm text-muted-foreground">MB Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-glow">∞</div>
              <div className="text-sm text-muted-foreground">Storage Available</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PWA Installation Info */}
      <Card className="card-premium mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="mr-2 h-5 w-5" />
            Install FlavorQuest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium mb-2">Install as an App</p>
              <p className="text-sm text-muted-foreground">
                Add FlavorQuest to your home screen for quick access and offline functionality
              </p>
            </div>
            <Button className="btn-premium">
              <Download className="mr-2 h-4 w-4" />
              Install App
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Offline Recipes */}
      {offlineRecipes.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold gradient-text">
                Available Offline
              </h2>
              <p className="text-muted-foreground">
                {offlineRecipes.length} recipes cached for offline use
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {offlineRecipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                <RecipeCard
                  recipe={recipe}
                  onSave={handleSaveRecipe}
                  isSaved={savedRecipes.includes(recipe.id)}
                />
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Card className="card-premium text-center py-16">
          <CardContent>
            <WifiOff className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">No offline recipes available</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Recipes need to be downloaded while online to be available offline
            </p>
            <Button asChild className="btn-premium" disabled={!isOnline}>
              <Link to="/search">
                <Download className="mr-2 h-4 w-4" />
                Browse Recipes to Download
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Offline Tips */}
      <Card className="card-premium mt-12">
        <CardHeader>
          <CardTitle>Offline Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">What works offline:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• View downloaded recipes</li>
                <li>• Access cooking instructions</li>
                <li>• Use cooking timers</li>
                <li>• Mark steps as complete</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Requires internet:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Search for new recipes</li>
                <li>• Download recipe images</li>
                <li>• Share recipes</li>
                <li>• Sync with other devices</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}