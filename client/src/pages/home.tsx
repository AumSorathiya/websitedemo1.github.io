import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Courses from "@/components/courses";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="font-inter bg-owl-cream">
      <Navigation />
      <Hero />
      <Features />
      <Courses />
      <About />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
