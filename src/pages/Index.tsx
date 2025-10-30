import React from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Chatbot } from "@/components/Chatbot";

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenPortfolio = () => {
    navigate('/portfolio');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <Hero />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={handleOpenPortfolio}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-charcoal font-inter font-semibold px-10 py-7 text-lg tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/30 rounded-sm"
          >
            View Portfolio
          </Button>
        </div>
      </div>
      <MusicPlayer />
      <Chatbot />
    </div>
  );
};

export default Index;