import { getAllProducts } from '@/lib/api';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { ErrorState } from '@/components/ErrorState';
// import { ThemeToggle } from '@/components/ThemeToggle';
import { ShoppingBag } from 'lucide-react';
import { Suspense } from 'react';

async function ProductsContent() {
  try {
    const products = await getAllProducts();

    return <ProductGrid products={products} categories={[]} />;
  } catch (error) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Failed to load products'}
      />
    );
  }
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
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-amber-600 dark:text-amber-300" />
              Product Explorer
            </h1>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<LoadingGrid />}>
          <ProductsContent />
        </Suspense>
      </main>
    </div>
  );
};