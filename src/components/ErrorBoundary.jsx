'use client';

import React from 'react';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';
import logger from '@/lib/logger';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        logger.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="mb-6">
                            <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-4" />
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h1>
                            <p className="text-slate-600 mb-4">
                                We encountered an unexpected error. Don't worry, your data is safe.
                            </p>
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-left">
                                    <p className="text-sm text-red-800 font-mono break-all">
                                        {this.state.error.toString()}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                            >
                                <FaHome /> Go Home
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-slate-300 transition"
                            >
                                <FaRedo /> Reload
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

