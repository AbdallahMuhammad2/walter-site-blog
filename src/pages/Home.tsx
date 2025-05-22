import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronRight, GraduationCap,
  BookMarked, Mail, FileText, X, Menu,
  LineChart, BookOpen, Award, CheckCircle,
  ExternalLink, Briefcase
} from 'lucide-react';

import { articles } from '../data/articles';

// Navigation component for Academic profile
const AcademicNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  // Add this function to the Home component - before the return statement
  useEffect(() => {
    // Parallax scrolling effect
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      const heroElements = document.querySelectorAll('.hero-element');

      // Hero section parallax
      heroElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.1');
        const yPos = -(scrollTop * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });

      // Content parallax
      parallaxElements.forEach(element => {
        if (isElementInViewport(element)) {
          const distance = element.getBoundingClientRect().top;
          const speed = parseFloat(element.getAttribute('data-speed') || '0.15');
          const yPos = (distance * speed);
          (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    const isElementInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add this function to create a magnetic button hover effect
  useEffect(() => {
    const magneticButtons = document.querySelectorAll('.magnetic-button');

    const handleMouseMove = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 15; // Lower for subtle effect, higher for stronger effect

      btn.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      if (btn) {
        btn.style.transform = 'translate(0, 0)';
      }
    };

    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent));
      btn.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    return () => {
      magneticButtons.forEach(btn => {
        btn.removeEventListener('mousemove', handleMouseMove as EventListener);
        btn.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, []);
  const navItems = [
    {
      title: "Início",
      href: "#home",
      icon: <ChevronRight className="w-4 h-4" />
    },
    {
      title: "Sobre mim",
      href: "#sobre",
      icon: <GraduationCap className="w-4 h-4" />
    },
    {
      title: "Pesquisa",
      href: "#pesquisa",
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      title: "Artigos",
      href: "#artigos",
      icon: <FileText className="w-4 h-4" />
    },
    {
      title: "Publicações",
      href: "#publicacoes",
      icon: <BookMarked className="w-4 h-4" />
    },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0F1724]/95 shadow-lg backdrop-blur-md py-3 border-b border-academic-500/20' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <span className="text-white font-serif text-xl font-bold tracking-tight group-hover:text-academic-400 transition-colors duration-300">Prof. Walter</span>
              <span className="ml-1 text-sicredi-500 font-serif">PhD</span>
              <motion.div
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-academic-500 to-sicredi-500 w-0 group-hover:w-full transition-all duration-300"
                layoutId="logoIndicator"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 flex items-center group text-sm font-medium"
              >
                <span>{item.title}</span>
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-academic-500/80 to-sicredi-500/80 w-0 group-hover:w-full transition-all duration-300"
                  layoutId="navIndicator"
                />
              </a>
            ))}
            <a
              href="#contato"
              className="ml-4 px-5 py-2 rounded-md bg-gradient-to-r from-academic-600 to-academic-500 hover:from-sicredi-600 hover:to-sicredi-500 text-white transition-all duration-300 flex items-center text-sm shadow-lg shadow-academic-500/20"
            >
              <Mail className="mr-2 h-4 w-4" />
              <span>Contato</span>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white rounded-full hover:bg-white/10 transition-all duration-200 focus:outline-none"
            onClick={() => setActiveMobileMenu(!activeMobileMenu)}
            aria-label={activeMobileMenu ? "Fechar menu" : "Abrir menu"}
          >
            {activeMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className="lg:hidden absolute w-full bg-[#0F1724]/95 shadow-xl backdrop-blur-md border-b border-academic-500/20"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: activeMobileMenu ? 'auto' : 0, opacity: activeMobileMenu ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="px-4 py-3 text-white/80 hover:text-white hover:bg-academic-500/10 rounded-lg flex items-center transition-all duration-200"
                onClick={() => setActiveMobileMenu(false)}
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </a>
            ))}
            <a
              href="#contato"
              className="px-4 py-3 bg-gradient-to-r from-academic-600 to-academic-500 hover:from-sicredi-600 hover:to-sicredi-500 text-white rounded-lg flex items-center transition-all duration-200 shadow-lg shadow-academic-500/20"
              onClick={() => setActiveMobileMenu(false)}
            >
              <Mail className="h-4 w-4" />
              <span className="ml-2">Contato</span>
            </a>
          </div>
        </nav>
      </motion.div>
    </header>
  );
};

