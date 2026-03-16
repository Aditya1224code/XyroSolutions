import { useContent } from '../hooks/useContent';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const heroImages = {
  primary: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773202634/group-photo.png',
  secondary: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773596421/f48bf7a6-fd0e-4e29-89fb-5d425336f46b_ukczim.png',
} as const;

export default function HeroSection() {
  const { content } = useContent();
  const [loaded, setLoaded] = useState(true);
  const [boxVisible, setBoxVisible] = useState(true);
  const [textFloating, setTextFloating] = useState(false);

  useEffect(() => {
    // Start box disappearing animation after 2 seconds (was 4)
    const timer1 = setTimeout(() => {
      setBoxVisible(false);
    }, 2000);

    // Make text start floating after 2.5 seconds (was 5)
    const timer2 = setTimeout(() => {
      setTextFloating(true);
    }, 2500);

    return () => {
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
    <section className="bg-off-white x-pattern relative overflow-hidden min-h-screen md:min-h-screen">
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
          <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-lime rounded-full" style={{ animation: 'floatSide 6s ease-in-out infinite, sparkle 3s ease-in-out infinite' }} />
          <div className="absolute top-[70%] right-[20%] w-1 h-1 bg-white rounded-full" style={{ animation: 'floatSide 4s ease-in-out infinite reverse, sparkle 2s ease-in-out infinite' }} />
          <div className="absolute top-[40%] right-[10%] w-1.5 h-1.5 bg-lime rounded-full" style={{ animation: 'floatSide 7s ease-in-out infinite, sparkle 2.5s ease-in-out infinite 0.5s' }} />
          <div className="absolute top-[60%] left-[25%] w-1 h-1 bg-white rounded-full" style={{ animation: 'floatSide 5s ease-in-out infinite reverse, sparkle 3.5s ease-in-out infinite 1s' }} />
          <div className="absolute top-[30%] left-[70%] w-1 h-1 bg-lime rounded-full" style={{ animation: 'floatSide 5.5s ease-in-out infinite, sparkle 2.8s ease-in-out infinite 1.5s' }} />
          <div className="absolute top-[80%] left-[40%] w-1.5 h-1.5 bg-white rounded-full" style={{ animation: 'floatSide 6.5s ease-in-out infinite reverse, sparkle 3.2s ease-in-out infinite 0.7s' }} />
        </>
      )}
      {/* Decorative Elements - Show on all devices */}
      <div
        className={`decor-circle w-20 h-20 lg:w-40 lg:h-40 absolute left-[48%] top-[16%] z-0 transition-all duration-800 ${
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
        className={`decor-ring w-16 h-16 lg:w-36 lg:h-36 absolute left-[44%] top-[68%] z-10 transition-all duration-800 ${
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
        className={`absolute left-[6%] top-[6%] z-10 transition-all duration-800 hover:scale-125 hover:rotate-45 ${
          loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="lg:w-8 lg:h-8">
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
        {/* Left Photo Card */}
        <div
          className={`absolute left-[2vw] md:left-[6vw] top-[10vh] w-[40vw] md:w-[34vw] h-[60vh] md:h-[80vh] z-[2] overflow-hidden transition-all duration-800 hover:scale-105 hover:rotate-1 hover:shadow-2xl ${
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

        {/* Right Photo Card */}
        <div
          className={`absolute right-[2vw] md:right-[6vw] top-[12vh] w-[44vw] md:w-[38vw] h-[56vh] md:h-[76vh] z-[2] overflow-hidden transition-all duration-800 hover:scale-105 hover:-rotate-1 hover:shadow-2xl ${
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

        {/* Content Overlay with disappearing text box background */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-[6vw] z-[5] pointer-events-none">
          <div className="max-w-4xl">
            <div
              className={`rounded-2xl p-4 md:p-8 transition-all duration-2000 ${
                loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'
              } ${
                boxVisible
                  ? 'bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200'
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
                    : 'text-gray-600'
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
                className={`font-display font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight uppercase mb-6 transition-all duration-1000 ${
                  textFloating
                    ? 'text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]'
                    : 'text-dark'
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
                className={`text-sm md:text-lg max-w-md mb-6 md:mb-8 overflow-hidden transition-all duration-1000 ${
                  textFloating
                    ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                    : 'text-gray-700'
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
                className={`group btn-primary inline-flex items-center gap-2 pointer-events-auto transition-all duration-600 transform hover:scale-110 active:scale-95 ${
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
                <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px] transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-800 hover:scale-125 cursor-pointer ${
            loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
          style={{ transitionDelay: '1400ms' }}
          onClick={scrollToWork}
        >
          <div className="w-6 h-10 border-2 border-dark rounded-full flex justify-center pt-2 transition-all duration-300 hover:border-lime hover:shadow-lg">
            <div className="w-1 h-2 bg-dark rounded-full animate-bounce transition-all duration-300 hover:bg-lime" />
          </div>
        </div>
      </div>
    </section>
  );
}
