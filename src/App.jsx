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

// --- Content Data ---
const TEAM = [
  { name: "Boaz Acosta", role: "CEO / FOUNDER", tag: "OP-01", email: "boaz@intelguard.org", tg: "@bo_sint" },
  { name: "Monroe Wright", role: "COO / OPS DIR", tag: "OP-02", email: "monroe@intelguard.org", tg: null },
  { name: "John Davis", role: "SR INVESTIGATOR", tag: "OP-05", email: "john@intelguard.org", tg: null },
  { name: "Vinnie Castro", role: "FIELD OPS", tag: "OP-09", email: "vinnie@intelguard.org", tg: null },
  { name: "Oliver Dudas", role: "OSINT SPEC", tag: "OP-12", email: "oliver@intelguard.org", tg: null },
  { name: "Mason Woods", role: "ACADEMY CADET", tag: "TR-01", email: "Classified", tg: null },
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
              // {item}
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
                  <h3 className="text-2xl font-black uppercase tracking-tight">{p.name}</h3>
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
                Shadow <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400 italic">Watchers</span> <br />
                Protocol.
              </h1>
              <p className="text-lg md:text-xl text-white/40 font-mono uppercase tracking-tight max-w-xl mb-12 leading-relaxed">
                Elite non-profit OSINT collective dedicated to the identification and dismantling of global exploitation networks.
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
                   <div className="text-[10px] font-mono text-blue-500/40 absolute top-6 left-6 uppercase tracking-widest">System_Auth_v11.4</div>
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
                <div className="text-6xl font-black mb-2">6<span className="text-blue-600">+</span></div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">TB Data Eradicated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK / AGENCIES */}
      <section id="network" className="py-24 bg-black overflow-hidden relative">
        <div className="flex items-center gap-32 whitespace-nowrap animate-marquee opacity-20">
          {['FBI', 'INTERPOL', 'EUROPOL', 'AFP', 'USSS', 'NCA', 'POLICE'].map((n, i) => (
             <div key={i} className="flex items-center gap-8">
               <span className="text-5xl font-black tracking-tighter text-white/50">{n}</span>
               <div className="w-4 h-4 bg-blue-600 rotate-45" />
             </div>
          ))}
          {['FBI', 'INTERPOL', 'EUROPOL', 'AFP', 'USSS', 'NCA', 'POLICE'].map((n, i) => (
             <div key={i+10} className="flex items-center gap-8">
               <span className="text-5xl font-black tracking-tighter text-white/50">{n}</span>
               <div className="w-4 h-4 bg-blue-600 rotate-45" />
             </div>
          ))}
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
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
