// API Configuration
const getApiBaseUrl = () => {
    // Priority 1: Environment variable (works for both dev and prod)
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }

    // Priority 2: Check if we're in production
    if (process.env.NODE_ENV === 'production') {
        // Default production backend URL
        return 'https://tech-gear-server-gmu3jry2o-ah-muzahids-projects.vercel.app';
    }

    // Priority 3: Development - check if running on localhost
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return 'http://localhost:5000';
    }

    // Fallback to localhost for server-side rendering in development
    return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to ensure URLs don't have double slashes
export function getApiUrl(path) {
    const base = API_BASE_URL.replace(/\/+$/, ''); // Remove trailing slashes
    const cleanPath = path.replace(/^\/+/, ''); // Remove leading slashes
    return `${base}/${cleanPath}`;
}

// API endpoints
export const API_ENDPOINTS = {
    products: () => getApiUrl('products'),
    productById: (id) => getApiUrl(`products/${id}`),
    productsSearch: (searchTerm) => getApiUrl(`products?search=${encodeURIComponent(searchTerm)}`),
    register: () => getApiUrl('register'),
};

