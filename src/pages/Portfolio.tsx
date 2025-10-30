import React from "react";
import { PortfolioSection } from "@/components/PortfolioSection";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Chatbot } from "@/components/Chatbot";

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <PortfolioSection />
      <MusicPlayer />
      <Chatbot />
    </div>
  );
};

export default Portfolio;
