export interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  state: string;
  city?: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';
  image: string;
  cookingTime: number;
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
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
  tags: string[];
  prepTime: number;
  servings: number;
  difficulty: 'Quick' | 'Medium' | 'Long';
  isFestive?: boolean;
  festival?: string;
  isHealthy?: boolean;
  isStreetFood?: boolean;
}

export interface MealPlan {
  id: string;
  title: string;
  description: string;
  days: {
    [key: string]: {
      breakfast: Recipe;
      lunch: Recipe;
      dinner: Recipe;
      snacks?: Recipe[];
    };
  };
  totalCalories: number;
  cuisine: string;
  dietType: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  recipeCount: number;
  cuisine: string;
  tags: string[];
}

export interface FeaturedSection {
  id: string;
  title: string;
  subtitle: string;
  recipes: Recipe[];
  type: 'carousel' | 'grid' | 'hero';
  backgroundImage?: string;
}

// Enhanced Mock Recipes with more comprehensive data
export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Hyderabadi Biryani',
    cuisine: 'Hyderabadi',
    state: 'Telangana',
    city: 'Hyderabad',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 90,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Basmati rice',
      '750g Mutton pieces',
      '4 tbsp Ghee',
      '2 cups Fried onions',
      '1 cup Yogurt',
      'Biryani masala powder',
      'Saffron soaked in milk',
      'Fresh mint leaves',
      'Coriander leaves'
    ],
    steps: [
      'Marinate mutton with yogurt, spices, and half the fried onions for 2 hours',
      'Cook rice with whole spices until 70% done, drain and set aside',
      'In a heavy-bottomed pot, layer the marinated mutton at the bottom',
      'Layer the partially cooked rice over the mutton',
      'Sprinkle remaining fried onions, mint, coriander, and saffron milk',
      'Cover with aluminum foil, then place the lid and cook on dum for 45 minutes',
      'Let it rest for 10 minutes before opening and gently mix',
      'Serve hot with raita, shorba, and boiled eggs'
    ],
    calories: 520,
    macros: { protein: 28, carbs: 65, fat: 18 },
    culturalFact: 'Hyderabadi Biryani originated in the kitchens of the Nizams of Hyderabad and is cooked using the ancient dum method where the pot is sealed and slow-cooked.',
    substitutions: {
      'mutton': 'chicken or paneer for different variations',
      'ghee': 'refined oil for lighter version'
    },
    isOfflineAvailable: true,
    tags: ['Biryani', 'Dum Cooking', 'Royal Cuisine', 'Festive'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Eid',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '2',
    title: 'Masala Dosa',
    cuisine: 'South Indian',
    state: 'Karnataka',
    city: 'Bangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 30,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice',
      '1 cup Urad dal',
      '1/4 cup Chana dal',
      '1/2 tsp Fenugreek seeds',
      'Potatoes for filling',
      'Onions, tomatoes',
      'Mustard seeds, curry leaves',
      'Turmeric powder',
      'Salt to taste'
    ],
    steps: [
      'Soak rice, urad dal, and fenugreek seeds separately for 6-8 hours',
      'Grind urad dal to smooth paste, rice to slightly coarse paste',
      'Mix both batters, add salt, and ferment overnight',
      'Prepare potato filling with onions, tomatoes, and spices',
      'Heat tawa, spread batter in circular motion',
      'Add ghee, place potato filling, fold and serve with chutney'
    ],
    calories: 280,
    macros: { protein: 8, carbs: 45, fat: 6 },
    culturalFact: 'Masala Dosa is a staple breakfast in South India, particularly in Karnataka. The dish represents the perfect balance of nutrition and taste.',
    substitutions: {
      'potato': 'paneer or mixed vegetables',
      'ghee': 'oil for vegan version'
    },
    isOfflineAvailable: true,
    tags: ['Breakfast', 'South Indian', 'Fermented', 'Street Food'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: true
  },
  {
    id: '3',
    title: 'Butter Chicken',
    cuisine: 'Punjabi',
    state: 'Punjab',
    city: 'Amritsar',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Chicken pieces',
      '1 cup Yogurt',
      '2 tbsp Ginger-garlic paste',
      '1 tsp Red chili powder',
      '1/2 tsp Turmeric powder',
      '2 tbsp Butter',
      '1 cup Tomato puree',
      '1/2 cup Cream',
      '1 tsp Garam masala',
      'Fresh coriander leaves'
    ],
    steps: [
      'Marinate chicken with yogurt, ginger-garlic paste, and spices for 2 hours',
      'Grill or bake chicken until charred and cooked through',
      'In a pan, heat butter and add tomato puree, cook until thick',
      'Add cream, garam masala, and adjust seasoning',
      'Add grilled chicken pieces and simmer for 10 minutes',
      'Garnish with fresh coriander and serve with naan or rice'
    ],
    calories: 380,
    macros: { protein: 32, carbs: 8, fat: 24 },
    culturalFact: 'Butter Chicken was invented in the 1950s at Moti Mahal restaurant in Delhi. It was created to use leftover tandoori chicken.',
    substitutions: {
      'chicken': 'paneer or mushrooms for vegetarian version',
      'cream': 'coconut milk for dairy-free option'
    },
    isOfflineAvailable: true,
    tags: ['Punjabi', 'Creamy', 'Restaurant Style', 'Popular'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '4',
    title: 'Misal Pav',
    cuisine: 'Maharashtrian',
    state: 'Maharashtra',
    city: 'Mumbai',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    cookingTime: 40,
    prepTime: 15,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Snacks',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Mixed sprouts',
      '1 cup Onions, finely chopped',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '2 tbsp Goda masala',
      '1 tsp Red chili powder',
      'Fresh coriander leaves',
      'Pav bread',
      'Sev for garnish'
    ],
    steps: [
      'Pressure cook mixed sprouts until soft but not mushy',
      'Heat oil, add mustard and cumin seeds',
      'Add onions, sauté until golden brown',
      'Add goda masala, red chili powder, and salt',
      'Add cooked sprouts and simmer for 10 minutes',
      'Serve hot with pav bread, garnished with sev and coriander'
    ],
    calories: 320,
    macros: { protein: 12, carbs: 48, fat: 8 },
    culturalFact: 'Misal Pav is a popular street food from Maharashtra, particularly Mumbai. It\'s known for its spicy flavor and is often eaten for breakfast.',
    substitutions: {
      'sprouts': 'mixed vegetables or legumes',
      'pav': 'any bread or roti'
    },
    isOfflineAvailable: true,
    tags: ['Street Food', 'Spicy', 'Maharashtrian', 'Breakfast'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: true
  },
  {
    id: '5',
    title: 'Assamese Fish Tenga',
    cuisine: 'Assamese',
    state: 'Assam',
    city: 'Guwahati',
    region: 'Northeast',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 35,
    prepTime: 15,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish pieces',
      '2 Tomatoes, chopped',
      '1 Lemon',
      '2 tbsp Mustard oil',
      '1 tsp Turmeric powder',
      '1 tsp Red chili powder',
      'Fresh coriander leaves',
      'Salt to taste'
    ],
    steps: [
      'Clean and marinate fish with turmeric and salt',
      'Heat mustard oil in a pan',
      'Add fish pieces and cook until golden brown',
      'Add tomatoes, lemon juice, and spices',
      'Simmer for 10-15 minutes until gravy thickens',
      'Garnish with coriander and serve hot with rice'
    ],
    calories: 220,
    macros: { protein: 28, carbs: 4, fat: 12 },
    culturalFact: 'Fish Tenga is a traditional sour fish curry from Assam. The tangy flavor comes from tomatoes and lemon, making it a perfect accompaniment to rice.',
    substitutions: {
      'fish': 'prawns or chicken',
      'mustard oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Assamese', 'Sour Curry', 'Traditional', 'Healthy'],
    servings: 4,
    difficulty: 'Easy',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '6',
    title: 'Tamil Nadu Chettinad Chicken',
    cuisine: 'Chettinad',
    state: 'Tamil Nadu',
    city: 'Karaikudi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 50,
    prepTime: 25,
    spiceLevel: 'Spicy',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Chicken pieces',
      '2 tbsp Chettinad masala',
      '1 cup Onions, sliced',
      '2 tbsp Ginger-garlic paste',
      '1 cup Tomatoes, chopped',
      '2 tbsp Oil',
      'Curry leaves',
      'Whole spices',
      'Fresh coriander leaves'
    ],
    steps: [
      'Marinate chicken with ginger-garlic paste and spices',
      'Heat oil, add whole spices and curry leaves',
      'Add onions and sauté until golden brown',
      'Add marinated chicken and cook until browned',
      'Add tomatoes and Chettinad masala',
      'Simmer until chicken is tender and gravy thickens',
      'Garnish with coriander and serve with rice or roti'
    ],
    calories: 420,
    macros: { protein: 35, carbs: 12, fat: 28 },
    culturalFact: 'Chettinad cuisine is known for its bold flavors and extensive use of spices. This dish represents the rich culinary heritage of the Chettiar community.',
    substitutions: {
      'chicken': 'mutton or fish',
      'Chettinad masala': 'garam masala with extra spices'
    },
    isOfflineAvailable: true,
    tags: ['Chettinad', 'Spicy', 'Traditional', 'Rich'],
    servings: 6,
    difficulty: 'Hard',
    isFestive: true,
    festival: 'Pongal',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '7',
    title: 'Bihari Litti Chokha',
    cuisine: 'Bihari',
    state: 'Bihar',
    city: 'Patna',
    region: 'East',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    cookingTime: 60,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Sattu (roasted gram flour)',
      '2 tbsp Oil',
      '1 tsp Ajwain',
      '1 tsp Red chili powder',
      '2 tbsp Mustard oil',
      '2 Potatoes, boiled',
      '2 Tomatoes, roasted',
      '2 Eggplants, roasted'
    ],
    steps: [
      'Mix wheat flour with oil, ajwain, and salt to make dough',
      'Prepare sattu filling with spices and mustard oil',
      'Stuff dough balls with sattu mixture',
      'Bake or grill litti until golden brown',
      'Prepare chokha by mashing roasted vegetables',
      'Serve hot litti with chokha and ghee'
    ],
    calories: 380,
    macros: { protein: 14, carbs: 52, fat: 16 },
    culturalFact: 'Litti Chokha is the signature dish of Bihar, representing the state\'s rustic and wholesome cuisine. It\'s often eaten by farmers and laborers.',
    substitutions: {
      'sattu': 'roasted chickpea flour',
      'mustard oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Bihari', 'Rustic', 'Traditional', 'Wholesome'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: true
  },
  {
    id: '8',
    title: 'Himachali Siddu',
    cuisine: 'Himachali',
    state: 'Himachal Pradesh',
    city: 'Shimla',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 90,
    prepTime: 45,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '3 cups Wheat flour',
      '1 cup Poppy seeds',
      '1 cup Walnuts, crushed',
      '2 tbsp Ghee',
      '1 tsp Cinnamon powder',
      '1 tsp Cardamom powder',
      '1 cup Jaggery',
      'Yeast for fermentation'
    ],
    steps: [
      'Prepare dough with wheat flour, yeast, and warm water',
      'Let dough ferment for 4-6 hours',
      'Prepare filling with poppy seeds, walnuts, and jaggery',
      'Stuff dough balls with sweet filling',
      'Steam for 20-25 minutes until cooked',
      'Serve hot with ghee and chutney'
    ],
    calories: 450,
    macros: { protein: 12, carbs: 58, fat: 22 },
    culturalFact: 'Siddu is a traditional steamed bread from Himachal Pradesh, often served during festivals and special occasions. It represents the mountain state\'s unique culinary traditions.',
    substitutions: {
      'poppy seeds': 'sesame seeds or nuts',
      'jaggery': 'brown sugar or honey'
    },
    isOfflineAvailable: true,
    tags: ['Himachali', 'Steamed', 'Festive', 'Sweet'],
    servings: 6,
    difficulty: 'Hard',
    isFestive: true,
    festival: 'Diwali',
    isHealthy: false,
    isStreetFood: false
  }
];

