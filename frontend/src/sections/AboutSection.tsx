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
      className="bg-off-white dark:bg-[#050608] relative overflow-hidden"
    >
      {/* Mobile Layout */}
      <div className="md:hidden py-16 px-6">
        {/* Decorative Circle - Mobile */}
        <div 
          className={`decor-circle bg-lime w-20 h-20 absolute left-4 top-12 z-0 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        />

        {/* Content */}
        <div className="relative z-[5] mb-8">
          <p 
            className={`font-mono text-xs tracking-[0.12em] text-gray-custom dark:text-slate-300 mb-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {content.about.eyebrow}
          </p>

          <h2 
            className={`font-display font-bold text-3xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {content.about.headline}
          </h2>

          <p 
            className={`text-sm text-gray-custom dark:text-slate-300 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            {content.about.body}
          </p>

          <p 
            className={`font-display font-bold text-xl text-dark dark:text-[#F8FAFC] uppercase tracking-tight mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {content.about.statement}
          </p>

          <button 
            onClick={scrollToStudio}
            className={`inline-flex items-center gap-2 font-medium text-dark dark:text-[#F8FAFC] hover:text-lime transition-all duration-700 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            {content.about.cta}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Image */}
        <div 
          className={`w-full h-64 rounded-lg overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <img
            src="https://res.cloudinary.com/dr4w6ordx/image/upload/v1779460343/ChatGPT_Image_May_22_2026_07_43_23_PM_gvldqm.png"
            alt="Team member"
            className="w-full h-full object-cover img-mono"
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block min-h-screen relative">
        {/* Decorative Elements */}
        <div 
          className={`decor-circle bg-lime w-56 h-56 absolute left-[2vw] top-[30vh] z-0 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        />
        <div 
          className={`decor-ring border-dark w-28 h-28 absolute right-[14vw] top-[68vh] z-[3] transition-all duration-1000 ${
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
          className={`absolute left-[6vw] top-[10vh] w-[34vw] h-[80vh] z-[2] overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <img
            src="https://res.cloudinary.com/dr4w6ordx/image/upload/v1779460343/ChatGPT_Image_May_22_2026_07_43_23_PM_gvldqm.png"
            alt="Team member"
            className="w-full h-full object-cover img-mono"
          />
        </div>

        {/* Right Content */}
        <div className="absolute right-[8vw] top-[18vh] w-[40vw] z-[5]">
          <p 
            className={`font-mono text-xs tracking-[0.12em] text-gray-custom dark:text-slate-300 mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {content.about.eyebrow}
          </p>

          <h2 
            className={`font-display font-bold text-5xl lg:text-6xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {content.about.headline}
          </h2>

          <p 
            className={`text-lg text-gray-custom dark:text-slate-300 mb-8 max-w-lg transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            {content.about.body}
          </p>

          <p 
            className={`font-display font-bold text-2xl md:text-3xl text-dark dark:text-[#F8FAFC] uppercase tracking-tight mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {content.about.statement}
          </p>

          <button 
            onClick={scrollToStudio}
            className={`inline-flex items-center gap-2 font-medium text-dark dark:text-[#F8FAFC] hover:text-lime transition-all duration-700 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            {content.about.cta}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
