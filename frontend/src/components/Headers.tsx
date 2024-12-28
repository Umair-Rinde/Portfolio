import Image from 'next/image';
import { Email, Phone, LogoGithub, LogoLinkedin } from '@carbon/icons-react';

export const Header = () => (
  <header className="bg-gray-900 text-white p-6 md:p-10 flex items-center justify-between flex-col md:flex-row">
    <div className="flex items-center space-x-4 md:space-x-8 mb-6 md:mb-0">
      <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden">
        <Image
          src="/ukr.svg"
          alt="Profile Picture"
          fill
          className="object-cover"
          priority
        />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold">Umair Rinde</h1>
    </div>

    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-16">
      <div className="flex flex-col text-lg md:text-xl space-y-3 items-center md:items-start">
        <a
          href="tel:+919359343936"
          className="flex items-center space-x-4 hover:text-gray-400"
        >
          <Phone size={36} />
          <span>+91 9359343936</span>
        </a>
        <a
          href="mailto:rindeumair@gmail.com"
          className="flex items-center space-x-4 hover:text-gray-400"
        >
          <Email size={36} />
          <span>rindeumair@gmail.com</span>
        </a>
      </div>

      <div className="flex space-x-8">
        <a
          href="https://github.com/Umair-Rinde"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <LogoGithub size={50} />
        </a>
        <a
          href="https://www.linkedin.com/in/umair-rinde-198024231/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <LogoLinkedin size={50} />
        </a>
      </div>
    </div>
  </header>
);
