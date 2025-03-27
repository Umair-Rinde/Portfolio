'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const Projects = () => {
  const projects = [
    { 
      name: 'BizItsm', 
      description: 'ITSM streamlining project.', 
      image: '/itsm.svg', 
      link: 'https://bizitsm.com' 
    },
    { 
      name: 'Educationist Ai', 
      description: 'AI career guidance.', 
      image: '/educationist.svg', 
      link: '#' 
    },
    { 
      name: 'LMS', 
      description: 'NestJS LMS with course buying.', 
      image: '/lms.png', 
      link: '#' 
    },
    { 
      name: 'FEMS', 
      description: 'Farmer empowerment system.', 
      image: '/fems.png', 
      link: '#' 
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: firstRef, inView: firstInView } = useInView({ threshold: 1 });
  const { ref: secondRef, inView: secondInView } = useInView({ threshold: 1 });
  const { ref: thirdRef, inView: thirdInView } = useInView({ threshold: 1 });
  const { ref: fourthRef, inView: fourthInView } = useInView({ threshold: 1 });

  const inViewArray = [firstInView, secondInView, thirdInView, fourthInView];
  const refArray = [firstRef, secondRef, thirdRef, fourthRef];

  useEffect(() => {
    const visibleIndex = inViewArray.findIndex(inView => inView);
    if (visibleIndex !== -1) {
      setActiveIndex(visibleIndex);
    }
  }, [inViewArray, activeIndex]);

  return (
    <section className="py-12 bg-gray-900 text-white">
      <h2 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 shadow-lg">
        Projects
      </h2>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="relative flex flex-col md:flex-row gap-16">
          {/* Vertical Stepper (Desktop) */}
          <div className="hidden md:flex flex-col items-center mr-8 h-full">
            {projects.map((_, index) => (
              <React.Fragment key={index}>
                <button 
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    activeIndex === index ? 'bg-blue-500 scale-125' : 'bg-gray-600'
                  }`}
                >
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeDot"
                      className="w-3 h-3 bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
                {index < projects.length - 1 && (
                  <div 
                    className={`w-1 ${activeIndex > index ? 'bg-blue-500' : 'bg-gray-600'}`} 
                    style={{ height: '450px' }} 
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Project Cards */}
          <div className="flex-1 flex flex-col gap-20">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                ref={refArray[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={inViewArray[index] ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <Link href={project.link}>
                  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-[1.01]">
                    <div className="h-48 w-full bg-gray-600 relative overflow-hidden">
                      <Image 
                        src={project.image} 
                        alt={project.name} 
                        layout="fill" 
                        objectFit="cover" 
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-100 mb-3">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {project.description}
                      </p>
                      <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        View Project
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};