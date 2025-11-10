import HeroSection from "@/app/heroSection";
import FeatureGrid from "@/app/featureGridd";

export default function Home() {
  return (
    <div className="space-y-8">
      <HeroSection />

      {/* Main Categories - 4 Cards */}
      <FeatureGrid />
    </div>
  ); 
}
