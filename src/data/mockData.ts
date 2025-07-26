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
      'Dosa batter (fermented)',
      '4 medium Potatoes',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      'Curry leaves',
      '2 Green chilies',
      '1 inch Ginger',
      'Turmeric powder',
      'Salt to taste'
    ],
    steps: [
      'Boil and mash potatoes, keeping them slightly chunky',
      'Heat oil in pan, add mustard seeds and cumin seeds',
      'Add curry leaves, green chilies, and ginger',
      'Add turmeric and mashed potatoes, mix well and cook for 5 minutes',
      'Heat dosa pan and spread batter in circular motion',
      'Drizzle oil around edges and cook until golden',
      'Place potato filling on one side and fold the dosa',
      'Serve immediately with coconut chutney and sambar'
    ],
    calories: 280,
    macros: { protein: 8, carbs: 48, fat: 8 },
    culturalFact: 'Masala Dosa was invented in the Udupi restaurants of Mumbai and has become one of the most popular South Indian breakfast items worldwide.',
    substitutions: {
      'potato filling': 'paneer or mixed vegetables',
      'regular dosa': 'rava dosa for crispier texture'
    },
    isOfflineAvailable: true,
    tags: ['Breakfast', 'Street Food', 'Healthy', 'Quick'],
    servings: 4,
    difficulty: 'Quick',
    isHealthy: true,
    isStreetFood: true
  },
  {
    id: '3',
    title: 'Rajasthani Dal Baati Churma',
    cuisine: 'Rajasthani',
    state: 'Rajasthan',
    city: 'Jaipur',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=500',
    cookingTime: 75,
    prepTime: 20,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Lunch',
    dietType: ['Veg', 'Gluten-Free'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Mixed dal',
      '1/2 cup Ghee',
      '1/4 cup Jaggery',
      'Cardamom powder',
      'Almonds and raisins',
      'Hing (asafoetida)',
      'Red chili powder',
      'Coriander seeds',
      'Cumin seeds'
    ],
    steps: [
      'Make stiff dough with wheat flour, ghee, and water for baati',
      'Shape into round balls and bake in oven at 180°C for 45 minutes',
      'Boil mixed dal with spices until soft and mushy',
      'Prepare tempering with cumin, mustard seeds, and hing',
      'Add tempering to dal and simmer for 10 minutes',
      'For churma, coarse grind baked baati with ghee and jaggery',
      'Add cardamom powder and dry fruits to churma',
      'Serve hot baati with dal and churma on the side'
    ],
    calories: 450,
    macros: { protein: 15, carbs: 58, fat: 20 },
    culturalFact: 'Dal Baati Churma is the signature dish of Rajasthan, traditionally prepared by rajasthani women and symbolizes the royal cuisine of the desert state.',
    substitutions: {
      'wheat flour': 'bajra flour for traditional variation',
      'jaggery': 'sugar for sweeter churma'
    },
    isOfflineAvailable: true,
    tags: ['Traditional', 'Royal Cuisine', 'Festive', 'Desert Food'],
    servings: 4,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Gangaur',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '4',
    title: 'Bengali Fish Curry',
    cuisine: 'Bengali',
    state: 'West Bengal',
    city: 'Kolkata',
    region: 'East',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
    cookingTime: 40,
    prepTime: 15,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Rohu fish pieces',
      '2 Potatoes cut in wedges',
      '3 tbsp Mustard oil',
      '1 tsp Panch phoron',
      '2 Bay leaves',
      '2 tbsp Ginger-garlic paste',
      '1 tsp Turmeric powder',
      '2 tsp Red chili powder',
      '2 Tomatoes chopped',
      'Fresh coriander'
    ],
    steps: [
      'Marinate fish pieces with turmeric and salt for 15 minutes',
      'Heat mustard oil in kadai until smoking, then reduce heat',
      'Fry fish pieces until golden, remove and set aside',
      'Fry potato wedges until crispy edges, remove and set aside',
      'Add panch phoron and bay leaves to the oil',
      'Add ginger-garlic paste and cook until fragrant',
      'Add tomatoes, turmeric, and chili powder, cook until oil separates',
      'Add fried fish and potatoes, simmer in gravy for 10 minutes',
      'Garnish with coriander and serve with steamed rice'
    ],
    calories: 320,
    macros: { protein: 25, carbs: 18, fat: 16 },
    culturalFact: 'Bengali fish curry reflects the love for fish in Bengal culture. Mustard oil and panch phoron are essential ingredients that give this curry its distinctive flavor.',
    substitutions: {
      'rohu fish': 'katla or any fresh water fish',
      'mustard oil': 'regular oil (though flavor will differ)'
    },
    isOfflineAvailable: false,
    tags: ['Fish Curry', 'Bengali', 'Coastal', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '5',
    title: 'Goan Fish Curry',
    cuisine: 'Goan',
    state: 'Goa',
    city: 'Panaji',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
    cookingTime: 35,
    prepTime: 15,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Kingfish pieces',
      '400ml Coconut milk',
      '8-10 Kokum petals',
      '2 tbsp Coconut oil',
      '1 Large onion sliced',
      '3 tbsp Goan fish curry masala',
      '1 tsp Turmeric powder',
      '4 Green chilies',
      'Curry leaves',
      'Salt to taste'
    ],
    steps: [
      'Marinate fish with turmeric and salt for 20 minutes',
      'Heat coconut oil in clay pot or heavy-bottomed pan',
      'Add sliced onions and cook until translucent',
      'Add fish curry masala and cook for 2 minutes',
      'Add coconut milk and bring to gentle boil',
      'Add kokum petals and green chilies',
      'Gently add fish pieces and simmer for 15 minutes',
      'Add curry leaves and adjust seasoning',
      'Serve hot with steamed rice or Goan bread'
    ],
    calories: 280,
    macros: { protein: 24, carbs: 8, fat: 18 },
    culturalFact: 'Goan fish curry showcases the Portuguese influence on Indian cuisine. Kokum gives it a tangy flavor and coconut milk provides the creamy base typical of coastal cooking.',
    substitutions: {
      'kingfish': 'pomfret or any firm white fish',
      'kokum': 'tamarind paste for tanginess'
    },
    isOfflineAvailable: true,
    tags: ['Coastal', 'Portuguese Influence', 'Coconut Based', 'Spicy'],
    servings: 4,
    difficulty: 'Medium',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '6',
    title: 'Punjabi Chole Bhature',
    cuisine: 'Punjabi',
    state: 'Punjab',
    city: 'Amritsar',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500',
    cookingTime: 60,
    prepTime: 20,
    spiceLevel: 'Medium',
    effort: 'Medium',
    mealType: 'Lunch',
    dietType: ['Veg'],
    ingredients: [
      '2 cups Chickpeas (soaked overnight)',
      '2 cups All-purpose flour',
      '1/4 cup Yogurt',
      '2 tbsp Oil',
      '1 tsp Baking powder',
      '2 Large onions chopped',
      '4 Tomatoes chopped',
      'Chole masala powder',
      'Garam masala',
      'Fresh coriander'
    ],
    steps: [
      'Pressure cook soaked chickpeas with salt and tea bags for color',
      'Make bhature dough with flour, yogurt, oil, and baking powder',
      'Rest the dough for 30 minutes covered with damp cloth',
      'Heat oil in pan, add onions and cook until golden',
      'Add tomatoes and cook until soft and mushy',
      'Add chole masala, garam masala, and cooked chickpeas',
      'Simmer for 20 minutes until thick gravy forms',
      'Roll bhature and deep fry until puffed and golden',
      'Serve hot chole with fresh bhature and onion salad'
    ],
    calories: 420,
    macros: { protein: 16, carbs: 52, fat: 18 },
    culturalFact: 'Chole Bhature originated in the streets of Old Delhi and Punjab. The dish represents the hearty, robust flavors of North Indian cuisine.',
    substitutions: {
      'all-purpose flour': 'whole wheat flour for healthier bhature',
      'deep frying': 'shallow fry or bake bhature for lighter version'
    },
    isOfflineAvailable: true,
    tags: ['Street Food', 'Punjabi', 'Hearty', 'Popular'],
    servings: 4,
    difficulty: 'Medium',
    isHealthy: false,
    isStreetFood: true
  },
  {
    id: '7',
    title: 'Gujarati Dhokla',
    cuisine: 'Gujarati',
    state: 'Gujarat',
    city: 'Ahmedabad',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500',
    cookingTime: 45,
    prepTime: 10,
    spiceLevel: 'Mild',
    effort: 'Medium',
    mealType: 'Snacks',
    dietType: ['Veg', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '2 cups Gram flour (besan)',
      '1 cup Water',
      '2 tbsp Oil',
      '1 tsp Ginger-green chili paste',
      '1/2 tsp Turmeric powder',
      'Salt to taste',
      '1 tsp Eno fruit salt',
      '2 tbsp Lemon juice',
      'Mustard seeds for tempering',
      'Curry leaves and coriander'
    ],
    steps: [
      'Mix gram flour with water to make smooth batter',
      'Add oil, ginger-chili paste, turmeric, and salt',
      'Whisk the batter until light and fluffy',
      'Add lemon juice and eno, mix gently and immediately',
      'Pour into greased steaming plate and steam for 15 minutes',
      'Check with toothpick, it should come out clean',
      'Cool completely and cut into squares',
      'Prepare tempering with mustard seeds and curry leaves',
      'Pour tempering over dhokla and garnish with coriander',
      'Serve with green chutney and tamarind chutney'
    ],
    calories: 150,
    macros: { protein: 6, carbs: 20, fat: 5 },
    culturalFact: 'Dhokla is Gujarat\'s most famous snack, representing the state\'s preference for steamed, healthy foods. It\'s often eaten as breakfast or evening snack.',
    substitutions: {
      'eno fruit salt': 'baking soda with lemon juice',
      'gram flour': 'mix with rice flour for softer texture'
    },
    isOfflineAvailable: false,
    tags: ['Steamed', 'Healthy', 'Gujarati', 'Snack'],
    servings: 6,
    difficulty: 'Medium',
    isHealthy: true,
    isStreetFood: true
  },
  {
    id: '8',
    title: 'Kerala Appam with Stew',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Kochi',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500',
    cookingTime: 120,
    prepTime: 30,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Veg', 'Gluten-Free'],
    ingredients: [
      '3 cups Raw rice',
      '1 cup Cooked rice',
      '1/2 cup Coconut (grated)',
      '1 tsp Yeast',
      '2 tbsp Sugar',
      '400ml Coconut milk',
      'Mixed vegetables',
      'Whole spices',
      'Curry leaves',
      'Ginger and green chilies'
    ],
    steps: [
      'Soak raw rice for 4 hours, then grind with cooked rice and coconut',
      'Add yeast and sugar to the batter, ferment overnight',
      'Before cooking, add coconut milk to get right consistency',
      'Heat appam pan and pour batter, swirl to spread',
      'Cover and cook until edges are golden and center is fluffy',
      'For stew, heat coconut milk with whole spices',
      'Add vegetables and simmer until tender',
      'Season with salt and curry leaves',
      'Serve hot appam with aromatic vegetable stew'
    ],
    calories: 250,
    macros: { protein: 5, carbs: 45, fat: 8 },
    culturalFact: 'Appam with stew is a traditional Syrian Christian dish from Kerala, often served during special occasions and reflects the state\'s coastal cuisine.',
    substitutions: {
      'coconut milk': 'regular milk with coconut oil',
      'vegetables': 'chicken or mutton for non-veg version'
    },
    isOfflineAvailable: true,
    tags: ['Christian Cuisine', 'Coastal', 'Fermented', 'Traditional'],
    servings: 4,
    difficulty: 'Long',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '9',
    title: 'Maharashtrian Puran Poli',
    cuisine: 'Maharashtrian',
    state: 'Maharashtra',
    city: 'Mumbai',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1589301163868-90c5f1c2b3d8?w=500',
    cookingTime: 90,
    prepTime: 30,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dessert',
    dietType: ['Veg'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Chana dal',
      '1 cup Jaggery',
      '1/4 cup Ghee',
      '1/2 tsp Cardamom powder',
      'Pinch of nutmeg',
      '2 tbsp Oil',
      'Salt',
      'Turmeric powder'
    ],
    steps: [
      'Cook chana dal until very soft and mushy',
      'Add jaggery to hot dal and cook until thick',
      'Add cardamom powder and nutmeg, mix well and cool',
      'Make soft dough with wheat flour, oil, salt, and turmeric',
      'Rest the dough for 30 minutes covered',
      'Make small balls of dal mixture (puran)',
      'Roll out dough, place puran in center and seal',
      'Gently roll into flat bread without breaking',
      'Cook on tawa with ghee until golden spots appear',
      'Serve hot with ghee and milk'
    ],
    calories: 320,
    macros: { protein: 8, carbs: 58, fat: 8 },
    culturalFact: 'Puran Poli is Maharashtra\'s beloved sweet flatbread, traditionally made during festivals like Gudi Padwa and Holi, symbolizing prosperity and sweetness.',
    substitutions: {
      'chana dal': 'toor dal for different flavor',
      'jaggery': 'sugar for sweeter taste'
    },
    isOfflineAvailable: false,
    tags: ['Sweet', 'Festive', 'Maharashtrian', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Gudi Padwa',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '10',
    title: 'Kashmiri Rogan Josh',
    cuisine: 'Kashmiri',
    state: 'Jammu & Kashmir',
    city: 'Srinagar',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 120,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Mutton pieces',
      '1 cup Yogurt',
      '4 tbsp Ghee',
      '2 Bay leaves',
      '4 Green cardamom',
      '1 inch Cinnamon',
      '2 tsp Fennel powder',
      '1 tsp Ginger powder',
      'Kashmiri red chili powder',
      'Saffron soaked in milk'
    ],
    steps: [
      'Marinate mutton with yogurt and salt for 1 hour',
      'Heat ghee in heavy-bottomed pot, add whole spices',
      'Add marinated mutton and cook on high heat for 10 minutes',
      'Add fennel powder, ginger powder, and Kashmiri chili powder',
      'Cook covered on low heat for 1.5 hours until tender',
      'Add saffron milk for color and aroma',
      'Cook until oil separates and gravy thickens',
      'Garnish with fresh coriander and serve with rice',
      'Best enjoyed with Kashmiri naan or steamed basmati rice'
    ],
    calories: 380,
    macros: { protein: 32, carbs: 5, fat: 24 },
    culturalFact: 'Rogan Josh is the crown jewel of Kashmiri cuisine, brought by Persian cooks to the valley. The dish gets its name from \'rogan\' (oil) and \'josh\' (passion).',
    substitutions: {
      'mutton': 'chicken or paneer for lighter versions',
      'Kashmiri chili': 'paprika for color without heat'
    },
    isOfflineAvailable: true,
    tags: ['Royal Cuisine', 'Persian Influence', 'Saffron', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '11',
    title: 'Misal Pav',
    cuisine: 'Maharashtrian',
    state: 'Maharashtra',
    city: 'Mumbai',
    region: 'West',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500',
    cookingTime: 45,
    prepTime: 15,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Breakfast',
    dietType: ['Veg'],
    ingredients: [
      '2 cups Mixed sprouts',
      '4 Pav buns',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      'Curry leaves',
      '2 Onions chopped',
      '2 Tomatoes chopped',
      'Misal masala',
      'Fresh coriander'
    ],
    steps: [
      'Pressure cook mixed sprouts until soft',
      'Heat oil in pan, add mustard and cumin seeds',
      'Add curry leaves, onions, and tomatoes',
      'Add misal masala and cook until oil separates',
      'Add cooked sprouts and simmer for 10 minutes',
      'Toast pav buns with butter',
      'Serve misal with pav, chopped onions, and coriander',
      'Top with sev and lemon wedges'
    ],
    calories: 280,
    macros: { protein: 12, carbs: 35, fat: 10 },
    culturalFact: 'Misal Pav is Mumbai\'s favorite street breakfast, representing the city\'s love for spicy, flavorful food that\'s both filling and affordable.',
    substitutions: {
      'mixed sprouts': 'matki or moth beans',
      'pav': 'regular bread or roti'
    },
    isOfflineAvailable: true,
    tags: ['Street Food', 'Spicy', 'Breakfast', 'Mumbai'],
    servings: 4,
    difficulty: 'Quick',
    isHealthy: true,
    isStreetFood: true
  },
  {
    id: '12',
    title: 'Assamese Fish Tenga',
    cuisine: 'Assamese',
    state: 'Assam',
    city: 'Guwahati',
    region: 'Northeast',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
    cookingTime: 30,
    prepTime: 15,
    spiceLevel: 'Mild',
    effort: 'Easy',
    mealType: 'Lunch',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '500g Rohu fish pieces',
      '2 Tomatoes',
      '1 Lemon',
      '2 tbsp Mustard oil',
      '1 tsp Panch phoron',
      '2 Bay leaves',
      '1 tsp Turmeric powder',
      'Salt to taste',
      'Fresh coriander',
      'Green chilies'
    ],
    steps: [
      'Marinate fish with turmeric and salt for 15 minutes',
      'Heat mustard oil in pan until smoking',
      'Add panch phoron and bay leaves',
      'Add fish pieces and cook for 5 minutes',
      'Add tomatoes and cook until soft',
      'Add water and simmer for 15 minutes',
      'Add lemon juice and adjust seasoning',
      'Garnish with coriander and serve with rice'
    ],
    calories: 220,
    macros: { protein: 20, carbs: 8, fat: 12 },
    culturalFact: 'Fish Tenga is a light, tangy fish curry from Assam, reflecting the state\'s preference for simple, healthy cooking with minimal spices.',
    substitutions: {
      'rohu fish': 'any fresh water fish',
      'mustard oil': 'regular oil'
    },
    isOfflineAvailable: false,
    tags: ['Light', 'Tangy', 'Assamese', 'Healthy'],
    servings: 4,
    difficulty: 'Quick',
    isHealthy: true,
    isStreetFood: false
  },
  {
    id: '13',
    title: 'Tamil Nadu Chettinad Chicken',
    cuisine: 'Chettinad',
    state: 'Tamil Nadu',
    city: 'Chennai',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 60,
    prepTime: 20,
    spiceLevel: 'Spicy',
    effort: 'Medium',
    mealType: 'Dinner',
    dietType: ['Non-Veg', 'Gluten-Free'],
    ingredients: [
      '1 kg Chicken pieces',
      '2 tbsp Oil',
      '2 Onions chopped',
      '2 Tomatoes chopped',
      'Chettinad masala',
      'Curry leaves',
      'Whole spices',
      'Ginger-garlic paste',
      'Fresh coriander',
      'Lemon juice'
    ],
    steps: [
      'Marinate chicken with ginger-garlic paste and salt',
      'Heat oil in pan, add whole spices',
      'Add onions and cook until golden',
      'Add tomatoes and cook until soft',
      'Add Chettinad masala and cook for 2 minutes',
      'Add marinated chicken and cook for 10 minutes',
      'Add water and simmer for 30 minutes',
      'Garnish with coriander and serve with rice'
    ],
    calories: 350,
    macros: { protein: 28, carbs: 12, fat: 20 },
    culturalFact: 'Chettinad cuisine is known for its bold flavors and extensive use of spices, reflecting the trading heritage of the Chettiar community.',
    substitutions: {
      'chicken': 'mutton or paneer',
      'Chettinad masala': 'regular garam masala'
    },
    isOfflineAvailable: true,
    tags: ['Spicy', 'Chettinad', 'Bold Flavors', 'Traditional'],
    servings: 4,
    difficulty: 'Medium',
    isHealthy: false,
    isStreetFood: false
  },
  {
    id: '14',
    title: 'Bihari Litti Chokha',
    cuisine: 'Bihari',
    state: 'Bihar',
    city: 'Patna',
    region: 'East',
    image: 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=500',
    cookingTime: 90,
    prepTime: 30,
    spiceLevel: 'Medium',
    effort: 'Hard',
    mealType: 'Lunch',
    dietType: ['Veg'],
    ingredients: [
      '2 cups Wheat flour',
      '1 cup Sattu',
      '2 Potatoes',
      '2 Eggplants',
      '2 Tomatoes',
      'Ginger-garlic paste',
      'Mustard oil',
      'Whole spices',
      'Fresh coriander',
      'Lemon juice'
    ],
    steps: [
      'Make dough with wheat flour and water',
      'Mix sattu with spices and oil for filling',
      'Stuff dough balls with sattu mixture',
      'Bake litti in oven or roast on flame',
      'For chokha, roast potatoes, eggplants, and tomatoes',
      'Mash vegetables and add spices',
      'Add mustard oil and lemon juice',
      'Serve hot litti with chokha and ghee'
    ],
    calories: 380,
    macros: { protein: 14, carbs: 55, fat: 15 },
    culturalFact: 'Litti Chokha is Bihar\'s signature dish, representing the state\'s rustic, earthy flavors and traditional cooking methods.',
    substitutions: {
      'sattu': 'roasted gram flour',
      'mustard oil': 'regular oil'
    },
    isOfflineAvailable: true,
    tags: ['Rustic', 'Bihari', 'Traditional', 'Earthy'],
    servings: 4,
    difficulty: 'Long',
    isHealthy: true,
    isStreetFood: true
  },
  {
    id: '15',
    title: 'Himachali Siddu',
    cuisine: 'Himachali',
    state: 'Himachal Pradesh',
    city: 'Shimla',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1589301163868-90c5f1c2b3d8?w=500',
    cookingTime: 120,
    prepTime: 40,
    spiceLevel: 'Mild',
    effort: 'Hard',
    mealType: 'Dinner',
    dietType: ['Veg'],
    ingredients: [
      '3 cups Wheat flour',
      '1 cup Walnuts',
      '1 cup Poppy seeds',
      '1/2 cup Ghee',
      '1/4 cup Jaggery',
      'Cardamom powder',
      'Yeast',
      'Salt',
      'Water'
    ],
    steps: [
      'Activate yeast with warm water and sugar',
      'Make dough with wheat flour, yeast, and salt',
      'Rest dough for 2 hours until doubled',
      'Grind walnuts and poppy seeds with jaggery',
      'Add cardamom powder and ghee to filling',
      'Stuff dough balls with walnut mixture',
      'Steam siddu for 20 minutes',
      'Serve hot with ghee and chutney'
    ],
    calories: 320,
    macros: { protein: 10, carbs: 45, fat: 12 },
    culturalFact: 'Siddu is a traditional steamed bread from Himachal Pradesh, often served during festivals and special occasions in the mountain state.',
    substitutions: {
      'walnuts': 'almonds or mixed nuts',
      'jaggery': 'sugar or honey'
    },
    isOfflineAvailable: false,
    tags: ['Mountain Cuisine', 'Steamed', 'Festive', 'Traditional'],
    servings: 6,
    difficulty: 'Long',
    isFestive: true,
    festival: 'Lohri',
    isHealthy: true,
    isStreetFood: false
  }
];

