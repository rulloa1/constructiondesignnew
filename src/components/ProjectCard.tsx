import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImageWithWatermark } from "@/components/ImageWithWatermark";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

interface ProjectImage {
  url: string;
  alt: string;
}

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    subtitle?: string;
    category: string;
    location?: string;
    coverImage?: string;
    images: (string | ProjectImage)[];
  };
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    elementRef,
    isVisible
  } = useScrollAnimation({
    threshold: 0.1
  });

  // Handle both coverImage and images array (with string or object format)
  const getImageUrl = (img: string | ProjectImage): string => {
    return typeof img === 'string' ? img : img.url;
  };

  const coverImage = project.coverImage || (project.images[0] ? getImageUrl(project.images[0]) : '');

  const formattedCategory = project.category
    .replace(" ", " • ")
    .replace("/", " • ");

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-charcoal/5 rounded-sm shadow-md transition-all duration-500 group-hover:shadow-xl">
          <ImageWithWatermark>
            <ProgressiveImage
              src={coverImage}
              alt={project.title}
              objectFit="cover"
              className="relative z-10 w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-out"
            />
          </ImageWithWatermark>

          {/* Multi-layer overlay system */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent z-20 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Accent overlay on hover */}
          <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500 z-21" />

          {/* Category Badge */}
          <div className={`absolute bottom-4 left-4 z-30 transition-all duration-500 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-90'}`}>
            <span className="bg-charcoal/85 text-white px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.2em] backdrop-blur-md border border-white/10 transition-all duration-500 group-hover:bg-charcoal/95 group-hover:border-gold/30">
              {formattedCategory}
            </span>
          </div>

          {/* Main CTA Arrow - enhanced */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center backdrop-blur-md bg-charcoal/30 transition-all duration-500 group-hover:border-gold group-hover:bg-charcoal/60">
              <ArrowRight className="h-6 w-6 text-white transition-transform duration-500 group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Corner accent - top right */}
          <div className={`absolute top-4 right-4 z-30 w-8 h-8 border-t border-r border-white/30 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

          {/* Corner accent - bottom left */}
          <div className={`absolute bottom-4 right-4 z-30 w-8 h-8 border-b border-r border-white/20 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-20'}`} />
        </div>

        {/* Project Info */}
        <div className="space-y-2.5 group-hover:translate-y-0 transition-all duration-500">
          <div>
            <h3 className="font-playfair text-lg leading-tight text-charcoal group-hover:text-gold transition-colors duration-500">
              {project.title}
            </h3>
          </div>
          {project.subtitle && (
            <p className="font-inter text-sm text-charcoal/60 font-light group-hover:text-charcoal/80 transition-colors duration-500">
              {project.subtitle}
            </p>
          )}
          {project.location && (
            <p className="font-inter text-xs text-charcoal/40 tracking-wide group-hover:text-charcoal/60 transition-colors duration-500">
              {project.location}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
