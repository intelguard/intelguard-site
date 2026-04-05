import React, { useState, useEffect, useRef } from 'react';

import { 

  Shield, Activity, Database, Users, ChevronDown, 

  Mail, AlertTriangle, Briefcase, Lock, ChevronUp, ExternalLink, ShieldAlert,

  Search, Globe, FileText, Zap, Send, ShieldCheck

} from 'lucide-react';



// --- Custom Hooks ---



const useScrollReveal = (threshold = 0.1) => {

  const ref = useRef(null);

  const [isVisible, setIsVisible] = useState(false);



  useEffect(() => {

    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {

          setIsVisible(true);

        }

      },

      { threshold, rootMargin: "0px 0px -50px 0px" }

    );



    const currentRef = ref.current;

    if (currentRef) observer.observe(currentRef);



    return () => {

      if (currentRef) observer.unobserve(currentRef);

    };

  }, [threshold]);



  return { ref, isVisible };

};



const useAnimatedNumber = (end, duration = 2500) => {

  const [count, setCount] = useState(0);

  const { ref, isVisible } = useScrollReveal(0.5);



  useEffect(() => {

    if (!isVisible) return;

    

    let startTimestamp = null;

    const step = (timestamp) => {

      if (!startTimestamp) startTimestamp = timestamp;

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      

      setCount(Math.floor(easeOutQuart * end));

      

      if (progress < 1) {

        window.requestAnimationFrame(step);

      }

    };

    

    window.requestAnimationFrame(step);

  }, [end, duration, isVisible]);



  return { ref, count };

};



// --- Components ---



const PremiumBackground = () => (

  <div className="fixed inset-0 z-[-1] bg-[#050505]">

    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

  </div>

);



const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);



  useEffect(() => {

    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);



  const scrollTo = (id) => {

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  };



  return (

    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('home')}>

          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">

            <Shield className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />

          </div>

          <span className="text-lg font-semibold tracking-wide text-white">INTELGUARD</span>

        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">

          {['mission', 'impact', 'team', 'partners', 'faq'].map((item) => (

            <button key={item} onClick={() => scrollTo(item)} className="hover:text-white transition-colors capitalize tracking-wide">{item}</button>

          ))}

          <button 

            onClick={() => scrollTo('contact')} 

            className="px-5 py-2.5 bg-white text-black rounded-full hover:bg-neutral-200 hover:scale-105 transition-all duration-300 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)]"

          >

            Contact Us

          </button>

        </div>

      </div>

    </nav>

  );

};