export const mockQuizQuestions = [
  {
    id: 1,
    question: "How spicy do you like your Indian food?",
    options: [
      { value: "mild", label: "Mild - Like South Indian breakfast items" },
      { value: "medium", label: "Medium - Like Punjabi curries" },
      { value: "hot", label: "Hot - Like Andhra or Rajasthani food" }
    ]
  },
  {
    id: 2,
    question: "What's your preferred cooking time for Indian recipes?",
    options: [
      { value: "quick", label: "Under 30 minutes - Quick dal and sabzi" },
      { value: "moderate", label: "30-60 minutes - Biryanis and curries" },
      { value: "elaborate", label: "60+ minutes - Traditional dum cooking" }
    ]
  },
  {
    id: 3,
    question: "Which Indian region's cuisine excites you most?",
    options: [
      { value: "north", label: "North Indian - Punjab, Delhi, Kashmir" },
      { value: "south", label: "South Indian - Tamil Nadu, Kerala, Karnataka" },
      { value: "west", label: "West Indian - Gujarat, Maharashtra, Goa" },
      { value: "east", label: "East Indian - Bengal, Odisha, Assam" }
    ]
  },
  {
    id: 4,
    question: "What type of Indian meals do you prefer?",
    options: [
      { value: "rice-based", label: "Rice-based - Biryani, South Indian meals" },
      { value: "bread-based", label: "Bread-based - Roti, naan with curries" },
      { value: "street-food", label: "Street food - Chaat, snacks, appetizers" }
    ]
  },
  {
    id: 5,
    question: "What's your dietary preference for Indian cuisine?",
    options: [
      { value: "pure-veg", label: "Pure Vegetarian - Traditional Indian veg" },
      { value: "non-veg", label: "Non-Vegetarian - Including chicken, mutton" },
      { value: "coastal", label: "Coastal - Fish and seafood curries" }
    ]
  }
];

