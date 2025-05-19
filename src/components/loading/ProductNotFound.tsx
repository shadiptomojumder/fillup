import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ProductNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen py-10">
            <AlertTriangle size={48} className="text-red-500 mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Product Not Found</h1>
            <p className="text-gray-600">Sorry, the product you are looking for does not exist.</p>
            <Link href="/" className="mt-4 px-4 py-2 bg-primary text-white rounded-md">
                Go Back to Home
            </Link>
        </div>
    );
};

export default ProductNotFound;