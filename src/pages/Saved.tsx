import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RecipeCard } from '@/components/RecipeCard';
import { mockRecipes, Recipe } from '@/data/mockData';
import { Heart, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Saved() {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
    setSavedIds(saved);
    const recipes = mockRecipes.filter(recipe => saved.includes(recipe.id));
    setSavedRecipes(recipes);
  }, []);

  const handleRemoveRecipe = (recipeId: string) => {
    const newSaved = savedIds.filter(id => id !== recipeId);
    setSavedIds(newSaved);
    setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== recipeId));
    localStorage.setItem('saved-recipes', JSON.stringify(newSaved));
    
    const recipe = mockRecipes.find(r => r.id === recipeId);
    toast({
      title: "Recipe removed",
      description: `${recipe?.title} removed from favorites`,
    });
  };

  const clearAllSaved = () => {
    setSavedRecipes([]);
    setSavedIds([]);
    localStorage.setItem('saved-recipes', JSON.stringify([]));
    toast({
      title: "All recipes removed",
      description: "Your saved recipes list has been cleared",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold gradient-text mb-4">
          Saved Recipes
        </h1>
        <p className="text-muted-foreground">
          Your collection of favorite recipes
        </p>
      </div>

      {savedRecipes.length > 0 ? (
        <>
          {/* Actions */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Heart className="h-5 w-5 text-red-500" />
              <span>{savedRecipes.length} saved recipe{savedRecipes.length !== 1 ? 's' : ''}</span>
            </div>
            <Button variant="outline" onClick={clearAllSaved} className="text-destructive hover:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {savedRecipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                <RecipeCard
                  recipe={recipe}
                  onSave={handleRemoveRecipe}
                  isSaved={true}
                />
              </Link>
            ))}
          </div>
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
                <Link to="/quiz">
                  Take Taste Quiz
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}