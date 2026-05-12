import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { Quote } from 'lucide-react';

export default function ResultsSection() {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });

  return (
    <section 
      ref={sectionRef}
      className="bg-off-white dark:bg-[#050608] py-20 md:py-32 relative overflow-hidden"
    >
      <div className="px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 
            className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {content.results.headline}
          </h2>
          <p 
            className={`text-base md:text-lg text-gray-custom dark:text-slate-300 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {content.results.body}
          </p>
        </div>

        {/* Metrics */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {content.results.metrics.map((metric, index) => (
            <div 
              key={index}
              className="text-center md:text-left"
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <p className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-dark dark:text-[#F8FAFC] mb-2">
                {metric.value}
              </p>
              <p className="text-gray-custom dark:text-slate-300 text-sm md:text-base">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div 
          className={`bg-white rounded-2xl p-8 md:p-12 relative transition-all duration-700 dark:bg-[#111827] dark:border dark:border-white/10 dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-lime rounded-l-2xl" />
          <Quote size={40} className="text-lime mb-6" />
          <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-dark dark:text-[#F8FAFC] leading-snug mb-6">
            "{content.results.testimonial.quote}"
          </blockquote>
          <cite className="not-italic text-gray-custom dark:text-slate-300 text-sm md:text-base">
            {content.results.testimonial.author}
          </cite>
        </div>
      </div>
    </section>
  );
}
