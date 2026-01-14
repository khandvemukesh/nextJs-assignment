export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  sortBy: SortOption;
  showFavoritesOnly: boolean;
}