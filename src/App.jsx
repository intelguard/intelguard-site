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

// --- Constants & Assets ---
const LOGO_URL = "https://images.squarespace-cdn.com/content/v1/64f0f622444e7c703f8f1066/703b7194-6d9b-4394-a792-6d2c44869503/Untitled+design+%281%29.png";
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
  { 
    label: "Actionable Cases Closed", 
    value: "90", 
    suffix: "+", 
    icon: <ShieldCheck className="w-6 h-6 text-white" /> 
  },
  { 
    label: "CSAM Databases Eradicated", 
    value: "6", 
    suffix: "+ TB", 
    icon: <Database className="w-6 h-6 text-white" /> 
  }
];

const CRYPTO_WALLETS = [
  { name: "Bitcoin", symbol: "BTC", addr: "bc1qyh5jdwqq7frw5fjdyxcgejhx79sjpm6pf3zfr3", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg" },
  { name: "Ethereum", symbol: "ETH", addr: "0x690B9A9E9aa1349101842367582562691a62002d", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
  { name: "Monero", symbol: "XMR", addr: "45VSTwXcBpFNoV6oaxnL6yBbw7oRPRJ2BCmonTeSnuJQQwdnikQzQhwVcYK73ttt1Rbn2F1TQmAUJDVncXM8qj8z9PmcAaD", logo: "https://cryptologos.cc/logos/monero-xmr-logo.svg" },
  { name: "Solana", symbol: "SOL", addr: "7vEshR7S9S9uPjRkH5K2JtJv1wV6f5m6PjRkH5K2JtJv", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg" }
];

const COOPERATION_LIST = [
  { name: "Federal Bureau of Investigation", url: "https://www.fbi.gov", logo: "https://upload.wikimedia.org/wikipedia/commons/d/da/Seal_of_the_Federal_Bureau_of_Investigation.svg" },
  { name: "INTERPOL", url: "https://www.interpol.int", logo: "https://upload.wikimedia.org/wikipedia/en/e/e4/Interpol_logo.svg" },
  { name: "EUROPOL", url: "https://www.europol.europa.eu", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Europol_logo.svg" },
  { name: "Australian Federal Police", url: "https://www.afp.gov.au", logo: "https://upload.wikimedia.org/wikipedia/en/b/ba/Australian_Federal_Police_logo.svg" },
  { name: "United States Secret Service", url: "https://www.secretservice.gov", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/United_States_Secret_Service_Seal.svg" }
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
                        <div className="flex gap-4">
                          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <p>CSAM Distribution & Hosting Networks</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <p>Targeted Cyber-Stalking & Harassment</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <p>Non-Consensual Image Distribution (NCII)</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <p>Advanced OSINT for Fugitive Locating</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-10 bg-blue-600 rounded-[32px] text-white">
                      <Clock className="w-8 h-8 text-blue-200 mb-6" />
                      <h4 className="text-lg font-black uppercase mb-2">Response Times</h4>
                      <p className="text-sm text-blue-50 leading-relaxed font-medium">
                        Emergency cases are triaged within 12-24 hours. Standard intelligence requests are processed within 3-5 business days.
                      </p>
                    </div>
                    <div className="p-10 bg-black rounded-[32px] text-white">
                      <Lock className="w-8 h-8 text-blue-400 mb-6" />
                      <h4 className="text-lg font-black uppercase mb-2">Secure & Anonymous</h4>
                      <p className="text-sm text-white/60 leading-relaxed font-medium">
                        Tipsters remain anonymous. We use zero-knowledge logging for all incoming intelligence to protect whistleblowers.
                      </p>
                    </div>
                  </div>

                  <div className="p-10 bg-white border-2 border-dashed border-black/10 rounded-[40px]">
                    <h4 className="text-xl font-black uppercase mb-4">Submission Guidelines</h4>
                    <ul className="space-y-4 text-sm text-gray-500 font-medium">
                      <li className="flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                        Include direct URLs to the infringing material whenever possible.
                      </li>
                      <li className="flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                        Attach relevant screenshots of metadata, IP headers, or aliases.
                      </li>
                      <li className="flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                        Do not attempt to communicate with the target after filing this report.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-32 p-10 bg-white border border-black/5 shadow-2xl rounded-[48px] text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-600/20">
                      <AlertCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-4">Submit Intelligence</h3>
                    <p className="text-sm text-gray-500 font-medium mb-10 leading-relaxed">
                      Pressing the button below will open a secure intake form in a new tab. 
                    </p>
                    <a 
                      href={REPORT_FORM_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-6 bg-black text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      Report Tip Now
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <p className="mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      IntelGuard Intake V11.4
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveView('home')} 
                className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-black transition-colors"
              >
                <ArrowRight className="rotate-180 w-4 h-4" /> Return to Hub
              </button>
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
                  <div key={i} className="p-8 bg-[#111] border border-white/5 rounded-[32px] hover:border-blue-600/40 transition-all group flex flex-col justify-between h-72">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold tracking-tight">{member.name}</h3>
                          {member.isFounder && <Crown className="w-4 h-4 text-blue-500" />}
                          {member.isVerified && <ShieldCheck className="w-4 h-4 text-blue-500" />}
                        </div>
                      </div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-8">{member.role}</div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5 space-y-3">
                      <div 
                        onClick={() => copyToClipboard(member.email)} 
                        className={`flex items-center justify-between text-xs text-gray-400 hover:text-white cursor-pointer transition-colors ${member.email === "Internal Assignment" ? "italic opacity-20 pointer-events-none" : ""}`}
                      >
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
            {/* Hero Section */}
            <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-48 bg-white overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[#080808] hidden lg:block skew-x-[-12deg] translate-x-20" />
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                      <Activity className="w-3 h-3 animate-pulse" />
                      Civilian Investigative Unit
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-black mb-8 uppercase">
                      Protecting <br />
                      <span className="text-blue-600">The Human</span> <br />
                      Network.
                    </h1>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg mb-10">
                      An elite non-profit organization utilizing advanced OSINT to expose exploitation networks and protect digital victims globally.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => setActiveView('report')} 
                        className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center shadow-2xl hover:shadow-blue-600/20 active:scale-95"
                      >
                        <BadgeAlert className="w-5 h-5 mr-3" /> Report Abuse Case
                      </button>
                      <button 
                        onClick={() => setActiveView('team')} 
                        className="px-10 py-5 border border-black/10 text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-black hover:text-white transition-all duration-300 flex items-center active:scale-95"
                      >
                        The Team
                      </button>
                    </div>
                  </div>
                  <div className="hidden lg:block relative animate-in fade-in zoom-in-95 duration-1000">
                    <div className="bg-white/5 backdrop-blur-3xl p-16 rounded-[48px] border border-white/10 shadow-2xl text-center relative z-10">
                      <div className="w-48 h-48 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-8 mx-auto p-4">
                        <img src={LOGO_URL} alt="IntelGuard Logo" className="w-full h-full object-contain" />
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

            {/* Impact Section */}
            <section id="impact" className="py-32 bg-[#080808]">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title="Quantifiable Results" subtitle="Impact" center />
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {IMPACT_STATS.map((stat, i) => (
                    <div key={i} className="bg-[#111] border border-white/5 rounded-[48px] p-12 transition-all hover:border-white/20 group">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-12 group-hover:scale-110 transition-transform duration-500">
                        {stat.icon}
                      </div>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-8xl font-black tracking-tighter text-white">
                          {stat.value}
                        </span>
                        <span className="text-4xl font-black text-blue-600 uppercase">
                          {stat.suffix}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-400 uppercase tracking-tight">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Cooperation Ribbon */}
            <section id="cooperation" className="py-24 bg-white overflow-hidden border-y border-black/5">
              <div className="flex items-center gap-20 whitespace-nowrap animate-marquee">
                {[...COOPERATION_LIST, ...COOPERATION_LIST].map((agency, i) => (
                  <div key={i} className="flex items-center gap-6 opacity-30 hover:opacity-100 transition-opacity duration-300">
                    <img src={agency.logo} alt="" className="h-10 w-auto grayscale" />
                    <span className="text-sm font-black uppercase tracking-widest text-black">{agency.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Donate Section */}
            <section id="donate" className="py-32 bg-black text-white">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title="Fund The Mission" subtitle="Donations" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CRYPTO_WALLETS.map((c, i) => (
                    <div 
                      key={i} 
                      onClick={() => copyToClipboard(c.addr)} 
                      className="group p-10 bg-[#111] border border-white/5 rounded-[40px] cursor-pointer hover:bg-white hover:text-black transition-all duration-500"
                    >
                      <div className="flex justify-between items-center mb-8">
                        <img src={c.logo} alt="" className="h-10 w-10" />
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
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-black text-white transition-transform duration-700 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="p-6 flex justify-between items-center">
           <img src={LOGO_URL} alt="" className="h-10 w-10 invert" />
           <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-[70vh] gap-8">
          {navTabs.map(tab => (
            <button key={tab} onClick={() => scrollToSection(tab)} className="text-4xl font-black uppercase tracking-tighter">{tab}</button>
          ))}
          <button onClick={() => { setActiveView('team'); setIsMobileMenuOpen(false); }} className="text-4xl font-black uppercase tracking-tighter text-blue-500">The Team</button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || activeView !== 'home' ? 'bg-white/90 backdrop-blur-xl border-b border-black/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('home')}>
            <div className="w-10 h-10 bg-black rounded-xl p-1.5 flex items-center justify-center overflow-hidden">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase hidden sm:inline">
              Intel<span className="text-blue-600">Guard</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-black/5 p-1 rounded-full">
            {navTabs.map((item) => (
              <button 
                key={item} 
                onClick={() => {
                  if(activeView !== 'home') setActiveView('home');
                  setTimeout(() => scrollToSection(item), 100);
                }} 
                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-all rounded-full hover:bg-white"
              >
                {item}
              </button>
            ))}
            <div className="w-px h-4 bg-black/10 mx-2" />
            <button 
              onClick={() => setActiveView('team')} 
              className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${activeView === 'team' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-black hover:bg-white'}`}
            >
              The Team
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main>
        {renderContent()}
      </main>

      <footer className="py-32 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <img src={LOGO_URL} alt="" className="h-8 w-8" />
                <span className="text-lg font-black uppercase tracking-tighter">IntelGuard</span>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-loose">
                Operating a global civilian OSINT network to identify and dismantle systemic digital exploitation.
              </p>
            </div>
            
            <div>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-10">Communications</div>
              <div className="space-y-6">
                <a href="mailto:contact@intelguard.org" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                  <Mail className="w-4 h-4" /> contact@intelguard.org
                </a>
                <a href="mailto:tipline@intelguard.org" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors">
                  <ShieldAlert className="w-4 h-4" /> tipline@intelguard.org
                </a>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-10">Resources</div>
              <div className="flex flex-col gap-4">
                <button onClick={() => setActiveView('team')} className="text-left text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600">Investigations Team</button>
                <button onClick={() => setActiveView('report')} className="text-left text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600">Intelligence Intake</button>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-10">Compliance</div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-loose">
                IntelGuard complies with all federal OSINT guidelines and privacy protocols.
              </p>
            </div>
          </div>

          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">© {new Date().getFullYear()} IntelGuard Unit</span>
            <div className="flex gap-8">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Privacy</span>
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Terms</span>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { 
          animation: marquee 40s linear infinite; 
          width: fit-content;
        }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.6s ease-out forwards; }
      `}} />
    </div>
  );
}
