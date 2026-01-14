export const dynamic = "force-dynamic";
import { getProductById, getAllProducts } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Star } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

/* ---------- Static Params ---------- */
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

/* ---------- Metadata ---------- */
export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const { id } = await params; // ✅ unwrap params
    const product = await getProductById(id);

    return {
      title: `${product.title} | Product Explorer`,
      description: product.description,
    };
  } catch {
    return {
      title: "Product Not Found",
    };
  }
}

/* ---------- Page ---------- */
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params; // ✅ unwrap params

  let product;

  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
              <div className="relative w-full h-96">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6">
              <span className="inline-block bg-amber-600 text-white-800 text-sm px-3 py-1 rounded-full">
                {product.category}
              </span>

              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-600 text-amber-600" />
                <span className="text-gray-900">{product.rating.rate}</span>
                <span className="text-gray-900">
                  ({product.rating.count} reviews)
                </span>
              </div>

              <div className="flex justify-between items-center border-y py-4">
                <span className="text-4xl font-bold text-amber-600">
                  ${product.price.toFixed(2)}
                </span>
                <FavoriteButton productId={product.id} />
              </div>

              <p className="text-gray-700">{product.description}</p>

              <button className="w-full bg-amber-600 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

