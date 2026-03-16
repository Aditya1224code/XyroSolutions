import { useContent } from '../hooks/useContent';
import { ArrowRight } from 'lucide-react';

const heroImages = {
  primary: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773202634/group-photo.png',
  secondary: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773596421/f48bf7a6-fd0e-4e29-89fb-5d425336f46b_ukczim.png',
} as const;

export default function HeroSection() {
  const { content } = useContent();
  const loaded = true;

  const scrollToWork = () => {
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-off-white x-pattern relative overflow-hidden min-h-screen md:min-h-screen">
      {/* Decorative Elements - Show on all devices */}
      <div
        className={`decor-circle bg-lime w-20 h-20 lg:w-40 lg:h-40 absolute left-[48%] top-[16%] z-0 transition-all duration-1000 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '600ms' }}
      />
      <div
        className={`decor-ring border-dark w-16 h-16 lg:w-36 lg:h-36 absolute left-[44%] top-[68%] z-10 transition-all duration-1000 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '700ms' }}
      />
      <div
        className={`absolute left-[6%] top-[6%] z-10 transition-all duration-1000 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '800ms' }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="lg:w-8 lg:h-8">
          <path d="M16 0V32M0 16H32" stroke="#111111" strokeWidth="3"/>
        </svg>
      </div>

      {/* Desktop Layout - Show on ALL devices */}
      <div className="min-h-screen relative">
        {/* Left Photo Card */}
        <div
          className={`absolute left-[2vw] md:left-[6vw] top-[10vh] w-[40vw] md:w-[34vw] h-[60vh] md:h-[80vh] z-[2] overflow-hidden transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <img
            src={heroImages.primary}
            alt="Our team"
            className="w-full h-full object-cover img-mono"
          />
        </div>

        {/* Right Photo Card */}
        <div
          className={`absolute right-[2vw] md:right-[6vw] top-[12vh] w-[44vw] md:w-[38vw] h-[56vh] md:h-[76vh] z-[2] overflow-hidden transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <img
            src={heroImages.secondary}
            alt="Team member at monument"
            className="w-full h-full object-cover img-mono"
          />
        </div>

        {/* Content Overlay with text box background */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-[6vw] z-[5] pointer-events-none">
          <div className="max-w-4xl">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-2xl border border-gray-200">
              <p
                className={`font-mono text-xs tracking-[0.12em] text-gray-600 mb-4 transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                {content.hero.microLabel}
              </p>

              <h1
                className={`font-display font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight text-dark uppercase mb-6 transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                {content.hero.headline.split(' / ').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>

              <p
                className={`text-sm md:text-lg text-gray-700 max-w-md mb-6 md:mb-8 transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                {content.hero.subheadline}
              </p>

              <button
                onClick={scrollToWork}
                className={`btn-primary inline-flex items-center gap-2 pointer-events-auto transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                {content.hero.cta}
                <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="w-6 h-10 border-2 border-dark rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-dark rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
