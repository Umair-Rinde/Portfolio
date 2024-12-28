import Image from 'next/image';
import { Email, Phone, LogoGithub, LogoLinkedin } from '@carbon/icons-react';

export const Header = () => (
  <header className="bg-gray-900 text-white p-10 flex items-center justify-between">
    {/* Profile Picture */}
    <div className="flex items-center space-x-8">
      <div className="relative w-40 h-40 rounded-full border-4 border-white overflow-hidden">
        <Image
          src="/ukr.svg" // Replace with the path to your profile picture
          alt="Profile Picture"
          fill
          className="object-cover"
          priority
        />
      </div>
      <h1 className="text-5xl font-bold">Umair Rinde</h1>
    </div>

    {/* Contact Details */}
    <div className="flex items-center space-x-16">
      {/* Contact Info */}
      <div className="flex flex-col text-xl space-y-3">
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

      {/* Social Links */}
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
