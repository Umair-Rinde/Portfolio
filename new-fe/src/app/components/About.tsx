"use client";

import { Code, Palette, Zap, Users, Terminal, Pause, Play, ChevronUp, ChevronDown } from "lucide-react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import SkillModal from "./SkillModal";

const MotionDiv = motion("div");

type Skill = {
  name: string;
  level: number;
  color: string;
  image: string;
  experience: string;
  description: string;
};

const About = () => {
  const skills = [
    {
      name: 'Python',
      level: 80,
      color: 'from-yellow-400 to-blue-400',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      experience: 'Used extensively in backend development with Django and FastAPI. Projects include ITSM tools, AI integrations (LangChain), and SMS/IoT solutions.',
      description: 'Python is a high-level programming language known for its readability and wide use in web development, data science, and automation.'
    },
    {
      name: 'FastAPI',
      level: 80,
      color: 'from-green-400 to-teal-500',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
      experience: 'Structured FastAPI apps using modular architecture. Integrated JWT, role-based access, and MongoDB/PostgreSQL. Used in AI and assessment projects.',
      description: 'FastAPI is a modern Python web framework for building APIs with automatic docs and high performance, thanks to Starlette and Pydantic.'
    },
    {
      name: 'Django',
      level: 85,
      color: 'from-green-700 to-gray-900',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
      experience: 'Used Django in full-stack applications and REST API development. Integrated JWT authentication, PostgreSQL, and MongoDB (mongoengine).',
      description: 'Django is a high-level Python web framework that promotes rapid development and clean, pragmatic design. It includes ORM, admin, and built-in security.'
    },
    {
      name: 'React',
      level: 80,
      color: 'from-cyan-400 to-blue-600',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      experience: 'I have been working with React for over 3 years, building complex web applications with state management using Redux and Context API. I have experience with React Hooks, functional components, and performance optimization techniques.',
      description: 'React is a JavaScript library for building user interfaces, particularly web applications. It allows developers to create reusable UI components and efficiently update the user interface when data changes.'
    },
    {
      name: 'Next.js',
      level: 75,
      color: 'from-black to-gray-800',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      experience: 'Used Next.js for server-side rendering, routing, and building SEO-optimized pages. Familiar with dynamic routing, app directory, and integrating Tailwind with Next.js.',
      description: 'Next.js is a React framework that enables server-side rendering, static site generation, and routing. It simplifies building full-stack React applications.'
    },
    {
      name: 'TypeScript',
      level: 80,
      color: 'from-blue-600 to-blue-400',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      experience: 'Regularly use TypeScript for type-safe React and NestJS applications. Comfortable with types, interfaces, generics, and typing third-party modules.',
      description: 'TypeScript is a typed superset of JavaScript that provides static typing and improves developer tooling for large-scale applications.'
    },
    {
      name: 'NestJS',
      level: 85,
      color: 'from-red-600 to-pink-700',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
      experience: 'Built scalable backend APIs using NestJS with Sequelize and PostgreSQL. Implemented custom decorators, guards, interceptors, and dynamic modules.',
      description: 'NestJS is a progressive Node.js framework for building efficient, scalable, and enterprise-grade backend applications using TypeScript.'
    },
    {
      name: 'JavaScript',
      level: 85,
      color: 'from-yellow-400 to-orange-400',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      experience: 'Core language behind most of your frontend and backend work. Strong grasp of ES6+ syntax, async/await, closures, and functional programming.',
      description: 'JavaScript is a versatile language for web development used to create dynamic and interactive websites. It runs in both browsers and server-side environments.'
    },
    {
      name: 'LangChain',
      level: 70,
      color: 'from-violet-600 to-fuchsia-500',
      image: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/langchain.svg',
      experience: 'Used LangChain with OpenAI API to build AI-driven question generation and career guidance tools. Familiar with chain setup, prompt templates, and document loaders.',
      description: 'LangChain is a framework that helps developers build applications powered by language models through chaining LLMs with tools and data.'
    },
    {
      name: 'MongoDB',
      level: 70,
      color: 'from-green-600 to-lime-500',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      experience: 'Used with mongoengine and Mongoose. Applied in skill assessment, AI question generation, and role-based access models.',
      description: 'MongoDB is a NoSQL document-oriented database used for storing semi-structured data with high flexibility and scalability.'
    },
    {
      name: 'PostgreSQL',
      level: 80,
      color: 'from-blue-700 to-indigo-600',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      experience: 'Used PostgreSQL with Sequelize and Django ORM for structured relational data. Applied in production-grade backend services.',
      description: 'PostgreSQL is an advanced, open-source relational database system that supports complex queries, transactions, and indexing.'
    },
    {
      name: 'Tailwind CSS',
      level: 65,
      color: 'from-sky-400 to-indigo-400',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      experience: 'Used Tailwind extensively in React and Next.js projects. Built clean, responsive UIs with custom animations and themes.',
      description: 'Tailwind CSS is a utility-first CSS framework for building fast and responsive UI components without leaving your HTML.'
    },
    {
      name: 'Git & GitHub',
      level: 85,
      color: 'from-gray-600 to-black',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      experience: 'Proficient with Git for version control and collaboration. Experience with GitHub Actions, feature branches, and resolving conflicts.',
      description: 'Git is a distributed version control system. GitHub provides hosting and tools for collaborative code development and CI/CD.'
    },
    {
      name: 'Firebase',
      level: 70,
      color: 'from-yellow-500 to-orange-500',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      experience: 'Integrated Firebase authentication, Firestore, and analytics into React apps. Used in mobile/web hybrid apps.',
      description: 'Firebase is a platform by Google offering services like authentication, database, analytics, and hosting for modern app development.'
    },
    {
      name: 'Nginx',
      level: 60,
      color: 'from-green-700 to-gray-800',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
      experience: 'Configured Nginx for reverse proxy, load balancing, and static asset hosting for full-stack applications. Used primarily with Ubuntu VMs.',
      description: 'Nginx is a high-performance web server that also serves as a reverse proxy, load balancer, and HTTP cache.'
    },
    {
      name: 'Azure VM',
      level: 65,
      color: 'from-blue-700 to-sky-500',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      experience: 'Deployed and managed Django and React apps on Azure Virtual Machines. Used SSH, firewall rules, and custom domains.',
      description: 'Azure Virtual Machines provide scalable compute resources in Microsoft Azure’s cloud, suitable for hosting applications and services.'
    },
    {
      name: 'Google Cloud (GCP)',
      level: 60,
      color: 'from-orange-500 to-red-500',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
      experience: 'Used GCP services like Cloud Functions and Gmail API integration for automated email-based triggers in ITSM systems.',
      description: 'Google Cloud Platform is a suite of cloud computing services that runs on the same infrastructure as Google’s own products.'
    }
  ];
  

  const codeSnippet = `const developer = {
  name: "Umair Rinde",
  location: "Pune, India",
  experience: "2+ years",
  passion: "Building amazing products",
  
  skills: {
    frontend: ["React", "TypeScript"],
    backend: ["Node.js", "Python"],
    databases: ["PostgreSQL", "MongoDB"]
  },
  
  currentFocus: "Full-stack development",
  alwaysLearning: true
};`;

const features = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Robust Architecture",
    description:
      "Designing modular, scalable backend systems using frameworks like FastAPI, Django, and NestJS.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "High Performance",
    description:
      "Optimizing APIs and databases for speed, low latency, and concurrent request handling.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Security & Authentication",
    description:
      "Implementing JWT, OAuth, and RBAC for secure access control and protecting sensitive data.",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Data & Integrations",
    description:
      "Building reliable data models and integrating third-party services like GCP, Firebase, and external APIs.",
  },
];

  const y = useMotionValue(0);
  const yTransform = useTransform(y, (v) => `-${v}px`);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const speed = 0.5;
  const [itemHeight, setItemHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure item height on layout
  useLayoutEffect(() => {
    if (itemRef.current) {
      const height = itemRef.current.offsetHeight + 24; // 24 = vertical margin/gap
      setItemHeight(height);
    }
  }, []);

  // Scrolling loop
  let currentY = 0;
  useAnimationFrame(() => {
    if (isPlaying && itemHeight > 0) {
      currentY = (currentY + speed) % (skills.length * itemHeight);
      y.set(currentY);
    }
  });

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const scrollUp = () => {
    currentY = Math.max(0, currentY - itemHeight);
    y.set(currentY);
  };

  const scrollDown = () => {
    currentY = Math.min(skills.length * itemHeight, currentY + itemHeight);
    y.set(currentY);
  };

  const [selectedSkill, setSelectedSkill] = useState<Skill|null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            I&apos;m a passionate full-stack developer with 5+ years of experience
            creating digital solutions that combine beautiful design with
            powerful functionality.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Profile */}
          <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
            <div className="flex items-center p-4 border-b border-foreground/10">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center ml-4">
                <Terminal className="w-4 h-4 mr-2 text-foreground/60" />
                <span className="text-sm text-foreground/60 font-mono">
                  developer.js
                </span>
              </div>
            </div>
            <pre className="p-6 text-sm font-mono text-left overflow-x-auto">
              <code className="text-foreground/80">{codeSnippet}</code>
            </pre>
          </div>

          {/* Skills */}
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Technical Skills</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={scrollUp}
                  className="p-2 rounded-full glass-card hover:bg-foreground/10 transition-colors"
                  aria-label="Scroll up"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button 
                  onClick={togglePlayPause}
                  className="p-2 rounded-full glass-card hover:bg-foreground/10 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button 
                  onClick={scrollDown}
                  className="p-2 rounded-full glass-card hover:bg-foreground/10 transition-colors"
                  aria-label="Scroll down"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div 
              ref={containerRef}
              className="max-h-[350px] overflow-hidden relative px-10 rounded-2xl glass-card"
            >
              <MotionDiv
                className="space-y-6"
                style={{ y: yTransform }}
              >
                {[...skills, ...skills].map((skill, index) => (
                  <div
                    ref={index === 0 ? itemRef : null}
                    key={`${skill.name}-${index}`}
                    className="glass-card p-6 rounded-xl animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleSkillClick(skill)}
                  >
                    <div className="flex justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={skill.image} 
                      alt={skill.name}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-foreground/70">{skill.level}%</span>
                </div>
                <div className="w-full bg-foreground/10 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
                ))}
              </MotionDiv>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <SkillModal 
        skill={selectedSkill}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default About;