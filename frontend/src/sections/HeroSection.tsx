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
    <section className="bg-off-white x-pattern relative overflow-hidden min-h-screen md:min-h-screen">
      {/* Decorative Elements - Hidden on mobile */}
      <div 
        className={`decor-circle bg-lime w-20 h-20 md:w-40 md:h-40 absolute right-4 top-20 md:left-[48%] md:top-[16%] z-0 transition-all duration-1000 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '600ms' }}
      />
      <div 
        className={`decor-ring border-dark w-16 h-16 md:w-36 md:h-36 absolute left-4 bottom-24 md:left-[44%] md:top-[68%] z-10 transition-all duration-1000 hidden md:block ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '700ms' }}
      />
      <div 
        className={`absolute left-4 top-4 md:left-[6%] md:top-[6%] z-10 transition-all duration-1000 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '800ms' }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="md:w-8 md:h-8">
          <path d="M16 0V32M0 16H32" stroke="#111111" strokeWidth="3"/>
        </svg>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Mobile Content */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 z-[5]">
          <p 
            className={`font-mono text-xs tracking-[0.12em] text-gray-custom mb-3 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {content.hero.microLabel}
          </p>

          <h1 
            className={`font-display font-bold text-3xl sm:text-4xl leading-[0.95] tracking-tight text-dark uppercase mb-4 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {content.hero.headline.split(' / ').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>

          <p 
            className={`text-sm text-gray-custom mb-6 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            {content.hero.subheadline}
          </p>

          <button 
            onClick={scrollToWork}
            className={`btn-primary inline-flex items-center gap-2 self-start transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {content.hero.cta}
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Images - Side by side */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-8">
          <div 
            className={`h-48 overflow-hidden rounded-lg transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <img
              src="https://res.cloudinary.com/dr4w6ordx/image/upload/v1773202634/group-photo.png"
              alt="Our team"
              className="w-full h-full object-cover img-mono"
            />
          </div>
          <div
            className={`h-48 overflow-hidden rounded-lg transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <img
              src="https://res.cloudinary.com/dr4w6ordx/image/upload/v1773597157/istockphoto-1393912474-612x612_fdxk5q.jpg"
              alt="Team member"
              className="w-full h-full object-cover img-mono"
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout - Original absolute positioning */}
      <div className="hidden md:block min-h-screen relative">
        {/* Left Photo Card */}
        <div 
          className={`absolute left-[6vw] top-[10vh] w-[34vw] h-[80vh] z-[2] overflow-hidden transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <img
            src="https://res.cloudinary.com/dr4w6ordx/image/upload/v1773202634/group-photo.png"
            alt="Our team"
            className="w-full h-full object-cover img-mono"
          />
        </div>

        {/* Right Photo Card */}
        <div
          className={`absolute right-[6vw] top-[12vh] w-[38vw] h-[76vh] z-[2] overflow-hidden transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <img
            src="https://res.cloudinary.com/dr4w6ordx/image/upload/v1773596421/f48bf7a6-fd0e-4e29-89fb-5d425336f46b_ukczim.png"
            alt="Team member at monument"
            className="w-full h-full object-cover img-mono"
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-[6vw] z-[5] pointer-events-none">
          <div className="max-w-4xl">
            <p 
              className={`font-mono text-xs tracking-[0.12em] text-gray-custom mb-4 transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {content.hero.microLabel}
            </p>

            <h1 
              className={`font-display font-bold text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight text-dark uppercase mb-6 transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {content.hero.headline.split(' / ').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>

            <p 
              className={`text-lg text-gray-custom max-w-md mb-8 transition-all duration-700 ${
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
      </div>
    </section>
  );
}
