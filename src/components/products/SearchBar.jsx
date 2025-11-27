'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ initialSearch }) => {
  const [search, setSearch] = useState(initialSearch || '');
  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      if (search.trim()) {
        router.push(`/products?search=${encodeURIComponent(search.trim())}`);
      } else if (window.location.pathname === '/products' && window.location.search) {
        router.push('/products');
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router]);

  return (
    <div className="max-w-md mx-auto relative">
      <input
        type="text"
        placeholder="Search for products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full py-3 px-4 pl-12 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-sm"
      />
      <div className="absolute left-4 top-3.5 text-gray-400">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;