"use client";

import { Code, Palette, Zap, Users, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const MotionDiv = motion("div");

const About = () => {
  const skills = [
    { name: "TypeScript", level: 85, color: "from-cyan-400 to-blue-400" },
    { name: "JavaScript", level: 88, color: "from-yellow-400 to-orange-400" },
    { name: "Python", level: 90, color: "from-green-400 to-emerald-400" },
    { name: "React", level: 83, color: "from-sky-400 to-indigo-400" },
    { name: "Next.js", level: 80, color: "from-gray-600 to-gray-800" },
    { name: "Node.js", level: 78, color: "from-lime-400 to-green-500" },
    { name: "NestJS", level: 75, color: "from-pink-500 to-red-400" },
    { name: "MongoDB", level: 82, color: "from-green-500 to-emerald-600" },
    { name: "PostgreSQL", level: 70, color: "from-blue-500 to-indigo-500" },
    { name: "Django", level: 74, color: "from-green-700 to-gray-700" },
    { name: "Firebase", level: 72, color: "from-yellow-300 to-orange-500" },
    { name: "Tailwind CSS", level: 88, color: "from-cyan-500 to-blue-500" },
    { name: "HTML/CSS", level: 92, color: "from-red-400 to-pink-400" },
    { name: "Git/GitHub", level: 85, color: "from-gray-600 to-gray-900" },
    { name: "LangChain", level: 65, color: "from-purple-400 to-violet-500" },
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
      title: "Clean Code",
      description:
        "Writing maintainable, scalable, and efficient code following best practices.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Creative Design",
      description:
        "Crafting beautiful, intuitive interfaces that provide exceptional user experiences.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance",
      description:
        "Optimizing applications for speed, accessibility, and search engine visibility.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description:
        "Working effectively in teams using agile methodologies and modern tools.",
    },
  ];

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
            I'm a passionate full-stack developer with 5+ years of experience
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
          <div className="space-y-8 "> {/* Added a wrapper div */}
            <h3 className="text-2xl font-bold">Technical Skills</h3>
            <div className="max-h-[350px] overflow-hidden relative px-10 rounded-2xl glass-card">
              <MotionDiv
                className="space-y-6"
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  duration: skills.length * 10,
                  ease: "linear",
                  repeat: Infinity,
                }}
                
              >
                {[...skills,...skills].map((skill, index) => (
                  <div
                    key={`${skill.name}-${index}`}
                    className="glass-card p-6 rounded-xl animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold">{skill.name}</span>
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
    </section>
  );
};

export default About;
