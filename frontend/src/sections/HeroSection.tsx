import { useContent } from '../hooks/useContent';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const heroImages = {
  primary: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773202634/group-photo.png',
  secondary: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773596421/f48bf7a6-fd0e-4e29-89fb-5d425336f46b_ukczim.png',
} as const;

export default function HeroSection() {
  const { content } = useContent();
  const [loaded, setLoaded] = useState(false);
  const [boxVisible, setBoxVisible] = useState(true);
  const [textFloating, setTextFloating] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after a tiny delay
    const loadTimer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    // Start box disappearing animation after 2 seconds
    const timer1 = setTimeout(() => {
      setBoxVisible(false);
    }, 2000);

    // Make text start floating after 2.5 seconds
    const timer2 = setTimeout(() => {
      setTextFloating(true);
    }, 2500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToWork = () => {
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderHeadline = (headline: string) => {
    const match = headline.match(/\bbrands?\b/i);

    if (!match || match.index === undefined) {
      return headline;
    }

    const start = match.index;
    const end = start + match[0].length;

    return (
      <>
        {headline.slice(0, start)}
        <span className="text-cyan-400">{headline.slice(start, end)}</span>
        {headline.slice(end)}
      </>
    );
  };

  return (
    <section className="bg-off-white dark:bg-[#050608] x-pattern relative overflow-hidden min-h-screen md:min-h-screen">
      {/* Enhanced animated gradient overlay that becomes more prominent when text floats */}
      <div className={`absolute inset-0 transition-all duration-1500 ${textFloating ? 'opacity-20' : 'opacity-10'}`}>
        <div
          className="absolute inset-0 transition-all duration-[10s] ease-in-out"
          style={{
            background: loaded
              ? textFloating
                ? 'radial-gradient(circle at 20% 30%, #B8FF3D33 0%, transparent 60%), radial-gradient(circle at 80% 70%, #B8FF3D22 0%, transparent 60%), radial-gradient(circle at 50% 50%, #00000022 0%, transparent 70%)'
                : 'radial-gradient(circle at 20% 30%, #B8FF3D22 0%, transparent 50%), radial-gradient(circle at 80% 70%, #B8FF3D11 0%, transparent 50%)'
              : 'none'
          }}
        />
      </div>

      {/* Floating particles that appear when text becomes floating */}
      {textFloating && (
        <>
          {/* Only show 2 particles on mobile, all 6 on larger screens */}
          <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-lime rounded-full" style={{ animation: 'floatSide 6s ease-in-out infinite, sparkle 3s ease-in-out infinite' }} />
          <div className="hidden md:block absolute top-[70%] right-[20%] w-1 h-1 bg-white rounded-full" style={{ animation: 'floatSide 4s ease-in-out infinite reverse, sparkle 2s ease-in-out infinite' }} />
          <div className="absolute top-[40%] right-[10%] w-1.5 h-1.5 bg-lime rounded-full" style={{ animation: 'floatSide 7s ease-in-out infinite, sparkle 2.5s ease-in-out infinite 0.5s' }} />
          <div className="hidden md:block absolute top-[60%] left-[25%] w-1 h-1 bg-white rounded-full" style={{ animation: 'floatSide 5s ease-in-out infinite reverse, sparkle 3.5s ease-in-out infinite 1s' }} />
          <div className="hidden md:block absolute top-[30%] left-[70%] w-1 h-1 bg-lime rounded-full" style={{ animation: 'floatSide 5.5s ease-in-out infinite, sparkle 2.8s ease-in-out infinite 1.5s' }} />
          <div className="hidden md:block absolute top-[80%] left-[40%] w-1.5 h-1.5 bg-white rounded-full" style={{ animation: 'floatSide 6.5s ease-in-out infinite reverse, sparkle 3.2s ease-in-out infinite 0.7s' }} />
        </>
      )}
      {/* Decorative Elements - Show on all devices */}
      <div
        className={`decor-circle w-12 h-12 md:w-20 md:h-20 lg:w-40 lg:h-40 absolute left-[75%] md:left-[48%] top-[8%] md:top-[16%] z-0 transition-all duration-800 ${
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-0 blur-sm'
        } ${
          textFloating ? 'bg-gradient-to-br from-lime via-yellow-300 to-lime shadow-lime/50 shadow-2xl' : 'bg-lime'
        }`}
        style={{
          transitionDelay: '300ms',
          animation: loaded ? 'float 6s ease-in-out infinite' : 'none'
        }}
      />
      <div
        className={`decor-ring w-10 h-10 md:w-16 md:h-16 lg:w-36 lg:h-36 absolute left-[5%] md:left-[44%] top-[85%] md:top-[68%] z-10 transition-all duration-800 ${
          loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
        } ${
          textFloating ? 'border-white shadow-white/30 shadow-lg' : 'border-dark'
        }`}
        style={{
          transitionDelay: '400ms',
          animation: loaded ? 'spin-slow 20s linear infinite' : 'none'
        }}
      />

      {/* Desktop Layout - Show on ALL devices */}
      <div className="min-h-screen relative flex flex-col">
        {/* Mobile Layout: Clear stacked version matching desktop style */}
        <div className="md:hidden relative z-10 px-4 pt-20 pb-12">
          <div className="mx-auto w-full">
            <p
              className={`font-mono text-[11px] tracking-[0.14em] mb-3 transition-all duration-600 uppercase text-cyan-600 dark:text-cyan-400 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {content.hero.microLabel}
            </p>

            <h1
              className={`font-display font-bold text-4xl leading-[1.05] tracking-tight mb-4 transition-all duration-800 text-dark dark:text-white ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '280ms' }}
            >
              {renderHeadline(content.hero.headline)}
            </h1>

            <p
              className={`text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-6 transition-all duration-800 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '360ms' }}
            >
              {content.hero.subheadline}
            </p>

            <button
              onClick={scrollToWork}
              className={`group btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '440ms' }}
            >
              <span>{content.hero.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div
              className={`relative mt-10 w-full h-96 transition-all duration-900 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '520ms' }}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-200 to-cyan-100 opacity-40 blur-3xl" />

              <div
                className="absolute right-0 top-0 w-72 h-72 rounded-3xl overflow-hidden shadow-2xl z-[3] border-4 border-cyan-400"
                style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%)' }}
              >
                <img
                  src={heroImages.secondary}
                  alt="Team member at monument"
                  className="w-full h-full object-cover img-mono"
                />
              </div>

              <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-cyan-500 to-teal-400 rounded-tl-3xl z-[1]" />

              <div className="absolute left-0 bottom-0 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl z-[4] border-4 border-cyan-400">
                <img
                  src={heroImages.primary}
                  alt="Our team"
                  className="w-full h-full object-cover img-mono"
                />
              </div>
            </div>

            <div
              className={`mt-6 flex items-center justify-center gap-2 transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '620ms' }}
              onClick={scrollToWork}
            >
              <div className="w-5 h-8 border-2 border-dark dark:border-gray-400 rounded-full flex justify-center pt-1">
                <div className="w-0.5 h-1.5 bg-dark dark:bg-gray-400 rounded-full animate-bounce" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Scroll down</span>
            </div>
          </div>
        </div>

        {/* Desktop: Left-aligned text + Right-aligned images layout */}
        <div className="hidden md:flex flex-1 items-center justify-between gap-12 px-12 lg:px-16 relative z-10">
          {/* Left: Text Content */}
          <div className="flex-1 max-w-md">
            <p
              className={`font-mono text-xs lg:text-sm tracking-[0.15em] mb-4 transition-all duration-600 ${
                loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              } text-cyan-600 dark:text-cyan-400 uppercase`}
              style={{ transitionDelay: '200ms' }}
            >
              {content.hero.microLabel}
            </p>

            <h1
              className={`font-display font-bold text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight mb-5 transition-all duration-800 text-dark dark:text-white ${
                loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {renderHeadline(content.hero.headline)}
            </h1>

            <p
              className={`text-base lg:text-lg mb-8 leading-relaxed transition-all duration-800 text-gray-700 dark:text-gray-300 ${
                loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {content.hero.subheadline}
            </p>

            <button
              onClick={scrollToWork}
              className={`group btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-600 ${
                loaded ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 -translate-x-8 blur-sm'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <span>{content.hero.cta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Scroll indicator on left */}
            <div
              className={`mt-12 flex items-center gap-2 cursor-pointer transition-all duration-800 ${
                loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '700ms' }}
              onClick={scrollToWork}
            >
              <div className="w-5 h-8 border-2 border-dark dark:border-gray-400 rounded-full flex justify-center pt-1">
                <div className="w-0.5 h-1.5 bg-dark dark:bg-gray-400 rounded-full animate-bounce" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Scroll down</span>
            </div>
          </div>

          {/* Right: Images with decorative elements - matching screenshot exactly */}
          <div className="flex-1 relative h-[75vh] min-w-0 flex items-center justify-end">
            
            {/* Light cyan gradient wave (left background) */}
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-200 to-cyan-100 opacity-40 transition-all duration-800 z-0 blur-3xl ${
                loaded ? 'scale-100 opacity-40' : 'scale-0 opacity-0'
              }`}
              style={{ transitionDelay: '250ms' }}
            />

            {/* Images container */}
            <div className="relative w-full h-full flex items-center justify-end pr-8">
              
              {/* Larger image - Single boy (RIGHT, center-right) */}
              <div
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-lg h-96 rounded-3xl overflow-hidden shadow-2xl transition-all duration-800 z-[3] border-4 border-cyan-400 ${
                  loaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-90'
                }`}
                style={{
                  transitionDelay: '300ms',
                  clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%)',
                }}
              >
                <img
                  src={heroImages.secondary}
                  alt="Team member at monument"
                  className="w-full h-full object-cover img-mono transition-all duration-700 hover:scale-110"
                />
              </div>

              {/* Smaller image - Group photo (BOTTOM LEFT, deeply overlapping) */}
              <div
                className={`absolute left-1/2 bottom-0 -translate-x-1/2 w-56 h-64 rounded-3xl overflow-hidden shadow-2xl transition-all duration-800 z-[4] border-4 border-cyan-400 ${
                  loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <img
                  src={heroImages.primary}
                  alt="Our team"
                  className="w-full h-full object-cover img-mono transition-all duration-700 hover:scale-110"
                />
              </div>

              {/* Solid turquoise shape (bottom right corner) */}
              <div
                className={`absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-cyan-500 to-teal-400 transition-all duration-800 z-[1] rounded-tl-3xl ${
                  loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{ transitionDelay: '500ms' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
