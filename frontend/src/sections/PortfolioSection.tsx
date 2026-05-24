import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { ArrowUpRight } from 'lucide-react';

export default function PortfolioSection({ onNavigate }: { onNavigate?: (page: string, category?: string) => void }) {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });
  // showAllProjects removed: CTA button intentionally removed

  return (
    <section 
      id="portfolio"
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
          style={{ transitionDelay: '500ms' }}
        />

        {/* Content */}
        <div className="relative z-[5] mb-8">
          <h2 
            className={`font-display font-bold text-3xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] uppercase mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {content.portfolio.headline}
          </h2>
          <p 
            className={`text-sm text-gray-custom dark:text-slate-300 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {content.portfolio.body}
          </p>
          {/* CTA removed intentionally */}
        </div>

        {/* Mobile Project Cards */}
        <div className="space-y-4">
          {content.portfolio.projects.slice(0, 3).map((project, index) => (
            <div 
              key={index}
              className={`relative h-48 overflow-hidden rounded-xl group cursor-pointer transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover img-mono group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <p className="font-mono text-xs text-white/80 mb-1">{project.subtitle}</p>
                  <h3 className="font-display font-bold text-white text-base">{project.title}</h3>
                </div>
                <ArrowUpRight size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block min-h-screen relative">
        {/* Dot Grid */}
        <div 
          className={`absolute left-[40%] top-[50%] w-[20%] h-[40%] dot-grid z-0 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        />

        {/* Decorative Elements */}
        
        <div 
            className={`decor-ring border-dark dark:border-white/20 w-28 h-28 absolute left-[42%] top-[6%] z-[3] transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        />
        <div 
          className={`absolute right-[4%] top-[42%] z-[4] transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path d="M16 0V32M0 16H32" stroke="#111111" className="dark:stroke-[#F8FAFC]" strokeWidth="3"/>
          </svg>
        </div>

        {/* Small decorative green circle on right side (subtle) */}
        <div
          className={`absolute hidden md:block rounded-full transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ right: '6%', top: '42%', zIndex: 2, width: '56px', height: '56px', backgroundColor: 'rgba(173,255,85,0.22)', transitionDelay: '720ms' }}
        />

        {/* Desktop: grid layout matching requested arrangement
            Grid: 2 columns x 2 rows
            - [0,0] first image (top-left)
            - [0,1] second image (bottom-left)
            - [1,0] headline (top-right)
            - [1,1] third image (bottom-right)
        */}
        <div className={`hidden md:grid md:grid-cols-2 gap-4 px-8 py-8 z-[2] ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          {/* Top-left: first image (square) */}
          <div className="row-start-1 row-end-2 col-start-1 col-end-2 overflow-hidden rounded-xl shadow-2xl bg-slate-900 border border-white/5 group relative md:max-w-[80%] mx-auto">
            <div className="w-full h-full md:flex md:items-stretch">
              {/* Content column: left on desktop, below image on mobile */}
              <div className="order-last md:order-first md:w-2/5 bg-gradient-to-r from-black/80 via-black/40 to-transparent backdrop-blur-sm p-6 md:p-8 flex flex-col justify-center">
                <p className="text-sm text-green-400 font-medium">{content.portfolio.projects[0].subtitle}</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-extrabold text-white leading-tight">{content.portfolio.projects[0].title}</h3>
                <p className="mt-3 text-sm text-gray-300 max-w-md">A complete real estate CRM platform for brokers, agents &amp; property management.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => onNavigate ? onNavigate('work-category', 'web-development') : null}
                        className="inline-flex items-center gap-2 bg-white/6 hover:bg-white/10 text-white px-4 py-2 rounded-md border border-white/10 shadow-sm"
                      >
                        View Case Study
                      </button>
                    </div>
              </div>

              {/* Image column: right on desktop, above content on mobile */}
              <div className="order-first md:order-last md:w-3/5 h-[240px] w-full overflow-hidden">
                <img
                  src={content.portfolio.projects[0].image}
                  alt={content.portfolio.projects[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Top-right: headline block */}
          <div className="row-start-1 row-end-2 col-start-2 col-end-3 flex flex-col justify-center pr-8 bg-green-50 p-6 rounded-lg">
            <h2 className={`font-display font-bold text-5xl lg:text-6xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] uppercase mb-4`}>{content.portfolio.headline}</h2>
            <p className="text-lg text-gray-custom dark:text-slate-300 mb-6 max-w-md">{content.portfolio.body}</p>
            {/* CTA removed intentionally */}
          </div>

          {/* Bottom-left: second image (square under first) */}
          <div className="row-start-2 row-end-3 col-start-1 col-end-2 overflow-hidden rounded-xl shadow-2xl bg-slate-900 border border-white/5 group relative md:max-w-[80%] mx-auto">
            <div className="w-full h-full md:flex md:items-stretch">
              <div className="order-last md:order-first md:w-2/5 bg-gradient-to-r from-black/80 via-black/40 to-transparent backdrop-blur-sm p-6 md:p-8 flex flex-col justify-center">
                <p className="text-sm text-green-400 font-medium">{content.portfolio.projects[1].subtitle}</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-extrabold text-white leading-tight">{content.portfolio.projects[1].title}</h3>
                <p className="mt-3 text-sm text-gray-300 max-w-md">Smart IoT and automation solutions built for real-world innovation.</p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('work');
                        setTimeout(() => onNavigate('work-category', 'sih-alumni'), 220);
                      }
                    }}
                    className="inline-flex items-center gap-2 bg-white/6 hover:bg-white/10 text-white px-4 py-2 rounded-md border border-white/10 shadow-sm"
                  >
                    View Project
                  </button>
                </div>
              </div>

              <div className="order-first md:order-last md:w-3/5 h-[240px] w-full overflow-hidden">
                <img src={content.portfolio.projects[1].image} alt={content.portfolio.projects[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>

          {/* Bottom-right: third image (square right of the second) */}
          <div className="row-start-2 row-end-3 col-start-2 col-end-3 overflow-hidden rounded-xl shadow-2xl bg-slate-900 border border-white/5 group relative md:max-w-[80%] md:justify-self-start md:-ml-12">
            <div className="w-full h-full md:flex md:items-stretch">
              <div className="order-last md:order-first md:w-2/5 bg-gradient-to-r from-black/80 via-black/40 to-transparent backdrop-blur-sm p-6 md:p-8 flex flex-col justify-center">
                <p className="text-sm text-green-400 font-medium">{content.portfolio.projects[2].subtitle}</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-extrabold text-white leading-tight">{content.portfolio.projects[2].title}</h3>
                <p className="mt-3 text-sm text-gray-300 max-w-md">Creating intuitive and high-performance mobile applications with clean UI/UX and real-time functionality.</p>
                <div className="mt-6">
                  <button className="inline-flex items-center gap-2 bg-white/6 hover:bg-white/10 text-white px-4 py-2 rounded-md border border-white/10 shadow-sm">
                    View Project
                  </button>
                </div>
              </div>

              <div className="order-first md:order-last md:w-3/5 h-[240px] w-full overflow-hidden">
                <img src={content.portfolio.projects[2].image} alt={content.portfolio.projects[2].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Projects Modal */}
      {/* All Projects modal removed along with CTA */}
    </section>
  );
}