// Mock Meal Plans
export const mockMealPlans: MealPlan[] = [
  {
    id: 'mp1',
    title: 'Vegetarian Week',
    description: 'A complete 7-day vegetarian meal plan with balanced nutrition',
    days: {
      monday: {
        breakfast: mockRecipes[1], // Masala Dosa
        lunch: mockRecipes[3], // Misal Pav
        dinner: mockRecipes[6] // Chettinad Chicken (will be replaced with veg option)
      },
      tuesday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      wednesday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      thursday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      friday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      saturday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      sunday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      }
    },
    totalCalories: 2100,
    cuisine: 'Mixed Indian',
    dietType: 'Vegetarian',
    difficulty: 'Medium',
    prepTime: 45,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'
  },
  {
    id: 'mp2',
    title: 'Quick & Healthy',
    description: 'Fast and nutritious meals for busy weekdays',
    days: {
      monday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      tuesday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      wednesday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      thursday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      friday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      saturday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      },
      sunday: {
        breakfast: mockRecipes[1],
        lunch: mockRecipes[3],
        dinner: mockRecipes[6]
      }
    },
    totalCalories: 1800,
    cuisine: 'Mixed',
    dietType: 'Balanced',
    difficulty: 'Easy',
    prepTime: 30,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500'
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'cat1',
    name: 'South Indian Delights',
    description: 'Traditional recipes from the southern states of India',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    recipeCount: 25,
    cuisine: 'South Indian',
    tags: ['Dosa', 'Idli', 'Sambhar', 'Coconut']
  },
  {
    id: 'cat2',
    name: 'North Indian Classics',
    description: 'Rich and flavorful dishes from North India',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    recipeCount: 30,
    cuisine: 'North Indian',
    tags: ['Curry', 'Bread', 'Tandoor', 'Creamy']
  },
  {
    id: 'cat3',
    name: 'Street Food Favorites',
    description: 'Popular street food from across India',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    recipeCount: 20,
    cuisine: 'Mixed',
    tags: ['Quick', 'Spicy', 'Affordable', 'Popular']
  },
  {
    id: 'cat4',
    name: 'Festive Specials',
    description: 'Traditional dishes prepared during festivals',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    recipeCount: 15,
    cuisine: 'Mixed',
    tags: ['Festival', 'Traditional', 'Special', 'Celebration']
  },
  {
    id: 'cat5',
    name: 'Healthy Choices',
    description: 'Nutritious and balanced meal options',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    recipeCount: 18,
    cuisine: 'Mixed',
    tags: ['Healthy', 'Low-calorie', 'Nutritious', 'Balanced']
  },
  {
    id: 'cat6',
    name: 'Quick Meals',
    description: 'Fast and easy recipes for busy days',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500',
    recipeCount: 22,
    cuisine: 'Mixed',
    tags: ['Quick', 'Easy', 'Fast', 'Convenient']
  }
];

