'use client';

import Image from 'next/image';
import { Product } from '@/types/product';

type Props = {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function ProductCard({ product, isFavorite, onToggleFavorite }: Props) {
  return (
    <div>
      <Image src={product.image} alt={product.title} width={200} height={200} />

      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <span>{product.category}</span>

      <button
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={onToggleFavorite}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
