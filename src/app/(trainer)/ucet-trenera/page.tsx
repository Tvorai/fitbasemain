"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey } from "@/lib/config";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type TabId = "profil" | "rezervacie" | "sluzby" | "kalendar" | "recenzie" | "vysledky" | "znacky" | "nastavenia";

// Helper pre slugifikáciu
function toSlug(input: string) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .replace(/-{2,}/g, "-");
}

export default function TrainerDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profil");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // State pre "Môj profil"
  const [trainerId, setTrainerId] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const siteUrl = "https://fitbasemain.vercel.app/";
  const profileUrl = `${siteUrl}${toSlug(username)}`;

  // Načítanie dát zo Supabase
  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: trainer, error } = await supabase
        .from("trainers")
        .select("*")
        .eq("profile_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (trainer) {
        setTrainerId(trainer.id);
        setUsername(trainer.slug || "");
        setBio(trainer.bio || "");
        // Tu by sa v budúcnosti načítavali fotky zo Storage/JSON stĺpca
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Uloženie dát do Supabase
  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Nie ste prihlásený.");
        return;
      }

      const slug = toSlug(username);
      if (!slug) {
        alert("Prosím zadajte platné používateľské meno.");
        return;
      }

      const { error } = await supabase
        .from("trainers")
        .update({
          slug: slug,
          bio: bio,
          // images by sa ukladali samostatne alebo do JSONB
        })
        .eq("profile_id", user.id);

      if (error) throw error;
      
      setUsername(slug); // Aktualizujeme UI na vyčistený slug
      alert("Profil bol úspešne uložený.");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Nepodarilo sa uložiť profil.");
    } finally {
      setSaving(false);
    }
  };

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
    if (loading) return <div className="flex items-center justify-center h-full text-zinc-500">Načítavam dáta...</div>;

    switch (activeTab) {
      case "profil":
        return (
          <div className="flex flex-col gap-6 w-full max-w-[520px] ml-auto">
            {/* Link sekcia */}
            <div className="flex items-center gap-2 bg-emerald-500 rounded-full px-4 py-2 w-full overflow-hidden">
              <span className="text-black text-xs font-medium truncate flex-1">
                Link vášho profilu: <span className="font-bold">{profileUrl}</span>
              </span>
              <button 
                onClick={() => navigator.clipboard.writeText(profileUrl)}
                className="bg-black text-white text-[10px] px-3 py-1 rounded-full hover:bg-zinc-800 transition-colors shrink-0"
              >
                Kopírovať
              </button>
            </div>

            {/* Form sekcia */}
            <div className="space-y-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Používateľské meno"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border border-emerald-500 rounded-full px-6 py-3 text-white outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div className="relative w-full">
                <textarea
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 100))}
                  maxLength={100}
                  className="w-full bg-transparent border border-emerald-500 rounded-3xl px-6 py-3 text-white outline-none focus:ring-1 focus:ring-emerald-500 transition-all min-h-[80px] resize-none"
                />
                <div className="absolute right-4 bottom-2 text-[10px] text-emerald-500/50">
                  {bio.length}/100
                </div>
              </div>
            </div>

            {/* Galéria sekcia */}
            <div className="relative w-full group">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-[16/9] border border-emerald-500 rounded-[40px] flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-500/5 transition-colors group"
              >
                <div className="text-emerald-500 text-5xl font-light mb-1">+</div>
                <div className="text-zinc-500 text-sm font-medium uppercase tracking-widest text-center px-4">
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
            <div className="flex justify-center gap-3 w-full">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-emerald-500 overflow-hidden shrink-0">
                  {img ? (
                    <>
                      <Image src={img} alt={`Profile ${idx}`} fill className="object-cover" />
                      <button 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] hover:bg-black transition-colors"
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
            <div className="mt-4 self-end">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-display text-xl px-10 py-2 rounded-full tracking-wider transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Ukladám..." : "Uložiť"}
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-zinc-500 italic">
            Obsah sa pripravuje...
          </div>
        );
    }
  };

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
