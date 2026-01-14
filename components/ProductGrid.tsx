'use client';

import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { SearchAndFilter } from './SearchAndFilter';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

const ITEMS_PER_PAGE = 8;

export function ProductGrid({ products, categories }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, showFavoritesOnly]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesFavorites = !showFavoritesOnly || isFavorite(product.id);

      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [products, searchQuery, selectedCategory, showFavoritesOnly, isFavorite]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  if (!isLoaded) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>

        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            showFavoritesOnly
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Heart className={`w-5 h-5 ${showFavoritesOnly ? 'fill-white' : ''}`} />
          Favorites
          {favorites.size > 0 && (
            <span className="bg-white text-orange-500 text-xs font-bold px-2 py-1 rounded-full">
              {favorites.size}
            </span>
          )}
        </button>
      </div>

      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">No products found</h3>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">
            Showing {paginatedProducts.length} of {filteredProducts.length}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={() => toggleFavorite(product.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-500'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
