'use client';

import { useEffect } from 'react';

export default function SplashPage() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.smooth-entrance').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-[#333333] min-h-screen premium-typography">
      {/* SVG Filter Definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="wavy">
            <feTurbulence 
              id="turbulence" 
              type="turbulence" 
              numOctaves="1" 
              result="NOISE"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="NOISE" 
              scale="12"
            />
            <animate 
              href="#turbulence" 
              attributeName="baseFrequency" 
              dur="30s" 
              keyTimes="0;0.5;1"
              values="0.008 0.015;0.015 0.03;0.008 0.015" 
              repeatCount="indefinite"
            />
          </filter>
        </defs>
      </svg>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center">
          <h1 className="elegant-serif text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight wavy-text">
            Vibe Coding Award
          </h1>
          
          {/* Subtle animated line */}
          <div className="mt-16 mx-auto w-24 h-px bg-[#333333] opacity-30">
            <div className="w-full h-full bg-[#333333] animate-float"></div>
          </div>
        </div>
      </section>

      {/* Manifest Section */}
      <section className="min-h-screen flex items-center justify-center px-8 py-24">
        <div className="max-w-3xl mx-auto text-center space-y-16">
          
          {/* Manifest Title */}
          <div className="smooth-entrance">
            <h2 className="elegant-serif text-4xl md:text-5xl font-light mb-12">
              Manifesto
            </h2>
          </div>

          {/* Manifest Content */}
          <div className="space-y-12">
            
            <p className="smooth-entrance text-xl md:text-2xl leading-relaxed font-light premium-text">
              We believe in the future where artificial intelligence amplifies human creativity, 
              not replaces it.
            </p>

            <p className="smooth-entrance text-xl md:text-2xl leading-relaxed font-light premium-text">
              Where code becomes poetry, algorithms become art, and collaboration between 
              minds—both human and artificial—creates something greater than the sum of its parts.
            </p>

            <p className="smooth-entrance text-xl md:text-2xl leading-relaxed font-light premium-text">
              This is vibe coding. This is the future of development.
            </p>

            <p className="smooth-entrance text-xl md:text-2xl leading-relaxed font-light premium-text">
              And this is where we celebrate it.
            </p>

          </div>

          {/* Coming Soon */}
          <div className="smooth-entrance pt-20">
            <div className="text-sm tracking-[0.4em] uppercase opacity-50 mb-6 font-light">
              Coming Soon
            </div>
            <div className="text-xs opacity-30 font-light tracking-widest">
              2024
            </div>
          </div>

        </div>
      </section>
    </div>
  );
} 