export const mockQuizResults = {
  "spicy-north-indian": {
    title: "Spicy North Indian Food Lover",
    description: "You love the rich, spicy flavors of Punjab, Rajasthan, and Kashmir!",
    recommendedRecipes: ['1', '3', '10']
  },
  "mild-south-indian": {
    title: "South Indian Cuisine Enthusiast",
    description: "You appreciate the subtle flavors and healthy cooking of South India.",
    recommendedRecipes: ['2', '8', '7']
  },
  "coastal-seafood": {
    title: "Coastal Indian Food Explorer",
    description: "You love the coconut-based curries and fresh seafood of coastal India.",
    recommendedRecipes: ['4', '5', '8']
  },
  "street-food-lover": {
    title: "Indian Street Food Connoisseur",
    description: "You enjoy the vibrant flavors of Indian chaats and snacks.",
    recommendedRecipes: ['6', '7', '9']
  },
  "traditional-home-cook": {
    title: "Traditional Indian Home Cook",
    description: "You prefer authentic, homestyle Indian cooking from various regions.",
    recommendedRecipes: ['1', '2', '3']
  }
};

// Location-aware data structures
export const indianStates = [
  { name: 'Andhra Pradesh', region: 'South', capital: 'Amaravati', popularCuisines: ['Telugu', 'Andhra'] },
  { name: 'Arunachal Pradesh', region: 'Northeast', capital: 'Itanagar', popularCuisines: ['Tribal', 'Northeastern'] },
  { name: 'Assam', region: 'Northeast', capital: 'Dispur', popularCuisines: ['Assamese', 'Tribal'] },
  { name: 'Bihar', region: 'East', capital: 'Patna', popularCuisines: ['Bihari', 'Maithili'] },
  { name: 'Chhattisgarh', region: 'Central', capital: 'Raipur', popularCuisines: ['Chhattisgarhi', 'Tribal'] },
  { name: 'Goa', region: 'West', capital: 'Panaji', popularCuisines: ['Goan', 'Portuguese-Indian'] },
  { name: 'Gujarat', region: 'West', capital: 'Gandhinagar', popularCuisines: ['Gujarati', 'Kathiawadi'] },
  { name: 'Haryana', region: 'North', capital: 'Chandigarh', popularCuisines: ['Haryanvi', 'Punjabi'] },
  { name: 'Himachal Pradesh', region: 'North', capital: 'Shimla', popularCuisines: ['Himachali', 'Pahari'] },
  { name: 'Jharkhand', region: 'East', capital: 'Ranchi', popularCuisines: ['Jharkhandi', 'Tribal'] },
  { name: 'Karnataka', region: 'South', capital: 'Bangalore', popularCuisines: ['Kannada', 'Mangalorean'] },
  { name: 'Kerala', region: 'South', capital: 'Thiruvananthapuram', popularCuisines: ['Malayali', 'Syrian Christian'] },
  { name: 'Madhya Pradesh', region: 'Central', capital: 'Bhopal', popularCuisines: ['Madhya Pradeshi', 'Bundelkhandi'] },
  { name: 'Maharashtra', region: 'West', capital: 'Mumbai', popularCuisines: ['Maharashtrian', 'Konkani'] },
  { name: 'Manipur', region: 'Northeast', capital: 'Imphal', popularCuisines: ['Manipuri', 'Tribal'] },
  { name: 'Meghalaya', region: 'Northeast', capital: 'Shillong', popularCuisines: ['Khasi', 'Garo'] },
  { name: 'Mizoram', region: 'Northeast', capital: 'Aizawl', popularCuisines: ['Mizo', 'Tribal'] },
  { name: 'Nagaland', region: 'Northeast', capital: 'Kohima', popularCuisines: ['Naga', 'Tribal'] },
  { name: 'Odisha', region: 'East', capital: 'Bhubaneswar', popularCuisines: ['Odia', 'Coastal'] },
  { name: 'Punjab', region: 'North', capital: 'Chandigarh', popularCuisines: ['Punjabi', 'Sikh'] },
  { name: 'Rajasthan', region: 'North', capital: 'Jaipur', popularCuisines: ['Rajasthani', 'Marwari'] },
  { name: 'Sikkim', region: 'Northeast', capital: 'Gangtok', popularCuisines: ['Sikkimese', 'Nepali'] },
  { name: 'Tamil Nadu', region: 'South', capital: 'Chennai', popularCuisines: ['Tamil', 'Chettinad'] },
  { name: 'Telangana', region: 'South', capital: 'Hyderabad', popularCuisines: ['Telugu', 'Hyderabadi'] },
  { name: 'Tripura', region: 'Northeast', capital: 'Agartala', popularCuisines: ['Tripuri', 'Bengali'] },
  { name: 'Uttar Pradesh', region: 'North', capital: 'Lucknow', popularCuisines: ['Awadhi', 'Bhojpuri'] },
  { name: 'Uttarakhand', region: 'North', capital: 'Dehradun', popularCuisines: ['Kumaoni', 'Garhwali'] },
  { name: 'West Bengal', region: 'East', capital: 'Kolkata', popularCuisines: ['Bengali', 'Calcutta'] }
];

