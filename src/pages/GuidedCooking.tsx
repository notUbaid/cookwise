import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  mockRecipes, 
  Recipe 
} from '@/data/mockData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw,
  Timer,
  ChefHat,
  CheckCircle,
  Circle,
  X,
  Home,
  BookOpen
} from 'lucide-react';

export default function GuidedCooking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (id) {
      const foundRecipe = mockRecipes.find(r => r.id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timer && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev ? prev - 1 : null);
      }, 1000);
    } else if (timer === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timer]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  const totalSteps = recipe.steps.length;
  const progress = (completedSteps.length / totalSteps) * 100;

  const handleStepComplete = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(step => step !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setTimerRunning(true);
    setIsPaused(false);
  };

  const handlePauseTimer = () => {
    setTimerRunning(!timerRunning);
    setIsPaused(!isPaused);
  };

  const handleResetTimer = () => {
    setTimer(null);
    setTimerRunning(false);
    setIsPaused(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEstimatedTimeForStep = (stepIndex: number) => {
    // Mock estimated times based on step complexity
    const stepText = recipe.steps[stepIndex].toLowerCase();
    if (stepText.includes('marinate') || stepText.includes('rest')) return 30;
    if (stepText.includes('cook') || stepText.includes('simmer')) return 15;
    if (stepText.includes('fry') || stepText.includes('sauté')) return 10;
    if (stepText.includes('boil') || stepText.includes('steam')) return 20;
    return 5;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/recipe/${recipe.id}`}>
                  <X className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-serif font-bold">{recipe.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {totalSteps}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <Home className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/saved">
                  <BookOpen className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Cooking Area */}
          <div className="lg:col-span-2">
            {/* Progress Bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Cooking Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {completedSteps.length}/{totalSteps} steps completed
                  </span>
                </div>
                <Progress value={progress} className="mb-4" />
                <div className="flex items-center justify-between text-sm">
                  <span>Started</span>
                  <span>Complete</span>
                </div>
              </CardContent>
            </Card>

            {/* Current Step */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5" />
                    Step {currentStep + 1}
                  </CardTitle>
                  <Badge variant="outline">
                    {getEstimatedTimeForStep(currentStep)} min
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    {recipe.steps[currentStep]}
                  </p>
                  
                  {/* Timer for this step */}
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStartTimer(getEstimatedTimeForStep(currentStep))}
                      disabled={timer !== null}
                    >
                      <Timer className="mr-2 h-4 w-4" />
                      Start Timer ({getEstimatedTimeForStep(currentStep)} min)
                    </Button>
                    
                    {timer !== null && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-mono">
                          {formatTime(timer)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handlePauseTimer}
                        >
                          {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleResetTimer}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Step completion */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={completedSteps.includes(currentStep) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStepComplete(currentStep)}
                    >
                      {completedSteps.includes(currentStep) ? (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <Circle className="mr-2 h-4 w-4" />
                      )}
                      {completedSteps.includes(currentStep) ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
              
              <Button
                onClick={handleNextStep}
                disabled={currentStep === totalSteps - 1}
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Recipe Complete */}
            {completedSteps.length === totalSteps && (
              <Card className="mt-6 border-green-200 bg-green-50">
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Congratulations! 🎉
                  </h3>
                  <p className="text-green-700 mb-4">
                    You've successfully completed cooking {recipe.title}!
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" asChild>
                      <Link to={`/recipe/${recipe.id}`}>
                        View Recipe
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link to="/explore">
                        Find More Recipes
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Recipe Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Recipe Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cuisine:</span>
                  <Badge variant="secondary">{recipe.cuisine}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Region:</span>
                  <Badge variant="outline">{recipe.region}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Spice Level:</span>
                  <Badge variant="outline">{recipe.spiceLevel}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Time:</span>
                  <span className="text-sm font-medium">{recipe.cookingTime} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Servings:</span>
                  <span className="text-sm font-medium">{recipe.servings}</span>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Step Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Step Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recipe.steps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-full text-left p-2 rounded-md transition-colors ${
                        index === currentStep
                          ? 'bg-primary text-primary-foreground'
                          : completedSteps.includes(index)
                          ? 'bg-green-100 text-green-800'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {completedSteps.includes(index) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">Step {index + 1}</span>
                      </div>
                      <p className="text-xs mt-1 line-clamp-2">
                        {step.substring(0, 60)}...
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 