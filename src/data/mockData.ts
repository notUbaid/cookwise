export interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  image: string;
  cookingTime: number;
  spiceLevel: 'Mild' | 'Medium' | 'Hot';
  effort: 'Easy' | 'Medium' | 'Hard';
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Dessert';
  dietType: string[];
  ingredients: string[];
  steps: string[];
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  culturalFact: string;
  substitutions: { [key: string]: string };
  isOfflineAvailable: boolean;
}

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spicy Thai Green Curry',
    cuisine: 'Thai',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500',
    cookingTime: 35,
    spiceLevel: 'Hot',
    effort: 'Medium',
    mealType: 'Dinner',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups coconut milk',
      '2 tbsp green curry paste',
      '1 cup mixed vegetables',
      '2 tbsp fish sauce',
      'Fresh basil leaves',
      'Jasmine rice'
    ],
    steps: [
      'Heat coconut milk in a large pan over medium heat',
      'Add green curry paste and stir until fragrant',
      'Add vegetables and cook for 10 minutes',
      'Season with fish sauce and simmer for 15 minutes',
      'Garnish with fresh basil and serve with jasmine rice'
    ],
    calories: 320,
    macros: { protein: 12, carbs: 25, fat: 18 },
    culturalFact: 'Green curry is considered the spiciest of all Thai curries and originated in central Thailand during the early 1900s.',
    substitutions: {
      'fish sauce': 'soy sauce for vegan option',
      'coconut milk': 'cashew cream for lighter version'
    },
    isOfflineAvailable: true
  },
  {
    id: '2',
    title: 'Authentic Italian Margherita Pizza',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
    cookingTime: 20,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Dinner',
    dietType: ['Veg'],
    ingredients: [
      'Pizza dough',
      '1/2 cup tomato sauce',
      '8 oz fresh mozzarella',
      'Fresh basil leaves',
      '2 tbsp olive oil',
      'Salt and pepper'
    ],
    steps: [
      'Preheat oven to 475°F (245°C)',
      'Roll out pizza dough on floured surface',
      'Spread tomato sauce evenly over dough',
      'Add torn mozzarella pieces',
      'Bake for 12-15 minutes until crust is golden',
      'Top with fresh basil and drizzle with olive oil'
    ],
    calories: 420,
    macros: { protein: 18, carbs: 45, fat: 16 },
    culturalFact: 'Margherita pizza was created in 1889 to honor Queen Margherita of Savoy, with colors representing the Italian flag.',
    substitutions: {
      'mozzarella': 'vegan cheese for dairy-free option',
      'pizza dough': 'cauliflower crust for low-carb'
    },
    isOfflineAvailable: true
  },
  {
    id: '3',
    title: 'Classic Indian Butter Chicken',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500',
    cookingTime: 45,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 lb chicken breast',
      '1 cup heavy cream',
      '3 tbsp butter',
      '2 tbsp tomato paste',
      '1 tsp garam masala',
      'Basmati rice',
      'Fresh cilantro'
    ],
    steps: [
      'Marinate chicken pieces with yogurt and spices for 30 minutes',
      'Cook chicken in butter until golden brown',
      'Add tomato paste and spices, cook for 2 minutes',
      'Pour in cream and simmer for 20 minutes',
      'Garnish with cilantro and serve with basmati rice'
    ],
    calories: 385,
    macros: { protein: 32, carbs: 8, fat: 24 },
    culturalFact: 'Butter chicken was invented in the 1950s at Moti Mahal restaurant in Delhi by accident when leftover tandoori chicken was mixed with tomato gravy.',
    substitutions: {
      'heavy cream': 'coconut cream for dairy-free',
      'chicken': 'paneer or tofu for vegetarian'
    },
    isOfflineAvailable: false
  },
  {
    id: '4',
    title: 'Mexican Street Tacos',
    cuisine: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500',
    cookingTime: 15,
    spiceLevel: 'Medium',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      'Corn tortillas',
      '1 lb carnitas',
      'White onion, diced',
      'Fresh cilantro',
      'Lime wedges',
      'Salsa verde'
    ],
    steps: [
      'Warm corn tortillas on a dry skillet',
      'Fill each tortilla with carnitas',
      'Top with diced onion and cilantro',
      'Serve with lime wedges and salsa verde',
      'Enjoy immediately while warm'
    ],
    calories: 280,
    macros: { protein: 22, carbs: 18, fat: 14 },
    culturalFact: 'Street tacos originated from Mexican workers who needed quick, portable meals during the day.',
    substitutions: {
      'carnitas': 'grilled vegetables for vegetarian',
      'corn tortillas': 'flour tortillas if preferred'
    },
    isOfflineAvailable: true
  },
  {
    id: '5',
    title: 'Japanese Chicken Ramen',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
    cookingTime: 60,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg'],
    ingredients: [
      'Ramen noodles',
      'Chicken stock',
      'Soy sauce',
      'Miso paste',
      'Soft-boiled eggs',
      'Green onions',
      'Nori sheets'
    ],
    steps: [
      'Prepare rich chicken stock by simmering bones for 4 hours',
      'Cook ramen noodles according to package instructions',
      'Mix miso paste with hot stock',
      'Assemble bowl with noodles, stock, and toppings',
      'Garnish with green onions and nori'
    ],
    calories: 450,
    macros: { protein: 25, carbs: 52, fat: 16 },
    culturalFact: 'Ramen was actually introduced to Japan from China in the early 20th century and has since become a cultural icon.',
    substitutions: {
      'chicken stock': 'vegetable stock for vegetarian',
      'soft-boiled eggs': 'marinated tofu for vegan'
    },
    isOfflineAvailable: false
  },
  {
    id: '6',
    title: 'French Chocolate Croissants',
    cuisine: 'French',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
    cookingTime: 25,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg'],
    ingredients: [
      'Puff pastry',
      'Dark chocolate sticks',
      '1 egg for wash',
      'Butter',
      'Powdered sugar'
    ],
    steps: [
      'Roll out puff pastry and cut into triangles',
      'Place chocolate stick at wide end of triangle',
      'Roll pastry around chocolate to form croissant shape',
      'Brush with egg wash',
      'Bake at 375°F for 15-20 minutes until golden',
      'Dust with powdered sugar before serving'
    ],
    calories: 320,
    macros: { protein: 6, carbs: 28, fat: 22 },
    culturalFact: 'Pain au chocolat was created in the 19th century when Austrian bakers brought croissant techniques to France.',
    substitutions: {
      'dark chocolate': 'almond paste for pain aux amandes',
      'butter': 'vegan butter for plant-based version'
    },
    isOfflineAvailable: true
  },
  {
    id: '7',
    title: 'Greek Mediterranean Salad',
    cuisine: 'Greek',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500',
    cookingTime: 10,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Gluten-Free', 'Keto'],
    ingredients: [
      'Cherry tomatoes',
      'Cucumber',
      'Red onion',
      'Feta cheese',
      'Kalamata olives',
      'Olive oil',
      'Lemon juice',
      'Oregano'
    ],
    steps: [
      'Chop tomatoes, cucumber, and red onion',
      'Combine vegetables in a large bowl',
      'Add crumbled feta and olives',
      'Whisk olive oil with lemon juice and oregano',
      'Drizzle dressing over salad and toss gently'
    ],
    calories: 180,
    macros: { protein: 8, carbs: 12, fat: 14 },
    culturalFact: 'Greek salad (horiatiki) traditionally never includes lettuce and is meant to showcase the quality of local ingredients.',
    substitutions: {
      'feta cheese': 'vegan feta for dairy-free',
      'olive oil': 'avocado oil for different flavor profile'
    },
    isOfflineAvailable: false
  },
  {
    id: '8',
    title: 'Korean Kimchi Fried Rice',
    cuisine: 'Korean',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500',
    cookingTime: 20,
    spiceLevel: 'Hot',
    effort: 'Easy',
    mealType: 'Dinner',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      'Cooked rice',
      'Kimchi',
      'Sesame oil',
      'Soy sauce',
      'Green onions',
      'Fried egg (optional)'
    ],
    steps: [
      'Heat sesame oil in a large pan',
      'Add kimchi and cook for 3 minutes',
      'Add rice and stir-fry for 10 minutes',
      'Season with soy sauce',
      'Garnish with green onions and fried egg'
    ],
    calories: 290,
    macros: { protein: 8, carbs: 48, fat: 8 },
    culturalFact: 'Kimchi fried rice was traditionally made to use up leftover rice and aging kimchi, making it a perfect example of Korean home cooking.',
    substitutions: {
      'kimchi': 'sauerkraut for similar fermented flavor',
      'soy sauce': 'tamari for gluten-free option'
    },
    isOfflineAvailable: true
  }
];

