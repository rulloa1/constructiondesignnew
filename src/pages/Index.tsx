import React, { useState } from "react";
import { VideoHero } from "@/components/VideoHero";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { DesignDevelopment } from "@/components/DesignDevelopment";
import { FlippingPortfolio } from "@/components/FlippingPortfolio";
import { MusicPlayer } from "@/components/MusicPlayer";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { ProjectCategory } from "@/data/projects";

const Index: React.FC = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");

  const handleViewProjects = (category: string) => {
    setSelectedCategory(category as ProjectCategory | "All");
    setShowPortfolio(true);
  };

  const handleClosePortfolio = () => {
    setShowPortfolio(false);
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen">
      <MusicPlayer />
      
      {!showPortfolio ? (
        <>
          <VideoHero onOpenPortfolio={() => setShowPortfolio(true)} />
          <CategoryShowcase onViewProjects={handleViewProjects} />
          <DesignDevelopment />
          <About />
          <Contact />
          <Footer />
        </>
      ) : (
        <FlippingPortfolio 
          onClose={handleClosePortfolio}
          initialCategory={selectedCategory}
        />
      )}
      
      <Chatbot />
    </div>
  );
};

export default Index;
