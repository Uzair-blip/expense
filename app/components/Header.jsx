'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js useRouter hook for navigation
import { auth } from '../../lib/firebase'; // Firebase auth instance
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Header = () => {
  const router = useRouter(); // Initialize the router
  const [user, setUser] = useState(null); // State to track the logged-in user

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push('/SignIn'); // Redirect to SignIn page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <div className="p-7 border shadow-md flex items-center justify-between">
        <h1 className="text-3xl font-semibold underline">Expense Tracker</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-bold">Welcome, {user.email}</span>
            <button
              className="bg-red-600 text-white p-2 rounded"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            className="bg-black text-white p-3 rounded"
            onClick={() => router.push('/SignIn')} // Navigate to SignIn page
          >
            Get Started
          </button>
        )}
      </div>
    </>
  );
};

export default Header;