// Mock Featured Sections
export const mockFeaturedSections: FeaturedSection[] = [
  {
    id: 'fs1',
    title: 'Trending This Week',
    subtitle: 'Most popular recipes our users are cooking',
    recipes: mockRecipes.slice(0, 4),
    type: 'carousel',
    backgroundImage: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500'
  },
  {
    id: 'fs2',
    title: 'Regional Specialties',
    subtitle: 'Discover authentic flavors from every corner of India',
    recipes: mockRecipes.slice(2, 6),
    type: 'grid',
    backgroundImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500'
  },
  {
    id: 'fs3',
    title: 'Quick & Easy',
    subtitle: 'Delicious meals ready in 30 minutes or less',
    recipes: mockRecipes.filter(r => r.cookingTime <= 30),
    type: 'carousel',
    backgroundImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500'
  }
];

// Enhanced existing data structures
export const indianStates = [
  { name: 'Andhra Pradesh', region: 'South', capital: 'Amaravati' },
  { name: 'Arunachal Pradesh', region: 'Northeast', capital: 'Itanagar' },
  { name: 'Assam', region: 'Northeast', capital: 'Dispur' },
  { name: 'Bihar', region: 'East', capital: 'Patna' },
  { name: 'Chhattisgarh', region: 'Central', capital: 'Raipur' },
  { name: 'Goa', region: 'West', capital: 'Panaji' },
  { name: 'Gujarat', region: 'West', capital: 'Gandhinagar' },
  { name: 'Haryana', region: 'North', capital: 'Chandigarh' },
  { name: 'Himachal Pradesh', region: 'North', capital: 'Shimla' },
  { name: 'Jharkhand', region: 'East', capital: 'Ranchi' },
  { name: 'Karnataka', region: 'South', capital: 'Bengaluru' },
  { name: 'Kerala', region: 'South', capital: 'Thiruvananthapuram' },
  { name: 'Madhya Pradesh', region: 'Central', capital: 'Bhopal' },
  { name: 'Maharashtra', region: 'West', capital: 'Mumbai' },
  { name: 'Manipur', region: 'Northeast', capital: 'Imphal' },
  { name: 'Meghalaya', region: 'Northeast', capital: 'Shillong' },
  { name: 'Mizoram', region: 'Northeast', capital: 'Aizawl' },
  { name: 'Nagaland', region: 'Northeast', capital: 'Kohima' },
  { name: 'Odisha', region: 'East', capital: 'Bhubaneswar' },
  { name: 'Punjab', region: 'North', capital: 'Chandigarh' },
  { name: 'Rajasthan', region: 'North', capital: 'Jaipur' },
  { name: 'Sikkim', region: 'Northeast', capital: 'Gangtok' },
  { name: 'Tamil Nadu', region: 'South', capital: 'Chennai' },
  { name: 'Telangana', region: 'South', capital: 'Hyderabad' },
  { name: 'Tripura', region: 'Northeast', capital: 'Agartala' },
  { name: 'Uttar Pradesh', region: 'North', capital: 'Lucknow' },
  { name: 'Uttarakhand', region: 'North', capital: 'Dehradun' },
  { name: 'West Bengal', region: 'East', capital: 'Kolkata' }
];

