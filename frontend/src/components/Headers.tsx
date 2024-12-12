// components/Header.tsx
import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-header-heigh text-gray-200 flex bg-custom-black items-center justify-between border-b-2 border-gray-500 shadow-glaze ">
      {/* Logo */}
      
      <Image
      src="/profile.png"
      width={230}
      height={200}
      alt="Picture of the author"
      className='flex justify-start  p-0'
      style={{
        WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0))',
        maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0))'
      }}
    />
      {/* <div className="text-2xl font-bold text-gray-100">Umair Rinde</div> */}
      {/* Navigation */}
      {/* <nav className="space-x-6">
        <a href="#about" className="hover:text-gray-300 transition">
          About
        </a>
        <a href="#projects" className="hover:text-gray-300 transition">
          Projects
        </a>
        <a href="#contact" className="hover:text-gray-300 transition">
          Contact
        </a>
      </nav> */}
    </header>
  );
};

export default Header;
