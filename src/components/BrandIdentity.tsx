import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";

export const BrandIdentity = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { elementRef: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="brand-identity"
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
              Brand Identity
            </h2>
            <p className="text-base sm:text-lg font-inter text-foreground/70 max-w-3xl leading-relaxed">
              The Design Album represents a curated collection of architectural and design work, showcasing the intersection of vision and execution. Our logo embodies the principles of precision, creativity, and timeless design.
            </p>
          </div>

          {/* Brand Identity Grid */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left Side - Description */}
            <div
              style={{
                animation: isVisible ? "fadeIn 0.6s ease-out 0.1s forwards" : "none",
                opacity: isVisible ? 1 : 0,
              }}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-playfair font-semibold text-foreground mb-2">
                      Geometric Abstraction
                    </h3>
                    <p className="text-foreground/70 font-inter text-sm sm:text-base">
                      Combining architectural elements with modern design principles
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-playfair font-semibold text-foreground mb-2">
                      Minimalist Representation
                    </h3>
                    <p className="text-foreground/70 font-inter text-sm sm:text-base">
                      Layered design elements representing depth and complexity
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-playfair font-semibold text-foreground mb-2">
                      Versatile & Scalable
                    </h3>
                    <p className="text-foreground/70 font-inter text-sm sm:text-base">
                      Modern, adaptable across all applications and mediums
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Logo Showcase */}
            <div
              style={{
                animation: isVisible ? "fadeIn 0.6s ease-out 0.2s forwards" : "none",
                opacity: isVisible ? 1 : 0,
              }}
            >
              <Card className="bg-card border-border shadow-lg overflow-hidden">
                <CardContent className="p-8 sm:p-12 bg-gradient-to-br from-amber-50 to-white flex items-center justify-center min-h-80">
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl font-playfair font-bold text-amber-900 mb-4">
                      DA
                    </div>
                    <p className="text-foreground/60 font-inter text-sm">
                      The Design Album
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
