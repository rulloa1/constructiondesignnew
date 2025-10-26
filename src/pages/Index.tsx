import React, { useState } from "react";
import { VideoHero } from "@/components/VideoHero";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { MusicPlayer } from "@/components/MusicPlayer";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

const Index: React.FC = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);

  return (
    <div className="min-h-screen">
      <MusicPlayer />
      
      {!showPortfolio ? (
        <VideoHero onOpenPortfolio={() => setShowPortfolio(true)} />
      ) : (
        <>
          <PortfolioGrid onClose={() => setShowPortfolio(false)} />
          <main>
            <About />
            <Contact />
          </main>
          <Footer />
        </>
      )}
      
      <Chatbot />
    </div>
  );
};

export default Index;
