'use client';

import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from "../../../../lib/firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';

const SideNav = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const path = usePathname();

  useEffect(() => {
    console.log(path);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if authenticated
      } else {
        router.push('/SignIn'); // Redirect to SignIn if not authenticated
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/SignIn'); // Redirect to SignIn page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    // Prevent rendering dashboard content until user is authenticated
    return null;
  }

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: "/dashboard"
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: "/dashboard/budget"
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: "/dashboard/expense"
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: "/dashboard/upgrade"
    },
  ];

  return (
    <div className="h-screen p-5 shadow-lg">
      <h1 className="text-2xl font-bold text-black">Expense Tracker</h1>
      <div className="text-black text-2xl mt-20 flex flex-col gap-7">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex hover:text-blue-700 hover:bg-blue-100 
              ${path === menu.path && 'bg-blue-100 text-blue-700'} 
              text-gray-700 cursor-pointer p-3 items-center gap-2 my-4`}
            >
              <menu.icon className="w-7 h-7" />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="flex justify-between gap-10 items-center fixed bottom-10">
        <p className="text-gray-800 font-bold text-xl">{user.email}</p>
        <button
          className="bg-red-600 text-[12px] text-white p-1 rounded"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SideNav;
