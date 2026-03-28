import { redirect } from "next/navigation";

export default function TrainerRegistrationAccentRedirectPage() {
  redirect("/registracia?mode=trainer");
}
