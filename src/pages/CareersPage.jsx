import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Shield, Users, Award, CheckCircle, ArrowRight, Mail, Phone, Star, BookOpen } from "lucide-react";

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

export default function CareersPage() {
  const navigate = useNavigate();

  const benefits = [
    { icon: Shield, color: "#dc2626", bg: "#fef2f2", title: "Competitive Packages", desc: "We offer competitive remuneration that rewards performance and dedication to your role." },
    { icon: BookOpen, color: "#1e3a8a", bg: "#eff6ff", title: "Continuous Training", desc: "We invest significantly in the continuous development of all our employees' talents and skills." },
    { icon: Users, color: "#15803d", bg: "#f0fdf4", title: "Respectful Workplace", desc: "We are committed to providing all employees with a respectful, inclusive workplace environment." },
    { icon: Star, color: "#b45309", bg: "#fffbeb", title: "Career Growth", desc: "Clear career pathways and development opportunities for high-performing team members." },
    { icon: Award, color: "#7c3aed", bg: "#f5f3ff", title: "Professional Memberships", desc: "Support for professional association membership and industry certification programmes." },
    { icon: CheckCircle, color: "#0891b2", bg: "#ecfeff", title: "Disciplined Culture", desc: "A professional environment built on military-grade discipline, integrity, and teamwork." },
  ];

  const roles = [
    { title: "Security Guard / Officer", type: "Full-Time", location: "Nairobi & Surrounds", desc: "Uniformed guarding roles across residential, corporate and commercial sites. Prior discipline forces experience preferred." },
    { title: "Armed Response Officer", type: "Full-Time", location: "Nairobi", desc: "Tactical response vehicle operator. Valid driving licence and clean police clearance required." },
    { title: "CCTV & Systems Technician", type: "Full-Time", location: "Nairobi", desc: "Installation and maintenance of security systems including CCTV, electric fencing, and access control." },
    { title: "VIP Protection Operative", type: "Full-Time", location: "Nationwide", desc: "Close protection for high-profile clients and government personnel. High level of fitness and discretion required." },
    { title: "Area Supervisor", type: "Full-Time", location: "Nairobi", desc: "Supervise and manage deployed guards across multiple client sites. Leadership experience required." },
    { title: "Control Room Operator", type: "Shift Work", location: "Nairobi", desc: "24/7 control room monitoring, alarm response coordination, and communication with field teams." },
  ];

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "340px" }}>
        
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(15,23,42,0.92),rgba(30,27,75,0.88))" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
          <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">Careers</span>
          <h1 className="text-5xl md:text-6xl text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Join the Cheston<br />
            <span style={{ background: "linear-gradient(135deg,#fca5a5,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Security Family
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl">We are always looking for disciplined, professional, and committed individuals to join our growing team.</p>
        </div>
      </div>

      {/* Why Join Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Why Join Us</span>
              <h2 className="text-4xl text-gray-900" style={{ fontFamily: "'DM Serif Display',serif" }}>
                Build Your Career at <span style={{ color: "#dc2626" }}>Cheston</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                We invest significantly in developing the talents of our employees continuously. Our people are our greatest strength.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((b, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="p-7 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: b.bg }}>
                    <b.icon className="w-6 h-6" style={{ color: b.color }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Open Roles */}
          <Reveal delay={0.1}>
            <div className="text-center mb-10">
              <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Open Positions</span>
              <h2 className="text-4xl text-gray-900" style={{ fontFamily: "'DM Serif Display',serif" }}>Current Opportunities</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {roles.map((r, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="p-7 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-lg">{r.title}</h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-700 shrink-0 ml-3">{r.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {r.location}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{r.desc}</p>
                  <a href="mailto:Chestonguardservices@gmail.com?subject=Application: CHESTON Security"
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "#dc2626" }}>
                    Apply via Email <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* How to Apply */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl overflow-hidden relative shadow-2xl" style={{ minHeight: "240px" }}>
              
              <div className="relative z-10 p-12 md:p-16" style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.90),rgba(30,58,138,0.84))" }}>
                <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>How to Apply</h2>
                <p className="text-white/80 mb-6 max-w-xl">Send your CV and a brief cover letter to our HR team. Please indicate the position you're applying for in the subject line.</p>
                <div className="flex flex-wrap gap-4">
                  <a href="mailto:Chestonguardservices@gmail.com?subject=Job Application - CHESTON Security"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white text-red-700 hover:-translate-y-0.5 transition-all shadow-md">
                    <Mail className="w-4 h-4" /> Email Your Application
                  </a>
                  <a href="tel:+254702396783"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10 transition-all">
                    <Phone className="w-4 h-4" /> Call HR: 0702 396 783
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}