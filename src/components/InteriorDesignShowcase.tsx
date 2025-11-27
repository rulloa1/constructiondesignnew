import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: "Contemporary Maximalism Living",
    description:
      "A bold interior design featuring layered textures, vibrant accent colors, and curated artwork. The space demonstrates how maximalist principles can create sophisticated, livable environments.",
    highlights: [
      "Layered textures and bold color accents",
      "Geometric patterns and curated artwork",
      "Dramatic lighting and spatial composition",
    ],
  },
  {
    title: "Minimalist Luxury",
    description:
      "An understated approach to luxury featuring refined materials, neutral palettes, and strategic accent elements. The design emphasizes quality over quantity.",
    highlights: [
      "Refined materials and neutral color schemes",
      "Strategic accent elements for visual interest",
      "Quality-focused design philosophy",
    ],
  },
  {
    title: "Transitional Family Home",
    description:
      "A balanced approach combining traditional warmth with modern functionality, creating spaces that are both beautiful and livable for active families.",
    highlights: [
      "Warm traditional elements with modern touches",
      "Functional family-focused design",
      "Timeless aesthetic appeal",
    ],
  },
];

export const InteriorDesignShowcase = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { elementRef: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="interior-design"
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
              Interior Design Showcase
            </h2>
            <p className="text-base sm:text-lg font-inter text-foreground/70 max-w-3xl leading-relaxed">
              Complete interior design projects that demonstrate our approach to creating cohesive, beautiful spaces
            </p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                style={{
                  animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.15}s forwards` : "none",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="h-64 sm:h-80 md:h-96 bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center overflow-hidden relative group">
                    <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                      {index === 0 ? "🎨" : index === 1 ? "✨" : "🏡"}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>

                  {/* Content Side */}
                  <CardContent className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl sm:text-3xl font-playfair font-semibold text-foreground mb-3 sm:mb-4 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-foreground/70 font-inter text-sm sm:text-base mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 sm:space-y-3">
                      {project.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                          <span className="text-foreground/80 font-inter text-sm sm:text-base">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