export const regionalCategories = [
  { name: 'Taste of Punjab', region: 'North', cuisine: 'Punjabi', icon: '🌾' },
  { name: 'South Indian Staples', region: 'South', cuisine: 'South Indian', icon: '🥥' },
  { name: 'Bengali Delights', region: 'East', cuisine: 'Bengali', icon: '🐟' },
  { name: 'Maharashtrian Magic', region: 'West', cuisine: 'Maharashtrian', icon: '🌶️' },
  { name: 'Gujarati Thali', region: 'West', cuisine: 'Gujarati', icon: '🥘' },
  { name: 'Rajasthani Royalty', region: 'North', cuisine: 'Rajasthani', icon: '👑' },
  { name: 'Kashmiri Cuisine', region: 'North', cuisine: 'Kashmiri', icon: '🏔️' },
  { name: 'Kerala Specials', region: 'South', cuisine: 'Kerala', icon: '🌴' },
  { name: 'Assamese Flavors', region: 'Northeast', cuisine: 'Assamese', icon: '🍃' },
  { name: 'Bihari Comfort', region: 'East', cuisine: 'Bihari', icon: '🏠' }
];

export const festivalCategories = [
  { name: 'Diwali Delights', festival: 'Diwali', icon: '🪔', recipes: mockRecipes.filter(r => r.isFestive) },
  { name: 'Eid Specials', festival: 'Eid', icon: '🌙', recipes: mockRecipes.filter(r => r.festival === 'Eid') },
  { name: 'Holi Sweets', festival: 'Holi', icon: '🎨', recipes: mockRecipes.filter(r => r.mealType === 'Dessert') },
  { name: 'Christmas Treats', festival: 'Christmas', icon: '🎄', recipes: mockRecipes.filter(r => r.isFestive) },
  { name: 'Pongal Pongal', festival: 'Pongal', icon: '🌾', recipes: mockRecipes.filter(r => r.festival === 'Pongal') }
];

