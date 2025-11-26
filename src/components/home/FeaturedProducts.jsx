import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "../products/ProductSkeleton";  

const FeaturedProducts = ({ products }) => {
  return (
     
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1240px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Products
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Check out our latest arrivals selected just for you. High performance gear for your daily needs.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Check if products array exists and has data */}
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            // Fallback UI if no data is passed
            [...Array(6)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;