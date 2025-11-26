'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCloudUploadAlt, FaTag, FaMoneyBillWave, FaAlignLeft, FaLink } from 'react-icons/fa';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const res = await fetch('https://tech-gear-server-gmu3jry2o-ah-muzahids-projects.vercel.app//products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('✅ Product Added Successfully!');
        router.push('/products');
        router.refresh();
      } else {
        alert('❌ Failed to add product');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-slate-900 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Add New Product</h2>
          <p className="text-slate-400">Fill in the details to add a new item to the store.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Title Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Product Title</label>
            <div className="relative">
              <FaTag className="absolute top-3.5 left-4 text-gray-400" />
              <input
                type="text"
                name="title"
                required
                placeholder="e.g., Sony Wireless Headphones"
                value={formData.title}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
              <div className="relative">
                <FaMoneyBillWave className="absolute top-3.5 left-4 text-gray-400" />
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="299"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
              <div className="relative">
                <FaLink className="absolute top-3.5 left-4 text-gray-400" />
                <input
                  type="url"
                  name="image"
                  required
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <div className="relative">
              <FaAlignLeft className="absolute top-3.5 left-4 text-gray-400 mt-1" />
              <textarea
                name="description"
                required
                rows="4"
                placeholder="Write a short description about the product..."
                value={formData.description}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Adding Product...' : (
              <>
                <FaCloudUploadAlt size={20} /> Publish Product
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}