// Custom background styles for the academic theme
const customStyles = `
  .bg-radial-gradient-subtle {
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%);
  }
  
  .bg-scanline {
    background: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 1px,
      rgba(0, 0, 0, 0.08) 1px,
      rgba(0, 0, 0, 0.08) 2px
    );
  }
  
  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .animate-shine {
    animation: shine 1.5s infinite;
  }
  
  .text-balance {
    text-wrap: balance;
  }

  .gold-gradient {
    background: linear-gradient(135deg, #d4af37 0%, #f9f295 50%, #d4af37 100%);
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0px 0px 10px rgba(212, 175, 55, 0.4);
  }
  
  /* Enhanced hero patterns */
  .hero-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    position: relative;
    overflow: hidden;
  }
  
  .hero-pattern::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba(1, 58, 99, 0.3) 0%, rgba(1, 58, 99, 0.8) 100%);
    pointer-events: none;
  }
  
  .hero-pattern::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(135deg, rgba(0, 120, 212, 0.15) 0%, transparent 100%),
      linear-gradient(45deg, rgba(46, 125, 50, 0.15) 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }
  
  /* Enhanced grid patterns */
  .academic-grid {
    background-size: 50px 50px;
    background-image:
      linear-gradient(to right, rgba(1, 58, 99, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(1, 58, 99, 0.05) 1px, transparent 1px);
    position: relative;
  }
  
  .academic-grid::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 20px 20px, rgba(1, 58, 99, 0.05) 0%, transparent 40%);
    background-size: 50px 50px;
  }
  
  .academic-dots {
    background-image: radial-gradient(rgba(1, 58, 99, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    position: relative;
  }
  
  .academic-dots::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.2) 100%);
    mix-blend-mode: overlay;
  }
  
  /* Enhanced card animations */
  .card-hover {
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    will-change: transform;
  }
  
  .card-hover:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  }
  
  /* Advanced glass effect */
  .glass-effect {
    background: rgba(15, 23, 36, 0.65);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
  
  /* Enhanced border gradients */
  .academic-border-gradient {
    position: relative;
    isolation: isolate;
    transition: all 0.3s ease;
  }
  
  .academic-border-gradient::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(1, 58, 99, 0.7), rgba(46, 125, 50, 0.7), rgba(1, 58, 99, 0.7));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: -1;
    animation: borderGradient 3s infinite alternate;
  }
  
  @keyframes borderGradient {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
  
  .academic-border-gradient:hover::before {
    padding: 2px;
    background: linear-gradient(135deg, rgba(46, 125, 50, 0.8), rgba(1, 58, 99, 0.8), rgba(46, 125, 50, 0.8));
  }
  
  /* Enhanced text underline effects */
  .underline-academic {
    position: relative;
  }
  
  .underline-academic::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #013A63, #2E7D32, #013A63);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  .underline-academic:hover::after {
    transform: scaleX(1);
  }
  
  /* Advanced 3D card effects */
  .card-3d {
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  
  .card-3d-inner {
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    position: relative;
  }
  
  .card-3d:hover .card-3d-inner {
    transform: translateZ(20px) rotateX(5deg) rotateY(5deg);
  }
  
  /* Floating animation */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .animate-float {
    animation: float 5s ease-in-out infinite;
  }
  
  /* Glowing effect */
  .glow {
    position: relative;
    z-index: 0;
    overflow: hidden;
  }
  
  .glow::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #013A63;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#013A63, #013A63), linear-gradient(#2E7D32, #2E7D32), linear-gradient(#013A63, #013A63), linear-gradient(#2E7D32, #2E7D32);
    animation: glow 5s linear infinite;
  }
  
  .glow::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: inherit;
    border-radius: inherit;
  }
  
  @keyframes glow {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(1deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-1deg); }
  }
  
  /* Advanced backdrop pattern */
  .backdrop-pattern {
    position: relative;
  }
  
  .backdrop-pattern::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.1;
    background-image: 
      linear-gradient(45deg, #013A63 25%, transparent 25%),
      linear-gradient(-45deg, #013A63 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #013A63 75%),
      linear-gradient(-45deg, transparent 75%, #013A63 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    z-index: -1;
  }
  
  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
  }
  
  /* Parallax effect */
  .parallax {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  /* Typing animation */
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
  
  .typing-animation {
    overflow: hidden;
    white-space: nowrap;
    animation: typing 3.5s steps(40, end);
  }
  
  /* Enhanced section transitions */
  .section-transition {
    position: relative;
    overflow: hidden;
  }
  
  .section-transition::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100px;
    width: 100%;
    background: linear-gradient(to top, currentColor, transparent);
    opacity: 0.05;
    pointer-events: none;
  }
  
  /* Spotlight effect */
  .spotlight {
    position: relative;
    overflow: hidden;
  }
  
  .spotlight::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.2) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  
  .spotlight:hover::before {
    opacity: 1;
  }
  
  /* Paper texture overlay */
  .paper-texture {
    position: relative;
  }
  
  .paper-texture::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.07;
  }
     /* Custom cursor effect */
  .cursor-dot,
  .cursor-dot-outline {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    z-index: 999999;
  }
  
  .cursor-dot {
    width: 8px;
    height: 8px;
    background-color: #2E7D32;
  }
  
  .cursor-dot-outline {
    width: 40px;
    height: 40px;
    background-color: rgba(46, 125, 50, 0.1);
  }
  
  /* Scroll progress indicator */
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #013A63, #2E7D32);
    z-index: 100;
  }
  
  /* Skewed section dividers */
  .skewed-bottom {
    position: relative;
    z-index: 1;
  }
  
  .skewed-bottom::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: inherit;
    transform-origin: left bottom;
    transform: skewY(3deg);
    z-index: -1;
  }
  
  /* Text effects */
  .text-gradient {
    background: linear-gradient(120deg, #013A63, #2E7D32);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;


// Component for animating counting up numbers
interface AnimatedCounterProps {
  value: string | number;
  suffix: string;
  duration?: number;
}

const AnimatedCounter = ({ value, suffix, duration = 2 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString());
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16.7);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <div ref={counterRef} className="font-serif font-bold text-4xl md:text-5xl text-academic-600 relative">
      <span className="relative z-10">{count}{suffix}</span>
      <div className="absolute -inset-1 bg-gradient-to-r from-academic-500/10 via-sicredi-500/5 to-academic-500/10 rounded-lg blur-sm"></div>
    </div>
  );
};

// Timeline component for academic journey
const AcademicTimeline = () => {
  return (
    <div className="relative w-full px-4 py-10">
      {/* Connecting line */}
      <div className="absolute top-0 left-0 md:left-1/2 w-1 md:w-full h-full md:h-1 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-academic-500/40 to-transparent transform md:translate-y-10 translate-x-8"></div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {
          [
            {
              year: "2005",
              title: "Graduação em Economia",
              institution: "Universidade Federal de Viçosa (UFV)",
              description: "Formação em Ciências Econômicas com foco em finanças"
            },
            {
              year: "2008",
              title: "Mestrado em Administração",
              institution: "FEA-USP",
              description: "Pesquisa em finanças corporativas e governança"
            },
            {
              year: "2012",
              title: "Doutorado em Administração",
              institution: "FEA-USP",
              description: "Tese sobre financiamento de infraestrutura e desenvolvimento econômico"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              {/* Circle indicator with pulse effect */}
              <div className="absolute left-8 md:left-1/2 top-0 h-6 w-6 rounded-full border-2 border-academic-500 bg-[#0F1724] transform -translate-x-3 md:-translate-x-3 md:-translate-y-10 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-sicredi-500 relative">
                  <div className="absolute inset-0 rounded-full bg-sicredi-500 animate-ping opacity-50"></div>
                </div>
              </div>

              <div className="pl-16 md:pl-0 md:text-center">
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-academic-500/20 to-academic-600/10 text-academic-500 rounded-md text-sm font-medium mb-2 shadow-sm">{item.year}</div>
                <h3 className="text-xl font-serif font-bold text-academic-500 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 font-medium mb-1">{item.institution}</p>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))
        }
      </div>

      {/* Lattes link */}
      <div className="mt-8 text-center">
        <motion.a
          href="http://lattes.cnpq.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2.5 border border-academic-500/30 text-academic-500 rounded-md hover:bg-gradient-to-r hover:from-academic-600 hover:to-academic-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-academic-500/20 academic-border-gradient"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Ver Currículo Lattes
        </motion.a>
      </div>
    </div>
  );
};

// Research topic card component
interface ResearchTopicCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  delay?: number;
}

// Replace the existing ResearchTopicCard component with this enhanced version
const ResearchTopicCard = ({ title, icon, description, color, delay = 0 }: ResearchTopicCardProps) => {
  return (
    <motion.div
      className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover-lift"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`h-2 ${color}`}></div>
      <div className="p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-gradient-to-bl from-gray-100 to-transparent rounded-full opacity-50"></div>

        <motion.div
          className={`w-14 h-14 rounded-xl ${color} text-white flex items-center justify-center mb-5 relative z-10`}
          whileHover={{
            rotate: [0, -10, 10, -5, 0],
            transition: { duration: 0.5 }
          }}
        >
          {icon}
          <div className="absolute inset-0 bg-white opacity-20 rounded-xl animate-pulse"></div>
        </motion.div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <Link
          to={`/blog/categoria/${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="inline-flex items-center text-[#013A63] font-medium transition-colors group"
        >
          <span className="relative">
            Ver artigos
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2E7D32] group-hover:w-full transition-all duration-300"></span>
          </span>
          <motion.div
            className="ml-1"
            animate={{ x: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              repeatDelay: 1.5,
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

// Featured Article Card component
interface FeaturedArticleCardProps {
  article: any; // Using any for now, ideally would be your Article type
  index: number;
}

const FeaturedArticleCard = ({ article, index }: FeaturedArticleCardProps) => {
  return (
    <motion.div
      className="group relative h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#013A63]/10 text-[#013A63]">
            {article.category}
          </span>
          <span className="text-xs text-gray-500 ml-2">{article.readTime} leitura</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#013A63] transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
        <Link to={`/articles/${article.slug}`} className="inline-flex items-center text-[#013A63] font-medium hover:text-[#2E7D32] transition-colors">
          Ler artigo
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

// Recent Publication Item component
interface RecentPublicationItemProps {
  article: any; // Using any for now, ideally would be your Article type
  index: number;
}

const RecentPublicationItem = ({ article, index }: RecentPublicationItemProps) => {
  return (
    <motion.div
      className="flex items-start space-x-4 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center mb-1">
          <span className="text-xs font-medium text-[#013A63]">{article.category}</span>
          <span className="text-xs text-gray-500 mx-2">•</span>
          <span className="text-xs text-gray-500">{article.date}</span>
        </div>
        <Link to={`/articles/${article.slug}`}>
          <h3 className="text-base font-bold text-gray-800 group-hover:text-[#013A63] transition-colors mb-1 line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <div className="flex items-center text-gray-500 text-xs">
          <span>{article.readTime} leitura</span>
          <span className="mx-2">•</span>
          <span>{article.views} visualizações</span>
        </div>
      </div>
    </motion.div>
  );
};

// Testimonial component
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  delay?: number;
}

const TestimonialCard = ({ quote, author, role, delay = 0 }: TestimonialCardProps) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="mb-4 text-[#013A63]">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.7,5.4C7.6,8,6,11.8,6,16.2h4.2c0.1-3.3,0.9-6.2,2.6-8.8c1.7-2.6,2.6-4.1,2.6-4.6c0-0.4-0.1-0.8-0.4-1.1 c-0.3-0.3-0.7-0.4-1.1-0.4C13,1.3,12,2.7,10.7,5.4L10.7,5.4z M24.1,5.4c-3.1,2.6-4.6,6.4-4.7,10.8h4.2c0.1-3.3,0.9-6.2,2.6-8.8 c1.7-2.6,2.6-4.1,2.6-4.6c0-0.4-0.1-0.8-0.4-1.1c-0.3-0.3-0.7-0.4-1.1-0.4C26.4,1.3,25.4,2.7,24.1,5.4L24.1,5.4z" />
        </svg>
      </div>
      <p className="italic text-gray-600 mb-6">{quote}</p>
      <div>
        <p className="font-bold text-gray-800">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </motion.div>
  );
};

// Main HomeAcademico component
const HomeAcademico = () => {
  const heroRef = useRef(null);

  // Get featured and recent articles
  const featuredArticles = articles.slice(0, 3); // Top 3 articles for featured section
  const recentPublications = articles.slice(0, 4); // Top 4 for recent publications

  return (
    <div className="relative bg-[#F5F7FA] text-gray-800">
      {/* Inject custom styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Add the navigation component */}
      <AcademicNavigation />

      {/* Hero Section - Professor introduction */}
      <section id="home" ref={heroRef} className="relative min-h-[100vh] py-28 lg:py-0 flex items-center overflow-hidden bg-gradient-to-br from-[#01294d] via-[#013A63] to-[#01447a]">
        {/* Animated background elements */}
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 12 + 3}px`,
                height: `${Math.random() * 12 + 3}px`,
                opacity: Math.random() * 0.5 + 0.1,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>

        <div className="morphing-bg"></div>
        <div className="absolute inset-0 bg-neural opacity-40 mix-blend-soft-light"></div>

        {/* Content container */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Hero content grid */}
          <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
            {/* Professor Image - Enhanced 3D effect */}
            <motion.div className="lg:col-span-5 relative z-10 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
            >
              <div className="relative">
                {/* Image container with 3D effect */}
                <motion.div
                  className="relative mx-auto lg:ml-auto lg:mr-0 w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] perspective-card"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1.5, delay: 0.5, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                >
                  {/* Enhanced glow effects */}
                  <motion.div
                    className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#2E7D32]/40 via-white/30 to-[#013A63]/40 blur-xl"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.7, 0.5],
                      background: [
                        'radial-gradient(circle at 30% 30%, rgba(46, 125, 50, 0.5), rgba(255, 255, 255, 0.2) 60%, rgba(1, 58, 99, 0.5))',
                        'radial-gradient(circle at 70% 70%, rgba(46, 125, 50, 0.5), rgba(255, 255, 255, 0.2) 60%, rgba(1, 58, 99, 0.5))',
                        'radial-gradient(circle at 30% 30%, rgba(46, 125, 50, 0.5), rgba(255, 255, 255, 0.2) 60%, rgba(1, 58, 99, 0.5))'
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                  />

                  {/* Premium borders with animation */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 rounded-full border-[2px] border-white/50" />

                    {/* Multiple animated borders */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute inset-0 rounded-full border-2`}
                        style={{ scale: 1 + (i * 0.03) }}
                        animate={{
                          scale: [1 + (i * 0.03), 1.06 + (i * 0.03), 1 + (i * 0.03)],
                          borderColor: [
                            i % 2 === 0
                              ? 'rgba(46, 125, 50, 0.1)'
                              : 'rgba(1, 58, 99, 0.1)',
                            'rgba(255, 255, 255, 0.3)',
                            i % 2 === 0
                              ? 'rgba(46, 125, 50, 0.1)'
                              : 'rgba(1, 58, 99, 0.1)'
                          ],
                          rotate: [0, i % 2 === 0 ? 5 : -5, 0]
                        }}
                        transition={{
                          duration: 6 + i,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 1.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* Main image with enhanced styling */}
                  <div className="absolute inset-[6px] rounded-full overflow-hidden border-[4px] border-[#013A63]">
                    <div className="h-full w-full bg-[url('https://media.licdn.com/dms/image/v2/C4D03AQEbdlj0G6KkOg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1660914444908?e=1753315200&v=beta&t=FJQS2JZwJGKJt4pT4Y-jdWN5rmFIXzCR7dzKgZoBS-Q')] bg-cover bg-center"></div>

                    {/* Enhanced vignette effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#013A63]/10 via-transparent to-[#2E7D32]/20"></div>

                    {/* Subtle scan line effect */}
                    <div className="absolute inset-0 bg-scanline opacity-10"></div>
                  </div>

                  {/* Enhanced badge element with 3D shadow */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 h-18 w-18 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#1b5e1b] flex items-center justify-center text-white shadow-lg z-20 smooth-shadow"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="h-16 w-16 rounded-full bg-[#2E7D32] flex items-center justify-center">
                      <GraduationCap className="h-8 w-8" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced text content with advanced animations */}
            <motion.div
              className="lg:col-span-7 text-white order-1 lg:order-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-4"
              >
                <span className="inline-block py-1.5 px-4 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white/90 border border-white/20">
                  <motion.span
                    animate={{ opacity: [1, 0.8, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mr-2 inline-block h-2 w-2 rounded-full bg-[#2E7D32]"
                  ></motion.span>
                  Professor • Pesquisador • PhD
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.span
                  className="block mb-2"
                  animate={{
                    textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(255,255,255,0.3)', '0 0 0px rgba(255,255,255,0)']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Finanças & Pesquisa
                </motion.span>
                <motion.span
                  className="animated-gradient-text"
                  animate={{
                    textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 15px rgba(255,255,255,0.4)', '0 0 0px rgba(255,255,255,0)']
                  }}
                  transition={{ duration: 3, delay: 1.5, repeat: Infinity }}
                >
                  que Transformam Realidades
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-white/90 mb-10 max-w-2xl leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Professor, pesquisador e Ph.D que estuda decisões de investimento e financiamento há mais de 20 anos. Especialista em finanças corporativas, infraestrutura e cooperativismo.
              </motion.p>

              {/* Enhanced Call-to-Actions with magnetic effect */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <Link to="/blog">
                  <motion.button
                    className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#2E7D32] to-[#215f21] text-white font-medium transition-all duration-300 flex items-center shadow-lg shadow-[#2E7D32]/20 overflow-hidden relative glow-effect magnetic-button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onMouseMove={(e) => {
                      const el = e.currentTarget;
                      const rect = el.getBoundingClientRect();
                      const x = (e.clientX - rect.left) / rect.width * 100;
                      const y = (e.clientY - rect.top) / rect.height * 100;
                      el.style.setProperty('--x', `${x}%`);
                      el.style.setProperty('--y', `${y}%`);
                    }}
                  >
                    <span className="relative z-10 flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Ler Artigos
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-[#2E7D32]/0 via-white/20 to-[#2E7D32]/0"
                      animate={{
                        left: ['-100%', '100%'],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                        repeatDelay: 3
                      }}
                    />
                  </motion.button>
                </Link>
                <Link to="/sobre">
                  <motion.button
                    className="px-8 py-4 rounded-lg border border-white/40 hover:border-white/60 text-white font-medium bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center overflow-hidden relative glow-effect magnetic-button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onMouseMove={(e) => {
                      const el = e.currentTarget;
                      const rect = el.getBoundingClientRect();
                      const x = (e.clientX - rect.left) / rect.width * 100;
                      const y = (e.clientY - rect.top) / rect.height * 100;
                      el.style.setProperty('--x', `${x}%`);
                      el.style.setProperty('--y', `${y}%`);
                    }}
                  >
                    <span className="relative z-10 flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Sobre Mim
                    </span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Enhanced Escavador link */}
              <motion.a
                href="https://www.escavador.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-white/60 hover:text-white/80 transition-all group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <ExternalLink className="mr-1 h-3 w-3 group-hover:rotate-45 transition-transform duration-300" />
                <span className="relative">
                  Perfil acadêmico no Escavador
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/60 group-hover:w-full transition-all duration-300"></span>
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Custom wave divider */}
        <div className="wave-divider">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center card-hover p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <AnimatedCounter value="20" suffix="+" />
              <p className="text-gray-600 font-medium mt-3">Anos de Docência</p>
              <div className="w-16 h-1 bg-[#013A63] mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="text-center card-hover p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <AnimatedCounter value="50" suffix="+" />
              <p className="text-gray-600 font-medium mt-3">Publicações & Palestras</p>
              <div className="w-16 h-1 bg-[#2E7D32] mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="text-center card-hover p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="font-serif font-bold text-4xl md:text-5xl text-[#013A63]">USP</div>
              <p className="text-gray-600 font-medium mt-3">Doutor em Administração</p>
              <div className="w-16 h-1 bg-[#013A63] mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Professor Section */}
      <section id="sobre" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#013A63]/10 text-[#013A63] mb-4">
              TRAJETÓRIA ACADÊMICA
            </span>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">
              Sobre o Professor
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Com mais de duas décadas dedicadas ao estudo e ensino de finanças, minha trajetória acadêmica abrange a graduação em Economia pela Universidade Federal de Viçosa, seguida de mestrado e doutorado pela FEA-USP. Minhas pesquisas focam em finanças corporativas, financiamento de infraestrutura, cooperativismo financeiro e educação financeira, sempre buscando conectar teoria à prática para transformar realidades econômicas e sociais.
            </p>
          </motion.div>

          <AcademicTimeline />
        </div>
      </section>

    
      {/* Featured Articles Section */}
      <section id="artigos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#013A63]/10 text-[#013A63] mb-4">
              PRINCIPAIS TRABALHOS
            </span>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">
              Artigos em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Conheça algumas de minhas publicações mais relevantes em periódicos acadêmicos e eventos científicos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <FeaturedArticleCard key={index} article={article} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/blog">
              <motion.button
                className="px-8 py-4 rounded-lg bg-[#013A63] hover:bg-[#012953] text-white font-medium transition-all duration-300 flex items-center mx-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Ver Todos os Artigos
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Publications Section */}
      <section id="publicacoes" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#013A63]/10 text-[#013A63] mb-4">
                  ATUALIZAÇÕES
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
                  Últimas Publicações
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Acompanhe meus artigos e publicações mais recentes em periódicos acadêmicos e eventos científicos
                </p>
              </motion.div>

              <div className="space-y-8">
                {recentPublications.map((article, index) => (
                  <RecentPublicationItem key={index} article={article} index={index} />
                ))}
              </div>
            </div>

            <div className="md:w-1/2">
              <motion.div
                className="bg-[#013A63]/5 p-8 rounded-xl border border-[#013A63]/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <BookMarked className="w-10 h-10 text-[#013A63]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Livro em Destaque</h3>
                    <p className="text-gray-600 mb-4">
                      Finanças Pessoais: Estratégias para organização financeira e tomada de decisões
                    </p>
                    <div className="mb-6">
                      <span className="inline-block px-3 py-1 bg-[#013A63]/10 text-[#013A63] text-sm font-medium rounded-full">
                        27ª Bienal do Livro de SP
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <img
                      src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=320"
                      alt="Livro Finanças Pessoais"
                      className="w-full h-40 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 mb-6 text-sm">
                      Um guia prático sobre organização financeira, investimentos e construção de patrimônio. Apresenta conceitos fundamentais de finanças aplicados ao cotidiano das famílias brasileiras.
                    </p>
                    <a
                      href="#"
                      className="inline-block px-6 py-2 bg-[#013A63] text-white rounded-md hover:bg-[#012953] transition-colors"
                    >
                      Saiba mais
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Additional callout box */}
              <motion.div
                className="mt-8 bg-[#2E7D32]/5 p-8 rounded-xl border border-[#2E7D32]/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[#2E7D32]" />
                  Capítulos in Obras Coletivas
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-[#2E7D32] mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">
                      "Financiamento da Infraestrutura no Brasil" em <span className="font-medium">Economia Brasileira Contemporânea</span>, 2023
                    </p>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-[#2E7D32] mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">
                      "Cooperativismo e Desenvolvimento Regional" em <span className="font-medium">Sistemas Financeiros Inclusivos</span>, 2021
                    </p>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-neural opacity-20 pointer-events-none"></div>

        {/* Floating shapes background */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-[#013A63]/5 to-[#2E7D32]/5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              filter: 'blur(50px)'
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#013A63]/10 text-[#013A63] mb-4">
              O QUE DIZEM
            </span>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6 relative">
              Depoimentos Acadêmicos
              <div className="w-24 h-1 bg-gradient-to-r from-[#013A63] to-[#2E7D32] mx-auto mt-4 rounded-full"></div>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "O Professor Walter foi fundamental na minha formação. Sua abordagem prática e profundo conhecimento em finanças corporativas transformou minha visão sobre o mercado.",
                author: "Dra. Ana Silva",
                role: "Ex-orientanda, Professora na UFMG",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "A dedicação do Prof. Walter à pesquisa é inspiradora. Suas contribuições para o entendimento do financiamento de infraestrutura no Brasil são referência na área.",
                author: "Dr. Carlos Mendes",
                role: "Colega na FEA-USP",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "As aulas do Professor Walter combinam rigor acadêmico com aplicações práticas. Seu livro sobre finanças pessoais mudou minha relação com o dinheiro.",
                author: "Roberto Almeida",
                role: "Ex-aluno, Analista Financeiro",
                image: "https://randomuser.me/api/portraits/men/67.jpg"
              }
            ].map((testimonial, idx) => (
              <TestimonialCard
                key={idx}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                delay={idx * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="contato" className="py-20 bg-[#013A63]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Fique Atualizado
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Receba novos artigos mensais sobre finanças & investimento público diretamente no seu e-mail.
              </p>

              <form className="max-w-md mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#2E7D32] hover:bg-[#226D22] text-white font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
                  >
                    Inscrever-se
                  </button>
                </div>
              </form>

              <div className="mt-8 flex justify-center space-x-6">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <span className="text-[#013A63] font-serif text-xl font-bold">Prof. Walter</span>
                <span className="ml-1 text-[#2E7D32] font-serif">PhD</span>
              </div>
              <p className="text-gray-600 mt-2">© {new Date().getFullYear()} Todos os direitos reservados</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link to="/sobre" className="text-gray-600 hover:text-[#013A63] transition-colors">Sobre</Link>
              <Link to="/blog" className="text-gray-600 hover:text-[#013A63] transition-colors">Blog</Link>
              <Link to="/contato" className="text-gray-600 hover:text-[#013A63] transition-colors">Contato</Link>
              <Link to="/privacidade" className="text-gray-600 hover:text-[#013A63] transition-colors">Política de Privacidade</Link>
            </div>

            <div className="mt-6 md:mt-0">
              <p className="text-gray-600">eclache@terra.com.br</p>
              <div className="flex items-center gap-2 mt-2">
                <img src="data:image/png;base64,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" alt="USP" className="h-5" />
                <img src="data:image/png;base64,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" alt="UMC" className="h-5" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeAcademico;
