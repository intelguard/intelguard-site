import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ArrowRight,
  BadgeAlert,
  Copy,
  CheckCircle2,
  ExternalLink,
  Activity,
  Fingerprint,
  Send,
  Trash2,
  Briefcase,
  Mail,
  Crown,
  ShieldCheck,
  Database,
  Clock,
  ShieldAlert,
  Lock,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';

// --- Assets & Icons (Inline SVGs for Reliability) ---

const IntelGuardLogo = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L15 20V45C15 66.5 30 86.5 50 95C70 86.5 85 66.5 85 45V20L50 5Z" fill="#2563EB" />
    <path d="M50 15L25 26V45C25 61.5 35.5 76.5 50 83C64.5 76.5 75 61.5 75 45V26L50 15Z" fill="white" />
    <path d="M42 60L32 50L35 47L42 54L60 36L63 39L42 60Z" fill="#2563EB" />
  </svg>
);

const AgencyLogos = {
  FBI: () => (
    <svg className="h-10 w-auto" viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="50" y="58" textAnchor="middle" fontSize="24" fontWeight="900">FBI</text>
    </svg>
  ),
  INTERPOL: () => (
    <svg className="h-10 w-auto" viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M30 50 L70 50 M50 30 L50 70" stroke="currentColor" strokeWidth="2" />
      <text x="50" y="90" textAnchor="middle" fontSize="10" fontWeight="900">INTERPOL</text>
    </svg>
  ),
  EUROPOL: () => (
    <svg className="h-10 w-auto" viewBox="0 0 100 100" fill="currentColor">
      <rect x="20" y="20" width="60" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="50" y="85" textAnchor="middle" fontSize="10" fontWeight="900">EUROPOL</text>
    </svg>
  )
};

const CryptoLogos = {
  BTC: () => (
    <svg className="h-10 w-10" viewBox="0 0 32 32" fill="#F7931A">
      <circle cx="16" cy="16" r="16" />
      <path d="M22.7 13.7c.3-2.1-1.3-3.2-3.4-3.9l.7-2.8-1.7-.4-.7 2.8c-.4-.1-.9-.2-1.3-.3l.7-2.8-1.7-.4-.7 2.8c-.4-.1-.8-.2-1.2-.2l-2.3-.6-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c.1 0 .1 0 .2.1l-.2-.1-1.1 4.4c0 .1-.1.3-.4.2 0 0-1.2-.3-1.2-.3l-.8 1.9 2.2.6c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.8c.5.1.9.2 1.3.3l-.7 2.8 1.7.4.7-2.8c2.9.6 5.1.3 6-2.3.7-2.1-.1-3.3-1.6-4.1 1-.3 1.8-1 2-2.5zm-3.6 5.5c-.5 2.1-4 1-5.1.7l.9-3.7c1.1.3 4.7.8 4.2 3zm.5-5.6c-.5 1.9-3.4.9-4.3.7l.8-3.3c.9.2 4 .6 3.5 2.6z" fill="white" />
    </svg>
  ),
  ETH: () => (
    <svg className="h-10 w-10" viewBox="0 0 32 32" fill="#627EEA">
      <circle cx="16" cy="16" r="16" />
      <path d="M16 3l-.3 1v17l.3.3 7.5-4.4L16 3z" fillOpacity=".8" fill="white" />
      <path d="M16 3L8.5 16.9l7.5 4.4V3z" fill="white" />
      <path d="M16 21.3l-.2.2v6.2l.2.6 7.5-10.6-7.5 3.6z" fillOpacity=".8" fill="white" />
      <path d="M16 28.3v-7L8.5 16.9 16 28.3z" fill="white" />
    </svg>
  ),
  XMR: () => (
    <svg className="h-10 w-10" viewBox="0 0 32 32" fill="#FF6600">
      <circle cx="16" cy="16" r="16" />
      <path d="M24.8 21.6v-7.1l-4.4 4.4-4.4-4.4-4.4 4.4v7.1h-2.9v-11l7.3-7.3 7.3 7.3v11h-2.9z" fill="white" />
    </svg>
  ),
  SOL: () => (
    <svg className="h-10 w-10" viewBox="0 0 32 32" fill="#14F195">
      <circle cx="16" cy="16" r="16" fill="#000" />
      <path d="M7 22.8l3-3h15l-3 3H7zm18-8.6l-3 3H7l3-3h15zM10 5l-3 3h15l3-3H10z" fill="#14F195" />
    </svg>
  )
};

