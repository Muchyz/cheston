import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Shield, Users, Award, CheckCircle, ArrowRight, BadgeCheck, FileCheck, BookOpen, Star } from "lucide-react";

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

export default function TeamPage() {
  const navigate = useNavigate();

  const credentials = [
    { icon: BadgeCheck, color: "#dc2626", bg: "#fef2f2", title: "National Police Clearance", desc: "All our personnel hold valid National Police Clearance certificates, ensuring you engage only vetted, trustworthy officers." },
    { icon: FileCheck, color: "#1e3a8a", bg: "#eff6ff", title: "Security Consultant License", desc: "Our management team is fully licensed as Security Consultants, qualified to design and advise on comprehensive security solutions." },
    { icon: Shield, color: "#7c3aed", bg: "#f5f3ff", title: "Security Installers License", desc: "Certified Security Installers on staff ensure all electronic systems are installed to industry-standard specifications." },
    { icon: BookOpen, color: "#15803d", bg: "#f0fdf4", title: "Additional Licenses — CFE", desc: "Our team holds additional specialised licenses including CFE (Certified Fraud Examiner), reflecting commitment to excellence." },
  ];

  const traits = [
    "Reputable managers with decades of field experience",
    "Active trainers & members of the Professional Association",
    "In-depth perspective of Kenyan security trends & conditions",
    "Knowledge continuously passed on to all personnel",
    "Disciplined Forces experience at senior management level",
    "Stringent training standards above industry average",
    "Rigorous vetting processes for all new hires",
    "Continuous professional development programmes",
  ];

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "340px" }}>
        <img src="/officers-squad.jpg" alt="CHESTON Security Team"
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.target.style.background = "#0f172a"; }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(15,23,42,0.92),rgba(30,27,75,0.88))" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
          <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">Our Team</span>
          <h1 className="text-5xl md:text-6xl text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Certified, Vetted &<br />
            <span style={{ background: "linear-gradient(135deg,#fca5a5,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Professionally Trained
            </span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">Every member of our force holds the qualifications required to deliver trusted, professional security services.</p>
        </div>
      </div>

      {/* Credentials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Credentials & Licenses</span>
              <h2 className="text-4xl text-gray-900" style={{ fontFamily: "'DM Serif Display',serif" }}>Qualified at Every Level</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {credentials.map((c, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 text-center group">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform" style={{ background: c.bg }}>
                    <c.icon className="w-8 h-8" style={{ color: c.color }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3">{c.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Leadership Banner */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl overflow-hidden relative shadow-2xl mb-16" style={{ minHeight: "280px" }}>
              <img src="/officers-squad.jpg" alt="CHESTON Security Leadership"
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => { e.target.style.background = "#0f172a"; }} />
              <div className="relative z-10 grid md:grid-cols-2"
                style={{ background: "linear-gradient(90deg,rgba(15,23,42,0.94),rgba(30,58,138,0.78))" }}>
                <div className="p-12 md:p-16">
                  <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5 border border-white/20">Management Edge</span>
                  <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
                    35+ Years of Industry Leadership
                  </h2>
                  <p className="text-white/75 text-sm leading-relaxed">
                    Our General Manager brings over 35 years of experience in the security industry, serving both as a practitioner and as a trainer and member of the industry's Professional Association. This depth of knowledge filters down through every rank of our organisation.
                  </p>
                </div>
                <div className="p-12 md:p-16 flex flex-col justify-center gap-4">
                  {traits.slice(0, 4).map((b, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                      <CheckCircle className="w-4 h-4 text-white shrink-0" />
                      <span className="text-white/85 text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Personnel Strength */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div>
                <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">Our Personnel</span>
                <h2 className="text-4xl text-gray-900 mb-5" style={{ fontFamily: "'DM Serif Display',serif" }}>
                  Our People Are<br /><span style={{ color: "#dc2626" }}>Our Strength</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-5">Our senior management has Disciplined Forces experience and have used this knowledge to pass it onto other personnel. This has helped in acquiring an in-depth perspective of Kenyan trends and conditions.</p>
                <p className="text-gray-500 leading-relaxed mb-8">Our personnel have and will continue to acquire the professional knowledge and skills required to perform their tasks and will implement them while striving continuously to perfect their personal and collective achievements.</p>
                <div className="grid grid-cols-2 gap-3">
                  {traits.slice(4).map((t, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                  <img src="/officers-squad.jpg" alt="Security team"
                    className="w-full h-full object-cover"
                    onError={e => { e.target.style.background = "#e2e8f0"; }} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { val: "35+", label: "Years GM Experience" },
                    { val: "100%", label: "Background Checked" },
                    { val: "24/7", label: "On Duty Support" },
                  ].map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl text-center bg-white border border-gray-100 shadow-sm">
                      <div className="text-2xl font-bold text-red-600 mb-1">{s.val}</div>
                      <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
              Trust Your Security to the Best
            </h2>
            <p className="text-white/60 mb-8">Contact us today for a free site assessment. Our team will design a security solution perfectly matched to your needs.</p>
            <button onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}>
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}