import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center sticky top-0 z-40 shadow-lg">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg ml-4">Privacy Policy</h1>
      </header>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
          <p className="text-sm text-gray-500 mb-6">Last updated: May 14, 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">1. Information We Collect</h3>
              <p className="text-sm leading-relaxed mb-2">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Account information (name, email, phone number)</li>
                <li>Profile information (bio, photos, location)</li>
                <li>Content you post (photos, videos, comments, messages)</li>
                <li>Usage data and analytics</li>
                <li>Device information and IP address</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">2. How We Use Your Information</h3>
              <p className="text-sm leading-relaxed mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize your experience</li>
                <li>Send you notifications and updates</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Analyze usage patterns and trends</li>
                <li>Communicate with you about our services</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">3. Information Sharing</h3>
              <p className="text-sm leading-relaxed mb-2">
                We share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>With other users when you post public content</li>
                <li>With service providers who assist us in operations</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With your consent</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">4. Data Security</h3>
              <p className="text-sm leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">5. Your Rights</h3>
              <p className="text-sm leading-relaxed mb-2">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and data</li>
                <li>Object to certain processing activities</li>
                <li>Download your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">6. Cookies and Tracking</h3>
              <p className="text-sm leading-relaxed">
                We use cookies and similar technologies to track activity on our service and hold certain information to improve and analyze our service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">7. Children's Privacy</h3>
              <p className="text-sm leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">8. Changes to Privacy Policy</h3>
              <p className="text-sm leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">9. Contact Us</h3>
              <p className="text-sm leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@vibehub.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
