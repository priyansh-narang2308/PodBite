import Footer from "@/components/landing/footer";
import HeroSection from "@/components/landing/hero-section";
import Navbar from "@/components/landing/navbar";
import Pricing from "@/components/landing/pricing";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <>
      <Navbar user={session?.user} />
      <HeroSection />
      <Pricing  user={session?.user}  />
      <Footer />
    </>
  );
}