// --- Constants ---
const REPORT_FORM_URL = "https://forms.gle/MkUCRvdXBghA2HQm6";

const TEAM_HIERARCHY = [
  { 
    id: "exec", 
    label: "Executive Leadership", 
    members: [
      { name: "Boaz Acosta", role: "FOUNDER & CEO", email: "boaz@intelguard.org", telegram: "@bo_sint", isVerified: true, isFounder: true },
      { name: "Monroe Wright", role: "COO", email: "monroe@intelguard.org" }
    ]
  },
  { 
    id: "ops", 
    label: "Investigations", 
    members: [
      { name: "John Davis", role: "HEAD OF INVESTIGATIONS", email: "john@intelguard.org" },
      { name: "Vinnie Castro", role: "SENIOR INVESTIGATOR", email: "vinnie@intelguard.org" },
      { name: "Oliver Dudas", role: "INVESTIGATOR", email: "oliver@intelguard.org" }
    ]
  },
  { 
    id: "training", 
    label: "Academy", 
    members: [
      { name: "Mason Woods", role: "INVESTIGATOR IN TRAINING", email: "Internal Assignment" }
    ]
  }
];

const IMPACT_STATS = [
  { label: "Actionable Cases Closed", value: "90", suffix: "+", icon: <ShieldCheck className="w-6 h-6 text-white" /> },
  { label: "CSAM Databases Eradicated", value: "6", suffix: "+ TB", icon: <Database className="w-6 h-6 text-white" /> }
];

const CRYPTO_WALLETS = [
  { name: "Bitcoin", symbol: "BTC", addr: "bc1qyh5jdwqq7frw5fjdyxcgejhx79sjpm6pf3zfr3", component: <CryptoLogos.BTC /> },
  { name: "Ethereum", symbol: "ETH", addr: "0x690B9A9E9aa1349101842367582562691a62002d", component: <CryptoLogos.ETH /> },
  { name: "Monero", symbol: "XMR", addr: "45VSTwXcBpFNoV6oaxnL6yBbw7oRPRJ2BCmonTeSnuJQQwdnikQzQhwVcYK73ttt1Rbn2F1TQmAUJDVncXM8qj8z9PmcAaD", component: <CryptoLogos.XMR /> },
  { name: "Solana", symbol: "SOL", addr: "7vEshR7S9S9uPjRkH5K2JtJv1wV6f5m6PjRkH5K2JtJv", component: <CryptoLogos.SOL /> }
];

const COOPERATION_LIST = [
  { name: "FBI", component: <AgencyLogos.FBI /> },
  { name: "INTERPOL", component: <AgencyLogos.INTERPOL /> },
  { name: "EUROPOL", component: <AgencyLogos.EUROPOL /> },
  { name: "A.F.P", component: <AgencyLogos.FBI /> }, // Fallback to similar icon
  { name: "U.S.S.S", component: <AgencyLogos.FBI /> }
];

// --- Sub-Components ---

