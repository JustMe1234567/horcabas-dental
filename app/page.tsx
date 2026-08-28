import { About } from "@/components/About";
import { AppointmentSearch } from "@/components/AppointmentSearch";
import { AvailableSchedule } from "@/components/AvailableSchedule";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { TopInfoBar } from "@/components/TopInfoBar";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header>
        <TopInfoBar />
        <Navbar />
      </header>
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <Services />
        <About />
        <WhyChooseUs />
        <AvailableSchedule />
        <AppointmentSearch />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
