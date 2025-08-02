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
  difficulty: 'Quick' | 'Medium' | 'Hard';
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
    calories: 650,
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
    calories: 420,
    macros: { protein: 12, carbs: 68, fat: 8 },
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
    calories: 480,
    macros: { protein: 38, carbs: 12, fat: 28 },
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
    calories: 380,
    macros: { protein: 16, carbs: 52, fat: 12 },
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
    calories: 320,
    macros: { protein: 32, carbs: 8, fat: 16 },
    culturalFact: 'Fish Tenga is a traditional sour fish curry from Assam. The tangy flavor comes from tomatoes and lemon, making it a perfect accompaniment to rice.',
    substitutions: {
      'fish': 'prawns or chicken',
      'mustard oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Assamese', 'Sour Curry', 'Traditional', 'Healthy'],
    servings: 4,
    difficulty: 'Quick',
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
    calories: 520,
    macros: { protein: 42, carbs: 16, fat: 32 },
    culturalFact: 'Chettinad cuisine is known for its bold flavors and extensive use of spices. This dish represents the rich culinary heritage of the Chettiar community.',
    substitutions: {
      'chicken': 'mutton or fish',
      'Chettinad masala': 'garam masala with extra spices'
    },
    isOfflineAvailable: true,
    tags: ['Chettinad', 'Spicy', 'Traditional', 'Rich'],
    servings: 6,
    difficulty: 'Long',
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
    calories: 480,
    macros: { protein: 18, carbs: 58, fat: 20 },
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
    calories: 580,
    macros: { protein: 16, carbs: 68, fat: 28 },
    culturalFact: 'Siddu is a traditional steamed bread from Himachal Pradesh, often served during festivals and special occasions. It represents the mountain state\'s unique culinary traditions.',
    substitutions: {
      'poppy seeds': 'sesame seeds or nuts',
      'jaggery': 'brown sugar or honey'
    },
    isOfflineAvailable: true,
    tags: ['Himachali', 'Steamed', 'Festive', 'Sweet'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Diwali',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '9',
    title: 'Kerala Appam with Stew',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Thiruvananthapuram',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 45,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Raw rice',
      '1 cup Coconut milk',
      '1/2 cup Cooked rice',
      '1 tsp Yeast',
      '1 tsp Sugar',
      '1/2 tsp Salt',
      'For Stew: Mixed vegetables, Coconut milk, Spices'
    ],
    steps: [
      'Soak raw rice for 4-6 hours, grind with cooked rice',
      'Add coconut milk, yeast, sugar, and salt',
      'Ferment overnight or for 6-8 hours',
      'Heat appam pan, pour batter in circular motion',
      'Cover and cook until edges are crispy',
      'Serve hot with vegetable stew'
    ],
    calories: 380,
    macros: { protein: 8, carbs: 72, fat: 6 },
    culturalFact: 'Appam is a traditional breakfast dish from Kerala, made with fermented rice batter and coconut milk. It\'s often served during Onam and other festivals.',
    substitutions: {
      'coconut milk': 'regular milk for different taste',
      'yeast': 'baking soda for quick version'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Breakfast', 'Fermented', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: true,
    festival: 'Onam',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '10',
    title: 'Rajasthani Dal Baati Churma',
    cuisine: 'Rajasthani',
    state: 'Rajasthan',
    city: 'Jaipur',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 90,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Ghee',
      '1 cup Mixed dals',
      '2 tbsp Spices',
      '1 cup Jaggery',
      '1/2 cup Nuts',
      'Fresh coriander leaves'
    ],
    steps: [
      'Mix wheat flour with ghee, spices to make baati dough',
      'Shape into balls and bake until golden brown',
      'Cook mixed dals with spices until thick',
      'Prepare churma by mixing crushed baati with jaggery',
      'Serve hot baati with dal and sweet churma'
    ],
    calories: 520,
    macros: { protein: 16, carbs: 68, fat: 24 },
    culturalFact: 'Dal Baati Churma is the signature dish of Rajasthan, representing the state\'s royal heritage. It was traditionally prepared for kings and warriors.',
    substitutions: {
      'ghee': 'oil for lighter version',
      'jaggery': 'sugar for churma'
    },
    isOfflineAvailable: true,
    tags: ['Rajasthani', 'Royal', 'Traditional', 'Festive'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Gangaur',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '11',
    title: 'Bengali Fish Curry (Machher Jhol)',
    cuisine: 'Bengali',
    state: 'West Bengal',
    city: 'Kolkata',
    region: 'East',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 40,
    prepTime: 20,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Rohu fish pieces',
      '2 Potatoes, cut',
      '2 tbsp Mustard oil',
      '1 tsp Panch phoron',
      '2 tbsp Mustard paste',
      '1 tsp Turmeric',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish with turmeric and salt',
      'Heat mustard oil, add panch phoron',
      'Add potatoes and cook until golden',
      'Add mustard paste, turmeric, and water',
      'Add fish pieces and simmer gently',
      'Garnish with coriander and serve with rice'
    ],
    calories: 420,
    macros: { protein: 35, carbs: 18, fat: 22 },
    culturalFact: 'Machher Jhol is a staple in Bengali households, especially during monsoon. The mustard-based gravy is believed to have medicinal properties.',
    substitutions: {
      'rohu fish': 'any freshwater fish',
      'mustard oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Bengali', 'Fish', 'Mustard', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '12',
    title: 'Gujarati Dhokla',
    cuisine: 'Gujarati',
    state: 'Gujarat',
    city: 'Ahmedabad',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    cookingTime: 25,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Snacks',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Gram flour (besan)',
      '1 cup Yogurt',
      '1 tsp Eno fruit salt',
      '1 tsp Ginger paste',
      '1 tsp Green chili paste',
      '1 tsp Sugar',
      '1/2 tsp Salt',
      'For tempering: Oil, mustard seeds, curry leaves'
    ],
    steps: [
      'Mix gram flour with yogurt, ginger, chili paste',
      'Add sugar, salt, and mix well',
      'Add Eno fruit salt and mix quickly',
      'Pour into greased plate and steam for 15 minutes',
      'Prepare tempering with oil, mustard, curry leaves',
      'Pour tempering over dhokla and cut into pieces'
    ],
    calories: 280,
    macros: { protein: 12, carbs: 42, fat: 8 },
    culturalFact: 'Dhokla is a traditional Gujarati snack that originated in the 12th century. It\'s a perfect example of Gujarati cuisine\'s emphasis on healthy, steamed food.',
    substitutions: {
      'eno fruit salt': 'baking soda',
      'gram flour': 'rice flour for different texture'
    },
    isOfflineAvailable: true,
    tags: ['Gujarati', 'Steamed', 'Healthy', 'Snack'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: true
  },
  {
    id: '13',
    title: 'Kashmiri Rogan Josh',
    cuisine: 'Kashmiri',
    state: 'Jammu & Kashmir',
    city: 'Srinagar',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 120,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Mutton pieces',
      '2 tbsp Mustard oil',
      '2 tbsp Kashmiri red chili powder',
      '1 tbsp Ginger powder',
      '1 tbsp Fennel powder',
      '1 cup Yogurt',
      '2 tbsp Ghee',
      'Saffron strands'
    ],
    steps: [
      'Marinate mutton with yogurt and spices for 2 hours',
      'Heat mustard oil, add marinated mutton',
      'Cook on high heat until browned',
      'Add water and simmer for 1.5 hours',
      'Add saffron and cook until tender',
      'Finish with ghee and serve with rice'
    ],
    calories: 580,
    macros: { protein: 45, carbs: 8, fat: 38 },
    culturalFact: 'Rogan Josh is a signature dish of Kashmiri cuisine, introduced by Persian invaders. The name means "red oil" referring to the red color from Kashmiri chilies.',
    substitutions: {
      'mutton': 'lamb or beef',
      'mustard oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Kashmiri', 'Mutton', 'Spicy', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Eid',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '14',
    title: 'Tamil Nadu Pongal',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 35,
    prepTime: 15,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Rice',
      '1/2 cup Moong dal',
      '2 tbsp Ghee',
      '1 tsp Black pepper',
      '1 tsp Cumin seeds',
      '1 tsp Ginger',
      'Curry leaves',
      'Cashew nuts'
    ],
    steps: [
      'Wash rice and dal together',
      'Heat ghee, add pepper, cumin, ginger',
      'Add rice-dal mixture and water',
      'Pressure cook for 3 whistles',
      'Mash slightly and add more ghee',
      'Garnish with cashews and serve hot'
    ],
    calories: 420,
    macros: { protein: 14, carbs: 68, fat: 12 },
    culturalFact: 'Pongal is a traditional Tamil breakfast dish, especially prepared during the Pongal festival. The word "Pongal" means "to boil over" symbolizing prosperity.',
    substitutions: {
      'moong dal': 'toor dal',
      'ghee': 'oil for vegan version'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Breakfast', 'Festive', 'Comfort'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: true,
    festival: 'Pongal',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '15',
    title: 'Maharashtrian Vada Pav',
    cuisine: 'Maharashtrian',
    state: 'Maharashtra',
    city: 'Mumbai',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    cookingTime: 30,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Snacks',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '4 Potatoes, boiled and mashed',
      '2 tbsp Ginger-garlic paste',
      '1 tsp Turmeric',
      '1 tsp Red chili powder',
      '1 cup Gram flour',
      '4 Pav bread',
      'Green chutney',
      'Garlic chutney'
    ],
    steps: [
      'Mix mashed potatoes with spices and ginger-garlic paste',
      'Shape into patties and coat with gram flour batter',
      'Deep fry until golden brown',
      'Toast pav bread with butter',
      'Spread chutneys and place vada',
      'Serve hot with fried green chilies'
    ],
    calories: 380,
    macros: { protein: 12, carbs: 58, fat: 14 },
    culturalFact: 'Vada Pav is Mumbai\'s most popular street food, often called the "poor man\'s burger". It was invented in the 1960s and has become a symbol of Mumbai\'s fast-paced life.',
    substitutions: {
      'potatoes': 'sweet potatoes for variation',
      'pav': 'any bread or bun'
    },
    isOfflineAvailable: true,
    tags: ['Maharashtrian', 'Street Food', 'Spicy', 'Popular'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: false,
    isStreetFood: true
  },
  {
    id: '16',
    title: 'Punjabi Sarson da Saag',
    cuisine: 'Punjabi',
    state: 'Punjab',
    city: 'Amritsar',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 60,
    prepTime: 20,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '500g Mustard greens',
      '250g Spinach',
      '2 tbsp Ghee',
      '1 tbsp Ginger-garlic paste',
      '1 tsp Red chili powder',
      '1 tsp Garam masala',
      '1 cup Makki ki roti',
      'Fresh butter'
    ],
    steps: [
      'Wash and chop mustard greens and spinach',
      'Pressure cook with water until soft',
      'Blend to smooth paste',
      'Heat ghee, add ginger-garlic paste',
      'Add greens paste and spices',
      'Simmer for 15 minutes, finish with butter'
    ],
    calories: 320,
    macros: { protein: 16, carbs: 28, fat: 18 },
    culturalFact: 'Sarson da Saag is a winter specialty in Punjab, traditionally served with makki ki roti. The dish represents the agricultural heritage of Punjab.',
    substitutions: {
      'mustard greens': 'spinach only',
      'makki ki roti': 'regular roti'
    },
    isOfflineAvailable: true,
    tags: ['Punjabi', 'Winter', 'Traditional', 'Healthy'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '17',
    title: 'Karnataka Bisi Bele Bath',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Bangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 50,
    prepTime: 25,
    spiceLevel: 'Spicy',
    effort: 'Hard',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Rice',
      '1/2 cup Toor dal',
      '2 cups Mixed vegetables',
      '2 tbsp Bisi bele bath powder',
      '1 cup Tamarind water',
      '2 tbsp Ghee',
      'Curry leaves',
      'Cashew nuts'
    ],
    steps: [
      'Cook rice and dal separately',
      'Cook vegetables with spices',
      'Mix rice, dal, and vegetables',
      'Add tamarind water and simmer',
      'Add bisi bele bath powder',
      'Finish with ghee and garnish'
    ],
    calories: 480,
    macros: { protein: 18, carbs: 72, fat: 14 },
    culturalFact: 'Bisi Bele Bath means "hot lentil rice" in Kannada. It\'s a traditional one-pot meal from Karnataka, often served during festivals and special occasions.',
    substitutions: {
      'toor dal': 'moong dal',
      'bisi bele bath powder': 'sambar powder'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'One-pot', 'Spicy', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Ugadi',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '18',
    title: 'Odisha Pakhala',
    cuisine: 'Odia',
    state: 'Odisha',
    city: 'Bhubaneswar',
    region: 'East',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 15,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Cooked rice',
      '4 cups Water',
      '1 cup Curd',
      '1 tsp Salt',
      '1 tsp Roasted cumin powder',
      'Fresh coriander',
      'Fried fish (optional)',
      'Green chilies'
    ],
    steps: [
      'Mix cooked rice with water and curd',
      'Add salt and let it ferment for 4-6 hours',
      'Add roasted cumin powder',
      'Garnish with coriander and chilies',
      'Serve with fried fish or vegetables',
      'Best served chilled'
    ],
    calories: 280,
    macros: { protein: 8, carbs: 52, fat: 4 },
    culturalFact: 'Pakhala is a traditional summer dish from Odisha, dating back to ancient times. It\'s a cooling fermented rice dish that helps beat the summer heat.',
    substitutions: {
      'curd': 'buttermilk',
      'fried fish': 'fried vegetables'
    },
    isOfflineAvailable: true,
    tags: ['Odia', 'Summer', 'Fermented', 'Cooling'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '19',
    title: 'Himachali Siddu',
    cuisine: 'Himachali',
    state: 'Himachal Pradesh',
    city: 'Shimla',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
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
    calories: 580,
    macros: { protein: 16, carbs: 68, fat: 28 },
    culturalFact: 'Siddu is a traditional steamed bread from Himachal Pradesh, often served during festivals and special occasions. It represents the mountain state\'s unique culinary traditions.',
    substitutions: {
      'poppy seeds': 'sesame seeds or nuts',
      'jaggery': 'brown sugar or honey'
    },
    isOfflineAvailable: true,
    tags: ['Himachali', 'Steamed', 'Festive', 'Sweet'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Diwali',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '20',
    title: 'Goan Fish Curry',
    cuisine: 'Goan',
    state: 'Goa',
    city: 'Panaji',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '2 tbsp Goan fish curry masala',
      '1 cup Tamarind water',
      '2 tbsp Ginger-garlic paste',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish with ginger-garlic paste and spices',
      'Heat coconut oil, add curry leaves',
      'Add fish curry masala and cook',
      'Add coconut milk and tamarind water',
      'Add fish pieces and simmer gently',
      'Garnish with coriander and serve with rice'
    ],
    calories: 420,
    macros: { protein: 38, carbs: 12, fat: 24 },
    culturalFact: 'Goan Fish Curry reflects the state\'s Portuguese influence and coastal heritage. The coconut-based gravy with tamarind creates a perfect balance of flavors.',
    substitutions: {
      'fish': 'prawns or chicken',
      'coconut oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Goan', 'Fish', 'Coastal', 'Spicy'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '21',
    title: 'Uttar Pradesh Awadhi Biryani',
    cuisine: 'Awadhi',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 120,
    prepTime: 45,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Basmati rice',
      '750g Mutton pieces',
      '1 cup Yogurt',
      '2 tbsp Ghee',
      '1 cup Fried onions',
      'Saffron soaked in milk',
      'Awadhi biryani masala',
      'Fresh mint and coriander'
    ],
    steps: [
      'Marinate mutton with yogurt and Awadhi masala for 4 hours',
      'Cook rice with whole spices until 70% done',
      'Layer marinated mutton at bottom of heavy pot',
      'Layer partially cooked rice over mutton',
      'Sprinkle fried onions, mint, coriander, and saffron',
      'Seal with dough and cook on dum for 45 minutes'
    ],
    calories: 650,
    macros: { protein: 32, carbs: 68, fat: 22 },
    culturalFact: 'Awadhi Biryani from Lucknow represents the royal Nawabi cuisine. The dum cooking method and delicate spices reflect the sophisticated taste of the Awadh region.',
    substitutions: {
      'mutton': 'chicken or paneer',
      'ghee': 'refined oil for lighter version'
    },
    isOfflineAvailable: true,
    tags: ['Awadhi', 'Royal', 'Dum Cooking', 'Festive'],
    servings: 8,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Eid',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '22',
    title: 'Andhra Pradesh Gongura Pachadi',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Spicy',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Gongura leaves (sorrel)',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '2 tbsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Wash and chop gongura leaves',
      'Heat oil, add mustard seeds and urad dal',
      'Add onions and sauté until golden',
      'Add gongura leaves and cook until soft',
      'Add red chili powder and salt',
      'Cook until oil separates, garnish with coriander'
    ],
    calories: 180,
    macros: { protein: 6, carbs: 18, fat: 10 },
    culturalFact: 'Gongura Pachadi is a traditional Andhra pickle made from sorrel leaves. The tangy taste and high vitamin C content make it a summer favorite.',
    substitutions: {
      'gongura': 'spinach with tamarind',
      'red chili powder': 'green chilies'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Pickle', 'Tangy', 'Traditional'],
    servings: 6,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '23',
    title: 'Jharkhand Dhuska',
    cuisine: 'Jharkhandi',
    state: 'Jharkhand',
    city: 'Ranchi',
    region: 'East',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 30,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice',
      '1 cup Chana dal',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Soak rice and chana dal for 4-6 hours',
      'Grind to coarse paste with onions and chilies',
      'Add salt and mix well',
      'Heat oil in pan, add cumin seeds',
      'Pour batter and cook like pancake',
      'Serve hot with chutney or curry'
    ],
    calories: 320,
    macros: { protein: 12, carbs: 52, fat: 8 },
    culturalFact: 'Dhuska is a traditional breakfast dish from Jharkhand, made with rice and chana dal. It\'s a staple food for tribal communities in the region.',
    substitutions: {
      'chana dal': 'moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Jharkhandi', 'Breakfast', 'Tribal', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '24',
    title: 'Chhattisgarh Chila',
    cuisine: 'Chhattisgarhi',
    state: 'Chhattisgarh',
    city: 'Raipur',
    region: 'Central',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 20,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice flour',
      '1 cup Besan (gram flour)',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Mix rice flour and besan with water',
      'Add chopped onions, chilies, and coriander',
      'Add salt and cumin seeds',
      'Heat oil in pan',
      'Pour batter and cook like thin pancake',
      'Serve hot with chutney'
    ],
    calories: 280,
    macros: { protein: 10, carbs: 48, fat: 6 },
    culturalFact: 'Chila is a traditional breakfast dish from Chhattisgarh, similar to dosa but made with rice flour and besan. It\'s a quick and nutritious morning meal.',
    substitutions: {
      'rice flour': 'wheat flour',
      'besan': 'corn flour'
    },
    isOfflineAvailable: true,
    tags: ['Chhattisgarhi', 'Breakfast', 'Quick', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '25',
    title: 'Manipur Eromba',
    cuisine: 'Manipuri',
    state: 'Manipur',
    city: 'Imphal',
    region: 'Northeast',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 35,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Mixed vegetables',
      '1 cup Fermented fish (ngari)',
      '2 tbsp Oil',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Green chilies',
      'Fresh coriander',
      'Bamboo shoots'
    ],
    steps: [
      'Boil mixed vegetables until soft',
      'Mash vegetables to coarse paste',
      'Heat oil, add fermented fish',
      'Add mashed vegetables and spices',
      'Cook until well combined',
      'Garnish with coriander and serve'
    ],
    calories: 220,
    macros: { protein: 14, carbs: 24, fat: 8 },
    culturalFact: 'Eromba is a traditional Manipuri dish made with boiled vegetables and fermented fish. It represents the unique culinary heritage of the Northeast.',
    substitutions: {
      'fermented fish': 'soy sauce or miso paste',
      'bamboo shoots': 'bamboo shoot pickle'
    },
    isOfflineAvailable: true,
    tags: ['Manipuri', 'Fermented', 'Spicy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '26',
    title: 'Meghalaya Jadoh',
    cuisine: 'Khasi',
    state: 'Meghalaya',
    city: 'Shillong',
    region: 'Northeast',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 90,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Pork with fat',
      '2 cups Rice',
      '2 tbsp Oil',
      '1 cup Onions, chopped',
      '2 tbsp Ginger-garlic paste',
      '1 tsp Turmeric',
      '1 tsp Red chili powder',
      'Fresh coriander'
    ],
    steps: [
      'Cut pork into pieces with fat',
      'Heat oil, add onions and ginger-garlic paste',
      'Add pork pieces and cook until browned',
      'Add spices and cook until tender',
      'Add rice and water, cook until done',
      'Garnish with coriander and serve hot'
    ],
    calories: 580,
    macros: { protein: 42, carbs: 48, fat: 28 },
    culturalFact: 'Jadoh is a traditional Khasi dish from Meghalaya, made with pork and rice. It\'s a ceremonial dish often served during festivals and special occasions.',
    substitutions: {
      'pork': 'chicken or mutton',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Khasi', 'Pork', 'Ceremonial', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Christmas',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '27',
    title: 'Mizoram Bai',
    cuisine: 'Mizo',
    state: 'Mizoram',
    city: 'Aizawl',
    region: 'Northeast',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 60,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Mixed vegetables',
      '1 cup Rice',
      '2 tbsp Oil',
      '1 cup Onions, chopped',
      '1 tsp Ginger paste',
      '1 tsp Salt',
      'Fresh coriander',
      'Green chilies'
    ],
    steps: [
      'Wash and chop mixed vegetables',
      'Heat oil, add onions and ginger',
      'Add vegetables and cook until soft',
      'Add rice and water',
      'Cook until rice is done and vegetables are tender',
      'Garnish with coriander and serve'
    ],
    calories: 320,
    macros: { protein: 8, carbs: 58, fat: 6 },
    culturalFact: 'Bai is a traditional Mizo dish made with vegetables and rice. It\'s a simple, nutritious meal that represents the agricultural lifestyle of Mizoram.',
    substitutions: {
      'mixed vegetables': 'any seasonal vegetables',
      'rice': 'quinoa or millet'
    },
    isOfflineAvailable: true,
    tags: ['Mizo', 'Vegetables', 'Simple', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '28',
    title: 'Nagaland Axone',
    cuisine: 'Naga',
    state: 'Nagaland',
    city: 'Kohima',
    region: 'Northeast',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Pork or chicken',
      '1 cup Fermented soybeans (axone)',
      '2 tbsp Oil',
      '1 cup Onions, chopped',
      '2 tbsp Ginger-garlic paste',
      '1 tsp Red chili powder',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Marinate meat with ginger-garlic paste',
      'Heat oil, add onions and cook until golden',
      'Add marinated meat and cook until browned',
      'Add fermented soybeans and spices',
      'Cook until meat is tender and well combined',
      'Garnish with coriander and serve with rice'
    ],
    calories: 420,
    macros: { protein: 38, carbs: 16, fat: 24 },
    culturalFact: 'Axone is a traditional Naga dish made with fermented soybeans. The strong, unique flavor represents the bold culinary traditions of Nagaland.',
    substitutions: {
      'fermented soybeans': 'miso paste or soy sauce',
      'pork': 'chicken or fish'
    },
    isOfflineAvailable: true,
    tags: ['Naga', 'Fermented', 'Spicy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '29',
    title: 'Tripura Mui Borok',
    cuisine: 'Tripuri',
    state: 'Tripura',
    city: 'Agartala',
    region: 'Northeast',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 40,
    prepTime: 15,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish or chicken',
      '1 cup Bamboo shoots',
      '2 tbsp Oil',
      '1 cup Onions, chopped',
      '1 tsp Ginger paste',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Clean and cut fish or chicken into pieces',
      'Heat oil, add onions and ginger',
      'Add fish/chicken and cook until browned',
      'Add bamboo shoots and spices',
      'Cook until tender and well combined',
      'Garnish with coriander and serve'
    ],
    calories: 280,
    macros: { protein: 32, carbs: 12, fat: 14 },
    culturalFact: 'Mui Borok is a traditional Tripuri dish that showcases the region\'s love for bamboo shoots and fresh ingredients. It represents the tribal culinary heritage.',
    substitutions: {
      'bamboo shoots': 'bamboo shoot pickle',
      'fish': 'paneer for vegetarian version'
    },
    isOfflineAvailable: true,
    tags: ['Tripuri', 'Bamboo', 'Tribal', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '30',
    title: 'Sikkim Phagshapa',
    cuisine: 'Sikkimese',
    state: 'Sikkim',
    city: 'Gangtok',
    region: 'Northeast',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 60,
    prepTime: 25,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Pork belly',
      '1 cup Radish, sliced',
      '2 tbsp Oil',
      '1 cup Onions, chopped',
      '1 tsp Ginger paste',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Cut pork belly into thin strips',
      'Heat oil, add onions and ginger',
      'Add pork strips and cook until fat renders',
      'Add radish and spices',
      'Cook until pork is tender and radish is soft',
      'Garnish with coriander and serve with rice'
    ],
    calories: 480,
    macros: { protein: 28, carbs: 16, fat: 36 },
    culturalFact: 'Phagshapa is a traditional Sikkimese dish made with pork belly and radish. It\'s a hearty dish that reflects the mountain state\'s culinary traditions.',
    substitutions: {
      'pork belly': 'chicken or mutton',
      'radish': 'turnip or carrot'
    },
    isOfflineAvailable: true,
    tags: ['Sikkimese', 'Pork', 'Mountain', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '31',
    title: 'Uttarakhand Kafuli',
    cuisine: 'Kumaoni',
    state: 'Uttarakhand',
    city: 'Dehradun',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 35,
    prepTime: 15,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '500g Spinach',
      '250g Fenugreek leaves',
      '2 tbsp Ghee',
      '1 cup Onions, chopped',
      '1 tsp Ginger paste',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Wash and chop spinach and fenugreek leaves',
      'Heat ghee, add cumin seeds',
      'Add onions and ginger, sauté until golden',
      'Add greens and cook until soft',
      'Add water and simmer for 10 minutes',
      'Garnish with coriander and serve with rice'
    ],
    calories: 220,
    macros: { protein: 12, carbs: 18, fat: 14 },
    culturalFact: 'Kafuli is a traditional Kumaoni dish from Uttarakhand, made with local greens. It\'s a nutritious dish that represents the mountain state\'s healthy eating habits.',
    substitutions: {
      'fenugreek leaves': 'spinach only',
      'ghee': 'oil for vegan version'
    },
    isOfflineAvailable: true,
    tags: ['Kumaoni', 'Greens', 'Healthy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '32',
    title: 'Haryana Bajra Khichdi',
    cuisine: 'Haryanvi',
    state: 'Haryana',
    city: 'Chandigarh',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Bajra (pearl millet)',
      '1/2 cup Moong dal',
      '2 tbsp Ghee',
      '1 cup Onions, chopped',
      '1 tsp Cumin seeds',
      '1 tsp Ginger paste',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Wash bajra and moong dal',
      'Heat ghee, add cumin seeds',
      'Add onions and ginger, sauté until golden',
      'Add bajra, dal, and water',
      'Pressure cook for 3-4 whistles',
      'Garnish with coriander and serve hot'
    ],
    calories: 380,
    macros: { protein: 16, carbs: 58, fat: 12 },
    culturalFact: 'Bajra Khichdi is a traditional Haryanvi dish made with pearl millet. It\'s a wholesome meal that represents the agricultural heritage of Haryana.',
    substitutions: {
      'bajra': 'jowar or ragi',
      'moong dal': 'toor dal'
    },
    isOfflineAvailable: true,
    tags: ['Haryanvi', 'Millet', 'Wholesome', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '33',
    title: 'Delhi Chole Bhature',
    cuisine: 'Delhi',
    state: 'Delhi',
    city: 'Delhi',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    cookingTime: 60,
    prepTime: 12,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Chickpeas',
      '2 cups Maida',
      '1 cup Yogurt',
      '2 tbsp Oil',
      '1 tsp Baking soda',
      '1 tsp Salt',
      'Chole masala',
      'Fresh coriander'
    ],
    steps: [
      'Soak chickpeas overnight, pressure cook with spices',
      'Mix maida, yogurt, oil, baking soda for bhature dough',
      'Let dough rest for 2 hours',
      'Shape bhature and deep fry until golden',
      'Prepare chole with masala and spices',
      'Serve hot with onion and pickle'
    ],
    calories: 520,
    macros: { protein: 18, carbs: 72, fat: 16 },
    culturalFact: 'Chole Bhature is Delhi\'s most popular breakfast dish, often called the "king of street food". It represents the city\'s love for hearty, flavorful meals.',
    substitutions: {
      'maida': 'whole wheat flour',
      'chickpeas': 'white beans'
    },
    isOfflineAvailable: true,
    tags: ['Delhi', 'Street Food', 'Breakfast', 'Popular'],
    servings: 6,
    difficulty: 'Long',
    isFestive: false,
    isHealthy: false,
    isStreetFood: true
  },
  {
    id: '34',
    title: 'Madhya Pradesh Poha Jalebi',
    cuisine: 'Madhya Pradesh',
    state: 'Madhya Pradesh',
    city: 'Indore',
    region: 'Central',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 30,
    prepTime: 15,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Poha (flattened rice)',
      '1 cup Maida',
      '1 cup Sugar syrup',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Turmeric',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Wash poha and set aside',
      'Heat oil, add mustard seeds and curry leaves',
      'Add poha, turmeric, and salt',
      'Cook until soft and fluffy',
      'Prepare jalebi with maida and sugar syrup',
      'Serve poha with hot jalebi'
    ],
    calories: 420,
    macros: { protein: 8, carbs: 68, fat: 12 },
    culturalFact: 'Poha Jalebi is Indore\'s signature breakfast combination. The savory poha with sweet jalebi represents the perfect balance of flavors.',
    substitutions: {
      'poha': 'quinoa flakes',
      'maida': 'whole wheat flour'
    },
    isOfflineAvailable: true,
    tags: ['Madhya Pradesh', 'Breakfast', 'Sweet-Savory', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: false,
    isStreetFood: true
  },
  {
    id: '35',
    title: 'Telangana Telangana Biryani',
    cuisine: 'Telangana',
    state: 'Telangana',
    city: 'Hyderabad',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 120,
    prepTime: 45,
    spiceLevel: 'Spicy',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Basmati rice',
      '750g Mutton pieces',
      '2 tbsp Ghee',
      '1 cup Fried onions',
      '1 cup Yogurt',
      'Telangana biryani masala',
      'Saffron soaked in milk',
      'Fresh mint and coriander'
    ],
    steps: [
      'Marinate mutton with yogurt and Telangana masala',
      'Cook rice with whole spices until 70% done',
      'Layer marinated mutton at bottom',
      'Layer partially cooked rice over mutton',
      'Sprinkle fried onions, mint, coriander, saffron',
      'Seal and cook on dum for 45 minutes'
    ],
    calories: 680,
    macros: { protein: 35, carbs: 72, fat: 24 },
    culturalFact: 'Telangana Biryani is a spicier version of Hyderabadi Biryani, reflecting the region\'s love for bold flavors and aromatic spices.',
    substitutions: {
      'mutton': 'chicken or paneer',
      'ghee': 'refined oil'
    },
    isOfflineAvailable: true,
    tags: ['Telangana', 'Spicy', 'Dum Cooking', 'Traditional'],
    servings: 8,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Eid',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '36',
    title: 'Kerala Malabar Biryani',
    cuisine: 'Malabar',
    state: 'Kerala',
    city: 'Kozhikode',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 90,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Basmati rice',
      '750g Chicken pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Fried onions',
      'Malabar biryani masala',
      'Saffron soaked in milk',
      'Fresh mint and coriander'
    ],
    steps: [
      'Marinate chicken with Malabar masala and coconut milk',
      'Cook rice with whole spices until 70% done',
      'Layer marinated chicken at bottom',
      'Layer partially cooked rice over chicken',
      'Sprinkle fried onions, mint, coriander, saffron',
      'Seal and cook on dum for 30 minutes'
    ],
    calories: 580,
    macros: { protein: 32, carbs: 68, fat: 18 },
    culturalFact: 'Malabar Biryani from Kerala reflects the region\'s coastal influences with coconut milk and aromatic spices. It\'s lighter than other biryani variants.',
    substitutions: {
      'chicken': 'fish or prawns',
      'coconut milk': 'regular milk'
    },
    isOfflineAvailable: true,
    tags: ['Malabar', 'Coastal', 'Coconut', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Eid',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '37',
    title: 'Tamil Nadu Chettinad Mushroom',
    cuisine: 'Chettinad',
    state: 'Tamil Nadu',
    city: 'Karaikudi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 40,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '500g Mushrooms',
      '2 tbsp Oil',
      '1 cup Onions, chopped',
      '2 tbsp Ginger-garlic paste',
      '1 cup Tomatoes, chopped',
      '2 tbsp Chettinad masala',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Clean and slice mushrooms',
      'Heat oil, add curry leaves and onions',
      'Add ginger-garlic paste and sauté',
      'Add mushrooms and Chettinad masala',
      'Add tomatoes and cook until soft',
      'Garnish with coriander and serve'
    ],
    calories: 180,
    macros: { protein: 8, carbs: 16, fat: 10 },
    culturalFact: 'Chettinad Mushroom is a vegetarian version of the famous Chettinad cuisine. The bold spices and aromatic flavors represent the region\'s rich culinary heritage.',
    substitutions: {
      'mushrooms': 'paneer or tofu',
      'chettinad masala': 'garam masala with extra spices'
    },
    isOfflineAvailable: true,
    tags: ['Chettinad', 'Vegetarian', 'Spicy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '38',
    title: 'Karnataka Mangalore Fish Curry',
    cuisine: 'Mangalorean',
    state: 'Karnataka',
    city: 'Mangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Onions, chopped',
      '2 tbsp Ginger-garlic paste',
      '1 cup Tomatoes, chopped',
      'Mangalorean fish curry masala',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish with ginger-garlic paste and spices',
      'Heat coconut oil, add onions and sauté',
      'Add tomatoes and Mangalorean masala',
      'Add coconut milk and simmer',
      'Add fish pieces and cook gently',
      'Garnish with coriander and serve with rice'
    ],
    calories: 320,
    macros: { protein: 28, carbs: 12, fat: 18 },
    culturalFact: 'Mangalore Fish Curry reflects the coastal Karnataka\'s love for coconut and spices. The tangy, spicy gravy is perfect with steamed rice.',
    substitutions: {
      'fish': 'prawns or chicken',
      'coconut oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Mangalorean', 'Fish', 'Coastal', 'Spicy'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '39',
    title: 'Andhra Pradesh Pesarattu',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Green gram (moong dal)',
      '1 cup Rice',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Soak green gram and rice for 4-6 hours',
      'Grind to smooth paste with onions and chilies',
      'Add salt and cumin seeds',
      'Heat oil in pan',
      'Pour batter and cook like dosa',
      'Serve hot with chutney'
    ],
    calories: 280,
    macros: { protein: 12, carbs: 42, fat: 8 },
    culturalFact: 'Pesarattu is a traditional Andhra breakfast made with green gram. It\'s a protein-rich alternative to regular dosa and is often served with upma.',
    substitutions: {
      'green gram': 'yellow moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Breakfast', 'Protein-rich', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '40',
    title: 'Kerala Appam with Ishtu',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Kochi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 50,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Raw rice',
      '1 cup Coconut milk',
      '1/2 cup Cooked rice',
      '1 tsp Yeast',
      '1 tsp Sugar',
      '1/2 tsp Salt',
      'For Ishtu: Mixed vegetables, Coconut milk, Spices'
    ],
    steps: [
      'Soak raw rice for 4-6 hours, grind with cooked rice',
      'Add coconut milk, yeast, sugar, and salt',
      'Ferment overnight or for 6-8 hours',
      'Heat appam pan, pour batter in circular motion',
      'Cover and cook until edges are crispy',
      'Serve hot with vegetable ishtu'
    ],
    calories: 380,
    macros: { protein: 8, carbs: 72, fat: 6 },
    culturalFact: 'Appam with Ishtu is a traditional Kerala breakfast combination. The soft, fluffy appam with creamy vegetable stew represents the state\'s love for coconut-based dishes.',
    substitutions: {
      'coconut milk': 'regular milk',
      'yeast': 'baking soda for quick version'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Breakfast', 'Fermented', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '41',
    title: 'Punjabi Amritsari Fish',
    cuisine: 'Punjabi',
    state: 'Punjab',
    city: 'Amritsar',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 35,
    prepTime: 20,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Snacks',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish fillets',
      '1 cup Gram flour (besan)',
      '2 tbsp Oil',
      '1 tsp Ajwain',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      '1/2 tsp Baking soda',
      'Fresh coriander'
    ],
    steps: [
      'Cut fish into small pieces',
      'Mix gram flour with spices and ajwain',
      'Add water to make thick batter',
      'Heat oil for deep frying',
      'Dip fish pieces in batter and fry until golden',
      'Serve hot with chutney and onion'
    ],
    calories: 380,
    macros: { protein: 28, carbs: 24, fat: 18 },
    culturalFact: 'Amritsari Fish is a famous street food from Amritsar. The crispy, spicy fish fritters represent the city\'s love for deep-fried snacks.',
    substitutions: {
      'fish': 'paneer or mushrooms',
      'gram flour': 'rice flour'
    },
    isOfflineAvailable: true,
    tags: ['Punjabi', 'Street Food', 'Crispy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: false,
    isStreetFood: true
  },
  {
    id: '42',
    title: 'Gujarat Khandvi',
    cuisine: 'Gujarati',
    state: 'Gujarat',
    city: 'Ahmedabad',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    cookingTime: 30,
    prepTime: 15,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Snacks',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Gram flour (besan)',
      '1 cup Yogurt',
      '1 cup Water',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Mix gram flour with yogurt and water',
      'Cook mixture on low heat until thick',
      'Spread on greased surface and roll',
      'Cut into pieces and roll tightly',
      'Prepare tempering with oil and spices',
      'Pour tempering over khandvi and serve'
    ],
    calories: 220,
    macros: { protein: 8, carbs: 28, fat: 10 },
    culturalFact: 'Khandvi is a traditional Gujarati snack made with gram flour and yogurt. The soft, melt-in-mouth texture represents the state\'s love for healthy, steamed food.',
    substitutions: {
      'yogurt': 'buttermilk',
      'gram flour': 'rice flour'
    },
    isOfflineAvailable: true,
    tags: ['Gujarati', 'Steamed', 'Healthy', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: true
  },
  {
    id: '43',
    title: 'Maharashtra Vada Pav',
    cuisine: 'Maharashtrian',
    state: 'Maharashtra',
    city: 'Mumbai',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    cookingTime: 30,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Snacks',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '4 Potatoes, boiled and mashed',
      '2 tbsp Ginger-garlic paste',
      '1 tsp Turmeric',
      '1 tsp Red chili powder',
      '1 cup Gram flour',
      '4 Pav bread',
      'Green chutney',
      'Garlic chutney'
    ],
    steps: [
      'Mix mashed potatoes with spices and ginger-garlic paste',
      'Shape into patties and coat with gram flour batter',
      'Deep fry until golden brown',
      'Toast pav bread with butter',
      'Spread chutneys and place vada',
      'Serve hot with fried green chilies'
    ],
    calories: 380,
    macros: { protein: 12, carbs: 58, fat: 14 },
    culturalFact: 'Vada Pav is Mumbai\'s most popular street food, often called the "poor man\'s burger". It was invented in the 1960s and has become a symbol of Mumbai\'s fast-paced life.',
    substitutions: {
      'potatoes': 'sweet potatoes for variation',
      'pav': 'any bread or bun'
    },
    isOfflineAvailable: true,
    tags: ['Maharashtrian', 'Street Food', 'Spicy', 'Popular'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: false,
    isStreetFood: true
  },
  {
    id: '44',
    title: 'Karnataka Bisi Bele Bath',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Bangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 50,
    prepTime: 25,
    spiceLevel: 'Spicy',
    effort: 'Hard',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Rice',
      '1/2 cup Toor dal',
      '2 cups Mixed vegetables',
      '2 tbsp Bisi bele bath powder',
      '1 cup Tamarind water',
      '2 tbsp Ghee',
      'Curry leaves',
      'Cashew nuts'
    ],
    steps: [
      'Cook rice and dal separately',
      'Cook vegetables with spices',
      'Mix rice, dal, and vegetables',
      'Add tamarind water and simmer',
      'Add bisi bele bath powder',
      'Finish with ghee and garnish'
    ],
    calories: 480,
    macros: { protein: 18, carbs: 72, fat: 14 },
    culturalFact: 'Bisi Bele Bath means "hot lentil rice" in Kannada. It\'s a traditional one-pot meal from Karnataka, often served during festivals and special occasions.',
    substitutions: {
      'toor dal': 'moong dal',
      'bisi bele bath powder': 'sambar powder'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'One-pot', 'Spicy', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Ugadi',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '45',
    title: 'Tamil Nadu Idli Sambar',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 40,
    prepTime: 8,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice',
      '1 cup Urad dal',
      '1/4 cup Chana dal',
      '1/2 tsp Fenugreek seeds',
      'For Sambar: Toor dal, Vegetables, Sambar powder',
      'Curry leaves',
      'Mustard seeds',
      'Fresh coriander'
    ],
    steps: [
      'Soak rice, urad dal, and fenugreek for 6-8 hours',
      'Grind urad dal to smooth paste, rice to coarse paste',
      'Mix both batters, add salt, and ferment overnight',
      'Steam idlis in idli moulds for 10-12 minutes',
      'Prepare sambar with dal and vegetables',
      'Serve hot idlis with sambar and chutney'
    ],
    calories: 320,
    macros: { protein: 12, carbs: 52, fat: 8 },
    culturalFact: 'Idli Sambar is a staple breakfast in Tamil Nadu. The soft, fluffy idlis with spicy sambar represent the perfect balance of nutrition and taste.',
    substitutions: {
      'urad dal': 'moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Breakfast', 'Fermented', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '46',
    title: 'Kerala Malabar Parotta',
    cuisine: 'Malabar',
    state: 'Kerala',
    city: 'Kozhikode',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '3 cups Maida',
      '1 cup Water',
      '2 tbsp Oil',
      '1 tsp Salt',
      '1 tsp Sugar',
      '1/2 cup Oil for layering',
      '1 cup Onions, chopped',
      'Fresh coriander'
    ],
    steps: [
      'Mix maida with water, oil, salt, and sugar',
      'Knead to smooth dough and rest for 2 hours',
      'Divide into balls and roll thin',
      'Apply oil and layer multiple times',
      'Roll into spiral and flatten',
      'Cook on tawa until golden brown'
    ],
    calories: 420,
    macros: { protein: 8, carbs: 68, fat: 16 },
    culturalFact: 'Malabar Parotta is a layered flatbread from Kerala\'s Malabar region. The flaky, soft texture makes it perfect for scooping up curries.',
    substitutions: {
      'maida': 'whole wheat flour',
      'oil': 'ghee for richer taste'
    },
    isOfflineAvailable: true,
    tags: ['Malabar', 'Layered', 'Flaky', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: false,
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '47',
    title: 'Punjabi Makki ki Roti',
    cuisine: 'Punjabi',
    state: 'Punjab',
    city: 'Amritsar',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Makki ka atta (corn flour)',
      '1 cup Warm water',
      '1 tsp Salt',
      '2 tbsp Ghee',
      '1 cup Sarson da saag',
      'Fresh butter',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Mix corn flour with warm water and salt',
      'Knead to smooth dough',
      'Divide into balls and roll thick',
      'Cook on tawa until golden spots appear',
      'Apply ghee and cook both sides',
      'Serve hot with sarson da saag'
    ],
    calories: 280,
    macros: { protein: 6, carbs: 48, fat: 8 },
    culturalFact: 'Makki ki Roti is a traditional Punjabi flatbread made with corn flour. It\'s typically served with sarson da saag during winter months.',
    substitutions: {
      'corn flour': 'jowar flour',
      'ghee': 'oil for vegan version'
    },
    isOfflineAvailable: true,
    tags: ['Punjabi', 'Winter', 'Corn', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '48',
    title: 'Gujarat Thepla',
    cuisine: 'Gujarati',
    state: 'Gujarat',
    city: 'Ahmedabad',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 30,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Methi leaves, chopped',
      '1 cup Yogurt',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Mix wheat flour with methi leaves and spices',
      'Add yogurt and oil, knead to smooth dough',
      'Divide into balls and roll thin',
      'Cook on tawa until golden brown',
      'Apply oil and cook both sides',
      'Serve hot with pickle or chutney'
    ],
    calories: 320,
    macros: { protein: 10, carbs: 52, fat: 10 },
    culturalFact: 'Thepla is a traditional Gujarati flatbread made with fenugreek leaves. It\'s a popular travel food and breakfast item in Gujarat.',
    substitutions: {
      'methi leaves': 'spinach or coriander',
      'yogurt': 'water for vegan version'
    },
    isOfflineAvailable: true,
    tags: ['Gujarati', 'Travel Food', 'Fenugreek', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '49',
    title: 'Maharashtra Puran Poli',
    cuisine: 'Maharashtrian',
    state: 'Maharashtra',
    city: 'Mumbai',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 60,
    prepTime: 30,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dessert',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Chana dal',
      '1 cup Jaggery',
      '2 tbsp Ghee',
      '1 tsp Cardamom powder',
      '1 tsp Nutmeg powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Cook chana dal until soft, mash with jaggery',
      'Add cardamom and nutmeg to dal mixture',
      'Prepare wheat flour dough with salt',
      'Stuff dal mixture in dough balls',
      'Roll thin and cook on tawa',
      'Apply ghee and serve hot'
    ],
    calories: 480,
    macros: { protein: 12, carbs: 72, fat: 16 },
    culturalFact: 'Puran Poli is a traditional Maharashtrian sweet flatbread, often served during festivals like Gudi Padwa and Holi.',
    substitutions: {
      'jaggery': 'brown sugar or honey',
      'chana dal': 'toor dal'
    },
    isOfflineAvailable: true,
    tags: ['Maharashtrian', 'Sweet', 'Festive', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Gudi Padwa',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '50',
    title: 'Karnataka Ragi Mudde',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Bangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 25,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Ragi flour',
      '2 cups Water',
      '1 tsp Salt',
      '1 cup Sambar',
      '1 cup Rasam',
      'Fresh coriander',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Boil water with salt',
      'Add ragi flour gradually while stirring',
      'Cook until mixture thickens',
      'Shape into balls while hot',
      'Serve with sambar and rasam',
      'Dip mudde in sambar and eat'
    ],
    calories: 280,
    macros: { protein: 8, carbs: 48, fat: 4 },
    culturalFact: 'Ragi Mudde is a traditional Karnataka dish made with finger millet. It\'s a nutritious, gluten-free alternative to rice.',
    substitutions: {
      'ragi flour': 'jowar or bajra flour',
      'sambar': 'any curry or dal'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'Millet', 'Healthy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '51',
    title: 'Tamil Nadu Rasam',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Medium',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Tamarind water',
      '1 cup Tomatoes, chopped',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '1 tsp Rasam powder',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Extract tamarind water and set aside',
      'Heat oil, add mustard and cumin seeds',
      'Add tomatoes and cook until soft',
      'Add tamarind water and rasam powder',
      'Simmer for 10 minutes',
      'Garnish with coriander and serve'
    ],
    calories: 120,
    macros: { protein: 4, carbs: 16, fat: 6 },
    culturalFact: 'Rasam is a traditional Tamil soup-like dish, often served with rice. It\'s known for its digestive properties and is a staple in Tamil households.',
    substitutions: {
      'tamarind': 'lemon juice',
      'rasam powder': 'sambar powder'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Soup', 'Digestive', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '52',
    title: 'Kerala Fish Molee',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Kochi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 40,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Onions, chopped',
      '1 tsp Ginger paste',
      '1 tsp Black pepper',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish with ginger and black pepper',
      'Heat coconut oil, add onions and sauté',
      'Add coconut milk and simmer',
      'Add fish pieces and cook gently',
      'Add curry leaves and simmer',
      'Garnish with coriander and serve'
    ],
    calories: 280,
    macros: { protein: 24, carbs: 8, fat: 18 },
    culturalFact: 'Fish Molee is a mild, coconut-based fish curry from Kerala. It reflects the state\'s Portuguese influences and coastal heritage.',
    substitutions: {
      'fish': 'prawns or chicken',
      'coconut oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Fish', 'Mild', 'Coastal'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '53',
    title: 'Andhra Pradesh Gongura Pachadi',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Spicy',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Gongura leaves (sorrel)',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '2 tbsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Wash and chop gongura leaves',
      'Heat oil, add mustard seeds and urad dal',
      'Add onions and sauté until golden',
      'Add gongura leaves and cook until soft',
      'Add red chili powder and salt',
      'Cook until oil separates, garnish with coriander'
    ],
    calories: 180,
    macros: { protein: 6, carbs: 18, fat: 10 },
    culturalFact: 'Gongura Pachadi is a traditional Andhra pickle made from sorrel leaves. The tangy taste and high vitamin C content make it a summer favorite.',
    substitutions: {
      'gongura': 'spinach with tamarind',
      'red chili powder': 'green chilies'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Pickle', 'Tangy', 'Traditional'],
    servings: 6,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '54',
    title: 'Karnataka Neer Dosa',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Mangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 20,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice',
      '1 cup Coconut milk',
      '1 tsp Salt',
      '1 cup Water',
      '2 tbsp Oil',
      '1 cup Coconut chutney',
      'Fresh coriander',
      'Green chilies'
    ],
    steps: [
      'Soak rice for 4-6 hours',
      'Grind to smooth paste with coconut milk',
      'Add water to make thin batter',
      'Heat non-stick pan',
      'Pour thin layer and cook until done',
      'Serve hot with coconut chutney'
    ],
    calories: 220,
    macros: { protein: 4, carbs: 42, fat: 4 },
    culturalFact: 'Neer Dosa is a thin, lacy dosa from coastal Karnataka. The name means "water dosa" referring to its thin, watery batter.',
    substitutions: {
      'coconut milk': 'regular milk',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'Thin', 'Lacy', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '55',
    title: 'Tamil Nadu Poriyal',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 20,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Mixed vegetables',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Chop vegetables into small pieces',
      'Heat oil, add mustard seeds and urad dal',
      'Add curry leaves and vegetables',
      'Add red chili powder and salt',
      'Cook until vegetables are tender',
      'Garnish with coriander and serve'
    ],
    calories: 160,
    macros: { protein: 6, carbs: 20, fat: 8 },
    culturalFact: 'Poriyal is a traditional Tamil vegetable stir-fry, often served as a side dish with rice and sambar. It\'s a simple, nutritious preparation.',
    substitutions: {
      'mixed vegetables': 'any seasonal vegetables',
      'urad dal': 'chana dal'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Stir-fry', 'Vegetables', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '56',
    title: 'Kerala Puttu Kadala',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Thiruvananthapuram',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice flour',
      '1 cup Coconut, grated',
      '1 cup Black chickpeas',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Layer rice flour and coconut in puttu maker',
      'Steam for 10-12 minutes until cooked',
      'Cook black chickpeas with spices',
      'Prepare tempering with oil and spices',
      'Mix chickpeas with tempering',
      'Serve hot puttu with kadala curry'
    ],
    calories: 420,
    macros: { protein: 16, carbs: 68, fat: 12 },
    culturalFact: 'Puttu Kadala is a traditional Kerala breakfast combination. The steamed rice cake with black chickpea curry represents the state\'s love for coconut and spices.',
    substitutions: {
      'black chickpeas': 'white chickpeas',
      'coconut': 'sesame seeds'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Breakfast', 'Steamed', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '57',
    title: 'Tamil Nadu Upma',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Semolina (rava)',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '1 cup Onions, chopped',
      '1 cup Mixed vegetables',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Dry roast semolina until golden',
      'Heat oil, add mustard seeds and urad dal',
      'Add onions and vegetables, sauté',
      'Add water and bring to boil',
      'Add roasted semolina and cook',
      'Garnish with coriander and serve'
    ],
    calories: 280,
    macros: { protein: 8, carbs: 48, fat: 8 },
    culturalFact: 'Upma is a traditional South Indian breakfast made with semolina. It\'s a quick, nutritious meal that\'s perfect for busy mornings.',
    substitutions: {
      'semolina': 'quinoa or oats',
      'vegetables': 'any seasonal vegetables'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Breakfast', 'Quick', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '58',
    title: 'Karnataka Bisi Bele Bath',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Bangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 50,
    prepTime: 25,
    spiceLevel: 'Spicy',
    effort: 'Hard',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Rice',
      '1/2 cup Toor dal',
      '2 cups Mixed vegetables',
      '2 tbsp Bisi bele bath powder',
      '1 cup Tamarind water',
      '2 tbsp Ghee',
      'Curry leaves',
      'Cashew nuts'
    ],
    steps: [
      'Cook rice and dal separately',
      'Cook vegetables with spices',
      'Mix rice, dal, and vegetables',
      'Add tamarind water and simmer',
      'Add bisi bele bath powder',
      'Finish with ghee and garnish'
    ],
    calories: 480,
    macros: { protein: 18, carbs: 72, fat: 14 },
    culturalFact: 'Bisi Bele Bath means "hot lentil rice" in Kannada. It\'s a traditional one-pot meal from Karnataka, often served during festivals and special occasions.',
    substitutions: {
      'toor dal': 'moong dal',
      'bisi bele bath powder': 'sambar powder'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'One-pot', 'Spicy', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Ugadi',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '59',
    title: 'Andhra Pradesh Pesarattu',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Green gram (moong dal)',
      '1 cup Rice',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Soak green gram and rice for 4-6 hours',
      'Grind to smooth paste with onions and chilies',
      'Add salt and cumin seeds',
      'Heat oil in pan',
      'Pour batter and cook like dosa',
      'Serve hot with chutney'
    ],
    calories: 280,
    macros: { protein: 12, carbs: 42, fat: 8 },
    culturalFact: 'Pesarattu is a traditional Andhra breakfast made with green gram. It\'s a protein-rich alternative to regular dosa and is often served with upma.',
    substitutions: {
      'green gram': 'yellow moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Breakfast', 'Protein-rich', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '60',
    title: 'Kerala Appam with Stew',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Kochi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 45,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Raw rice',
      '1 cup Coconut milk',
      '1/2 cup Cooked rice',
      '1 tsp Yeast',
      '1 tsp Sugar',
      '1/2 tsp Salt',
      'For Stew: Mixed vegetables, Coconut milk, Spices'
    ],
    steps: [
      'Soak raw rice for 4-6 hours, grind with cooked rice',
      'Add coconut milk, yeast, sugar, and salt',
      'Ferment overnight or for 6-8 hours',
      'Heat appam pan, pour batter in circular motion',
      'Cover and cook until edges are crispy',
      'Serve hot with vegetable stew'
    ],
    calories: 380,
    macros: { protein: 8, carbs: 72, fat: 6 },
    culturalFact: 'Appam with Stew is a traditional Kerala breakfast combination. The soft, fluffy appam with creamy vegetable stew represents the state\'s love for coconut-based dishes.',
    substitutions: {
      'coconut milk': 'regular milk',
      'yeast': 'baking soda for quick version'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Breakfast', 'Fermented', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '61',
    title: 'Tamil Nadu Sambar',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 35,
    prepTime: 15,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Toor dal',
      '2 cups Mixed vegetables',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '2 tbsp Sambar powder',
      '1 cup Tamarind water',
      'Fresh coriander'
    ],
    steps: [
      'Pressure cook toor dal until soft',
      'Cook vegetables separately',
      'Heat oil, add mustard and cumin seeds',
      'Add sambar powder and tamarind water',
      'Add cooked dal and vegetables',
      'Simmer for 10 minutes, garnish with coriander'
    ],
    calories: 220,
    macros: { protein: 12, carbs: 28, fat: 8 },
    culturalFact: 'Sambar is a staple in Tamil Nadu cuisine, often served with rice and idli. The tangy, spicy dal represents the perfect balance of flavors.',
    substitutions: {
      'toor dal': 'moong dal or masoor dal',
      'tamarind': 'lemon juice'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Dal', 'Tangy', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '62',
    title: 'Karnataka Mangalore Fish Curry',
    cuisine: 'Mangalorean',
    state: 'Karnataka',
    city: 'Mangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Onions, chopped',
      '2 tbsp Ginger-garlic paste',
      '1 cup Tomatoes, chopped',
      'Mangalorean fish curry masala',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish with ginger-garlic paste and spices',
      'Heat coconut oil, add onions and sauté',
      'Add tomatoes and Mangalorean masala',
      'Add coconut milk and simmer',
      'Add fish pieces and cook gently',
      'Garnish with coriander and serve with rice'
    ],
    calories: 320,
    macros: { protein: 28, carbs: 12, fat: 18 },
    culturalFact: 'Mangalore Fish Curry reflects the coastal Karnataka\'s love for coconut and spices. The tangy, spicy gravy is perfect with steamed rice.',
    substitutions: {
      'fish': 'prawns or chicken',
      'coconut oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Mangalorean', 'Fish', 'Coastal', 'Spicy'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '63',
    title: 'Andhra Pradesh Pesarattu',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Green gram (moong dal)',
      '1 cup Rice',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Soak green gram and rice for 4-6 hours',
      'Grind to smooth paste with onions and chilies',
      'Add salt and cumin seeds',
      'Heat oil in pan',
      'Pour batter and cook like dosa',
      'Serve hot with chutney'
    ],
    calories: 280,
    macros: { protein: 12, carbs: 42, fat: 8 },
    culturalFact: 'Pesarattu is a traditional Andhra breakfast made with green gram. It\'s a protein-rich alternative to regular dosa and is often served with upma.',
    substitutions: {
      'green gram': 'yellow moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Breakfast', 'Protein-rich', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '64',
    title: 'Kerala Malabar Biryani',
    cuisine: 'Malabar',
    state: 'Kerala',
    city: 'Kozhikode',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 90,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Basmati rice',
      '750g Chicken pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Fried onions',
      'Malabar biryani masala',
      'Saffron soaked in milk',
      'Fresh mint and coriander'
    ],
    steps: [
      'Marinate chicken with Malabar masala and coconut milk',
      'Cook rice with whole spices until 70% done',
      'Layer marinated chicken at bottom',
      'Layer partially cooked rice over chicken',
      'Sprinkle fried onions, mint, coriander, saffron',
      'Seal and cook on dum for 30 minutes'
    ],
    calories: 580,
    macros: { protein: 32, carbs: 68, fat: 18 },
    culturalFact: 'Malabar Biryani from Kerala reflects the region\'s coastal influences with coconut milk and aromatic spices. It\'s lighter than other biryani variants.',
    substitutions: {
      'chicken': 'fish or prawns',
      'coconut milk': 'regular milk'
    },
    isOfflineAvailable: true,
    tags: ['Malabar', 'Coastal', 'Coconut', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Eid',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '65',
    title: 'Tamil Nadu Chettinad Mushroom',
    cuisine: 'Chettinad',
    state: 'Tamil Nadu',
    city: 'Karaikudi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 40,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '500g Mushrooms',
      '2 tbsp Oil',
      '1 cup Onions, chopped',
      '2 tbsp Ginger-garlic paste',
      '1 cup Tomatoes, chopped',
      '2 tbsp Chettinad masala',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Clean and slice mushrooms',
      'Heat oil, add curry leaves and onions',
      'Add ginger-garlic paste and sauté',
      'Add mushrooms and Chettinad masala',
      'Add tomatoes and cook until soft',
      'Garnish with coriander and serve'
    ],
    calories: 180,
    macros: { protein: 8, carbs: 16, fat: 10 },
    culturalFact: 'Chettinad Mushroom is a vegetarian version of the famous Chettinad cuisine. The bold spices and aromatic flavors represent the region\'s rich culinary heritage.',
    substitutions: {
      'mushrooms': 'paneer or tofu',
      'chettinad masala': 'garam masala with extra spices'
    },
    isOfflineAvailable: true,
    tags: ['Chettinad', 'Vegetarian', 'Spicy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '66',
    title: 'Karnataka Neer Dosa',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Mangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 20,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice',
      '1 cup Coconut milk',
      '1 tsp Salt',
      '1 cup Water',
      '2 tbsp Oil',
      '1 cup Coconut chutney',
      'Fresh coriander',
      'Green chilies'
    ],
    steps: [
      'Soak rice for 4-6 hours',
      'Grind to smooth paste with coconut milk',
      'Add water to make thin batter',
      'Heat non-stick pan',
      'Pour thin layer and cook until done',
      'Serve hot with coconut chutney'
    ],
    calories: 220,
    macros: { protein: 4, carbs: 42, fat: 4 },
    culturalFact: 'Neer Dosa is a thin, lacy dosa from coastal Karnataka. The name means "water dosa" referring to its thin, watery batter.',
    substitutions: {
      'coconut milk': 'regular milk',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'Thin', 'Lacy', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '67',
    title: 'Tamil Nadu Poriyal',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 20,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Mixed vegetables',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Chop vegetables into small pieces',
      'Heat oil, add mustard seeds and urad dal',
      'Add curry leaves and vegetables',
      'Add red chili powder and salt',
      'Cook until vegetables are tender',
      'Garnish with coriander and serve'
    ],
    calories: 160,
    macros: { protein: 6, carbs: 20, fat: 8 },
    culturalFact: 'Poriyal is a traditional Tamil vegetable stir-fry, often served as a side dish with rice and sambar. It\'s a simple, nutritious preparation.',
    substitutions: {
      'mixed vegetables': 'any seasonal vegetables',
      'urad dal': 'chana dal'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Stir-fry', 'Vegetables', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '68',
    title: 'Kerala Fish Molee',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Kochi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 40,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Onions, chopped',
      '1 tsp Ginger paste',
      '1 tsp Black pepper',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish with ginger and black pepper',
      'Heat coconut oil, add onions and sauté',
      'Add coconut milk and simmer',
      'Add fish pieces and cook gently',
      'Add curry leaves and simmer',
      'Garnish with coriander and serve'
    ],
    calories: 280,
    macros: { protein: 24, carbs: 8, fat: 18 },
    culturalFact: 'Fish Molee is a mild, coconut-based fish curry from Kerala. It reflects the state\'s Portuguese influences and coastal heritage.',
    substitutions: {
      'fish': 'prawns or chicken',
      'coconut oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Fish', 'Mild', 'Coastal'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '69',
    title: 'Andhra Pradesh Gongura Pachadi',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Spicy',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Gongura leaves (sorrel)',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '2 tbsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Wash and chop gongura leaves',
      'Heat oil, add mustard seeds and urad dal',
      'Add onions and sauté until golden',
      'Add gongura leaves and cook until soft',
      'Add red chili powder and salt',
      'Cook until oil separates, garnish with coriander'
    ],
    calories: 180,
    macros: { protein: 6, carbs: 18, fat: 10 },
    culturalFact: 'Gongura Pachadi is a traditional Andhra pickle made from sorrel leaves. The tangy taste and high vitamin C content make it a summer favorite.',
    substitutions: {
      'gongura': 'spinach with tamarind',
      'red chili powder': 'green chilies'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Pickle', 'Tangy', 'Traditional'],
    servings: 6,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '70',
    title: 'Tamil Nadu Rasam',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Medium',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Tamarind water',
      '1 cup Tomatoes, chopped',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '1 tsp Rasam powder',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Extract tamarind water and set aside',
      'Heat oil, add mustard and cumin seeds',
      'Add tomatoes and cook until soft',
      'Add tamarind water and rasam powder',
      'Simmer for 10 minutes',
      'Garnish with coriander and serve'
    ],
    calories: 120,
    macros: { protein: 4, carbs: 16, fat: 6 },
    culturalFact: 'Rasam is a traditional Tamil soup-like dish, often served with rice. It\'s known for its digestive properties and is a staple in Tamil households.',
    substitutions: {
      'tamarind': 'lemon juice',
      'rasam powder': 'sambar powder'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Soup', 'Digestive', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '71',
    title: 'Karnataka Ragi Mudde',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Bangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 25,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Ragi flour',
      '2 cups Water',
      '1 tsp Salt',
      '1 cup Sambar',
      '1 cup Rasam',
      'Fresh coriander',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Boil water with salt',
      'Add ragi flour gradually while stirring',
      'Cook until mixture thickens',
      'Shape into balls while hot',
      'Serve with sambar and rasam',
      'Dip mudde in sambar and eat'
    ],
    calories: 280,
    macros: { protein: 8, carbs: 48, fat: 4 },
    culturalFact: 'Ragi Mudde is a traditional Karnataka dish made with finger millet. It\'s a nutritious, gluten-free alternative to rice.',
    substitutions: {
      'ragi flour': 'jowar or bajra flour',
      'sambar': 'any curry or dal'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'Millet', 'Healthy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '72',
    title: 'Maharashtra Puran Poli',
    cuisine: 'Maharashtrian',
    state: 'Maharashtra',
    city: 'Mumbai',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 60,
    prepTime: 30,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dessert',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Chana dal',
      '1 cup Jaggery',
      '2 tbsp Ghee',
      '1 tsp Cardamom powder',
      '1 tsp Nutmeg powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Cook chana dal until soft, mash with jaggery',
      'Add cardamom and nutmeg to dal mixture',
      'Prepare wheat flour dough with salt',
      'Stuff dal mixture in dough balls',
      'Roll thin and cook on tawa',
      'Apply ghee and serve hot'
    ],
    calories: 480,
    macros: { protein: 12, carbs: 72, fat: 16 },
    culturalFact: 'Puran Poli is a traditional Maharashtrian sweet flatbread, often served during festivals like Gudi Padwa and Holi.',
    substitutions: {
      'jaggery': 'brown sugar or honey',
      'chana dal': 'toor dal'
    },
    isOfflineAvailable: true,
    tags: ['Maharashtrian', 'Sweet', 'Festive', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Gudi Padwa',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '73',
    title: 'Gujarat Thepla',
    cuisine: 'Gujarati',
    state: 'Gujarat',
    city: 'Ahmedabad',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 30,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Methi leaves, chopped',
      '1 cup Yogurt',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Mix wheat flour with methi leaves and spices',
      'Add yogurt and oil, knead to smooth dough',
      'Divide into balls and roll thin',
      'Cook on tawa until golden brown',
      'Apply oil and cook both sides',
      'Serve hot with pickle or chutney'
    ],
    calories: 320,
    macros: { protein: 10, carbs: 52, fat: 10 },
    culturalFact: 'Thepla is a traditional Gujarati flatbread made with fenugreek leaves. It\'s a popular travel food and breakfast item in Gujarat.',
    substitutions: {
      'methi leaves': 'spinach or coriander',
      'yogurt': 'water for vegan version'
    },
    isOfflineAvailable: true,
    tags: ['Gujarati', 'Travel Food', 'Fenugreek', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '74',
    title: 'Punjabi Makki ki Roti',
    cuisine: 'Punjabi',
    state: 'Punjab',
    city: 'Amritsar',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Makki ka atta (corn flour)',
      '1 cup Warm water',
      '1 tsp Salt',
      '2 tbsp Ghee',
      '1 cup Sarson da saag',
      'Fresh butter',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Mix corn flour with warm water and salt',
      'Knead to smooth dough',
      'Divide into balls and roll thick',
      'Cook on tawa until golden spots appear',
      'Apply ghee and cook both sides',
      'Serve hot with sarson da saag'
    ],
    calories: 280,
    macros: { protein: 6, carbs: 48, fat: 8 },
    culturalFact: 'Makki ki Roti is a traditional Punjabi flatbread made with corn flour. It\'s typically served with sarson da saag during winter months.',
    substitutions: {
      'corn flour': 'jowar flour',
      'ghee': 'oil for vegan version'
    },
    isOfflineAvailable: true,
    tags: ['Punjabi', 'Winter', 'Corn', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '75',
    title: 'Kerala Malabar Parotta',
    cuisine: 'Malabar',
    state: 'Kerala',
    city: 'Kozhikode',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '3 cups Maida',
      '1 cup Water',
      '2 tbsp Oil',
      '1 tsp Salt',
      '1 tsp Sugar',
      '1/2 cup Oil for layering',
      '1 cup Onions, chopped',
      'Fresh coriander'
    ],
    steps: [
      'Mix maida with water, oil, salt, and sugar',
      'Knead to smooth dough and rest for 2 hours',
      'Divide into balls and roll thin',
      'Apply oil and layer multiple times',
      'Roll into spiral and flatten',
      'Cook on tawa until golden brown'
    ],
    calories: 420,
    macros: { protein: 8, carbs: 68, fat: 16 },
    culturalFact: 'Malabar Parotta is a layered flatbread from Kerala\'s Malabar region. The flaky, soft texture makes it perfect for scooping up curries.',
    substitutions: {
      'maida': 'whole wheat flour',
      'oil': 'ghee for richer taste'
    },
    isOfflineAvailable: true,
    tags: ['Malabar', 'Layered', 'Flaky', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: false,
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '76',
    title: 'Tamil Nadu Idli Sambar',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 40,
    prepTime: 8,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice',
      '1 cup Urad dal',
      '1/4 cup Chana dal',
      '1/2 tsp Fenugreek seeds',
      'For Sambar: Toor dal, Vegetables, Sambar powder',
      'Curry leaves',
      'Mustard seeds',
      'Fresh coriander'
    ],
    steps: [
      'Soak rice, urad dal, and fenugreek for 6-8 hours',
      'Grind urad dal to smooth paste, rice to coarse paste',
      'Mix both batters, add salt, and ferment overnight',
      'Steam idlis in idli moulds for 10-12 minutes',
      'Prepare sambar with dal and vegetables',
      'Serve hot idlis with sambar and chutney'
    ],
    calories: 320,
    macros: { protein: 12, carbs: 52, fat: 8 },
    culturalFact: 'Idli Sambar is a staple breakfast in Tamil Nadu. The soft, fluffy idlis with spicy sambar represent the perfect balance of nutrition and taste.',
    substitutions: {
      'urad dal': 'moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Breakfast', 'Fermented', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '77',
    title: 'Karnataka Bisi Bele Bath',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Bangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 50,
    prepTime: 25,
    spiceLevel: 'Spicy',
    effort: 'Hard',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Rice',
      '1/2 cup Toor dal',
      '2 cups Mixed vegetables',
      '2 tbsp Bisi bele bath powder',
      '1 cup Tamarind water',
      '2 tbsp Ghee',
      'Curry leaves',
      'Cashew nuts'
    ],
    steps: [
      'Cook rice and dal separately',
      'Cook vegetables with spices',
      'Mix rice, dal, and vegetables',
      'Add tamarind water and simmer',
      'Add bisi bele bath powder',
      'Finish with ghee and garnish'
    ],
    calories: 480,
    macros: { protein: 18, carbs: 72, fat: 14 },
    culturalFact: 'Bisi Bele Bath means "hot lentil rice" in Kannada. It\'s a traditional one-pot meal from Karnataka, often served during festivals and special occasions.',
    substitutions: {
      'toor dal': 'moong dal',
      'bisi bele bath powder': 'sambar powder'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'One-pot', 'Spicy', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Ugadi',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '78',
    title: 'Andhra Pradesh Pesarattu',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Green gram (moong dal)',
      '1 cup Rice',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Soak green gram and rice for 4-6 hours',
      'Grind to smooth paste with onions and chilies',
      'Add salt and cumin seeds',
      'Heat oil in pan',
      'Pour batter and cook like dosa',
      'Serve hot with chutney'
    ],
    calories: 280,
    macros: { protein: 12, carbs: 42, fat: 8 },
    culturalFact: 'Pesarattu is a traditional Andhra breakfast made with green gram. It\'s a protein-rich alternative to regular dosa and is often served with upma.',
    substitutions: {
      'green gram': 'yellow moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Breakfast', 'Protein-rich', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '79',
    title: 'Kerala Appam with Stew',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Kochi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 45,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Raw rice',
      '1 cup Coconut milk',
      '1/2 cup Cooked rice',
      '1 tsp Yeast',
      '1 tsp Sugar',
      '1/2 tsp Salt',
      'For Stew: Mixed vegetables, Coconut milk, Spices'
    ],
    steps: [
      'Soak raw rice for 4-6 hours, grind with cooked rice',
      'Add coconut milk, yeast, sugar, and salt',
      'Ferment overnight or for 6-8 hours',
      'Heat appam pan, pour batter in circular motion',
      'Cover and cook until edges are crispy',
      'Serve hot with vegetable stew'
    ],
    calories: 380,
    macros: { protein: 8, carbs: 72, fat: 6 },
    culturalFact: 'Appam with Stew is a traditional Kerala breakfast combination. The soft, fluffy appam with creamy vegetable stew represents the state\'s love for coconut-based dishes.',
    substitutions: {
      'coconut milk': 'regular milk',
      'yeast': 'baking soda for quick version'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Breakfast', 'Fermented', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '80',
    title: 'Tamil Nadu Upma',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Semolina (rava)',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '1 cup Onions, chopped',
      '1 cup Mixed vegetables',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Dry roast semolina until golden',
      'Heat oil, add mustard seeds and urad dal',
      'Add onions and vegetables, sauté',
      'Add water and bring to boil',
      'Add roasted semolina and cook',
      'Garnish with coriander and serve'
    ],
    calories: 280,
    macros: { protein: 8, carbs: 48, fat: 8 },
    culturalFact: 'Upma is a traditional South Indian breakfast made with semolina. It\'s a quick, nutritious meal that\'s perfect for busy mornings.',
    substitutions: {
      'semolina': 'quinoa or oats',
      'vegetables': 'any seasonal vegetables'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Breakfast', 'Quick', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '81',
    title: 'Kerala Puttu Kadala',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Thiruvananthapuram',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice flour',
      '1 cup Coconut, grated',
      '1 cup Black chickpeas',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Layer rice flour and coconut in puttu maker',
      'Steam for 10-12 minutes until cooked',
      'Cook black chickpeas with spices',
      'Prepare tempering with oil and spices',
      'Mix chickpeas with tempering',
      'Serve hot puttu with kadala curry'
    ],
    calories: 420,
    macros: { protein: 16, carbs: 68, fat: 12 },
    culturalFact: 'Puttu Kadala is a traditional Kerala breakfast combination. The steamed rice cake with black chickpea curry represents the state\'s love for coconut and spices.',
    substitutions: {
      'black chickpeas': 'white chickpeas',
      'coconut': 'sesame seeds'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Breakfast', 'Steamed', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '82',
    title: 'Tamil Nadu Sambar',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 35,
    prepTime: 15,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Toor dal',
      '2 cups Mixed vegetables',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '2 tbsp Sambar powder',
      '1 cup Tamarind water',
      'Fresh coriander'
    ],
    steps: [
      'Pressure cook toor dal until soft',
      'Cook vegetables separately',
      'Heat oil, add mustard and cumin seeds',
      'Add sambar powder and tamarind water',
      'Add cooked dal and vegetables',
      'Simmer for 10 minutes, garnish with coriander'
    ],
    calories: 220,
    macros: { protein: 12, carbs: 28, fat: 8 },
    culturalFact: 'Sambar is a staple in Tamil Nadu cuisine, often served with rice and idli. The tangy, spicy dal represents the perfect balance of flavors.',
    substitutions: {
      'toor dal': 'moong dal or masoor dal',
      'tamarind': 'lemon juice'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Dal', 'Tangy', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '83',
    title: 'Karnataka Mangalore Fish Curry',
    cuisine: 'Mangalorean',
    state: 'Karnataka',
    city: 'Mangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Onions, chopped',
      '2 tbsp Ginger-garlic paste',
      '1 cup Tomatoes, chopped',
      'Mangalorean fish curry masala',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish with ginger-garlic paste and spices',
      'Heat coconut oil, add onions and sauté',
      'Add tomatoes and Mangalorean masala',
      'Add coconut milk and simmer',
      'Add fish pieces and cook gently',
      'Garnish with coriander and serve with rice'
    ],
    calories: 320,
    macros: { protein: 28, carbs: 12, fat: 18 },
    culturalFact: 'Mangalore Fish Curry reflects the coastal Karnataka\'s love for coconut and spices. The tangy, spicy gravy is perfect with steamed rice.',
    substitutions: {
      'fish': 'prawns or chicken',
      'coconut oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Mangalorean', 'Fish', 'Coastal', 'Spicy'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '84',
    title: 'Andhra Pradesh Pesarattu',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Green gram (moong dal)',
      '1 cup Rice',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Soak green gram and rice for 4-6 hours',
      'Grind to smooth paste with onions and chilies',
      'Add salt and cumin seeds',
      'Heat oil in pan',
      'Pour batter and cook like dosa',
      'Serve hot with chutney'
    ],
    calories: 280,
    macros: { protein: 12, carbs: 42, fat: 8 },
    culturalFact: 'Pesarattu is a traditional Andhra breakfast made with green gram. It\'s a protein-rich alternative to regular dosa and is often served with upma.',
    substitutions: {
      'green gram': 'yellow moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Breakfast', 'Protein-rich', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '85',
    title: 'Kerala Malabar Biryani',
    cuisine: 'Malabar',
    state: 'Kerala',
    city: 'Kozhikode',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 90,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Basmati rice',
      '750g Chicken pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Fried onions',
      'Malabar biryani masala',
      'Saffron soaked in milk',
      'Fresh mint and coriander'
    ],
    steps: [
      'Marinate chicken with Malabar masala and coconut milk',
      'Cook rice with whole spices until 70% done',
      'Layer marinated chicken at bottom',
      'Layer partially cooked rice over chicken',
      'Sprinkle fried onions, mint, coriander, saffron',
      'Seal and cook on dum for 30 minutes'
    ],
    calories: 580,
    macros: { protein: 32, carbs: 68, fat: 18 },
    culturalFact: 'Malabar Biryani from Kerala reflects the region\'s coastal influences with coconut milk and aromatic spices. It\'s lighter than other biryani variants.',
    substitutions: {
      'chicken': 'fish or prawns',
      'coconut milk': 'regular milk'
    },
    isOfflineAvailable: true,
    tags: ['Malabar', 'Coastal', 'Coconut', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Eid',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '86',
    title: 'Tamil Nadu Chettinad Mushroom',
    cuisine: 'Chettinad',
    state: 'Tamil Nadu',
    city: 'Karaikudi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 40,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '500g Mushrooms',
      '2 tbsp Oil',
      '1 cup Onions, chopped',
      '2 tbsp Ginger-garlic paste',
      '1 cup Tomatoes, chopped',
      '2 tbsp Chettinad masala',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Clean and slice mushrooms',
      'Heat oil, add curry leaves and onions',
      'Add ginger-garlic paste and sauté',
      'Add mushrooms and Chettinad masala',
      'Add tomatoes and cook until soft',
      'Garnish with coriander and serve'
    ],
    calories: 180,
    macros: { protein: 8, carbs: 16, fat: 10 },
    culturalFact: 'Chettinad Mushroom is a vegetarian version of the famous Chettinad cuisine. The bold spices and aromatic flavors represent the region\'s rich culinary heritage.',
    substitutions: {
      'mushrooms': 'paneer or tofu',
      'chettinad masala': 'garam masala with extra spices'
    },
    isOfflineAvailable: true,
    tags: ['Chettinad', 'Vegetarian', 'Spicy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '87',
    title: 'Karnataka Neer Dosa',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Mangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 20,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice',
      '1 cup Coconut milk',
      '1 tsp Salt',
      '1 cup Water',
      '2 tbsp Oil',
      '1 cup Coconut chutney',
      'Fresh coriander',
      'Green chilies'
    ],
    steps: [
      'Soak rice for 4-6 hours',
      'Grind to smooth paste with coconut milk',
      'Add water to make thin batter',
      'Heat non-stick pan',
      'Pour thin layer and cook until done',
      'Serve hot with coconut chutney'
    ],
    calories: 220,
    macros: { protein: 4, carbs: 42, fat: 4 },
    culturalFact: 'Neer Dosa is a thin, lacy dosa from coastal Karnataka. The name means "water dosa" referring to its thin, watery batter.',
    substitutions: {
      'coconut milk': 'regular milk',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'Thin', 'Lacy', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '88',
    title: 'Tamil Nadu Poriyal',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 20,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Mixed vegetables',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Chop vegetables into small pieces',
      'Heat oil, add mustard seeds and urad dal',
      'Add curry leaves and vegetables',
      'Add red chili powder and salt',
      'Cook until vegetables are tender',
      'Garnish with coriander and serve'
    ],
    calories: 160,
    macros: { protein: 6, carbs: 20, fat: 8 },
    culturalFact: 'Poriyal is a traditional Tamil vegetable stir-fry, often served as a side dish with rice and sambar. It\'s a simple, nutritious preparation.',
    substitutions: {
      'mixed vegetables': 'any seasonal vegetables',
      'urad dal': 'chana dal'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Stir-fry', 'Vegetables', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '89',
    title: 'Kerala Fish Molee',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Kochi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 40,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Onions, chopped',
      '1 tsp Ginger paste',
      '1 tsp Black pepper',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish with ginger and black pepper',
      'Heat coconut oil, add onions and sauté',
      'Add coconut milk and simmer',
      'Add fish pieces and cook gently',
      'Add curry leaves and simmer',
      'Garnish with coriander and serve'
    ],
    calories: 280,
    macros: { protein: 24, carbs: 8, fat: 18 },
    culturalFact: 'Fish Molee is a mild, coconut-based fish curry from Kerala. It reflects the state\'s Portuguese influences and coastal heritage.',
    substitutions: {
      'fish': 'prawns or chicken',
      'coconut oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Fish', 'Mild', 'Coastal'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '90',
    title: 'Andhra Pradesh Gongura Pachadi',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Spicy',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Gongura leaves (sorrel)',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '2 tbsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Wash and chop gongura leaves',
      'Heat oil, add mustard seeds and urad dal',
      'Add onions and sauté until golden',
      'Add gongura leaves and cook until soft',
      'Add red chili powder and salt',
      'Cook until oil separates, garnish with coriander'
    ],
    calories: 180,
    macros: { protein: 6, carbs: 18, fat: 10 },
    culturalFact: 'Gongura Pachadi is a traditional Andhra pickle made from sorrel leaves. The tangy taste and high vitamin C content make it a summer favorite.',
    substitutions: {
      'gongura': 'spinach with tamarind',
      'red chili powder': 'green chilies'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Pickle', 'Tangy', 'Traditional'],
    servings: 6,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '91',
    title: 'Tamil Nadu Rasam',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Medium',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Tamarind water',
      '1 cup Tomatoes, chopped',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '1 tsp Rasam powder',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Extract tamarind water and set aside',
      'Heat oil, add mustard and cumin seeds',
      'Add tomatoes and cook until soft',
      'Add tamarind water and rasam powder',
      'Simmer for 10 minutes',
      'Garnish with coriander and serve'
    ],
    calories: 120,
    macros: { protein: 4, carbs: 16, fat: 6 },
    culturalFact: 'Rasam is a traditional Tamil soup-like dish, often served with rice. It\'s known for its digestive properties and is a staple in Tamil households.',
    substitutions: {
      'tamarind': 'lemon juice',
      'rasam powder': 'sambar powder'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Soup', 'Digestive', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '92',
    title: 'Karnataka Ragi Mudde',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Bangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 25,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Ragi flour',
      '2 cups Water',
      '1 tsp Salt',
      '1 cup Sambar',
      '1 cup Rasam',
      'Fresh coriander',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Boil water with salt',
      'Add ragi flour gradually while stirring',
      'Cook until mixture thickens',
      'Shape into balls while hot',
      'Serve with sambar and rasam',
      'Dip mudde in sambar and eat'
    ],
    calories: 280,
    macros: { protein: 8, carbs: 48, fat: 4 },
    culturalFact: 'Ragi Mudde is a traditional Karnataka dish made with finger millet. It\'s a nutritious, gluten-free alternative to rice.',
    substitutions: {
      'ragi flour': 'jowar or bajra flour',
      'sambar': 'any curry or dal'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'Millet', 'Healthy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '93',
    title: 'Maharashtra Puran Poli',
    cuisine: 'Maharashtrian',
    state: 'Maharashtra',
    city: 'Mumbai',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 60,
    prepTime: 30,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dessert',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Chana dal',
      '1 cup Jaggery',
      '2 tbsp Ghee',
      '1 tsp Cardamom powder',
      '1 tsp Nutmeg powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Cook chana dal until soft, mash with jaggery',
      'Add cardamom and nutmeg to dal mixture',
      'Prepare wheat flour dough with salt',
      'Stuff dal mixture in dough balls',
      'Roll thin and cook on tawa',
      'Apply ghee and serve hot'
    ],
    calories: 480,
    macros: { protein: 12, carbs: 72, fat: 16 },
    culturalFact: 'Puran Poli is a traditional Maharashtrian sweet flatbread, often served during festivals like Gudi Padwa and Holi.',
    substitutions: {
      'jaggery': 'brown sugar or honey',
      'chana dal': 'toor dal'
    },
    isOfflineAvailable: true,
    tags: ['Maharashtrian', 'Sweet', 'Festive', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Gudi Padwa',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '94',
    title: 'Gujarat Thepla',
    cuisine: 'Gujarati',
    state: 'Gujarat',
    city: 'Ahmedabad',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 30,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Methi leaves, chopped',
      '1 cup Yogurt',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Mix wheat flour with methi leaves and spices',
      'Add yogurt and oil, knead to smooth dough',
      'Divide into balls and roll thin',
      'Cook on tawa until golden brown',
      'Apply oil and cook both sides',
      'Serve hot with pickle or chutney'
    ],
    calories: 320,
    macros: { protein: 10, carbs: 52, fat: 10 },
    culturalFact: 'Thepla is a traditional Gujarati flatbread made with fenugreek leaves. It\'s a popular travel food and breakfast item in Gujarat.',
    substitutions: {
      'methi leaves': 'spinach or coriander',
      'yogurt': 'water for vegan version'
    },
    isOfflineAvailable: true,
    tags: ['Gujarati', 'Travel Food', 'Fenugreek', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '95',
    title: 'Punjabi Makki ki Roti',
    cuisine: 'Punjabi',
    state: 'Punjab',
    city: 'Amritsar',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Makki ka atta (corn flour)',
      '1 cup Warm water',
      '1 tsp Salt',
      '2 tbsp Ghee',
      '1 cup Sarson da saag',
      'Fresh butter',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Mix corn flour with warm water and salt',
      'Knead to smooth dough',
      'Divide into balls and roll thick',
      'Cook on tawa until golden spots appear',
      'Apply ghee and cook both sides',
      'Serve hot with sarson da saag'
    ],
    calories: 280,
    macros: { protein: 6, carbs: 48, fat: 8 },
    culturalFact: 'Makki ki Roti is a traditional Punjabi flatbread made with corn flour. It\'s typically served with sarson da saag during winter months.',
    substitutions: {
      'corn flour': 'jowar flour',
      'ghee': 'oil for vegan version'
    },
    isOfflineAvailable: true,
    tags: ['Punjabi', 'Winter', 'Corn', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '96',
    title: 'Kerala Malabar Parotta',
    cuisine: 'Malabar',
    state: 'Kerala',
    city: 'Kozhikode',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '3 cups Maida',
      '1 cup Water',
      '2 tbsp Oil',
      '1 tsp Salt',
      '1 tsp Sugar',
      '1/2 cup Oil for layering',
      '1 cup Onions, chopped',
      'Fresh coriander'
    ],
    steps: [
      'Mix maida with water, oil, salt, and sugar',
      'Knead to smooth dough and rest for 2 hours',
      'Divide into balls and roll thin',
      'Apply oil and layer multiple times',
      'Roll into spiral and flatten',
      'Cook on tawa until golden brown'
    ],
    calories: 420,
    macros: { protein: 8, carbs: 68, fat: 16 },
    culturalFact: 'Malabar Parotta is a layered flatbread from Kerala\'s Malabar region. The flaky, soft texture makes it perfect for scooping up curries.',
    substitutions: {
      'maida': 'whole wheat flour',
      'oil': 'ghee for richer taste'
    },
    isOfflineAvailable: true,
    tags: ['Malabar', 'Layered', 'Flaky', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: false,
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '97',
    title: 'Tamil Nadu Idli Sambar',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 40,
    prepTime: 8,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice',
      '1 cup Urad dal',
      '1/4 cup Chana dal',
      '1/2 tsp Fenugreek seeds',
      'For Sambar: Toor dal, Vegetables, Sambar powder',
      'Curry leaves',
      'Mustard seeds',
      'Fresh coriander'
    ],
    steps: [
      'Soak rice, urad dal, and fenugreek for 6-8 hours',
      'Grind urad dal to smooth paste, rice to coarse paste',
      'Mix both batters, add salt, and ferment overnight',
      'Steam idlis in idli moulds for 10-12 minutes',
      'Prepare sambar with dal and vegetables',
      'Serve hot idlis with sambar and chutney'
    ],
    calories: 320,
    macros: { protein: 12, carbs: 52, fat: 8 },
    culturalFact: 'Idli Sambar is a staple breakfast in Tamil Nadu. The soft, fluffy idlis with spicy sambar represent the perfect balance of nutrition and taste.',
    substitutions: {
      'urad dal': 'moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Breakfast', 'Fermented', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '98',
    title: 'Karnataka Bisi Bele Bath',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Bangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 50,
    prepTime: 25,
    spiceLevel: 'Spicy',
    effort: 'Hard',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Rice',
      '1/2 cup Toor dal',
      '2 cups Mixed vegetables',
      '2 tbsp Bisi bele bath powder',
      '1 cup Tamarind water',
      '2 tbsp Ghee',
      'Curry leaves',
      'Cashew nuts'
    ],
    steps: [
      'Cook rice and dal separately',
      'Cook vegetables with spices',
      'Mix rice, dal, and vegetables',
      'Add tamarind water and simmer',
      'Add bisi bele bath powder',
      'Finish with ghee and garnish'
    ],
    calories: 480,
    macros: { protein: 18, carbs: 72, fat: 14 },
    culturalFact: 'Bisi Bele Bath means "hot lentil rice" in Kannada. It\'s a traditional one-pot meal from Karnataka, often served during festivals and special occasions.',
    substitutions: {
      'toor dal': 'moong dal',
      'bisi bele bath powder': 'sambar powder'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'One-pot', 'Spicy', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Ugadi',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '99',
    title: 'Andhra Pradesh Pesarattu',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Green gram (moong dal)',
      '1 cup Rice',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Soak green gram and rice for 4-6 hours',
      'Grind to smooth paste with onions and chilies',
      'Add salt and cumin seeds',
      'Heat oil in pan',
      'Pour batter and cook like dosa',
      'Serve hot with chutney'
    ],
    calories: 280,
    macros: { protein: 12, carbs: 42, fat: 8 },
    culturalFact: 'Pesarattu is a traditional Andhra breakfast made with green gram. It\'s a protein-rich alternative to regular dosa and is often served with upma.',
    substitutions: {
      'green gram': 'yellow moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Breakfast', 'Protein-rich', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '100',
    title: 'Kerala Appam with Stew',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Kochi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 45,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Raw rice',
      '1 cup Coconut milk',
      '1/2 cup Cooked rice',
      '1 tsp Yeast',
      '1 tsp Sugar',
      '1/2 tsp Salt',
      'For Stew: Mixed vegetables, Coconut milk, Spices'
    ],
    steps: [
      'Soak raw rice for 4-6 hours, grind with cooked rice',
      'Add coconut milk, yeast, sugar, and salt',
      'Ferment overnight or for 6-8 hours',
      'Heat appam pan, pour batter in circular motion',
      'Cover and cook until edges are crispy',
      'Serve hot with vegetable stew'
    ],
    calories: 380,
    macros: { protein: 8, carbs: 72, fat: 6 },
    culturalFact: 'Appam with Stew is a traditional Kerala breakfast combination. The soft, fluffy appam with creamy vegetable stew represents the state\'s love for coconut-based dishes.',
    substitutions: {
      'coconut milk': 'regular milk',
      'yeast': 'baking soda for quick version'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Breakfast', 'Fermented', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '101',
    title: 'Tamil Nadu Upma',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Semolina (rava)',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '1 cup Onions, chopped',
      '1 cup Mixed vegetables',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Dry roast semolina until golden',
      'Heat oil, add mustard seeds and urad dal',
      'Add onions and vegetables, sauté',
      'Add water and bring to boil',
      'Add roasted semolina and cook',
      'Garnish with coriander and serve'
    ],
    calories: 280,
    macros: { protein: 8, carbs: 48, fat: 8 },
    culturalFact: 'Upma is a traditional South Indian breakfast made with semolina. It\'s a quick, nutritious meal that\'s perfect for busy mornings.',
    substitutions: {
      'semolina': 'quinoa or oats',
      'vegetables': 'any seasonal vegetables'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Breakfast', 'Quick', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '102',
    title: 'Kerala Puttu Kadala',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Thiruvananthapuram',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice flour',
      '1 cup Coconut, grated',
      '1 cup Black chickpeas',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Layer rice flour and coconut in puttu maker',
      'Steam for 10-12 minutes until cooked',
      'Cook black chickpeas with spices',
      'Prepare tempering with oil and spices',
      'Mix chickpeas with tempering',
      'Serve hot puttu with kadala curry'
    ],
    calories: 420,
    macros: { protein: 16, carbs: 68, fat: 12 },
    culturalFact: 'Puttu Kadala is a traditional Kerala breakfast combination. The steamed rice cake with black chickpea curry represents the state\'s love for coconut and spices.',
    substitutions: {
      'black chickpeas': 'white chickpeas',
      'coconut': 'sesame seeds'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Breakfast', 'Steamed', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '103',
    title: 'Tamil Nadu Sambar',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 35,
    prepTime: 15,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Toor dal',
      '2 cups Mixed vegetables',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '2 tbsp Sambar powder',
      '1 cup Tamarind water',
      'Fresh coriander'
    ],
    steps: [
      'Pressure cook toor dal until soft',
      'Cook vegetables separately',
      'Heat oil, add mustard and cumin seeds',
      'Add sambar powder and tamarind water',
      'Add cooked dal and vegetables',
      'Simmer for 10 minutes, garnish with coriander'
    ],
    calories: 220,
    macros: { protein: 12, carbs: 28, fat: 8 },
    culturalFact: 'Sambar is a staple in Tamil Nadu cuisine, often served with rice and idli. The tangy, spicy dal represents the perfect balance of flavors.',
    substitutions: {
      'toor dal': 'moong dal or masoor dal',
      'tamarind': 'lemon juice'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Dal', 'Tangy', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '104',
    title: 'Karnataka Mangalore Fish Curry',
    cuisine: 'Mangalorean',
    state: 'Karnataka',
    city: 'Mangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 45,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Onions, chopped',
      '2 tbsp Ginger-garlic paste',
      '1 cup Tomatoes, chopped',
      'Mangalorean fish curry masala',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish with ginger-garlic paste and spices',
      'Heat coconut oil, add onions and sauté',
      'Add tomatoes and Mangalorean masala',
      'Add coconut milk and simmer',
      'Add fish pieces and cook gently',
      'Garnish with coriander and serve with rice'
    ],
    calories: 320,
    macros: { protein: 28, carbs: 12, fat: 18 },
    culturalFact: 'Mangalore Fish Curry reflects the coastal Karnataka\'s love for coconut and spices. The tangy, spicy gravy is perfect with steamed rice.',
    substitutions: {
      'fish': 'prawns or chicken',
      'coconut oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Mangalorean', 'Fish', 'Coastal', 'Spicy'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '105',
    title: 'Andhra Pradesh Pesarattu',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 25,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Green gram (moong dal)',
      '1 cup Rice',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Salt',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Soak green gram and rice for 4-6 hours',
      'Grind to smooth paste with onions and chilies',
      'Add salt and cumin seeds',
      'Heat oil in pan',
      'Pour batter and cook like dosa',
      'Serve hot with chutney'
    ],
    calories: 280,
    macros: { protein: 12, carbs: 42, fat: 8 },
    culturalFact: 'Pesarattu is a traditional Andhra breakfast made with green gram. It\'s a protein-rich alternative to regular dosa and is often served with upma.',
    substitutions: {
      'green gram': 'yellow moong dal',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Breakfast', 'Protein-rich', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '106',
    title: 'Kerala Malabar Biryani',
    cuisine: 'Malabar',
    state: 'Kerala',
    city: 'Kozhikode',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 90,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Basmati rice',
      '750g Chicken pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Fried onions',
      'Malabar biryani masala',
      'Saffron soaked in milk',
      'Fresh mint and coriander'
    ],
    steps: [
      'Marinate chicken with Malabar masala and coconut milk',
      'Cook rice with whole spices until 70% done',
      'Layer marinated chicken at bottom',
      'Layer partially cooked rice over chicken',
      'Sprinkle fried onions, mint, coriander, saffron',
      'Seal and cook on dum for 30 minutes'
    ],
    calories: 580,
    macros: { protein: 32, carbs: 68, fat: 18 },
    culturalFact: 'Malabar Biryani from Kerala reflects the region\'s coastal influences with coconut milk and aromatic spices. It\'s lighter than other biryani variants.',
    substitutions: {
      'chicken': 'fish or prawns',
      'coconut milk': 'regular milk'
    },
    isOfflineAvailable: true,
    tags: ['Malabar', 'Coastal', 'Coconut', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Eid',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '107',
    title: 'Tamil Nadu Chettinad Mushroom',
    cuisine: 'Chettinad',
    state: 'Tamil Nadu',
    city: 'Karaikudi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 40,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '500g Mushrooms',
      '2 tbsp Oil',
      '1 cup Onions, chopped',
      '2 tbsp Ginger-garlic paste',
      '1 cup Tomatoes, chopped',
      '2 tbsp Chettinad masala',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Clean and slice mushrooms',
      'Heat oil, add curry leaves and onions',
      'Add ginger-garlic paste and sauté',
      'Add mushrooms and Chettinad masala',
      'Add tomatoes and cook until soft',
      'Garnish with coriander and serve'
    ],
    calories: 180,
    macros: { protein: 8, carbs: 16, fat: 10 },
    culturalFact: 'Chettinad Mushroom is a vegetarian version of the famous Chettinad cuisine. The bold spices and aromatic flavors represent the region\'s rich culinary heritage.',
    substitutions: {
      'mushrooms': 'paneer or tofu',
      'chettinad masala': 'garam masala with extra spices'
    },
    isOfflineAvailable: true,
    tags: ['Chettinad', 'Vegetarian', 'Spicy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '108',
    title: 'Karnataka Neer Dosa',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Mangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 20,
    prepTime: 8,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Rice',
      '1 cup Coconut milk',
      '1 tsp Salt',
      '1 cup Water',
      '2 tbsp Oil',
      '1 cup Coconut chutney',
      'Fresh coriander',
      'Green chilies'
    ],
    steps: [
      'Soak rice for 4-6 hours',
      'Grind to smooth paste with coconut milk',
      'Add water to make thin batter',
      'Heat non-stick pan',
      'Pour thin layer and cook until done',
      'Serve hot with coconut chutney'
    ],
    calories: 220,
    macros: { protein: 4, carbs: 42, fat: 4 },
    culturalFact: 'Neer Dosa is a thin, lacy dosa from coastal Karnataka. The name means "water dosa" referring to its thin, watery batter.',
    substitutions: {
      'coconut milk': 'regular milk',
      'rice': 'quinoa for healthier version'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'Thin', 'Lacy', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '109',
    title: 'Tamil Nadu Poriyal',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 20,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Mixed vegetables',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Chop vegetables into small pieces',
      'Heat oil, add mustard seeds and urad dal',
      'Add curry leaves and vegetables',
      'Add red chili powder and salt',
      'Cook until vegetables are tender',
      'Garnish with coriander and serve'
    ],
    calories: 160,
    macros: { protein: 6, carbs: 20, fat: 8 },
    culturalFact: 'Poriyal is a traditional Tamil vegetable stir-fry, often served as a side dish with rice and sambar. It\'s a simple, nutritious preparation.',
    substitutions: {
      'mixed vegetables': 'any seasonal vegetables',
      'urad dal': 'chana dal'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Stir-fry', 'Vegetables', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '110',
    title: 'Kerala Fish Molee',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Kochi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 40,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Fish pieces',
      '1 cup Coconut milk',
      '2 tbsp Coconut oil',
      '1 cup Onions, chopped',
      '1 tsp Ginger paste',
      '1 tsp Black pepper',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish with ginger and black pepper',
      'Heat coconut oil, add onions and sauté',
      'Add coconut milk and simmer',
      'Add fish pieces and cook gently',
      'Add curry leaves and simmer',
      'Garnish with coriander and serve'
    ],
    calories: 280,
    macros: { protein: 24, carbs: 8, fat: 18 },
    culturalFact: 'Fish Molee is a mild, coconut-based fish curry from Kerala. It reflects the state\'s Portuguese influences and coastal heritage.',
    substitutions: {
      'fish': 'prawns or chicken',
      'coconut oil': 'any cooking oil'
    },
    isOfflineAvailable: true,
    tags: ['Kerala', 'Fish', 'Mild', 'Coastal'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '111',
    title: 'Andhra Pradesh Gongura Pachadi',
    cuisine: 'Andhra',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Spicy',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Gongura leaves (sorrel)',
      '1 cup Onions, chopped',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Urad dal',
      '2 tbsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Wash and chop gongura leaves',
      'Heat oil, add mustard seeds and urad dal',
      'Add onions and sauté until golden',
      'Add gongura leaves and cook until soft',
      'Add red chili powder and salt',
      'Cook until oil separates, garnish with coriander'
    ],
    calories: 180,
    macros: { protein: 6, carbs: 18, fat: 10 },
    culturalFact: 'Gongura Pachadi is a traditional Andhra pickle made from sorrel leaves. The tangy taste and high vitamin C content make it a summer favorite.',
    substitutions: {
      'gongura': 'spinach with tamarind',
      'red chili powder': 'green chilies'
    },
    isOfflineAvailable: true,
    tags: ['Andhra', 'Pickle', 'Tangy', 'Traditional'],
    servings: 6,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '112',
    title: 'Tamil Nadu Rasam',
    cuisine: 'Tamil',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 25,
    prepTime: 15,
    spiceLevel: 'Medium',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Tamarind water',
      '1 cup Tomatoes, chopped',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '1 tsp Rasam powder',
      'Curry leaves',
      'Fresh coriander'
    ],
    steps: [
      'Extract tamarind water and set aside',
      'Heat oil, add mustard and cumin seeds',
      'Add tomatoes and cook until soft',
      'Add tamarind water and rasam powder',
      'Simmer for 10 minutes',
      'Garnish with coriander and serve'
    ],
    calories: 120,
    macros: { protein: 4, carbs: 16, fat: 6 },
    culturalFact: 'Rasam is a traditional Tamil soup-like dish, often served with rice. It\'s known for its digestive properties and is a staple in Tamil households.',
    substitutions: {
      'tamarind': 'lemon juice',
      'rasam powder': 'sambar powder'
    },
    isOfflineAvailable: true,
    tags: ['Tamil', 'Soup', 'Digestive', 'Traditional'],
    servings: 4,
    difficulty: 'Quick',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '113',
    title: 'Karnataka Ragi Mudde',
    cuisine: 'Karnataka',
    state: 'Karnataka',
    city: 'Bangalore',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 25,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 cup Ragi flour',
      '2 cups Water',
      '1 tsp Salt',
      '1 cup Sambar',
      '1 cup Rasam',
      'Fresh coriander',
      'Green chilies',
      'Fresh coriander'
    ],
    steps: [
      'Boil water with salt',
      'Add ragi flour gradually while stirring',
      'Cook until mixture thickens',
      'Shape into balls while hot',
      'Serve with sambar and rasam',
      'Dip mudde in sambar and eat'
    ],
    calories: 280,
    macros: { protein: 8, carbs: 48, fat: 4 },
    culturalFact: 'Ragi Mudde is a traditional Karnataka dish made with finger millet. It\'s a nutritious, gluten-free alternative to rice.',
    substitutions: {
      'ragi flour': 'jowar or bajra flour',
      'sambar': 'any curry or dal'
    },
    isOfflineAvailable: true,
    tags: ['Karnataka', 'Millet', 'Healthy', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '114',
    title: 'Maharashtra Puran Poli',
    cuisine: 'Maharashtrian',
    state: 'Maharashtra',
    city: 'Mumbai',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 60,
    prepTime: 30,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dessert',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Chana dal',
      '1 cup Jaggery',
      '2 tbsp Ghee',
      '1 tsp Cardamom powder',
      '1 tsp Nutmeg powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Cook chana dal until soft, mash with jaggery',
      'Add cardamom and nutmeg to dal mixture',
      'Prepare wheat flour dough with salt',
      'Stuff dal mixture in dough balls',
      'Roll thin and cook on tawa',
      'Apply ghee and serve hot'
    ],
    calories: 480,
    macros: { protein: 12, carbs: 72, fat: 16 },
    culturalFact: 'Puran Poli is a traditional Maharashtrian sweet flatbread, often served during festivals like Gudi Padwa and Holi.',
    substitutions: {
      'jaggery': 'brown sugar or honey',
      'chana dal': 'toor dal'
    },
    isOfflineAvailable: true,
    tags: ['Maharashtrian', 'Sweet', 'Festive', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Gudi Padwa',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '115',
    title: 'Gujarat Thepla',
    cuisine: 'Gujarati',
    state: 'Gujarat',
    city: 'Ahmedabad',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 30,
    prepTime: 20,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg', 'Vegan'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Methi leaves, chopped',
      '1 cup Yogurt',
      '2 tbsp Oil',
      '1 tsp Cumin seeds',
      '1 tsp Red chili powder',
      '1 tsp Salt',
      'Fresh coriander'
    ],
    steps: [
      'Mix wheat flour with methi leaves and spices',
      'Add yogurt and oil, knead to smooth dough',
      'Divide into balls and roll thin',
      'Cook on tawa until golden brown',
      'Apply oil and cook both sides',
      'Serve hot with pickle or chutney'
    ],
    calories: 320,
    macros: { protein: 10, carbs: 52, fat: 10 },
    culturalFact: 'Thepla is a traditional Gujarati flatbread made with fenugreek leaves. It\'s a popular travel food and breakfast item in Gujarat.',
    substitutions: {
      'methi leaves': 'spinach or coriander',
      'yogurt': 'water for vegan version'
    },
    isOfflineAvailable: true,
    tags: ['Gujarati', 'Travel Food', 'Fenugreek', 'Traditional'],
    servings: 6,
    difficulty: 'Medium',
    isFestive: false,
    isHealthy: true,
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
    difficulty: 'Quick',
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
  // Grains & Flours
  { name: 'Rice', category: 'Grains' },
  { name: 'Basmati Rice', category: 'Grains' },
  { name: 'Brown Rice', category: 'Grains' },
  { name: 'Wheat Flour', category: 'Grains' },
  { name: 'Maida (Refined Flour)', category: 'Grains' },
  { name: 'Ragi Flour', category: 'Grains' },
  { name: 'Bajra (Pearl Millet)', category: 'Grains' },
  { name: 'Jowar (Sorghum)', category: 'Grains' },
  { name: 'Barley', category: 'Grains' },
  { name: 'Poha (Flattened Rice)', category: 'Grains' },
  { name: 'Sooji (Semolina)', category: 'Grains' },
  { name: 'Vermicelli', category: 'Grains' },
  { name: 'Bread', category: 'Grains' },
  { name: 'Naan', category: 'Grains' },
  { name: 'Roti', category: 'Grains' },
  { name: 'Paratha', category: 'Grains' },
  { name: 'Chapati', category: 'Grains' },
  { name: 'Poori', category: 'Grains' },
  { name: 'Bhatura', category: 'Grains' },
  { name: 'Dosa', category: 'Grains' },
  { name: 'Idli', category: 'Grains' },
  { name: 'Appam', category: 'Grains' },
  { name: 'Puttu', category: 'Grains' },
  { name: 'Upma', category: 'Grains' },
  { name: 'Khichdi', category: 'Grains' },
  { name: 'Bisi Bele Bath', category: 'Grains' },
  { name: 'Pongal', category: 'Grains' },
  { name: 'Mudde', category: 'Grains' },
  { name: 'Thepla', category: 'Grains' },
  { name: 'Dhokla', category: 'Grains' },
  { name: 'Khandvi', category: 'Grains' },
  { name: 'Puran Poli', category: 'Grains' },
  { name: 'Poha Jalebi', category: 'Grains' },
  { name: 'Chole Bhature', category: 'Grains' },
  { name: 'Vada Pav', category: 'Grains' },
  { name: 'Dhuska', category: 'Grains' },
  { name: 'Chila', category: 'Grains' },
  { name: 'Mui Borok', category: 'Grains' },
  { name: 'Bajra Khichdi', category: 'Grains' },
  { name: 'Pakhala', category: 'Grains' },
  { name: 'Siddu', category: 'Grains' },
  { name: 'Kafuli', category: 'Grains' },

  // Pulses & Dals
  { name: 'Toor Dal', category: 'Pulses' },
  { name: 'Moong Dal', category: 'Pulses' },
  { name: 'Chana Dal', category: 'Pulses' },
  { name: 'Urad Dal', category: 'Pulses' },
  { name: 'Masoor Dal', category: 'Pulses' },
  { name: 'Rajma (Kidney Beans)', category: 'Pulses' },
  { name: 'Chickpeas (Kabuli Chana)', category: 'Pulses' },
  { name: 'Black Chickpeas (Kala Chana)', category: 'Pulses' },
  { name: 'Green Gram (Whole Moong)', category: 'Pulses' },
  { name: 'Lobia (Black-eyed Peas)', category: 'Pulses' },
  { name: 'Dal', category: 'Pulses' },
  { name: 'Sambar', category: 'Pulses' },
  { name: 'Rasam', category: 'Pulses' },
  { name: 'Dal Baati', category: 'Pulses' },
  { name: 'Dal Makhani', category: 'Pulses' },
  { name: 'Dal Fry', category: 'Pulses' },
  { name: 'Dal Tadka', category: 'Pulses' },
  { name: 'Beans', category: 'Pulses' },
  { name: 'Lentils', category: 'Pulses' },

  // Vegetables
  { name: 'Onions', category: 'Vegetables' },
  { name: 'Tomatoes', category: 'Vegetables' },
  { name: 'Potatoes', category: 'Vegetables' },
  { name: 'Carrots', category: 'Vegetables' },
  { name: 'Cauliflower', category: 'Vegetables' },
  { name: 'Cabbage', category: 'Vegetables' },
  { name: 'Green Peas', category: 'Vegetables' },
  { name: 'French Beans', category: 'Vegetables' },
  { name: 'Capsicum (Bell Pepper)', category: 'Vegetables' },
  { name: 'Brinjal (Eggplant)', category: 'Vegetables' },
  { name: 'Okra (Bhindi)', category: 'Vegetables' },
  { name: 'Bitter Gourd (Karela)', category: 'Vegetables' },
  { name: 'Bottle Gourd (Lauki)', category: 'Vegetables' },
  { name: 'Pumpkin', category: 'Vegetables' },
  { name: 'Spinach', category: 'Vegetables' },
  { name: 'Fenugreek Leaves (Methi)', category: 'Vegetables' },
  { name: 'Coriander Leaves', category: 'Vegetables' },
  { name: 'Mint Leaves', category: 'Vegetables' },
  { name: 'Drumstick', category: 'Vegetables' },
  { name: 'Radish', category: 'Vegetables' },
  { name: 'Beetroot', category: 'Vegetables' },
  { name: 'Sweet Potato', category: 'Vegetables' },
  { name: 'Cucumber', category: 'Vegetables' },
  { name: 'Turnip', category: 'Vegetables' },
  { name: 'Ridge Gourd', category: 'Vegetables' },
  { name: 'Yam (Suran)', category: 'Vegetables' },
  { name: 'Raw Banana', category: 'Vegetables' },
  { name: 'Jackfruit', category: 'Vegetables' },
  { name: 'Mushroom', category: 'Vegetables' },
  { name: 'Gongura', category: 'Vegetables' },
  { name: 'Taro', category: 'Vegetables' },
  { name: 'Colocasia', category: 'Vegetables' },
  { name: 'Bamboo Shoots', category: 'Vegetables' },
  { name: 'Bamboo Rice', category: 'Vegetables' },
  { name: 'Bamboo Curry', category: 'Vegetables' },
  { name: 'Bamboo Pickle', category: 'Vegetables' },
  { name: 'Bamboo Chutney', category: 'Vegetables' },
  { name: 'Bamboo Fry', category: 'Vegetables' },
  { name: 'Bamboo Soup', category: 'Vegetables' },
  { name: 'Bamboo Salad', category: 'Vegetables' },
  { name: 'Bamboo Rice', category: 'Vegetables' },
  { name: 'Bamboo Curry', category: 'Vegetables' },
  { name: 'Bamboo Pickle', category: 'Vegetables' },
  { name: 'Bamboo Chutney', category: 'Vegetables' },
  { name: 'Bamboo Fry', category: 'Vegetables' },
  { name: 'Bamboo Soup', category: 'Vegetables' },
  { name: 'Bamboo Salad', category: 'Vegetables' },

  // Spices & Masalas
  { name: 'Ginger', category: 'Spices' },
  { name: 'Garlic', category: 'Spices' },
  { name: 'Turmeric', category: 'Spices' },
  { name: 'Cumin', category: 'Spices' },
  { name: 'Coriander Seeds', category: 'Spices' },
  { name: 'Mustard Seeds', category: 'Spices' },
  { name: 'Fennel Seeds', category: 'Spices' },
  { name: 'Fenugreek Seeds', category: 'Spices' },
  { name: 'Carom Seeds (Ajwain)', category: 'Spices' },
  { name: 'Nigella Seeds (Kalonji)', category: 'Spices' },
  { name: 'Asafoetida (Hing)', category: 'Spices' },
  { name: 'Curry Leaves', category: 'Spices' },
  { name: 'Bay Leaf', category: 'Spices' },
  { name: 'Cloves', category: 'Spices' },
  { name: 'Cardamom', category: 'Spices' },
  { name: 'Cinnamon', category: 'Spices' },
  { name: 'Black Pepper', category: 'Spices' },
  { name: 'Red Chili', category: 'Spices' },
  { name: 'Green Chili', category: 'Spices' },
  { name: 'Chili Powder', category: 'Spices' },
  { name: 'Garam Masala', category: 'Spices' },
  { name: 'Sambar Powder', category: 'Spices' },
  { name: 'Rasam Powder', category: 'Spices' },
  { name: 'Pav Bhaji Masala', category: 'Spices' },
  { name: 'Chaat Masala', category: 'Spices' },
  { name: 'Tandoori Masala', category: 'Spices' },
  { name: 'Kitchen King Masala', category: 'Spices' },
  { name: 'Salt', category: 'Spices' },
  { name: 'Sugar', category: 'Spices' },
  { name: 'Jaggery', category: 'Spices' },
  { name: 'Honey', category: 'Spices' },
  { name: 'Tamarind', category: 'Spices' },
  { name: 'Vinegar', category: 'Spices' },
  { name: 'Baking Soda', category: 'Spices' },
  { name: 'Baking Powder', category: 'Spices' },
  { name: 'Yeast', category: 'Spices' },
  { name: 'Saffron', category: 'Spices' },
  { name: 'Rose Water', category: 'Spices' },
  { name: 'Kewra Water', category: 'Spices' },

  // Dairy
  { name: 'Milk', category: 'Dairy' },
  { name: 'Yogurt', category: 'Dairy' },
  { name: 'Paneer', category: 'Dairy' },
  { name: 'Ghee', category: 'Dairy' },
  { name: 'Butter', category: 'Dairy' },
  { name: 'Cheese', category: 'Dairy' },
  { name: 'Cream', category: 'Dairy' },
  { name: 'Curd', category: 'Dairy' },
  { name: 'Raita', category: 'Dairy' },
  { name: 'Lassi', category: 'Dairy' },
  { name: 'Buttermilk', category: 'Dairy' },

  // Oils & Fats
  { name: 'Oil', category: 'Oils & Fats' },
  { name: 'Mustard Oil', category: 'Oils & Fats' },
  { name: 'Sunflower Oil', category: 'Oils & Fats' },
  { name: 'Groundnut Oil', category: 'Oils & Fats' },
  { name: 'Coconut Oil', category: 'Oils & Fats' },
  { name: 'Sesame Oil', category: 'Oils & Fats' },
  { name: 'Olive Oil', category: 'Oils & Fats' },
  { name: 'Vegetable Oil', category: 'Oils & Fats' },

  // Proteins
  { name: 'Chicken', category: 'Proteins' },
  { name: 'Fish', category: 'Proteins' },
  { name: 'Eggs', category: 'Proteins' },
  { name: 'Mutton', category: 'Proteins' },
  { name: 'Prawns', category: 'Proteins' },
  { name: 'Paneer', category: 'Proteins' },
  { name: 'Tofu', category: 'Proteins' },
  { name: 'Meat', category: 'Proteins' },
  { name: 'Lamb', category: 'Proteins' },
  { name: 'Beef', category: 'Proteins' },
  { name: 'Pork', category: 'Proteins' },
  { name: 'Shrimp', category: 'Proteins' },
  { name: 'Crab', category: 'Proteins' },
  { name: 'Lobster', category: 'Proteins' },
  { name: 'Squid', category: 'Proteins' },
  { name: 'Octopus', category: 'Proteins' },
  { name: 'Quail', category: 'Proteins' },
  { name: 'Duck', category: 'Proteins' },
  { name: 'Turkey', category: 'Proteins' },

  // Fruits
  { name: 'Banana', category: 'Fruits' },
  { name: 'Mango', category: 'Fruits' },
  { name: 'Apple', category: 'Fruits' },
  { name: 'Orange', category: 'Fruits' },
  { name: 'Papaya', category: 'Fruits' },
  { name: 'Pineapple', category: 'Fruits' },
  { name: 'Grapes', category: 'Fruits' },
  { name: 'Guava', category: 'Fruits' },
  { name: 'Pomegranate', category: 'Fruits' },
  { name: 'Watermelon', category: 'Fruits' },
  { name: 'Lemon', category: 'Fruits' },
  { name: 'Coconut', category: 'Fruits' },
  { name: 'Lime', category: 'Fruits' },
  { name: 'Strawberry', category: 'Fruits' },
  { name: 'Blueberry', category: 'Fruits' },
  { name: 'Raspberry', category: 'Fruits' },
  { name: 'Blackberry', category: 'Fruits' },
  { name: 'Peach', category: 'Fruits' },
  { name: 'Plum', category: 'Fruits' },
  { name: 'Apricot', category: 'Fruits' },
  { name: 'Cherry', category: 'Fruits' },
  { name: 'Kiwi', category: 'Fruits' },
  { name: 'Dragon Fruit', category: 'Fruits' },
  { name: 'Passion Fruit', category: 'Fruits' },
  { name: 'Lychee', category: 'Fruits' },
  { name: 'Longan', category: 'Fruits' },
  { name: 'Rambutan', category: 'Fruits' },
  { name: 'Mangosteen', category: 'Fruits' },
  { name: 'Durian', category: 'Fruits' },
  { name: 'Jackfruit', category: 'Fruits' },
  { name: 'Breadfruit', category: 'Fruits' },
  { name: 'Sapodilla', category: 'Fruits' },
  { name: 'Custard Apple', category: 'Fruits' },
  { name: 'Wood Apple', category: 'Fruits' },
  { name: 'Bael', category: 'Fruits' },
  { name: 'Amla', category: 'Fruits' },
  { name: 'Jamun', category: 'Fruits' },
  { name: 'Ber', category: 'Fruits' },
  { name: 'Phalsa', category: 'Fruits' },
  { name: 'Karonda', category: 'Fruits' },
  { name: 'Chironji', category: 'Fruits' },
  { name: 'Kokum', category: 'Fruits' },
  { name: 'Garcinia', category: 'Fruits' },
  { name: 'Star Fruit', category: 'Fruits' },
  { name: 'Buddha Hand', category: 'Fruits' },
  { name: 'Yuzu', category: 'Fruits' },
  { name: 'Kumquat', category: 'Fruits' },
  { name: 'Calamondin', category: 'Fruits' },
  { name: 'Buddha Hand', category: 'Fruits' },
  { name: 'Finger Lime', category: 'Fruits' },
  { name: 'Blood Orange', category: 'Fruits' },
  { name: 'Seville Orange', category: 'Fruits' },
  { name: 'Bergamot', category: 'Fruits' },
  { name: 'Mandarin', category: 'Fruits' },
  { name: 'Tangerine', category: 'Fruits' },
  { name: 'Clementine', category: 'Fruits' },
  { name: 'Satsuma', category: 'Fruits' },
  { name: 'Ugli Fruit', category: 'Fruits' },
  { name: 'Tangelo', category: 'Fruits' },
  { name: 'Minneola', category: 'Fruits' },
  { name: 'Orlando', category: 'Fruits' },
  { name: 'Seminole', category: 'Fruits' },
  { name: 'Robinson', category: 'Fruits' },
  { name: 'Sunburst', category: 'Fruits' },
  { name: 'Nova', category: 'Fruits' },
  { name: 'Page', category: 'Fruits' },
  { name: 'Dancy', category: 'Fruits' },
  { name: 'Honey', category: 'Fruits' },
  { name: 'Murcott', category: 'Fruits' },
  { name: 'Fallglo', category: 'Fruits' },
  { name: 'Ambersweet', category: 'Fruits' },
  { name: 'Hamlin', category: 'Fruits' },
  { name: 'Pineapple Orange', category: 'Fruits' },
  { name: 'Valencia', category: 'Fruits' },
  { name: 'Navel', category: 'Fruits' },
  { name: 'Cara Cara', category: 'Fruits' },
  { name: 'Blood Orange', category: 'Fruits' },
  { name: 'Seville Orange', category: 'Fruits' },
  { name: 'Bergamot', category: 'Fruits' },
  { name: 'Mandarin', category: 'Fruits' },
  { name: 'Tangerine', category: 'Fruits' },
  { name: 'Clementine', category: 'Fruits' },
  { name: 'Satsuma', category: 'Fruits' },
  { name: 'Ugli Fruit', category: 'Fruits' },
  { name: 'Tangelo', category: 'Fruits' },
  { name: 'Minneola', category: 'Fruits' },
  { name: 'Orlando', category: 'Fruits' },
  { name: 'Seminole', category: 'Fruits' },
  { name: 'Robinson', category: 'Fruits' },
  { name: 'Sunburst', category: 'Fruits' },
  { name: 'Nova', category: 'Fruits' },
  { name: 'Page', category: 'Fruits' },
  { name: 'Dancy', category: 'Fruits' },
  { name: 'Honey', category: 'Fruits' },
  { name: 'Murcott', category: 'Fruits' },
  { name: 'Fallglo', category: 'Fruits' },
  { name: 'Ambersweet', category: 'Fruits' },
  { name: 'Hamlin', category: 'Fruits' },
  { name: 'Pineapple Orange', category: 'Fruits' },
  { name: 'Valencia', category: 'Fruits' },
  { name: 'Navel', category: 'Fruits' },
  { name: 'Cara Cara', category: 'Fruits' },
];

