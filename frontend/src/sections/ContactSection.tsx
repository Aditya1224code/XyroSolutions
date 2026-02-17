import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { Mail, MapPin, Send, Instagram, Dribbble, Linkedin } from 'lucide-react';
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
            © NexGen Studio — 2026
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-lime transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white/40 hover:text-lime transition-colors">
              <Dribbble size={20} />
            </a>
            <a href="#" className="text-white/40 hover:text-lime transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
