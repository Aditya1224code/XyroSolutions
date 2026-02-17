import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { Search, PenTool, Rocket } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  'Discover': Search,
  'Design': PenTool,
  'Deliver': Rocket,
};

export default function ProcessSection() {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  return (
    <section 
      id="process"
      ref={sectionRef}
      className="section-pinned bg-off-white relative overflow-hidden"
    >
      {/* Diagonal Hatch Band */}
      <div 
        className={`absolute left-[46vw] top-0 w-[8vw] h-full z-0 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
        style={{ 
          transitionDelay: '200ms',
          background: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 16px)',
          transformOrigin: 'top'
        }}
      />

      {/* Decorative Elements */}
      <div 
        className={`decor-circle bg-lime w-28 h-28 md:w-36 md:h-36 absolute left-[44%] top-[6%] z-[1] transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '400ms' }}
      />
      <div 
        className={`decor-ring border-dark w-20 h-20 md:w-28 md:h-28 absolute right-[10%] top-[68%] z-[3] transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '500ms' }}
      />
      <div 
        className={`absolute right-[4%] top-[10%] z-[4] transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '600ms' }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <path d="M16 0V32M0 16H32" stroke="#111111" strokeWidth="3"/>
        </svg>
      </div>

      {/* Left Content */}
      <div className="absolute left-[4vw] md:left-[6vw] top-[12vh] md:top-[18vh] w-[88vw] md:w-[40vw] z-[5]">
        {/* Headline */}
        <h2 
          className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-dark uppercase mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {content.process.headline}
        </h2>

        {/* Body */}
        <p 
          className={`text-base md:text-lg text-gray-custom mb-8 max-w-md transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {content.process.body}
        </p>
      </div>

      {/* Right Photo */}
      <div 
        className={`absolute right-[4vw] md:right-[6vw] top-[8vh] md:top-[10vh] w-[42vw] md:w-[42vw] h-[40vh] md:h-[80vh] z-[2] overflow-hidden transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`}
        style={{ transitionDelay: '300ms' }}
      >
        <img
          src="/process_workspace_right.jpg"
          alt="Design process"
          className="w-full h-full object-cover img-mono"
        />
      </div>

      {/* Step Cards */}
      <div 
        className={`absolute left-[4vw] md:left-[40vw] right-[4vw] md:right-[6vw] bottom-[8vh] md:bottom-[10vh] z-[6] transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.process.steps.map((step, index) => {
            const Icon = iconMap[step.title] || Search;
            return (
              <div 
                key={index}
                className="bg-dark text-white p-6 rounded-xl card-hover"
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-lime text-sm">{step.number}</span>
                  <Icon size={24} className="text-lime" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/70">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
