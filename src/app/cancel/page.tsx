import Link from "next/link";
import { Container } from "@/components/Container";

export default function CancelPage() {
  return (
    <Container className="py-12 text-white space-y-4">
      <h1 className="text-3xl font-display uppercase tracking-wider">Platba zrušená</h1>
      <p className="text-zinc-300">
        Platba neprebehla. Termín ostane dočasne blokovaný a automaticky sa uvoľní po krátkom čase.
      </p>
      <div className="pt-4">
        <Link href="/" className="text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-widest text-xs">
          Späť na Fitbase
        </Link>
      </div>
    </Container>
  );
}

