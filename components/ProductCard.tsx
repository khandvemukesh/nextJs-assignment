'use client';

import { Product } from '@/types/product';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-amber-300">
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="relative w-full h-64 bg-white p-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6"
            sizes="(max-width: 400px) 100vw, (max-width: 500px) 50vw, 25vw"
          />
        </div>
        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
          {product.category}
        </span>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite ? 'fill-orange-500 text-orange-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}