import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RecipeCard } from '@/components/RecipeCard';
import { quizQuestions, mockRecipes, getRecommendedRecipes } from '@/data/mockData';
import { Sparkles, RotateCcw, ChefHat } from 'lucide-react';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Store quiz answers in localStorage
      localStorage.setItem('cookwise-quiz-answers', JSON.stringify(newAnswers));
      // Calculate preferences object
      const preferences = {
        spiceLevel: newAnswers[0],
        cuisine: newAnswers[1],
        experience: newAnswers[2],
        time: newAnswers[3],
        dietType: newAnswers[4],
      };
      localStorage.setItem('cookwise-quiz-preferences', JSON.stringify(preferences));
      // Get recommended recipes
      const recommended = getRecommendedRecipes(preferences);
      setQuizResult({
        title: 'Your Personalized Taste Profile',
        description: 'Recipes matched to your quiz answers.',
        recommendedRecipes: recommended.map(r => r.id),
      });
      setShowResults(true);
    }
  };

  const calculateResult = (answers: { [key: number]: string }) => {
    // Simple algorithm to determine result based on answers
    const spiceLevel = answers[0]; // mild, medium, hot
    const cookingTime = answers[1]; // quick, moderate, long
    const cuisine = answers[2]; // asian, european, latin
    const diet = answers[3]; // everything, vegetarian, vegan

    if (spiceLevel === 'hot' && (cuisine === 'asian' || cuisine === 'latin')) {
      return 'spicy-asian-lover';
    } else if (cuisine === 'european' && cookingTime !== 'quick') {
      return 'comfort-european';
    } else {
      return 'quick-and-fresh';
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizResult(null);
  };

  const getRecommendedRecipes = () => {
    if (!quizResult) return [];
    return quizResult.recommendedRecipes.map((id: string) =>
      mockRecipes.find(recipe => recipe.id === id)
    ).filter(Boolean);
  };

  if (showResults && quizResult) {
    const recommendedRecipes = getRecommendedRecipes();

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <Card className="card-hero mb-8 text-center">
            <CardContent className="p-8">
              <Sparkles className="h-16 w-16 mx-auto mb-4 text-accent-glow" />
              <h1 className="text-4xl font-serif font-bold mb-4">
                Your Taste Profile
              </h1>
              <Badge className="mb-4 bg-accent-glow text-accent-foreground text-lg px-4 py-2">
                {quizResult.title}
              </Badge>
              <p className="text-lg opacity-90 mb-6">
                {quizResult.description}
              </p>
              <Button onClick={resetQuiz} variant="outline" className="btn-glass">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
            </CardContent>
          </Card>

          {/* Recommended Recipes */}
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold gradient-text mb-6 text-center">
              Perfect Recipes for You
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {recommendedRecipes.map((recipe) => (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                  <RecipeCard recipe={recipe} />
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-premium">
                <Link to="/search">
                  <ChefHat className="mr-2 h-4 w-4" />
                  Explore More Recipes
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/saved">
                  View Saved Recipes
                </Link>
              </Button>
            </div>
            <Button onClick={resetQuiz} variant="ghost" className="text-muted-foreground">
              Take the quiz again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Quiz Header */}
        <div className="text-center mb-8">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-serif font-bold gradient-text mb-4">
            Taste Profile Quiz
          </h1>
          <p className="text-muted-foreground">
            Answer a few questions to get personalized recipe recommendations
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="card-premium fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-serif">
              {quizQuestions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full text-left h-auto p-4 hover:scale-[1.02] transition-all duration-200"
                  onClick={() => handleAnswer(option.value)}
                >
                  <div className="text-left">
                    <div className="font-medium mb-1">
                      {option.label.split(' - ')[0]}
                    </div>
                    {option.label.includes(' - ') && (
                      <div className="text-sm text-muted-foreground">
                        {option.label.split(' - ')[1]}
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentQuestion > 0 && (
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              ← Previous Question
            </Button>
          </div>
        )}

        {/* Quiz Info */}
        <div className="mt-12 text-center">
          <Card className="card-premium">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">What You'll Get</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Personalized recipe recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span>Cuisine preferences matching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary-glow" />
                  <span>Dietary requirement filters</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}