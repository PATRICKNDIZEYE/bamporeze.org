'use client'
import { useState } from 'react';

interface DebugProps {
    data: any;
    title?: string;
}

export default function ApiDebug({ data, title = "API Response Debug" }: DebugProps) {
    const [isVisible, setIsVisible] = useState(false);
    
    if (process.env.NODE_ENV === 'production') {
        return null;
    }
    
    return (
        <div className="bg-gray-100 border border-gray-300 p-4 my-4 rounded">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <button 
                    onClick={() => setIsVisible(!isVisible)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {isVisible ? 'Hide' : 'Show'} Data
                </button>
            </div>
            
            {isVisible && (
                <pre className="mt-4 p-3 bg-gray-800 text-white rounded overflow-auto max-h-[600px]">
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
} 