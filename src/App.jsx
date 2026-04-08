import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ChevronRight, 
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
  Verified,
  Crown,
  ShieldCheck,
  Database,
  Clock,
  ShieldAlert,
  FileSearch,
  Lock,
  MessageSquareWarning
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

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
    value: "8", 
    suffix: "+ TB", 
    icon: <Database className="w-6 h-6 text-white" /> 
  }
];

const CRYPTO_WALLETS = [
  { name: "Bitcoin", symbol: "BTC", addr: "bc1qyh5jdwqq7frw5fjdyxcgejhx79sjpm6pf3zfr3", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg" },
  { name: "Ethereum", symbol: "ETH", addr: "0x690B9A9E9aa1349101842367582562691a62002d", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
  { name: "Monero", symbol: "XMR", addr: "45VSTwXcBpFNoV6oaxnL6yBbw7oRPRJ2BCmonTeSnuJQQwdnikQzQhwVcYK73ttt1Rbn2F1TQmAUJDVncXM8qj8z9PmcAaD", logo: "https://cryptologos.cc/logos/monero-xmr-logo.svg" },
  { name: "Solana", symbol: "SOL", addr: "7vEshR7S9S9uPjRkH5K2JtJv1wV6f5m6PjRkH5K2JtJv", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg" },
  { name: "Litecoin", symbol: "LTC", addr: "LNV6oaxnL6yBbw7oRPRJ2BCmonTeSnuJQQwdnikQzQhw", logo: "https://cryptologos.cc/logos/litecoin-ltc-logo.svg" }
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
  <div className={`mb-16 ${center ? 'text-center' : ''}`}>
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border ${light ? 'bg-black/5 border-black/10 text-black/60' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'} text-[10px] font-black uppercase tracking-widest`}>
      <div className={`w-1 h-1 rounded-full animate-pulse ${light ? 'bg-black' : 'bg-blue-50'}`} />
      {subtitle}
    </div>
    <h2 className={`text-5xl md:text-6xl font-black tracking-tighter uppercase ${light ? 'text-black' : 'text-white'}`}>
      {title}
    </h2>
  </div>
);

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [hoveredTab, setHoveredTab] = useState(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text) => {
    if (text === "Internal Assignment") return;
    navigator.clipboard.writeText(text);
    setCopySuccess(text);
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const scrollToSection = (id) => {
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
          <section className="pt-32 pb-48 bg-[#FDFDFD] text-black min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading title="Intelligence Intake" subtitle="Report a Case" light />
              
              <div className="grid lg:grid-cols-3 gap-8 mb-20">
                <div className="lg:col-span-2 space-y-12">
                  <div className="p-10 bg-white border border-black/5 rounded-[40px] shadow-sm">
                    <h3 className="text-3xl font-black uppercase mb-8 flex items-center gap-4">
                      <ShieldAlert className="w-8 h-8 text-red-600" />
                      Our Investigative Scope
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8 text-gray-500 font-medium">
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                          <p>CSAM Distribution & Hosting Networks</p>
                        </div>
                        <div className="flex gap-4">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                          <p>Targeted Cyber-Stalking & Harassment</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                          <p>Non-Consensual Image Distribution (NCII)</p>
                        </div>
                        <div className="flex gap-4">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                          <p>Advanced OSINT for Fugitive Locating</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-blue-50 border border-blue-100 rounded-[32px]">
                      <Clock className="w-8 h-8 text-blue-600 mb-6" />
                      <h4 className="text-lg font-black uppercase mb-2">Response Times</h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        Emergency cases are reviewed within 12-24 hours. Standard OSINT intelligence requests are processed within 3-5 business days.
                      </p>
                    </div>
                    <div className="p-8 bg-black rounded-[32px] text-white">
                      <Lock className="w-8 h-8 text-blue-400 mb-6" />
                      <h4 className="text-lg font-black uppercase mb-2">Anonymity Guaranteed</h4>
                      <p className="text-sm text-white/60 leading-relaxed font-medium">
                        Your data is encrypted. We do not store PII for tipsters unless explicitly required for legal testimony.
                      </p>
                    </div>
                  </div>

                  <div className="p-10 border-2 border-dashed border-black/10 rounded-[40px]">
                    <h4 className="text-xl font-black uppercase mb-4">Submission Guidelines</h4>
                    <ul className="space-y-3 text-sm text-gray-500 font-medium">
                      <li className="flex gap-3 items-start">• Include direct URLs to the infringing material whenever possible.</li>
                      <li className="flex gap-3 items-start">• Attach screenshots of metadata or IP headers if available.</li>
                      <li className="flex gap-3 items-start">• Do not engage with the target after reporting to IntelGuard.</li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-32 p-10 bg-white border border-black/5 shadow-2xl rounded-[48px] text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-600/20">
                      <MessageSquareWarning className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-4">Ready to Report?</h3>
                    <p className="text-sm text-gray-500 font-medium mb-10 leading-relaxed">
                      You will be redirected to our secure intake portal hosted on encrypted infrastructure.
                    </p>
                    <a 
                      href={REPORT_FORM_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-6 bg-black text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group"
                    >
                      Open Official Tip Form
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    <p className="mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      IntelGuard Secure Protocol V4.2
                    </p>
                  </div>
                </div>
              </div>

              <button onClick={() => setActiveView('home')} className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-blue-500 hover:text-black transition-colors">
                <ArrowRight className="rotate-180 w-4 h-4" /> Return to IntelGuard Hub
              </button>
            </div>
          </section>
        );
      case 'team':
        return (
          <section className="pt-32 pb-48 bg-[#050505] text-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading title="Personnel" subtitle="Verified Investigative Chain" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEAM_HIERARCHY.flatMap(s => s.members).map((member, i) => (
                  <div key={i} className="p-8 bg-[#0A0A0A] border border-white/5 rounded-[24px] hover:border-blue-600/40 transition-all flex flex-col justify-between group h-64">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold tracking-tight">{member.name}</h3>
                          {member.isFounder && <Crown className="w-4 h-4 text-blue-500" />}
                          {member.isVerified && <Verified className="w-4 h-4 text-blue-500" />}
                        </div>
                      </div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-8">{member.role}</div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5 space-y-3">
                      <div onClick={() => copyToClipboard(member.email)} className={`flex items-center justify-between text-sm text-gray-400 hover:text-white cursor-pointer transition-colors ${member.email === "Internal Assignment" ? "italic opacity-20 pointer-events-none" : ""}`}>
                        <span className="truncate text-xs">{member.email}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
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
              <button onClick={() => setActiveView('home')} className="mt-12 inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors">
                <ArrowRight className="rotate-180 w-4 h-4" /> Back to Terminal
              </button>
            </div>
          </section>
        );
      case 'removals':
        return (
          <section className="py-48 bg-white text-black min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading title="Data Integrity" subtitle="Protocol: Redaction & Removal" light />
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
                    IntelGuard operates a high-priority data removal protocol for survivors of digital exploitation. We work directly with platforms and databases to redact harmful PII.
                  </p>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4 p-6 bg-black/5 rounded-3xl border border-transparent hover:border-blue-600 transition-all">
                      <Trash2 className="w-10 h-10 text-red-500 shrink-0" />
                      <div>
                        <h4 className="text-lg font-black uppercase mb-1">Redaction Requests</h4>
                        <p className="text-sm text-gray-500">Fast-track removal of leaked images, videos, and residential information.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-6 bg-black/5 rounded-3xl border border-transparent hover:border-blue-600 transition-all">
                      <Globe className="w-10 h-10 text-blue-500 shrink-0" />
                      <div>
                        <h4 className="text-lg font-black uppercase mb-1">Crawler De-indexing</h4>
                        <p className="text-sm text-gray-500">Removal of cached results from major search engines and archive sites.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-12 bg-black rounded-[40px] text-white">
                  <h3 className="text-3xl font-black uppercase mb-6 tracking-tighter">Submit Removal Claim</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="YOUR EMAIL" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest focus:border-blue-500 outline-none" />
                    <textarea placeholder="DESCRIPTION OF DATA & LINKS" rows="4" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest focus:border-blue-500 outline-none resize-none"></textarea>
                    <button className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-700 transition-all">Execute Redaction Request</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-48 bg-white overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[#050505] hidden lg:block skew-x-[-12deg] translate-x-20" />
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                      <Activity className="w-3 h-3 animate-pulse" />
                      Civilian Investigative Unit
                    </div>
                    <h1 className="text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter text-black mb-8 uppercase">
                      Securing <br />
                      <span className="text-blue-600">Digital</span> Frontiers.
                    </h1>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg mb-10">
                      A strategic non-profit dedicated to dismantling exploitation networks through official OSINT and high-level agency cooperation.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => setActiveView('report')} className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-600 transition-all flex items-center group shadow-xl hover:shadow-blue-500/20">
                        <BadgeAlert className="w-5 h-5 mr-3" /> Report Abuse Case
                      </button>
                      <button onClick={() => setActiveView('team')} className="px-10 py-5 border border-black/10 text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-50 transition-all flex items-center">
                        Explore Personnel
                      </button>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hidden lg:block relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
                    <div className="bg-white/5 backdrop-blur-2xl p-16 rounded-[40px] border border-white/10 shadow-2xl text-center relative z-10">
                      <div className="w-48 h-48 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-8 mx-auto overflow-hidden p-2">
                        <img src={LOGO_URL} alt="IntelGuard Logo" className="w-full h-full object-contain" />
                      </div>
                      <h3 className="text-white text-3xl font-black uppercase mb-4 tracking-tighter">Verified Network</h3>
                      <p className="text-white/60 text-sm mb-8">Authoritative intelligence bridging civilian effort with global enforcement.</p>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                          <div key={i} className="h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                            <Fingerprint className="w-5 h-5 text-blue-400 opacity-40" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Impact Section */}
            <section id="impact" className="py-32 bg-[#050505]">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title="Quantifiable Results" subtitle="Impact" center />
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {IMPACT_STATS.map((stat, i) => (
                    <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-12 transition-all hover:bg-white group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-12 group-hover:bg-black transition-colors">
                        {stat.icon}
                      </div>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-8xl font-black tracking-tighter text-white group-hover:text-black transition-colors">
                          {stat.value}
                        </span>
                        <span className="text-4xl font-black text-gray-500 group-hover:text-black/40 transition-colors uppercase">
                          {stat.suffix}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-400 group-hover:text-black/60 transition-colors uppercase tracking-tight">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Cooperation Ribbon */}
            <section id="cooperation" className="py-24 bg-white border-y border-black/5">
              <div className="flex overflow-hidden whitespace-nowrap relative">
                <div className="flex animate-marquee items-center">
                  {[...COOPERATION_LIST, ...COOPERATION_LIST].map((agency, i) => (
                    <a key={i} href={agency.url} target="_blank" className="mx-12 group flex items-center gap-6">
                      <img src={agency.logo} alt={agency.name} className="h-12 w-auto grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all" />
                      <span className="text-lg font-black tracking-tighter text-black/20 group-hover:text-black uppercase">{agency.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* Donate Section */}
            <section id="donate" className="py-32 bg-black text-white">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title="Fund Mission" subtitle="Operational Funding" />
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {CRYPTO_WALLETS.map((c, i) => (
                    <div key={i} onClick={() => copyToClipboard(c.addr)} className="group p-8 bg-white/5 border border-white/5 rounded-[40px] cursor-pointer hover:bg-white hover:text-black transition-all">
                      <div className="flex justify-between items-center mb-8">
                        <img src={c.logo} alt={c.name} className="h-10 w-10 group-hover:grayscale transition-all" />
                        {copySuccess === c.addr ? <CheckCircle2 className="text-green-500" /> : <Copy className="text-gray-500" />}
                      </div>
                      <h4 className="text-xl font-black uppercase mb-1">{c.name}</h4>
                      <div className="text-[9px] font-mono break-all opacity-40 group-hover:opacity-100">{c.addr}</div>
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
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden scroll-smooth">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-[100]" style={{ scaleX }} />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || activeView !== 'home' ? 'bg-white/90 backdrop-blur-xl border-b border-black/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveView('home')}>
            <div className="relative w-12 h-12 bg-black rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500 overflow-hidden p-1">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">
              Intel<span className="text-blue-600">Guard</span>
            </span>
          </div>

          <div className="hidden md:flex items-center bg-black/5 rounded-full px-2 py-1.5 relative">
            {navTabs.map((item) => (
              <button 
                key={item} 
                onMouseEnter={() => setHoveredTab(item)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={(e) => { 
                  if (activeView !== 'home') {
                    setActiveView('home');
                    setTimeout(() => scrollToSection(item), 100);
                  } else {
                    scrollToSection(item);
                  }
                }} 
                className="relative z-10 px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors duration-300"
              >
                {item}
                {hoveredTab === item && (
                  <motion.div 
                    layoutId="gooey-nav"
                    className="absolute inset-0 bg-white shadow-sm border border-black/5 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <div className="w-[1px] h-4 bg-black/10 mx-2" />
            <button 
              onClick={() => setActiveView('team')} 
              className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 ${activeView === 'team' ? 'bg-blue-600 text-white' : 'text-black hover:text-blue-600'}`}
            >
              The Team
            </button>
          </div>
        </div>
      </nav>

      <main>
        {renderContent()}
      </main>

      <footer className="py-24 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6" onClick={() => setActiveView('home')}>
                 <div className="w-10 h-10 overflow-hidden rounded-lg">
                   <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
                 </div>
                 <span className="text-xl font-black uppercase tracking-tighter">IntelGuard</span>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                Strategic civilian vanguard against digital exploitation.
              </p>
            </div>
            
            <div>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-8">Communications</div>
              <div className="space-y-4">
                <a href="https://t.me/IntelGuard" target="_blank" className="flex items-center gap-3 group text-xs font-black uppercase tracking-widest">
                  <Send className="w-4 h-4 text-blue-500" /> Official Channel
                </a>
                <a href="mailto:contact@intelguard.org" className="flex items-center gap-3 group text-xs font-black uppercase tracking-widest">
                  <Mail className="w-4 h-4 text-blue-500" /> contact@intelguard.org
                </a>
                <a href="mailto:tipline@intelguard.org" className="flex items-center gap-3 group text-xs font-black uppercase tracking-widest">
                  <Mail className="w-4 h-4 text-red-500" /> tipline@intelguard.org
                </a>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-8">Law Enforcement</div>
              <div className="space-y-4">
                <a href="mailto:leer@intelguard.org" className="flex items-center gap-3 group text-xs font-black uppercase tracking-widest">
                  <Briefcase className="w-4 h-4 text-gray-600" /> leer@intelguard.org
                </a>
              </div>
            </div>

            <div>
                 <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6">Organization</div>
                 <div className="flex flex-col gap-3">
                   <button onClick={() => setActiveView('team')} className="text-left text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-blue-600">Personnel</button>
                   <button onClick={() => setActiveView('removals')} className="text-left text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-blue-600">Redactions</button>
                 </div>
            </div>
          </div>

          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">V11.4 Precision Engine</span>
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">© {new Date().getFullYear()} IntelGuard Organization</span>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 60s linear infinite; }
        
        /* Global Smooth Scroll */
        html { 
          scroll-behavior: smooth; 
        }

        /* Better scrollbar for a premium look */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}} />
    </div>
  );
}
