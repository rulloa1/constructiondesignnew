import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";

interface FurnitureItem {
  title: string;
  description: string;
}

const furnitureItems: FurnitureItem[] = [
  {
    title: "Architectural Shelving",
    description: "Custom-designed shelving that functions as both storage and sculptural element, with precision joinery",
  },
  {
    title: "Bespoke Cabinetry",
    description: "Tailored solutions that maximize functionality while serving as design focal points with innovative storage",
  },
  {
    title: "Statement Seating",
    description: "Custom upholstered pieces designed to complement spatial proportions and design narratives",
  },
];

export const CustomFurniture = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { elementRef: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="custom-furniture"
      ref={elementRef as React.RefObject<HTMLElement>}
      className="relative py-16 sm:py-20 md:py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div
            ref={headingRef as React.RefObject<HTMLDivElement>}
            className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
              headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold mb-4 sm:mb-5 md:mb-6 text-foreground tracking-tight leading-tight">
              Custom Furniture & Millwork
            </h2>
            <p className="text-base sm:text-lg font-inter text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Beyond standard furnishings, we design and craft custom pieces that perfectly integrate with architectural spaces
            </p>
          </div>

          {/* Furniture Grid */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {furnitureItems.map((item, index) => (
              <Card
                key={item.title}
                className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                style={{
                  animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.1}s forwards` : "none",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div className="h-48 sm:h-56 bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center overflow-hidden relative">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {index === 0 ? "📚" : index === 1 ? "🚪" : "🪑"}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-playfair font-semibold text-foreground mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 font-inter text-sm sm:text-base leading-relaxed">
                    {item.description}
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
