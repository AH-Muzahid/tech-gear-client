import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaShoppingCart, FaTag } from "react-icons/fa";
import { API_ENDPOINTS } from "@/lib/api";

async function getProduct(id) {
  const res = await fetch(API_ENDPOINTS.productById(id), {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProductDetailsPage({ params }) {

  const { id } = params;

  const product = await getProduct(id);


  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-800">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link href="/" className="text-blue-600 hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-8 transition">
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Left Side: Large Image */}
            <div className="relative h-[400px] md:h-[600px] bg-gray-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover p-8 hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>

            {/* Right Side: Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wide mb-2">
                <FaTag />
                <span>Tech Gear</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {product.title}
              </h1>

              <p className="text-4xl font-bold text-slate-900 mb-6">
                ${product.price}
              </p>

              <div className="prose prose-slate max-w-none mb-8">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex gap-4 mt-auto">
                <button className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>

              <p className="mt-6 text-xs text-slate-400 text-center">
                Product ID: {product._id} • Free Shipping Available
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}