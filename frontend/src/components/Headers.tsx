import Image from 'next/image';
import { Email, Phone, LogoGithub, LogoLinkedin } from '@carbon/icons-react';

export const Header = () => (
  <header className="bg-gray-900 text-white p-6 md:p-12 gap-2 flex flex-col md:flex-row items-center justify-between">
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="relative w-24 h-24 md:w-40 md:h-40 shrink-0 rounded-full border-4 border-white overflow-hidden">
        <Image
          src="/ukr.svg"
          alt="Profile Picture"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="text-center md:text-left md:ml-8">
        <h1 className="text-4xl md:text-5xl font-bold">Umair Rinde</h1>
        <p className="text-lg md:text-xl mt-2 max-w-lg mx-auto md:mx-0">
          I’m Umair Rinde, a software developer skilled in Django, NestJS, and Python. I build scalable solutions, from AI platforms to business tools, and thrive on solving complex problems.
        </p>
      </div>
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