export const regionalCategories = {
  'North': {
    name: 'North Indian',
    description: 'Rich, hearty flavors from Punjab, Rajasthan, Kashmir, and Uttar Pradesh',
    popularDishes: ['Butter Chicken', 'Rogan Josh', 'Dal Baati Churma', 'Chole Bhature'],
    spices: ['Garam Masala', 'Kashmiri Red Chili', 'Saffron', 'Cardamom'],
    cookingStyle: 'Tandoor, Dum cooking, Rich gravies'
  },
  'South': {
    name: 'South Indian',
    description: 'Light, healthy dishes from Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh',
    popularDishes: ['Masala Dosa', 'Appam with Stew', 'Chettinad Chicken', 'Hyderabadi Biryani'],
    spices: ['Curry Leaves', 'Mustard Seeds', 'Coconut', 'Black Pepper'],
    cookingStyle: 'Steaming, Fermentation, Coconut-based curries'
  },
  'East': {
    name: 'East Indian',
    description: 'Subtle, fish-loving cuisine from Bengal, Bihar, and Odisha',
    popularDishes: ['Bengali Fish Curry', 'Litti Chokha', 'Rasgulla', 'Machher Jhol'],
    spices: ['Panch Phoron', 'Mustard Oil', 'Poppy Seeds', 'Bay Leaves'],
    cookingStyle: 'Light curries, Fish dishes, Sweet desserts'
  },
  'West': {
    name: 'West Indian',
    description: 'Diverse flavors from Maharashtra, Gujarat, and Goa',
    popularDishes: ['Misal Pav', 'Dhokla', 'Goan Fish Curry', 'Puran Poli'],
    spices: ['Kokum', 'Coconut', 'Jaggery', 'Kokum'],
    cookingStyle: 'Street food, Coastal dishes, Portuguese influence'
  },
  'Central': {
    name: 'Central Indian',
    description: 'Rustic, hearty food from Madhya Pradesh and Chhattisgarh',
    popularDishes: ['Poha', 'Dal Bafla', 'Bhutte ka Kees', 'Sabudana Khichdi'],
    spices: ['Hing', 'Coriander', 'Cumin', 'Turmeric'],
    cookingStyle: 'Simple cooking, Wheat-based dishes, Tribal influence'
  },
  'Northeast': {
    name: 'Northeast Indian',
    description: 'Unique tribal and hill cuisine from the seven sisters',
    popularDishes: ['Fish Tenga', 'Bamboo Rice', 'Axone', 'Thukpa'],
    spices: ['Bhut Jolokia', 'Bamboo Shoots', 'Fermented Fish', 'Local Herbs'],
    cookingStyle: 'Fermentation, Bamboo cooking, Minimal spices'
  }
};

