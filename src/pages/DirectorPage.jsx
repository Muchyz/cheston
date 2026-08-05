import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle, User } from "lucide-react";
import directorPhoto from "../assets/director.jpg";

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

export default function DirectorPage() {
  const navigate = useNavigate();
  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="py-16" style={{ background: "linear-gradient(135deg,#1e1b4b,#0f172a)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <Reveal>
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
                  style={{ aspectRatio: "4/3", background: "#1e293b" }}>
                  <img src={directorPhoto} alt="Director" className="w-full h-full object-cover" />
                </div>
                <div className="p-5 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="text-white font-bold text-lg">Benjamin Rotich</div>
                  <div className="text-red-400 text-sm font-medium mt-1">Director</div>
                  <div className="text-white/40 text-xs mt-1">Cheston Security Services Limited</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="space-y-6">
                <div className="text-red-400 opacity-60">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                <blockquote className="text-white text-2xl leading-relaxed font-medium" style={{ fontFamily: "'DM Serif Display',serif" }}>
                  "Security is a promise you make to a client, and we take that promise seriously. Every officer we deploy carries the trust of the people and property they protect."
                </blockquote>

                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>At Cheston Security Services Limited, we believe good security starts with good people. Our officers are carefully selected, properly trained, and supervised closely so that every deployment meets the standard our clients expect.</p>
                  <p>We work across residential, corporate, and industrial sites, tailoring each security plan to the specific risks and needs of the property. No two clients are the same, and we don't believe in one-size-fits-all solutions.</p>
                  <p className="text-white/70 leading-relaxed">Integrity guides how we run this company — from how we treat our staff to how we deliver on our contracts. We're building Cheston to be a company our clients and our team can rely on for the long term.</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      "Rigorous officer vetting",
                      "Tailored security plans",
                      "Close on-site supervision",
                      "Ongoing staff training",
                      "Transparent client communication",
                      "Long-term client relationships",
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-red-400 shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate("/contact")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}>
                    Work With Us <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Light CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl text-gray-900 mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
              Guided by Vision, Mission & Values
            </h2>
            <p className="text-gray-500 mb-8">
              At Cheston Security Services Limited, every decision — from hiring to service delivery — is guided by our director's commitment to excellence and ethical conduct.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => navigate("/about")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                About Us <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                Get a Free Quote
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
