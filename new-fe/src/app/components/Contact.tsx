'use client';
import { useState } from 'react';
import { Send, MapPin, Phone, Mail, Github, Linkedin, Instagram, Terminal, Coffee, Code } from 'lucide-react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (!formRef.current) return;

    emailjs
  .sendForm(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    formRef.current,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  )

  .then(
    (result) => {
      console.log('Email sent:', result.text);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    },
    (error) => {
      console.error('Error sending email:', error.text);
      toast.error('Failed to send message. Please try again.');
    }
  );
  
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Pune, India',
      subtext: 'Available for remote, hybrid, or offline work.'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'rindeumair@gmail.com',
      subtext: 'Best way to reach me'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+91 9359 343936',
      subtext: 'Available 9AM - 9PM IST'
    },
  ];

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, href: 'https://github.com/Umair-Rinde', label: 'GitHub', handle: '@Umair-Rinde' },
    { icon: <Linkedin className="w-6 h-6" />, href: 'https://www.linkedin.com/in/umair-rinde-198024231/', label: 'LinkedIn', handle: 'in/umair-rinde-198024231' },
    { icon: <Instagram className="w-6 h-6" />, href: 'https://www.instagram.com/umair_rinde_313?igsh=MWdraTJmYnoyMnJ2eA==', label: 'Instagram', handle: '@umair_rinde_313' },
  ];

  const availability = [
    { label: 'Full-time Opportunities', available: true },
    { label: 'Freelance Projects', available: true },
    { label: 'Technical Consulting', available: true },
    { label: 'Code Reviews', available: false },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Terminal Window */}
            <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
              <div className="flex items-center p-4 border-b border-foreground/10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex items-center ml-4">
                  <Terminal className="w-4 h-4 mr-2 text-foreground/60" />
                  <span className="text-sm text-foreground/60 font-mono">contact.js</span>
                </div>
              </div>
              <div className="p-6 font-mono text-left">
                <div className="text-green-400 mb-2">$ npm run contact-developer</div>
                <div className="text-foreground/80 mb-2">✓ Developer available</div>
                <div className="text-foreground/80 mb-2">✓ Coffee level: High</div>
                <div className="text-foreground/80 mb-2">✓ Ready to code</div>
                <div className="text-primary animate-pulse">▋</div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="glass-card p-6 rounded-2xl animate-slide-in">
              <h3 className="text-xl font-bold mb-6 font-mono">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={info.label} className="flex items-start space-x-4">
                    <div className="text-primary p-2 glass rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-foreground/60 text-sm">{info.label}</p>
                      <p className="text-foreground font-medium">{info.value}</p>
                      <p className="text-foreground/50 text-xs">{info.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-6 rounded-2xl animate-fade-in">
              <h3 className="text-xl font-bold mb-4 font-mono">Availability</h3>
              <div className="space-y-3">
                {availability.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-foreground/80 text-sm">{item.label}</span>
                    <div className={`w-3 h-3 rounded-full ${item.available ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6 rounded-2xl animate-slide-in">
              <h3 className="text-xl font-bold mb-4 font-mono">Connect</h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target='_blank'
                    className="flex items-center space-x-3 p-3 glass rounded-lg hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <div>
                      <div className="text-foreground font-medium">{social.label}</div>
                      <div className="text-foreground/60 text-sm font-mono">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 rounded-2xl animate-fade-in">
              <div className="flex items-center mb-6">
                <Code className="w-6 h-6 mr-3 text-primary" />
                <h3 className="text-2xl font-bold font-mono">Let's Build Something</h3>
              </div>
              
              <form  ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80 font-mono">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background/20 text-foreground placeholder-foreground/50 font-mono"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80 font-mono">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background/20 text-foreground placeholder-foreground/50 font-mono"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground/80 font-mono">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background/20 text-foreground placeholder-foreground/50 font-mono"
                    placeholder="Project collaboration"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80 font-mono">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background/20 text-foreground placeholder-foreground/50 resize-none font-mono"
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-cyan-400 rounded-lg font-medium hover:scale-105 transition-all duration-300 group text-white font-mono"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Deploy Message</span>
                </button>
              </form>

              <div className="mt-8 p-4 glass rounded-lg">
                <div className="flex items-center text-foreground/60">
                  <Coffee className="w-4 h-4 mr-2" />
                  <span className="text-sm font-mono">
                    Response time: Usually within 24 hours ⚡
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
