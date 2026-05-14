import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center sticky top-0 z-40 shadow-lg">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg ml-4">Terms & Conditions</h1>
      </header>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms & Conditions</h2>
          <p className="text-sm text-gray-500 mb-6">Last updated: May 14, 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">1. Acceptance of Terms</h3>
              <p className="text-sm leading-relaxed">
                By accessing and using VibeHub, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">2. User Account</h3>
              <p className="text-sm leading-relaxed mb-2">
                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms.
              </p>
              <p className="text-sm leading-relaxed">
                You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">3. Content Guidelines</h3>
              <p className="text-sm leading-relaxed mb-2">
                Users must not post content that:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Violates any law or regulation</li>
                <li>Infringes on intellectual property rights</li>
                <li>Contains hate speech or harassment</li>
                <li>Promotes violence or illegal activities</li>
                <li>Contains explicit or inappropriate content</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">4. Intellectual Property</h3>
              <p className="text-sm leading-relaxed">
                The content you post on VibeHub remains yours. However, by posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and distribute your content on our platform.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">5. Termination</h3>
              <p className="text-sm leading-relaxed">
                We reserve the right to terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">6. Limitation of Liability</h3>
              <p className="text-sm leading-relaxed">
                VibeHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">7. Changes to Terms</h3>
              <p className="text-sm leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the app.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">8. Contact Us</h3>
              <p className="text-sm leading-relaxed">
                If you have any questions about these Terms, please contact us at legal@vibehub.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
