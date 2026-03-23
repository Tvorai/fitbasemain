"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/providers/i18n";

type TabId = "profil" | "rezervacie" | "sluzby" | "kalendar" | "recenzie" | "vysledky" | "znacky" | "nastavenia";

export default function TrainerDashboardPage() {
  const { messages } = useI18n();
  const [activeTab, setActiveTab] = useState<TabId>("profil");
  
  // State pre "Môj profil"
  const [username, setUsername] = useState("trener-marko");
  const [bio, setBio] = useState("");
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const siteUrl = "https://fitbasemain.vercel.app/";
  const profileUrl = `${siteUrl}${username}`;

  const tabs: { id: TabId; label: string }[] = [
    { id: "profil", label: "Môj profil" },
    { id: "rezervacie", label: "Rezervácie" },
    { id: "sluzby", label: "Služby" },
    { id: "kalendar", label: "Kalendár" },
    { id: "recenzie", label: "Recenzie" },
    { id: "vysledky", label: "Výsledky klientov" },
    { id: "znacky", label: "Moje značky" },
    { id: "nastavenia", label: "Nadstavenia" },
  ];

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profil":
        return (
          <div className="flex flex-col gap-6 max-w-2xl ml-auto pr-4 md:pr-10">
            {/* Link sekcia */}
            <div className="flex items-center gap-2 bg-emerald-500 rounded-full px-4 py-2 self-end">
              <span className="text-black text-sm font-medium whitespace-nowrap">
                Link vášho profilu: <span className="font-bold">{profileUrl}</span>
              </span>
              <button 
                onClick={() => navigator.clipboard.writeText(profileUrl)}
                className="bg-black text-white text-xs px-4 py-1 rounded-full hover:bg-zinc-800 transition-colors"
              >
                Kopírovať
              </button>
            </div>

            {/* Form sekcia */}
            <div className="space-y-4 mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Používateľské meno"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border border-emerald-500 rounded-full px-6 py-3 text-white outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div className="relative">
                <textarea
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 100))}
                  maxLength={100}
                  className="w-full bg-transparent border border-emerald-500 rounded-3xl px-6 py-3 text-white outline-none focus:ring-1 focus:ring-emerald-500 transition-all min-h-[60px] resize-none"
                />
                <div className="absolute right-4 bottom-2 text-[10px] text-emerald-500/50">
                  {bio.length}/100
                </div>
              </div>
            </div>

            {/* Galéria sekcia */}
            <div className="relative group">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-[2/1] border border-emerald-500 rounded-[40px] flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-500/5 transition-colors group"
              >
                <div className="text-emerald-500 text-6xl font-light mb-2">+</div>
                <div className="text-zinc-500 text-xl font-medium uppercase tracking-tight">
                  Nahrajte váš profilové fotky
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={(e) => {
                  const firstEmptyIndex = images.findIndex(img => img === null);
                  if (firstEmptyIndex !== -1) {
                    handleImageUpload(firstEmptyIndex, e);
                  }
                }}
              />
            </div>

            {/* Náhľady fotiek */}
            <div className="flex justify-center gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-emerald-500 overflow-hidden group">
                  {img ? (
                    <>
                      <Image src={img} alt={`Profile ${idx}`} fill className="object-cover" />
                      <button 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:bg-black transition-colors"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full bg-transparent" />
                  )}
                </div>
              ))}
            </div>

            {/* Uložiť tlačidlo */}
            <div className="mt-8 self-end">
              <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-display text-2xl px-12 py-2 rounded-full tracking-wider transition-colors uppercase">
                Uložiť
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-zinc-500 italic">
            Obsah pre {tabs.find(t => t.id === activeTab)?.label} sa pripravuje...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-[280px] p-6 md:p-10 flex flex-col gap-10 shrink-0">
        <div className="mb-4">
          <Image
            src="/Fitbase logo.png"
            alt="Fitbase"
            width={150}
            height={35}
            priority
            className="h-auto w-[120px] md:w-[150px]"
          />
        </div>
        
        <nav className="flex flex-col gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left text-2xl font-display tracking-wide transition-colors ${
                activeTab === tab.id ? "text-emerald-500" : "text-white hover:text-emerald-500/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 flex flex-col">
        {renderTabContent()}
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=League+Gothic&display=swap');
      `}</style>
    </div>
  );
}