export const festivalCategories = [
  {
    name: 'Diwali',
    description: 'Festival of Lights - Sweet and savory treats',
    recipes: ['1', '9', '15'],
    colors: ['Gold', 'Red', 'Orange'],
    period: 'October-November'
  },
  {
    name: 'Holi',
    description: 'Festival of Colors - Gujiya and thandai',
    recipes: ['3', '9', '14'],
    colors: ['Pink', 'Green', 'Yellow'],
    period: 'March'
  },
  {
    name: 'Eid',
    description: 'Muslim festival - Biryani and sweets',
    recipes: ['1', '10', '13'],
    colors: ['Green', 'White', 'Gold'],
    period: 'Variable'
  },
  {
    name: 'Gudi Padwa',
    description: 'Maharashtrian New Year - Puran Poli',
    recipes: ['9', '11', '14'],
    colors: ['Saffron', 'Green', 'Red'],
    period: 'March-April'
  },
  {
    name: 'Lohri',
    description: 'Punjabi winter festival - Sarson da saag',
    recipes: ['6', '10', '15'],
    colors: ['Orange', 'Yellow', 'Red'],
    period: 'January'
  }
];

export const mealCategories = [
  {
    name: 'Breakfast',
    description: 'Start your day with traditional Indian breakfast',
    recipes: ['2', '7', '11'],
    icon: '🌅',
    timing: '6 AM - 10 AM'
  },
  {
    name: 'Lunch',
    description: 'Hearty midday meals from across India',
    recipes: ['1', '3', '4', '5', '6', '12', '14'],
    icon: '🌞',
    timing: '12 PM - 3 PM'
  },
  {
    name: 'Dinner',
    description: 'Comforting evening meals',
    recipes: ['8', '10', '13', '15'],
    icon: '🌙',
    timing: '7 PM - 10 PM'
  },
  {
    name: 'Snacks',
    description: 'Quick bites and street food',
    recipes: ['7', '11', '14'],
    icon: '🍿',
    timing: '4 PM - 7 PM'
  },
  {
    name: 'Dessert',
    description: 'Sweet endings to your meal',
    recipes: ['9', '15'],
    icon: '🍰',
    timing: 'After meals'
  }
];

