'use client';

import { useState, useEffect } from 'react';
import { getFavorites, saveFavorites } from '@/lib/favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      saveFavorites(newFavorites);
      return newFavorites;
    });
  };

  const isFavorite = (productId: number) => favorites.has(productId);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}