import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '@/hooks/useFavorites';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      // Wait for mount
    });
    
    expect(result.current.favorites.size).toBe(0);
  });

  it('should toggle favorite', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.toggleFavorite(1);
    });
    
    expect(result.current.isFavorite(1)).toBe(true);
    
    act(() => {
      result.current.toggleFavorite(1);
    });
    
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it('should persist favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.toggleFavorite(1);
      result.current.toggleFavorite(2);
    });
    
    const stored = localStorage.getItem('product-favorites');
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored!);
    expect(parsed).toContain(1);
    expect(parsed).toContain(2);
  });
});