
"use client";
import { useState } from "react";
import { Menu, X, User, Settings, Plus, BarChart3, Layout } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b fixed border-gray-200  top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                LinkTree
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Only show when user is signed in */}
          <SignedIn>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  Dashboard
                </Link>
                <Link
                  href={`/links/${user?.id}`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My Links
                </Link>
                <Link
                  href="#analytics"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  Analytics
                </Link>
                <Link
                  href="#templates"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Templates
                </Link>
              </div>
            </div>
          </SignedIn>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </button>
              </Link>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </SignedIn>
            
            <SignedOut>
              <SignInButton>
                <button className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm h-10 px-5 cursor-pointer transition-colors duration-200">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
            <SignedIn>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600  px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center"
                onClick={handleLinkClick}
              >
                <Layout className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                href={`/links/${user?.id}`}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
              >
                My Links
              </Link>
              <Link
                href="#analytics"
                className="text-gray-700 hover:text-blue-600  px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center"
                onClick={handleLinkClick}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Link>
              <Link
                href="#templates"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Templates
              </Link>

              {/* Mobile Action Buttons for Signed In Users */}
              <div className="pt-4 pb-3 border-t border-gray-300">
                <div className="flex items-center px-3 space-x-3">
                  <Link href="/dashboard" className="flex-1" onClick={handleLinkClick}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center w-full justify-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Link
                    </button>
                  </Link>
                  <div className="flex items-center">
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "h-8 w-8"
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="pt-4 pb-3 border-t border-gray-300">
                <div className="flex flex-col space-y-2 px-3">
                  <SignInButton>
                    <button className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-center border border-gray-300">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm h-10 px-5 cursor-pointer transition-colors duration-200">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}