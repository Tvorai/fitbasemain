"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type IconName =
  | "sparkles"
  | "bolt"
  | "calendar"
  | "creditCard"
  | "user"
  | "shield"
  | "tag"
  | "layout"
  | "grid"
  | "help"
  | "mail"
  | "rocket"
  | "check";

function Icon({ name, className }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  } as const;

  if (name === "bolt") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h8l-1 8 11-14h-8l0-6z" />
      </svg>
    );
  }
  if (name === "sparkles") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l1.6 5.1L19 9l-5.4 1.9L12 16l-1.6-5.1L5 9l5.4-1.9L12 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 14l.8 2.5L8 17l-2.2.5L5 20l-.8-2.5L2 17l2.2-.5L5 14z" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 3v2M17 3v2M4 8h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 5h12a2 2 0 012 2v13a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z" />
      </svg>
    );
  }
  if (name === "creditCard") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h14a2 2 0 012 2v2H3V7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 11h20v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 15h4" />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 21a8 8 0 10-16 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  if (name === "tag") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9 9 9-9-9-9H6a3 3 0 00-3 3v6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h.01" />
      </svg>
    );
  }
  if (name === "layout") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v3H4V5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h8v11H6a2 2 0 01-2-2V10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h6v9a2 2 0 01-2 2h-4V10z" />
      </svg>
    );
  }
  if (name === "grid") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h7v7H4V4zM13 4h7v7h-7V4zM4 13h7v7H4v-7zM13 13h7v7h-7v-7z" />
      </svg>
    );
  }
  if (name === "help") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.1 9a3 3 0 115.6 1.4c-.6.8-1.7 1.2-1.7 2.6V14" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 12a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
      </svg>
    );
  }
  if (name === "rocket") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-4 4" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2c4 1 7 4 8 8-2 4-6 8-10 10-2-1-4-3-5-5 2-4 6-8 7-13z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 16l-2 6 6-2" />
      </svg>
    );
  }
  return (
    <svg {...common} stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 md:pt-6">
        <div
          className={`mx-auto max-w-5xl rounded-full border border-emerald-500/30 backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.45)] transition-all duration-300 ${
            isScrolled ? "bg-black/85 py-1.5" : "bg-black/55 py-2"
          }`}
        >
          <div className="flex items-center justify-between px-4 md:px-5">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Fitbase logo.png"
                alt="Fitbase"
                width={120}
                height={28}
                priority
                className="h-auto w-[100px] md:w-[120px]"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-zinc-400">
              <button onClick={() => scrollToSection("why")} className="hover:text-emerald-400 transition-colors">
                Prečo Fitbase
              </button>
              <button onClick={() => scrollToSection("how")} className="hover:text-emerald-400 transition-colors">
                Ako to funguje
              </button>
              <button onClick={() => scrollToSection("services")} className="hover:text-emerald-400 transition-colors">
                Funkcie
              </button>
              <button onClick={() => scrollToSection("pricing")} className="hover:text-emerald-400 transition-colors">
                Cenník
              </button>
              <button onClick={() => scrollToSection("faq")} className="hover:text-emerald-400 transition-colors">
                FAQ
              </button>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/prihlasenie"
                className="hidden sm:block text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
              >
                Prihlásiť sa
              </Link>
              <Link
                href="/registracia?mode=trainer"
                className="bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20"
              >
                Začať ako tréner
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/40 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-600/30 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] tracking-tight">
                <span className="inline-flex items-center gap-3 justify-center lg:justify-start">
                  <Icon name="bolt" className="h-7 w-7 text-emerald-400" />
                  <span>Získavaj klientov, rezervácie</span>
                </span>
                <br className="hidden md:block" />
                a platby na jednom mieste.
              </h1>

              <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Fitbase je platforma pre osobných trénerov a výživových poradcov, ktorí chcú mať profesionálny profil, online rezervácie, platby a jednoduchú správu služieb bez chaosu.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/registracia?mode=trainer"
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 scale-105 hover:scale-110 active:scale-95"
                >
                  Chcem sa registrovať
                </Link>
                <button
                  onClick={() => scrollToSection("services")}
                  className="w-full sm:w-auto px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-white border border-white/10 hover:bg-white/5 transition-all"
                >
                  Pozrieť funkcie
                </button>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[560px] fitbase-bannerFloat">
                <div className="absolute inset-0 bg-emerald-500/10 blur-[60px]" />
                <div className="relative rounded-[2.5rem] bg-zinc-900/20 backdrop-blur-sm shadow-2xl overflow-hidden">
                  <Image
                    src="/banner.png"
                    alt="Fitbase banner"
                    width={1200}
                    height={900}
                    priority
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fitbase */}
      <section id="why" className="py-24 bg-zinc-950/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight flex items-center justify-center lg:justify-start gap-3">
                <Icon name="sparkles" className="h-7 w-7 text-emerald-400" />
                <span>
                  Menej chaosu, <br /> viac klientov.
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Tréneri často riešia rezervácie cez správy, platby ručne, termíny chaoticky a prezentáciu cez Instagram alebo PDF. Fitbase ti pomôže mať všetko profesionálne na jednom mieste.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Rezervácie bez dohadovania", text: "Klienti si vyberú službu a termín online." },
                { title: "Platby vopred", text: "Menej storien, viac istoty." },
                { title: "Profesionálny profil trénera", text: "Lepšia dôveryhodnosť a prezentácia." },
                { title: "Všetko na jednom mieste", text: "Tréningy, online konzultácie aj jedálničky." }
              ].map((box) => (
                <div key={box.title} className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                  </div>
                  <h3 className="text-white font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Icon name={box.title === "Rezervácie bez dohadovania" ? "calendar" : box.title === "Platby vopred" ? "creditCard" : box.title === "Profesionálny profil trénera" ? "user" : "layout"} className="h-4 w-4 text-emerald-400" />
                    <span>{box.title}</span>
                  </h3>
                  <p className="text-zinc-500 text-sm">{box.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight flex items-center justify-center gap-3">
              <Icon name="rocket" className="h-7 w-7 text-emerald-400" />
              <span>Ako začať za pár minút</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {[
              { step: "1", title: "Vytvoríš si profil trénera", text: "Vyplníš služby, ceny a informácie o sebe." },
              { step: "2", title: "Prepojíš platobný účet", text: "Cez Stripe budeš prijímať platby bezpečne online." },
              { step: "3", title: "Nastavíš dostupnosť a ponuku", text: "Osobné tréningy, online konzultácie alebo jedálničky." },
              { step: "4", title: "Získavaš rezervácie a objednávky", text: "Klienti si službu objednajú a zaplatia jednoducho cez web." }
            ].map((step, idx) => (
              <div key={step.step} className="relative space-y-4 text-center group">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-emerald-500 font-display text-3xl group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                  {step.step}
                </div>
                <h3 className="text-white font-bold uppercase tracking-wide flex items-center justify-center gap-2">
                  <Icon name={step.step === "1" ? "user" : step.step === "2" ? "shield" : step.step === "3" ? "calendar" : "check"} className="h-4 w-4 text-emerald-400" />
                  <span>{step.title}</span>
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.text}</p>
                {idx < 3 && <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[1px] bg-white/10" />}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/registracia?mode=trainer" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all">
              Začať teraz
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-zinc-950/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight flex items-center justify-center gap-3">
              <Icon name="grid" className="h-7 w-7 text-emerald-400" />
              <span>Čo všetko Fitbase umožňuje</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Osobné tréningy", text: "Klient si vyberie termín a zaplatí online. Ty máš prehľad o rezerváciách." },
              { title: "Online konzultácie", text: "Ponúkaj konzultácie na diaľku bez zložitého dohadovania." },
              { title: "Jedálničky na mieru", text: "Zbieraj údaje od klienta cez formulár a spravuj objednávky." },
              { title: "Profil trénera", text: "Prezentuj svoje služby, ceny a špecializáciu." },
              { title: "Platby a výplaty", text: "Bezpečné online platby cez Stripe Connect." },
              { title: "Zľavové kódy a cenník", text: "Nastavuj ceny, akcie a promo kódy." }
            ].map((service) => (
              <div key={service.title} className="p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5 hover:border-emerald-500/20 transition-all group hover:bg-zinc-900/50">
                <h3 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest flex items-center gap-2">
                  <Icon
                    name={
                      service.title === "Osobné tréningy"
                        ? "calendar"
                        : service.title === "Online konzultácie"
                          ? "sparkles"
                          : service.title === "Jedálničky na mieru"
                            ? "layout"
                            : service.title === "Profil trénera"
                              ? "user"
                              : service.title === "Platby a výplaty"
                                ? "creditCard"
                                : "tag"
                    }
                    className="h-5 w-5"
                  />
                  <span>{service.title}</span>
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-emerald-500 rounded-[3rem] p-10 md:p-20 text-black relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/20 blur-[80px] rounded-full" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-12 flex items-center gap-3">
                <Icon name="sparkles" className="h-7 w-7" />
                <span>Čo tým získaš</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                {[
                  "Viac dôvery u klientov",
                  "Menej storno rezervácií",
                  "Rýchlejšie platby",
                  "Menej administratívy",
                  "Lepší prehľad o službách",
                  "Moderný online profil"
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold uppercase tracking-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section id="preview" className="py-24 bg-zinc-950/50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-4 flex items-center justify-center gap-3">
            <Icon name="layout" className="h-7 w-7 text-emerald-400" />
            <span>Všetko navrhnuté jednoducho a prehľadne</span>
          </h2>
          <p className="text-zinc-500 mb-16">Sústreď sa na klientov, nie na chaos okolo.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {["profil trénera", "rezervácia", "účet trénera", "cenník", "objednávky"].map((item) => (
              <div key={item} className="aspect-square bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center p-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Who */}
      <section id="for-who" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[70px] rounded-[3rem]" />
            <div className="relative bg-zinc-900/40 border border-emerald-500/20 rounded-[3rem] p-10 md:p-16 backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                <div className="space-y-4">
                  <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-emerald-400 flex items-center gap-3">
                    <Icon name="check" className="h-7 w-7 text-emerald-400" />
                    <span>Fitbase je pre teba, ak</span>
                  </h2>
                  <div className="text-zinc-500 text-sm">
                    Moderný profil, rezervácie aj platby bez chaosu.
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 w-full lg:max-w-[640px]">
                  {[
                    "si osobný tréner a chceš viac klientov",
                    "robíš online coaching",
                    "ponúkaš jedálničky",
                    "chceš pôsobiť profesionálne",
                    "nechceš riešiť rezervácie ručne"
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/20 px-5 py-4 hover:border-emerald-500/30 transition-colors"
                    >
                      <div className="mt-0.5 h-6 w-6 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="text-zinc-200">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-zinc-950/50">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-6 flex items-center justify-center gap-3">
            <Icon name="creditCard" className="h-7 w-7 text-emerald-400" />
            <span>Jednoduchý a férový model</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-12">
            Registrácia je zdarma. Platforma si berie províziu len z úspešne zaplatených objednávok. Zarábame len vtedy, keď zarábaš aj ty.
          </p>
          <div className="p-8 rounded-3xl bg-zinc-900 border border-emerald-500/20 inline-block">
            <div className="text-5xl font-display text-emerald-500 mb-2">10 %</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Provízia z platby</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-center mb-12 flex items-center justify-center gap-3">
            <Icon name="help" className="h-7 w-7 text-emerald-400" />
            <span>Časté otázky</span>
          </h2>
          <div className="grid gap-6">
            {[
              { q: "Ako dlho trvá registrácia?", a: "Len pár minút." },
              { q: "Musím mať firmu alebo živnosť?", a: "Závisí od Stripe onboarding procesu." },
              { q: "Môžem ponúkať len jednu službu?", a: "Áno, môžeš mať len jednu alebo viac služieb." },
              { q: "Ako dostanem peniaze?", a: "Cez Stripe priamo na tvoj účet." },
              { q: "Môžem si nastavovať ceny?", a: "Áno, ceny si určuješ sám." }
            ].map((faq) => (
              <div
                key={faq.q}
                className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900/25 px-8 py-7 text-center backdrop-blur-sm shadow-[0_12px_40px_rgba(0,0,0,0.55)] hover:border-emerald-500/25 transition-colors"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-emerald-500/8" />
                  <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[70px]" />
                </div>
                <div className="relative space-y-3">
                  <div className="mx-auto mb-2 h-10 w-10 rounded-2xl border border-emerald-500/20 bg-black/20 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.8)]" />
                  </div>
                  <h3 className="text-white font-bold uppercase tracking-tight flex items-center justify-center gap-2">
                    <Icon name="help" className="h-4 w-4 text-emerald-400" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-zinc-950/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-6 flex items-center justify-center gap-3">
            <Icon name="mail" className="h-7 w-7 text-emerald-400" />
            <span>Máš otázky?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
            Za Fitbase stojí reálny človek. Ak chceš, pokojne ma kontaktuj a rád ti ukážem, ako to funguje.
          </p>
          <div className="flex flex-col items-center gap-8">
            <a href="mailto:info@fitbase.sk" className="text-emerald-400 text-2xl font-bold hover:text-emerald-300 transition-colors">info@fitbase.sk</a>
            <div className="flex gap-6">
              {["Instagram", "Facebook", "LinkedIn"].map((social) => (
                <span key={social} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 cursor-pointer hover:text-white transition-colors">{social}</span>
              ))}
            </div>
            <button className="bg-white text-black px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:bg-emerald-500 transition-all duration-500">
              Kontaktovať ma
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="py-24 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500 pointer-events-none opacity-5" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tight mb-8 flex items-center justify-center gap-3">
            <Icon name="rocket" className="h-8 w-8 text-emerald-400" />
            <span>
              Začni budovať svoj <br /> tréningový biznis online.
            </span>
          </h2>
          <p className="text-zinc-400 text-xl mb-12 max-w-xl mx-auto">
            Získaj profil, rezervácie a platby na jednom mieste.
          </p>
          <Link href="/registracia?mode=trainer" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black px-12 py-5 rounded-full text-md font-bold uppercase tracking-widest transition-all shadow-2xl shadow-emerald-500/40 scale-110 hover:scale-125 transition-all duration-500">
            Registrovať sa ako tréner
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <Image src="/Fitbase logo.png" alt="Fitbase" width={100} height={24} className="opacity-50" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            © 2024 Fitbase. Všetky práva vyhradené.
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            <span className="hover:text-white cursor-pointer">Podmienky</span>
            <span className="hover:text-white cursor-pointer">Súkromie</span>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        @keyframes fitbaseBannerFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }
        .fitbase-bannerFloat {
          animation: fitbaseBannerFloat 8s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
