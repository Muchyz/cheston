import { useState } from "react";
import { X } from "lucide-react";

const photos = [
  { src: "/gallery-team-portrait.jpg", caption: "CHESTON Security Team" },
  { src: "/about-action.jpg", caption: "Security Screening" },
  { src: "/about-gate.jpg", caption: "On Duty" },
  { src: "/gallery-squad-new.jpg", caption: "CHESTON Security Team" },
  { src: "/hero-officers.jpg", caption: "Security Officers" },
  { src: "/armed-officer.jpg", caption: "Armed Officer" },
  { src: "/director-duncan.jpg", caption: "Director Duncan O. Ngao" },
  { src: "/gallery-vip-new.jpg", caption: "Suiting Up for Service" },
  { src: "/supervision-truck.jpg", caption: "Patrol Vehicle" },
  { src: "/mission-team.jpg", caption: "Mission Team" },
  { src: "/contact-officer.jpg", caption: "Professional Service" },
  { src: "/clients-officer.jpg", caption: "Client Protection" },
  { src: "/gallery-briefing.jpg", caption: "Pre-Shift Briefing" },
  { src: "/supervision-officer.jpg", caption: "Supervision & Management Officer" },
  { src: "/guarding-dog.jpg", caption: "K9 Unit & Patrol" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: "linear-gradient(160deg,#fef2f2,#fafafa,#eff6ff)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            Our Gallery
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            CHESTON in <span style={{ color: "#dc2626" }}>Action</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">A look at our team, operations and commitment to security excellence across Kenya.</p>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((p, i) => (
            <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setSelected(p)}>
              <img src={p.src} alt={p.caption} className="w-full h-auto object-cover"
                onError={e => { e.target.parentElement.style.display = "none"; }} />
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.9)" }}
          onClick={() => setSelected(null)}>
          <button className="absolute top-6 right-6 text-white bg-white/20 rounded-full p-2 hover:bg-white/40">
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-2xl w-full">
            <img src={selected.src} alt={selected.caption} className="w-full rounded-2xl shadow-2xl" />
            <p className="text-white text-center mt-3 font-medium">{selected.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
