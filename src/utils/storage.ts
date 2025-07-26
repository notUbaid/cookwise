import { Recipe } from '@/data/mockData';

export interface HistoryEntry {
  id: string;
  title: string;
  timestamp: number;
  viewCount: number;
  lastViewed: number;
}

export interface FavoriteEntry {
  id: string;
  title: string;
  addedAt: number;
  cuisine: string;
  region: string;
  spiceLevel: string;
}

// Favorites Management
export const getFavorites = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem('saved-recipes') || '[]');
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const getFavoriteEntries = (): FavoriteEntry[] => {
  try {
    return JSON.parse(localStorage.getItem('favorite-entries') || '[]');
  } catch (error) {
    console.error('Error loading favorite entries:', error);
    return [];
  }
};

export const addToFavorites = (recipe: Recipe): void => {
  try {
    const savedIds = getFavorites();
    const favoriteEntries = getFavoriteEntries();
    
    if (!savedIds.includes(recipe.id)) {
      const newFavoriteEntry: FavoriteEntry = {
        id: recipe.id,
        title: recipe.title,
        addedAt: Date.now(),
        cuisine: recipe.cuisine,
        region: recipe.region,
        spiceLevel: recipe.spiceLevel
      };
      
      const newSavedIds = [...savedIds, recipe.id];
      const newFavoriteEntries = [...favoriteEntries, newFavoriteEntry];
      
      localStorage.setItem('saved-recipes', JSON.stringify(newSavedIds));
      localStorage.setItem('favorite-entries', JSON.stringify(newFavoriteEntries));
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const removeFromFavorites = (recipeId: string): void => {
  try {
    const savedIds = getFavorites();
    const favoriteEntries = getFavoriteEntries();
    
    const newSavedIds = savedIds.filter(id => id !== recipeId);
    const newFavoriteEntries = favoriteEntries.filter(fav => fav.id !== recipeId);
    
    localStorage.setItem('saved-recipes', JSON.stringify(newSavedIds));
    localStorage.setItem('favorite-entries', JSON.stringify(newFavoriteEntries));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

export const isFavorite = (recipeId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(recipeId);
};

export const clearAllFavorites = (): void => {
  try {
    localStorage.setItem('saved-recipes', JSON.stringify([]));
    localStorage.setItem('favorite-entries', JSON.stringify([]));
  } catch (error) {
    console.error('Error clearing favorites:', error);
  }
};

// History Management
export const getHistory = (): HistoryEntry[] => {
  try {
    return JSON.parse(localStorage.getItem('recipe-history') || '[]');
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

export const addToHistory = (recipe: Recipe): void => {
  try {
    const history = getHistory();
    const existingEntry = history.find(entry => entry.id === recipe.id);
    let newHistory: HistoryEntry[];

    if (existingEntry) {
      // Update existing entry
      newHistory = history.map(entry => 
        entry.id === recipe.id 
          ? { ...entry, viewCount: entry.viewCount + 1, lastViewed: Date.now() }
          : entry
      );
    } else {
      // Add new entry
      const newEntry: HistoryEntry = {
        id: recipe.id,
        title: recipe.title,
        timestamp: Date.now(),
        viewCount: 1,
        lastViewed: Date.now()
      };
      newHistory = [newEntry, ...history];
    }

    // Keep only last 50 entries
    newHistory = newHistory.slice(0, 50);
    
    localStorage.setItem('recipe-history', JSON.stringify(newHistory));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
};

export const removeFromHistory = (recipeId: string): void => {
  try {
    const history = getHistory();
    const newHistory = history.filter(entry => entry.id !== recipeId);
    localStorage.setItem('recipe-history', JSON.stringify(newHistory));
  } catch (error) {
    console.error('Error removing from history:', error);
  }
};

export const clearAllHistory = (): void => {
  try {
    localStorage.setItem('recipe-history', JSON.stringify([]));
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

// Utility functions
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
  return date.toLocaleDateString();
};

export const getFavoritesCount = (): number => {
  return getFavorites().length;
};

export const getHistoryCount = (): number => {
  return getHistory().length;
}; 