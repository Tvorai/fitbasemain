import Link from "next/link";
import { Container } from "@/components/Container";

export default function SuccessPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const bookingIdRaw = searchParams?.booking_id;
  const bookingId = typeof bookingIdRaw === "string" ? bookingIdRaw : null;
  const sessionIdRaw = searchParams?.session_id;
  const sessionId = typeof sessionIdRaw === "string" ? sessionIdRaw : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <Container className="relative z-10 flex min-h-screen items-center justify-center px-4 py-14">
        <div className="w-full max-w-[720px] rounded-[30px] border border-emerald-500/25 bg-zinc-950/40 backdrop-blur-sm p-7 md:p-10 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl md:text-4xl font-display uppercase tracking-wider text-emerald-400">
                Platba úspešná
              </h1>
              <p className="mt-2 text-zinc-300">
                Ďakujeme. Vaša platba bola prijatá a služba je potvrdená.
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Ak sa položka nezobrazí hneď, obnovte stránku alebo skúste otvoriť sekciu Moje tréningy.
              </p>
            </div>
          </div>

          {(bookingId || sessionId) && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Identifikátor platby</div>
              {bookingId ? (
                <div className="mt-1 text-xs text-zinc-300 font-mono break-all">booking_id: {bookingId}</div>
              ) : sessionId ? (
                <div className="mt-1 text-xs text-zinc-300 font-mono break-all">session_id: {sessionId}</div>
              ) : null}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <Link
              href="/ucet"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-black text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 transition-colors"
            >
              Prejsť do účtu
            </Link>

            <Link
              href="/historia-rezervacii"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-zinc-950/40 px-8 py-3 text-zinc-200 text-xs font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white transition-colors"
            >
              História rezervácií
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
