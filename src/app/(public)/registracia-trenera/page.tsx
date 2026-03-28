import { redirect } from "next/navigation";

export default function TrainerRegistrationRedirectPage() {
  redirect("/registracia?mode=trainer");
}
