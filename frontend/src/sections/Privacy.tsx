import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage({ onBack }: { onBack?: () => void }) {
  const { ref: sectionRef } = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const { content } = useContent();

  return (
    <section ref={sectionRef} className="min-h-screen px-6 lg:px-12 py-24 bg-gradient-to-br from-lime-50 via-amber-50 to-sky-50">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="text-sm text-gray-custom mb-6">← Back</button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-white shadow-md text-lime">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold mb-1">Privacy Policy</h1>
            <p className="text-sm text-gray-600">Last updated: May 22, 2026</p>
          </div>
        </div>

        <div className="bg-white/90 rounded-2xl p-8 shadow-lg">
          <p className="mb-4 text-gray-700">This Privacy Policy explains what personal data we collect, why we collect it, how we use it, and the choices you have. We value your privacy and handle your information responsibly.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">1. Information we collect</h2>
          <p className="mb-4 text-gray-700">We may collect personal data you provide (name, email), usage data (pages visited, IP address), and data from third-party services (analytics, hosting).</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">2. How we use your data</h2>
          <p className="mb-4 text-gray-700">We use data to operate and improve the site, respond to messages, provide services, send updates (with your consent), and analyze usage.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">3. Third parties</h2>
          <p className="mb-4 text-gray-700">We may share data with service providers such as Cloudinary (media hosting), email providers, and analytics tools. We do not sell personal data.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">4. Cookies & tracking</h2>
          <p className="mb-4 text-gray-700">We use cookies and similar technologies for essential site functionality and analytics. You can control cookies via your browser.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">5. Your rights</h2>
          <p className="mb-4 text-gray-700">Depending on your location, you may have the right to access, correct, delete, or export your personal data. Contact us at <a href={`mailto:${content.contact.email}`} className="text-lime hover:underline">{content.contact.email}</a> to exercise these rights.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">6. Security & retention</h2>
          <p className="mb-4 text-gray-700">We implement reasonable security measures. We retain data only as long as necessary to provide the service or meet legal obligations.</p>

          <h2 className="font-semibold mt-6 mb-2 text-dark">Contact</h2>
          <p className="text-gray-700">If you have questions about this policy, email us at <a href={`mailto:${content.contact.email}`} className="text-lime hover:underline">{content.contact.email}</a>.</p>
        </div>
      </div>
    </section>
  );
}
