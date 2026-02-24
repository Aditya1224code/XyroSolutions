import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { Mail, MapPin, Send, Instagram } from 'lucide-react';
import { toast } from 'sonner';
import { contactApi } from '../lib/api';

export default function ContactSection() {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await contactApi.submit(formData);
      if (response.success) {
        toast.success(response.message || 'Message sent! We\'ll get back to you within 2 business days.');
        setFormData({ email: '', message: '' });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="bg-dark text-white py-20 md:py-32 relative overflow-hidden"
    >
      <div className="px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div>
            <h2 
              className={`font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-white mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {content.contact.headline}
            </h2>
            <p 
              className={`text-lg text-white/70 mb-8 max-w-md transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {content.contact.body}
            </p>

            {/* Contact Info */}
            <div 
              className={`space-y-4 mb-12 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <a 
                href={`mailto:${content.contact.email}`}
                className="flex items-center gap-3 text-white/80 hover:text-lime transition-colors group"
              >
                <Mail size={20} className="text-lime" />
                <span>{content.contact.email}</span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin size={20} className="text-lime" />
                <span>{content.contact.location}</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={content.contact.form.emailPlaceholder}
                  required
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-lime focus:ring-lime/30"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-2">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={content.contact.form.messagePlaceholder}
                  rows={5}
                  required
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-lime focus:ring-lime/30 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                ) : (
                  <>
                    {content.contact.form.buttonText}
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer 
          className={`mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-white/40 text-sm">
            © XyroSolutions — 2026
          </p>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/xyrosolutions1" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-lime transition-colors">
              <Instagram size={20} />
            </a>
            <a href="mailto:xyrosolutions1@gmail.com" className="text-white/40 hover:text-lime transition-colors">
              <Mail size={20} />
            </a>
            <a href="https://wa.me/919123108081" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-lime transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
