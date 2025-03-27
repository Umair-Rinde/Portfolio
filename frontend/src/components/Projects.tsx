'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';

export const Projects = () => {
  const projects = [
    {
      name: 'BizItsm',
      description: 'The ITSM project focuses on streamlining IT service management processes, including incident, problem, and change management. It aims to automate workflows, improve service delivery, and enhance efficiency.',
      image: 'itsm.svg',
      link: 'https://bizitsm.com',
    },
    {
      name: 'Educationist Ai',
      description: 'Educationist.ai is a career guidance platform that leverages LangChain and ChatGPT to provide personalized career advice using advanced AI models to analyze user inputs and suggest tailored career paths.',
      image: 'educationist.svg',
      link: '#',
    },
    {
      name: 'LMS',
      description: 'The LMS built with NestJS is a comprehensive platform that includes features such as blogs and course purchasing options, designed for scalability with a user-friendly interface.',
      image: 'lms.png',
      link: '#',
    },
    {
      name: 'FEMS',
      description: 'The Farmer Empowerment Management System supports farmers by providing tools and resources to enhance productivity and decision-making with market insights and farming tips.',
      image: 'fems.png',
      link: '#',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const projectRefs = projects.map(() => React.useRef(null));
  const inViewFlags = projectRefs.map((ref) => useInView(ref, { once: false, amount: 1 }));

  useEffect(() => {
    const visibleIndex = inViewFlags.findIndex((inView) => inView);
    if ( visibleIndex !== activeIndex) {
      setActiveIndex(visibleIndex);
    }
  }, [inViewFlags, activeIndex]);

  return (
    <section className="py-12 bg-gray-900 text-white">
      <h2 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 shadow-lg">
        Projects
      </h2>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="relative flex flex-col md:flex-row gap-16">
          {/* Vertical Stepper (Desktop) - Adjusted height */}
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
                    style={{ height: '450px' }} // Increased height to match card spacing
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Project Cards - Same as before */}
          <div className="flex-1 flex flex-col gap-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                ref={projectRefs[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={inViewFlags[index] ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Link href={project.link}>
                  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-[1.01]">
                    <div className="h-48 w-full bg-gray-600 relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
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