import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Shield, Users, Award, Eye, Target, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";

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

export default function VisionMissionPage() {
  const navigate = useNavigate();
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "300px", background: "linear-gradient(135deg,#1e3a8a,#0f172a)" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">Our Foundation</span>
          <h1 className="text-5xl md:text-6xl text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Vision, Mission<br />
            <span style={{ background: "linear-gradient(135deg,#fca5a5,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              & Values
            </span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">The principles that drive every decision, every deployment, every interaction at CHESTON security solutions limited.</p>
        </div>
      </div>

      {/* Vision & Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <Reveal>
              <div className="p-10 rounded-3xl border-2 border-red-100 bg-red-50 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-10 translate-x-10" style={{ background: "#dc2626" }} />
                <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-5" style={{ fontFamily: "'DM Serif Display',serif" }}>Our Vision</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To be the pre-eminent provider of integrated services protecting the assets of our clients in Kenya and targeted East Africa markets through the consistent achievement of excellence in every sphere of security provision and client service.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-10 rounded-3xl border-2 border-blue-100 bg-blue-50 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-10 translate-x-10" style={{ background: "#1e3a8a" }} />
                <div className="w-14 h-14 rounded-2xl bg-blue-800 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-5" style={{ fontFamily: "'DM Serif Display',serif" }}>Our Mission</h2>
                <ul className="space-y-4">
                  {[
                    "To ensure the client remains the focus and centre of our activities",
                    "To provide operational excellence",
                    "To stay up to date with innovation and tech around the security industry",
                    "To be the market leaders",
                    "To continually invest in employees growth",
                    "To maintain superior services that add value but remain affordable",
                    "To ensure operational areas are safe and secure for day to day activities",
                  ].map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Mission Statement Banner */}
          <Reveal delay={0.12}>
            <div className="rounded-3xl overflow-hidden relative shadow-2xl mb-16" style={{ minHeight: "260px" }}>
              <img src="/mission-team.jpg" alt="Cheston Mission"
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => { e.target.style.background = "#1e293b"; }} />
              <div className="relative z-10 p-12 md:p-16" style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.90),rgba(30,58,138,0.85))" }}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5" style={{ fontFamily: "'DM Serif Display',serif" }}>Mission Statement</h2>
                <p className="text-white/90 text-xl leading-relaxed mb-4 max-w-3xl">
                  CHESTON Security is committed to providing exceptional services by delivering personalized, high-quality and cost efficient solutions to meet the needs of our clients.
                </p>
                <p className="text-white/75 leading-relaxed max-w-3xl">
                  We strive to exceed the requests of our clients by going above and beyond what is asked to ensure that every detail is to your requirements.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Values */}
          <Reveal delay={0.14}>
            <div className="text-center mb-10">
              <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Core Values</span>
              <h2 className="text-4xl text-gray-900" style={{ fontFamily: "'DM Serif Display',serif" }}>What Guides Us Daily</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Shield, color: "#dc2626", bg: "#fef2f2", title: "Safety and Quality", desc: "Safety and quality are the top priorities considered as we render every service to our clients. We never compromise on either — your protection is our purpose." },
              { icon: Users, color: "#1e3a8a", bg: "#eff6ff", title: "Commitment to People Development", desc: "We strive to work as a team so as to create value to the customer and invest in continuous employee growth, training, and career development." },
              { icon: Award, color: "#15803d", bg: "#f0fdf4", title: "Professionalism", desc: "As a company we are always determined to constantly achieve high standards in what we do and what we have. Excellence is a non-negotiable standard, not an aspiration." },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 text-center group">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform" style={{ background: v.bg }}>
                    <v.icon className="w-8 h-8" style={{ color: v.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Why Us */}
          <Reveal delay={0.15}>
            <div className="grid md:grid-cols-3 gap-6 p-10 rounded-3xl" style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
              <div className="md:col-span-3 mb-2">
                <h3 className="text-2xl font-bold text-white mb-2">Why Choose Cheston?</h3>
                <p className="text-white/50 text-sm">Our security packages are designed to cater for clients with respect to their specific needs and financial capabilities.</p>
              </div>
              {[
                { icon: Users, color: "#fca5a5", title: "Independent & Unbiased", desc: "As an independent firm, we offer unbiased, objective and impartial advice. We make recommendations right for your business — at your budget." },
                { icon: Shield, color: "#93c5fd", title: "Full Risk Assessment", desc: "We take the time to understand your needs and your environment as well as a full risk assessment to ensure our officers fit your requirements." },
                { icon: TrendingUp, color: "#6ee7b7", title: "Above-Average Training", desc: "We implement stringent training for our entire force over and above the average, ensuring a disciplined, well-prepared security workforce." },
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <p.icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold mb-1">{p.title}</div>
                    <div className="text-white/50 text-xs leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(160deg,#fef2f2,#fafafa,#eff6ff)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl text-gray-900 mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>Driven by Values, Delivered with Excellence</h2>
            <p className="text-gray-500 mb-8">Experience security services built on a foundation of purpose, professionalism, and genuine care for your safety.</p>
            <button onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}