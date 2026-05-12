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
      <div
        className={`absolute left-[6%] top-[4%] md:top-[6%] z-10 transition-all duration-800 hover:scale-125 hover:rotate-45 ${
          loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="md:w-6 md:h-6 lg:w-8 lg:h-8">
          <path
            d="M16 0V32M0 16H32"
            stroke={textFloating ? "#ffffff" : "#111111"}
            strokeWidth="3"
            className="transition-all duration-1000"
            style={{
              filter: textFloating ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.7))' : 'none'
            }}
          />
        </svg>
      </div>

      {/* Desktop Layout - Show on ALL devices */}
      <div className="min-h-screen relative">
        {/* Mobile Layout: Single image at top, content below */}
        <div className="md:hidden flex flex-col h-screen">
          {/* Mobile Image - takes top 45% */}
          <div
            className={`relative w-full h-[45vh] overflow-hidden transition-all duration-800 ${
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={heroImages.primary}
              alt="Our team"
              className="w-full h-full object-cover img-mono"
            />
            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F6F6F2] to-transparent" />
          </div>

          {/* Mobile Content */}
          <div className="flex-1 flex flex-col justify-center px-4 -mt-8">
            <div
              className={`rounded-xl p-4 transition-all duration-2000 ${
                loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } ${
                boxVisible
                  ? 'bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200 dark:bg-[#111827]/95 dark:border-white/10 dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]'
                  : 'bg-transparent shadow-none border-transparent'
              }`}
            >
              <p
                className={`font-mono text-[10px] tracking-[0.12em] mb-2 transition-all duration-600 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                } ${textFloating ? 'text-dark' : 'text-gray-600 dark:text-slate-300'}`}
              >
                {content.hero.microLabel}
              </p>

              <h1
                className={`font-display font-bold text-3xl leading-[0.95] tracking-tight uppercase mb-3 transition-all duration-1000 text-dark`}
              >
                {content.hero.headline.split(' / ').map((line, i) => (
                  <span
                    key={i}
                    className={`block transition-all duration-600 ${
                      loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${200 + (i * 100)}ms` }}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              <p
                className={`text-sm text-gray-700 dark:text-slate-300 mb-4 transition-all duration-600 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                {content.hero.subheadline}
              </p>

              <button
                onClick={scrollToWork}
                className={`group btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5 transition-all duration-600 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                <span>{content.hero.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Mobile Scroll Indicator */}
          <div
            className={`pb-4 flex justify-center transition-all duration-800 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '900ms' }}
            onClick={scrollToWork}
          >
            <div className="w-5 h-8 border-2 border-dark dark:border-[#F8FAFC] rounded-full flex justify-center pt-1.5">
              <div className="w-0.5 h-1.5 bg-dark dark:bg-[#F8FAFC] rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Desktop: Left Photo Card */}
        <div
          className={`hidden md:block absolute left-[6vw] top-[10vh] w-[34vw] h-[80vh] z-[2] overflow-hidden transition-all duration-800 hover:scale-105 hover:rotate-1 hover:shadow-2xl ${
            loaded ? 'opacity-100 translate-x-0 blur-0 scale-100' : 'opacity-0 -translate-x-32 blur-md scale-95'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <img
            src={heroImages.primary}
            alt="Our team"
            className="w-full h-full object-cover img-mono transition-all duration-700 hover:scale-110 hover:brightness-110"
          />
        </div>

        {/* Desktop: Right Photo Card */}
        <div
          className={`hidden md:block absolute right-[6vw] top-[12vh] w-[38vw] h-[76vh] z-[2] overflow-hidden transition-all duration-800 hover:scale-105 hover:-rotate-1 hover:shadow-2xl ${
            loaded ? 'opacity-100 translate-x-0 blur-0 scale-100' : 'opacity-0 translate-x-32 blur-md scale-95'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <img
            src={heroImages.secondary}
            alt="Team member at monument"
            className="w-full h-full object-cover img-mono transition-all duration-700 hover:scale-110 hover:brightness-110"
          />
        </div>

        {/* Desktop Content Overlay */}
        <div className="hidden md:flex absolute inset-0 flex-col justify-center px-[6vw] z-[5] pointer-events-none">
          <div className="max-w-4xl">
            <div
              className={`rounded-2xl p-8 transition-all duration-2000 ${
                loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'
              } ${
                boxVisible
                  ? 'bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200 dark:bg-[#111827]/95 dark:border-white/10 dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]'
                  : 'bg-transparent backdrop-blur-none shadow-none border-transparent'
              }`}
              style={{
                transitionDelay: '150ms',
                animation: loaded ? 'breathe 8s ease-in-out infinite' : 'none'
              }}
            >
              <p
                className={`font-mono text-xs tracking-[0.12em] mb-4 transition-all duration-600 ${
                  loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                } ${
                  textFloating
                    ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                    : 'text-gray-600 dark:text-slate-300'
                }`}
                style={{
                  transitionDelay: '50ms',
                  textShadow: textFloating ? '2px 2px 4px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.5)' : 'none'
                }}
              >
                <span className="inline-block">
                  {content.hero.microLabel}
                </span>
              </p>

              <h1
                className={`font-display font-bold text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight uppercase mb-6 transition-all duration-1000 ${
                  textFloating
                    ? 'text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]'
                    : 'text-dark dark:text-[#F8FAFC]'
                }`}
                style={{
                  textShadow: textFloating
                    ? '3px 3px 6px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4)'
                    : 'none'
                }}
              >
                {content.hero.headline.split(' / ').map((line, i) => (
                  <span
                    key={i}
                    className={`block overflow-hidden transition-all duration-600 ${
                      loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                    }`}
                    style={{ transitionDelay: `${200 + (i * 100)}ms` }}
                  >
                    <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">
                      {line.split('').map((char, charIndex) => (
                        <span
                          key={charIndex}
                          className={`inline-block transition-all duration-600 ${
                            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                          }`}
                          style={{
                            transitionDelay: `${300 + (i * 150) + (charIndex * 30)}ms`
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </h1>

              <p
                className={`text-lg max-w-md mb-8 overflow-hidden transition-all duration-1000 ${
                  textFloating
                    ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                    : 'text-gray-700 dark:text-slate-300'
                }`}
                style={{
                  textShadow: textFloating ? '2px 2px 4px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.5)' : 'none'
                }}
              >
                {content.hero.subheadline.split(' ').map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`inline-block mr-2 transition-all duration-600 ${
                      loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'
                    }`}
                    style={{ transitionDelay: `${800 + (wordIndex * 80)}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </p>

              <button
                onClick={scrollToWork}
                className={`group btn-primary inline-flex items-center gap-2 pointer-events-auto transition-all duration-600 transform hover:scale-110 active:scale-95 px-6 py-3 ${
                  loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-16 blur-sm'
                } ${
                  textFloating
                    ? 'shadow-2xl shadow-lime/40 hover:shadow-lime/60'
                    : 'hover:shadow-2xl hover:shadow-lime/30'
                }`}
                style={{
                  transitionDelay: '1200ms',
                  filter: textFloating ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none'
                }}
              >
                <span className="transition-all duration-300 group-hover:tracking-wider">
                  {content.hero.cta}
                </span>
                <ArrowRight className="w-[18px] h-[18px] transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Scroll Indicator */}
        <div
          className={`hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-800 hover:scale-125 cursor-pointer ${
            loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
          style={{ transitionDelay: '1400ms' }}
          onClick={scrollToWork}
        >
          <div className="w-6 h-10 border-2 border-dark dark:border-[#F8FAFC] rounded-full flex justify-center pt-2 transition-all duration-300 hover:border-lime hover:shadow-lg">
            <div className="w-1 h-2 bg-dark dark:bg-[#F8FAFC] rounded-full animate-bounce transition-all duration-300 hover:bg-lime" />
          </div>
        </div>
      </div>
    </section>
  );
}
