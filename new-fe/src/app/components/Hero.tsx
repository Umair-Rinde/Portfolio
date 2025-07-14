import { ArrowDown, Github, Linkedin, Mail, Code2 } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fade-in max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Umair Rinde
              </span>
            </h1>

            <div className="text-xl md:text-2xl text-foreground/80 mb-8 animate-slide-in">
              <div className="flex items-center justify-center lg:justify-start mb-2">
                <Code2 className="w-6 h-6 mr-2 text-primary" />
                <span className="font-mono">&lt;FullStackDeveloper /&gt;</span>
              </div>
              <span className="block text-lg">Crafting digital experiences with clean code</span>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6 mb-12">
              <a
                href="#"
                className="glass-card p-3 rounded-full hover:scale-110 transition-all duration-300 group"
              >
                <Github className="w-6 h-6 text-foreground/80 group-hover:text-foreground" />
              </a>
              <a
                href="#"
                className="glass-card p-3 rounded-full hover:scale-110 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 text-foreground/80 group-hover:text-foreground" />
              </a>
              <a
                href="#"
                className="glass-card p-3 rounded-full hover:scale-110 transition-all duration-300 group"
              >
                <Mail className="w-6 h-6 text-foreground/80 group-hover:text-foreground" />
              </a>
            </div>

            {/* CTA Button */}
            <a
              href="#about"
              className="inline-flex items-center px-8 py-4 glass-card rounded-full text-foreground hover:scale-105 transition-all duration-300 group"
            >
              <span className="mr-2 font-mono">./explore-portfolio</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Image with Masked Frame */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-pink-400 to-cyan-400 p-1 animate-glow">
                <div className="w-full h-full rounded-full bg-background/20 backdrop-blur-sm"></div>
              </div>

              {/* Main image container with glass frame */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden glass-card p-4">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  {/* Gradient overlay for better blending */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-pink-400/20 z-10 rounded-full"></div>

                  {/* Profile Image */}
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face"
                    alt="John Doe - Full Stack Developer"
                    className="w-full h-full object-cover rounded-full"
                  />

                  {/* Inner border stroke */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
                </div>
              </div>

              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 glass-card p-2 rounded-lg animate-float">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card p-2 rounded-lg animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-primary font-mono text-sm">{'</>'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-1 glass-card shadow-glass">
          <div className="w-1 h-3 bg-gradient-to-t from-primary to-transparent rounded-full animate-glow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;