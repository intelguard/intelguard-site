import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  ArrowRight,
  ShieldAlert,
  Copy,
  CheckCircle2,
  ExternalLink,
  Activity,
  Fingerprint,
  Lock,
  Terminal,
  Cpu,
  Eye,
  Radar,
  ShieldCheck,
  Zap,
  ChevronRight,
  Menu,
  X,
  Mail,
  Send,
  UserCheck
} from 'lucide-react';

// --- Tactical SVG Assets ---
const LogoSVG = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L15 20V45C15 66.5 30 86.5 50 95C70 86.5 85 66.5 85 45V20L50 5Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
    <path d="M50 15L25 26V45C25 61.5 35.5 76.5 50 83C64.5 76.5 75 61.5 75 45V26L50 15Z" fill="currentColor" fillOpacity="0.2"/>
    <rect x="48" y="30" width="4" height="25" fill="#3B82F6" className="animate-pulse" />
    <rect x="42" y="55" width="16" height="4" fill="#3B82F6" />
  </svg>
);

// --- Official Network Data ---
const PARTNERS = [
  { name: "nOSINT", domain: "nosint.org", logo: "https://i.postimg.cc/W1kqyGz0/Screenshot-2026-04-18-220750.png" },
  { name: "OSINTLeak", domain: "osintleak.com", logo: "https://i.postimg.cc/NjJCNwyf/logo-300x300.webp" },
  { name: "OSINT Industries", domain: "osint.industries", logo: "https://i.postimg.cc/3xc9XC6p/apple-touch-icon.png" },
  { name: "SEON", domain: "seon.io", logo: "https://i.postimg.cc/Twqr4rkK/Screenshot-2026-04-18-220511.png" },
  { name: "BreachHub", domain: "breachhub.org", logo: "https://logo.clearbit.com/breachhub.org" }
];

const INTL_AGENCIES = [
  { name: "INTERPOL", domain: "interpol.int", logo: "https://i.postimg.cc/vmXY2Tr4/3d345c24d0ccbc97935447d0858e4564.png" },
  { name: "ROMANIAN POLICE", domain: "politiaromana.ro", logo: "https://i.postimg.cc/fTxJjwry/stema-igpr.webp" },
  { name: "AUSTRALIAN FEDERAL POLICE", domain: "afp.gov.au", logo: "https://i.postimg.cc/xCJdkYmY/c9979a4ad844989502a5058f378b1f90.webp" },
  { name: "CITY OF LONDON POLICE", domain: "cityoflondon.police.uk", logo: "https://i.postimg.cc/3rGRY87s/51gq-Boh-Nk-L.webp" },
  { name: "NIGERIA POLICE FORCE", domain: "nccc.npf.gov.ng", logo: "https://i.postimg.cc/8zZktsBp/35a4380a0419fab6fabee8478e0406fc.webp" },
  { name: "DORSET POLICE", domain: "dorset.police.uk", logo: "https://i.postimg.cc/zvw8WfGb/dorset-police-cr-pin.webp" },
  { name: "MINISTRY OF INTERIOR", domain: "interieur.gouv.fr", logo: "https://i.postimg.cc/kggq6q3B/22643d5632575a2b3bacac629ed54900.webp" },
  { name: "EUROPOL", domain: "europol.europa.eu", logo: "https://i.postimg.cc/tgLjM61j/514cebaef8f2414b7fabf643d05a5ce7.webp" }
];

