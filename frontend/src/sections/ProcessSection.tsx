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
      className="bg-off-white dark:bg-[#050608] relative overflow-hidden"
    >
      {/* Mobile Layout */}
      <div className="md:hidden py-16 px-6">
        {/* Decorative Circle - Mobile */}
        <div 
          className={`decor-circle bg-lime w-16 h-16 absolute right-4 top-8 z-[1] transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        />

        {/* Content */}
        <div className="relative z-[5] mb-8">
          <h2 
            className={`font-display font-bold text-3xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] uppercase mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {content.process.headline}
          </h2>

          <p 
            className={`text-sm text-gray-custom dark:text-slate-300 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {content.process.body}
          </p>
        </div>

        {/* Mobile Image */}
        <div 
          className={`w-full h-48 mb-8 rounded-lg overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <img
            src="/process_workspace_right.jpg"
            alt="Design process"
            className="w-full h-full object-cover img-mono"
          />
        </div>

        {/* Mobile Step Cards */}
        <div 
          className={`space-y-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {content.process.steps.map((step, index) => {
            const Icon = iconMap[step.title] || Search;
            return (
              <div 
                key={index}
                className="bg-dark text-white p-5 rounded-xl dark:bg-[#111827] dark:border dark:border-white/10 dark:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-lime text-sm">{step.number}</span>
                  <Icon size={20} className="text-lime" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
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

      {/* Desktop Layout */}
      <div className="hidden md:block min-h-screen relative">
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
          className={`decor-circle bg-lime w-36 h-36 absolute left-[44%] top-[6%] z-[1] transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        />
        <div 
          className={`decor-ring border-dark dark:border-white/20 w-28 h-28 absolute right-[10%] top-[68%] z-[3] transition-all duration-1000 ${
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
            <path d="M16 0V32M0 16H32" stroke="#111111" className="dark:stroke-[#F8FAFC]" strokeWidth="3"/>
          </svg>
        </div>

        {/* Left Content */}
        <div className="absolute left-[6vw] top-[18vh] w-[40vw] z-[5]">
          <h2 
            className={`font-display font-bold text-5xl lg:text-6xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] uppercase mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {content.process.headline}
          </h2>

          <p 
            className={`text-lg text-gray-custom dark:text-slate-300 mb-8 max-w-md transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {content.process.body}
          </p>
        </div>

        {/* Right Photo */}
        <div 
          className={`absolute right-[6vw] top-[10vh] w-[42vw] h-[80vh] z-[2] overflow-hidden transition-all duration-1000 ${
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
          className={`absolute left-[40vw] right-[6vw] bottom-[10vh] z-[6] transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="grid grid-cols-3 gap-4">
            {content.process.steps.map((step, index) => {
              const Icon = iconMap[step.title] || Search;
              return (
                <div 
                  key={index}
                  className="bg-dark text-white p-6 rounded-xl card-hover dark:bg-[#111827] dark:border dark:border-white/10 dark:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
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
      </div>
    </section>
  );
}
