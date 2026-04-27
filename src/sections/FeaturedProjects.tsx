import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FeaturedProjectsProps {
    onViewAllClick: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
    onViewAllClick,
}) => {
    const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

    // Get featured projects from the data
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

    return (
        <section
            id="featured-projects"
            ref={elementRef as React.RefObject<HTMLElement>}
            className="py-32 lg:py-48 bg-cream relative overflow-hidden"
        >
            {/* Background watermark */}
            <div className="absolute top-16 right-0 pointer-events-none select-none overflow-hidden h-72 w-full">
                <span className="absolute right-0 top-0 font-playfair text-[18rem] text-charcoal/[0.02] leading-none whitespace-nowrap translate-x-1/4">
                    WORKS
                </span>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 mb-16 md:mb-20 lg:mb-28">
                    <div
                        className={`max-w-3xl transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                            }`}
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-6">
                            <div className="w-8 sm:w-12 h-px bg-gold" />
                            <p className="font-inter text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] text-gold uppercase">
                                Selected Works
                            </p>
                        </div>
                        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-charcoal font-extralight leading-[1.1]">
                            Crafting Legacy Through{" "}
                            <span className="italic text-charcoal/40 block sm:inline">Visionary Design</span>
                        </h2>
                    </div>

                    <div
                        className={`transition-all duration-1000 delay-500 ease-out flex-shrink-0 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                            }`}
                    >
                        <Button
                            variant="outline"
                            onClick={onViewAllClick}
                            className="h-12 md:h-14 lg:h-16 border-charcoal/10 text-charcoal hover:bg-charcoal hover:text-white group px-6 md:px-10 lg:px-14 rounded-none uppercase text-[8px] md:text-[9px] lg:text-[10px] tracking-[0.3em] font-inter transition-all duration-500"
                        >
                            View Full Portfolio
                            <ArrowRight className="ml-2 md:ml-3 h-3.5 w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>

                {/* Projects Grid - Responsive */}
                <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {featuredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                                }`}
                            style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                        >
                            <ProjectCard
                                project={project}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
