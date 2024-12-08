"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase"; // Firebase auth instance

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true); // Loading state to handle async check
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/SignIn"); // Redirect to login if the user is not authenticated
      }
      setLoading(false); // Once the check is done, set loading to false
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth status
  }

  return <>{children}</>; // Render the protected content if authenticated
};

export default ProtectedRoute;