const DOMESTIC_AGENCIES = [
  { name: "FBI", domain: "fbi.gov", logo: "https://upload.wikimedia.org/wikipedia/commons/d/da/Seal_of_the_Federal_Bureau_of_Investigation.svg" },
  { name: "DALLAS PD", domain: "dallaspolice.net", logo: "https://i.postimg.cc/Wz7czf5g/bb8a5a2b92598d6ee44249c146620623.webp" },
  { name: "USSS", domain: "secretservice.gov", logo: "https://i.postimg.cc/yY9V4vm2/Logo-of-the-United-States-Secret-Service.png" },
  { name: "TORRANCE PD", domain: "torranceca.gov", logo: "https://i.postimg.cc/hj9HZ5Wk/Screenshot-2026-04-18-222122.png" },
  { name: "ICAC", domain: "icactaskforce.org", logo: "https://i.postimg.cc/y6yMFtTF/favicon.png" },
  { name: "NCMEC", domain: "missingkids.org", logo: "https://i.postimg.cc/7Zfjr6rD/NCMEC.webp" },
  { name: "SANTA ROSA PD", domain: "srcity.org", logo: "https://logo.clearbit.com/srcity.org" },
  { name: "IWF", domain: "iwf.org.uk", logo: "https://i.postimg.cc/hvD3y404/icon.webp" }
];

const TEAM = [
  { name: "Boaz Acosta", role: "CEO / FOUNDER", tag: "OP-01", email: "boaz@intelguard.org", tg: "@bo_sint", isVerified: true },
  { name: "Monroe Wright", role: "COO / OPS DIR", tag: "OP-02", email: "monroe@intelguard.org", tg: null, isVerified: true },
  { name: "John Davis", role: "SR INVESTIGATOR", tag: "OP-05", email: "john@intelguard.org", tg: null, isVerified: true },
  { name: "Vinnie Castro", role: "FIELD OPS", tag: "OP-09", email: "vinnie@intelguard.org", tg: null },
  { name: "Oliver Dudas", role: "OSINT SPEC", tag: "OP-12", email: "oliver@intelguard.org", tg: null },
];

const WALLETS = [
  { name: "BTC", addr: "bc1qyh5jdwqq7frw5fjdyxcgejhx79sjpm6pf3zfr3", color: "text-orange-500" },
  { name: "ETH", addr: "0x690B9A9E9aa1349101842367582562691a62002d", color: "text-blue-400" },
  { name: "XMR", addr: "45VSTwXcBpFNoV6oaxnL6yBbw7oRPRJ2BCmonTeSnuJQQwdnikQzQhwVcYK73ttt1Rbn2F1TQmAUJDVncXM8qj8z9PmcAaD", color: "text-orange-600" },
  { name: "SOL", addr: "7vEshR7S9S9uPjRkH5K2JtJv1wV6f5m6PjRkH5K2JtJv", color: "text-green-400" },
];

// --- Specialized Components ---

const TacticalCard = ({ children, className = "" }) => (
  <div className={`relative group overflow-hidden border border-white/5 bg-[#0A0A0A] rounded-lg p-6 hover:border-blue-500/30 transition-all duration-500 ${className}`}>
    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-blue-500/50 transition-colors" />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 group-hover:border-blue-500/50 transition-colors" />
    {children}
  </div>
);

