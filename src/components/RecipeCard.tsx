import { Clock, ChefHat, Flame, Heart } from 'lucide-react';
import { Recipe } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface RecipeCardProps {
  recipe: Recipe;
  onSave?: (recipeId: string) => void;
  isSaved?: boolean;
}

export function RecipeCard({ recipe, onSave, isSaved = false }: RecipeCardProps) {
  const { toast } = useToast();

  const handleSave = () => {
    if (onSave) {
      onSave(recipe.id);
      toast({
        title: isSaved ? "Recipe removed" : "Recipe saved!",
        description: isSaved 
          ? `${recipe.title} removed from favorites` 
          : `${recipe.title} saved to favorites`,
      });
    }
  };

  const getSpiceColor = (level: string) => {
    switch (level) {
      case 'Mild': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hot': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyColor = (effort: string) => {
    switch (effort) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="recipe-card-modern group overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-image w-full h-48 object-cover transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 rounded-xl shadow-lg"
          >
            <Heart 
              className={`h-4 w-4 transition-all duration-300 ${
                isSaved ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600 hover:text-red-500 hover:scale-110'
              }`} 
            />
          </Button>
        </div>
        {recipe.isOfflineAvailable && (
          <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 shadow-lg">
            Offline
          </Badge>
        )}
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {recipe.title}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="badge-modern badge-cuisine">
            {recipe.cuisine} • {recipe.state}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookingTime} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <ChefHat className="h-4 w-4" />
            <span className={getDifficultyColor(recipe.effort)}>{recipe.effort}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Flame className={`h-4 w-4 ${getSpiceColor(recipe.spiceLevel)}`} />
            <span className={getSpiceColor(recipe.spiceLevel)}>{recipe.spiceLevel}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.dietType.map((diet) => (
            <Badge key={diet} variant="outline" className="text-xs">
              {diet}
            </Badge>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {recipe.calories} cal • {recipe.mealType}
        </div>
      </CardContent>
    </Card>
  );
}