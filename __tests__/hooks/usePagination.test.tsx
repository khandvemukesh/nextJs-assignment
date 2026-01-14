import { renderHook, act } from '@testing-library/react';
import { usePagination } from '@/hooks/usePagination';

const mockItems = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

describe('usePagination', () => {
  it('should initialize with correct values', () => {
    const { result } = renderHook(() => 
      usePagination({ items: mockItems, itemsPerPage: 10 })
    );
    
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.paginatedItems).toHaveLength(10);
  });

  it('should navigate to next page', () => {
    const { result } = renderHook(() => 
      usePagination({ items: mockItems, itemsPerPage: 10 })
    );
    
    act(() => {
      result.current.nextPage();
    });
    
    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedItems).toHaveLength(10);
  });

  it('should navigate to previous page', () => {
    const { result } = renderHook(() => 
      usePagination({ items: mockItems, itemsPerPage: 10 })
    );
    
    act(() => {
      result.current.nextPage();
      result.current.prevPage();
    });
    
    expect(result.current.currentPage).toBe(1);
  });

  it('should not exceed bounds', () => {
    const { result } = renderHook(() => 
      usePagination({ items: mockItems, itemsPerPage: 10 })
    );
    
    act(() => {
      result.current.prevPage(); // Should stay at 1
    });
    
    expect(result.current.currentPage).toBe(1);
    
    act(() => {
      result.current.goToPage(10); // Should cap at 3
    });
    
    expect(result.current.currentPage).toBe(3);
  });

  it('should reset page', () => {
    const { result } = renderHook(() => 
      usePagination({ items: mockItems, itemsPerPage: 10 })
    );
    
    act(() => {
      result.current.goToPage(3);
      result.current.resetPage();
    });
    
    expect(result.current.currentPage).toBe(1);
  });
});