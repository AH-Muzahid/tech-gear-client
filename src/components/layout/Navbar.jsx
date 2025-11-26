'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react'; 
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaSignOutAlt, FaPlus, FaBoxOpen } from 'react-icons/fa';
import Image from 'next/image';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false); 
  
  
  const { data: session } = useSession();

  const links = [
    { id: 1, link: 'home', path: '/' },
    { id: 2, link: 'products', path: '/products' },
    { id: 3, link: 'about', path: '/about' },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-slate-900 sticky top-0 z-50 shadow-md">
      
      {/*  Logo  */}
      <div>
        <Link href="/">
          <h1 className="text-3xl font-bold font-signature ml-2 cursor-pointer hover:text-blue-400 transition duration-200">
            TechGear
          </h1>
        </Link>
      </div>

      {/*  Desktop Menu */}
      <ul className="hidden md:flex">
        {links.map(({ id, link, path }) => (
          <li key={id} className="px-4 cursor-pointer capitalize font-medium text-gray-300 hover:text-white hover:scale-105 transition duration-200">
            <Link href={path}>{link}</Link>
          </li>
        ))}
      </ul>

      {/* Right Side Menu  */}
      <div className="hidden md:flex gap-6 items-center">
        {/* Cart Icon */}
        <Link href="/cart" className='hover:text-blue-400 transition relative'>
            <FaShoppingCart size={20} />
            {/* Cart Badge  */}
            <span className="absolute -top-2 -right-2 bg-blue-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
        </Link>

        
        {session ? (
          <div className="relative">
            {/* User Avatar / Profile Button */}
            <div 
              onClick={() => setProfileMenu(!profileMenu)}
              className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition"
            >
              {session.user?.image ? (
                <Image 
                  src={session.user.image} 
                  alt="user" 
                  width={32} 
                  height={32} 
                  className="rounded-full border border-gray-500"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
              )}
              <span className="font-medium max-w-[100px] truncate">{session.user?.name}</span>
            </div>

            {/* Dropdown Menu */}
            {profileMenu && (
              <div className="absolute right-0 top-12 w-56 bg-white text-slate-900 rounded-lg shadow-xl overflow-hidden py-2 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100 mb-2">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="font-bold truncate">{session.user?.email}</p>
                </div>
                
                
                <Link href="/dashboard/add-product" className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition">
                   <FaPlus className="text-blue-600" /> Add Product
                </Link>
                <Link href="/dashboard/manage-products" className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition">
                   <FaBoxOpen className="text-blue-600" /> Manage Products
                </Link>
                
                <div className="border-t border-gray-100 mt-2">
                  <button 
                    onClick={() => signOut()} 
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-2 transition"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* --- CONDITION: যদি লগইন না থাকে --- */
          <Link 
            href="/login"
            className="bg-blue-600 px-5 py-2 rounded-md text-sm font-bold hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Login
          </Link>
        )}
      </div>

      {/* --- Mobile Hamburger --- */}
      <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-300 md:hidden">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* --- Mobile Menu --- */}
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-gray-300">
          {links.map(({ id, link, path }) => (
            <li key={id} className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <Link onClick={() => setNav(!nav)} href={path}>{link}</Link>
            </li>
          ))}
          
          <li className="py-6">
             {session ? (
               <button onClick={() => { signOut(); setNav(false); }} className="bg-red-600 px-6 py-3 rounded-lg text-xl text-white">
                 Sign Out
               </button>
             ) : (
               <Link onClick={() => setNav(!nav)} href="/login" className="bg-blue-600 px-6 py-3 rounded-lg text-xl text-white">
                 Login
               </Link>
             )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;