'use client';
import {  Github, Eye, Star, GitFork, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "FEMS - Farmer Empowerment System",
      description: "A government-funded platform enabling farmers to access resources, expert advice, and track agricultural data with ease.",
      techStack: ["React", "NestJS", "MongoDB", "JWT", "Tailwind"],
      image: "🌾",
      demoUrl: "#",
      codeUrl: "https://github.com/Umair-Rinde/fems",
      stars: 95,
      forks: 27,
      status: "Production",
    },
    {
      id: 2,
      title: "Educationist.ai",
      description: "AI-based career guidance platform using LangChain and OpenAI to recommend personalized learning paths.",
      techStack: ["LangChain", "ChatGPT", "Python", "MongoDB", "React"],
      image: "🎯",
      demoUrl: "#",
      codeUrl: "https://github.com/Umair-Rinde/educationist-ai",
      stars: 134,
      forks: 44,
      status: "Stable",
    },
    {
      id: 3,
      title: "LMS - Learning Management System",
      description: "A full-featured LMS with blogs, course enrollment, authentication, and video streaming. Built with NestJS backend.",
      techStack: ["NestJS", "PostgreSQL", "React", "FFmpeg", "JWT"],
      image: "📚",
      demoUrl: "#",
      codeUrl: "https://github.com/Umair-Rinde/nestjs-lms",
      stars: 112,
      forks: 38,
      status: "Production",
    },
    {
      id: 4,
      title: "ITSM Project (Fladdra Consultancy)",
      description: "Incident management system built using Django and React. Supports email-to-ticket automation using Google Console.",
      techStack: ["Django", "React", "Google Cloud", "Azure", "SMTP"],
      image: "🛠️",
      demoUrl: "#",
      codeUrl: "#",
      stars: 89,
      forks: 21,
      status: "Enterprise",
    },
    {
      id: 5,
      title: "Career View App",
      description: "Mock interview and job-seeking mobile platform helping users prepare for real job roles using AI.",
      techStack: ["React Native", "Firebase", "Python", "MongoDB"],
      image: "📱",
      demoUrl: "#",
      codeUrl: "https://github.com/Umair-Rinde/career-view-app",
      stars: 102,
      forks: 35,
      status: "Mobile",
    },
    {
      id: 6,
      title: "Human Intrusion Detection System",
      description: "Camera-based real-time human detection using Flask and Arduino. Sends alerts via SMS using Twilio.",
      techStack: ["Flask", "Python", "Arduino", "SQLite", "Twilio"],
      image: "👁️",
      demoUrl: "#",
      codeUrl: "https://github.com/Umair-Rinde/human-intrusion-detection",
      stars: 75,
      forks: 18,
      status: "Scale",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextProject = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Production': return 'from-green-400 to-green-600';
      case 'Active': return 'from-blue-400 to-blue-600';
      case 'Stable': return 'from-cyan-400 to-cyan-600';
      case 'Enterprise': return 'from-purple-400 to-purple-600';
      case 'Mobile': return 'from-pink-400 to-pink-600';
      case 'Scale': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getVisibleProjects = () => {
    if (isMobile) {
      return [projects[currentIndex]];
    }
    
    const visibleProjects = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % projects.length;
      visibleProjects.push(projects[index]);
    }
    return visibleProjects;
  };

  const variants = {
    enter: (direction: string) => {
      return {
        x: direction === 'right' ? (isMobile ? 300 : 1000) : (isMobile ? -300 : -1000),
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: string) => {
      return {
        x: direction === 'right' ? (isMobile ? -300 : -1000) : (isMobile ? 300 : 1000),
        opacity: 0
      };
    }
  };

  return (
    <section id="projects" className="py-12 md:py-20 px-4 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-base md:text-xl text-foreground/80 max-w-3xl mx-auto px-2">
            Here are some of my recent projects that showcase my skills and passion for creating innovative solutions.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden">
          {/* Navigation Arrows */}
          <button 
            onClick={prevProject}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 glass p-2 rounded-full hover:bg-foreground/20 transition-all duration-300"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          <button 
            onClick={nextProject}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 glass p-2 rounded-full hover:bg-foreground/20 transition-all duration-300"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          {/* Carousel Slides */}
          <div className={`flex items-center justify-center ${isMobile ? 'px-2' : 'gap-6 px-10'} py-6 md:py-10 min-h-[500px] md:min-h-[700px]`}>
            {getVisibleProjects().map((project) => (
              <motion.div
                key={project.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className={`${isMobile ? 'w-full' : 'flex-1 min-w-0'}`}
              >
                <div className={`glass-card rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300 ${isMobile ? 'w-full' : 'w-full max-w-[500px]'} h-[500px] md:h-[600px] flex flex-col`}>
                  {/* Project Header */}
                  <div className="relative h-1/2">
                    <div className="h-full bg-gradient-to-br min-h-[200px] from-primary/20 to-cyan-500/20 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                      {project.image}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${getStatusColor(project.status)} text-white font-medium`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                
                  {/* Project Content */}
                  <div className="p-4 md:p-6 h-1/2 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors duration-300 font-mono">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-3 text-foreground/60">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          <span className="text-xs">{project.stars}</span>
                        </div>
                        <div className="flex items-center">
                          <GitFork className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          <span className="text-xs">{project.forks}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-foreground/70 mb-4 text-sm line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 text-xs bg-foreground/10 rounded border border-foreground/20 text-foreground/80 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 md:space-x-3 mt-auto">
                      <a
                        href={project.demoUrl}
                        className="flex items-center px-3 py-1.5 md:px-4 md:py-2 glass-card rounded-lg hover:bg-foreground/20 transition-all duration-300 group/btn flex-1 justify-center text-sm"
                      >
                        <Eye className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                        <span className="text-xs md:text-sm font-medium">Demo</span>
                      </a>
                      <a
                        href={project.codeUrl}
                        className="flex items-center px-3 py-1.5 md:px-4 md:py-2 glass-card rounded-lg hover:bg-foreground/20 transition-all duration-300 group/btn flex-1 justify-center text-sm"
                      >
                        <Github className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                        <span className="text-xs md:text-sm font-medium">Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 md:mt-8 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'right' : 'left');
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary md:w-6' : 'bg-foreground/20'}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;