import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
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
  BookOpen,
  Volume2,
  VolumeX,
  Settings,
  Clock,
  AlertTriangle,
  Lightbulb,
  Utensils,
  Thermometer,
  Zap,
  Target,
  Eye,
  EyeOff,
  ArrowLeft
} from 'lucide-react';

interface CookingStep {
  id: number;
  instruction: string;
  estimatedTime: number;
  tips: string[];
  ingredients: string[];
  equipment: string[];
  temperature?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isTimerStep: boolean;
}

export default function GuidedCooking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [cookingSteps, setCookingSteps] = useState<CookingStep[]>([]);
  
  // Enhanced features
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [showIngredients, setShowIngredients] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [totalCookingTime, setTotalCookingTime] = useState(0);
  
  const speechRef = useRef<SpeechSynthesis | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse recipe steps into enhanced cooking steps
  const parseCookingSteps = (recipe: Recipe): CookingStep[] => {
    return recipe.steps.map((step, index) => {
      const stepText = step.toLowerCase();
      
      // Estimate time based on step content
      let estimatedTime = 5;
      if (stepText.includes('marinate') || stepText.includes('rest') || stepText.includes('soak')) {
        estimatedTime = 30;
      } else if (stepText.includes('cook') || stepText.includes('simmer') || stepText.includes('boil')) {
        estimatedTime = 15;
      } else if (stepText.includes('fry') || stepText.includes('sauté') || stepText.includes('stir-fry')) {
        estimatedTime = 10;
      } else if (stepText.includes('bake') || stepText.includes('roast')) {
        estimatedTime = 25;
      } else if (stepText.includes('grill') || stepText.includes('broil')) {
        estimatedTime = 12;
      }

      // Extract ingredients mentioned in step
      const ingredients = recipe.ingredients.filter(ingredient => 
        stepText.includes(ingredient.toLowerCase().split(' ')[0])
      );

      // Determine equipment needed
      const equipment: string[] = [];
      if (stepText.includes('pan') || stepText.includes('pot')) equipment.push('Cooking Pan');
      if (stepText.includes('knife') || stepText.includes('chop') || stepText.includes('cut')) equipment.push('Knife');
      if (stepText.includes('bowl') || stepText.includes('mix')) equipment.push('Mixing Bowl');
      if (stepText.includes('oven') || stepText.includes('bake')) equipment.push('Oven');
      if (stepText.includes('blender') || stepText.includes('grind')) equipment.push('Blender');

      // Determine difficulty
      let difficulty: 'easy' | 'medium' | 'hard' = 'easy';
      if (stepText.includes('precise') || stepText.includes('carefully') || stepText.includes('temperature')) {
        difficulty = 'hard';
      } else if (stepText.includes('medium') || stepText.includes('moderate')) {
        difficulty = 'medium';
      }

      // Check if step needs timer
      const isTimerStep = stepText.includes('minutes') || stepText.includes('min') || 
                         stepText.includes('cook') || stepText.includes('simmer') ||
                         stepText.includes('marinate') || stepText.includes('rest');

      // Generate tips based on step content
      const tips: string[] = [];
      if (stepText.includes('onion')) tips.push('Cut onions under running water to reduce tears');
      if (stepText.includes('garlic')) tips.push('Use the flat side of a knife to easily peel garlic');
      if (stepText.includes('tomato')) tips.push('Score tomatoes with an X before blanching for easy peeling');
      if (stepText.includes('rice')) tips.push('Rinse rice until water runs clear for better texture');
      if (stepText.includes('oil')) tips.push('Heat oil until it shimmers before adding ingredients');

      return {
        id: index,
        instruction: step,
        estimatedTime,
        tips,
        ingredients,
        equipment,
        difficulty,
        isTimerStep
      };
    });
  };

  useEffect(() => {
    if (id) {
      const foundRecipe = mockRecipes.find(r => r.id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
        setCookingSteps(parseCookingSteps(foundRecipe));
        setSessionStartTime(new Date());
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechRef.current = window.speechSynthesis;
    }

    // Track total cooking time
    if (sessionStartTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - sessionStartTime.getTime()) / 1000);
        setTotalCookingTime(diff);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sessionStartTime]);

  useEffect(() => {
    // Enhanced timer with better control
    if (timerRunning && timer && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev && prev > 0) {
            const newTime = prev - 1;
            if (newTime === 0) {
              // Timer finished
              if (voiceEnabled && speechRef.current) {
                const utterance = new SpeechSynthesisUtterance("Timer finished! Time to move to the next step.");
                speechRef.current.speak(utterance);
              }
              if (autoAdvance && currentStep < cookingSteps.length - 1) {
                setTimeout(() => {
                  setCurrentStep(currentStep + 1);
                }, 2000);
              }
            }
            return newTime;
          }
          return null;
        });
      }, 1000 / playbackSpeed);
    } else if (timer === 0) {
      setTimerRunning(false);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerRunning, timer, playbackSpeed, voiceEnabled, autoAdvance, currentStep, cookingSteps.length]);

  // Voice guidance
  const speakStep = (step: CookingStep) => {
    if (voiceEnabled && speechRef.current) {
      speechRef.current.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(
        `Step ${step.id + 1}. ${step.instruction}`
      );
      utterance.rate = 0.9;
      speechRef.current.speak(utterance);
    }
  };

  useEffect(() => {
    if (cookingSteps.length > 0) {
      speakStep(cookingSteps[currentStep]);
    }
  }, [currentStep, cookingSteps, voiceEnabled]);

  if (!recipe || cookingSteps.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  const totalSteps = cookingSteps.length;
  const progress = (completedSteps.length / totalSteps) * 100;
  const currentStepData = cookingSteps[currentStep];

  const handleStepComplete = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(step => step !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
      // Auto advance if enabled
      if (autoAdvance && stepIndex === currentStep && stepIndex < totalSteps - 1) {
        setTimeout(() => {
          setCurrentStep(stepIndex + 1);
        }, 1500);
      }
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

  const formatTotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header Section */}
      <div className="bg-background shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/recipe/${recipe.id}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-serif font-bold text-foreground">Guided Cooking</h1>
              <p className="text-sm text-muted-foreground">Follow step-by-step instructions</p>
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
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {currentStepData.estimatedTime} min
                    </Badge>
                    <Badge className={getDifficultyColor(currentStepData.difficulty)}>
                      {currentStepData.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Main Instruction */}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-lg leading-relaxed font-medium">
                      {currentStepData.instruction}
                    </p>
                  </div>
                  
                  {/* Equipment Needed */}
                  {currentStepData.equipment.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        Equipment Needed
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentStepData.equipment.map((item, index) => (
                          <Badge key={index} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ingredients for this step */}
                  {showIngredients && currentStepData.ingredients.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Ingredients for this step
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentStepData.ingredients.map((ingredient, index) => (
                          <Badge key={index} variant="outline">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  {showTips && currentStepData.tips.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Pro Tips
                      </h4>
                      <div className="space-y-2">
                        {currentStepData.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-yellow-50 rounded-md">
                            <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-yellow-800">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Timer for this step */}
                  {currentStepData.isTimerStep && (
                    <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Timer className="h-4 w-4" />
                        Timer for this step
                      </h4>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartTimer(currentStepData.estimatedTime)}
                          disabled={timer !== null}
                        >
                          <Timer className="mr-2 h-4 w-4" />
                          Start Timer ({currentStepData.estimatedTime} min)
                        </Button>
                        
                        {timer !== null && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-mono bg-background px-3 py-1 rounded border border-border">
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
                    </div>
                  )}

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
                  <p className="text-sm text-green-600 mb-4">
                    Total cooking time: {formatTotalTime(totalCookingTime)}
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
            {/* Settings Panel */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Cooking Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice" className="text-sm flex items-center gap-2">
                    {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    Voice Guidance
                  </Label>
                  <Switch
                    id="voice"
                    checked={voiceEnabled}
                    onCheckedChange={setVoiceEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-advance" className="text-sm">
                    Auto Advance Steps
                  </Label>
                  <Switch
                    id="auto-advance"
                    checked={autoAdvance}
                    onCheckedChange={setAutoAdvance}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="tips" className="text-sm flex items-center gap-2">
                    {showTips ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    Show Tips
                  </Label>
                  <Switch
                    id="tips"
                    checked={showTips}
                    onCheckedChange={setShowTips}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="ingredients" className="text-sm flex items-center gap-2">
                    {showIngredients ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    Show Ingredients
                  </Label>
                  <Switch
                    id="ingredients"
                    checked={showIngredients}
                    onCheckedChange={setShowIngredients}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Playback Speed</Label>
                  <Slider
                    value={[playbackSpeed]}
                    onValueChange={(value) => setPlaybackSpeed(value[0])}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground text-center">
                    {playbackSpeed}x
                  </div>
                </div>
              </CardContent>
            </Card>

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
                <CardTitle className="text-lg">All Ingredients</CardTitle>
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
                  {cookingSteps.map((step, index) => (
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
                        <Badge variant="outline" className="text-xs">
                          {step.estimatedTime}m
                        </Badge>
                      </div>
                      <p className="text-xs mt-1 line-clamp-2">
                        {step.instruction.substring(0, 60)}...
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