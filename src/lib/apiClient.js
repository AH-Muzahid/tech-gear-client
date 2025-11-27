'use client';

import { getSession } from 'next-auth/react';
import { API_ENDPOINTS, getApiUrl } from './api';

// Client-side API helper with authentication
export async function apiClient(url, options = {}) {
    const session = await getSession();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Add auth token if session exists
    if (session?.accessToken) {
        headers.Authorization = `Bearer ${session.accessToken}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Authenticated API methods
export const authenticatedApi = {
    post: async (endpoint, data) => {
        const session = await getSession();
        const url = getApiUrl(endpoint);

        const headers = {
            'Content-Type': 'application/json',
        };

        if (session?.accessToken) {
            headers.Authorization = `Bearer ${session.accessToken}`;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'An error occurred' }));
            throw new Error(error.message || 'Request failed');
        }

        return response.json();
    },

    put: async (endpoint, data) => {
        const session = await getSession();
        const url = getApiUrl(endpoint);

        const headers = {
            'Content-Type': 'application/json',
        };

        if (session?.accessToken) {
            headers.Authorization = `Bearer ${session.accessToken}`;
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'An error occurred' }));
            throw new Error(error.message || 'Request failed');
        }

        return response.json();
    },

    delete: async (endpoint) => {
        const session = await getSession();
        const url = getApiUrl(endpoint);

        const headers = {};

        if (session?.accessToken) {
            headers.Authorization = `Bearer ${session.accessToken}`;
        }

        const response = await fetch(url, {
            method: 'DELETE',
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'An error occurred' }));
            throw new Error(error.message || 'Request failed');
        }

        return response.json();
    },
};

