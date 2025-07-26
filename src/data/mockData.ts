export interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  state: string;
  city?: string;
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
    title: 'Hyderabadi Biryani',
    cuisine: 'Hyderabadi',
    state: 'Telangana',
    city: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2f9?w=500',
    cookingTime: 90,
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
    isOfflineAvailable: true
  },
  {
    id: '2',
    title: 'Masala Dosa',
    cuisine: 'South Indian',
    state: 'Karnataka',
    city: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    cookingTime: 30,
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
    isOfflineAvailable: true
  },
  {
    id: '3',
    title: 'Rajasthani Dal Baati Churma',
    cuisine: 'Rajasthani',
    state: 'Rajasthan',
    city: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=500',
    cookingTime: 75,
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
    isOfflineAvailable: true
  },
  {
    id: '4',
    title: 'Bengali Fish Curry',
    cuisine: 'Bengali',
    state: 'West Bengal',
    city: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
    cookingTime: 40,
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
    isOfflineAvailable: false
  },
  {
    id: '5',
    title: 'Goan Fish Curry',
    cuisine: 'Goan',
    state: 'Goa',
    city: 'Panaji',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
    cookingTime: 35,
    spiceLevel: 'Hot',
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
    isOfflineAvailable: true
  },
  {
    id: '6',
    title: 'Punjabi Chole Bhature',
    cuisine: 'Punjabi',
    state: 'Punjab',
    city: 'Amritsar',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500',
    cookingTime: 60,
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
    isOfflineAvailable: true
  },
  {
    id: '7',
    title: 'Gujarati Dhokla',
    cuisine: 'Gujarati',
    state: 'Gujarat',
    city: 'Ahmedabad',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500',
    cookingTime: 45,
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
    isOfflineAvailable: false
  },
  {
    id: '8',
    title: 'Kerala Appam with Stew',
    cuisine: 'Kerala',
    state: 'Kerala',
    city: 'Kochi',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500',
    cookingTime: 120,
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
    isOfflineAvailable: true
  },
  {
    id: '9',
    title: 'Maharashtrian Puran Poli',
    cuisine: 'Maharashtrian',
    state: 'Maharashtra',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1589301163868-90c5f1c2b3d8?w=500',
    cookingTime: 90,
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
    isOfflineAvailable: false
  },
  {
    id: '10',
    title: 'Kashmiri Rogan Josh',
    cuisine: 'Kashmiri',
    state: 'Jammu & Kashmir',
    city: 'Srinagar',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    cookingTime: 120,
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
    isOfflineAvailable: true
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

export const culturalFacts = [
  "Saffron, worth more than gold, is primarily grown in Kashmir and gives dishes their royal golden color.",
  "The concept of 'Dum' cooking was brought to India by the Mughals and involves slow cooking in sealed pots.",
  "Each Indian state has its own unique spice blend - from Bengal's Panch Phoron to Karnataka's Sambar powder."
];

export const substitutionTips = [
  "Replace coconut milk with cashew cream for North Indian adaptations of South Indian dishes",
  "Use hung curd instead of cream for healthier versions of rich Indian gravies",
  "Substitute jaggery with dates paste for natural sweetness in traditional Indian sweets"
];