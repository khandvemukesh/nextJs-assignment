import { sortProducts, filterProducts, paginateArray } from '@/lib/utils';
import { Product } from '@/types/product';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product A',
    price: 100,
    description: 'Description A',
    category: 'electronics',
    image: 'image1.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Product B',
    price: 50,
    description: 'Description B',
    category: 'clothing',
    image: 'image2.jpg',
    rating: { rate: 4.8, count: 200 },
  },
  {
    id: 3,
    title: 'Product C',
    price: 150,
    description: 'Description C',
    category: 'electronics',
    image: 'image3.jpg',
    rating: { rate: 4.2, count: 50 },
  },
];

describe('sortProducts', () => {
  it('should sort by price ascending', () => {
    const sorted = sortProducts(mockProducts, 'price-asc');
    expect(sorted[0].price).toBe(50);
    expect(sorted[2].price).toBe(150);
  });

  it('should sort by price descending', () => {
    const sorted = sortProducts(mockProducts, 'price-desc');
    expect(sorted[0].price).toBe(150);
    expect(sorted[2].price).toBe(50);
  });

  it('should sort by rating', () => {
    const sorted = sortProducts(mockProducts, 'rating');
    expect(sorted[0].rating.rate).toBe(4.8);
    expect(sorted[2].rating.rate).toBe(4.2);
  });

  it('should return original order for default sort', () => {
    const sorted = sortProducts(mockProducts, 'default');
    expect(sorted[0].id).toBe(1);
    expect(sorted[1].id).toBe(2);
  });
});

describe('filterProducts', () => {
  it('should filter by search query', () => {
    const filtered = filterProducts(mockProducts, 'Product A', 'all', new Set(), false);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('Product A');
  });

  it('should filter by category', () => {
    const filtered = filterProducts(mockProducts, '', 'electronics', new Set(), false);
    expect(filtered).toHaveLength(2);
  });

  it('should filter by favorites', () => {
    const favorites = new Set([1, 3]);
    const filtered = filterProducts(mockProducts, '', 'all', favorites, true);
    expect(filtered).toHaveLength(2);
    expect(filtered.map(p => p.id)).toEqual([1, 3]);
  });

  it('should combine multiple filters', () => {
    const favorites = new Set([1]);
    const filtered = filterProducts(mockProducts, 'Product A', 'electronics', favorites, true);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(1);
  });
});

describe('paginateArray', () => {
  it('should paginate correctly', () => {
    const page1 = paginateArray(mockProducts, 1, 2);
    expect(page1).toHaveLength(2);
    expect(page1[0].id).toBe(1);

    const page2 = paginateArray(mockProducts, 2, 2);
    expect(page2).toHaveLength(1);
    expect(page2[0].id).toBe(3);
  });

  it('should return empty array for invalid page', () => {
    const result = paginateArray(mockProducts, 10, 2);
    expect(result).toHaveLength(0);
  });
});