const SectionHeading = ({ title, subtitle, badge, align = "center" }) => {

  const { ref, isVisible } = useScrollReveal();

  return (

    <div ref={ref} className={`mb-20 transition-all duration-1000 ease-out ${align === 'center' ? 'text-center' : 'text-left'} ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-8 blur-sm'}`}>

      {badge && (

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-neutral-200 text-xs font-bold uppercase tracking-widest mb-6">

          {badge}

        </div>

      )}

      <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6 leading-tight">

        {title}

      </h2>

      {subtitle && <p className={`text-neutral-400 text-lg font-light leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>{subtitle}</p>}

    </div>

  );

};



const Hero = () => {

  const { ref, isVisible } = useScrollReveal();

  

  return (

    <section id="home" className="min-h-[100svh] flex items-center justify-center pt-24 px-6 relative overflow-hidden">

      <div ref={ref} className={`max-w-5xl mx-auto text-center transition-all duration-1000 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-12 blur-md'}`}>

        

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-sm font-medium mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">

          <Lock className="w-3.5 h-3.5" /> Verified 501(c)(3) Non-Profit

        </div>

        

        <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 mb-8 leading-[1.1]">

          Protect the Vulnerable.<br />Track the Predators.

        </h1>

        

        <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">

          We deploy elite Open-Source Intelligence (OSINT) to assist global law enforcement in dismantling networks of child exploitation and human trafficking.

        </p>

        

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">

          <button 

            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}

            className="group relative px-8 py-4 w-full sm:w-auto bg-white text-black font-semibold rounded-full hover:scale-105 transition-all duration-300 overflow-hidden"

          >

            <span className="relative z-10 flex items-center gap-2">Report a Tip <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"/></span>

            <div className="absolute inset-0 bg-neutral-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />

          </button>

          <button 

            onClick={() => document.getElementById('mission').scrollIntoView({ behavior: 'smooth' })}

            className="px-8 py-4 w-full sm:w-auto bg-[#111] text-white font-medium rounded-full border border-white/10 hover:bg-white/5 transition-colors"

          >

            Our Mission

          </button>

        </div>

      </div>

    </section>

  );

};



const Mission = () => {

  const { ref, isVisible } = useScrollReveal();

  const points = [

    { title: "Target Identification", desc: "Locating predators within encrypted and decentralized digital environments." },

    { title: "Evidence Synthesis", desc: "Compiling forensic-grade intelligence packages for law enforcement action." },

    { title: "Victim Rescue Support", desc: "Providing real-time geolocation data to help agencies intercept trafficking operations." }

  ];



  return (

    <section id="mission" className="py-32 px-6 bg-[#0a0a0a]">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        <div ref={ref} className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>

          <SectionHeading 

            align="left"

            badge="The Mission" 

            title="Dismantling the Inhuman Economy." 

            subtitle="IntelGuard was founded on a singular premise: Technology used for harm must be met with superior technology used for justice."

          />

          <div className="space-y-6">

            {points.map((p, i) => (

              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 group hover:bg-white/[0.05] transition-all">

                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:bg-white/10 transition-colors">

                  <Zap className="w-6 h-6" />

                </div>

                <div>

                  <h4 className="text-white text-lg font-semibold mb-1">{p.title}</h4>

                  <p className="text-neutral-400 text-sm leading-relaxed">{p.desc}</p>

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className={`relative rounded-3xl overflow-hidden aspect-square lg:aspect-video bg-neutral-900 border border-white/10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>

          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover bg-center grayscale opacity-40 mix-blend-luminosity" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 p-8 backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl">

            <p className="text-base text-neutral-200 font-light italic leading-relaxed">"Our goal is not just to witness these crimes, but to provide the technical keys that allow law enforcement to walk through the door."</p>

            <p className="text-xs text-white/50 mt-4 uppercase tracking-[0.2em] font-bold">— IntelGuard Operational Directive</p>

          </div>

        </div>

      </div>

    </section>

  );

};



const Stats = () => {

  const { ref: casesRef, count: casesCount } = useAnimatedNumber(230);

  const { ref: dataRef, count: dataCount } = useAnimatedNumber(400);



  const tactics = [

    { icon: Search, label: "Digital Forensics", text: "Deep-web link analysis and metadata extraction." },

    { icon: Globe, label: "Network Mapping", text: "Visualizing global trafficking nodes and financial funnels." },

    { icon: FileText, label: "Case Generation", text: "Legal-ready documentation delivered to federal agencies." },

    { icon: Activity, label: "Live Monitoring", text: "24/7 scanning of known predatory forums and channels." }

  ];



  return (

    <section id="impact" className="py-32 px-6 relative bg-[#050505]">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">

        <SectionHeading badge="Impact" title="Quantifiable Results" subtitle="Our ongoing commitment to rendering the digital world inhospitable to predators." />

        

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">

          <div ref={casesRef} className="group relative p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden backdrop-blur-md">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10">

              <ShieldAlert className="w-8 h-8 text-white transition-colors" />

            </div>

            <h3 className="text-8xl font-bold tracking-tighter text-white mb-4 flex items-baseline gap-2">

              {casesCount}<span className="text-4xl text-neutral-500 font-medium">+</span>

            </h3>

            <p className="text-xl text-neutral-300 font-medium tracking-wide">Actionable Cases Closed</p>

          </div>



          <div ref={dataRef} className="group relative p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden backdrop-blur-md">

             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10">

              <Database className="w-8 h-8 text-white transition-colors" />

            </div>

            <h3 className="text-8xl font-bold tracking-tighter text-white mb-4 flex items-baseline gap-2">

              {dataCount}<span className="text-4xl text-neutral-500 font-medium">+ GB</span>

            </h3>

            <p className="text-xl text-neutral-300 font-medium tracking-wide">Illicit Material Eradicated</p>

          </div>

        </div>



        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {tactics.map((t, i) => (

            <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all hover:-translate-y-1">

              <t.icon className="w-6 h-6 text-neutral-300 mb-5" />

              <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-3">{t.label}</h4>

              <p className="text-sm text-neutral-500 leading-relaxed">{t.text}</p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

};



const TeamMember = ({ name, role, email, telegram, isOwner, delay }) => {

  const { ref, isVisible } = useScrollReveal();

  

  return (

    <div 

      ref={ref} 

      className={`relative p-8 rounded-3xl bg-transparent border border-white/5 hover:bg-white/[0.02] hover:border-white/10 transition-all duration-500 ease-out group ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-8 blur-sm'}`}

      style={{ transitionDelay: `${delay}ms` }}

    >

      <div className="flex flex-col h-full">

        <div className="flex items-center gap-2 mb-1">

          <h4 className="text-xl font-medium text-white tracking-tight">{name}</h4>

          {isOwner && (

            <div className="flex items-center gap-1 ml-1">

              <div title="Owner" className="relative flex items-center justify-center">

                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" fill="currentColor">

                  <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />

                </svg>

              </div>

              <div title="Verified Investigator" className="relative flex items-center justify-center">

                <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-500" fill="currentColor">

                  <path d="M22.5 12.5c0-1.58-.8-3.04-2.12-3.88.13-1.58-.35-3.2-1.42-4.27-1.07-1.07-2.69-1.55-4.27-1.42C13.84 1.62 12.38.82 10.8.82c-1.58 0-3.04.8-3.88 2.12-1.58-.13-3.2.35-4.27 1.42-1.07 1.07-1.55 2.69-1.42 4.27C.32 9.46-.48 10.92-.48 12.5c0 1.58.8 3.04 2.12 3.88-.13 1.58.35 3.2 1.42 4.27 1.07 1.07 2.69 1.55 4.27 1.42 1.15 1.15 2.61 1.95 4.19 1.95s3.04-.8 3.88-2.12c1.58.13 3.2-.35 4.27-1.42 1.07-1.07 1.55-2.69 1.42-4.27 1.32-.84 2.12-2.3 2.12-3.88zm-11.5 5l-4.5-4.5 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />

                </svg>

              </div>

            </div>

          )}

        </div>

        <p className="text-neutral-500 text-sm font-medium tracking-wide uppercase mb-6">{role}</p>

        

        <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors flex flex-col gap-3">

          {email && (

            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors font-mono">

              {email} <ExternalLink className="w-3 h-3 opacity-50" />

            </a>

          )}

          {telegram && (

            <a href={telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#26A5E4] transition-colors font-mono">

              <Send className="w-3.5 h-3.5" /> @bo_sint

            </a>

          )}

          {!email && !telegram && (

            <span className="text-sm text-neutral-600 font-mono italic">Internal Assignment</span>

          )}

        </div>

      </div>

    </div>

  );

};



const Team = () => {

  const team = [

    { name: "Boaz Acosta", role: "Founder & CEO", email: "boaz@intelguard.org", telegram: "https://t.me/bo_sint", isOwner: true },

    { name: "Monroe Wright", role: "COO", email: "monroe@intelguard.org" },

    { name: "John Davis", role: "Head of Investigations", email: "john@intelguard.org" },

    { name: "Vinnie Castro", role: "Senior Investigator", email: "vinnie@intelguard.org" },

    { name: "Oliver Dudas", role: "Investigator", email: "oliver@intelguard.org" },

    { name: "Mason Woods", role: "Investigator in Training", email: null },

  ];



  return (

    <section id="team" className="py-32 px-6">

      <div className="max-w-7xl mx-auto">

        <SectionHeading badge="Leadership" title="The Intelligence Unit" subtitle="Specialized operators bridging the gap between open-source data and law enforcement action." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {team.map((member, i) => (

            <TeamMember key={i} {...member} delay={i * 100} />

          ))}

        </div>

      </div>

    </section>

  );

};



const Marquee = ({ items, reverse = false, speed = "40s" }) => {

  return (

    <div className="relative flex overflow-hidden w-full py-10 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">

      <div className={`flex min-w-full shrink-0 items-center justify-around gap-16 px-8 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} style={{ animationDuration: speed }}>

        {items.map((item, i) => (

          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 group transition-transform hover:scale-105 active:scale-95">

            <span className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-600 group-hover:text-white transition-colors duration-500 uppercase whitespace-nowrap">{item.name}</span>

            {item.url && <span className="text-[10px] font-mono tracking-widest text-neutral-700 group-hover:text-neutral-400 transition-colors uppercase">{item.url}</span>}

          </a>

        ))}

      </div>

      <div aria-hidden="true" className={`flex min-w-full shrink-0 items-center justify-around gap-16 px-8 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} style={{ animationDuration: speed }}>

        {items.map((item, i) => (

          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 group transition-transform hover:scale-105 active:scale-95">

            <span className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-600 group-hover:text-white transition-colors duration-500 uppercase whitespace-nowrap">{item.name}</span>

            {item.url && <span className="text-[10px] font-mono tracking-widest text-neutral-700 group-hover:text-neutral-400 transition-colors uppercase">{item.url}</span>}

          </a>

        ))}

      </div>

    </div>

  );

};



const Partners = () => {

  const osintPartners = [

    { name: "Nosint", url: "nosint.org", link: "https://nosint.org" },

    { name: "OSINT Industries", url: "osint.industries", link: "https://osint.industries" },

    { name: "Hudson Rock", url: "hudsonrock.com", link: "https://hudsonrock.com" },

    { name: "Cypher Dynamics", url: "cypherdynamics.com", link: "https://cypherdynamics.com" },

    { name: "Proximity OSINT", url: "proximityosint.com", link: "https://proximityosint.com" },

    { name: "BreachHub", url: "breachhub.org", link: "https://breachhub.org" },

  ];



  const agencies = [

    { name: "INTERPOL", url: "interpol.int", link: "https://www.interpol.int" },

    { name: "EUROPOL", url: "europol.europa.eu", link: "https://www.europol.europa.eu" },

    { name: "FBI", url: "fbi.gov", link: "https://www.fbi.gov" },

    { name: "NCMEC", url: "missingkids.org", link: "https://www.missingkids.org" },

    { name: "IWF", url: "iwf.org.uk", link: "https://www.iwf.org.uk" },

    { name: "Romanian Police", url: "politiaromana.ro", link: "https://www.politiaromana.ro" },

    { name: "Columbian Police", url: "policia.gov.co", link: "https://www.policia.gov.co" },

    { name: "City of London Police", url: "cityoflondon.police.uk", link: "https://www.cityoflondon.police.uk" },

    { name: "Dorset Police", url: "dorset.police.uk", link: "https://www.dorset.police.uk" },

    { name: "Ministry of Interior", url: "interieur.gouv.fr", link: "https://www.interieur.gouv.fr" },

    { name: "Australian Fed Police", url: "afp.gov.au", link: "https://www.afp.gov.au" },

    { name: "Dallas Police", url: "dallaspolice.net", link: "https://www.dallaspolice.net" },

    { name: "Santa Rosa Police", url: "srcity.org", link: "https://www.srcity.org" },

    { name: "Torrance Police", url: "torranceca.gov", link: "https://www.torranceca.gov" },

  ];



  return (

    <section id="partners" className="py-32 bg-[#080808] border-y border-white/5">

      <SectionHeading badge="Network" title="Global Infrastructure" subtitle="Operating in tandem with premier OSINT developers and international law enforcement agencies. Click any partner to visit." />

      

      <div className="flex flex-col gap-12">

        <div>

          <div className="flex items-center gap-4 max-w-7xl mx-auto px-6 mb-2 opacity-50">

            <div className="h-px bg-white/20 flex-1"></div>

            <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Technology Partners</span>

            <div className="h-px bg-white/20 flex-1"></div>

          </div>

          <Marquee items={osintPartners} speed="35s" />

        </div>



        <div>

           <div className="flex items-center gap-4 max-w-7xl mx-auto px-6 mb-2 opacity-50">

            <div className="h-px bg-white/20 flex-1"></div>

            <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Agency Integrations</span>

            <div className="h-px bg-white/20 flex-1"></div>

          </div>

          <Marquee items={agencies} reverse={true} speed="60s" />

        </div>

      </div>

    </section>

  );

};



const FAQItem = ({ question, answer }) => {

  const [isOpen, setIsOpen] = useState(false);

  

  return (

    <div className="border-b border-white/5 last:border-0">

      <button 

        className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"

        onClick={() => setIsOpen(!isOpen)}

      >

        <span className="text-lg font-medium text-neutral-300 group-hover:text-white transition-colors pr-8">{question}</span>

        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-white text-black rotate-180' : 'text-neutral-500 group-hover:border-white/30'}`}>

          <ChevronDown className="w-4 h-4" />

        </div>

      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>

        <p className="text-neutral-400 leading-relaxed font-light pl-4 border-l border-white/10">{answer}</p>

      </div>

    </div>

  );

};



const FAQ = () => {

  const faqs = [

    {

      question: "Is IntelGuard a verified 501(c)(3) non-profit?",

      answer: "Yes. IntelGuard is a fully verified 501(c)(3) non-profit organization operating strictly for charitable and educational purposes. All donations are tax-deductible under federal guidelines."

    },

    {

      question: "What exactly does IntelGuard investigate?",

      answer: "Our mandate focuses on the distribution of Child Sexual Abuse Material (CSAM), severe child exploitation, organized extortion/sextortion networks, and digital footprints of human trafficking rings. We utilize advanced OSINT to package data into actionable intelligence."

    },

    {

      question: "Are you a law enforcement agency?",

      answer: "No, we are a civilian intelligence non-profit. We do not have arrest authority. Our role is to act as a highly specialized intelligence-gathering bridge, providing meticulously documented case files directly to sworn authorities globally."

    },

    {

      question: "How do you partner with OSINT software tools?",

      answer: "We establish strategic partnerships with OSINT developers to utilize their software in live investigations. In exchange, we provide high-value feedback and real-world performance metrics. Developers interested in deploying their tools for good can reach out to our general contact channel."

    }

  ];



  return (

    <section id="faq" className="py-32 px-6 max-w-4xl mx-auto">

      <SectionHeading badge="Information" title="Operating Parameters" />

      <div className="bg-white/[0.02] backdrop-blur-sm px-8 rounded-3xl border border-white/10">

        {faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}

      </div>

    </section>

  );

};



const Contact = () => {

  const { ref, isVisible } = useScrollReveal();

  

  return (

    <section id="contact" className="py-32 px-6 relative">

      <div className="max-w-6xl mx-auto">

        <SectionHeading badge="Comms" title="Secure Channels" subtitle="Select the appropriate routing channel to ensure immediate handling of your transmission." />

        

        <div ref={ref} className={`grid lg:grid-cols-3 gap-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-12 blur-sm'}`}>

          

          {/* Tipline Card - RED */}

          <div className="group relative p-10 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-red-500/30 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-[0_0_40px_rgba(239,68,68,0.02)]">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80 group-hover:h-[3px] transition-all" />

            <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            

            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(239,68,68,0.2)]">

              <AlertTriangle className="w-5 h-5 text-red-500" />

            </div>

            <h3 className="text-2xl font-medium text-white mb-3">Intelligence Tip</h3>

            <p className="text-neutral-500 text-sm mb-8 leading-relaxed font-light flex-grow">To securely report CSAM, child exploitation networks, or targeted extortion campaigns.</p>

            

            <a href="mailto:tipline@intelguard.org" className="inline-flex items-center gap-2 text-white font-mono text-sm hover:text-red-400 transition-colors pt-6 border-t border-white/5">

              tipline@intelguard.org <ExternalLink className="w-3 h-3" />

            </a>

          </div>



          {/* General Card - GREY */}

          <div className="group relative p-10 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-neutral-500/30 transition-all duration-500 overflow-hidden flex flex-col h-full">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-neutral-400 to-transparent opacity-80 group-hover:h-[3px] transition-all" />

            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            

            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">

              <Mail className="w-5 h-5 text-neutral-300" />

            </div>

            <h3 className="text-2xl font-medium text-white mb-3">General Inquiry</h3>

            <p className="text-neutral-500 text-sm mb-8 leading-relaxed font-light flex-grow">For press inquiries, general communications, or OSINT developers wishing to integrate.</p>

            

            <a href="mailto:contact@intelguard.org" className="inline-flex items-center gap-2 text-white font-mono text-sm hover:text-neutral-400 transition-colors pt-6 border-t border-white/5">

              contact@intelguard.org <ExternalLink className="w-3 h-3" />

            </a>

          </div>



          {/* LEER Card - BLUE */}

          <div className="group relative p-10 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-[0_0_40px_rgba(59,130,246,0.02)]">

            {/* Restricted Shield Watermark */}

            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700 pointer-events-none">

              <Shield className="w-64 h-64 text-blue-500" />

            </div>

            

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80 group-hover:h-[3px] transition-all" />

            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            

            <div className="flex items-start justify-between mb-8">

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">

                <Lock className="w-5 h-5 text-blue-500" />

              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">

                <ShieldCheck className="w-3 h-3 text-blue-400" />

                <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">Restricted Access</span>

              </div>

            </div>

            

            <h3 className="text-2xl font-medium text-white mb-3 relative z-10">L.E.E.R. Portal</h3>

            <p className="text-neutral-500 text-sm mb-8 leading-relaxed font-light flex-grow relative z-10">

              <span className="text-blue-400/80 font-bold block mb-1">Law Enforcement Only.</span>

              Secure access for sworn law enforcement and federal agents. Request case data or CM credentials.

            </p>

            

            <a href="mailto:leer@intelguard.org" className="inline-flex items-center justify-between text-white font-mono text-sm hover:text-blue-400 transition-colors pt-6 border-t border-white/5 relative z-10">

              <span>leer@intelguard.org</span>

              <span className="flex items-center gap-1 te
              export default function App() {
  return (
    <>
      <PremiumBackground />
      <Navbar />
      <Hero />
      <Mission />
      <Stats />
      <Team />
      <Partners />
      <FAQ />
      <Contact />
    </>
  );
}
