import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { FileText } from 'lucide-react';

export default function TermsPage({ onBack }: { onBack?: () => void }) {
  const { ref: sectionRef } = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const { content } = useContent();

  return (
    <section ref={sectionRef} className="min-h-screen px-6 lg:px-12 py-24 bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="text-sm text-gray-custom mb-6">← Back</button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-white shadow-md text-sky-600">
            <FileText size={28} />
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold mb-1">Terms & Conditions</h1>
            <p className="text-sm text-gray-600">Last updated: May 22, 2026</p>
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-8 shadow-lg">
          <p className="mb-4 text-gray-700">These Terms & Conditions govern your use of the XyroSolutions website and services. By using the site you agree to these terms.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">1. Use of site</h2>
          <p className="mb-4 text-gray-700">You may use the site for lawful purposes only. Prohibited uses include infringing content, abuse, or interfering with site operations.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">2. Intellectual property</h2>
          <p className="mb-4 text-gray-700">All content on the site is owned by or licensed to XyroSolutions. You may not reproduce or distribute site content without permission.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">3. Disclaimers & liability</h2>
          <p className="mb-4 text-gray-700">The site is provided "as is" without warranties. XyroSolutions limits liability to the maximum extent permitted by law.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">4. Termination</h2>
          <p className="mb-4 text-gray-700">We may suspend or terminate access for violations of these terms or for other lawful reasons.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">5. Governing law</h2>
          <p className="mb-4 text-gray-700">These terms are governed by the laws applicable to the business and jurisdiction. Contact <a href={`mailto:${content.contact.email}`} className="text-sky-600 hover:underline">{content.contact.email}</a> for questions.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">Contact</h2>
          <p className="text-gray-700">If you have questions about these terms, email us at <a href={`mailto:${content.contact.email}`} className="text-sky-600 hover:underline">{content.contact.email}</a>.</p>
        </div>
      </div>
    </section>
  );
}
