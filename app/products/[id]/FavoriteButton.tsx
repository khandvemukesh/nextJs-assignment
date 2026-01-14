'use client';

import { useFavorites } from '@/hooks/useFavorites';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  productId: number;
}

export function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  if (!isLoaded) {
    return null;
  }

  const favorite = isFavorite(productId);

  return (
    <button
      onClick={() => toggleFavorite(productId)}
      className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-300 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={favorite}
    >
      <Heart
        className={`w-7 h-7 ${
          favorite ? 'fill-amber-500 text-amber-500' : 'text-gray-400 dark:text-gray-500'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}