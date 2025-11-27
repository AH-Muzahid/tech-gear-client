'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaCloudUploadAlt, FaTag, FaMoneyBillWave, FaAlignLeft, FaLink, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { API_ENDPOINTS } from "@/lib/api";

export default function EditProductPage({ params }) {
    const router = useRouter();
    const { data: session } = useSession();
    const { id } = params;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.productById(id));

                if (!res.ok) {
                    setError('Failed to load product details');
                    return;
                }

                const data = await res.json();
                setFormData({
                    title: data.title || '',
                    price: data.price || '',
                    description: data.description || '',
                    image: data.image || ''
                });
            } catch (error) {
                setError('Failed to load product details');
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!session) {
            setError('You must be logged in to update products');
            setLoading(false);
            return;
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            if (session.accessToken) {
                headers.Authorization = `Bearer ${session.accessToken}`;
            }

            const res = await fetch(API_ENDPOINTS.productById(id), {
                method: 'PUT',
                headers,
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/dashboard/manage-products');
                router.refresh();
            } else {
                setError(data.message || 'Failed to update product. Please try again.');
            }
        } catch (error) {
            setError('Something went wrong! Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                <div className="bg-slate-900 p-8 flex items-center gap-4">
                    <Link href="/dashboard/manage-products" className="text-white hover:text-blue-400">
                        <FaArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Edit Product</h2>
                        <p className="text-slate-400">Update the details of your item.</p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-8 mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleUpdate} className="p-8 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Product Title</label>
                        <div className="relative">
                            <FaTag className="absolute top-3.5 left-4 text-gray-400" />
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                            <div className="relative">
                                <FaMoneyBillWave className="absolute top-3.5 left-4 text-gray-400" />
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                />
                            </div>
                        </div>
                        {/* Image */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                            <div className="relative">
                                <FaLink className="absolute top-3.5 left-4 text-gray-400" />
                                <input
                                    type="url"
                                    name="image"
                                    required
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                        <div className="relative">
                            <FaAlignLeft className="absolute top-3.5 left-4 text-gray-400 mt-1" />
                            <textarea
                                name="description"
                                required
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Updating...' : (
                            <>
                                <FaCloudUploadAlt size={20} /> Update Product
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}