import Hero from "@/components/home/Hero";
import FeaturedProductsClient from "@/components/home/FeaturedProductsClient";
import Benefits from "@/components/home/Benefits";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProductsClient />
      <Benefits />
      <PromoBanner />
      <Testimonials />
    </>
  );
}