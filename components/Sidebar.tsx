'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    setIsOpening(true);
  };
  return (
    <div className="lg:grid">
      <div
        className="cursor-pointer border-b px-3 py-2 lg:hidden"
        onClick={handleMenuToggle}
      >
        Menu
      </div>
      <div
        onTransitionEnd={() => setIsOpening(false)}
        className={`absolute bottom-0 top-11 w-full bg-[#F8F8F2] p-3 shadow lg:transition-none lg:static lg:w-auto lg:border-r lg:translate-x-0 z-50 lg:z-0 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isOpening ? 'transition-transform duration-300' : ''}`}
      >
        <nav className="grid px-3 py-6">
          <Link
            onClick={handleMenuToggle}
            href="/"
            className="my-2 rounded border border-blue-800 p-2 text-center font-semibold transition-colors text-blue-800 hover:text-blue-500 hover:border-blue-500"
          >
            Home
          </Link>
          <Link
            onClick={handleMenuToggle}
            href="/products"
            className="my-2 rounded border border-blue-800 p-2 text-center font-semibold transition-colors text-blue-800 hover:text-blue-500 hover:border-blue-500"
          >
            Products
          </Link>
        </nav>
      </div>
    </div>
  );
}
