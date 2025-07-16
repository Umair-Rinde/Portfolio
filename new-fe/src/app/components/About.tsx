"use client";

import { Code, Palette, Zap, Users, Terminal, Pause, Play, ChevronUp, ChevronDown, ChevronRight } from "lucide-react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import SkillModal from "./SkillModal";
import {SKILLS} from "./constants/skills";
import { CODESNIPPET } from "./constants/codesnippet";

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
  const [firstCardHintShown, setFirstCardHintShown] = useState(false);
  const skills = SKILLS;
  

  const codeSnippet = CODESNIPPET

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
            <div>
              <h3 className="text-2xl font-bold">Technical Skills</h3>
              <p className="text-sm text-foreground/60 mt-1">
                Tap any skill for details →
              </p>
            </div>
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
                <motion.div
                  ref={index === 0 ? itemRef : null}
                  key={`${skill.name}-${index}`}
                  className="glass-card p-6 rounded-xl cursor-pointer relative active:scale-95 transition-transform"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleSkillClick(skill)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                  
                  {/* Click indicator arrow */}
                  <motion.div
                    initial={!firstCardHintShown && index === 0 ? { scale: 1.5 } : {}}
                    animate={!firstCardHintShown && index === 0 ? { 
                      scale: [1.5, 1.3, 1.5],
                      transition: { repeat: 3, duration: 0.8 }
                    } : {}}
                    onAnimationComplete={() => setFirstCardHintShown(true)}
                    className="absolute top-3 right-3"
                  >
                    <ChevronRight className="w-4 h-4 text-foreground/40" />
                  </motion.div>
                </motion.div>
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