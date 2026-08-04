import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Award } from "lucide-react";

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
                <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "3/4" }}>
                  <img src="/director-duncan.jpg" alt="Duncan O. Ngao"
                    className="w-full h-full object-cover object-top"
                    onError={e => { e.target.style.background = "#1e293b"; }} />
                </div>
                <div className="p-5 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="text-white font-bold text-lg">Duncan O. Ngao</div>
                  <div className="text-red-400 text-sm font-medium mt-1">Founder & Director</div>
                  <div className="text-white/40 text-xs mt-1">CHESTON security solutions limited</div>
                  <div className="flex items-center justify-center gap-2 mt-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-white/70 text-xs font-medium">35+ Years Industry Experience</span>
                  </div>
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
                  "𝘐 𝘧𝘰𝘶𝘯𝘥𝘦𝘥 𝘉𝘐𝘎 𝘋𝘌𝘌 𝘴𝘦𝘤𝘶𝘳𝘪𝘵𝘺 𝘴𝘰𝘭𝘶𝘵𝘪𝘰𝘯𝘴 𝘭𝘪𝘮𝘪𝘵𝘦𝘥 𝘵𝘰 𝘱𝘳𝘰𝘷𝘪𝘥𝘦 𝘲𝘶𝘢𝘭𝘪𝘵𝘺 𝘴𝘦𝘳𝘷𝘪𝘤𝘦𝘴 𝘵𝘰 𝘰𝘶𝘳 𝘤𝘭𝘪𝘦𝘯𝘵𝘴 𝘢𝘴 𝘸𝘦 𝘴𝘢𝘧𝘦𝘨𝘶𝘢𝘳𝘥 𝘵𝘩𝘦𝘪𝘳 𝘩𝘰𝘮𝘦𝘴, 𝘸𝘰𝘳𝘬 𝘱𝘳𝘦𝘮𝘪𝘴𝘦𝘴 𝘢𝘯𝘥 𝘱𝘳𝘰𝘥𝘶𝘤𝘵𝘴. 𝘞𝘦 𝘢𝘳𝘦 𝘱𝘭𝘦𝘢𝘴𝘦𝘥 𝘢𝘯𝘥 𝘩𝘰𝘯𝘰𝘳𝘦𝘥 𝘵𝘰 𝘤𝘰𝘯𝘵𝘳𝘪𝘣𝘶𝘵𝘦 𝘢𝘯𝘥 𝘴𝘶𝘱𝘱𝘰𝘳𝘵 𝘵𝘩𝘪𝘴 𝘫𝘰𝘶𝘳𝘯𝘦𝘺 𝘸𝘪𝘵𝘩 𝘰𝘶𝘳 𝘦𝘹𝘱𝘦𝘳𝘵𝘪𝘴𝘦."
                </blockquote>

                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>𝘐𝘯 𝘰𝘶𝘳 𝘊𝘰𝘮𝘱𝘢𝘯𝘺, 𝘸𝘦 𝘸𝘪𝘭𝘭 𝘯𝘦𝘷𝘦𝘳 𝘤𝘰𝘮𝘱𝘳𝘰𝘮𝘪𝘴𝘦 𝘰𝘯 𝘵𝘩𝘦 𝘲𝘶𝘢𝘭𝘪𝘵𝘺 𝘰𝘧 𝘰𝘶𝘳 𝘴𝘦𝘳𝘷𝘪𝘤𝘦 𝘢𝘴 𝘸𝘦 𝘬𝘦𝘦𝘱 𝘰𝘯 𝘪𝘯𝘯𝘰𝘷𝘢𝘵𝘪𝘰𝘯 𝘢𝘯𝘥 𝘵𝘰 𝘣𝘳𝘪𝘯𝘨 𝘵𝘩𝘦 𝘣𝘦𝘴𝘵 𝘰𝘯𝘦 𝘤𝘢𝘯 𝘩𝘰𝘱𝘦 𝘧𝘰𝘳. 𝘛𝘩𝘢𝘵 𝘪𝘴 𝘸𝘩𝘺 𝘸𝘦 𝘥𝘦𝘤𝘪𝘥𝘦𝘥 𝘵𝘰 𝘱𝘢𝘳𝘵𝘯𝘦𝘳 𝘸𝘪𝘵𝘩 𝘪𝘯𝘵𝘦𝘳𝘯𝘢𝘵𝘪𝘰𝘯𝘢𝘭 𝘤𝘰𝘮𝘱𝘢𝘯𝘪𝘦𝘴: 𝘵𝘰 𝘦𝘲𝘶𝘪𝘱 𝘰𝘶𝘳 𝘤𝘭𝘪𝘦𝘯𝘵𝘴 𝘸𝘪𝘵𝘩 𝘵𝘩𝘦 𝘣𝘦𝘴𝘵 𝘴𝘰𝘭𝘶𝘵𝘪𝘰𝘯𝘴 𝘢𝘷𝘢𝘪𝘭𝘢𝘣𝘭𝘦. 𝘛𝘩𝘪𝘴 𝘪𝘴 𝘢𝘭𝘴𝘰 𝘸𝘩𝘺 𝘸𝘦 𝘢𝘳𝘦 𝘪𝘯𝘷𝘦𝘴𝘵𝘪𝘯𝘨 𝘴𝘪𝘨𝘯𝘪𝘧𝘪𝘤𝘢𝘯𝘵𝘭𝘺 𝘵𝘰 𝘥𝘦𝘷𝘦𝘭𝘰𝘱 𝘵𝘩𝘦 𝘵𝘢𝘭𝘦𝘯𝘵𝘴 𝘰𝘧 𝘰𝘶𝘳 𝘦𝘮𝘱𝘭𝘰𝘺𝘦𝘦𝘴 𝘤𝘰𝘯𝘵𝘪𝘯𝘶𝘰𝘶𝘴𝘭𝘺.</p>
                  <p>𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘪𝘯𝘨 𝘢 𝘣𝘶𝘴𝘪𝘯𝘦𝘴𝘴 𝘳𝘦𝘴𝘱𝘰𝘯𝘴𝘪𝘣𝘭𝘺 𝘪𝘴 𝘤𝘩𝘢𝘭𝘭𝘦𝘯𝘨𝘪𝘯𝘨 𝘪𝘯 𝘢 𝘤𝘰𝘶𝘯𝘵𝘳𝘺 𝘭𝘪𝘬𝘦 𝘒𝘦𝘯𝘺𝘢. 𝘍𝘰𝘳𝘵𝘶𝘯𝘢𝘵𝘦𝘭𝘺, 𝘢𝘵 𝘉𝘐𝘎 𝘋𝘌𝘌 𝘚𝘦𝘤𝘶𝘳𝘪𝘵𝘺 𝘚𝘰𝘭𝘶𝘵𝘪𝘰𝘯𝘴 𝘓𝘪𝘮𝘪𝘵𝘦𝘥, 𝘸𝘦 𝘢𝘳𝘦 𝘢𝘭𝘭 𝘥𝘳𝘪𝘷𝘦𝘯 𝘣𝘺 𝘰𝘶𝘳 𝘷𝘪𝘴𝘪𝘰𝘯, 𝘰𝘶𝘳 𝘮𝘪𝘴𝘴𝘪𝘰𝘯 𝘢𝘯𝘥 𝘰𝘶𝘳 𝘷𝘢𝘭𝘶𝘦𝘴. 𝘓𝘪𝘬𝘦𝘸𝘪𝘴𝘦 𝘰𝘶𝘳 𝘤𝘰𝘮𝘮𝘪𝘵𝘮𝘦𝘯𝘵 𝘵𝘰 𝘶𝘱𝘩𝘰𝘭𝘥 𝘤𝘰𝘮𝘱𝘭𝘪𝘢𝘯𝘤𝘦 𝘢𝘯𝘥 𝘰𝘶𝘳 𝘻𝘦𝘳𝘰-𝘵𝘰𝘭𝘦𝘳𝘢𝘯𝘤𝘦 𝘢𝘱𝘱𝘳𝘰𝘢𝘤𝘩 𝘰𝘯 𝘤𝘰𝘳𝘳𝘶𝘱𝘵𝘪𝘰𝘯 𝘴𝘪𝘨𝘯𝘢𝘭 𝘩𝘰𝘸 𝘸𝘦 𝘸𝘢𝘯𝘵 𝘵𝘰 𝘰𝘱𝘦𝘳𝘢𝘵𝘦 𝘢𝘯𝘥 𝘤𝘰𝘯𝘥𝘶𝘤𝘵 𝘰𝘶𝘳 𝘣𝘶𝘴𝘪𝘯𝘦𝘴𝘴: 𝘦𝘵𝘩𝘪𝘤𝘢𝘭𝘭𝘺 𝘢𝘯𝘥 𝘳𝘦𝘴𝘱𝘰𝘯𝘴𝘪𝘣𝘭𝘺.</p>
                  <p className="text-white/70 leading-relaxed">𝘉𝘐𝘎 𝘋𝘌𝘌 𝘚𝘦𝘤𝘶𝘳𝘪𝘵𝘺 𝘚𝘰𝘭𝘶𝘵𝘪𝘰𝘯𝘴 𝘓𝘪𝘮𝘪𝘵𝘦𝘥 𝘞𝘦 𝘢𝘪𝘮 𝘵𝘰 𝘱𝘳𝘰𝘷𝘪𝘥𝘦 𝘰𝘶𝘳 𝘦𝘮𝘱𝘭𝘰𝘺𝘦𝘦𝘴 𝘸𝘪𝘵𝘩 𝘢 𝘳𝘦𝘴𝘱𝘦𝘤𝘵𝘧𝘶𝘭 𝘸𝘰𝘳𝘬𝘱𝘭𝘢𝘤𝘦. 𝘉𝘦𝘪𝘯𝘨 𝘵𝘳𝘢𝘯𝘴𝘱𝘢𝘳𝘦𝘯𝘵 𝘢𝘯𝘥 𝘢𝘥𝘢𝘱𝘵𝘦𝘥 𝘵𝘰 𝘎𝘰𝘰𝘥 𝘊𝘰𝘳𝘱𝘰𝘳𝘢𝘵𝘦 𝘎𝘰𝘷𝘦𝘳𝘯𝘢𝘯𝘤𝘦 — 𝘸𝘪𝘵𝘩 𝘴𝘵𝘳𝘰𝘯𝘨 𝘤𝘰𝘮𝘮𝘪𝘵𝘮𝘦𝘯𝘵 𝘰𝘧 𝘉𝘖𝘋𝘴 𝘢𝘯𝘥 𝘵𝘦𝘢𝘮 𝘮𝘦𝘮𝘣𝘦𝘳𝘴, 𝘸𝘦 𝘢𝘳𝘦 𝘤𝘰𝘮𝘮𝘪𝘵𝘵𝘦𝘥 𝘵𝘰 𝘱𝘦𝘳𝘧𝘰𝘳𝘮 𝘣𝘦𝘵𝘵𝘦𝘳 𝘪𝘯 𝘵𝘩𝘦 𝘧𝘶𝘵𝘶𝘳𝘦. 𝘠𝘰𝘶 𝘤𝘢𝘯 𝘤𝘰𝘶𝘯𝘵 𝘰𝘯 𝘶𝘴.</p>
                  <p></p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      "Zero-tolerance on corruption",
                      "Ethical & responsible conduct",
                      "International partnerships",
                      "Continuous employee development",
                      "Good Corporate Governance",
                      "Respectful workplace culture",
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
              At CHESTON security solutions limited, every decision — from hiring to service delivery — is guided by our founder's commitment to excellence and ethical conduct.
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