export const leftoverRecipes = [
  {
    id: 'lr1',
    title: 'Roti Churma',
    description: 'Sweet dessert made from leftover rotis',
    ingredients: ['Leftover rotis', 'Ghee', 'Sugar', 'Cardamom', 'Nuts', 'Saffron'],
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    difficulty: 'Quick',
    time: 15,
    calories: 380,
    cuisine: 'North Indian',
    tags: ['Dessert', 'Sweet', 'Quick'],
    type: 'leftover',
    leftoverCompatibility: 1
  },
  {
    id: 'lr2',
    title: 'Dal Paratha',
    description: 'Stuffed paratha using leftover dal',
    ingredients: ['Leftover dal', 'Wheat flour', 'Spices', 'Oil', 'Onions', 'Coriander'],
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    difficulty: 'Medium',
    time: 25,
    calories: 420,
    cuisine: 'North Indian',
    tags: ['Bread', 'Stuffed', 'Protein'],
    type: 'leftover',
    leftoverCompatibility: 1
  },
  {
    id: 'lr3',
    title: 'Fried Rice',
    description: 'Quick fried rice with leftover rice',
    ingredients: ['Leftover rice', 'Vegetables', 'Soy sauce', 'Oil', 'Garlic', 'Ginger'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    difficulty: 'Quick',
    time: 20,
    calories: 450,
    cuisine: 'Indo-Chinese',
    tags: ['Quick', 'One-pot', 'Versatile'],
    type: 'leftover',
    leftoverCompatibility: 1
  },
  {
    id: 'lr4',
    title: 'Sabzi Paratha',
    description: 'Stuffed paratha with leftover vegetables',
    ingredients: ['Leftover sabzi', 'Wheat flour', 'Spices', 'Oil', 'Ajwain'],
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    difficulty: 'Medium',
    time: 30,
    calories: 400,
    cuisine: 'North Indian',
    tags: ['Vegetarian', 'Stuffed', 'Healthy'],
    type: 'leftover',
    leftoverCompatibility: 1
  },
  {
    id: 'lr5',
    title: 'Chicken Biryani',
    description: 'Biryani using leftover chicken',
    ingredients: ['Leftover chicken', 'Rice', 'Spices', 'Onions', 'Yogurt', 'Saffron'],
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    difficulty: 'Long',
    time: 60,
    calories: 550,
    cuisine: 'Hyderabadi',
    tags: ['Biryani', 'Non-veg', 'Festive'],
    type: 'leftover',
    leftoverCompatibility: 1
  },
  {
    id: 'lr6',
    title: 'Paneer Tikka',
    description: 'Grilled paneer with leftover paneer',
    ingredients: ['Leftover paneer', 'Yogurt', 'Spices', 'Bell peppers', 'Onions'],
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    difficulty: 'Quick',
    time: 20,
    calories: 380,
    cuisine: 'North Indian',
    tags: ['Appetizer', 'Vegetarian', 'Grilled'],
    type: 'leftover',
    leftoverCompatibility: 1
  },
  {
    id: 'lr7',
    title: 'Quick Upma',
    description: 'Breakfast from leftover semolina',
    ingredients: ['Sooji', 'Vegetables', 'Mustard seeds', 'Curry leaves', 'Oil'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    difficulty: 'Quick',
    time: 15,
    calories: 350,
    cuisine: 'South Indian',
    tags: ['Breakfast', 'Quick', 'Healthy'],
    type: 'leftover',
    leftoverCompatibility: 1
  },
  {
    id: 'lr8',
    title: 'Raita Bowl',
    description: 'Refreshing yogurt dish with leftover vegetables',
    ingredients: ['Yogurt', 'Cucumber', 'Tomatoes', 'Onions', 'Spices', 'Mint'],
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    difficulty: 'Quick',
    time: 10,
    calories: 180,
    cuisine: 'North Indian',
    tags: ['Side dish', 'Cooling', 'Quick'],
    type: 'leftover',
    leftoverCompatibility: 2
  },
  {
    id: 'lr9',
    title: 'Roti Chips',
    description: 'Crispy chips from leftover rotis',
    ingredients: ['Leftover rotis', 'Oil', 'Spices', 'Salt'],
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    difficulty: 'Quick',
    time: 10,
    calories: 220,
    cuisine: 'North Indian',
    tags: ['Snack', 'Crispy', 'Quick'],
    type: 'leftover',
    leftoverCompatibility: 1
  },
  {
    id: 'lr10',
    title: 'Dal Soup',
    description: 'Hearty soup from leftover dal',
    ingredients: ['Leftover dal', 'Vegetables', 'Spices', 'Ginger', 'Garlic'],
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    difficulty: 'Quick',
    time: 15,
    calories: 280,
    cuisine: 'North Indian',
    tags: ['Soup', 'Healthy', 'Warm'],
    type: 'leftover',
    leftoverCompatibility: 1
  },
  {
    id: 'lr11',
    title: 'Rice Pudding',
    description: 'Sweet dessert from leftover rice',
    ingredients: ['Leftover rice', 'Milk', 'Sugar', 'Cardamom', 'Nuts'],
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    difficulty: 'Quick',
    time: 20,
    calories: 400,
    cuisine: 'North Indian',
    tags: ['Dessert', 'Sweet', 'Comfort'],
    type: 'leftover',
    leftoverCompatibility: 1
  },
  {
    id: 'lr12',
    title: 'Vegetable Stock',
    description: 'Flavorful stock from vegetable scraps',
    ingredients: ['Vegetable scraps', 'Onions', 'Carrots', 'Celery', 'Herbs'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    difficulty: 'Quick',
    time: 45,
    calories: 80,
    cuisine: 'International',
    tags: ['Stock', 'Healthy', 'Base'],
    type: 'leftover',
    leftoverCompatibility: 3
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

// Enhanced preference interface for better type safety
export interface QuizPreferences {
  spiceLevel: 'mild' | 'medium' | 'spicy';
  cuisine: 'north' | 'south' | 'east' | 'west';
  experience: 'easy' | 'medium' | 'hard';
  time: 'quick' | 'medium' | 'long';
  dietType: 'veg' | 'vegan' | 'non-veg' | 'flexible';
}

// Enhanced recipe scoring interface
export interface RecipeScore {
  recipe: Recipe;
  score: number;
  matchReasons: string[];
}

// Quiz questions for the taste quiz
export const quizQuestions = [
  {
    id: 1,
    question: "What's your preferred spice level?",
    options: [
      { label: "Mild - I prefer subtle flavors", value: "mild" },
      { label: "Medium - I like balanced heat", value: "medium" },
      { label: "Spicy - The hotter, the better!", value: "spicy" }
    ]
  },
  {
    id: 2,
    question: "Which cuisine interests you most?",
    options: [
      { label: "North Indian - Rich and creamy", value: "north" },
      { label: "South Indian - Light and tangy", value: "south" },
      { label: "East Indian - Fish and rice based", value: "east" },
      { label: "West Indian - Coastal flavors", value: "west" }
    ]
  },
  {
    id: 3,
    question: "What's your cooking experience level?",
    options: [
      { label: "Beginner - I'm just starting out", value: "easy" },
      { label: "Intermediate - I can follow recipes", value: "medium" },
      { label: "Advanced - I love experimenting", value: "hard" }
    ]
  },
  {
    id: 4,
    question: "How much time do you usually have for cooking?",
    options: [
      { label: "Quick meals - 30 minutes or less", value: "quick" },
      { label: "Moderate time - 30-60 minutes", value: "medium" },
      { label: "Leisurely cooking - Over an hour", value: "long" }
    ]
  },
  {
    id: 5,
    question: "What's your dietary preference?",
    options: [
      { label: "Vegetarian", value: "veg" },
      { label: "Vegan", value: "vegan" },
      { label: "Non-vegetarian", value: "non-veg" },
      { label: "Flexible - I eat everything", value: "flexible" }
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

// Enhanced recommendation algorithm with weighted scoring
export const getRecommendedRecipes = (preferences: QuizPreferences): Recipe[] => {
  const scoredRecipes: RecipeScore[] = mockRecipes.map(recipe => {
    let score = 0;
    const matchReasons: string[] = [];

    // Spice Level Matching (Weight: 25%)
    const spiceLevelMap: { [key: string]: string } = {
      'mild': 'Mild',
      'medium': 'Medium', 
      'spicy': 'Spicy'
    };
    if (preferences.spiceLevel && recipe.spiceLevel === spiceLevelMap[preferences.spiceLevel]) {
      score += 25;
      matchReasons.push(`Perfect spice level: ${recipe.spiceLevel}`);
    } else if (preferences.spiceLevel) {
      // Partial match for adjacent spice levels
      const spiceOrder = ['Mild', 'Medium', 'Spicy'];
      const userSpiceIndex = spiceOrder.indexOf(spiceLevelMap[preferences.spiceLevel]);
      const recipeSpiceIndex = spiceOrder.indexOf(recipe.spiceLevel);
      const spiceDiff = Math.abs(userSpiceIndex - recipeSpiceIndex);
      if (spiceDiff === 1) {
        score += 15;
        matchReasons.push(`Close spice level: ${recipe.spiceLevel}`);
      }
    }

    // Cuisine Matching (Weight: 20%)
    const cuisineRegionMap: { [key: string]: string[] } = {
      'north': ['North', 'Northeast'],
      'south': ['South'],
      'east': ['East'],
      'west': ['West'],
      'central': ['Central']
    };
    if (preferences.cuisine && cuisineRegionMap[preferences.cuisine]?.includes(recipe.region)) {
      score += 20;
      matchReasons.push(`Regional cuisine: ${recipe.region} Indian`);
    }

    // Cooking Experience Matching (Weight: 15%)
    const experienceMap: { [key: string]: string } = {
      'easy': 'Easy',
      'medium': 'Medium',
      'hard': 'Hard'
    };
    if (preferences.experience && recipe.effort === experienceMap[preferences.experience]) {
      score += 15;
      matchReasons.push(`Perfect difficulty: ${recipe.effort}`);
    }

    // Time Preference Matching (Weight: 20%)
    const timeMap: { [key: string]: string } = {
      'quick': 'Quick',
      'medium': 'Medium',
      'long': 'Long'
    };
    if (preferences.time && recipe.difficulty === timeMap[preferences.time]) {
      score += 20;
      matchReasons.push(`Ideal cooking time: ${recipe.difficulty}`);
    } else if (preferences.time === 'quick' && recipe.cookingTime <= 30) {
      score += 15;
      matchReasons.push(`Quick to prepare: ${recipe.cookingTime} minutes`);
    }

    // Dietary Preference Matching (Weight: 20%)
    if (preferences.dietType) {
      const dietMatches = {
        'veg': recipe.dietType.some(diet => diet.includes('Veg') && !diet.includes('Non')),
        'vegan': recipe.dietType.some(diet => diet.includes('Vegan')),
        'non-veg': recipe.dietType.some(diet => diet.includes('Non-Veg')),
        'flexible': true
      };
      
      if (dietMatches[preferences.dietType as keyof typeof dietMatches]) {
        score += 20;
        matchReasons.push(`Dietary match: ${recipe.dietType.join(', ')}`);
      }
    }

    // Bonus points for healthy options if user prefers quick meals
    if (preferences.time === 'quick' && recipe.isHealthy) {
      score += 5;
      matchReasons.push('Healthy quick option');
    }

    // Bonus for street food if user likes spicy food
    if (preferences.spiceLevel === 'spicy' && recipe.isStreetFood) {
      score += 5;
      matchReasons.push('Authentic street food');
    }

    return { recipe, score, matchReasons };
  });

  // Sort by score and return top recipes
  return scoredRecipes
    .filter(item => item.score > 0) // Only recipes with some match
    .sort((a, b) => b.score - a.score)
    .slice(0, 12) // Return more recipes for better variety
    .map(item => item.recipe);
};

// Enhanced function to get detailed recommendations with explanations
export const getDetailedRecommendations = (preferences: QuizPreferences): RecipeScore[] => {
  const scoredRecipes: RecipeScore[] = mockRecipes.map(recipe => {
    let score = 0;
    const matchReasons: string[] = [];

    // Spice Level Matching (Weight: 25%)
    const spiceLevelMap: { [key: string]: string } = {
      'mild': 'Mild',
      'medium': 'Medium', 
      'spicy': 'Spicy'
    };
    if (preferences.spiceLevel && recipe.spiceLevel === spiceLevelMap[preferences.spiceLevel]) {
      score += 25;
      matchReasons.push(`Perfect spice level: ${recipe.spiceLevel}`);
    } else if (preferences.spiceLevel) {
      const spiceOrder = ['Mild', 'Medium', 'Spicy'];
      const userSpiceIndex = spiceOrder.indexOf(spiceLevelMap[preferences.spiceLevel]);
      const recipeSpiceIndex = spiceOrder.indexOf(recipe.spiceLevel);
      const spiceDiff = Math.abs(userSpiceIndex - recipeSpiceIndex);
      if (spiceDiff === 1) {
        score += 15;
        matchReasons.push(`Close spice level: ${recipe.spiceLevel}`);
      }
    }

    // Cuisine Matching (Weight: 20%)
    const cuisineRegionMap: { [key: string]: string[] } = {
      'north': ['North', 'Northeast'],
      'south': ['South'],
      'east': ['East'],
      'west': ['West'],
      'central': ['Central']
    };
    if (preferences.cuisine && cuisineRegionMap[preferences.cuisine]?.includes(recipe.region)) {
      score += 20;
      matchReasons.push(`Regional cuisine: ${recipe.region} Indian`);
    }

    // Cooking Experience Matching (Weight: 15%)
    const experienceMap: { [key: string]: string } = {
      'easy': 'Easy',
      'medium': 'Medium',
      'hard': 'Hard'
    };
    if (preferences.experience && recipe.effort === experienceMap[preferences.experience]) {
      score += 15;
      matchReasons.push(`Perfect difficulty: ${recipe.effort}`);
    }

    // Time Preference Matching (Weight: 20%)
    const timeMap: { [key: string]: string } = {
      'quick': 'Quick',
      'medium': 'Medium',
      'long': 'Long'
    };
    if (preferences.time && recipe.difficulty === timeMap[preferences.time]) {
      score += 20;
      matchReasons.push(`Ideal cooking time: ${recipe.difficulty}`);
    } else if (preferences.time === 'quick' && recipe.cookingTime <= 30) {
      score += 15;
      matchReasons.push(`Quick to prepare: ${recipe.cookingTime} minutes`);
    }

    // Dietary Preference Matching (Weight: 20%)
    if (preferences.dietType) {
      const dietMatches = {
        'veg': recipe.dietType.some(diet => diet.includes('Veg') && !diet.includes('Non')),
        'vegan': recipe.dietType.some(diet => diet.includes('Vegan')),
        'non-veg': recipe.dietType.some(diet => diet.includes('Non-Veg')),
        'flexible': true
      };
      
      if (dietMatches[preferences.dietType as keyof typeof dietMatches]) {
        score += 20;
        matchReasons.push(`Dietary match: ${recipe.dietType.join(', ')}`);
      }
    }

    // Bonus points for healthy options if user prefers quick meals
    if (preferences.time === 'quick' && recipe.isHealthy) {
      score += 5;
      matchReasons.push('Healthy quick option');
    }

    // Bonus for street food if user likes spicy food
    if (preferences.spiceLevel === 'spicy' && recipe.isStreetFood) {
      score += 5;
      matchReasons.push('Authentic street food');
    }

    return { recipe, score, matchReasons };
  });

  return scoredRecipes
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
};

export function getQuizPreferences(): QuizPreferences | null {
  try {
    const prefs = localStorage.getItem('cookwise-quiz-preferences');
    if (prefs) return JSON.parse(prefs) as QuizPreferences;
    return null;
  } catch {
    return null;
  }
}
