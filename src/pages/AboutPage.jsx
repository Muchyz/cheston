import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Shield, Cpu, Users, Globe, Award, ArrowRight, CheckCircle, Eye, Target, TrendingUp, BadgeCheck, FileCheck, BookOpen } from "lucide-react";

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

export default function AboutPage() {
  const navigate = useNavigate();
  const points = [
    { icon: Shield, color: "#dc2626", bg: "#fef2f2", label: "Licensed & Compliant", desc: "Fully compliant with all Kenyan regulatory requirements. Zero-tolerance on corruption." },
    { icon: Cpu, color: "#1e3a8a", bg: "#eff6ff", label: "Innovation-Driven", desc: "Continuously investing in technology and our people to bring the very best security solutions." },
    { icon: Users, color: "#15803d", bg: "#f0fdf4", label: "Disciplined Personnel", desc: "Senior management with Disciplined Forces experience and military-grade training standards." },
    { icon: Globe, color: "#b45309", bg: "#fffbeb", label: "East Africa Vision", desc: "Serving Kenya today and targeting strategic expansion across East Africa markets." },
    { icon: Award, color: "#7c3aed", bg: "#f5f3ff", label: "35+ Years Leadership", desc: "General Manager with over 35 years in the security industry and Professional Association membership." },
    { icon: TrendingUp, color: "#0891b2", bg: "#ecfeff", label: "International Partnerships", desc: "Partnered with international companies to equip our clients with globally benchmarked solutions." },
  ];

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ minHeight: "320px", background: "linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">
            About CHESTON Security
          </span>
          <h1 className="text-5xl md:text-6xl text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Protecting Kenya<br />
            <span style={{ background: "linear-gradient(135deg,#fca5a5,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              with Purpose
            </span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">A Kenyan company dedicated to the provision of excellent security services since inception.</p>
        </div>
      </div>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "5/4" }}>
                <img src="/director-duncan.jpg" alt="John Kamau — K9 Unit Officer"
                  className="w-full h-full object-cover object-top"
                  onError={e => { e.target.style.background = "#e2e8f0"; }} />
              </div>
              <div className="absolute top-4 left-4 z-10 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">35+ Years</div>
                  <div className="text-xs text-gray-400">GM Experience</div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-6 w-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white" style={{ aspectRatio: "3/2" }}>
                <img src="/vip-vehicle.jpg" alt="VIP Protection"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.background = "#f1f5f9"; }} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">Who We Are</span>
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-5 leading-tight" style={{ fontFamily: "'DM Serif Display',serif" }}>
                Kenya's Most <span style={{ color: "#dc2626" }}>Trusted</span> Security Partner
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed mb-8">
                <p>CHESTON security solutions limited is a Kenyan company dedicated to the provision of excellent security services. We are capable of dealing with all your security needs and offer a complete range of planning, system analysis and design as well as executive services.</p>
                <p>Driven by our vision, mission and values — our commitment to uphold compliance and zero-tolerance approach on corruption signals how we operate: ethically and responsibly. We partner with international companies to equip our clients with the best solutions available.</p>
                <p>Our Management is complemented by reputable managers with years of experience in the security industry. Our General Manager boasts of over <span className="font-semibold text-gray-700">35 years experience</span> in the industry, with a foot in training and membership in the industry's Professional Association.</p>
                <p>We will never compromise on the quality of our service as we keep on innovating to bring the best one can hope for. This is also why we invest significantly in the continuous development of our employees.</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => navigate("/contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                  Work With Us <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => navigate("/director")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  Director's Message <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#f8fafc,#ffffff)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">What Sets Us Apart</span>
              <h2 className="text-4xl md:text-5xl text-gray-900" style={{ fontFamily: "'DM Serif Display',serif" }}>
                Built on <span style={{ color: "#dc2626" }}>Excellence</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {points.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 group" style={{ cursor: "default" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: p.bg }}>
                    <p.icon className="w-6 h-6" style={{ color: p.color }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{p.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24" style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">Core Values</span>
              <h2 className="text-4xl md:text-5xl text-white" style={{ fontFamily: "'DM Serif Display',serif" }}>
                What We <span style={{ background: "linear-gradient(135deg,#fca5a5,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Stand For</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, color: "#fca5a5", title: "Safety and Quality", desc: "Safety and quality are the top priorities considered as we render every service to our clients. We never compromise." },
              { icon: Users, color: "#93c5fd", title: "Commitment to People Development", desc: "We strive to work as a team so as to create value to the customer and invest in employee growth and career development." },
              { icon: Award, color: "#6ee7b7", title: "Professionalism", desc: "As a company we are always determined to constantly achieve high standards in everything we do and have. Excellence is non-negotiable." },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-3xl text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <v.icon className="w-8 h-8" style={{ color: v.color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{v.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl text-gray-900 mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>Ready to Secure Your Premises?</h2>
            <p className="text-gray-500 mb-8">Contact our team today for a free, no-obligation security assessment tailored to your specific needs.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                Get Free Assessment <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate("/services")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                View Our Services
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}