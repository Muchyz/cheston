import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, Zap, Shield, Globe } from "lucide-react";
import { services } from "../App";

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

export default function ContactPage() {
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
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "300px" }}>
        <img src="/contact-officer.jpg" alt="Contact CHESTON Security"
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={e => { e.target.style.background = "#0f172a"; }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.90),rgba(30,58,138,0.84))" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
          <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">Contact Us</span>
          <h1 className="text-5xl md:text-6xl text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Let's Build Your<br />
            <span style={{ background: "linear-gradient(135deg,#fca5a5,#bfdbfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Security Plan
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-lg">Free site assessment and custom quote. Our team responds within 2 hours.</p>
        </div>
      </div>

      {/* Contact Form + Info */}
      <section className="py-20" style={{ background: "linear-gradient(160deg,#fef2f2,#fafafa,#eff6ff)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Form */}
            <Reveal className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Request a Free Assessment</h2>
                    <p className="text-sm text-gray-400 mt-0.5">We respond within 2 hours</p>
                  </div>
                </div>

                {sent && (
                  <div className="mb-5 flex flex-col items-center gap-4 p-8 rounded-2xl text-center" style={{background:"linear-gradient(135deg,#f0fdf4,#dcfce7)",border:"2px solid #86efac"}}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#16a34a,#15803d)"}}>
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xl font-bold text-green-800">Message Sent!</div>
                    <div className="text-green-700 text-sm">Thank you for reaching out. Our team will contact you within 2 hours.</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-600 text-xs font-semibold">We typically respond faster during business hours</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Full Name *</label>
                      <input type="text" placeholder="Your full name" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 bg-gray-50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Email *</label>
                      <input type="email" placeholder="you@example.com" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 bg-gray-50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Phone</label>
                      <input type="tel" placeholder="+254 7XX XXX XXX" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 bg-gray-50 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Service Required</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 transition-all">
                      <option value="">Select a service...</option>
                      {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Message</label>
                    <textarea rows={5} placeholder="Tell us about your security requirements..."
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 bg-gray-50 resize-none transition-all" />
                  </div>
                  <button type="submit"
                    className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all text-base"
                    style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                    Send Message <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Info Sidebar */}
            <Reveal delay={0.15} className="lg:col-span-2 space-y-5">
              <div className="rounded-3xl overflow-hidden shadow-xl flex flex-col items-center justify-center text-center p-6" style={{ height: "200px", background: "linear-gradient(135deg,#1e293b,#0f172a)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" className="w-9 h-9 mb-2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-white font-bold text-sm leading-tight">Serem, Lavington Hope Center</p>
                <p className="text-white/60 text-xs mb-3">Amboseli Road, Nairobi</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=-1.28456,36.75923" target="_blank" rel="noopener noreferrer"
                  className="text-xs font-bold px-4 py-2 rounded-full text-white transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
                  Get Directions
                </a>
              </div>

              <div className="rounded-3xl p-7 space-y-4" style={{ background: "linear-gradient(160deg,#0f172a,#1e1b4b)" }}>
                <h3 className="text-white font-bold text-base tracking-wide">Get In Touch</h3>
                {[
                  { icon: Phone, color: "#dc2626", bg: "#fef2f2", label: "Call Us", lines: [{ text: "+254 702 396 783", href: "tel:+254702396783" }, { text: "+254 703 573 531", href: "tel:+254703573531" }] },
                  { icon: Mail, color: "#1e3a8a", bg: "#eff6ff", label: "Email Us", lines: [{ text: "chestonsecsolutions@gmail.com", href: "mailto:chestonsecsolutions@gmail.com" }, { text: "info@chestonsecurity.co.ke", href: "mailto:info@chestonsecurity.co.ke" }] },
                  { icon: MapPin, color: "#15803d", bg: "#f0fdf4", label: "Our Office", lines: [{ text: "P.O. Box 82, Serem, Lavington Hope Center, Ambosel Road", href: null }] },
                  { icon: Globe, color: "#b45309", bg: "#fffbeb", label: "Website", lines: [{ text: "www.chestonsecurity.co.ke", href: "https://www.chestonsecurity.co.ke" }] },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: c.bg }}>
                      <c.icon className="w-4 h-4" style={{ color: c.color }} />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-0.5">{c.label}</div>
                      {c.lines.map(l => l.href
                        ? <a key={l.text} href={l.href} className="text-white/85 text-xs font-medium hover:text-white transition-colors block">{l.text}</a>
                        : <div key={l.text} className="text-white/85 text-xs font-medium">{l.text}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-15 bg-white" />
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white/70 text-xs font-bold tracking-widest uppercase">Emergency Line</span>
                </div>
                <a href="tel:+254702396783" className="text-4xl font-black text-white hover:opacity-80 transition-opacity block">0702 396 783</a>
                <div className="text-white/60 text-xs mt-1">Available 24 hours, 7 days a week</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Zap, label: "2hr Response" },
                  { icon: Shield, label: "Free Quote" },
                  { icon: CheckCircle, label: "No Obligation" },
                ].map((t, i) => (
                  <div key={i} className="p-4 rounded-2xl text-center bg-white border border-gray-100 shadow-sm">
                    <t.icon className="w-5 h-5 mx-auto mb-1.5 text-red-500" />
                    <div className="text-xs font-semibold text-gray-700">{t.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}