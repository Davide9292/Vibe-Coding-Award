'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ToastProvider, useToast, toast } from '@/components/ui/toast';

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      addToast(toast.error('Name Required', 'Please enter your name.'));
      return;
    }
    
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
        body: JSON.stringify({ 
          email, 
          name, 
          profession: profession || null,
          consent: true 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        addToast(toast.success('Welcome to the Vanguard!', 'You\'re now part of the movement. 🚀'));
        setName('');
        setEmail('');
        setProfession('');
        setShowModal(false);
      } else {
        addToast(toast.error('Subscription Failed', result.error || 'Please try again.'));
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      addToast(toast.error('Connection Error', 'Failed to subscribe. Please check your connection and try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Top Gradient */}
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center px-4"
        style={{
          backgroundImage: 'url(/gradient_top.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Logo */}
        <div className="mb-20 md:mb-32">
          <img
            src="/Vibe Coding Award Logo.svg"
            alt="Vibe Coding Award"
            className="h-24 w-auto filter brightness-0"
          />
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto mb-2 md:mb-40">
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-regular leading-tight tracking-tight mb-6 text-black">
            The Stage for AI-Native Creation
          </h1>
          <p className="text-lg md:text-xl text-black max-w-2xl mx-auto mb-8">
            A new award celebrating the pioneers of human-AI collaboration. The inaugural season is coming.
          </p>
          
          {/* CTA Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ffffff] hover:text-black transition-colors"
          >
            Join the Vanguard
          </button>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="pt-2 pb-12 md:pb-28 px-4" style={{ background: 'linear-gradient(to bottom, #E94629, #E94629)' }}>
        <div className="max-w-7xl mx-auto text-left md:text-center">
          <div className="mb-4">
            <span className="text-m uppercase tracking-wider text-white font-semibold">
              OUR MANIFESTO
            </span>
          </div>
          
          <h2 className="text-7xl md:text-6xl lg:text-9xl font-regular leading-tighter tracking-[-0.4rem] md:tracking-tighter mb-6">
            Human creativity is a frontier to be expanded.
          </h2>
          
          <p className="text-lg md:text-xl text-orange-100 max-w-4xl mx-auto leading-relaxed">
            We are entering a new era of digital craftsmanship, defined by the dialogue between human 
            intuition and machine logic. The Vibe Coding Award exists to illuminate the work of those who 
            master this new artform, celebrating projects of unprecedented originality and resonance.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#E94629] to-[#E93030]">
        <div className="max-w-8xl mx-auto text-left md:text-center">
          <div className="mb-4 md:mb-4">
            <span className="text-m uppercase tracking-wider text-white font-semibold">
              CATEGORIES
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-regular tracking-tight mb-4">
            Every great project has a home here.
          </h2>
          
          <p className="text-lg text-white mb-8">
            Find where your work belongs.
          </p>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                         {/* Websites Category */}
             <div 
               className="relative p-4 md:p-8 rounded-2xl text-left"
               style={{
                 backgroundImage: 'url(/category_card_background.png)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}
             >
               <div className="mb-4">
                 <span className="text-s uppercase tracking-wider text-black font-semibold">
                   CATEGORY 1
                 </span>
               </div>
               <div className="mb-4">
                 <img src="/category_websites.png" alt="Websites" className="w-auto h-20 object-contain" />
               </div>
               <p className="text-s text-black leading-relaxed">
                 For beautifully crafted websites, interactive landing pages, online portfolios, and any web-based project where design and user experience are central.
               </p>
             </div>

                         {/* Apps Category */}
             <div 
               className="relative p-4 md:p-8 rounded-2xl text-left"
               style={{
                 backgroundImage: 'url(/category_card_background.png)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}
             >
               <div className="mb-4">
                 <span className="text-s uppercase tracking-wider text-black font-semibold">
                   CATEGORY 2
                 </span>
               </div>
               <div className="mb-4">
                 <img src="/category_apps.png" alt="Apps" className="w-auto h-20 object-contain" />
               </div>
               <p className="text-s text-black leading-relaxed">
                 For mobile, desktop, or web applications designed to solve problems, boost productivity, or offer a unique service. This includes tools, plugins, and SaaS products.
               </p>
             </div>

                         {/* Games Category */}
             <div 
               className="relative p-4 md:p-8 rounded-2xl text-left"
               style={{
                 backgroundImage: 'url(/category_card_background.png)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}
             >
               <div className="mb-4">
                 <span className="text-s uppercase tracking-wider text-black font-semibold">
                   CATEGORY 3
                 </span>
               </div>
               <div className="mb-4">
                 <img src="/category_games.png" alt="Games" className="w-auto h-20 object-contain" />
               </div>
               <p className="text-s text-black leading-relaxed">
                 For games of any genre and platform, from simple web-based games to complex immersive worlds, that showcase innovative gameplay or narrative.
               </p>
             </div>

                         {/* X Category */}
             <div 
               className="relative p-4 md:p-8 rounded-2xl text-left"
               style={{
                 backgroundImage: 'url(/category_card_background.png)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}
             >
               <div className="mb-4">
                 <span className="text-s uppercase tracking-wider text-black font-semibold">
                   CATEGORY X
                 </span>
               </div>
               <div className="mb-4">
                 <img src="/category_x.png" alt="X" className="w-auto h-20 object-contain" />
               </div>
               <p className="text-s text-black leading-relaxed">
                 If your project defies easy categorization—from generative art experiments to hardware integrations—this is its home. Surprise us.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Inspiration Quote Section */}
      <section className="pt-12 pb-20 px-4 bg-gradient-to-b from-[#E93030] to-[#E93030]">
        <div className="max-w-4xl mx-auto text-left md:text-center">
          <p className="text-lg md:text-xl text-white leading-relaxed mb-1">
            That flash of inspiration you had at 2 AM, brought to life with{' '}
            <span className="text-white font-semibold">Cursor</span>.
          </p>
          <p className="text-lg md:text-xl text-white leading-relaxed mb-1">
            That fluid interface you crafted by having a real conversation with{' '}
            <span className="text-white font-semibold">Lovable</span>.
          </p>
          <p className="text-lg md:text-xl text-white leading-relaxed mb-1">
            The things you're building aren't on any roadmap.
          </p>
          
          <p className="text-xl md:text-2xl font-semibold text-white mb-8">
            They exist because of your ingenuity and your dialogue with AI.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ffffff] hover:text-black transition-colors"
          >
            Join the Vanguard
          </button>
        </div>
      </section>

      {/* Bottom Section with Leaders & Jurors */}
      <section 
        className="relative pt-12 px-4"
        style={{
          backgroundImage: 'url(/gradient_bottom.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-8xl mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* For Leaders & Jurors */}
            <div 
              className="text-center md:text-center p-8 rounded-[20px]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(200px)'
              }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Excellence Recognizes Excellence
              </h3>
              <p className="text-white mb-8 leading-relaxed">
                Want to shape the future? We are assembling our inaugural jury of industry leaders.
              </p>
                             <a 
                 href="mailto:info@vibecodingaward.com?subject=Juror%20Application%20-%20Industry%20Leader%20Interest&body=Hello%20Vibe%20Coding%20Award%20Team%2C%0A%0AI%20am%20interested%20in%20becoming%20a%20juror%20for%20the%20inaugural%20Vibe%20Coding%20Award.%0A%0AAbout%20me%3A%0A-%20Name%3A%20%5BYour%20Name%5D%0A-%20Company%2FOrganization%3A%20%5BYour%20Company%5D%0A-%20Role%2FTitle%3A%20%5BYour%20Position%5D%0A-%20LinkedIn%3A%20%5BYour%20LinkedIn%20Profile%5D%0A-%20Years%20of%20experience%20in%20tech%2Fcreative%20industries%3A%20%5BYears%5D%0A%0AExpertise%20areas%20%28please%20select%20relevant%29%3A%0A%E2%98%90%20Web%20Development%0A%E2%98%90%20Mobile%20Apps%0A%E2%98%90%20Game%20Development%0A%E2%98%90%20AI%2FML%0A%E2%98%90%20Design%2FUX%0A%E2%98%90%20Creative%20Technology%0A%E2%98%90%20Other%3A%20%5BSpecify%5D%0A%0AWhy%20I%20want%20to%20be%20a%20juror%3A%0A%5BPlease%20share%20your%20motivation%20and%20what%20you%20hope%20to%20contribute%20to%20the%20award%5D%0A%0AAvailability%20for%20judging%20period%3A%0A%5BPlease%20indicate%20your%20availability%5D%0A%0AThank%20you%20for%20considering%20my%20application.%20I%20look%20forward%20to%20helping%20shape%20the%20future%20of%20AI-native%20creation.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"
                 className="text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ffffff] hover:text-black transition-colors inline-block" 
                 style={{border:'solid 1px', borderColor:'#ffffff'}}
               >
                 Inquire About Judging
               </a>
            </div>

            {/* For Partners & Press */}
            <div 
              className="text-center md:text-center p-8 rounded-[20px]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(200px)'
              }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                For Partners & Press
              </h3>
              <p className="text-white mb-8 leading-relaxed">
                Believe in our mission? Partner with us to amplify the next generation of talent.
              </p>
                             <a 
                 href="mailto:info@vibecodingaward.com?subject=Partnership%20Inquiry%20-%20Vibe%20Coding%20Award&body=Hello%20Vibe%20Coding%20Award%20Team%2C%0A%0AI%20am%20interested%20in%20exploring%20a%20partnership%20opportunity%20with%20the%20Vibe%20Coding%20Award.%0A%0AOrganization%20Details%3A%0A-%20Company%2FOrganization%3A%20%5BYour%20Organization%5D%0A-%20Contact%20Person%3A%20%5BYour%20Name%5D%0A-%20Role%2FTitle%3A%20%5BYour%20Position%5D%0A-%20Website%3A%20%5BYour%20Website%5D%0A-%20Industry%3A%20%5BYour%20Industry%5D%0A%0APartnership%20Interest%20%28please%20select%20relevant%29%3A%0A%E2%98%90%20Sponsorship%20Opportunities%0A%E2%98%90%20Media%20Partnership%0A%E2%98%90%20Technology%20Partnership%0A%E2%98%90%20Prize%20Contribution%0A%E2%98%90%20Event%20Collaboration%0A%E2%98%90%20Community%20Support%0A%E2%98%90%20Other%3A%20%5BSpecify%5D%0A%0AWhat%20we%20can%20offer%3A%0A%5BPlease%20describe%20what%20your%20organization%20can%20bring%20to%20the%20partnership%5D%0A%0AWhat%20we%20hope%20to%20achieve%3A%0A%5BPlease%20share%20your%20goals%20and%20expectations%20from%20this%20partnership%5D%0A%0AProposed%20timeline%3A%0A%5BWhen%20would%20you%20like%20to%20start%20this%20partnership%3F%5D%0A%0AAdditional%20information%3A%0A%5BAny%20other%20relevant%20details%20or%20questions%5D%0A%0AThank%20you%20for%20your%20time.%20We%20believe%20in%20the%20power%20of%20collaboration%20to%20amplify%20the%20next%20generation%20of%20AI-native%20creators.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"
                 className="text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ffffff] hover:text-black transition-colors inline-block" 
                 style={{border:'solid 1px', borderColor:'#ffffff'}}
               >
                 Discuss Partnership
               </a>
            </div>
          </div>
        </div>
              {/* Footer */}
      <footer className="pb-12 pt-20 px-4" style={{
                backgroundColor: 'rgba(255, 255, 255, 0)',}}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <img src="/Vibe Coding Award Logo.svg" alt="Vibe Coding Award" className="h-16 w-auto mr-4" />
          </div>
          
          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-400">Join the conversation on</span>
            <a href="https://www.linkedin.com/company/vibe-coding-award/" className="text-sm text-white hover:text-gray-300 underline">
              LinkedIn
            </a>
            <a href="mailto:info@vibecodingaward.com" className="text-sm text-white hover:text-gray-300 underline">
              Contact us
            </a>
          </div>
        </div>
      </footer>
      </section>



      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-black">Join the Vanguard</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                  Role (optional)
                </label>
                <input
                  type="text"
                  id="profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="e.g., designer, developer, dreamer..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-50"
                >
                {isSubmitting ? 'Joining...' : 'Join the Vanguard'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomePageWithToast() {
  return (
    <ToastProvider>
      <HomePage />
    </ToastProvider>
  );
} 