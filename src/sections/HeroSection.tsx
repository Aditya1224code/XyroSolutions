import { useContent } from '../hooks/useContent';
import { ArrowRight } from 'lucide-react';

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
    <section className="section-pinned bg-off-white x-pattern relative overflow-hidden">
      {/* Decorative Elements */}
      <div 
        className={`decor-circle bg-lime w-32 h-32 md:w-40 md:h-40 absolute left-[48%] top-[16%] z-0 transition-all duration-1000 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '600ms' }}
      />
      <div 
        className={`decor-ring border-dark w-24 h-24 md:w-36 md:h-36 absolute left-[44%] top-[68%] z-10 transition-all duration-1000 ${
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
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 0V32M0 16H32" stroke="#111111" strokeWidth="3"/>
        </svg>
      </div>

      {/* Left Photo Card */}
      <div 
        className={`absolute left-[4vw] md:left-[6vw] top-[8vh] md:top-[10vh] w-[42vw] md:w-[34vw] h-[40vh] md:h-[80vh] z-[2] overflow-hidden transition-all duration-1000 ${
          loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        <img
          src="/hero_portrait_left.jpg"
          alt="Creative professional"
          className="w-full h-full object-cover img-mono"
        />
      </div>

      {/* Right Photo Card */}
      <div 
        className={`absolute right-[4vw] md:right-[6vw] top-[8vh] md:top-[12vh] w-[42vw] md:w-[38vw] h-[40vh] md:h-[76vh] z-[2] overflow-hidden transition-all duration-1000 ${
          loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`}
        style={{ transitionDelay: '300ms' }}
      >
        <img
          src="/hero_workspace_right.jpg"
          alt="Workspace"
          className="w-full h-full object-cover img-mono"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center px-[6vw] z-[5] pointer-events-none">
        <div className="max-w-4xl">
          {/* Micro Label */}
          <p 
            className={`font-mono text-xs tracking-[0.12em] text-gray-custom mb-4 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {content.hero.microLabel}
          </p>

          {/* Headline */}
          <h1 
            className={`font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight text-dark uppercase mb-6 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {content.hero.headline.split(' / ').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-base md:text-lg text-gray-custom max-w-md mb-8 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            {content.hero.subheadline}
          </p>

          {/* CTA Button */}
          <button 
            onClick={scrollToWork}
            className={`btn-primary inline-flex items-center gap-2 pointer-events-auto transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {content.hero.cta}
            <ArrowRight size={18} />
          </button>
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
    </section>
  );
}
