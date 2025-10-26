import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/mc-logo.png";

interface BookCoverHeroProps {
  onOpenBook: () => void;
}

export const BookCoverHero: React.FC<BookCoverHeroProps> = ({ onOpenBook }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-charcoal flex items-center justify-center">
      {/* Ambient background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Book cover */}
      <div 
        className={`relative transition-all duration-500 ease-out ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-20px)' : 'translateY(0)',
          filter: isHovered ? 'drop-shadow(0 30px 60px rgba(201, 169, 97, 0.3))' : 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))'
        }}
      >
        {/* Book texture and border */}
        <div className="relative w-[400px] h-[600px] md:w-[500px] md:h-[700px] bg-gradient-to-br from-charcoal via-charcoal to-charcoal/90 border-4 border-gold/30 rounded-sm overflow-hidden">
          {/* Leather texture overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          {/* Spine detail */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-12 space-y-8">
            {/* Logo - embossed effect */}
            <div className="mb-8 opacity-0 animate-fade-in" style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8)) drop-shadow(0 -1px 2px rgba(201, 169, 97, 0.3))'
            }}>
              <img src={logo} alt="MC Logo" className="h-24 w-auto opacity-90" />
            </div>

            {/* Main title - embossed/debossed effect */}
            <div className="text-center space-y-4 opacity-0 animate-fade-in delay-200">
              <h1 className="font-playfair text-5xl md:text-6xl font-bold tracking-[0.2em] text-gold relative"
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(201, 169, 97, 0.3), 0 0 20px rgba(201, 169, 97, 0.2)',
                  letterSpacing: '0.2em'
                }}>
                MICHAEL
              </h1>
              <h1 className="font-playfair text-5xl md:text-6xl font-bold tracking-[0.2em] text-gold relative"
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(201, 169, 97, 0.3), 0 0 20px rgba(201, 169, 97, 0.2)',
                  letterSpacing: '0.2em'
                }}>
                CHANDLER
              </h1>
            </div>

            {/* Decorative divider - embossed */}
            <div className="flex items-center gap-4 opacity-0 animate-fade-in delay-300">
              <div className="w-16 h-px bg-gold/60" style={{
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.8), 0 -1px 1px rgba(201, 169, 97, 0.2)'
              }} />
              <div className="w-2 h-2 rotate-45 border-2 border-gold/60" style={{
                boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 1px rgba(201, 169, 97, 0.2)'
              }} />
              <div className="w-16 h-px bg-gold/60" style={{
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.8), 0 -1px 1px rgba(201, 169, 97, 0.2)'
              }} />
            </div>

            {/* Subtitle - pressed into leather effect */}
            <p className="font-inter text-cream text-lg md:text-xl font-medium tracking-[0.25em] uppercase opacity-0 animate-fade-in delay-400"
              style={{
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.9), 0 0 10px rgba(242, 234, 211, 0.1)',
                letterSpacing: '0.25em'
              }}>
              Fine Construction & Design
            </p>

            {/* CTA Button */}
            <div className="pt-8 opacity-0 animate-fade-in delay-500">
              <Button
                onClick={onOpenBook}
                className="bg-gold hover:bg-gold/90 text-charcoal font-inter font-semibold px-8 py-6 text-base tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 animate-pulse-subtle"
                style={{
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                Open Portfolio
              </Button>
            </div>
          </div>

          {/* Corner embellishments */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-gold/30" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-gold/30" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-gold/30" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-gold/30" />
        </div>
      </div>
    </section>
  );
};
