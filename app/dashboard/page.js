"use client";

import Add_data_dashboard from "@/components/AddDataDashboard";
import Get_data_dashboard from "@/components/Get_data_dashboard";
import LinktreeLoading from "@/components/LinktreeLoading";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import { Plus, Link2, Globe, Edit3, Eye, Copy, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SignInButton } from "@clerk/nextjs";

export default function LinktreeForm() {
  // useUser from Clerk for getting user info
  const { user, isLoaded } = useUser();

  // ❗️MUST be declared before any conditional return to follow the Rules of Hooks
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Handle copying the public profile link
  const handleCopy = async () => {
    const textToCopy = `${window.location.origin}/links/${user.id}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success("Url copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy URL!");
    }
  };

  if (!isLoaded) {
    return <LinktreeLoading />;
  }

  // ✅ If user is not logged in, show "Not allowed"
  if (!user) {
    return (
      <>
        {/* <Navbar /> */}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
          <div className="max-w-md mx-auto px-4">
            <div className="flex items-center justify-center min-h-[80vh]">
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 text-center w-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-8V7m0 0V5m0 2h2m-2 0H10M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-3 font-outfit">
                  Authentication Required
                </h1>

                {/* Subtitle */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                  You need to be signed in to access your Linktree dashboard and
                  manage your links.
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <SignInButton>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg">
                      Sign In
                    </button>
                  </SignInButton>
                  {/* <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium">
                  Create Account
                </button> */}
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-3 text-sm text-gray-500">or</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Learn More */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">New to Linktree?</p>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
                    Learn more about creating your link-in-bio →
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Link2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      All Your Links
                    </div>
                    <div className="text-xs text-gray-500">
                      One link to connect everything
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Track Analytics
                    </div>
                    <div className="text-xs text-gray-500">
                      See how your links perform
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Link2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-outfit">
              Your Linktree
            </h1>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
              <Globe className="w-4 h-4 text-gray-500" />
              <p className="text-gray-600 font-medium">
                linktr.ee/yourusername
              </p>
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 border border-gray-100">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="rounded-full"
                    src={user.imageUrl}
                    alt="profile"
                    height={100}
                    width={100}
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-gray-700 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-2xl font-bold">{user.fullName}</p>
              </div>
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-500">Links</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2.4K</div>
                <div className="text-sm text-gray-500">Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">156</div>
                <div className="text-sm text-gray-500">Clicks</div>
              </div>
            </div>
          </div>

          {/* Add New Link Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Add New Link
              </h2>
            </div>
            <Add_data_dashboard />
          </div>

          {/* Your Links Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Links
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Preview
                </button>
                <div className="w-px h-4 bg-gray-300"></div>
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Analytics
                </button>
              </div>
            </div>
            <Get_data_dashboard />
          </div>

          {/* Share Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="text-center">
              <div className="flex items-center gap-3 justify-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Share Your Link
                </h2>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-dashed border-gray-200">
                <p className="text-sm text-gray-500 mb-3">Your public link</p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <code className="font-mono text-lg text-gray-900 bg-white px-4 py-2 rounded-lg border">
                    {origin ? `${origin}/links/${user.id}` : `.../links/${user.id}`}
                  </code>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleCopy}
                  className="bg-black text-white py-3 px-8 rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 font-medium"
                >
                  Copy Link
                </button>
                <button className="bg-gray-100 text-gray-700 py-3 px-8 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium">
                  Share on Social
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Eye className="w-4 h-4 text-orange-600" />
              </div>
              <div className="text-sm font-medium text-gray-900">Preview</div>
              <div className="text-xs text-gray-500">See how it looks</div>
            </button>
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-900">Analytics</div>
              <div className="text-xs text-gray-500">Track performance</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
