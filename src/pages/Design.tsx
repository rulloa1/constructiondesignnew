import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Palette, Trees, Armchair, Building } from "lucide-react";

// Detail images for concept cards
import detailBronzeBase from "@/assets/details/detail-bronze-base.jpg";
import detailBronzeHardware from "@/assets/details/detail-bronze-hardware.jpg";
import detailFloatingVanity from "@/assets/details/detail-floating-vanity.jpg";
import detailLeatherCabinetry from "@/assets/details/detail-leather-cabinetry.jpg";
import detailLimestoneFireplace from "@/assets/details/detail-limestone-fireplace.jpg";
import detailMarbleBath from "@/assets/details/detail-marble-bath.jpg";
import detailMarbleCounter from "@/assets/details/detail-marble-counter.jpg";
import detailOceanviewFraming from "@/assets/details/detail-oceanview-framing.jpg";
import detailPendantLighting from "@/assets/details/detail-pendant-lighting.jpg";
import detailProRange from "@/assets/details/detail-pro-range.jpg";
import detailSculpturalChandelier from "@/assets/details/detail-sculptural-chandelier.jpg";
import detailSkiStorage from "@/assets/details/detail-ski-storage.jpg";
import detailSpaVanity from "@/assets/details/detail-spa-vanity.jpg";
import detailTimberBeams from "@/assets/details/detail-timber-beams.jpg";
import detailVanityNiche from "@/assets/details/detail-vanity-niche.jpg";
import detailWallFaucet from "@/assets/details/detail-wall-faucet.jpg";

type CategoryKey = "architecture" | "interiors" | "exterior" | "furniture" | "development";

interface ConceptBoard {
  title: string;
  subtitle: string;
  mainImage: string;
  gridImages: string[];
  details: string[];
}

const conceptBoards: Record<CategoryKey, ConceptBoard> = {
  architecture: {
    title: "ARCHITECTURE",
    subtitle: "Form Meets Function",
    mainImage: detailOceanviewFraming,
    gridImages: [detailLimestoneFireplace, detailTimberBeams, detailSculpturalChandelier],
    details: ["Site-responsive design", "Structural engineering", "Energy efficiency", "Smart home integration"],
  },
  interiors: {
    title: "INTERIORS",
    subtitle: "Curated Living Spaces",
    mainImage: detailSpaVanity,
    gridImages: [detailPendantLighting, detailProRange, detailLeatherCabinetry],
    details: ["Custom millwork", "Lighting design", "Premium flooring", "Art display systems"],
  },
  exterior: {
    title: "EXTERIOR",
    subtitle: "Landscape Integration",
    mainImage: detailLimestoneFireplace,
    gridImages: [detailOceanviewFraming, detailBronzeBase, detailPendantLighting],
    details: ["Hardscape design", "Pool construction", "Outdoor kitchens", "Exterior lighting"],
  },
  furniture: {
    title: "CUSTOM FURNITURE",
    subtitle: "Bespoke Craftsmanship",
    mainImage: detailBronzeBase,
    gridImages: [detailSkiStorage, detailVanityNiche, detailWallFaucet],
    details: ["Master craftsman partnerships", "Exotic material sourcing", "Custom finishes", "White-glove installation"],
  },
  development: {
    title: "DEVELOPMENT",
    subtitle: "Vision to Reality",
    mainImage: detailMarbleBath,
    gridImages: [detailBronzeHardware, detailFloatingVanity, detailMarbleCounter],
    details: ["Feasibility analysis", "Entitlement processing", "Budget development", "Construction management"],
  },
};

const categories: { key: CategoryKey; label: string; icon: React.ElementType }[] = [
  { key: "architecture", label: "Architecture", icon: Building2 },
  { key: "interiors", label: "Interiors", icon: Palette },
  { key: "exterior", label: "Exterior Spaces", icon: Trees },
  { key: "furniture", label: "Custom Furniture", icon: Armchair },
  { key: "development", label: "Development", icon: Building },
];

const materialSwatches = [
  { name: "Calacatta Marble", color: "bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200" },
  { name: "Bronze Hardware", color: "bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800" },
  { name: "Natural Oak", color: "bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200" },
  { name: "Limestone", color: "bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300" },
  { name: "Travertine", color: "bg-gradient-to-br from-orange-50 via-amber-50 to-stone-100" },
  { name: "Walnut", color: "bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950" },
];

const processSteps = [
  { number: "01", title: "Discovery", description: "Understanding vision, site conditions, and unique requirements." },
  { number: "02", title: "Design", description: "Collaborative development with architects and interior designers." },
  { number: "03", title: "Development", description: "Detailed planning, budgeting, and construction scheduling." },
  { number: "04", title: "Delivery", description: "Meticulous construction execution and quality assurance." },
];

