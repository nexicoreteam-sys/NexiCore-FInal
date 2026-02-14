import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyNexicore from "@/components/WhyNexicore";
import AIAssistant from "@/components/AIAssistant";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <WhyNexicore />
        <AIAssistant />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
