'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// TypeScript declaration for spline-viewer web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
      };
    }
  }
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface NewsletterFormData {
  email: string;
  name: string;
  profession: string;
  consent: boolean;
}

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  demoUrl: string;
  repoUrl: string;
  videoUrl: string;
  downloadUrl: string;
  vibeNarrative: string;
  aiTools: string[];
  customAiTool: string;
  aiGeneratedPercent: number;
  aiRefactoredPercent: number;
  humanWrittenPercent: number;
  learnings: string;
  challenges: string;
  teamMembers: Array<{
    name: string;
    role: string;
    email: string;
    github: string;
  }>;
  email: string;
}

// Spline Web Component
function SplineViewer() {
  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.14/build/spline-viewer.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <spline-viewer 
      url="https://prod.spline.design/573Wj58x9dEfxJGw/scene.splinecode"
      style={{ width: '100%', height: '100%' }}
    >
      <img 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAATCAYAAADxlA/3AAAJ+ElEQVR4AQCBAH7/AFB0FRBQdBUMUHQVBFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQ1QdBUZUHQVIlB0FSdQdBUnUHQVIlB0FRlQdBUNUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVBFB0FQxQdBUPAIEAfv8AUHQVDFB0FQhQdBUBUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUBUHQVDlB0FRpQdBUjUHQVKFB0FShQdBUjUHQVGlB0FQ5QdBUBUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUBUHQVCFB0FQwAgQB+/wBQdBUIUHQVBFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQNQdBUSUHQVHlB0FShQdBUtUHQVLVB0FShQdBUeUHQVEVB0FQNQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUCUHQVBgCBAH7/AFB0FQRQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVClB0FRlQdBUmUHQVMVB0FTZQdBU2UHQVMVB0FSZQdBUZUHQVClB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUBAIEAfv8AUHQVA1B0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQVQdBUVUHQVJVB0FTRQdBU+UHQVRFB0FURQdBU/UHQVNFB0FSZQdBUWUHQVBlB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQAAgQB+/wBQdBUGUHQVA1B0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUEUHQVFFB0FSVQdBU3UHQVRlB0FVFQdBVXUHQVWFB0FVJQdBVHUHQVOFB0FSZQdBUVUHQVBVB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUBUHQVAwCBAH7/AFB0FQ1QdBUKUHQVBlB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVBlB0FRRQdBUlUHQVN1B0FUpQdBVaUHQVZlB0FW1QdBVtUHQVZ1B0FVxQdBVMUHQVOlB0FSdQdBUWUHQVCFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVBFB0FQhQdBULAIEAfv8AUHQVFFB0FRJQdBUNUHQVCFB0FQRQdBUCUHQVA1B0FQlQdBUTUHQVIlB0FTRQdBVIUHQVW1B0FWxQdBV5UHQVgFB0FYFQdBV7UHQVb1B0FV9QdBVMUHQVOVB0FSdQdBUYUHQVDVB0FQdQdBUEUHQVBlB0FQlQdBUOUHQVElB0FRQAgQB+/wBQdBUZUHQVF1B0FRNQdBUOUHQVClB0FQhQdBUKUHQVEVB0FRxQdBUsUHQVPlB0FVNQdBVnUHQVeFB0FYVQdBWNUHQVjlB0FYhQdBV8UHQVbFB0FVlQdBVFUHQVM1B0FSNQdBUYUHQVEFB0FQ5QdBUOUHQVElB0FRVQdBUZUHQVGwCBAH7/AFB0FRlQdBUXUHQVE1B0FQ5QdBULUHQVCVB0FQtQdBUSUHQVHVB0FS1QdBVAUHQVVVB0FWlQdBV7UHQViVB0FZBQdBWRUHQVjFB0FYBQdBVwUHQVXVB0FUlQdBU3UHQVJ1B0FRtQdBUUUHQVEVB0FRJQdBUVUHQVGFB0FRxQdBUeAIEAfv8AUHQVFVB0FRJQdBUOUHQVCVB0FQVQdBUDUHQVBVB0FQtQdBUXUHQVJlB0FTlQdBVNUHQVYlB0FXNQdBWBUHQViVB0FYpQdBWFUHQVelB0FWpQdBVXUHQVRFB0FTJQdBUjUHQVF1B0FRBQdBUOUHQVDlB0FRJQdBUWUHQVGVB0FRsAgQB+/wBQdBUMUHQVClB0FQVQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQlQdBUYUHQVKlB0FT5QdBVSUHQVY1B0FXFQdBV5UHQVelB0FXVQdBVrUHQVW1B0FUpQdBU3UHQVJlB0FRdQdBUNUHQVBlB0FQRQdBUGUHQVCVB0FQ5QdBUSUHQVFACBAH7/AFB0FQRQdBUBUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQdQdBUXUHQVKlB0FT1QdBVOUHQVW1B0FWNQdBVlUHQVYFB0FVZQdBVIUHQVN1B0FSVQdBUVUHQVCFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVBFB0FQhQdBULAIEAfv8AUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQVQdBUXUHQVKVB0FTlQdBVFUHQVTVB0FU9QdBVKUHQVQVB0FTNQdBUjUHQVE1B0FQRQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAVB0FQMAgQB+/wBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQdQdBUYUHQVJ1B0FTNQdBU6UHQVPFB0FThQdBUvUHQVIlB0FRNQdBUEUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAACBAH7/AFB0FQJQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQ1QdBUbUHQVJlB0FS1QdBUuUHQVK1B0FSJQdBUWUHQVCVB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUBAIEAfv8AUHQVClB0FQZQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVB1B0FRRQdBUfUHQVJVB0FSdQdBUjUHQVG1B0FRBQdBUDUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVA1B0FQYAgQB+/wBQdBUTUHQVD1B0FQZQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUGUHQVElB0FRxQdBUiUHQVJFB0FSBQdBUZUHQVDlB0FQFQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQFQdBUIUHQVDAGBAH7/AFB0FRhQdBUUUHQVC1B0FQFQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQVQdBUSUHQVG1B0FSFQdBUjUHQVH1B0FRhQdBUNUHQVAVB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVAFB0FQBQdBUAUHQVBVB0FQxQdBUPPrI72kMMOyEAAAAASUVORK5CYII=" 
        alt="Spline preview" 
        style={{ width: '100%', height: '100%' }}
      />
    </spline-viewer>
  );
}

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mounted, setMounted] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  // Refs for typing animation
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const typingText1Ref = useRef<HTMLParagraphElement>(null);
  const typingText2Ref = useRef<HTMLParagraphElement>(null);

  // Original text content for typing animation
  const originalText1 = "That 2 AM idea brought to life with Lovable. </br> The interface built not from a spec, but from a conversation. Your best work isn't on a roadmap. </br> It's born from your dialogue with AI.";
  const originalText2 = "We are here to provide a stage for this new craft, to study its patterns, and to celebrate the remarkable work born from the synergy between human vision and machine intelligence.";

  const [newsletterForm, setNewsletterForm] = useState<NewsletterFormData>({
    email: '',
    name: '',
    profession: '',
    consent: false
  });

  const [projectForm, setProjectForm] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: '',
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
    teamMembers: [{ name: '', role: '', email: '', github: '' }],
    email: ''
  });

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      // July 13, 2025 at 23:59 ET (Eastern Time)
      const targetDate = new Date('2025-07-13T23:59:00-05:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // GSAP Typing Animation Effect
  useEffect(() => {
    if (!mounted) return;

    const setupTypingAnimation = (textRef: React.RefObject<HTMLParagraphElement>, sectionRef: React.RefObject<HTMLDivElement>, originalText: string) => {
      if (!textRef.current || !sectionRef.current) return;

      // Start with empty text
      textRef.current.textContent = '';

      // Check if mobile
      const isMobile = window.innerWidth <= 768;

      // Create the typing animation
      gsap.to(textRef.current, {
        text: {
          value: originalText
        },
        duration: 3, // Duration of typing animation
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: sectionRef.current,
          start: isMobile ? "top 20px" : "center center", // Mobile: pin at 20px from top
          end: isMobile ? "bottom 20px" : "center -100px",
          scrub: true,
          markers: false, // Remove in production
          onUpdate: (self) => {
            // Optional: Add cursor effect during typing
            if (self.progress < 1) {
              textRef.current!.style.borderRight = '2px solid black';
            } else {
              textRef.current!.style.borderRight = 'none';
            }
          }
        }
      });
    };

    // Setup animations for both sections
    setupTypingAnimation(typingText1Ref, section1Ref, originalText1);
    setupTypingAnimation(typingText2Ref, section2Ref, originalText2);

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted, originalText1, originalText2]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsletterForm)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Successfully subscribed! Check your email for confirmation.');
        setNewsletterForm({ email: '', name: '', profession: '', consent: false });
        setTimeout(() => setShowNewsletterModal(false), 2000);
      } else {
        setSubmitMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Project submitted successfully! Check your email for confirmation.');
        setProjectForm({
          title: '',
          description: '',
          category: '',
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
          teamMembers: [{ name: '', role: '', email: '', github: '' }],
          email: ''
        });
        setCurrentStep(1);
        setTimeout(() => setShowProjectModal(false), 2000);
      } else {
        setSubmitMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/company/vibe-coding-award/', '_blank');
  };

  const openContact = () => {
    window.open('mailto:info@vibecodingawards.com?subject=General%20Inquiry%20-%20Vibe%20Coding%20Award', '_blank');
  };

  const openPartnership = () => {
    window.open('mailto:info@vibecodingawards.com?subject=Partnership%20and%20Industry%20Collaboration%20Inquiry', '_blank');
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="bg-white text-black font-barlow"
         style={{ color: 'black' }}>
      {/* Body margins: 32px desktop, 20px mobile */}
      <div className="px-5 md:px-8 space-y-5">
        
        {/* Header & Hero Section - Fixed height desktop, responsive mobile */}
        <section className="h-[750px] md:h-[750px] hero-mobile flex flex-col items-center justify-start relative">
          {/* Logo - 85px high, 50px from top on desktop, left-aligned on mobile */}
          <div className="absolute top-12 md:top-12.5 logo-mobile">
            <img
              src="/Vibe Coding Award Logo.svg"
              alt="Vibe Coding Award"
              className="h-[100px] w-auto"
            />
          </div>

          {/* Main content vertically centered in remaining space */}
          <div className="flex flex-col items-center justify-center flex-1 mt-[135px] md:mt-[135px] mobile-hero-content">
            {/* Text below logo - 64px gap on mobile */}
            <p className="text-lg md:text-xl font-medium leading-7 mb-12 md:mb-12 mb-8 text-center text-color mobile-hero-text">
              The Stage for AI-Native Creation opens in:
            </p>

            {/* Countdown Timer - 240x180px boxes on desktop, 2x2 grid on mobile */}
            <div className="hidden md:flex gap-4 mb-15">
              {/* Days */}
              <div className="w-[240px] h-[180px] grainy-bg p-6 relative rounded-[32px]">
                <div className="text-sm font-semibold tracking-wider uppercase absolute top-6 left-6">
                  DAYS
                </div>
                <div 
                  className="text-[120px] font-normal absolute top-2 right-6"
                  style={{ letterSpacing: '-5%' }}
                >
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
              </div>

              {/* Hours */}
              <div className="w-[240px] h-[180px] grainy-bg p-6 relative rounded-[32px]">
                <div className="text-sm font-semibold tracking-wider uppercase absolute top-6 left-6">
                  HOURS
                </div>
                <div 
                  className="text-[120px] font-normal absolute top-2 right-6"
                  style={{ letterSpacing: '-5%' }}
                >
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
              </div>

              {/* Minutes */}
              <div className="w-[240px] h-[180px] grainy-bg p-6 relative rounded-[32px]">
                <div className="text-sm font-semibold tracking-wider uppercase absolute top-6 left-6">
                  MINUTES
                </div>
                <div 
                  className="text-[120px] font-normal absolute top-2 right-6"
                  style={{ letterSpacing: '-5%' }}
                >
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
              </div>

              {/* Seconds */}
              <div className="w-[240px] h-[180px] grainy-bg p-6 relative rounded-[32px]">
                <div className="text-sm font-semibold tracking-wider uppercase absolute top-6 left-6">
                  SECONDS
                </div>
                <div 
                  className="text-[120px] font-normal absolute top-2 right-6"
                  style={{ letterSpacing: '-5%' }}
                >
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Mobile Countdown - 2x2 grid reaching viewport edges */}
            <div className="md:hidden countdown-container-mobile">
              <div className="grid grid-cols-2 gap-2 mb-2">
                {/* Days */}
                <div className="h-[132px] grainy-bg p-4 relative rounded-[20px]">
                <div className="text-xs font-semibold tracking-wider uppercase absolute top-3 left-4">
                  DAYS
                </div>
                <div 
                  className="text-[72px] font-normal absolute bottom-[-12px] right-4"
                  style={{ letterSpacing: '-5%' }}
                >
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
              </div>

              {/* Hours */}
              <div className="h-[132px] grainy-bg p-4 relative rounded-[20px]">
                <div className="text-xs font-semibold tracking-wider uppercase absolute top-3 left-4">
                  HOURS
                </div>
                <div 
                  className="text-[72px] font-normal absolute bottom-[-12px] right-4"
                  style={{ letterSpacing: '-5%' }}
                >
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
              </div>

              {/* Minutes */}
              <div className="h-[132px] grainy-bg p-4 relative rounded-[20px]">
                <div className="text-xs font-semibold tracking-wider uppercase absolute top-3 left-4">
                  MINUTES
                </div>
                <div 
                  className="text-[72px] font-normal absolute bottom-[-12px] right-4"
                  style={{ letterSpacing: '-5%' }}
                >
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
              </div>

              {/* Seconds */}
              <div className="h-[132px] grainy-bg p-4 relative rounded-[20px]">
                <div className="text-xs font-semibold tracking-wider uppercase absolute top-3 left-4">
                  SECONDS
                </div>
                <div 
                  className="text-[72px] font-normal absolute bottom-[-12px] right-4"
                  style={{ letterSpacing: '-5%' }}
                >
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                </div>
              </div>
            </div>

            {/* JOIN THE VANGUARD Button */}
            <button 
              className="btn-join-vanguard"
              onClick={() => setShowNewsletterModal(true)}
            >
              JOIN THE VANGUARD
            </button>
          </div>
        </section>

        {/* Main Content Section 1 - Fixed height desktop, compact mobile */}
        <div style={{ marginTop: '40px' }} className="md:mt-[160px] mt-5">
          <section 
            ref={section1Ref}
            className="h-[460px] md:h-[460px] mobile-section bg-[#F3F3F3] rounded-[20px] md:rounded-[32px] grainy-bg mobile-padding relative section-typing_text"
          >
            {/* Eyebrow - top aligned */}
            <div className="absolute top-8 left-8 md:top-8 md:left-8 typing_text-heading">
              <p className="text-m md:text-xl text-sm font-semibold leading-7 tracking-wider uppercase">
                MANIFESTO
              </p>
            </div>

            {/* Main text - bottom aligned on desktop, with gap on mobile */}
            <div className="absolute bottom-8 left-8 right-8 md:absolute md:bottom-8 md:left-8 md:right-8 static mobile-eyebrow-gap">
              <p 
                ref={typingText1Ref}
                className="text-responsive-large font-normal typing_text"
              >
                {/* Text will be animated via GSAP */}
              </p>
            </div>
          </section>
        </div>

        {/* Category Cards Section - 4 columns desktop, 460px height */}
        <section className="space-y-4">
                      {/* Desktop - 4 columns */}
            <div className="hidden md:grid grid-cols-4 gap-4">
              {/* WEBSITES */}
              <div className="min-h-[460px] md:min-h-[460px] mobile-section bg-[#F3F3F3] rounded-[32px] grainy-bg p-8 md:p-8 p-5 relative">
                <div className="absolute top-8 left-8 md:top-8 md:left-8 top-5 left-5">
                  <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                    CATEGORY 1
                  </span>
                </div>
                <h3 className="text-[60px] md:text-[60px] text-[32px] leading-[72px] md:leading-[72px] leading-[36px] font-bold absolute md:absolute static mobile-category-gap" style={{top: '120px', left: '32px'}}>WEBSITES</h3>
                <p className="text-xl md:text-xl text-base leading-8 md:leading-8 leading-6 font-normal absolute bottom-8 left-8 right-8 md:absolute md:bottom-8 md:left-8 md:right-8 static mobile-eyebrow-gap">
                  For beautifully crafted websites, interactive landing pages, online portfolios, and any web-based project where design and user experience are central.
                </p>
              </div>

                          {/* APPS */}
              <div className="h-[460px] md:h-[460px] mobile-section bg-[#F3F3F3] rounded-[32px] grainy-bg p-8 md:p-8 p-5 relative">
                <div className="absolute top-8 left-8 md:top-8 md:left-8 top-5 left-5">
                  <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                    CATEGORY 2
                  </span>
                </div>
                <h3 className="text-[60px] md:text-[60px] text-[32px] leading-[72px] md:leading-[72px] leading-[36px] font-bold absolute md:absolute static mobile-category-gap" style={{top: '120px', left: '32px'}}>APPS</h3>
                <p className="text-xl md:text-xl text-base leading-8 md:leading-8 leading-6 font-normal absolute bottom-8 left-8 right-8 md:absolute md:bottom-8 md:left-8 md:right-8 static mobile-eyebrow-gap">
                  For mobile, desktop, or web applications designed to solve a problem, increase productivity, or offer a unique service. This includes tools, plugins, and SaaS products.
                </p>
              </div>

                          {/* GAMES */}
              <div className="h-[460px] md:h-[460px] mobile-section bg-[#F3F3F3] rounded-[32px] grainy-bg p-8 md:p-8 p-5 relative">
                <div className="absolute top-8 left-8 md:top-8 md:left-8 top-5 left-5">
                  <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                    CATEGORY 3
                  </span>
                </div>
                <h3 className="text-[60px] md:text-[60px] text-[32px] leading-[72px] md:leading-[72px] leading-[36px] font-bold absolute md:absolute static mobile-category-gap" style={{top: '120px', left: '32px'}}>GAMES</h3>
                <p className="text-xl md:text-xl text-base leading-8 md:leading-8 leading-6 font-normal absolute bottom-8 left-8 right-8 md:absolute md:bottom-8 md:left-8 md:right-8 static mobile-eyebrow-gap">
                  For games of any genre and platform, from simple web-based puzzles to more complex immersive worlds.
                </p>
              </div>

                          {/* X */}
              <div className="h-[460px] md:h-[460px] mobile-section bg-[#F3F3F3] rounded-[32px] grainy-bg p-8 md:p-8 p-5 relative">
                <div className="absolute top-8 left-8 md:top-8 md:left-8 top-5 left-5">
                  <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                    CATEGORY 4
                  </span>
                </div>
                <h3 
                  className="text-[60px] md:text-[60px] text-[32px] leading-[72px] md:leading-[72px] leading-[36px] font-bold absolute md:absolute static mobile-category-gap"
                  style={{
                    top: '120px', 
                    left: '32px',
                    WebkitTextStroke: '1px black',
                    WebkitTextFillColor: '#B8FF3D'
                  }}
                >
                  X
                </h3>
                <p className="text-xl md:text-xl text-base leading-8 md:leading-8 leading-6 font-normal absolute bottom-8 left-8 right-8 md:absolute md:bottom-8 md:left-8 md:right-8 static mobile-eyebrow-gap">
                  If your project defies easy categorization—from generative art and AI experiments to hardware integrations—this is its home. Surprise us.
                </p>
              </div>
          </div>

          {/* Mobile - Horizontal scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4">
            <div className="w-[300px] mobile-section bg-[#F3F3F3] rounded-[20px] grainy-bg mobile-padding flex-shrink-0">
              <div className="mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  CATEGORY 1
                </span>
              </div>
              <h3 className="text-[32px] leading-[36px] font-bold mb-4 mobile-category-gap" style={{letterSpacing: '-2%'}}>WEBSITES</h3>
              <p className="text-base leading-6 font-normal mobile-eyebrow-gap">
                For beautifully crafted websites, interactive landing pages, online portfolios, and any web-based project where design and user experience are central.
              </p>
            </div>
            <div className="w-[300px] mobile-section bg-[#F3F3F3] rounded-[20px] grainy-bg mobile-padding flex-shrink-0">
              <div className="mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  CATEGORY 2
                </span>
              </div>
              <h3 className="text-[32px] leading-[36px] font-bold mb-4 mobile-category-gap" style={{letterSpacing: '-2%'}}>APPS</h3>
              <p className="text-base leading-6 font-normal mobile-eyebrow-gap">
                                  For mobile, desktop, or web applications designed to solve a problem, increase productivity, or offer a unique service. This includes tools, plugins, and SaaS products.
              </p>
            </div>
            <div className="w-[300px] mobile-section bg-[#F3F3F3] rounded-[20px] grainy-bg mobile-padding flex-shrink-0">
              <div className="mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  CATEGORY 3
                </span>
              </div>
              <h3 className="text-[32px] leading-[36px] font-bold mb-4 mobile-category-gap" style={{letterSpacing: '-2%'}}>GAMES</h3>
              <p className="text-base leading-6 font-normal mobile-eyebrow-gap">
                                  For games of any genre and platform, from simple web-based puzzles to more complex immersive worlds.
              </p>
            </div>
            <div className="w-[300px] mobile-section bg-[#F3F3F3] rounded-[20px] grainy-bg mobile-padding flex-shrink-0">
              <div className="mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  CATEGORY 4
                </span>
              </div>
              <h3 
                className="text-[32px] leading-[36px] font-bold mb-4 mobile-category-gap"
                style={{
                  WebkitTextStroke: '1px black',
                  WebkitTextFillColor: '#B8FF3D',
                  letterSpacing: '-2%'
                }}
              >
                X
              </h3>
              <p className="text-base leading-6 font-normal mobile-eyebrow-gap">
                If your project defies easy categorization—from generative art and AI experiments to hardware integrations—this is its home. Surprise us.
              </p>
            </div>
          </div>
        </section>

        {/* Spline 3D Scene */}
        <section className="h-[400px] md:h-[500px] mobile-spline rounded-[32px] md:rounded-[32px] rounded-[20px] overflow-hidden">
          <spline-viewer 
            url="https://prod.spline.design/573Wj58x9dEfxJGw/scene.splinecode"
            className="w-full h-full"
          >
            <img 
              src="data:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAYAAADISGwcAAAG1ElEQVR4AQCBAH7/ALX6KRe1+ikTtfopDLX6KQK1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopAbX6KQ61+ikZtfopIrX6KSe1+ikntfopIrX6KRm1+ikOtfopAbX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikCtfopDLX6KRO1+ikXAIEAfv8AtfopDbX6KQm1+ikCtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikBtfopDrX6KRq1+ikjtfopKLX6KSi1+ikjtfopGrX6KQ61+ikBtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikBtfopCLX6KQwAgQB+/wC1+ikCtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQe1+ikWtfopI7X6KS21+ikztfopM7X6KS21+ikjtfopFrX6KQe1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopAACBAH7/ALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikKtfopG7X6KSy1+ik7tfopRrX6KUy1+ilMtfopRrX6KTu1+ikstfopG7X6KQq1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAAIEAfv8AtfopCbX6KQe1+ikCtfopALX6KQC1+ikAtfopALX6KQC1+ikGtfopFLX6KSa1+ik5tfopTLX6KVy1+ilotfopb7X6KXC1+ilqtfopXrX6KU61+ik7tfopKLX6KRe1+ikItfopALX6KQC1+ikAtfopALX6KQC1+ikBtfopBbX6KQcAgQB+/wC1+ikWtfopE7X6KRC1+ikLtfopCLX6KQe1+ikJtfopELX6KRy1+ikstfopP7X6KVS1+ilotfoperX6KYe1+imPtfopj7X6KYm1+il9tfopbLX6KVm1+ilFtfopMrX6KSK1+ikVtfopDrX6KQu1+ikLtfopDrX6KRG1+ikVtfopFwCBAH7/ALX6KRm1+ikXtfopFLX6KQ+1+ikMtfopDLX6KQ+1+ikWtfopIrX6KTO1+ilHtfopXLX6KXG1+imEtfopkbX6KZm1+imatfoplbX6KYm1+il4tfopZLX6KVC1+ik9tfopLLX6KR+1+ikXtfopFLX6KRO1+ikWtfopGbX6KRy1+ikeAIEAfv8AtfopELX6KQ21+ikJtfopBbX6KQG1+ikAtfopArX6KQi1+ikUtfopJLX6KTe1+ilMtfopYbX6KXO1+imBtfopibX6KYq1+imFtfoperX6KWq1+ilXtfopQ7X6KTG1+ikhtfopFbX6KQ61+ikLtfopC7X6KQ61+ikRtfopFbX6KRcAgQB+/wC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikHtfopGbX6KSy1+ik/tfopUbX6KV61+ilmtfopZ7X6KWO1+ilYtfopSrX6KTi1+ikmtfopFbX6KQi1+ikAtfopALX6KQC1+ikAtfopALX6KQG1+ikFtfopBwCBAH7/ALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopDLX6KR61+ikttfopOrX6KUG1+ilDtfopP7X6KTW1+ikotfopGbX6KQm1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAAIEAfv8AtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopCbX6KRi1+ikjtfopKbX6KSu1+ikntfopH7X6KRO1+ikFtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQAAgQB+/wC1+ikRtfopDbX6KQW1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikEtfopEbX6KRu1+ikhtfopI7X6KR+1+ikYtfopDbX6KQG1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQG1+ikItfopDAGBAH7/ALX6KSC1+ikbtfopE7X6KQe1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQa1+ikStfopG7X6KSG1+ikjtfopH7X6KRi1+ikOtfopA7X6KQC1+ikAtfopALX6KQC1+ikAtfopALX6KQC1+ikDtfopDLX6KRO1+ikX2iImb/CtKlcAAAAASUVORK5CYII=" 
              alt="Spline preview" 
              style={{width: '100%', height: '100%'}}
            />
          </spline-viewer>
        </section>

        {/* Two Column Section */}
        <section className="space-y-4 md:space-y-0">
          <div className="md:grid grid-cols-2 gap-4 space-y-4 md:space-y-0">
            {/* Be the First to Submit */}
            <div className="h-[460px] md:h-[460px] mobile-two-column bg-[#F3F3F3] rounded-[20px] md:rounded-[32px] grainy-bg mobile-padding relative">

              {/* Bottom content - left aligned, bottom aligned */}
              <div className="bottom-2 left-2 md:absolute md:bottom-8 md:left-8">
                <h3 className="text-responsive-large font-bold uppercase mb-4" style={{color: 'black'}}>
                  BE THE FIRST<br />TO SUBMIT
                </h3>
                <button 
                  className="btn-join-vanguard"
                  onClick={() => setShowNewsletterModal(true)}
                >
                  JOIN THE VANGUARD
                </button>
              </div>
            </div>

                          {/* Who Decides What's Next */}
              <div className="h-[460px] md:h-[460px] mobile-two-column bg-[#F3F3F3] rounded-[20px] md:rounded-[32px] grainy-bg mobile-padding relative">
                
                {/* Bottom content - right aligned on mobile, left aligned on desktop */}
                <div className="absolute bottom-2 right-2 md:absolute md:bottom-8 md:left-8 text-right md:text-left">
                  <h3 className="text-responsive-large font-bold uppercase mb-4 text-color-black">
                    WHO DECIDES<br />WHAT'S NEXT
                  </h3>
                  <button 
                    className="btn-inquire-judging"
                    onClick={() => window.open('mailto:info@vibecodingawards.com?subject=Judging%20Panel%20Inquiry%20-%20Vibe%20Coding%20Award', '_blank')}
                  >
                    INQUIRE ABOUT JUDGING
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </button>
                </div>
              </div>
          </div>
        </section>

                {/* Main Content Section 3 - Single row, 460px height */}
        <section 
          ref={section2Ref}
          className="h-[460px] md:h-[460px] mobile-section bg-[#F3F3F3] rounded-[20px] md:rounded-[32px] grainy-bg mobile-padding relative section-typing_text"
        >
          {/* Eyebrow - top aligned */}
          <div className="absolute top-8 left-8 md:top-8 md:left-8 typing_text-heading">
            <p className="text-m md:text-xl text-sm font-semibold leading-7 tracking-wider uppercase">
              THE NEXT CHAPTER OF CRAFT
            </p>
          </div>

          {/* Main text - bottom aligned on desktop, with gap on mobile */}
          <div className="absolute bottom-8 left-8 right-8 md:absolute md:bottom-8 md:left-8 md:right-8 static mobile-eyebrow-gap">
            <p 
              ref={typingText2Ref}
              className="text-responsive-large font-normal typing_text"
            >
              {/* Text will be animated via GSAP */}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-16">
          {/* Button Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button className="btn-footer" onClick={openLinkedIn}>
              LINKEDIN
            </button>
            <button className="btn-footer" onClick={openPartnership}>
              PARTNERSHIP/INDUSTRY
            </button>
            <button className="btn-footer" onClick={openContact}>
              CONTACT US
            </button>
          </div>

          {/* Logo and Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <img
              src="/Vibe Coding Award Logo.svg"
              alt="Vibe Coding Award"
              className="h-16 w-auto mb-4 md:mb-0"
            />
            <p className="text-sm font-semibold tracking-wider uppercase">
              © 2025 ALL RIGHTS RESERVED
            </p>
          </div>
        </footer>

      </div>

      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Join the Vanguard</h2>
            <p className="text-gray-600 mb-6">
              Be the first to know about submissions, voting, and winners.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={newsletterForm.email}
                  onChange={(e) => setNewsletterForm({...newsletterForm, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="creator@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={newsletterForm.name}
                  onChange={(e) => setNewsletterForm({...newsletterForm, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  value={newsletterForm.profession}
                  onChange={(e) => setNewsletterForm({...newsletterForm, profession: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your role</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="dreamer">Dreamer</option>
                  <option value="founder">Founder</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  checked={newsletterForm.consent}
                  onChange={(e) => setNewsletterForm({...newsletterForm, consent: e.target.checked})}
                  className="mt-1 mr-3"
                />
                <label className="text-sm text-gray-600">
                  I agree to receive updates about the Vibe Coding Award and understand I can unsubscribe at any time.
                </label>
              </div>
              
              {submitMessage && (
                <div className={`p-3 rounded ${submitMessage.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submitMessage}
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewsletterModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-[#B8FF3D] text-black border border-black rounded-lg hover:bg-black hover:text-[#B8FF3D] disabled:opacity-50"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Submission Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Submit Your Project</h2>
            <p className="text-gray-600 mb-6">
              Share your AI-native creation with the community.
            </p>
            
            {/* Step Indicator */}
            <div className="flex mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 mx-1 rounded ${
                    step <= currentStep ? 'bg-[#B8FF3D]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              {currentStep === 1 && (
                <>
                  <h3 className="text-lg font-semibold mb-4">Step 1: Project Basics</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your amazing project name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your project..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      <option value="WEB_APP">Web App</option>
                      <option value="MOBILE_APP">Mobile App</option>
                      <option value="DESKTOP_APP">Desktop App</option>
                      <option value="GAME">Game</option>
                      <option value="TOOL_UTILITY">Tool/Utility</option>
                      <option value="AI_ML">AI/ML</option>
                      <option value="CREATIVE">Creative</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={projectForm.email}
                      onChange={(e) => setProjectForm({...projectForm, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h3 className="text-lg font-semibold mb-4">Step 2: Project Links</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Demo URL</label>
                    <input
                      type="url"
                      value={projectForm.demoUrl}
                      onChange={(e) => setProjectForm({...projectForm, demoUrl: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://your-demo.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Repository URL</label>
                    <input
                      type="url"
                      value={projectForm.repoUrl}
                      onChange={(e) => setProjectForm({...projectForm, repoUrl: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Video URL</label>
                    <input
                      type="url"
                      value={projectForm.videoUrl}
                      onChange={(e) => setProjectForm({...projectForm, videoUrl: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <h3 className="text-lg font-semibold mb-4">Step 3: The Vibe Story</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Vibe Narrative *</label>
                    <textarea
                      required
                      rows={6}
                      value={projectForm.vibeNarrative}
                      onChange={(e) => setProjectForm({...projectForm, vibeNarrative: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your journey building this with AI. What was the vibe? How did you collaborate with AI tools? What surprised you?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">AI Tools Used</label>
                    <input
                      type="text"
                      value={projectForm.customAiTool}
                      onChange={(e) => setProjectForm({...projectForm, customAiTool: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Claude, ChatGPT, Cursor, Lovable, etc."
                    />
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <h3 className="text-lg font-semibold mb-4">Step 4: Team & Reflection</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Team Member Name</label>
                    <input
                      type="text"
                      value={projectForm.teamMembers[0]?.name || ''}
                      onChange={(e) => setProjectForm({
                        ...projectForm, 
                        teamMembers: [{ ...projectForm.teamMembers[0], name: e.target.value }]
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <input
                      type="text"
                      value={projectForm.teamMembers[0]?.role || ''}
                      onChange={(e) => setProjectForm({
                        ...projectForm, 
                        teamMembers: [{ ...projectForm.teamMembers[0], role: e.target.value }]
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Developer, Designer, Dreamer etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Key Learnings</label>
                    <textarea
                      rows={3}
                      value={projectForm.learnings}
                      onChange={(e) => setProjectForm({...projectForm, learnings: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What did you learn from this AI collaboration?"
                    />
                  </div>
                </>
              )}
              
              {submitMessage && (
                <div className={`p-3 rounded ${submitMessage.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submitMessage}
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-4 py-2 bg-[#B8FF3D] text-black border border-black rounded-lg hover:bg-black hover:text-[#B8FF3D]"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-[#B8FF3D] text-black border border-black rounded-lg hover:bg-black hover:text-[#B8FF3D] disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Project'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 