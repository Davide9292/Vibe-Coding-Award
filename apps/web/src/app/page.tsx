'use client';

import { useEffect, useState } from 'react';
import { User, Rocket, Users, Mail, Linkedin, X } from 'lucide-react';
import { ToastProvider, useToast, toast } from '@/components/ui/toast';

function HomePage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showManifesto, setShowManifesto] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    // Check if user has already given cookie consent
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setShowCookieConsent(true);
    }

    // Fade in hero section on load
    setTimeout(() => {
      setIsVisible(prev => ({ ...prev, hero: true }));
    }, 100);

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section');
          if (id) {
            setIsVisible(prev => ({ ...prev, [id]: true }));
          }
        }
      });
    }, observerOptions);

    // Observe all animated sections
    document.querySelectorAll('[data-section]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowCookieConsent(false);
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent checkbox
    if (!newsletterConsent) {
      addToast(toast.warning('Consent Required', 'Please confirm you want to join our newsletter to continue.'));
      return;
    }
    
    // Simple email validation
    if (!email || !email.includes('@')) {
      addToast(toast.error('Invalid Email', 'Please enter a valid email address.'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, consent: newsletterConsent }),
      });

      const result = await response.json();

      if (response.ok) {
        addToast(toast.success('Welcome to the Inner Circle!', 'Please check your email for confirmation. 🚀'));
        setEmail('');
        setNewsletterConsent(false);
      } else {
        addToast(toast.error('Subscription Failed', result.error || 'Please try again.'));
      }
    } catch (error) {
      console.error('Subscription error:', error);
      addToast(toast.error('Connection Error', 'Failed to subscribe. Please check your connection and try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareProject = () => {
    setShowSubmissionForm(true);
  };

  const openManifesto = () => {
    setShowManifesto(true);
  };

  return (
    <div className="bg-black text-white font-barlow min-h-screen">
      {/* Hero Section - White Container */}
      <section className="md:px-8 pt-4 md:pt-8">
        <div 
          className={`bg-white rounded-[20px] w-full h-[620px] relative transition-opacity duration-1000 ${
            isVisible.hero ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Centered Logo Content */}
          <div className="absolute inset-0 flex items-center justify-center p-4 pb-4 mb-4 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              {/* Video Mark */}
              <div className="flex-shrink-0">
                <video
                  className="w-[240px] h-[262px] md:w-[320px] md:h-[350px] object-cover border-1 border-white"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Vibe Coding Award animated logo mark"
                >
                  <source src="/videos/logo-mark-loop.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
        </div>
              
              {/* SVG Logotype */}
              <div className="flex-shrink-0">
                <img
                  src="/logo-text.svg"
                  alt="Vibe Coding Award"
                  className="h-[210px] md:h-[250px] w-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Coming Soon - Positioned at Bottom */}
          <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative inline-flex items-center justify-center">
              {/* Option 1: SVG Notch (when you upload the SVG) */}
              <img
                src="/coming-soon-notch.svg"
                alt=""
                className="w-auto h-8 md:h-10"
                aria-hidden="true"
                onError={(e) => {
                  // Fallback to CSS version if SVG not found
                  const img = e.currentTarget;
                  const fallback = img.nextElementSibling as HTMLElement;
                  img.style.display = 'none';
                  if (fallback) {
                    fallback.style.display = 'block';
                  }
                }}
              />
              
              {/* Option 2: CSS Notch Fallback */}
              <div 
                className="hidden bg-black rounded-full px-6 py-2 md:px-8 md:py-3"
                style={{ display: 'none' }}
              >
                <span className="text-white text-xs md:text-sm font-barlow-semibold tracking-widest uppercase">
                  Coming Soon
                </span>
              </div>
              
              {/* Text Overlay (for SVG version) */}
              <span className="absolute inset-0 flex items-center justify-center text-white text-sm md:text-xl font-barlow-semibold tracking-widest uppercase pointer-events-none">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section - Conditional Padding Based on Newsletter Flag */}
      <section 
        className="md:px-8 transition-all duration-700 py-20 md:py-20"
        data-section="intro"
      >
        <div 
          className={`max-w-4xl mx-auto text-left md:text-center transition-all duration-700 ${
            isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="section-title text-white mb-4 md:mb-6">
            Championing the Pioneers of the Next Creative Era.
          </h1>
          
          <h2 className="text-lg md:text-xl lg:text-2xl font-light text-gray-300 leading-relaxed mb-8 md:mb-12">
The premier independent award for the innovators and artisans of human-AI collaboration.
          </h2>
          
          {/* Email Input Field */}
          <form onSubmit={handleEmailSubmit} className="w-full max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:relative mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 h-16 md:h-16 px-6 py-4 md:pr-48 text-white placeholder-gray-400 font-barlow text-lg md:text-xl border border-[#7a7a7a] bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                required
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-m h-16 px-8 md:absolute md:right-2 md:top-2 md:h-12 md:px-6 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : 'Join the Inner Circle'}
              </button>
            </div>
            
            {/* Newsletter Consent Checkbox */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <input
                type="checkbox"
                id="newsletter-consent"
                checked={newsletterConsent}
                onChange={(e) => setNewsletterConsent(e.target.checked)}
                className="w-4 h-4 text-white bg-transparent border-2 border-gray-400 rounded focus:ring-white focus:ring-2"
                required
              />
              <label htmlFor="newsletter-consent" className="text-sm text-gray-300 leading-tight">
                I want to join the newsletter and receive updates about the Vibe Coding Award
              </label>
            </div>
          </form>
        </div>
      </section>

      {/* Award Categories Section */}
      <section className="md:px-8 py-5">
        <div className="bg-[#1A1A1A] rounded-[20px] p-4 md:p-12">
          <div 
            className="text-left md:text-center"
            data-section="categories"
          >
            <div 
              className={`transition-all duration-700 ${
                isVisible['categories'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="mb-8">
                <h2 className="section-title text-white mb-6 md:mb-8">
                  Five Ways to Win
                </h2>
                <p className="text-lg md:text-lg lg:text-lg text-gray-300 leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto">
                  Every month, we celebrate outstanding projects across five distinct categories. Find where your work fits best.
                </p>
                
                {/* Categories Grid */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-6 pb-4 md:pb-0">
                  {/* Tools for Creators */}
                  <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
                    <div 
                      className="h-full p-6 rounded-[20px] text-left relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cfilter id="noise"%3e%3cfeTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3e%3c/filter%3e%3c/defs%3e%3crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3e%3c/svg%3e")'
                      }}
                    >
                      <h3 className="text-xl font-bold text-white mb-4">
                        Tools for Creators
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        For libraries, plugins, applications, or platforms designed to empower others. If your project is a paintbrush for the new creative era, this is its home.
                      </p>
                    </div>
                  </div>

                  {/* Artistic & Experiential */}
                  <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
                    <div 
                      className="h-full p-6 rounded-[20px] text-left relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cfilter id="noise"%3e%3cfeTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3e%3c/filter%3e%3c/defs%3e%3crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3e%3c/svg%3e")'
                      }}
                    >
                      <h3 className="text-xl font-bold text-white mb-4">
                        Artistic & Experiential
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        For interactive art, generative design, narrative experiences, and projects where the primary goal is to evoke emotion or explore a new aesthetic.
                      </p>
                    </div>
                  </div>

                  {/* Products & Services */}
                  <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
                    <div 
                      className="h-full p-6 rounded-[20px] text-left relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cfilter id="noise"%3e%3cfeTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3e%3c/filter%3e%3c/defs%3e%3crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3e%3c/svg%3e")'
                      }}
                    >
                      <h3 className="text-xl font-bold text-white mb-4">
                        Products & Services
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        For fully-fledged applications, SaaS products, or intelligent workflows that solve a real-world problem or offer a new service.
                      </p>
                    </div>
                  </div>

                  {/* Experimental & Conceptual */}
                  <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
                    <div 
                      className="h-full p-6 rounded-[20px] text-left relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cfilter id="noise"%3e%3cfeTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3e%3c/filter%3e%3c/defs%3e%3crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3e%3c/svg%3e")'
                      }}
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Experimental & Conceptual
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        For the bold and the boundary-pushing. This category is for speculative designs, prototypes, and projects that explore "what if?" without needing a polished final product.
                      </p>
                    </div>
                  </div>

                  {/* Open Submission */}
                  <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
                    <div 
                      className="h-full p-6 rounded-[20px] text-left relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cfilter id="noise"%3e%3cfeTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3e%3c/filter%3e%3c/defs%3e%3crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3e%3c/svg%3e")'
                      }}
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Open Submission
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        If your project defies categorization, this is the place for it. For the mavericks, the genre-benders, and the truly unique creations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call for Pioneers Section - Fixed Container */}
      <section className="md:px-8 py-5">
        <div className="bg-[#1A1A1A] rounded-[20px] p-4 md:p-12">
          <div 
            className="text-left md:text-center"
            data-section="call-for-pioneers"
          >
            <div 
              className={`transition-all duration-700 ${
                isVisible['call-for-pioneers'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="mb-8">
                <div className="flex justify-start md:justify-center mb-6 md:mb-8">
                  <img 
                    src="/pioneer-icon.svg" 
                    alt="Call for Pioneers" 
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                </div>
                <h2 className="section-title text-white mb-6 md:mb-4">
                  Call for Pioneers
                </h2>
                <p className="text-lg md:text-lg lg:text-lg text-gray-300 leading-relaxed mb-8 md:mb-12">
                  Are you working on an extraordinary project that showcases the future of human-AI collaboration? We want to hear your story.
                </p>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <button
                      onClick={handleShareProject}
                      className="btn-animated-rounded block md:inline-block w-full md:w-auto"
                    >
                      Share Your Project
                    </button>
                  </div>
                  
                  <div>
                    <button
                      onClick={openManifesto}
                      className="btn-tertiary block md:inline-block w-full md:w-auto"
                    >
                      Read our Manifesto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Award Categories Section */}
      <section className="md:px-8 py-5">
        <div className="bg-[#1A1A1A] rounded-[20px] p-4 md:p-12">
          <div 
            className="text-left md:text-center"
            data-section="categories"
          >
            <div 
              className={`transition-all duration-700 ${
                isVisible['categories'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="mb-8">
                <h2 className="section-title text-white mb-6 md:mb-8">
                  Five Ways to Win
                </h2>
                <p className="text-lg md:text-lg lg:text-lg text-gray-300 leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto">
                  Every month, we celebrate outstanding projects across five distinct categories. Find where your work fits best.
                </p>
                
                {/* Categories Grid */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-6 pb-4 md:pb-0">
                  {/* Tools for Creators */}
                  <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
                    <div 
                      className="h-full p-6 rounded-[20px] text-left relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cfilter id="noise"%3e%3cfeTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3e%3c/filter%3e%3c/defs%3e%3crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3e%3c/svg%3e")'
                      }}
                    >
                      <h3 className="text-xl font-bold text-white mb-4">
                        Tools for Creators
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        For libraries, plugins, applications, or platforms designed to empower others. If your project is a paintbrush for the new creative era, this is its home.
                      </p>
                    </div>
                  </div>

                  {/* Artistic & Experiential */}
                  <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
                    <div 
                      className="h-full p-6 rounded-[20px] text-left relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cfilter id="noise"%3e%3cfeTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3e%3c/filter%3e%3c/defs%3e%3crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3e%3c/svg%3e")'
                      }}
                    >
                      <h3 className="text-xl font-bold text-white mb-4">
                        Artistic & Experiential
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        For interactive art, generative design, narrative experiences, and projects where the primary goal is to evoke emotion or explore a new aesthetic.
                      </p>
                    </div>
                  </div>

                  {/* Products & Services */}
                  <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
                    <div 
                      className="h-full p-6 rounded-[20px] text-left relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cfilter id="noise"%3e%3cfeTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3e%3c/filter%3e%3c/defs%3e%3crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3e%3c/svg%3e")'
                      }}
                    >
                      <h3 className="text-xl font-bold text-white mb-4">
                        Products & Services
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        For fully-fledged applications, SaaS products, or intelligent workflows that solve a real-world problem or offer a new service.
                      </p>
                    </div>
                  </div>

                  {/* Experimental & Conceptual */}
                  <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
                    <div 
                      className="h-full p-6 rounded-[20px] text-left relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cfilter id="noise"%3e%3cfeTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3e%3c/filter%3e%3c/defs%3e%3crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3e%3c/svg%3e")'
                      }}
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Experimental & Conceptual
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        For the bold and the boundary-pushing. This category is for speculative designs, prototypes, and projects that explore "what if?" without needing a polished final product.
                      </p>
                    </div>
                  </div>

                  {/* Open Submission */}
                  <div className="min-w-[280px] md:min-w-0 flex-shrink-0">
                    <div 
                      className="h-full p-6 rounded-[20px] text-left relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cfilter id="noise"%3e%3cfeTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3e%3c/filter%3e%3c/defs%3e%3crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3e%3c/svg%3e")'
                      }}
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Open Submission
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        If your project defies categorization, this is the place for it. For the mavericks, the genre-benders, and the truly unique creations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Cards Section - Full Width */}
      <section className="md:px-8 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Juror Card - Full Width */}
          <div className="bg-[#1A1A1A] p-4 md:p-12 rounded-[20px] text-left md:text-center">
            <h3 className="section-title text-white mb-4 md:mb-4">
              Want to Become a Juror?
            </h3>
            <p className="text-lg md:text-lg lg:text-lg text-gray-300 leading-relaxed mb-8 md:mb-12">
              Are you a leader in tech or creative industries? We'd love to hear from you.
            </p>
            <a
              href="mailto:jury@vibecodingaward.com"
              className="btn-secondary-m inline-block"
            >
              Submit your entry
            </a>
          </div>
          
          {/* Partners Card - Full Width */}
          <div className="bg-[#1A1A1A] p-4 md:p-12 rounded-[20px] text-left md:text-center">
            <h3 className="section-title text-white mb-4 md:mb-6">
              For Partners & Press
            </h3>
            <p className="text-lg md:text-lg lg:text-lg text-gray-300 leading-relaxed mb-8 md:mb-12">
              Want to support the future of craft or feature our story? Let's connect.
            </p>
            <a
              href="mailto:partners@vibecodingaward.com"
              className="btn-secondary-m inline-block"
            >
              Let's connect
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black py-8 md:py-12 mt-8 w-full">
        <div className="md:px-8 max-w-none">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 mx-auto">
            {/* Logo Section */}
            <div className="flex items-center gap-4 flex-shrink-0 md:flex-1">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="cursor-pointer"
              >
                <img
                  src="/Vibe Coding Award Logo.svg"
                  alt="Vibe Coding Award"
                  className="h-12 w-auto opacity-100 hover:opacity-80 transition-opacity"
                />
              </button>
            </div>
            
            {/* Center Content */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 text-gray-400 text-sm flex-1 md:justify-center">
              <a href="mailto:partners@vibecodingaward.com" className="hover:text-white transition-colors">
                Contact us
              </a>
              <a href="https://linkedin.com/company/vibe-coding-award" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center justify-start md:justify-end flex-1">
              <p className="text-gray-400 text-sm">
                © 2025 Vibe Coding Award
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Manifesto Modal */}
      {showManifesto && (
        <ManifestoModal onClose={() => setShowManifesto(false)} />
      )}

      {/* Project Submission Modal */}
      {showSubmissionForm && (
        <ProjectSubmissionModal onClose={() => setShowSubmissionForm(false)} />
      )}

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 p-4 md:p-6 z-50">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-white text-sm md:text-base font-barlow leading-relaxed">
                We use cookies to analyze website traffic and optimize your experience. Your data helps us understand how to make our platform better.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={handleCookieAccept}
                className="px-6 py-2 bg-white text-black font-barlow-semibold rounded-full hover:bg-gray-100 transition-colors text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Manifesto Modal Component
function ManifestoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div className="bg-white rounded-[20px] w-full max-w-4xl h-[90vh] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close manifesto"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="h-full overflow-y-auto p-6 md:p-8 lg:p-12">
          {/* Content */}
          <div>
            <h1 className="section-title text-black mb-6 md:mb-8">
              Manifesto
            </h1>
            
            <div className="space-y-8 md:space-y-10 text-black font-barlow">
              
              {/* Opening Statement */}
              <section>
                <p className="text-2xl md:text-4xl font-light leading-relaxed">
                  We stand at the beginning of a creative revolution. The Vibe Coding Award is here to celebrate the curious and creative builders who are redefining what it means to create in the age of artificial intelligence.
                </p>
              </section>

              {/* What is Vibe Coding */}
              <section>
                <h2 className="text-xl md:text-2xl font-barlow-semibold text-black mb-4">
                  What is Vibe Coding?
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-4">
                  Vibe coding isn't just a technique—it's a philosophy. It's the intuitive dialogue between human creativity and artificial intelligence, where developers guide AI through natural conversation and iterative collaboration to build extraordinary digital experiences.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  It's about feeling your way through a problem, trusting your instincts, and letting AI amplify your creative vision. It's the art of knowing when to lead, when to follow, and when to explore uncharted territories together.
                </p>
              </section>

              {/* Projects That Inspire Us */}
              <section>
                <h2 className="text-xl md:text-2xl font-barlow-semibold text-black mb-4">
                  Projects That Inspire Us
                </h2>
                <div className="space-y-3">
                  <p className="text-base md:text-lg leading-relaxed">
                    🎨 <span className="font-medium">Creative Applications:</span> Tools that empower artists, designers, and creators to push boundaries.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    🚀 <span className="font-medium">Experimental Interfaces:</span> Projects that reimagine how we interact with technology through AI-powered experiences.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    🧠 <span className="font-medium">Intelligent Workflows:</span> Solutions that seamlessly blend human expertise with AI capabilities to solve real problems.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    🌟 <span className="font-medium">Breakthrough Concepts:</span> Ideas that make us say, "I never thought that was possible"—the kind that can reshape entire industries.
                  </p>
                </div>
              </section>

              {/* Why This Matters - COMMENTED OUT */}
              {/*
              <section>
                <h2 className="text-xl md:text-2xl font-barlow-semibold text-black mb-4">
                  Why This Matters
                </h2>
                <p className="text-base md:text-lg leading-relaxed">
                  We believe the future belongs to those who can harmonize human intuition with artificial intelligence. This isn't about replacing human creativity—it's about supercharging it.
                </p>
              </section>
              */}

              {/* Join the Movement - COMMENTED OUT */}
              {/*
              <section>
                <h2 className="text-xl md:text-2xl font-barlow-semibold text-black mb-4">
                  Join the Movement
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-4">
                  The Vibe Coding Award is more than just recognition—it's an open invitation to join a community of pioneers. This is a place for mutual support and learning, where developers, artists, entrepreneurs, and dreamers can share their breakthroughs and inspire the next generation of creators.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  Whether you're building the next groundbreaking app, experimenting with AI-generated art, or creating tools that democratize creativity, we want to see your work, amplify your story, and connect you with like-minded innovators from around the world.
                </p>
              </section>
              */}

              {/* About the Founder - COMMENTED OUT */}
              {/*
              <section>
                <h2 className="text-xl md:text-2xl font-barlow-semibold text-black mb-4">
                  About the Founder
                </h2>
                <p className="text-base md:text-lg text-black leading-relaxed mb-4">
                  My journey with AI began long before it was a daily headline. In 2017, for my Master's graduation in Design, I wrote my thesis on the creative potential of human-AI interaction. I was fascinated by how these systems could become partners in our creative process.
                </p>
                <p className="text-base md:text-lg text-black leading-relaxed mb-4">
                  In the years since, I've been experimenting with the exact methods we now call "vibe coding"—using intuition and conversation to build with AI, long before Andrej Karpathy gave this wonderful practice a name.
                </p>
                <p className="text-base md:text-lg text-black leading-relaxed mb-4">
                  I created the Vibe Coding Award for a simple reason: I know there are countless people like me around the world, true pioneers who are quietly building incredible things but don't have a place to shine. This platform isn't just about celebrating the best projects; it's about finding and connecting the people behind them.
                </p>
                <p className="text-base md:text-lg text-black leading-relaxed mb-6">
                  This is my invitation to you. Let's build this community together!
                </p>
                <p className="text-base md:text-lg text-black leading-relaxed font-medium mb-6">
                Davide
                </p>
                <a 
                  href="https://www.linkedin.com/in/davide-pedone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-white py-2 inline-block"
                >
                  Connect on LinkedIn
                </a>
              </section>
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Project Submission Modal Component (updated with white background)
function ProjectSubmissionModal({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    demoUrl: '',
    repoUrl: '',
    videoUrl: '',
    downloadUrl: '',
    vibeNarrative: '',
    aiTools: [],
    customAiTool: '',
    aiGeneratedPercent: 0,
    aiRefactoredPercent: 0,
    humanWrittenPercent: 100,
    learnings: '',
    challenges: '',
    teamMembers: [],
    email: ''
  });

  const totalSteps = 4;

  // Validation function
  const validateStep = (step: number) => {
    const errors: string[] = [];
    
    switch (step) {
      case 1:
        if (!formData.email.trim()) {
          errors.push('Email is required');
        } else if (!isValidEmail(formData.email)) {
          errors.push('Please enter a valid email address');
        }
        
        if (!formData.title.trim()) {
          errors.push('Project title is required');
        }
        
        if (!formData.description.trim()) {
          errors.push('Project description is required');
        } else if (formData.description.trim().length < 50) {
          errors.push('Project description must be at least 50 characters');
        }
        break;
        
      case 2:
        // Step 2 has no mandatory fields, but validate URLs if provided
        if (formData.demoUrl && !isValidUrl(formData.demoUrl)) {
          errors.push('Demo URL is not valid');
        }
        if (formData.repoUrl && !isValidUrl(formData.repoUrl)) {
          errors.push('Repository URL is not valid');
        }
        break;
        
      case 3:
        if (!formData.vibeNarrative.trim()) {
          errors.push('Vibe narrative is required');
        } else if (formData.vibeNarrative.trim().length < 100) {
          errors.push('Vibe narrative must be at least 100 characters');
        }
        break;
        
      case 4:
        // Step 4 has no mandatory fields
        break;
    }
    
    return { isValid: errors.length === 0, errors };
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const nextStep = () => {
    const validation = validateStep(currentStep);
    
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        addToast({
          type: 'error',
          title: 'Validation Error',
          message: error
        });
      });
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate all steps before submission
    for (let step = 1; step <= totalSteps; step++) {
      const validation = validateStep(step);
      if (!validation.isValid) {
        validation.errors.forEach(error => {
          addToast({
            type: 'error',
            title: 'Validation Error',
            message: error
          });
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        addToast({
          type: 'success',
          title: 'Project Submitted!',
          message: `Your project "${result.project.title}" has been submitted successfully.`
        });
        onClose();
      } else {
        addToast({
          type: 'error',
          title: 'Submission Failed',
          message: result.error || 'Please try again.'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      addToast({
        type: 'error',
        title: 'Connection Error',
        message: 'Failed to submit project. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`form-input-white ${!formData.email.trim() || !isValidEmail(formData.email) ? 'border-red-300' : ''}`}
                placeholder="your@email.com"
                required
              />
              {!formData.email.trim() && (
                <p className="text-sm text-red-600 mt-1">Email is required</p>
              )}
              {formData.email.trim() && !isValidEmail(formData.email) && (
                <p className="text-sm text-red-600 mt-1">Please enter a valid email address</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`form-input-white ${!formData.title.trim() ? 'border-red-300' : ''}`}
                placeholder="Enter your project title"
              />
              {!formData.title.trim() && (
                <p className="text-sm text-red-600 mt-1">Project title is required</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={`form-input-white min-h-[120px] ${!formData.description.trim() || formData.description.trim().length < 50 ? 'border-red-300' : ''}`}
                placeholder="Describe what your project does and what makes it special (at least 50 characters)"
              />
              <div className="flex justify-between items-center mt-1">
                {(!formData.description.trim() || formData.description.trim().length < 50) && (
                  <p className="text-sm text-red-600">
                    {!formData.description.trim() ? 'Project description is required' : `Need ${50 - formData.description.trim().length} more characters`}
                  </p>
                )}
                <p className="text-sm text-gray-500 ml-auto">
                  {formData.description.length} characters
                </p>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Demo URL
              </label>
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                className={`form-input-white ${formData.demoUrl && !isValidUrl(formData.demoUrl) ? 'border-red-300' : ''}`}
                placeholder="https://your-project-demo.com"
              />
              {formData.demoUrl && !isValidUrl(formData.demoUrl) && (
                <p className="text-sm text-red-600 mt-1">Please enter a valid URL</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repository URL
              </label>
              <input
                type="url"
                value={formData.repoUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, repoUrl: e.target.value }))}
                className={`form-input-white ${formData.repoUrl && !isValidUrl(formData.repoUrl) ? 'border-red-300' : ''}`}
                placeholder="https://github.com/username/project"
              />
              {formData.repoUrl && !isValidUrl(formData.repoUrl) && (
                <p className="text-sm text-red-600 mt-1">Please enter a valid URL</p>
              )}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vibe Narrative *
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Tell us the story of how you and AI collaborated to build this project. (At least 100 characters)
              </p>
              <textarea
                value={formData.vibeNarrative}
                onChange={(e) => setFormData(prev => ({ ...prev, vibeNarrative: e.target.value }))}
                className={`form-input-white min-h-[150px] ${!formData.vibeNarrative.trim() || formData.vibeNarrative.trim().length < 100 ? 'border-red-300' : ''}`}
                placeholder="Describe your human-AI collaboration journey..."
              />
              <div className="flex justify-between items-center mt-1">
                {(!formData.vibeNarrative.trim() || formData.vibeNarrative.trim().length < 100) && (
                  <p className="text-sm text-red-600">
                    {!formData.vibeNarrative.trim() ? 'Vibe narrative is required' : `Need ${100 - formData.vibeNarrative.trim().length} more characters`}
                  </p>
                )}
                <p className="text-sm text-gray-500 ml-auto">
                  {formData.vibeNarrative.length} characters
                </p>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Learnings
              </label>
              <textarea
                value={formData.learnings}
                onChange={(e) => setFormData(prev => ({ ...prev, learnings: e.target.value }))}
                className="form-input-white min-h-[100px]"
                placeholder="What did you learn from this vibe coding experience?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenges Faced
              </label>
              <textarea
                value={formData.challenges}
                onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                className="form-input-white min-h-[100px]"
                placeholder="What challenges did you encounter and how did you overcome them?"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[20px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 md:p-8">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-barlow-semibold text-black">
              Submit Your Project
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-6">
            {renderStep()}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-secondary-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="btn-primary-white"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap the main component with ToastProvider
export default function HomePageWithToast() {
  return (
    <ToastProvider>
      <HomePage />
    </ToastProvider>
  );
} 