"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { featureFlags, supabaseAnonKey, supabaseUrl } from "@/lib/config";
import { useI18n } from "@/providers/i18n";

const supabase = featureFlags.supabaseEnabled ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function ResetPasswordPage() {
  const { messages } = useI18n();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    // Supabase sets the session automatically when clicking the link
    // We just need to check if we have a session
    const checkSession = async () => {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/prihlasenie");
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full px-4 py-6 md:px-12 md:py-10 lg:px-20">
        <div className="mb-6 md:mb-10">
          <Image
            src="/Fitbase logo.png"
            alt="Fitbase"
            width={190}
            height={44}
            priority
            className="h-auto w-[150px] md:w-[190px]"
          />
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(380px,520px)_1fr] md:items-center md:gap-16">
          <div className="max-w-xl md:max-w-none">
            <h1 className="font-display text-5xl leading-[0.9] tracking-wide md:text-6xl">
              {messages.pages.userLogin.resetPasswordTitle.toUpperCase()}
            </h1>

            <form
              className="mt-7 space-y-3 md:mt-8"
              onSubmit={async (e) => {
                e.preventDefault();
                if (loading) return;
                if (!supabase) return;
                if (!password) return;

                setLoading(true);
                setStatus(null);

                const { error } = await supabase.auth.updateUser({
                  password: password
                });

                setLoading(false);

                if (error) {
                  setStatus({ type: "error", text: error.message });
                  return;
                }

                setStatus({ type: "success", text: messages.pages.userLogin.resetPasswordSuccess });
                setTimeout(() => {
                  router.push("/prihlasenie");
                }, 3000);
              }}
            >
              <div>
                <label className="sr-only" htmlFor="password">
                  {messages.pages.userLogin.fields.password}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={messages.pages.userLogin.fields.password}
                  className="h-12 w-full rounded-full border border-emerald-500/80 bg-transparent px-5 text-white placeholder-white/70 outline-none ring-emerald-400 focus:ring-2"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="font-display mt-4 h-12 w-full rounded-full bg-emerald-500 text-center text-2xl tracking-wide text-black hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {messages.pages.userLogin.resetPasswordSubmit.toUpperCase()}
              </button>

              {status ? (
                <div className={`mt-3 text-center text-sm ${status.type === "success" ? "text-emerald-300" : "text-red-300"}`}>
                  {status.text}
                </div>
              ) : null}

              <div className="mt-3 text-center text-sm text-white/80">
                <Link
                  href="/prihlasenie"
                  className="font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  {messages.pages.userLogin.backToLogin}
                </Link>
              </div>
            </form>
          </div>

          <div className="hidden md:block">
            <div className="relative ml-auto h-[560px] w-full max-w-[720px]">
              <Image
                src="/Fitbase register.png"
                alt=""
                fill
                priority
                className="object-contain object-right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
