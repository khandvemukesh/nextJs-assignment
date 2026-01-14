import { Product } from '@/types/product';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://fakestoreapi.com';

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Fetch failed: ${url}`, res.status);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`Fetch error: ${url}`, error);
    return null;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await safeFetch<Product[]>(`${API_BASE_URL}/products`);
  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  return await safeFetch<Product>(`${API_BASE_URL}/products/${id}`);
}

export async function getCategories(): Promise<string[]> {
  const data = await safeFetch<string[]>(
    `${API_BASE_URL}/products/categories`
  );
  return data ?? [];
}
