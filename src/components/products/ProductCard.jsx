import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  if (!product || !product._id || !product.title || product.price === undefined || !product.image) {
    return null;
  }

  const { _id, title, price, description, image } = product;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-64 bg-gray-100 group overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
          New
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={title}>
            {title}
          </h3>
        </div>
        <div>
          <p className="text-blue-600 font-bold text-lg">
            ${price}
          </p>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 grow">
          {description}
        </p>

        <div className="flex gap-2 mt-auto">

          <Link
            href={`/products/${_id}`}
            className="flex-1 text-center border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            View Details
          </Link>
          <button
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Add to Cart"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;