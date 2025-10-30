import React from "react";
import { useNavigate } from "react-router-dom";
import { VideoHero } from "@/components/VideoHero";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Chatbot } from "@/components/Chatbot";

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenPortfolio = () => {
    navigate('/portfolio');
  };

  return (
    <div className="min-h-screen bg-background">
      <VideoHero onOpenPortfolio={handleOpenPortfolio} />
      <MusicPlayer />
      <Chatbot />
    </div>
  );
};

export default Index;