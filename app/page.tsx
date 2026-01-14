// app/page.tsx

export const dynamic = "force-dynamic";

import { getAllProducts, getCategories } from '@/lib/api';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { ShoppingBag } from 'lucide-react';
import { Suspense } from 'react';

async function ProductsContent() {
  const products = await getAllProducts();
  const categories = await getCategories();

  if (!products.length) {
    return <ErrorState message="Failed to load products" />;
  }

  return <ProductGrid products={products} categories={categories} />;
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(12)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
            <ShoppingBag className="w-8 h-8 text-amber-600" />
            Product Explorer
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Suspense fallback={<LoadingGrid />}>
          <ProductsContent />
        </Suspense>
      </main>
    </div>
  );
}