export const difficultyLevels = [
  {
    name: 'Quick',
    description: 'Under 30 minutes',
    icon: '⚡',
    timeRange: '< 30 min',
    recipes: ['2', '7', '11', '12']
  },
  {
    name: 'Medium',
    description: '30-60 minutes',
    icon: '⏱️',
    timeRange: '30-60 min',
    recipes: ['4', '5', '6', '13']
  },
  {
    name: 'Long',
    description: 'Over 60 minutes',
    icon: '🕐',
    timeRange: '60+ min',
    recipes: ['1', '3', '8', '9', '10', '14', '15']
  }
];

export const dietTypes = [
  {
    name: 'Veg',
    icon: '🟢',
    description: 'Pure vegetarian dishes',
    recipes: ['2', '3', '6', '7', '8', '9', '11', '14', '15']
  },
  {
    name: 'Non-Veg',
    icon: '🔴',
    description: 'Meat and fish dishes',
    recipes: ['1', '4', '5', '10', '12', '13']
  },
  {
    name: 'Vegan',
    icon: '🌱',
    description: 'Plant-based dishes',
    recipes: ['2', '7', '8']
  },
  {
    name: 'Gluten-Free',
    icon: '🌾',
    description: 'No gluten ingredients',
    recipes: ['1', '2', '3', '4', '5', '8', '12', '13']
  }
];