export const mealCategories = [
  { name: 'Breakfast Bonanza', mealType: 'Breakfast', icon: '🌅', recipes: mockRecipes.filter(r => r.mealType === 'Breakfast') },
  { name: 'Lunch Legends', mealType: 'Lunch', icon: '☀️', recipes: mockRecipes.filter(r => r.mealType === 'Lunch') },
  { name: 'Dinner Delights', mealType: 'Dinner', icon: '🌙', recipes: mockRecipes.filter(r => r.mealType === 'Dinner') },
  { name: 'Snack Attack', mealType: 'Snacks', icon: '🍿', recipes: mockRecipes.filter(r => r.mealType === 'Snacks') },
  { name: 'Sweet Endings', mealType: 'Dessert', icon: '🍰', recipes: mockRecipes.filter(r => r.mealType === 'Dessert') }
];

export const difficultyLevels = [
  { name: 'Quick & Easy', difficulty: 'Quick', icon: '⚡', time: '< 30 min' },
  { name: 'Medium Effort', difficulty: 'Medium', icon: '⏱️', time: '30-60 min' },
  { name: 'Chef\'s Special', difficulty: 'Long', icon: '👨‍🍳', time: '> 60 min' }
];

export const dietTypes = [
  { name: 'Vegetarian', type: 'Veg', icon: '🥬', color: 'green' },
  { name: 'Vegan', type: 'Vegan', icon: '🌱', color: 'emerald' },
  { name: 'Non-Vegetarian', type: 'Non-Veg', icon: '🍗', color: 'red' },
  { name: 'Gluten-Free', type: 'Gluten-Free', icon: '🌾', color: 'yellow' },
  { name: 'Dairy-Free', type: 'Dairy-Free', icon: '🥛', color: 'blue' }
];