export const mockQuizQuestions = [
  {
    id: 1,
    question: "How spicy do you like your food?",
    options: [
      { value: "mild", label: "Mild - I prefer gentle flavors" },
      { value: "medium", label: "Medium - A little kick is nice" },
      { value: "hot", label: "Hot - Bring on the heat!" }
    ]
  },
  {
    id: 2,
    question: "What's your preferred cooking time?",
    options: [
      { value: "quick", label: "Under 15 minutes - Quick & easy" },
      { value: "moderate", label: "15-30 minutes - Worth the wait" },
      { value: "long", label: "30+ minutes - I enjoy the process" }
    ]
  },
  {
    id: 3,
    question: "Which cuisine excites you most?",
    options: [
      { value: "asian", label: "Asian - Thai, Japanese, Korean" },
      { value: "european", label: "European - Italian, French, Greek" },
      { value: "latin", label: "Latin - Mexican, Spanish" }
    ]
  },
  {
    id: 4,
    question: "What's your dietary preference?",
    options: [
      { value: "everything", label: "I eat everything" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" }
    ]
  }
];

export const mockQuizResults = {
  "spicy-asian-lover": {
    title: "Spicy Asian Food Explorer",
    description: "You love bold flavors and authentic Asian cuisine!",
    recommendedRecipes: ['1', '8', '5']
  },
  "comfort-european": {
    title: "European Comfort Food Enthusiast",
    description: "You appreciate classic, comforting European dishes.",
    recommendedRecipes: ['2', '6', '7']
  },
  "quick-and-fresh": {
    title: "Quick & Fresh Food Lover",
    description: "You prefer fresh, quick meals that don't compromise on taste.",
    recommendedRecipes: ['4', '7', '8']
  }
};

export const culturalFacts = [
  "Saffron is worth more than gold by weight and comes from the stigmas of crocus flowers.",
  "The fortune cookie was actually invented in California, not China.",
  "Chocolate was once used as currency by the Aztecs and Maya civilizations."
];

export const substitutionTips = [
  "Replace heavy cream with coconut cream for dairy-free cooking",
  "Use applesauce instead of oil in baking for healthier desserts",
  "Swap regular pasta with zucchini noodles for low-carb meals"
];