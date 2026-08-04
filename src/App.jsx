import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, Link, useLocation } from "react-router-dom";
import {
  Shield, Camera, Bell, UserCheck, Lock, Car, Zap,
  Users, Globe, Award, ChevronRight, ArrowRight,
  Phone, Mail, MapPin, Menu, X, MessageCircle,
  Building, Home, ShoppingBag, Factory, Mic,
  CheckCircle, TrendingUp, Eye, Cpu, BarChart3,
  Play, ChevronDown, Send, Quote,
  Activity, Layers, Radio, Star, Target, BadgeCheck, FileCheck, BookOpen
, User } from "lucide-react";

// ── page imports ──
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import DirectorPage from "./pages/DirectorPage";
import VisionMissionPage from "./pages/VisionMissionPage";
import TeamPage from "./pages/TeamPage";
import ClientsPage from "./pages/ClientsPage";
import ContactPage from "./pages/ContactPage";
import CareersPage from "./pages/CareersPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPage from "./pages/PrivacyPage";
import GalleryPage from "./pages/GalleryPage";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Dancing+Script:wght@600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Barlow', sans-serif; font-weight: 500; background: #ffffff; color: #0f172a; overflow-x: hidden; }
    h1,h2,h3 { font-family: 'Oswald', sans-serif; letter-spacing: 0.02em; font-weight: 700; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
    .animate-fadeUp { animation: fadeUp 0.65s ease both; }
    .animate-fadeIn { animation: fadeIn 0.5s ease both; }
    .animate-float { animation: float 4s ease-in-out infinite; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px -12px rgba(0,0,0,0.14); }
    input:focus, textarea:focus, select:focus { outline: none; border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
  `}</style>
);

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

function Counter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ── NAVBAR ── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Links: label → anchor id (for home page scroll) OR route path
  const links = [
    { label: "Home", action: () => { navigate("/"); setTimeout(() => scrollTo("hero"), 100); } },
    { label: "About", action: () => { navigate("/about"); } },
    { label: "Services", action: () => { navigate("/services"); } },
    { label: "Why Us", action: () => { navigate("/"); setTimeout(() => scrollTo("why-us"), 100); } },
    { label: "Clients", action: () => { navigate("/clients"); } },
    { label: "Contact", action: () => { navigate("/contact"); } },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(226,232,240,0.8)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
      }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => { navigate("/"); setTimeout(() => scrollTo("hero"), 100); }}>
          <img src="/logo.png" alt="CHESTON Security" style={{ height: "88px", objectFit: "contain" }} />
        </button>
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button key={l.label} onClick={() => { l.action(); setOpen(false); }}
              className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">{l.label}</button>
          ))}
          <button onClick={() => navigate("/contact")}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
            Get a Quote
          </button>
        </div>
        <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
          {links.map((l) => (
            <button key={l.label} onClick={() => { l.action(); setOpen(false); }}
              className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">{l.label}</button>
          ))}
          <button onClick={() => { navigate("/contact"); setOpen(false); }}
            className="w-full mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
            Get a Free Quote
          </button>
        </div>
      )}
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  const navigate = useNavigate();
  return (
    <section id="hero" className="relative flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(160deg,#fef2f2 0%,#fafafa 45%,#eff6ff 100%)", minHeight: "100svh" }}>
      {/* Blobs */}
      <div className="absolute top-10 -left-20 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg,#fecaca,#bfdbfe)" }} />
      <div className="absolute bottom-32 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg,#fca5a5,#93c5fd)" }} />
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle,#94a3b8 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Main Content */}
      <div className="relative flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-5 pt-24 pb-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            {/* Badge */}
            <div className="animate-fadeUp inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-5 border border-red-200"
              style={{ background: "linear-gradient(135deg,#fef2f2,#fff1f2)", color: "#dc2626" }}>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Your Security is Our Priority!
            </div>

            {/* Heading */}
            <h1 className="animate-fadeUp delay-100 text-4xl sm:text-5xl lg:text-7xl leading-[1.1] text-gray-900 mb-4">
              Kenya's Premier<br />
              <span style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Security
              </span><br />Solutions
            </h1>

            {/* Accent line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 w-10 rounded-full" style={{ background: "linear-gradient(90deg,#dc2626,#1e3a8a)" }} />
              <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Est. in Kenya</span>
            </div>

            {/* Subtext */}
            <p className="animate-fadeUp delay-200 text-sm sm:text-base text-gray-500 leading-relaxed mb-5 max-w-lg">
              CHESTON Security is dedicated to the provision of excellent security services. We offer a complete range of planning, system analysis, design and executive protection services across Kenya.
            </p>

            {/* Buttons */}
            <div className="animate-fadeUp delay-300 flex flex-row gap-2 mb-5">
              <button onClick={() => navigate("/contact")}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(135deg,#dc2626,#7f1d1d)" }}>
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate("/services")}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-gray-700 text-sm border border-gray-200 hover:border-red-200 hover:text-red-700 hover:-translate-y-0.5 transition-all"
                style={{ background: "rgba(255,255,255,0.9)" }}>
                <Play className="w-3.5 h-3.5 text-red-600" /> Our Services
              </button>
            </div>

            {/* Glass Badges */}
            <div className="animate-fadeUp delay-400 grid grid-cols-3 gap-2">
              {[
                { icon: Activity, color: "#dc2626", bg: "linear-gradient(135deg,rgba(220,38,38,0.08),rgba(220,38,38,0.04))", border: "rgba(220,38,38,0.20)", label: "Control Room", val: "24/7 Active" },
                { icon: Shield, color: "#1e3a8a", bg: "linear-gradient(135deg,rgba(30,58,138,0.08),rgba(30,58,138,0.04))", border: "rgba(30,58,138,0.20)", label: "Response", val: "Swift & Sure" },
                { icon: Users, color: "#15803d", bg: "linear-gradient(135deg,rgba(21,128,61,0.08),rgba(21,128,61,0.04))", border: "rgba(21,128,61,0.20)", label: "Officers", val: "300+ Strong" },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl border"
                  style={{
                    background: b.bg,
                    borderColor: b.border,
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    boxShadow: `0 2px 16px ${b.border}, inset 0 1px 0 rgba(255,255,255,0.6)`
                  }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-0.5"
                    style={{ background: `${b.border}` }}>
                    <b.icon className="w-4 h-4" style={{ color: b.color }} />
                  </div>
                  <div className="font-bold text-gray-800 text-xs text-center leading-tight">{b.val}</div>
                  <div className="text-gray-400 text-[10px] text-center">{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop right column */}
          <div className="animate-fadeIn delay-200 relative hidden lg:block">
            <div className="animate-float absolute -left-8 top-16 z-20 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-red-50">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Activity className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium">Control Room</div>
                <div className="text-sm font-bold text-gray-900">Active 24/7</div>
              </div>
            </div>
            <div className="animate-float absolute -right-4 bottom-24 z-20 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-blue-50"
              style={{ animationDelay: "1s" }}>
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-800" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium">Response Time</div>
                <div className="text-sm font-bold text-gray-900">Swift & Reliable</div>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
              <img src="/hero-officers.jpg" alt="CHESTON Security Officers"
                className="w-full h-full object-cover"
                onError={e => { e.target.style.background="#e2e8f0"; }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top right,rgba(220,38,38,0.15),transparent)" }} />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full border-2 border-dashed border-red-200 opacity-60" />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10"
        style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#7f1d1d 100%)" }}>
        <div className="px-4 py-6 grid grid-cols-3">
          {[
            { val: "200+", label: "Clients Served", icon: Shield, border: true },
            { val: "24/7", label: "Control Room", icon: Eye, border: true },
            { val: "100%", label: "Commitment", icon: CheckCircle, border: false },
          ].map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5 py-1"
              style={{ borderRight: s.border ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
              <s.icon className="w-4 h-4 text-white/40" />
              <div className="text-2xl font-bold text-white leading-none">{s.val}</div>
              <div className="text-white/55 text-[10px] font-semibold tracking-widest uppercase text-center leading-tight px-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const points = [
    { icon: Shield, color: "#dc2626", bg: "#fef2f2", label: "Licensed & Compliant", desc: "Fully compliant with Kenyan regulations and committed to zero-tolerance on corruption." },
    { icon: Cpu, color: "#1e3a8a", bg: "#eff6ff", label: "Innovation-Driven", desc: "Continuously investing in technology and our people to bring the best solutions." },
    { icon: Users, color: "#15803d", bg: "#f0fdf4", label: "Disciplined Personnel", desc: "Senior management with Disciplined Forces experience. Military-grade training standards." },
    { icon: Globe, color: "#b45309", bg: "#fffbeb", label: "East Africa Vision", desc: "Serving Kenya and targeting expansion across East Africa markets." },
  ];
  return (
    <section id="about" className="pt-28 pb-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <Reveal>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative" style={{ aspectRatio: "5/4" }}>
              <img src="/about-main.jpg"
                alt="John Kamau — K9 Unit Officer" className="w-full h-full object-cover object-top cursor-pointer"
                onClick={() => setSelected({src:"/about-main.jpg",caption:"CHESTON Security Team"})}
                onError={e => { e.target.style.background="#e2e8f0"; }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2"
                style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">35+ Years</div>
                  <div className="text-xs text-white/70">GM Experience</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
                <img src="/about-action.jpg" alt="Security in action" onClick={() => setSelected({src:"/about-action.jpg",caption:"Security in action"})}
                  className="w-full h-full object-cover object-top cursor-pointer"
                  onError={e => { e.target.style.background="#f1f5f9"; }} />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
                <img src="/about-gate.jpg" alt="Gate security" onClick={() => setSelected({src:"/about-gate.jpg",caption:"Gate security"})}
                  className="w-full h-full object-cover object-center cursor-pointer"
                  onError={e => { e.target.style.background="#f1f5f9"; }} />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
                <img src="/gallery-vip-new.jpg" alt="Suiting Up for Service" onClick={() => setSelected({src:"/gallery-vip-new.jpg",caption:"Suiting Up for Service"})}
                  className="w-full h-full object-cover object-top cursor-pointer"
                  onError={e => { e.target.style.background="#f1f5f9"; }} />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
                <img src="/gallery-briefing.jpg" alt="Pre-Shift Briefing" onClick={() => setSelected({src:"/gallery-briefing.jpg",caption:"Pre-Shift Briefing"})}
                  className="w-full h-full object-cover object-top cursor-pointer"
                  onError={e => { e.target.style.background="#f1f5f9"; }} />
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button onClick={() => navigate("/gallery")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-md hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                <Camera className="w-4 h-4" /> View Photo Gallery
              </button>
            </div>
            <div className="absolute -top-5 -left-5 w-20 h-20 rounded-2xl opacity-15"
              style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }} />

          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div>
            <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              About CHESTON Security
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-5 leading-tight">
              Protecting Kenya<br />with <span style={{ color: "#dc2626" }}>Purpose</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              CHESTON security solutions limited is a Kenyan company dedicated to the provision of excellent security services. We are capable of dealing with all your security needs and offer a complete range of planning, system analysis and design as well as executive services.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              Driven by our vision, mission and values — our commitment to uphold compliance and zero-tolerance approach on corruption signals how we operate: ethically and responsibly. We partner with international companies to equip our clients with the best solutions available.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Our Management is complimented by reputable managers with years of experience in the security industry. Our General Manager boasts of over <span className="font-semibold text-gray-700">35 years experience</span> in the industry, with a foot in training and membership in the industry's Professional Association.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {points.map((p, i) => (
                <div key={i} className="p-4 rounded-2xl hover:shadow-lg transition-all duration-200 overflow-hidden border-t-4"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderTopColor: p.color,
                    boxShadow: `0 4px 20px 0 ${p.color}20`,
                  }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 mx-auto"
                    style={{ background: p.bg }}>
                    <p.icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <div className="text-sm font-bold text-gray-800 mb-1 text-center">{p.label}</div>
                  <div className="text-xs text-gray-500 leading-snug text-center">{p.desc}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                Work With Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{zIndex:9999,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(8px)"}} onClick={() => setSelected(null)}>
          <div className="w-full max-w-md relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute -top-3 -right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-xl font-bold text-white transition-all hover:scale-110" style={{background:"linear-gradient(135deg,#dc2626,#1e3a8a)"}}>&#x2715;</button>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
              <img src={selected.src} alt={selected.caption} className="w-full object-contain" style={{maxHeight:"75vh"}} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── DIRECTOR STATEMENT ── */
function Director() {
  const navigate = useNavigate();
  return (
    <section className="py-12 overflow-hidden" style={{ background: "linear-gradient(135deg,#1e1b4b,#0f172a)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-6">
            <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">
              Director Statement
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
              style={{ aspectRatio: "3/4", background: "#1e293b" }}>
              <User className="w-20 h-20 text-white/20" />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="text-red-400 opacity-60">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-white text-xl leading-relaxed font-medium">
                "Security is a promise you make to a client, and we take that promise seriously. Every officer we deploy carries the trust of the people and property they protect."
              </p>
              <p className="text-white/70 leading-relaxed">
                At Cheston Security Services Limited, we believe good security starts with good people. Our officers are carefully selected, properly trained, and supervised closely so that every deployment meets the standard our clients expect.
              </p>
              <p className="text-white/70 leading-relaxed">
                We work across residential, corporate, and industrial sites, tailoring each security plan to the specific risks and needs of the property. No two clients are the same, and we don't believe in one-size-fits-all solutions.
              </p>
              <p className="text-white/70 leading-relaxed">
                Integrity guides how we run this company — from how we treat our staff to how we deliver on our contracts. We're building Cheston to be a company our clients and our team can rely on for the long term.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-white font-bold text-lg">Benjamin Rotich</div>
                  <div className="text-red-400 text-sm font-medium">Director</div>
                  <div className="text-red-400 text-sm font-medium">Cheston Security Services Limited</div>
                </div>
                <button onClick={() => navigate("/director")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-all">
                  Full Statement <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── VISION & MISSION ── */
function VisionMission() {
  const navigate = useNavigate();
  const values = [
    { title: "Safety and Quality", desc: "Safety and quality are the top priorities considered as we render every service to our clients.", icon: Shield, color: "#dc2626", bg: "#fef2f2" },
    { title: "Commitment to People Development", desc: "We strive to work as a team so as to create value to the customer and invest in employee growth.", icon: Users, color: "#1e3a8a", bg: "#eff6ff" },
    { title: "Professionalism", desc: "As a company we are always determined to constantly achieve high standards in what we do and what we have.", icon: Award, color: "#15803d", bg: "#f0fdf4" },
  ];
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              Our Foundation
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Vision, Mission <span style={{ color: "#dc2626" }}>&amp; Values</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Reveal delay={0.05}>
            <div className="p-8 rounded-3xl border-2 border-red-100 bg-red-50 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-8 translate-x-8"
                style={{ background: "#dc2626" }} />
              <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the pre-eminent provider of integrated services protecting the assets of our clients in Kenya and targeted East Africa markets through the consistent achievement of excellence in every sphere of security provision and client service.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-8 rounded-3xl border-2 border-blue-100 bg-blue-50 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-8 translate-x-8"
                style={{ background: "#1e3a8a" }} />
              <div className="w-12 h-12 rounded-2xl bg-blue-800 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <ul className="space-y-3 text-gray-600">
                {[
                  "To ensure the client remains the focus and centre of our activities",
                  "To provide operational excellence",
                  "To stay up to date with innovation and tech around the security industry",
                  "To be the market leaders",
                  "To continually invest in employees growth",
                  "To maintain superior services that add value but remain affordable",
                  "To ensure operational areas are safe and secure for day to day activities",
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span className="text-sm">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mb-16 rounded-3xl overflow-hidden relative shadow-xl" style={{ minHeight: "220px" }}>
            <img src="/mission-team.jpg"
              alt="CHESTON Security Mission Team" className="w-full h-full object-cover absolute inset-0" style={{ height: "100%" }}
              onError={e => { e.target.style.background="#1e293b"; }} />
            <div className="relative z-10 p-10 md:p-14" style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.88),rgba(30,58,138,0.82))" }}>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>Mission Statement</h3>
              <p className="text-white/90 text-lg leading-relaxed mb-3 max-w-3xl">
                CHESTON Security is committed to providing exceptional services by delivering personalized, high-quality and cost efficient solutions to meet the needs of our clients.
              </p>
              <p className="text-white/75 leading-relaxed max-w-3xl">
                We strive to exceed the requests of our clients by going above and beyond what is asked to ensure that every detail is to your requirements.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mb-16 grid md:grid-cols-3 gap-6 p-8 rounded-3xl" style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
            <div className="md:col-span-3 mb-4">
              <h3 className="text-xl font-bold text-white">Why Choose CHESTON?</h3>
              <p className="text-white/50 text-sm mt-1">Since inception, CHESTON Security has delivered a wide range of security services. Our security packages are designed to cater for clients with respect to their specific needs and financial capabilities.</p>
            </div>
            {[
              { icon: Users, color: "#fca5a5", title: "Independent & Unbiased", desc: "As an independent firm, we offer unbiased, objective and impartial advice. We make recommendations right for your business — at your budget." },
              { icon: Shield, color: "#93c5fd", title: "Full Risk Assessment", desc: "We take the time to understand your needs and your environment as well as a full risk assessment to ensure our officers fit your requirements." },
              { icon: TrendingUp, color: "#6ee7b7", title: "Above-Average Training", desc: "We implement stringent training for our entire force over and above the average, ensuring a disciplined, well-prepared security workforce." },
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)" }}>
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

        <Reveal delay={0.15}>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Core Values</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white card-hover text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: v.bg }}>
                    <v.icon className="w-7 h-7" style={{ color: v.color }} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{v.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── SERVICES ── */
export const services = [
  {
    icon: Shield,
    title: "Guarding & Protection",
    slug: "guarding-protection",
    desc: "For several years, CHESTON Security has delivered superior guarding services. We value long-term relationships and take time to understand your needs and environment with a full risk assessment. Officers are uniformed, well equipped, and carry panic buttons linked to our control room.",
    color: "#dc2626", bg: "#fef2f2", gradient: "linear-gradient(135deg,#fef2f2,#fee2e2)", tag: "Most Popular",
    bullets: ["Uniformed & well equipped officers","Full risk assessment before deployment","Panic buttons linked to control room","Armed Reaction dispatched instantly"],
    photo: "guarding-dog.jpg",
    longDesc: "CHESTON Security has delivered superior guarding services for several years. We value long-term relationships with our clients and take the time to develop a strong understanding that results in quality security outcomes. While providing guarding services, we conduct a full risk assessment of your environment to ensure our security officers fit your exact requirements. All officers are duly uniformed and well-equipped. They carry panic buttons linked directly to our 24/7 control room — in the event of any problem, Armed Reaction assistance is dispatched immediately."
  },
  {
    icon: Car,
    title: "Armed Response",
    slug: "armed-response",
    desc: "Our Security company has a reliable fleet of tactical response vehicles manned by efficient, highly trained response officers. The response team is in constant communication with our control room so they can respond swiftly.",
    color: "#1e3a8a", bg: "#eff6ff", gradient: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    bullets: ["Reliable fleet of tactical vehicles","24/7 control room monitoring","Area-based rapid response","Works hand in hand with Kenya Police"],
    photo: "supervision-truck.jpg",
    longDesc: "Our Security company maintains a reliable fleet of tactical response vehicles manned by efficient, highly trained response officers. The response team is in constant communication with our control room so they can respond swiftly according to our policy and your instructions. Our modern, secure control room is manned around the clock ensuring that alarm activations are dealt with immediately. Being area-based, our armed response allows us to respond rapidly to every call-out, ensuring swift resolution. We also work hand in hand with the Kenyan Police to assist when required."
  },
  {
    icon: Camera,
    title: "Security Systems",
    slug: "security-systems",
    desc: "CHESTON Security incorporates monitoring solutions designed to fit any and all of your security needs. Our monitoring packages will bring you peace of mind knowing that your property is protected by a state of the art system installed by trained certified technicians.",
    color: "#7c3aed", bg: "#f5f3ff", gradient: "linear-gradient(135deg,#f5f3ff,#ede9fe)",
    bullets: ["Panic & alarm systems","Fingerprint readers & CCTV","Intercoms & surveillance cameras","Electric fencing"],
    photo: "security-systems.jpg",
    longDesc: "CHESTON Security incorporates monitoring solutions designed to fit any and all of your security needs. Our monitoring packages bring you peace of mind knowing that your property is protected by a state-of-the-art system installed by trained certified technicians. We also manage an in-house technical department which allows us to deal with technical issues promptly and efficiently. Through our skills and experience, we can analyse your property and provide improvements to your existing system. Systems we supply and install include: Panic systems, Alarm systems, Fingerprint readers, CCTV, Intercoms, Surveillance cameras, and Electric fencing.",
    subSystems: [
      {
        number: "01",
        title: "CCTV Installation & Maintenance",
        desc: "We provide end-to-end surveillance solutions that enhance monitoring and incident response.",
        color: "#7c3aed",
        bullets: ["Supply and installation of high-quality CCTV systems","24/7 surveillance capability","Integration with control rooms","Regular maintenance and system support"],
        photos: ["cctv-install.jpg","cctv-monitor.jpg"]
      },
      {
        number: "02",
        title: "Electric Fence Installation & Maintenance",
        desc: "We secure perimeters with reliable electric fencing systems that act as a strong deterrent to intrusions.",
        color: "#dc2626",
        bullets: ["Professional installation of electric fences","Routine inspection and maintenance","Enhanced perimeter protection","Reduced dependency on manual guarding"],
        photos: ["electric-fence.jpg"]
      },
      {
        number: "03",
        title: "Fingerprint & Biometric Readers",
        desc: "Advanced biometric access control systems ensuring only authorised personnel gain entry to your premises.",
        color: "#1e3a8a",
        bullets: ["Supply and installation of fingerprint readers","Multi-user enrollment and management","Integration with existing access control","Tamper alerts and audit trails"],
        photos: ["fingerprint-reader.jpg"]
      },
      {
        number: "04",
        title: "Intercom Systems",
        desc: "Professional intercom solutions for seamless communication and visitor management at all entry points.",
        color: "#15803d",
        bullets: ["Video and audio intercom systems","Gate and door release integration","Multi-apartment & office configurations","Remote access via smartphone"],
        photos: ["intercom-system.jpg"]
      },
    ]
  },
  {
    icon: UserCheck,
    title: "VIP & Executive Protection",
    slug: "vip-executive-protection",
    desc: "Our company offers top security for important clients and government personnel. Our operatives will act out of professionalism and devotion to their principals and will always go to their assistance when they are depended on despite any danger or difficulty.",
    color: "#15803d", bg: "#f0fdf4", gradient: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    bullets: ["Protection for VIPs & government personnel","Professionalism under any danger","Fully compliant with instructions","Dedicated to complete assigned tasks"],
    photo: "vip-team.jpg",
    longDesc: "CHESTON Security offers top-level protection for important clients and government personnel. Our operatives act out of professionalism and total devotion to their principals. They will always go to their assistance when called upon, despite any danger or difficulty. They strive to the best of their ability to fully and successfully complete all that is required of them according to instructions, company regulations, and their spirit of service. Our VIP protection team is specially trained, discreet, and prepared for every scenario."
  },
  {
    icon: Lock,
    title: "Access Control",
    slug: "access-control",
    desc: "Electronic access control systems, biometric readers, intercoms and electronic management for all facility types — from small offices to large industrial complexes. We also manage an in-house technical department which allows us to deal with technical issues forthwith and efficiently.",
    color: "#b45309", bg: "#fffbeb", gradient: "linear-gradient(135deg,#fffbeb,#fef3c7)",
    bullets: ["Biometric & electronic access","Intercoms & keypad systems","Suitable for all facility sizes","In-house technical support team"],
    photo: "security-systems.jpg",
    longDesc: "CHESTON Security provides comprehensive access control solutions for facilities of all types and sizes — from small offices to large industrial complexes. Our systems include electronic access control, biometric fingerprint readers, keypad systems, intercoms, and full electronic facility management. Our in-house technical department ensures any technical issues are resolved promptly and efficiently, minimising downtime and maintaining security integrity at all times."
  },
  {
    icon: Users,
    title: "Supervision & Management",
    slug: "supervision-management",
    photo: "supervision-officer.jpg",
    desc: "To ensure that guards complete their duties accordingly and in accordance with company policy and the clients instructions, CHESTON Security has Area Managers and Supervisors who will constantly check on the guards.",
    color: "#0891b2", bg: "#ecfeff", gradient: "linear-gradient(135deg,#ecfeff,#cffafe)",
    bullets: ["Dedicated Area Managers","Regular supervisor check-ins","Strict adherence to client instructions","Performance accountability"],
    photo: "supervision-officer.jpg",
    longDesc: "To ensure that all guards complete their duties in accordance with company policy and client instructions, CHESTON Security deploys dedicated Area Managers and Supervisors who conduct constant, unannounced checks on deployed personnel. This layer of management ensures accountability, consistent performance, and immediate corrective action whenever required. Our supervision structure means clients can trust that their site is never left to chance — every post is monitored and every officer is held to our high standards."
  },
];

function Services() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  return (
    <section id="services" className="py-28 overflow-hidden" style={{ background: "linear-gradient(180deg,#fafafa,#f8fafc)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
              Proven Track Record<br />Across the <span style={{ color: "#dc2626" }}>Full Spectrum</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We have the skills, experience and commitment required to be your preferred partner, service provider and supplier.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 gap-2 mb-12">
            {["Residential & Estates","Corporate","Commercial & Industrial","Oil & Gas","Banking & Finance","Health & Education","Government Agencies","Ports & Airports","Diplomatic","Events","Executive Protection","Access Control","CCTV & Surveillance","Electric Fencing","Alarm Systems","Retail Security","Door Supervision","Fingerprint & Biometrics"].map((tag,i) => (
              <span key={i} className="px-2 py-1 rounded-full text-xs font-semibold border text-center leading-tight"
                style={{ background: i % 3 === 0 ? "#fef2f2" : i % 3 === 1 ? "#eff6ff" : "#f0fdf4",
                  color: i % 3 === 0 ? "#dc2626" : i % 3 === 1 ? "#1e3a8a" : "#15803d",
                  borderColor: i % 3 === 0 ? "#fecaca" : i % 3 === 1 ? "#bfdbfe" : "#bbf7d0" }}>
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mb-10 rounded-3xl overflow-hidden relative shadow-2xl" style={{ minHeight: "280px" }}>
            <img src="/armed-officer.jpg" alt="Armed Security Officer Nairobi"
              className="w-full h-full object-cover absolute inset-0" style={{ height: "100%" }}
              onError={e => { e.target.style.background="#0f172a"; }} />
            <div className="relative z-10 grid md:grid-cols-2 gap-0" style={{ background: "linear-gradient(90deg,rgba(220,38,38,0.88) 0%,rgba(15,23,42,0.75) 100%)" }}>
              <div className="p-10 md:p-14">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-bold text-white mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Armed Response
                </div>
                <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>Armed Services</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  Our Security company has a reliable fleet of tactical response vehicles manned by efficient, highly trained response officers. The response team is in constant communication with our control room so they can respond swiftly according to our policy and your instructions.
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Our modern, secure control room is manned around the clock ensuring that alarm activations are dealt with immediately. We also work hand in hand with the Kenyan Police to assist when required.
                </p>
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-center gap-4">
                {["Reliable fleet of tactical response vehicles","24/7 secure control room monitoring","Area-based armed response teams","Coordination with Kenya Police"].map((b,i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                    <CheckCircle className="w-4 h-4 text-white shrink-0" />
                    <span className="text-white/90 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="relative rounded-2xl cursor-pointer overflow-hidden flex flex-col"
                style={{
                  background: "#fff",
                  border: `1.5px solid ${active === i ? s.color + "60" : "#f1f5f9"}`,
                  boxShadow: active === i ? `0 8px 32px ${s.color}22` : "0 2px 12px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  borderLeft: `4px solid ${s.color}`,
                }}
                onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                onClick={() => navigate(`/services/${s.slug}`)}>
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img src={`/${s.photo}`} alt={s.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500"
                    style={{ transform: active === i ? "scale(1.05)" : "scale(1)" }}
                    onError={e => { e.target.parentElement.style.background = s.bg; e.target.style.display="none"; }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }} />
                  {s.tag && (
                    <span className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white"
                      style={{ background: s.color }}>{s.tag}</span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{s.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: s.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">View Details</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                      style={{ background: active === i ? s.color : s.bg }}>
                      <ChevronRight className="w-4 h-4" style={{ color: active === i ? "#fff" : s.color }} />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="rounded-3xl overflow-hidden relative shadow-xl" style={{ height: "280px" }}>
            <img src="/supervision-truck.jpg"
              alt="CHESTON Security patrol vehicle" className="w-full h-full object-cover"
              onError={e => { e.target.style.background="#0f172a"; }} />
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.82),rgba(30,58,138,0.78))" }}>
              <div className="text-center text-white px-6">
                <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'DM Serif Display',serif" }}>
                  Tailored to Your Needs
                </h3>
                <p className="text-white/80 max-w-lg mb-6 text-sm">
                  Every security package is custom-designed to cater for clients with respect to their specific needs and financial capabilities.
                </p>
                <button onClick={() => navigate("/contact")}
                  className="px-6 py-3 rounded-xl font-semibold text-red-700 bg-white hover:-translate-y-0.5 transition-transform shadow-md">
                  Get a Free Assessment
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── WHY US ── */
function WhyUs() {
  const points = [
    { icon: Zap, color: "#dc2626", bg: "#fef2f2", title: "Swift Response", desc: "Reliable fleet of tactical response vehicles. Area-based response ensures rapid call-out resolution." },
    { icon: Users, color: "#1e3a8a", bg: "#eff6ff", title: "Disciplined Personnel", desc: "Senior management with Disciplined Forces experience. Stringent training above and beyond average standards." },
    { icon: Eye, color: "#7c3aed", bg: "#f5f3ff", title: "24/7 Control Room", desc: "Modern, secure control room manned around the clock. Alarm activations dealt with immediately." },
    { icon: Cpu, color: "#15803d", bg: "#f0fdf4", title: "Smart Technology", desc: "State of the art systems installed by trained certified technicians. In-house technical department." },
    { icon: Globe, color: "#b45309", bg: "#fffbeb", title: "Kenya-Wide Coverage", desc: "Serving clients across Kenya with vision to expand into targeted East Africa markets." },
    { icon: CheckCircle, color: "#0891b2", bg: "#ecfeff", title: "Unbiased Advice", desc: "Independent firm — we give objective, impartial advice and recommend only what is right for your business." },
    { icon: Layers, color: "#7c3aed", bg: "#f5f3ff", title: "Custom Packages", desc: "Security packages designed around your specific needs and financial capabilities." },
    { icon: TrendingUp, color: "#dc2626", bg: "#fef2f2", title: "International Standards", desc: "Partnered with international companies to equip our clients with the very best solutions available." },
  ];
  return (
    <section id="why-us" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/supervision-truck.jpg"
          alt="Security background" className="w-full h-full object-cover"
          onError={e => { e.target.style.background="#0f172a"; }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,27,75,0.92))" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">
              Why Cheston
            </span>
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              Excellence, Value for Money<br />
              <span style={{ background: "linear-gradient(135deg,#fca5a5,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                &amp; Innovation
              </span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              CHESTON Security is committed to providing exceptional services by delivering personalized, high-quality and cost efficient solutions to meet the needs of our clients.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {points.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 group card-hover"
                style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: p.bg }}>
                  <p.icon className="w-5 h-5" style={{ color: p.color }} />
                </div>
                <h4 className="text-white font-semibold text-sm mb-2">{p.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
                Our Personnel Are Our Strength
              </h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Our senior management has Disciplined Forces experience and have used this knowledge to pass it onto other personnel. This has helped in acquiring an in depth perspective of Kenyan trends and conditions.
              </p>
              <p className="text-white/70 leading-relaxed">
                Our personnel have and will continue to acquire the professional knowledge and skills required to perform their tasks and will implement them while striving continuously to perfect their personal and collective achievements.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
            </div>
              
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── TEAM ── */
function Team() {
  const credentials = [
    { icon: BadgeCheck, color: "#dc2626", bg: "#fef2f2", title: "National Police Clearance", desc: "All our personnel hold valid National Police Clearance certificates, ensuring you engage only vetted, trustworthy officers." },
    { icon: FileCheck, color: "#1e3a8a", bg: "#eff6ff", title: "Security Consultant License", desc: "Our management team is fully licensed as Security Consultants, qualified to design and advise on comprehensive security solutions." },
    { icon: Shield, color: "#7c3aed", bg: "#f5f3ff", title: "Security Installers License", desc: "Certified Security Installers on staff ensure that all electronic security systems are installed to industry-standard specifications." },
    { icon: BookOpen, color: "#15803d", bg: "#f0fdf4", title: "Additional Licenses — CFE", desc: "Our team holds additional specialised licenses including CFE (Certified Fraud Examiner), reflecting our commitment to professional excellence." },
  ];
  return (
    <section id="our-team" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Certified, Vetted &amp;<br />
              <span style={{ color: "#dc2626" }}>Professionally Trained</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our team is made up of professionals who have undergone standard and rigorous vetting processes. Every member of our force holds the qualifications required to deliver trusted, professional security services.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {credentials.map((c, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="p-7 rounded-3xl border border-gray-100 bg-white card-hover text-center group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform" style={{ background: c.bg }}>
                  <c.icon className="w-7 h-7" style={{ color: c.color }} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{c.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-3xl overflow-hidden relative shadow-2xl" style={{ minHeight: "260px" }}>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-0"
              style={{ background: "linear-gradient(90deg,rgba(15,23,42,0.92) 0%,rgba(30,58,138,0.75) 100%)" }}>
              <div className="p-10 md:p-14">
                <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5 border border-white/20">
                  Management Edge
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
                  35+ Years of Industry Leadership
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Our General Manager brings over 35 years of experience in the security industry, serving both as a practitioner and as a trainer and member of the industry's Professional Association. This depth of knowledge filters down through every rank of our organisation.
                </p>
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-center gap-4">
                {[
                  "Reputable managers with decades of field experience",
                  "Active trainers & members of the Professional Association",
                  "In-depth perspective of Kenyan security trends & conditions",
                  "Knowledge continuously passed on to all personnel",
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                    <CheckCircle className="w-4 h-4 text-white shrink-0" />
                    <span className="text-white/90 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── STATS ── */
function Stats() {
  const stats = [
    { val: 200, suffix: "+", label: "Clients Served", icon: Shield, color: "#dc2626", bg: "#fef2f2" },
    { val: 300, suffix: "+", label: "Security Officers", icon: Users, color: "#1e3a8a", bg: "#eff6ff" },
    { val: 7, suffix: "/7", label: "Days Control Room", icon: Eye, color: "#15803d", bg: "#f0fdf4" },
    { val: 100, suffix: "%", label: "Client Commitment", icon: BarChart3, color: "#b45309", bg: "#fffbeb" },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="relative p-8 rounded-3xl border border-gray-100 text-center overflow-hidden card-hover bg-white">
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-40" style={{ background: s.bg }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: s.bg }}>
                  <s.icon className="w-7 h-7" style={{ color: s.color }} />
                </div>
                <div className="text-4xl font-bold mb-1" style={{ color: s.color }}>
                  <Counter target={s.val} suffix={s.suffix} />
                </div>
                <div className="text-sm text-gray-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── CLIENTS ── */
function Clients() {
  const navigate = useNavigate();
  const clientList = [
    "Small, Medium & Large Businesses","Office and Professional Suites","Retail Shops, Cafes and Restaurants",
    "Corporate and Franchise Groups","Property Developers and Builders","Plant Operators and Managers",
    "Wholesale and Distribution Companies","Utility and Infrastructure Operators","Industrial Companies",
    "Government Agencies","Strata Property Managers","Schools, TAFEs, Universities",
    "Real Estate Agencies","Maintenance & Facility Management","Accommodation Providers",
    "Aged Care and Child Care Facilities","Residential Customers","Property Managers",
    "Business Operators with Multiple Sites","Shopping Centers","Local Councils","Medical Suites",
  ];
  const industries = [
    { icon: Building, title: "Corporate", color: "#1e3a8a", bg: "#eff6ff", photo: "sector-corporate.jpg", desc: "From SMEs to large corporations, we secure your office environments and corporate assets." },
    { icon: Home, title: "Residential & Estates", color: "#15803d", bg: "#f0fdf4", photo: "sector-residential.jpg", desc: "Protecting homes, gated communities and residential estates across Kenya." },
    { icon: ShoppingBag, title: "Retail Security", color: "#b45309", bg: "#fffbeb", photo: "sector-retail.jpg", desc: "Loss prevention, customer safety, and secure retail environments." },
    { icon: Factory, title: "Commercial & Industrial", color: "#7c3aed", bg: "#f5f3ff", photo: "sector-industrial.jpg", desc: "Securing factories, warehouses and industrial facilities around the clock." },
    { icon: Mic, title: "Events", color: "#0891b2", bg: "#ecfeff", photo: "sector-events.jpg", desc: "Crowd management, access control and safety for all event types." },
    { icon: Globe, title: "Government", color: "#dc2626", bg: "#fef2f2", photo: "sector-government.jpg", desc: "Trusted security for government facilities, agencies and public institutions." },
    { icon: Activity, title: "Health & Education", color: "#7c3aed", bg: "#f5f3ff", photo: "sector-health.jpg", desc: "Safe environments for hospitals, schools, colleges and universities." },
    { icon: Radio, title: "Ports & Airports", color: "#0891b2", bg: "#ecfeff", photo: "sector-ports.jpg", desc: "Perimeter security, access control and surveillance for ports and airports." },
    { icon: Shield, title: "Diplomatic", color: "#dc2626", bg: "#fef2f2", photo: "sector-diplomatic.jpg", desc: "Discreet, professional security for embassies and diplomatic missions." },
    { icon: Car, title: "Oil & Gas", color: "#b45309", bg: "#fffbeb", photo: "sector-oilgas.jpg", desc: "Protecting critical infrastructure, pipelines and energy facilities." },
    { icon: Lock, title: "Banking & Finance", color: "#1e3a8a", bg: "#eff6ff", photo: "sector-banking.jpg", desc: "Armed escorts, vault security and protection for financial institutions." },
    { icon: Star, title: "VIP & Executive", color: "#15803d", bg: "#f0fdf4", photo: "sector-vip.jpg", desc: "Close protection and motorcade security for executives and dignitaries." },
  ];
  return (
    <section id="clients" className="py-10" style={{ background: "linear-gradient(180deg,#f8fafc,#ffffff)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              Who We Serve
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Our <span style={{ color: "#dc2626" }}>Clients</span> &amp; Industries
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our invaluable experience provides all of our customers with a level of service and confidence unsurpassed in the industry.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {industries.map((item, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="rounded-2xl border border-gray-100 bg-white card-hover cursor-pointer transition-all overflow-hidden group"
                onMouseEnter={e => e.currentTarget.style.borderColor = item.color + "40"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#f1f5f9"}>
                <div className="relative overflow-hidden" style={{aspectRatio:"16/9"}}>
                  <img src={`/${item.photo}`} alt={item.title}
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    style={{background:"#f1f5f9"}}
                    onError={e => { e.target.parentElement.style.background = item.bg; e.target.style.display="none"; }} />
                  <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(0,0,0,0.55),transparent)"}} />
                  <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center" style={{background: item.color}}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">We Serve All Client Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {clientList.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#dc2626" }} />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-3xl overflow-hidden shadow-lg" style={{ height: "220px" }}>
              
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg" style={{ height: "220px" }}>
              <img src="/clients-officer.jpg" alt="CHESTON Security officer on duty"
                className="w-full h-full object-cover"
                onError={e => { e.target.style.background="#e2e8f0"; }} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-3xl overflow-hidden relative shadow-xl" style={{ height: "200px" }}>
            <img src="/hero-officers.jpg"
              alt="CHESTON Security team" className="w-full h-full object-cover"
              onError={e => { e.target.style.background="#0f172a"; }} />
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(15,23,42,0.75)" }}>
              <div className="text-center text-white px-6">
                <p className="text-white/90 text-xl max-w-2xl font-medium" style={{ fontFamily: "'DM Serif Display',serif" }}>
                  "We have a proven track record for excellence, value for money, innovation and experience across the entire security spectrum."
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://formspree.io/f/mlgkdeoo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };
  return (
    <section id="contact" className="overflow-hidden">
      <div className="relative h-64 md:h-80">
        <img src="/contact-officer.jpg" alt="Contact CHESTON Security"
          className="w-full h-full object-cover object-top"
          onError={e => { e.target.style.background="#0f172a"; }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.88),rgba(30,58,138,0.82))" }} />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">
              Contact Us
            </span>
            <h2 className="text-4xl md:text-5xl text-white mb-3" style={{ fontFamily: "'DM Serif Display',serif" }}>
              Let's Build Your<br />
              <span style={{ background: "linear-gradient(135deg,#fca5a5,#bfdbfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Security Plan
              </span>
            </h2>
            <p className="text-white/70 text-sm max-w-md">Free site assessment and custom quote. Our team responds within 2 hours.</p>
          </div>
        </div>
      </div>
      <div className="py-16" style={{ background: "linear-gradient(160deg,#fef2f2,#fafafa,#eff6ff)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <Reveal className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Request a Free Assessment</h3>
                    <p className="text-xs text-gray-400 mt-0.5">We respond within 2 hours</p>
                  </div>
                </div>
                {sent && (
                  <div className="mb-5 flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    Thank you! We'll reach out within 2 hours.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input type="text" placeholder="Your full name" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 bg-gray-50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Email *</label>
                      <input type="email" placeholder="you@example.com" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 bg-gray-50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label>
                      <input type="tel" placeholder="+254 7XX XXX XXX" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 bg-gray-50 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Service Required</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 transition-all">
                      <option value="">Select a service...</option>
                      {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Message</label>
                    <textarea rows={4} placeholder="Tell us about your security requirements..."
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 bg-gray-50 resize-none transition-all" />
                  </div>
                  <button type="submit"
                    className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all"
                    style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-2 space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ height: "180px" }}>
                
              </div>
              <div className="rounded-3xl p-6 space-y-3" style={{ background: "linear-gradient(160deg,#0f172a,#1e1b4b)" }}>
                <h4 className="text-white font-bold text-sm tracking-wide mb-3">Get In Touch</h4>
                {[
                  { icon: Phone, color: "#dc2626", bg: "#fef2f2", label: "Call Us", lines: [{text: "+254 702 396 783", href: "tel:+254702396783"}, {text: "+254 703 573 531", href: "tel:+254703573531"}] },
                  { icon: Mail, color: "#1e3a8a", bg: "#eff6ff", label: "Email Us", lines: [{text: "chestonsecsolutions@gmail.com", href: "mailto:chestonsecsolutions@gmail.com"}, {text: "info@chestonsecurity.co.ke", href: "mailto:info@chestonsecurity.co.ke"}] },
                  { icon: MapPin, color: "#15803d", bg: "#f0fdf4", label: "Our Office", lines: [{text: "P.O. Box 82, Serem, Lavington Hope Center, Ambosel Road", href: null}] },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: c.bg }}>
                      <c.icon className="w-3.5 h-3.5" style={{ color: c.color }} />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs font-bold tracking-widest uppercase">{c.label}</div>
                      {c.lines.map(l => l.href ? <a key={l.text} href={l.href} className="text-white/85 text-xs font-medium leading-snug hover:text-white transition-colors block">{l.text}</a> : <div key={l.text} className="text-white/85 text-xs font-medium leading-snug">{l.text}</div>)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-15 bg-white" />
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white/70 text-xs font-bold tracking-widest uppercase">Emergency Line</span>
                </div>
                <a href="tel:+254702396783" className="text-3xl font-black text-white hover:opacity-80 transition-opacity block">0702 396 783</a>
                <div className="text-white/60 text-xs mt-0.5">Available 24 hours, 7 days a week</div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Zap, label: "2hr Response" },
                  { icon: Shield, label: "Free Quote" },
                  { icon: CheckCircle, label: "No Obligation" },
                ].map((t, i) => (
                  <div key={i} className="p-3 rounded-2xl text-center bg-white border border-gray-100 shadow-sm">
                    <t.icon className="w-4 h-4 mx-auto mb-1 text-red-500" />
                    <div className="text-xs font-semibold text-gray-700">{t.label}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl p-5 bg-white border border-gray-100 shadow-sm">
                <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">Follow Us</div>
                <div className="flex items-center gap-3">
                  <a href="https://www.facebook.com/profile.php?id=100091385217439" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "#1877f2" }} title="Facebook">
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/chestonsecuritysolutions?igsh=MWgxdnBpMTFlNzllcg==" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }} title="Instagram">
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://vm.tiktok.com/ZS92xC6mWpPNg-Dubhw/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "#010101", border: "1px solid #333" }} title="TikTok">
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                    </svg>
                  </a>
                  <a href="https://wa.me/254783046972" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }} title="WhatsApp">
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  const navigate = useNavigate();
  const links = {
    "Company": [
      { label: "About Us", path: "/about" },
      { label: "Director Statement", path: "/director" },
      { label: "Careers", path: "/careers" },
      { label: "Gallery", path: "/gallery" },
    ],
    "Services": services.map(s => ({ label: s.title, path: `/services/${s.slug}` })),
    "Support": [
      { label: "Contact Us", path: "/contact" },
      { label: "Request a Quote", path: "/contact" },
      { label: "FAQs", path: "/faq" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  };
  return (
    <footer style={{ background: "#0f172a" }}>
      <div className="relative h-40 overflow-hidden">
        <img src="/nairobi-cover.jpg" alt="Nairobi skyline"
          className="w-full h-full object-cover object-top opacity-30"
          onError={e => { e.target.style.display="none"; }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, #0f172a 100%)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <img src="/logo.png" alt="CHESTON Security" style={{ height: "72px", objectFit: "contain" }} />
            </div>
            <div className="text-white/40 text-xs tracking-widest uppercase">Your Security is Our Priority</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Kenya's premier security company. Protecting homes, businesses and enterprises with excellence, innovation and commitment.
            </p>
            <div className="text-gray-500 text-xs space-y-1">
              <div>P.O. Box 82, Serem, Lavington Hope Center, Ambosel Road</div>
              <div><a href="tel:+254702396783" className="hover:text-red-400 transition-colors">+254 702 396 783</a> | <a href="tel:+254703573531" className="hover:text-red-400 transition-colors">+254 703 573 531</a></div>
              <a href="mailto:info@chestonsecurity.co.ke" className="hover:text-red-400 transition-colors">info@chestonsecurity.co.ke</a>
            </div>
          </div>
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h5 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">{heading}</h5>
              <ul className="space-y-2.5">
                {items.slice(0, 6).map(item => (
                  <li key={item.label}>
                    <button onClick={() => navigate(item.path)}
                      className="text-gray-500 text-sm hover:text-red-400 transition-colors flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a href="https://www.facebook.com/profile.php?id=100091385217439" target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-90"
            style={{ background: "#1877f2" }} title="Facebook">
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/chestonsecuritysolutions?igsh=MWgxdnBpMTFlNzllcg==" target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-90"
            style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }} title="Instagram">
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://vm.tiktok.com/ZS92xC6mWpPNg-Dubhw/" target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-90"
            style={{ background: "#010101", border: "1px solid #333" }} title="TikTok">
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
            </svg>
          </a>
          <a href="https://wa.me/254783046972" target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }} title="WhatsApp">
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} CHESTON security solutions limited. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-500 text-xs">All systems operational</span>
          </div>
          <p className="text-gray-600 text-sm">Your Security is Our Priority</p>
        </div>
      </div>
    </footer>
  );
}


/* ── SCROLL TO TOP ── */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
      style={{ background: 'linear-gradient(135deg,#dc2626,#1e3a8a)' }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{width:'20px',height:'20px'}}>
        <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

/* ── WHATSAPP FLOAT ── */
function WhatsApp() {
  const [label, setLabel] = useState(false);
  return (
    <a href="https://wa.me/254783046972" target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
      style={{ background: "linear-gradient(135deg,#25d366,#128c7e)", padding: label ? "10px 18px 10px 14px" : "14px" }}
      onMouseEnter={() => setLabel(true)} onMouseLeave={() => setLabel(false)}>
      <svg viewBox="0 0 24 24" fill="white" style={{width:"20px",height:"20px",flexShrink:0}}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {label && <span className="text-white text-sm font-semibold whitespace-nowrap">Chat on WhatsApp</span>}
    </a>
  );
}

/* ── HOME PAGE (all sections) ── */
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Director />
      <VisionMission />
      <Services />
      <WhyUs />
      <Team />
      <Stats />
      <Clients />
      <Contact />
    </>
  );
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <FontStyle />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/director" element={<DirectorPage />} />
        <Route path="/vision-mission" element={<VisionMissionPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
      <WhatsApp />
    </>
  );
}