export const spiceLevels = [
  { name: 'Mild', level: 'Mild', icon: '🟢', heat: 'Low' },
  { name: 'Medium', level: 'Medium', icon: '🟡', heat: 'Moderate' },
  { name: 'Spicy', level: 'Spicy', icon: '🔴', heat: 'High' }
];

export const commonIngredients = [
  'Rice', 'Wheat Flour', 'Onions', 'Tomatoes', 'Potatoes', 'Ginger', 'Garlic',
  'Turmeric', 'Cumin', 'Coriander', 'Chili Powder', 'Garam Masala', 'Oil',
  'Ghee', 'Yogurt', 'Milk', 'Paneer', 'Chicken', 'Fish', 'Lentils', 'Chickpeas'
];

export const leftoverRecipes = [
  {
    id: 'lr1',
    title: 'Roti Churma',
    description: 'Sweet dessert made from leftover rotis',
    ingredients: ['Leftover rotis', 'Ghee', 'Sugar', 'Cardamom'],
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    difficulty: 'Easy',
    time: 15
  },
  {
    id: 'lr2',
    title: 'Dal Paratha',
    description: 'Stuffed paratha using leftover dal',
    ingredients: ['Leftover dal', 'Wheat flour', 'Spices', 'Oil'],
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    difficulty: 'Medium',
    time: 25
  },
  {
    id: 'lr3',
    title: 'Fried Rice',
    description: 'Quick fried rice with leftover rice',
    ingredients: ['Leftover rice', 'Vegetables', 'Soy sauce', 'Oil'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    difficulty: 'Easy',
    time: 20
  }
];

export const locationBasedSuggestions = {
  'Mumbai': {
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'West',
    suggestions: mockRecipes.filter(r => r.state === 'Maharashtra' || r.isStreetFood),
    specialties: ['Vada Pav', 'Misal Pav', 'Pav Bhaji', 'Bombay Duck Curry']
  },
  'Delhi': {
    city: 'Delhi',
    state: 'Delhi',
    region: 'North',
    suggestions: mockRecipes.filter(r => r.region === 'North'),
    specialties: ['Butter Chicken', 'Chole Bhature', 'Kebabs', 'Dahi Bhalla']
  },
  'Bangalore': {
    city: 'Bangalore',
    state: 'Karnataka',
    region: 'South',
    suggestions: mockRecipes.filter(r => r.state === 'Karnataka' || r.cuisine === 'South Indian'),
    specialties: ['Masala Dosa', 'Bisi Bele Bath', 'Ragi Mudde', 'Mangalore Fish Curry']
  },
  'Kolkata': {
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    suggestions: mockRecipes.filter(r => r.region === 'East'),
    specialties: ['Fish Curry', 'Luchi Aloor Dom', 'Rasgulla', 'Kathi Rolls']
  }
};

export const culturalFacts = [
  'The word "curry" comes from the Tamil word "kari" meaning sauce or relish.',
  'India produces over 70% of the world\'s spices.',
  'The concept of "thali" (plate) represents the balance of six tastes: sweet, sour, salty, bitter, pungent, and astringent.',
  'Yogurt (dahi) is considered sacred in many Indian households and is often the first food offered to guests.',
  'The use of turmeric in Indian cooking dates back over 4000 years.',
  'Indian breads like naan and roti are traditionally cooked in clay ovens called tandoors.',
  'The practice of eating with hands is believed to enhance the dining experience through touch.',
  'Many Indian dishes are designed to be eaten together, creating a perfect balance of flavors.',
  'The concept of "agni" (digestive fire) influences traditional Indian meal planning.',
  'Indian sweets often use ingredients like jaggery, dates, and honey instead of refined sugar.'
];

export const substitutionTips = [
  'Replace ghee with coconut oil for a vegan alternative.',
  'Use coconut milk instead of cream for dairy-free curries.',
  'Substitute paneer with tofu for a different protein source.',
  'Replace white rice with brown rice or quinoa for more nutrition.',
  'Use jaggery instead of sugar for a more natural sweetener.',
  'Substitute wheat flour with almond flour for gluten-free baking.',
  'Replace yogurt with coconut yogurt for dairy-free options.',
  'Use tamarind paste instead of lemon juice for authentic sourness.',
  'Substitute mustard oil with any neutral cooking oil.',
  'Replace meat with jackfruit for vegetarian meat alternatives.'
];

// Quiz questions for the taste quiz
export const quizQuestions = [
  {
    id: 1,
    question: "What's your preferred spice level?",
    options: [
      { text: "Mild - I prefer subtle flavors", value: "mild" },
      { text: "Medium - I like balanced heat", value: "medium" },
      { text: "Spicy - The hotter, the better!", value: "spicy" }
    ]
  },
  {
    id: 2,
    question: "Which cuisine interests you most?",
    options: [
      { text: "North Indian - Rich and creamy", value: "north" },
      { text: "South Indian - Light and tangy", value: "south" },
      { text: "East Indian - Fish and rice based", value: "east" },
      { text: "West Indian - Coastal flavors", value: "west" }
    ]
  },
  {
    id: 3,
    question: "What's your cooking experience level?",
    options: [
      { text: "Beginner - I'm just starting out", value: "easy" },
      { text: "Intermediate - I can follow recipes", value: "medium" },
      { text: "Advanced - I love experimenting", value: "hard" }
    ]
  },
  {
    id: 4,
    question: "How much time do you usually have for cooking?",
    options: [
      { text: "Quick meals - 30 minutes or less", value: "quick" },
      { text: "Moderate time - 30-60 minutes", value: "medium" },
      { text: "Leisurely cooking - Over an hour", value: "long" }
    ]
  },
  {
    id: 5,
    question: "What's your dietary preference?",
    options: [
      { text: "Vegetarian", value: "veg" },
      { text: "Vegan", value: "vegan" },
      { text: "Non-vegetarian", value: "non-veg" },
      { text: "Flexible - I eat everything", value: "flexible" }
    ]
  }
];

// Mock data for random recipe suggestions
export const getRandomRecipe = (): Recipe => {
  return mockRecipes[Math.floor(Math.random() * mockRecipes.length)];
};

export const getRandomRecipes = (count: number): Recipe[] => {
  const shuffled = [...mockRecipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Mock data for trending recipes
export const getTrendingRecipes = (): Recipe[] => {
  return mockRecipes.slice(0, 6);
};

// Mock data for recently viewed recipes
export const getRecentlyViewedRecipes = (): Recipe[] => {
  return mockRecipes.slice(2, 8);
};

// Mock data for recommended recipes based on preferences
export const getRecommendedRecipes = (preferences: any): Recipe[] => {
  // Simple mock logic - in real app, this would use ML/AI
  return mockRecipes.filter(recipe => {
    if (preferences.spiceLevel && recipe.spiceLevel === preferences.spiceLevel) return true;
    if (preferences.cuisine && recipe.cuisine.includes(preferences.cuisine)) return true;
    if (preferences.dietType && recipe.dietType.includes(preferences.dietType)) return true;
    return false;
  }).slice(0, 6);
};