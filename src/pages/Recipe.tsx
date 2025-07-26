import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockRecipes, Recipe } from '@/data/mockData';
import { 
  Clock, ChefHat, Flame, Heart, Share2, Download, 
  ArrowLeft, ArrowRight, Check, Info, Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundRecipe = mockRecipes.find(r => r.id === id);
      setRecipe(foundRecipe || null);
      
      const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
      setIsSaved(saved.includes(id));
    }
  }, [id]);

  const handleSave = () => {
    if (!recipe) return;
    
    const saved = JSON.parse(localStorage.getItem('saved-recipes') || '[]');
    const newSaved = isSaved
      ? saved.filter((recipeId: string) => recipeId !== recipe.id)
      : [...saved, recipe.id];
    
    localStorage.setItem('saved-recipes', JSON.stringify(newSaved));
    setIsSaved(!isSaved);
    
    toast({
      title: isSaved ? "Recipe removed" : "Recipe saved!",
      description: isSaved 
        ? `${recipe.title} removed from favorites` 
        : `${recipe.title} saved to favorites`,
    });
  };

  const handleStepComplete = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(i => i !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const handleShare = async () => {
    if (navigator.share && recipe) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this amazing ${recipe.cuisine} recipe!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Recipe link copied to clipboard",
      });
    }
  };

  const handleExport = () => {
    if (!recipe) return;
    
    const recipeText = `
${recipe.title}
${recipe.cuisine} Cuisine

Cooking Time: ${recipe.cookingTime} minutes
Difficulty: ${recipe.effort}
Spice Level: ${recipe.spiceLevel}
Serves: 4 people
Calories: ${recipe.calories} per serving

INGREDIENTS:
${recipe.ingredients.map(ingredient => `• ${ingredient}`).join('\n')}

INSTRUCTIONS:
${recipe.steps.map((step, index) => `${index + 1}. ${step}`).join('\n\n')}

CULTURAL FACT:
${recipe.culturalFact}

NUTRITIONAL INFO:
Protein: ${recipe.macros.protein}g
Carbs: ${recipe.macros.carbs}g
Fat: ${recipe.macros.fat}g
    `;

    const blob = new Blob([recipeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Recipe exported!",
      description: "Recipe downloaded as text file",
    });
  };

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const progress = (completedSteps.length / recipe.steps.length) * 100;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <Button asChild variant="ghost" className="mb-4 text-white hover:bg-white/20">
              <Link to="/search">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Link>
            </Button>
            <Badge className="mb-4 bg-accent text-accent-foreground">
              {recipe.cuisine}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {recipe.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {recipe.cookingTime} min
              </span>
              <span className="flex items-center">
                <ChefHat className="mr-1 h-4 w-4" />
                {recipe.effort}
              </span>
              <span className="flex items-center">
                <Flame className="mr-1 h-4 w-4" />
                {recipe.spiceLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleSave} className={isSaved ? 'btn-accent' : 'btn-premium'}>
                <Heart className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save Recipe'}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>

            {/* Cultural Fact */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-primary" />
                  Cultural Fact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{recipe.culturalFact}</p>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-medium">{ingredient}</span>
                        {recipe.substitutions[ingredient] && (
                          <div className="text-sm text-muted-foreground mt-1 flex items-start">
                            <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                            <span>Substitute: {recipe.substitutions[ingredient]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cooking Steps */}
            <Card className="card-premium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Cooking Instructions</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {completedSteps.length} of {recipe.steps.length} completed
                  </div>
                </div>
                <Progress value={progress} className="mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        completedSteps.includes(index)
                          ? 'bg-primary/10 border-primary/30'
                          : 'border-border/50 hover:bg-muted/30'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStepComplete(index)}
                          className={`flex-shrink-0 ${
                            completedSteps.includes(index)
                              ? 'text-primary bg-primary/10'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {completedSteps.includes(index) ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </Button>
                        <div className="flex-1">
                          <p className={`${
                            completedSteps.includes(index) 
                              ? 'line-through text-muted-foreground' 
                              : ''
                          }`}>
                            {step}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Step Navigation */}
                <div className="flex justify-between mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Step
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(Math.min(recipe.steps.length - 1, currentStep + 1))}
                    disabled={currentStep === recipe.steps.length - 1}
                    className="btn-premium"
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Recipe Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prep Time</span>
                  <span className="font-medium">{Math.round(recipe.cookingTime * 0.3)} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cook Time</span>
                  <span className="font-medium">{Math.round(recipe.cookingTime * 0.7)} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Time</span>
                  <span className="font-medium">{recipe.cookingTime} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serves</span>
                  <span className="font-medium">4 people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <Badge variant="outline">{recipe.effort}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Nutrition */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Nutrition (per serving)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary">{recipe.calories}</div>
                  <div className="text-sm text-muted-foreground">calories</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protein</span>
                    <span className="font-medium">{recipe.macros.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carbs</span>
                    <span className="font-medium">{recipe.macros.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fat</span>
                    <span className="font-medium">{recipe.macros.fat}g</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Diet Tags */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Dietary Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recipe.dietType.map((diet) => (
                    <Badge key={diet} variant="secondary">
                      {diet}
                    </Badge>
                  ))}
                  <Badge variant="outline">{recipe.mealType}</Badge>
                  {recipe.isOfflineAvailable && (
                    <Badge className="bg-primary text-primary-foreground">
                      Offline Available
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cooking Reminders */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Cooking Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Preheat oven 10 minutes before cooking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Keep ingredients at room temperature</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Taste and adjust seasoning as needed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}