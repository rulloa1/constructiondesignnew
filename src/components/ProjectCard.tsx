import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageWithWatermark } from "@/components/ImageWithWatermark";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import logo from "@/assets/mc-logo.png";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    subtitle?: string;
    category: string;
    location?: string;
    images: string[];
  };
  categoryColor: string;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, categoryColor, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const {
    elementRef,
    isVisible
  } = useScrollAnimation({
    threshold: 0.1
  });

  const coverImage = project.images[0];
  
  // Format category with bullet separator
  const formattedCategory = project.category
    .replace(" ", " • ")
    .replace("/", " • ");

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <Link 
        to={`/projects/${project.id}`}
        className="block"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-muted">
          <ImageWithWatermark>
            {/* Blur placeholder background */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-stone/20 via-cream to-gold/10 transition-opacity duration-500 ${
                imageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="absolute inset-0 backdrop-blur-sm" />
              <Skeleton className="absolute inset-0" />
            </div>
            
            {/* Error fallback */}
            {imageError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cream via-offWhite to-stone/10">
                <img 
                  src={logo} 
                  alt="MC Design" 
                  className="w-16 h-16 object-contain opacity-30 mb-2"
                />
                <span className="text-xs text-charcoal/40 font-inter uppercase tracking-wider">
                  Image Unavailable
                </span>
              </div>
            ) : (
              <img
                src={coverImage}
                alt={project.title}
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 project-image ${
                  imageLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
                loading="lazy"
              />
            )}
          </ImageWithWatermark>
          
          {/* Category Badge - Bottom Left */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="bg-charcoal/70 text-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm">
              {formattedCategory}
            </span>
          </div>
        </div>

        {/* Project Info - Title, Subtitle, Location */}
        <div className="space-y-0.5">
          <h3 className="font-inter text-base text-charcoal group-hover:text-gold transition-colors duration-300">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="font-inter text-base text-charcoal">
              {project.subtitle}
            </p>
          )}
          {project.location && (
            <p className="font-inter text-sm text-charcoal/50 mt-1">
              {project.location}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