const GlowingButton = ({ children, onClick, variant = "primary" }) => {
  const isPrimary = variant === "primary";
  return (
    <button 
      onClick={onClick}
      className={`relative px-8 py-4 font-mono text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden group
        ${isPrimary ? 'bg-blue-600 text-white' : 'bg-transparent border border-white/10 text-white hover:border-white/30'}`}
    >
      <div className="relative z-10 flex items-center gap-3">
        {children}
      </div>
      {isPrimary && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </button>
  );
};

// Tactical Marquee Component
const MarqueeStream = ({ items, reverse = false, label }) => (
  <div className="relative mb-8 group/stream">
    <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-[9px] font-mono text-blue-500 uppercase tracking-[0.4em] bg-[#050505] px-4 py-2 border border-white/10 rounded-full hidden md:block shadow-xl">
      {label}
    </div>
    {/* Mask edges for a smooth fade effect */}
    <div className="flex overflow-hidden relative" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div className={`flex w-max items-center gap-16 py-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} hover:[animation-play-state:paused]`}>
        {[...items, ...items, ...items].map((item, i) => (
          <a key={i} href={`https://${item.domain}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/item opacity-50 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 cursor-pointer">
            <div className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-xl p-2.5 border border-white/5 group-hover/item:border-blue-500/50 transition-colors shadow-lg">
               <img 
                  src={item.logo} 
                  alt={item.name} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
               />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white uppercase leading-none mb-1">{item.name}</span>
              <span className="text-[9px] font-mono text-blue-500/80 tracking-[0.2em] uppercase">{item.domain} <ExternalLink className="inline w-2 h-2 ml-1" /></span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
);


export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [copyStatus, setCopyStatus] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (text) => {
    if (text === "Classified") return;
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopyStatus(text);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const Nav = () => (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => setActivePage('home')}
        >
          <LogoSVG className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-widest text-white uppercase leading-none">IntelGuard</span>
            <span className="text-[9px] font-mono text-blue-500/60 uppercase tracking-[0.3em] mt-1">Tactical Intake Portal</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Impact', 'Network', 'Donate'].map(item => (
            <button 
              key={item}
              onClick={() => {
                setActivePage('home');
                setTimeout(() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40 hover:text-blue-400 transition-colors"
            >
              {"//"} {item}
            </button>
          ))}
          <GlowingButton onClick={() => setActivePage('team')} variant="secondary">
            <UserCheck className="w-3 h-3" /> Personnel
          </GlowingButton>
        </div>
      </div>
    </nav>
  );

  if (activePage === 'team') {
    return (
      <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
        <Nav />
        <div className="max-w-7xl mx-auto px-6 pt-40 pb-20">
          <div className="mb-20">
            <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-4">
              <div className="w-12 h-px bg-blue-500/30" /> Active Roster
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Personnel<span className="text-blue-600">.</span></h1>
            <p className="text-white/40 font-mono text-xs max-w-xl uppercase leading-relaxed">Identity verification protocols active. All staff listed are authorized investigative leads.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {TEAM.map((p, i) => (
              <div key={i} className="bg-[#0A0A0A] p-10 hover:bg-[#0E0E0E] transition-all group relative">
                <div className="absolute top-4 right-6 text-[9px] font-mono text-white/10 group-hover:text-blue-500/40 transition-colors">[{p.tag}]</div>
                <div className="mb-12">
                  <div className="text-[10px] font-mono text-blue-500 mb-2 tracking-widest uppercase">{p.role}</div>
                  <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                    {p.name}
                    {p.isVerified && (
                      <svg className="w-5 h-5 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.92-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.92 1.79-3.92 4 0 .495.083.965.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.71 3.998 3.92 3.998.47 0 .92-.086 1.335-.253.52 1.335 1.828 2.25 3.337 2.25 1.51 0 2.818-.915 3.338-2.25.416.167.866.253 1.336.253 2.21 0 3.92-1.788 3.92-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.346-.64.346H10.9c-.246 0-.477-.115-.625-.31l-2.167-2.833c-.198-.26-.145-.633.115-.83.26-.198.632-.145.83.115l1.848 2.417 3.993-5.99c.19-.283.573-.357.856-.165.283.19.358.574.166.85z"/>
                      </svg>
                    )}
                  </h3>
                </div>
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div 
                    onClick={() => handleCopy(p.email)}
                    className="flex items-center justify-between text-[11px] font-mono text-white/30 hover:text-white cursor-pointer group/item"
                  >
                    <span className="flex items-center gap-2"><Mail className="w-3 h-3" /> {p.email}</span>
                    <Copy className={`w-3 h-3 opacity-0 group-hover/item:opacity-100 ${copyStatus === p.email ? 'text-green-500 opacity-100' : ''}`} />
                  </div>
                  {p.tg && (
                    <div 
                      onClick={() => handleCopy(p.tg)}
                      className="flex items-center justify-between text-[11px] font-mono text-white/30 hover:text-blue-400 cursor-pointer group/item"
                    >
                      <span className="flex items-center gap-2"><Send className="w-3 h-3" /> {p.tg}</span>
                      <Copy className={`w-3 h-3 opacity-0 group-hover/item:opacity-100 ${copyStatus === p.tg ? 'text-green-500 opacity-100' : ''}`} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setActivePage('home')} className="mt-20 flex items-center gap-4 text-blue-500 font-mono text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform">
             <ArrowRight className="rotate-180 w-4 h-4" /> Return to Command Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <Nav />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]" />
          <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-blue-500 font-mono text-[11px] tracking-[0.5em] uppercase mb-8">
                <Radar className="w-4 h-4 animate-spin-slow" /> Threat Monitoring Active
              </div>
              <h1 className="text-6xl md:text-[100px] font-black leading-[0.85] tracking-tighter uppercase mb-8">
                Protecting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400 italic">Theㅤㅤㅤ</span> <br />
                Ignored.
              </h1>
              <p className="text-lg md:text-xl text-white/40 font-mono uppercase tracking-tight max-w-xl mb-12 leading-relaxed">
                An experienced non-profit organization that focuses on dismantling CSAM networks and investigating crimes against children.
              </p>
              <div className="flex flex-wrap gap-6">
                <GlowingButton onClick={() => window.open('https://forms.gle/MkUCRvdXBghA2HQm6', '_blank')}>
                  <ShieldAlert className="w-4 h-4" /> Initialize Report
                </GlowingButton>
                <GlowingButton onClick={() => setActivePage('team')} variant="secondary">
                  Access Roster <ChevronRight className="w-4 h-4" />
                </GlowingButton>
              </div>
            </div>
            
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full" />
                <TacticalCard className="relative z-10 aspect-square flex flex-col items-center justify-center border-white/10">
                   <div className="text-[10px] font-mono text-blue-500/40 absolute top-6 left-6 uppercase tracking-widest">System_Auth_v11.5</div>
                   <LogoSVG className="w-40 h-40 text-blue-500 mb-8" />
                   <div className="space-y-2 text-center">
                     <div className="text-2xl font-black uppercase tracking-widest">INTELGUARD</div>
                     <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em]">Decentralized Intelligence</div>
                   </div>
                   <div className="absolute bottom-6 w-full px-12">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Sync Progress</span>
                       <span className="text-[8px] font-mono text-blue-500">98.4%</span>
                     </div>
                     <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                       <div className="h-full bg-blue-600 w-[98.4%] animate-pulse" />
                     </div>
                   </div>
                </TacticalCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / IMPACT */}
      <section id="impact" className="py-40 bg-[#070707] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-6">
                <Activity className="w-4 h-4" /> Quantifiable Data
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                Disrupting <br />Exploitation.
              </h2>
              <p className="text-white/40 font-mono text-sm uppercase leading-loose mb-10 max-w-md">
                Our mission is measured in cases closed and data eradicated. We provide the link between civilian surveillance and law enforcement action.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5">
              <div className="bg-[#0A0A0A] p-12 group">
                <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform"><ShieldCheck className="w-8 h-8" /></div>
                <div className="text-6xl font-black mb-2">90<span className="text-blue-600">+</span></div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Actionable Cases Closed</div>
              </div>
              <div className="bg-[#0A0A0A] p-12 group">
                <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform"><Terminal className="w-8 h-8" /></div>
                <div className="text-6xl font-black mb-2">8<span className="text-blue-600">+</span></div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">TB Data Eradicated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK / MULTI-TIER AGENCIES */}
      <section id="network" className="py-32 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-16">
           <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-4">
              <Globe className="w-4 h-4" /> Global Reach
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Operational <span className="text-blue-600">Network.</span></h2>
        </div>
        
        <div className="flex flex-col gap-6 pt-10 border-t border-white/5">
          {/* Stream 1: OSINT Partners */}
          <MarqueeStream items={PARTNERS} label="STRATEGIC PARTNERS" />
          
          {/* Stream 2: International Cooperatives (Reversed) */}
          <MarqueeStream items={INTL_AGENCIES} reverse={true} label="INTL. COOPERATIVES" />
          
          {/* Stream 3: Domestic Cooperatives */}
          <MarqueeStream items={DOMESTIC_AGENCIES} label="DOMESTIC ALLIES" />
        </div>
      </section>

      {/* DONATIONS */}
      <section id="donate" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-flex items-center gap-3 text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-6">
              <Zap className="w-4 h-4" /> Operation Funding
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Support the Mission<span className="text-blue-600">.</span></h2>
            <p className="text-white/40 font-mono text-xs uppercase max-w-xl">Donations fuel our infrastructure and investigative tools. We accept decentralized currency for maximum operational security.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WALLETS.map((w, i) => (
              <div 
                key={i} 
                onClick={() => handleCopy(w.addr)}
                className="bg-[#0A0A0A] border border-white/5 p-10 hover:border-blue-500/40 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-center mb-10">
                  <span className={`text-xl font-black ${w.color}`}>{w.name}</span>
                  <div className="p-2 rounded bg-white/5">
                    <Copy className={`w-3 h-3 group-hover:text-blue-500 transition-colors ${copyStatus === w.addr ? 'text-green-500' : ''}`} />
                  </div>
                </div>
                <div className="text-[9px] font-mono text-white/10 break-all leading-relaxed group-hover:text-white/30 transition-colors">
                  {w.addr}
                </div>
                {copyStatus === w.addr && (
                  <div className="mt-4 text-[8px] font-mono text-green-500 uppercase tracking-widest animate-pulse">Copied to Clipboard</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#030303] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <LogoSVG className="w-6 h-6 text-blue-500" />
                <span className="font-black uppercase tracking-widest">IntelGuard</span>
              </div>
              <p className="text-[10px] font-mono text-white/20 uppercase max-w-xs leading-loose">
                Established 2024. Operating as a decentralized collective for global cyber-intelligence.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-12">
              <div className="space-y-4">
                <div className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-6">Contact_Endpoints</div>
                <a href="mailto:contact@intelguard.org" className="block text-[10px] font-mono text-white/40 hover:text-white uppercase transition-colors">{"//"} General: contact@intelguard.org</a>
                <a href="mailto:tipline@intelguard.org" className="block text-[10px] font-mono text-red-500/60 hover:text-red-500 uppercase transition-colors">{"//"} Urgent: tipline@intelguard.org</a>
              </div>
              
              <div className="space-y-4">
                <div className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-6">Social_Network</div>
                <a href="https://t.me/intelguardian" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] font-mono text-white/40 hover:text-white uppercase transition-colors">
                  <svg className="w-4 h-4 text-[#229ED9]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.11.03-1.84 1.18-5.21 3.45-.49.34-.94.5-1.35.49-.45-.01-1.31-.25-1.95-.46-.78-.26-1.4-.4-1.35-.85.03-.23.36-.48.98-.75 3.83-1.67 6.38-2.77 7.65-3.3 3.63-1.52 4.39-1.78 4.88-1.79.11 0 .35.03.48.14.11.09.14.22.15.34.01.07.01.17 0 .28z"/>
                  </svg>
                  {"//"} Telegram
                </a>
                <a href="https://x.com/intelguardorg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] font-mono text-white/40 hover:text-white uppercase transition-colors">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  {"//"} Twitter
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">© 2024 IntelGuard Protocol // All Rights Reserved</span>
            <div className="flex items-center gap-6">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[9px] font-mono text-green-500/50 uppercase tracking-widest">Node Status: Online</span>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee { animation: marquee 60s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 60s linear infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
}