const SectionHeading = ({ title, subtitle, light = false, center = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border ${light ? 'bg-black/5 border-black/10 text-black/60' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'} text-[10px] font-black uppercase tracking-widest`}>
      <div className={`w-1 h-1 rounded-full animate-pulse ${light ? 'bg-black' : 'bg-blue-500'}`} />
      {subtitle}
    </div>
    <h2 className={`text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] ${light ? 'text-black' : 'text-white'}`}>
      {title}
    </h2>
  </div>
);

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  const copyToClipboard = (text) => {
    if (text === "Internal Assignment") return;
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopySuccess(text);
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navTabs = ['Cooperation', 'Impact', 'Donate'];

  const renderContent = () => {
    switch(activeView) {
      case 'report':
        return (
          <section className="pt-32 pb-48 bg-[#F8F9FA] text-black min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading title="Intelligence Intake" subtitle="Report a Case" light />
              <div className="grid lg:grid-cols-3 gap-8 mb-20 items-start">
                <div className="lg:col-span-2 space-y-8">
                  <div className="p-8 md:p-12 bg-white border border-black/5 rounded-[40px] shadow-sm">
                    <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-4">
                      <ShieldAlert className="w-8 h-8 text-red-600" />
                      Our Investigative Scope
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8 text-gray-500 font-medium">
                      <div className="space-y-6">
                        <div className="flex gap-4"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" /><p>CSAM Distribution Networks</p></div>
                        <div className="flex gap-4"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" /><p>Targeted Cyber-Harassment</p></div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex gap-4"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" /><p>Non-Consensual Image Distribution</p></div>
                        <div className="flex gap-4"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" /><p>Advanced Fugitive Location (OSINT)</p></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-10 bg-blue-600 rounded-[32px] text-white">
                      <Clock className="w-8 h-8 text-blue-200 mb-6" />
                      <h4 className="text-lg font-black uppercase mb-2">Response Times</h4>
                      <p className="text-sm text-blue-50 leading-relaxed font-medium">Emergency cases triaged within 12-24 hours. General requests 3-5 days.</p>
                    </div>
                    <div className="p-10 bg-black rounded-[32px] text-white">
                      <Lock className="w-8 h-8 text-blue-400 mb-6" />
                      <h4 className="text-lg font-black uppercase mb-2">Secure & Anonymous</h4>
                      <p className="text-sm text-white/60 leading-relaxed font-medium">We use zero-knowledge protocols for all intake data.</p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-32 p-10 bg-white border border-black/5 shadow-2xl rounded-[48px] text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-600/20">
                      <AlertCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-4">Submit Intelligence</h3>
                    <a href={REPORT_FORM_URL} target="_blank" rel="noopener noreferrer" className="w-full py-6 bg-black text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3">
                      Report Tip Now <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
              <button onClick={() => setActiveView('home')} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-600"><ArrowRight className="rotate-180 w-4 h-4" /> Return to Hub</button>
            </div>
          </section>
        );
      case 'team':
        return (
          <section className="pt-32 pb-48 bg-[#080808] text-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading title="Personnel" subtitle="Verified Investigative Chain" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEAM_HIERARCHY.flatMap(s => s.members).map((member, i) => (
                  <div key={i} className="p-8 bg-[#111] border border-white/5 rounded-[32px] hover:border-blue-600/40 transition-all flex flex-col justify-between h-72">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold tracking-tight">{member.name}</h3>
                        {member.isFounder && <Crown className="w-4 h-4 text-blue-500" />}
                        {member.isVerified && <ShieldCheck className="w-4 h-4 text-blue-500" />}
                      </div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-8">{member.role}</div>
                    </div>
                    <div className="pt-6 border-t border-white/5 space-y-3">
                      <div onClick={() => copyToClipboard(member.email)} className={`flex items-center justify-between text-xs text-gray-400 hover:text-white cursor-pointer transition-colors ${member.email === "Internal Assignment" ? "italic opacity-20 pointer-events-none" : ""}`}>
                        <span className="truncate">{member.email}</span>
                        <Copy className="w-3 h-3 shrink-0" />
                      </div>
                      {member.telegram && (
                        <div onClick={() => copyToClipboard(member.telegram)} className="flex items-center gap-2 text-xs text-gray-400 hover:text-blue-500 cursor-pointer transition-colors">
                          <Send className="w-3 h-3" /> <span>{member.telegram}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveView('home')} className="mt-12 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors">
                <ArrowRight className="rotate-180 w-4 h-4" /> Back to Terminal
              </button>
            </div>
          </section>
        );
      default:
        return (
          <>
            <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-48 bg-white overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[#080808] hidden lg:block skew-x-[-12deg] translate-x-20" />
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                      <Activity className="w-3 h-3 animate-pulse" /> Civilian Investigative Unit
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-black mb-8 uppercase">Protecting <br /><span className="text-blue-600">The Human</span> <br />Network.</h1>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg mb-10">An elite non-profit organization utilizing advanced OSINT to expose exploitation networks and protect digital victims globally.</p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => setActiveView('report')} className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-blue-600 transition-all flex items-center shadow-2xl active:scale-95"><BadgeAlert className="w-5 h-5 mr-3" /> Report Abuse Case</button>
                      <button onClick={() => setActiveView('team')} className="px-10 py-5 border border-black/10 text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-black hover:text-white transition-all active:scale-95">The Team</button>
                    </div>
                  </div>
                  <div className="hidden lg:block relative animate-in fade-in zoom-in-95 duration-1000">
                    <div className="bg-white/5 backdrop-blur-3xl p-16 rounded-[48px] border border-white/10 shadow-2xl text-center relative z-10">
                      <div className="w-48 h-48 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-8 mx-auto p-4">
                        <IntelGuardLogo className="w-full h-full" />
                      </div>
                      <h3 className="text-white text-3xl font-black uppercase mb-4 tracking-tighter">Verified Ops</h3>
                      <p className="text-white/40 text-sm mb-8 font-medium">Authoritative intelligence bridging civilian initiative with global enforcement.</p>
                      <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                            <Fingerprint className="w-4 h-4 text-blue-500 opacity-30" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="impact" className="py-32 bg-[#080808]">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title="Quantifiable Results" subtitle="Impact" center />
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {IMPACT_STATS.map((stat, i) => (
                    <div key={i} className="bg-[#111] border border-white/5 rounded-[48px] p-12 transition-all hover:border-white/20 group">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-12 group-hover:scale-110 transition-transform duration-500">{stat.icon}</div>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-8xl font-black tracking-tighter text-white">{stat.value}</span>
                        <span className="text-4xl font-black text-blue-600 uppercase">{stat.suffix}</span>
                      </div>
                      <p className="text-lg font-bold text-gray-400 uppercase tracking-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="cooperation" className="py-24 bg-white overflow-hidden border-y border-black/5">
              <div className="flex items-center gap-20 whitespace-nowrap animate-marquee">
                {[...COOPERATION_LIST, ...COOPERATION_LIST].map((agency, i) => (
                  <div key={i} className="flex items-center gap-6 opacity-30 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                    {agency.component}
                    <span className="text-sm font-black uppercase tracking-widest text-black">{agency.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="donate" className="py-32 bg-black text-white">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title="Fund The Mission" subtitle="Donations" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CRYPTO_WALLETS.map((c, i) => (
                    <div key={i} onClick={() => copyToClipboard(c.addr)} className="group p-10 bg-[#111] border border-white/5 rounded-[40px] cursor-pointer hover:bg-white hover:text-black transition-all duration-500">
                      <div className="flex justify-between items-center mb-8">
                        {c.component}
                        {copySuccess === c.addr ? <CheckCircle2 className="text-green-500" /> : <Copy className="w-4 h-4 opacity-20 group-hover:opacity-100" />}
                      </div>
                      <h4 className="text-xl font-black uppercase mb-2">{c.name}</h4>
                      <div className="text-[8px] font-mono break-all opacity-40 leading-relaxed">{c.addr}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-blue-600 selection:text-white">
      <div className={`fixed inset-0 z-[60] bg-black text-white transition-transform duration-700 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="p-6 flex justify-between items-center">
           <IntelGuardLogo className="w-10 h-10 invert" />
           <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-[70vh] gap-8">
          {navTabs.map(tab => (
            <button key={tab} onClick={() => scrollToSection(tab)} className="text-4xl font-black uppercase tracking-tighter">{tab}</button>
          ))}
          <button onClick={() => { setActiveView('team'); setIsMobileMenuOpen(false); }} className="text-4xl font-black uppercase tracking-tighter text-blue-500">The Team</button>
        </div>
      </div>

      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || activeView !== 'home' ? 'bg-white/90 backdrop-blur-xl border-b border-black/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('home')}>
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center overflow-hidden">
              <IntelGuardLogo className="w-8 h-8" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase hidden sm:inline">Intel<span className="text-blue-600">Guard</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-1 bg-black/5 p-1 rounded-full">
            {navTabs.map((item) => (
              <button key={item} onClick={() => { if(activeView !== 'home') setActiveView('home'); setTimeout(() => scrollToSection(item), 100); }} className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-all rounded-full hover:bg-white">{item}</button>
            ))}
            <div className="w-px h-4 bg-black/10 mx-2" />
            <button onClick={() => setActiveView('team')} className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${activeView === 'team' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-black hover:bg-white'}`}>The Team</button>
          </div>
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-6 h-6" /></button>
        </div>
      </nav>

      <main>{renderContent()}</main>

      <footer className="py-32 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8"><IntelGuardLogo className="w-6 h-6" /><span className="text-lg font-black uppercase tracking-tighter">IntelGuard</span></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-loose">Elite civilian OSINT network dismantling systemic digital exploitation.</p>
            </div>
            <div>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-10">Communications</div>
              <div className="space-y-6">
                <a href="mailto:contact@intelguard.org" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors"><Mail className="w-4 h-4" /> contact@intelguard.org</a>
                <a href="mailto:tipline@intelguard.org" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"><ShieldAlert className="w-4 h-4" /> tipline@intelguard.org</a>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-10">Compliance</div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-loose">IntelGuard operates in strict compliance with federal investigative and OSINT guidelines.</p>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; width: fit-content; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.6s ease-out forwards; }
      `}} />
    </div>
  );
}
