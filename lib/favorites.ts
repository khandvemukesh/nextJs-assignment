const FAVORITES_KEY = 'product-favorites';

export function getFavorites(): Set<number> {
  if (typeof window === 'undefined') return new Set();
  
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (stored) {
    try {
      return new Set(JSON.parse(stored));
    } catch {
      return new Set();
    }
  }
  return new Set();
}

export function saveFavorites(favorites: Set<number>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
}

export function toggleFavorite(productId: number): Set<number> {
  const favorites = getFavorites();
  
  if (favorites.has(productId)) {
    favorites.delete(productId);
  } else {
    favorites.add(productId);
  }
  
  saveFavorites(favorites);
  return favorites;
}