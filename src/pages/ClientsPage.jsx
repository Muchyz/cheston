import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  Building, Home, ShoppingBag, Factory, Mic, Globe,
  Activity, Radio, Shield, Car, Lock, Star,
  CheckCircle, ArrowRight
} from "lucide-react";

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

const industries = [
  { icon: Building, title: "Corporate", color: "#1e3a8a", bg: "#eff6ff", photo: "sector-corporate.jpg", desc: "From SMEs to large corporations, we secure your office environments and corporate assets." },
  { icon: Home, title: "Residential & Estates", color: "#15803d", bg: "#f0fdf4", photo: "sector-residential.jpg", desc: "Protecting homes, gated communities and residential estates across Kenya." },
  { icon: ShoppingBag, title: "Retail Security", color: "#b45309", bg: "#fffbeb", photo: "sector-retail.jpg", desc: "Loss prevention, customer safety, and secure retail environments." },
  { icon: Factory, title: "Commercial & Industrial", color: "#7c3aed", bg: "#f5f3ff", photo: "sector-industrial.jpg", desc: "Heavy-duty security for factories, warehouses and industrial complexes." },
  { icon: Mic, title: "Events", color: "#0891b2", bg: "#ecfeff", photo: "sector-events.jpg", desc: "Professional event security, crowd management and access control." },
  { icon: Globe, title: "Government", color: "#dc2626", bg: "#fef2f2", photo: "sector-government.jpg", desc: "Securing government agencies and public-sector installations." },
  { icon: Activity, title: "Health & Education", color: "#7c3aed", bg: "#f5f3ff", photo: "sector-health.jpg", desc: "Safe environments for hospitals, schools, TAFEs and universities." },
  { icon: Radio, title: "Ports & Airports", color: "#0891b2", bg: "#ecfeff", photo: "sector-ports.jpg", desc: "High-security solutions for transport and logistics hubs." },
  { icon: Shield, title: "Diplomatic", color: "#dc2626", bg: "#fef2f2", photo: "sector-diplomatic.jpg", desc: "Discreet, reliable security for diplomatic missions and personnel." },
  { icon: Car, title: "Oil & Gas", color: "#b45309", bg: "#fffbeb", photo: "sector-oilgas.jpg", desc: "Specialist security for energy infrastructure and remote sites." },
  { icon: Lock, title: "Banking & Finance", color: "#1e3a8a", bg: "#eff6ff", photo: "sector-banking.jpg", desc: "Protecting financial institutions, ATMs and high-value assets." },
  { icon: Star, title: "VIP & Executive", color: "#15803d", bg: "#f0fdf4", photo: "sector-vip.jpg", desc: "Exclusive close protection for executives and high-profile individuals." },
];

const clientList = [
  "Small, Medium & Large Businesses","Office and Professional Suites","Retail Shops, Cafes and Restaurants",
  "Corporate and Franchise Groups","Property Developers and Builders","Plant Operators and Managers",
  "Wholesale and Distribution Companies","Utility and Infrastructure Operators","Industrial Companies",
  "Government Agencies","Strata Property Managers","Schools, TAFEs, Universities",
  "Real Estate Agencies","Maintenance & Facility Management","Accommodation Providers",
  "Aged Care and Child Care Facilities","Residential Customers","Property Managers",
  "Business Operators with Multiple Sites","Shopping Centers","Local Councils","Medical Suites",
];

export default function ClientsPage() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
        <img src="/hero-officers.jpg" alt="CHESTON Security Clients"
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.target.style.background = "#0f172a"; }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.88),rgba(30,58,138,0.82))" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">Who We Serve</span>
          <h1 className="text-5xl md:text-6xl text-white mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Our Clients<br />
            <span style={{ background: "linear-gradient(135deg,#fef9c3,#fed7aa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              & Industries
            </span>
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">Our invaluable experience provides all of our customers with a level of service and confidence unsurpassed in the industry.</p>
        </div>
      </div>

      {/* Industries */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Industry Sectors</span>
              <h2 className="text-4xl text-gray-900" style={{ fontFamily: "'DM Serif Display',serif" }}>
                We Secure <span style={{ color: "#dc2626" }}>Every Sector</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
            {industries.map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 group cursor-default overflow-hidden"
                  onMouseEnter={e => e.currentTarget.style.borderColor = item.color + "40"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#f1f5f9"}>
                  <div className="relative overflow-hidden" style={{aspectRatio:"4/3"}}>
                    <img src={`/${item.photo}`} alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => { e.target.parentElement.style.background = item.bg; e.target.style.display="none"; }} />
                    <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(0,0,0,0.55),transparent)"}} />
                    <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center" style={{background: item.color}}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Client Types */}
          <Reveal delay={0.1}>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'DM Serif Display',serif" }}>We Serve All Client Types</h2>
                <p className="text-gray-500 mt-2 text-sm">From individuals to enterprise — every client gets a personalised security package.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {clientList.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600 py-1">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#dc2626" }} />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Photo Grid */}
          <Reveal delay={0.12}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-3xl overflow-hidden shadow-lg" style={{ height: "240px" }}>
                
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg" style={{ height: "240px" }}>
                <img src="/clients-officer.jpg" alt="Officer on duty"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.background = "#e2e8f0"; }} />
              </div>
            </div>
          </Reveal>

          {/* Quote Banner */}
          <Reveal delay={0.14}>
            <div className="rounded-3xl overflow-hidden relative shadow-xl" style={{ height: "220px" }}>
              <img src="/hero-officers.jpg" alt="Cheston team"
                className="w-full h-full object-cover"
                onError={e => { e.target.style.background = "#0f172a"; }} />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(15,23,42,0.78)" }}>
                <p className="text-white/90 text-xl md:text-2xl text-center max-w-2xl px-6 font-medium" style={{ fontFamily: "'DM Serif Display',serif" }}>
                  "We have a proven track record for excellence, value for money, innovation and experience across the entire security spectrum."
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(160deg,#fef2f2,#fafafa,#eff6ff)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl text-gray-900 mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
              Join Our Growing Client Base
            </h2>
            <p className="text-gray-500 mb-8">Contact our team today for a free, no-obligation security assessment tailored to your industry and specific needs.</p>
            <button onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
              Get Free Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}