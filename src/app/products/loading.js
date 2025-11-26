import ProductSkeleton from "@/components/products/ProductSkeleton";
import { FaSearch } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header Skeleton (Static content keeps layout stable) */}
        <div className="mb-12 text-center animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded max-w-xl mx-auto mb-8"></div>

          {/* Search Bar Skeleton */}
          <div className="max-w-md mx-auto relative">
             <div className="h-12 bg-gray-200 rounded-full w-full"></div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {[...Array(6)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>

      </div>
    </div>
  );
}