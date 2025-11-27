'use client';

import { useState, useEffect } from 'react';
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "../products/ProductSkeleton";
import { API_ENDPOINTS } from "@/lib/api";

const FeaturedProductsClient = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);

                const res = await fetch(API_ENDPOINTS.products(), {
                    cache: 'no-store',
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    mode: 'cors',
                });

                clearTimeout(timeoutId);

                if (!res.ok) {
                    setError('Failed to load products. Please try again later.');
                    setLoading(false);
                    return;
                }

                const data = await res.json();

                if (!Array.isArray(data)) {
                    setError('Invalid data format received from server');
                    setLoading(false);
                    return;
                }

                if (data.length === 0) {
                    setProducts([]);
                    setLoading(false);
                    return;
                }

                setProducts(data.slice(0, 8));
            } catch (err) {
                if (err.name === 'AbortError') {
                    setError('Request took too long. Please check your connection.');
                } else {
                    setError('Failed to load products. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-[1240px] mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Featured Products
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Check out our latest arrivals selected just for you. High performance gear for your daily needs.
                    </p>
                </div>

                {error && (
                    <div className="mb-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        [...Array(6)].map((_, index) => (
                            <ProductSkeleton key={`skeleton-${index}`} />
                        ))
                    ) : products && products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-slate-500 text-lg">No products available at the moment.</p>
                            <p className="text-slate-400 text-sm mt-2">Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProductsClient;

