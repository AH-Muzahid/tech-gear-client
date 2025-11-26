'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTrash, FaEdit, FaBoxOpen } from 'react-icons/fa';

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://tech-gear-server-gmu3jry2o-ah-muzahids-projects.vercel.app//products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://tech-gear-server-gmu3jry2o-ah-muzahids-projects.vercel.app//products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {

        setProducts(products.filter((product) => product._id !== id));
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting product');
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-xl font-bold text-slate-500">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <FaBoxOpen className="text-blue-600" /> Manage Inventory
          </h1>
          <span className="bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-full">
            Total Items: {products.length}
          </span>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                  <th className="p-4">Image</th>
                  <th className="p-4">Product Title</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-slate-50 transition">
                      <td className="p-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      </td>
                      <td className="p-4 font-bold text-slate-800">
                        {product.title}
                      </td>
                      <td className="p-4 text-blue-600 font-bold">
                        ${product.price}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-3">
                          <Link
                            href={`/dashboard/edit-product/${product._id}`}
                            className="text-gray-400 hover:text-blue-600 transition p-2 rounded-full hover:bg-blue-50"
                            title="Edit"
                          >
                            <FaEdit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-gray-400 hover:text-red-600 transition p-2 rounded-full hover:bg-red-50"
                            title="Delete"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-500">
                      No products found in inventory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}