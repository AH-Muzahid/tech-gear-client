import ProductCard from "@/components/products/ProductCard";
import SearchBar from "@/components/products/SearchBar";


export const dynamic = "force-dynamic";

async function getProducts(searchTerm = '') {
  const url = searchTerm
    ? `https://tech-gear-server-gmu3jry2o-ah-muzahids-projects.vercel.app//products?search=${searchTerm}`
    : 'https://tech-gear-server-gmu3jry2o-ah-muzahids-projects.vercel.app//products';

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function ProductsPage(props) {

  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search || '';

  let products = [];
  try {
    products = await getProducts(searchTerm);
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-[1240px] mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">All Products</h1>
          <p className="text-slate-600 max-w-xl mx-auto mb-8">
            Explore our premium collection of tech gadgets. Find the best tools to upgrade your workflow.
          </p>

          <SearchBar initialSearch={searchTerm} />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-2xl font-bold text-gray-400">No products found for "{searchTerm}"</h3>
              <p className="text-gray-500 mt-2">Try searching with different keywords.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}