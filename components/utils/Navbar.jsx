import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <img
          src="https://customize.casemandu.com.np/images/logo.jpg"
          alt="logo"
          className="h-12 object-contain"
        />
        <div className="h-12 w-[2px] bg-white"></div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
          Customise
        </h1>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <a
          href="https://www.casemandu.com.np"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-transparent border-2 border-white rounded-md text-white hover:bg-white hover:text-black transition duration-300"
        >
          Back to Casemandu
        </a>
        <Link href="/" className="text-white hover:text-gray-400 transition">
          Shopping History
        </Link>
        <Link href="/" className="text-white hover:text-gray-400 transition">
          Report a Problem
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
