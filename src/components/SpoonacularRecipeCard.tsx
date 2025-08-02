import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Clock, ChefHat, CheckCircle, XCircle } from 'lucide-react';

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    name: string;
  }>;
  usedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    name: string;
  }>;
  unusedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    name: string;
  }>;
  likes: number;
}

interface SpoonacularRecipeCardProps {
  recipe: SpoonacularRecipe;
  onSave: (recipeId: string) => void;
  isSaved: boolean;
}

export function SpoonacularRecipeCard({ recipe, onSave, isSaved }: SpoonacularRecipeCardProps) {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave(recipe.id.toString());
  };

  return (
    <Card className="recipe-card-modern group overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <Button
          onClick={handleSave}
          size="sm"
          variant="ghost"
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg transition-all duration-300"
        >
          <Heart className={`h-4 w-4 transition-all duration-300 ${isSaved ? 'fill-red-500 text-red-500 scale-110' : 'hover:scale-110'}`} />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {recipe.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        {/* Ingredient Match Summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <CheckCircle className="mr-1 h-3 w-3" />
              {recipe.usedIngredientCount} used
            </Badge>
            <Badge variant="outline" className="text-xs">
              <XCircle className="mr-1 h-3 w-3" />
              {recipe.missedIngredientCount} missing
            </Badge>
          </div>
          {recipe.likes > 0 && (
            <Badge variant="outline" className="text-xs">
              <Heart className="mr-1 h-3 w-3" />
              {recipe.likes}
            </Badge>
          )}
        </div>

        {/* Used Ingredients */}
        {recipe.usedIngredients.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-green-700">✅ You have:</h4>
            <div className="flex flex-wrap gap-1">
              {recipe.usedIngredients.slice(0, 4).map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {ingredient.name}
                </Badge>
              ))}
              {recipe.usedIngredients.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{recipe.usedIngredients.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Missing Ingredients */}
        {recipe.missedIngredients.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-orange-700">🛒 You need:</h4>
            <div className="flex flex-wrap gap-1">
              {recipe.missedIngredients.slice(0, 3).map((ingredient, index) => (
                <Badge key={index} variant="outline" className="text-xs border-orange-200 text-orange-700">
                  {ingredient.name}
                  {ingredient.amount && ingredient.unit && (
                    <span className="ml-1">({ingredient.amount} {ingredient.unit})</span>
                  )}
                </Badge>
              ))}
              {recipe.missedIngredients.length > 3 && (
                <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                  +{recipe.missedIngredients.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Match Percentage */}
        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Match Score:</span>
            <div className="flex items-center gap-2">
              <div className="progress-modern w-20">
                <div 
                  className="progress-modern-fill"
                  style={{ 
                    width: `${Math.round((recipe.usedIngredientCount / (recipe.usedIngredientCount + recipe.missedIngredientCount)) * 100)}%` 
                  }}
                ></div>
              </div>
              <span className="text-xs font-bold text-primary">
                {Math.round((recipe.usedIngredientCount / (recipe.usedIngredientCount + recipe.missedIngredientCount)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 