'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Footer = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();
      
      // Set up the initial stroke styles
      path.style.strokeDasharray = length.toString();
      path.style.strokeDashoffset = length.toString();

      const animatePath = () => {
        const scrollPercent = (document.documentElement.scrollTop + document.body.scrollTop) / 
          (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        
        const draw = length * scrollPercent * 3;
        path.style.strokeDashoffset = (length - draw).toString();
      };

      window.addEventListener('scroll', animatePath);
      return () => window.removeEventListener('scroll', animatePath);
    }
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-12 relative overflow-hidden">
      {/* Animated SVG Wave */}
      <div className="absolute top-0 left-0 w-full h-20 -translate-y-1/2">
        <svg 
          viewBox="0 0 1440 120" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            ref={pathRef}
            d="M0,96L48,90C96,84,192,72,288,72C384,72,480,84,576,96C672,108,768,120,864,120C960,120,1056,108,1152,96C1248,84,1344,72,1392,66L1440,60L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="currentColor"
            className="text-gray-800"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Logo with animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mb-8"
          >
            <Link href="/" className="flex items-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                className="mr-3"
              >
                <motion.path
                  d="M20 0 L40 20 L20 40 L0 20 Z"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </svg>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Portfolio
              </span>
            </Link>
          </motion.div>

          {/* Social Links */}
          <div className="flex space-x-6 mb-8">
            {['github', 'linkedin', 'twitter', 'mail'].map((social, i) => (
              <motion.a
                key={social}
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label={social}
                whileHover={{ y: -3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {social === 'github' && (
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  )}
                  {social === 'linkedin' && (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  )}
                  {social === 'twitter' && (
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  )}
                  {social === 'mail' && (
                    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                  )}
                </svg>
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-gray-500 text-sm"
          >
            &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};