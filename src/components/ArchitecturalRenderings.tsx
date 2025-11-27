import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";

interface Rendering {
  title: string;
  description: string;
  image: string;
}

const renderings: Rendering[] = [
  {
    title: "Modern Residential Living",
    description: "Contemporary space with dramatic ceiling heights and natural materials",
    image: "/api/placeholder/600/400",
  },
  {
    title: "Commercial Excellence",
    description: "Luxury space with custom millwork and sophisticated finishes",
    image: "/api/placeholder/600/400",
  },
  {
    title: "Transitional Elegance",
    description: "Blending traditional craftsmanship with modern design principles",
    image: "/api/placeholder/600/400",
  },
];

export const ArchitecturalRenderings = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { elementRef: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="renderings"
      ref={elementRef as React.RefObject<HTMLElement>}
      className="relative py-16 sm:py-20 md:py-24 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div
            ref={headingRef as React.RefObject<HTMLDivElement>}
            className={`mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
              headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold mb-4 sm:mb-5 md:mb-6 text-foreground tracking-tight leading-tight">
              Architectural Renderings
            </h2>
            <p className="text-base sm:text-lg font-inter text-foreground/70 max-w-3xl leading-relaxed">
              High-fidelity 3D visualizations that bring design concepts to life, showcasing spatial relationships, lighting, materials, and the complete design vision
            </p>
          </div>

          {/* Renderings Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {renderings.map((rendering, index) => (
              <Card
                key={rendering.title}
                className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                style={{
                  animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.1}s forwards` : "none",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-muted">
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl text-amber-200 mb-2">🏗️</div>
                      <p className="text-amber-600 font-inter text-sm">Rendering Preview</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-playfair font-semibold text-foreground mb-2 leading-tight">
                    {rendering.title}
                  </h3>
                  <p className="text-foreground/70 font-inter text-sm sm:text-base leading-relaxed">
                    {rendering.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
