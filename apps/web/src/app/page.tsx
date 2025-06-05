'use client';

import { useEffect, useState } from 'react';

export default function SplashPage() {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const accepted = localStorage.getItem('cookiesAccepted');
    if (accepted === 'true') {
      setCookiesAccepted(true);
    }
  }, []);

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

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setCookiesAccepted(true);
  };

  return (
    <div className="bg-white text-[#333333] min-h-screen premium-typography">
      {/* Cookie Disclaimer */}
      {!cookiesAccepted && (
        <div className="fixed bottom-6 left-6 right-6 md:left-8 md:right-8 lg:max-w-md lg:left-8 lg:right-auto z-50 bg-white border border-[#333333] border-opacity-20 p-6 shadow-lg">
          <p className="text-sm font-light mb-4 leading-relaxed">
            We use analytics to understand how you experience our site. 
            <span className="block mt-2 opacity-70">Simple, transparent, no fuss.</span>
          </p>
          <button 
            onClick={acceptCookies}
            className="text-sm font-medium underline hover:no-underline transition-all duration-200"
          >
            Got it
          </button>
        </div>
      )}

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
      <section className="min-h-[75vh] flex items-center justify-center px-4 md:px-8">
        <div className="text-center">
          <h1 className="font-[var(--font-rubik-mono)] text-8xl sm:text-9xl md:text-[8rem] lg:text-[12rem] xl:text-[14rem] font-normal leading-[0.8] tracking-tight wavy-text">
            Vibe Coding Award
          </h1>
        </div>
      </section>

      {/* Manifest Section - Above the fold */}
      <section className="flex items-start justify-center px-4 md:px-8 pb-24">
        <div className="max-w-4xl mx-auto text-center space-y-12">

          {/* Manifest Content */}
          <div className="space-y-10">
            
            <p className="smooth-entrance text-lg md:text-xl lg:text-2xl leading-relaxed font-light premium-text">
              We believe in the future where artificial intelligence amplifies human creativity, 
              not replaces it.
            </p>

            <p className="smooth-entrance text-lg md:text-xl lg:text-2xl leading-relaxed font-light premium-text">
              Where code becomes poetry, algorithms become art, and collaboration between 
              minds—both human and artificial—creates something greater than the sum of its parts.
            </p>

            <p className="smooth-entrance text-lg md:text-xl lg:text-2xl leading-relaxed font-light premium-text">
              In a world where AI empowers us all to reach new heights, the beauty lies in discovering 
              and celebrating those who find virtuous ways to use these new tools—expressing fresh, 
              original value through their craft.
            </p>

            <p className="smooth-entrance text-lg md:text-xl lg:text-2xl leading-relaxed font-light premium-text">
              This is vibe coding. This is the future of development.
            </p>

            <p className="smooth-entrance text-lg md:text-xl lg:text-2xl leading-relaxed font-light premium-text">
              And this is where we celebrate it.
            </p>

          </div>

          {/* Coming Soon */}
          <div className="smooth-entrance pt-16">
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