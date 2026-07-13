
'use client';

import { useEffect, useState } from 'react';

export default function Links({ params }) {
  const [credentials, setCredentials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!params?.links || params.links === 'undefined') {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`/api/getLinks?userId=${params.links}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch links');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.data);
        setCredentials(data.data || []);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params?.links]);

  const userName = credentials[0]?.userName || 'Anonymous';
  const imgUrl =
    credentials[0]?.imgUrl ||
    'https://ui-avatars.com/api/?name=Anonymous&background=random';

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Profile Loading Skeleton */}
          <div className="text-center mb-10">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-xl ring-4 ring-purple-100 bg-gray-200 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-3 mx-auto w-48"></div>
          </div>

          {/* Links Loading Skeleton */}
          <div className="space-y-5">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="w-full bg-white border border-gray-200 rounded-2xl p-5 shadow-lg"
              >
                <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto w-3/4"></div>
              </div>
            ))}
          </div>

          {/* Loading indicator */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 text-purple-600">
              <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Loading links...</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">Made with 💜</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">Made with 💜</p>
          </div>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-10">
          <div className="relative mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgUrl}
              alt="Profile"
              height={100}
              width={100}
              className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-xl ring-4 ring-purple-100 object-cover animate-fade-in"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{userName}</h1>
        </div>

        {/* Links Section */}
        {credentials.length === 0 ? (
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Links Found</h3>
            <p className="text-gray-500">This profile doesn&apos;t have any links yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {credentials.map((credential, index) => (
              <div 
                key={credential._id || index} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <a
                  href={credential.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full bg-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 border border-gray-200 rounded-2xl p-5 text-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:border-transparent"
                >
                  <span className="text-gray-800 group-hover:text-white font-semibold text-lg transition-colors duration-300">
                    🌐 {credential.linkText}
                  </span>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">Made with 💜</p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}