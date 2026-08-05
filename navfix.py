with open('src/App.jsx', 'r') as f:
    content = f.read()

start_marker = '/* ── NAVBAR ── */'
end_marker = '/* ── HERO ── */'
start_idx = content.index(start_marker)
end_idx = content.index(end_marker)

new_block = '''/* ── NAVBAR ── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const moreRef = useRef(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const links = [
    { label: "Home", icon: Home, action: () => { navigate("/"); setTimeout(() => scrollTo("hero"), 100); } },
    { label: "About", icon: Info, action: () => navigate("/about") },
    { label: "Services", icon: Wrench, action: () => navigate("/services") },
    { label: "Why Us", icon: Eye, action: () => { navigate("/"); setTimeout(() => scrollTo("why-us"), 100); } },
    { label: "Clients", icon: Users, action: () => navigate("/clients") },
    { label: "Contact", icon: Mail, action: () => navigate("/contact") },
  ];

  const moreLinks = [
    { label: "Gallery", icon: Image, action: () => navigate("/gallery") },
    { label: "Team", icon: UserCheck, action: () => navigate("/team") },
    { label: "Vision & Mission", icon: Target, action: () => navigate("/vision-mission") },
    { label: "FAQ", icon: HelpCircle, action: () => navigate("/faq") },
    { label: "Careers", icon: Briefcase, action: () => navigate("/careers") },
    { label: "Privacy", icon: Lock, action: () => navigate("/privacy") },
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
        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <button key={l.label} onClick={() => { l.action(); setOpen(false); }}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
                <Icon className="w-4 h-4" />{l.label}
              </button>
            );
          })}
          <div className="relative" ref={moreRef}>
            <button onClick={() => setMoreOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
              More <ChevronDown className={"w-3.5 h-3.5 transition-transform " + (moreOpen ? "rotate-180" : "")} />
            </button>
            {moreOpen && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                {moreLinks.map((l) => {
                  const Icon = l.icon;
                  return (
                    <button key={l.label} onClick={() => { l.action(); setMoreOpen(false); }}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <Icon className="w-4 h-4" />{l.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <button onClick={() => navigate("/contact")}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: "linear-gradient(135deg,#dc2626,#1e3a8a)" }}>
            Get a Quote
          </button>
        </div>
        <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <button key={l.label} onClick={() => { l.action(); setOpen(false); }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
                <Icon className="w-4 h-4" />{l.label}
              </button>
            );
          })}
          <div className="pt-2 mt-2 border-t border-gray-100">
            <p className="px-4 pb-1 text-gray-400 font-semibold uppercase tracking-wider text-xs">More</p>
            {moreLinks.map((l) => {
              const Icon = l.icon;
              return (
                <button key={l.label} onClick={() => { l.action(); setOpen(false); }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
                  <Icon className="w-4 h-4" />{l.label}
                </button>
              );
            })}
          </div>
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

'''

content = content[:start_idx] + new_block + content[end_idx:]
with open('src/App.jsx', 'w') as f:
    f.write(content)
print('SUCCESS: Navbar replaced')
