// import { Product } from '@/types/product';

// const API_BASE_URL = 'https://fakestoreapi.com';

// export async function getAllProducts(): Promise<Product[]> {
//   const response = await fetch(`${API_BASE_URL}/products`, {
//     next: { revalidate: 3600 }
//   });
  
//   if (!response.ok) {
//     throw new Error('Failed to fetch products');
//   }
  
//   return response.json();
// }

// export async function getProductById(id: string): Promise<Product> {
//   const response = await fetch(`${API_BASE_URL}/products/${id}`, {
//     next: { revalidate: 3600 }
//   });
  
//   if (!response.ok) {
//     throw new Error('Failed to fetch product');
//   }
  
//   return response.json();
// }

// export async function getCategories(): Promise<string[]> {
//   const response = await fetch(`${API_BASE_URL}/products/categories`, {
//     next: { revalidate: 3600 }
//   });
  
//   if (!response.ok) {
//     throw new Error('Failed to fetch categories');
//   }
  
//   return response.json();
// }

// lib/api.ts

// lib/api.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";

export async function getAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
