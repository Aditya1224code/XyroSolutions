import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  const scrollToStudio = () => {
    const element = document.querySelector('#process');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="section-pinned bg-off-white relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div 
        className={`decor-circle bg-lime w-40 h-40 md:w-56 md:h-56 absolute left-[2vw] top-[30vh] z-0 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '300ms' }}
      />
      <div 
        className={`decor-ring border-dark w-20 h-20 md:w-28 md:h-28 absolute right-[14vw] top-[68vh] z-[3] transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '400ms' }}
      />
      <div 
        className={`absolute left-[44%] top-[8%] z-[4] transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path d="M16 0V32M0 16H32" stroke="#111111" strokeWidth="3"/>
        </svg>
      </div>

      {/* Left Portrait Photo */}
      <div 
        className={`absolute left-[4vw] md:left-[6vw] top-[8vh] md:top-[10vh] w-[42vw] md:w-[34vw] h-[40vh] md:h-[80vh] z-[2] overflow-hidden transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        <img
          src="/about_portrait_left.jpg"
          alt="Team member"
          className="w-full h-full object-cover img-mono"
        />
      </div>

      {/* Right Content */}
      <div className="absolute right-[4vw] md:right-[8vw] top-[12vh] md:top-[18vh] w-[88vw] md:w-[40vw] z-[5]">
        {/* Eyebrow */}
        <p 
          className={`font-mono text-xs tracking-[0.12em] text-gray-custom mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {content.about.eyebrow}
        </p>

        {/* Headline */}
        <h2 
          className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-dark mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {content.about.headline}
        </h2>

        {/* Body */}
        <p 
          className={`text-base md:text-lg text-gray-custom mb-8 max-w-lg transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {content.about.body}
        </p>

        {/* Statement */}
        <p 
          className={`font-display font-bold text-xl sm:text-2xl md:text-3xl text-dark uppercase tracking-tight mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {content.about.statement}
        </p>

        {/* CTA */}
        <button 
          onClick={scrollToStudio}
          className={`inline-flex items-center gap-2 font-medium text-dark hover:text-lime transition-all duration-700 group ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          {content.about.cta}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