const ConceptBoardSection: React.FC<{ board: ConceptBoard; isReversed?: boolean }> = ({ board, isReversed }) => (
  <section className="py-12 md:py-20">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <p className="font-inter text-xs tracking-[0.25em] text-muted-foreground uppercase mb-2">{board.title}</p>
        <h2 className="font-playfair text-3xl md:text-4xl text-foreground">{board.subtitle}</h2>
      </div>

      {/* Magazine Layout Grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 ${isReversed ? 'lg:[direction:rtl]' : ''}`}>
        {/* Main Large Image */}
        <div className={`lg:col-span-7 ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img 
              src={board.mainImage} 
              alt={board.title}
              className="w-full h-full object-cover project-image"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <p className="font-playfair text-white text-xl md:text-2xl">{board.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className={`lg:col-span-5 ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Top Two Images */}
            {board.gridImages.slice(0, 2).map((img, idx) => (
              <div key={idx} className="aspect-square overflow-hidden bg-muted">
                <img src={img} alt="" className="w-full h-full object-cover project-image hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
            {/* Bottom Large Image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden bg-muted">
              <img src={board.gridImages[2]} alt="" className="w-full h-full object-cover project-image hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities Strip */}
      <div className="mt-6 md:mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {board.details.map((detail, idx) => (
          <span key={idx} className="font-inter text-sm text-muted-foreground">
            {detail}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Design = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">("all");

  const displayedBoards = activeCategory === "all" 
    ? Object.entries(conceptBoards) 
    : Object.entries(conceptBoards).filter(([key]) => key === activeCategory);

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8E4DE] to-transparent opacity-50" />
        <div className="container mx-auto max-w-7xl relative">
          <Button
            variant="ghost"
            className="mb-8 text-muted-foreground hover:text-gold hover:bg-transparent -ml-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="max-w-3xl">
            <p className="font-inter text-xs tracking-[0.25em] text-gold uppercase mb-4">Design Portfolio</p>
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Design Concepts
            </h1>
            <p className="font-inter text-lg text-muted-foreground leading-relaxed max-w-xl">
              Luxury Residential • Hospitality • Commercial Development
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-16 z-30 bg-[#F5F3EF]/95 backdrop-blur-sm border-b border-border/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full font-inter text-sm transition-all whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-foreground text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              All Concepts
            </button>
            {categories.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full font-inter text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeCategory === key
                    ? "bg-foreground text-background"
                    : "bg-transparent text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Concept Board Sections */}
      {displayedBoards.map(([key, board], idx) => (
        <ConceptBoardSection key={key} board={board} isReversed={idx % 2 === 1} />
      ))}

      {/* Material Board Section */}
      <section className="py-16 md:py-24 bg-[#E8E4DE]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="font-inter text-xs tracking-[0.25em] text-muted-foreground uppercase mb-2">Material Palette</p>
            <h2 className="font-playfair text-3xl md:text-4xl text-foreground">Curated Materials</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {materialSwatches.map((swatch) => (
              <div key={swatch.name} className="group">
                <div className={`aspect-square ${swatch.color} rounded-sm shadow-sm group-hover:shadow-md transition-shadow`} />
                <p className="font-inter text-xs text-muted-foreground mt-3 text-center">{swatch.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-[#F5F3EF]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="font-inter text-xs tracking-[0.25em] text-muted-foreground uppercase mb-2">Our Process</p>
            <h2 className="font-playfair text-3xl md:text-4xl text-foreground">From Vision to Reality</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.number} className="relative">
                <span className="font-playfair text-6xl md:text-7xl text-gold/20 absolute -top-4 -left-2">{step.number}</span>
                <div className="pt-12">
                  <h3 className="font-playfair text-xl text-foreground mb-2">{step.title}</h3>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="font-playfair text-2xl md:text-3xl lg:text-4xl leading-relaxed italic">
            "We don't simply build structures—we craft environments that enhance how people live, work, and experience their world."
          </blockquote>
          <div className="mt-8 w-16 h-[2px] bg-gold mx-auto" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#F5F3EF]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-foreground mb-4">Ready to Begin?</h2>
          <p className="font-inter text-muted-foreground mb-8 max-w-lg mx-auto">
            Every exceptional project starts with a conversation. Let's discuss your vision.
          </p>
          <Button
            onClick={() => navigate("/contact")}
            className="bg-gold hover:bg-gold/90 text-white px-8 py-3"
          >
            Schedule Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Design;
