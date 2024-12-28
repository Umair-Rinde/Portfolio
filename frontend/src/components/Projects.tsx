'use client';

import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

export const Projects = () => {
  const projects = [
    {
      name: 'BizItsm',
      description: 'The ITSM project focuses on streamlining IT service management processes, including incident, problem, and change management. It aims to automate workflows, improve service delivery, and enhance efficiency. The solution provides a centralized platform for managing IT requests and issues within an organization.',
      image: 'itsm.svg',
      link: 'https://bizitsm.com',
    },
    {
      name: 'Educationist Ai',
      description: 'Educationist.ai is a career guidance platform that leverages LangChain and ChatGPT to provide personalized career advice. The project uses advanced AI models to analyze user inputs and suggest tailored career paths. It aims to empower individuals with insights and recommendations for their professional journey.',
      image: 'educationist.svg',
      link: '#',
    },
    {
      name: 'LMS',
      description: 'The LMS built with NestJS is a comprehensive platform that includes features such as blogs and course purchasing options. It allows users to access educational content, engage with blogs, and purchase courses seamlessly. The system is designed for scalability, offering a user-friendly interface for both learners and administrators.',
      image: 'lms.png',
      link: '#',
    },
    {
      name: 'FEMS',
      description: 'The FEMS (Farmer Empowerment Management System) project is designed to support farmers by providing tools and resources to enhance their productivity and decision-making. The platform offers features such as market insights, farming tips, and financial assistance options. Its goal is to empower farmers with the knowledge and support needed to improve their livelihoods and sustain their agricultural practices.',
      image: 'fems.png',
      link: '#',
    },
  ];

  const sliderRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    arrows: false, 
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev(); 
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handleDotClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index); 
    }
  };

  return (
    <section className="py-12 bg-gray-900 text-white">
      <h2 className="text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 shadow-lg">
        Projects
      </h2>

      <div className="flex justify-center items-center mx-auto max-w-4xl">
        <div className="relative w-full">
          <Slider ref={sliderRef} {...settings}>
            {projects.map((project, index) => (
              <div key={index} className="flex justify-center w-10 items-center">
                <Link href={project.link}>
                  <div className="bg-gray-800 p-6 align-middle rounded-xl shadow-lg w-full text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-700">
                    <div className="w-full h-48 mx-auto mb-4 relative bg-gray-600 rounded-xl flex justify-center items-center overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-3">{project.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>

          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-transparent text-white rounded-full hover:bg-gray-700"
            onClick={handlePrev}
          >
            &#60;
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-transparent text-white rounded-full hover:bg-gray-700"
            onClick={handleNext}
          >
            &#62;
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'}`}
                onClick={() => handleDotClick(index)} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