export const spiceLevels = [
  {
    name: 'Mild',
    icon: '🌶️',
    description: 'Gentle flavors, suitable for everyone',
    recipes: ['2', '7', '8', '9', '12', '15']
  },
  {
    name: 'Medium',
    icon: '🌶️🌶️',
    description: 'Balanced heat, most popular',
    recipes: ['1', '3', '4', '6', '10', '14']
  },
  {
    name: 'Spicy',
    icon: '🌶️🌶️🌶️',
    description: 'Hot and fiery flavors',
    recipes: ['5', '11', '13']
  }
];

// Reverse cooking ingredients
export const commonIngredients = [
  {
    name: 'Aloo (Potato)',
    category: 'Vegetables',
    recipes: ['2', '3', '4', '11', '14'],
    icon: '🥔'
  },
  {
    name: 'Tomato',
    category: 'Vegetables',
    recipes: ['1', '2', '4', '5', '6', '11', '12', '13', '14'],
    icon: '🍅'
  },
  {
    name: 'Onion',
    category: 'Vegetables',
    recipes: ['1', '2', '4', '5', '6', '11', '12', '13', '14'],
    icon: '🧅'
  },
  {
    name: 'Rice',
    category: 'Grains',
    recipes: ['1', '8', '10', '12'],
    icon: '🍚'
  },
  {
    name: 'Wheat Flour',
    category: 'Grains',
    recipes: ['3', '6', '9', '14', '15'],
    icon: '🌾'
  },
  {
    name: 'Chicken',
    category: 'Meat',
    recipes: ['13'],
    icon: '🍗'
  },
  {
    name: 'Fish',
    category: 'Seafood',
    recipes: ['4', '5', '12'],
    icon: '🐟'
  },
  {
    name: 'Mutton',
    category: 'Meat',
    recipes: ['1', '10'],
    icon: '🐑'
  },
  {
    name: 'Roti',
    category: 'Bread',
    recipes: ['3', '6', '14'],
    icon: '🫓'
  },
  {
    name: 'Dal',
    category: 'Pulses',
    recipes: ['3', '4', '11', '14'],
    icon: '🫘'
  }
];

