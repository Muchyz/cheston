import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Shield } from "lucide-react";

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? undefined : 0, animation: visible ? `fadeUp 0.65s ease ${delay}s both` : "none" }}>
      {children}
    </div>
  );
}

export default function PrivacyPage() {
  const navigate = useNavigate();
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)", padding: "80px 24px", textAlign: "center" }}>
        <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">Legal</span>
        <h1 className="text-5xl text-white mb-3" style={{ fontFamily: "'DM Serif Display',serif" }}>Privacy Policy</h1>
        <p className="text-white/50 text-sm">Last updated: January 2025</p>
      </div>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-8 p-5 rounded-2xl bg-red-50 border border-red-100">
              <Shield className="w-8 h-8 text-red-600 shrink-0" />
              <p className="text-red-700 text-sm font-medium">CHESTON security solutions limited is committed to protecting your privacy and handling your personal information responsibly and transparently.</p>
            </div>
          </Reveal>

          {[
            {
              title: "1. Information We Collect",
              content: "We collect personal information you provide to us directly, such as your name, email address, phone number, and any details you share when requesting a quote or contacting us. We may also collect information about your business or property as part of a security assessment."
            },
            {
              title: "2. How We Use Your Information",
              content: "We use the information you provide to respond to your enquiries, prepare security assessments and quotes, deliver our contracted security services, communicate important updates about your service, and improve our service offerings. We do not sell, rent, or trade your personal information to third parties."
            },
            {
              title: "3. Data Security",
              content: "We take the security of your personal information seriously and implement appropriate technical and organisational measures to protect it from unauthorised access, disclosure, alteration, or destruction. Given the nature of our business, we maintain high standards of information security internally."
            },
            {
              title: "4. Sharing of Information",
              content: "Your information may be shared internally with relevant CHESTON Security staff members who need it to provide your service. We may share information with trusted third-party service providers who assist in our operations, subject to confidentiality agreements. We may disclose information if required by law or in response to lawful requests by public authorities."
            },
            {
              title: "5. Your Rights",
              content: "You have the right to access the personal information we hold about you, request correction of inaccurate information, request deletion of your information (subject to legal obligations), and withdraw consent where processing is based on consent. To exercise these rights, please contact us at info@chestonsecurity.co.ke."
            },
            {
              title: "6. Cookies & Website",
              content: "Our website may use cookies to improve your browsing experience. Cookies are small text files stored on your device. You can control cookie settings through your browser preferences. We do not use cookies for advertising or tracking purposes."
            },
            {
              title: "7. Contact Us About Privacy",
              content: "If you have any questions about this Privacy Policy or our handling of your personal information, please contact us at: info@chestonsecurity.co.ke or write to CHESTON security solutions limited, P.O. Box 82, Serem, Lavington Hope Center, Ambosel Road."
            },
            {
              title: "8. Changes to This Policy",
              content: "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on our website with a revised date. Your continued use of our services following such changes constitutes acceptance of the updated policy."
            },
          ].map((section, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
              {i < 7 && <hr className="border-gray-100 mb-8" />}
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-10 p-8 rounded-3xl text-center" style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
              <h3 className="text-xl font-bold text-white mb-3">Questions About Our Privacy Policy?</h3>
              <p className="text-white/60 text-sm mb-5">Our team is happy to clarify any aspect of how we handle your personal information.</p>
              <button onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}>
                Contact Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}