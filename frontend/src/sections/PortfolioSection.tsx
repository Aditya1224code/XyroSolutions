import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';

export default function PortfolioSection() {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <section 
      id="portfolio"
      ref={sectionRef}
      className="section-pinned bg-off-white relative overflow-hidden"
    >
      {/* Dot Grid */}
      <div 
        className={`absolute left-[40%] top-[50%] w-[20%] h-[40%] dot-grid z-0 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '400ms' }}
      />

      {/* Decorative Elements */}
      <div 
        className={`decor-circle bg-lime w-28 h-28 md:w-40 md:h-40 absolute left-[40%] top-[42%] z-[1] transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '500ms' }}
      />
      <div 
        className={`decor-ring border-dark w-20 h-20 md:w-28 md:h-28 absolute left-[42%] top-[6%] z-[3] transition-all duration-1000 ${
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
          <path d="M16 0V32M0 16H32" stroke="#111111" strokeWidth="3"/>
        </svg>
      </div>

      {/* Top Left Project Card */}
      <div 
        className={`absolute left-[4vw] md:left-[6vw] top-[8vh] md:top-[10vh] w-[42vw] md:w-[34vw] h-[28vh] md:h-[38vh] z-[2] overflow-hidden rounded-xl group cursor-pointer transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        <img
          src={content.portfolio.projects[0].image}
          alt={content.portfolio.projects[0].title}
          className="w-full h-full object-cover img-mono group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <p className="font-mono text-xs text-white/80 mb-1">{content.portfolio.projects[0].subtitle}</p>
            <h3 className="font-display font-bold text-white text-lg">{content.portfolio.projects[0].title}</h3>
          </div>
          <ArrowUpRight size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Top Right Headline Block */}
      <div className="absolute right-[4vw] md:right-[8vw] top-[10vh] md:top-[14vh] w-[88vw] md:w-[40vw] z-[5]">
        <h2 
          className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-dark uppercase mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {content.portfolio.headline}
        </h2>
        <p 
          className={`text-base md:text-lg text-gray-custom mb-6 max-w-md transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {content.portfolio.body}
        </p>
        <button 
          onClick={() => setShowAllProjects(true)}
          className={`inline-flex items-center gap-2 font-medium text-dark hover:text-lime transition-all duration-700 group ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {content.portfolio.cta}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bottom Left Project Card */}
      <div 
        className={`absolute left-[4vw] md:left-[6vw] bottom-[10vh] md:bottom-[10vh] w-[46vw] md:w-[46vw] h-[28vh] md:h-[36vh] z-[2] overflow-hidden rounded-xl group cursor-pointer transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <img
          src={content.portfolio.projects[1].image}
          alt={content.portfolio.projects[1].title}
          className="w-full h-full object-cover img-mono group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <p className="font-mono text-xs text-white/80 mb-1">{content.portfolio.projects[1].subtitle}</p>
            <h3 className="font-display font-bold text-white text-lg">{content.portfolio.projects[1].title}</h3>
          </div>
          <ArrowUpRight size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Right Project Card */}
      <div 
        className={`absolute right-[4vw] md:right-[6vw] bottom-[10vh] md:bottom-[10vh] w-[42vw] md:w-[38vw] h-[28vh] md:h-[36vh] z-[2] overflow-hidden rounded-xl group cursor-pointer transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        <img
          src={content.portfolio.projects[2].image}
          alt={content.portfolio.projects[2].title}
          className="w-full h-full object-cover img-mono group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <p className="font-mono text-xs text-white/80 mb-1">{content.portfolio.projects[2].subtitle}</p>
            <h3 className="font-display font-bold text-white text-lg">{content.portfolio.projects[2].title}</h3>
          </div>
          <ArrowUpRight size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* All Projects Modal */}
      {showAllProjects && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowAllProjects(false)}
        >
          <div 
            className="bg-off-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-off-white p-6 border-b flex justify-between items-center z-10">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-dark">All Projects</h2>
              <button 
                onClick={() => setShowAllProjects(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.portfolio.projects.map((project, index) => (
                <div 
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-xs text-gray-custom mb-1">{project.subtitle}</p>
                    <h3 className="font-display font-bold text-dark text-lg flex items-center justify-between">
                      {project.title}
                      <ArrowUpRight size={18} className="text-lime opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