// Leftover utilization recipes
export const leftoverRecipes = [
  {
    name: 'Roti Churma',
    description: 'Sweet crumbled roti with ghee and sugar',
    ingredients: ['Roti', 'Ghee', 'Sugar', 'Cardamom'],
    difficulty: 'Quick',
    time: '10 min'
  },
  {
    name: 'Dal Paratha',
    description: 'Stuffed paratha with leftover dal',
    ingredients: ['Leftover Dal', 'Wheat Flour', 'Onion', 'Spices'],
    difficulty: 'Medium',
    time: '20 min'
  },
  {
    name: 'Fried Rice',
    description: 'Quick fried rice with leftover rice',
    ingredients: ['Leftover Rice', 'Vegetables', 'Oil', 'Soy Sauce'],
    difficulty: 'Quick',
    time: '15 min'
  },
  {
    name: 'Sabzi Pakora',
    description: 'Fritters made with leftover vegetables',
    ingredients: ['Leftover Sabzi', 'Gram Flour', 'Spices', 'Oil'],
    difficulty: 'Quick',
    time: '15 min'
  },
  {
    name: 'Rice Pudding',
    description: 'Sweet kheer with leftover rice',
    ingredients: ['Leftover Rice', 'Milk', 'Sugar', 'Cardamom'],
    difficulty: 'Medium',
    time: '30 min'
  }
];

export const culturalFacts = [
  "Saffron, worth more than gold, is primarily grown in Kashmir and gives dishes their royal golden color.",
  "The concept of 'Dum' cooking was brought to India by the Mughals and involves slow cooking in sealed pots.",
  "Each Indian state has its own unique spice blend - from Bengal's Panch Phoron to Karnataka's Sambar powder.",
  "The word 'curry' comes from the Tamil word 'kari' meaning sauce or relish.",
  "India is the world's largest producer of spices, contributing 75% of global spice production.",
  "The traditional Indian thali represents the balance of six tastes: sweet, sour, salty, bitter, pungent, and astringent.",
  "Fermentation in Indian cooking, like in dosa and idli, was developed as a way to preserve food and enhance nutrition.",
  "The use of mustard oil in Eastern India is not just for flavor but also for its medicinal properties.",
  "Indian pickles (achaar) were originally created as a way to preserve vegetables for long journeys.",
  "The concept of 'tadka' or tempering spices in hot oil is unique to Indian cuisine and enhances flavor dramatically."
];

export const substitutionTips = [
  "Replace coconut milk with cashew cream for North Indian adaptations of South Indian dishes",
  "Use hung curd instead of cream for healthier versions of rich Indian gravies",
  "Substitute jaggery with dates paste for natural sweetness in traditional Indian sweets",
  "Replace ghee with coconut oil for vegan versions of traditional dishes",
  "Use quinoa instead of rice for protein-rich, gluten-free alternatives",
  "Substitute paneer with tofu for vegan versions of popular dishes",
  "Replace refined oil with mustard oil for authentic Eastern Indian flavors",
  "Use brown rice instead of white rice for healthier grain options",
  "Substitute wheat flour with millet flour for gluten-free breads",
  "Replace sugar with stevia or monk fruit for diabetic-friendly desserts"
];

// Location-based recipe suggestions
export const locationBasedSuggestions = {
  'Maharashtra': {
    title: 'Taste of Maharashtra',
    description: 'Discover the diverse flavors of Maharashtra',
    recipes: ['9', '11'],
    popularCities: ['Mumbai', 'Pune', 'Nagpur', 'Aurangabad']
  },
  'Gujarat': {
    title: 'Gujarati Delights',
    description: 'Explore the vegetarian paradise of Gujarat',
    recipes: ['7'],
    popularCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot']
  },
  'Punjab': {
    title: 'Punjabi Flavors',
    description: 'Experience the hearty cuisine of Punjab',
    recipes: ['6'],
    popularCities: ['Amritsar', 'Chandigarh', 'Ludhiana', 'Jalandhar']
  },
  'Karnataka': {
    title: 'Karnataka Cuisine',
    description: 'From Bangalore to Mangalore, explore Karnataka',
    recipes: ['2'],
    popularCities: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli']
  },
  'Kerala': {
    title: 'Kerala Specialties',
    description: 'Coastal and backwater flavors of Kerala',
    recipes: ['8'],
    popularCities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur']
  },
  'West Bengal': {
    title: 'Bengali Cuisine',
    description: 'Fish and sweets from the land of Tagore',
    recipes: ['4'],
    popularCities: ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri']
  },
  'Telangana': {
    title: 'Hyderabadi Delicacies',
    description: 'Royal cuisine from the city of Nizams',
    recipes: ['1'],
    popularCities: ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad']
  },
  'Rajasthan': {
    title: 'Rajasthani Royalty',
    description: 'Desert flavors and royal traditions',
    recipes: ['3'],
    popularCities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Jaisalmer']
  }
};