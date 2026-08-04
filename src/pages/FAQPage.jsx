import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ArrowRight, Phone, Mail } from "lucide-react";

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

const faqs = [
  {
    category: "General",
    items: [
      { q: "What areas does CHESTON Security serve?", a: "CHESTON Security currently serves clients across Kenya, with primary operations centred in Nairobi and its surrounds. Our vision is to expand into targeted East Africa markets in the near future." },
      { q: "Is CHESTON Security a licensed company?", a: "Yes. CHESTON security solutions limited is fully licensed and compliant with all Kenyan regulatory requirements governing security service providers. Our management team holds Security Consultant and Security Installer licenses, and all personnel carry valid National Police Clearance certificates." },
      { q: "What makes Cheston different from other security firms?", a: "We are an independent firm offering unbiased, objective advice tailored to your needs and budget. Our General Manager has over 35 years of industry experience. We conduct full risk assessments before deployment, implement above-average training standards, and maintain a 24/7 control room. We partner with international companies to deliver globally benchmarked solutions." },
    ]
  },
  {
    category: "Services",
    items: [
      { q: "What security services does Cheston offer?", a: "We offer a comprehensive range of services including Guarding & Protection, Armed Response, Security Systems (CCTV, alarms, electric fencing, intercoms), VIP & Executive Protection, Access Control, and Supervision & Management. We serve all industry sectors." },
      { q: "Can Cheston design a custom security package for my business?", a: "Absolutely. All our security packages are custom-designed to cater for clients' specific needs and financial capabilities. We begin with a free site assessment and risk analysis before recommending a tailored solution." },
      { q: "Do your officers carry weapons?", a: "Our armed response team operates with authorised weapons where required and permitted. Guarding officers are equipped with appropriate tools and carry panic buttons linked to our 24/7 control room, with Armed Reaction dispatched immediately in the event of any incident." },
      { q: "What types of security systems do you install?", a: "We install and maintain panic systems, alarm systems, fingerprint readers, CCTV, intercoms, surveillance cameras, and electric fencing. All installations are carried out by trained, certified technicians. We also manage an in-house technical department for ongoing support." },
    ]
  },
  {
    category: "Getting Started",
    items: [
      { q: "How do I get a quote?", a: "Simply fill out our contact form, call us on +254 702 396 783, or send an email to info@chestonsecurity.co.ke. Our team responds within 2 hours to arrange a free, no-obligation site assessment." },
      { q: "How quickly can Cheston deploy officers to my site?", a: "After the initial assessment and agreement, we can typically deploy officers within a short turnaround period depending on your location and the scope of requirements. Contact us to discuss your specific timeline." },
      { q: "Is there a minimum contract period?", a: "Contract terms are discussed and agreed based on the nature of your security needs. We value long-term relationships with our clients, but we are flexible and will work with you to find an arrangement that suits your situation." },
    ]
  },
];

export default function FAQPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState({});
  const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1e3a8a,#0f172a)", padding: "80px 24px", textAlign: "center" }}>
        <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">FAQs</span>
        <h1 className="text-5xl text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
          Frequently Asked<br />
          <span style={{ background: "linear-gradient(135deg,#fca5a5,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Questions
          </span>
        </h1>
        <p className="text-white/60 max-w-xl mx-auto">Everything you need to know about CHESTON security solutions limited and our services.</p>
      </div>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {faqs.map((group, gi) => (
            <Reveal key={gi} delay={gi * 0.05}>
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 rounded-full" style={{ background: "#dc2626" }} />
                  <h2 className="text-2xl font-bold text-gray-900">{group.category}</h2>
                </div>
                <div className="space-y-3">
                  {group.items.map((item, ii) => {
                    const key = `${gi}-${ii}`;
                    const isOpen = open[key];
                    return (
                      <div key={ii} className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
                        <button
                          className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                          style={{ background: isOpen ? "#fef2f2" : "#ffffff" }}
                          onClick={() => toggle(key)}>
                          <span className="font-semibold text-gray-900 text-sm">{item.q}</span>
                          {isOpen
                            ? <ChevronUp className="w-5 h-5 text-red-600 shrink-0" />
                            : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 bg-red-50">
                            <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Still have questions */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
              <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'DM Serif Display',serif" }}>Still Have Questions?</h2>
              <p className="text-white/60 mb-7 text-sm">Our team is happy to answer any questions you may have — call, email, or fill in our contact form.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button onClick={() => navigate("/contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}>
                  Contact Us <ArrowRight className="w-4 h-4" />
                </button>
                <a href="tel:+254702396783"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> Call Us
                </a>
                <a href="mailto:info@chestonsecurity.co.ke"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-all">
                  <Mail className="w-4 h-4" /> Email Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}