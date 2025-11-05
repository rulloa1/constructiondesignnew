import heroImage from "@/assets/hero-mc-portfolio.png";
import { VantaCloudsBackground } from "./VantaCloudsBackground";

export const Hero = () => {
  return <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <img 
          src={heroImage} 
          alt="Michael Chandler Portfolio - Construction site leader" 
          className="w-full h-full object-contain object-center md:object-cover" 
        />
      </div>
      
      {/* Vanta Clouds Background */}
      <VantaCloudsBackground />
      
      {/* Edge Fade Effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
      background: 'radial-gradient(ellipse 70% 65% at 50% 45%, transparent 0%, transparent 50%, hsl(var(--background)) 100%)'
    }} />
      
      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent py-8 md:py-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-light text-white mb-2 md:mb-4 [text-shadow:0_0_20px_rgba(228,179,33,0.3),0_0_40px_rgba(228,179,33,0.15)]">30+ Years of Quality Craftsmanship</h2>
          <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto [text-shadow:0_0_15px_rgba(228,179,33,0.2)]">
            Architectural design, landscape restoration, and construction excellence
          </p>
        </div>
      </div>
    </section>;
};