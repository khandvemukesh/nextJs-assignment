import { Product, SortOption } from '@/types/product';

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    default:
      return sorted;
  }
}

export function filterProducts(
  products: Product[],
  searchQuery: string,
  category: string,
  favorites: Set<number>,
  showFavoritesOnly: boolean
): Product[] {
  return products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    const matchesFavorites = !showFavoritesOnly || favorites.has(product.id);

    return matchesSearch && matchesCategory && matchesFavorites;
  });
}

export function paginateArray<T>(array: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return array.slice(start, end);
}