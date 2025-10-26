import React from "react";
import { CheckCircle } from "lucide-react";
import developmentImg1 from "@/assets/projects/1_Before.jpg";
import developmentImg2 from "@/assets/projects/2_After.jpg";
import developmentImg3 from "@/assets/projects/3_Before.jpg";
import developmentImg4 from "@/assets/projects/4_After.jpg";

const processSteps = [
  {
    number: "01",
    title: "Concept & Planning",
    description: "Collaborative design sessions to understand your vision and requirements",
  },
  {
    number: "02",
    title: "Design Development",
    description: "Detailed blueprints, 3D renderings, and material selection",
  },
  {
    number: "03",
    title: "Construction",
    description: "Meticulous execution with regular updates and quality control",
  },
  {
    number: "04",
    title: "Final Touches",
    description: "Finishing details and comprehensive walkthrough",
  },
];

const highlights = [
  "Licensed & Insured Contractors",
  "Premium Material Selection",
  "Transparent Communication",
  "On-Time Project Delivery",
];

export const DesignDevelopment: React.FC = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="max-w-3xl mb-16 opacity-0 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal mb-6">
            Design & Development
          </h2>
          <p className="font-inter text-lg text-muted-foreground font-light leading-relaxed">
            From initial concept to final execution, we guide you through every phase 
            of the construction process with expertise and attention to detail.
          </p>
        </div>

        {/* Before & After Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="opacity-0 animate-fade-in delay-200">
            <div className="relative">
              <span className="absolute top-4 left-4 bg-charcoal/80 text-cream px-3 py-1 rounded-sm text-sm font-medium z-10">
                Before
              </span>
              <img
                src={developmentImg1}
                alt="Project before renovation"
                className="w-full h-96 object-cover rounded-sm hover-lift"
              />
            </div>
          </div>
          <div className="opacity-0 animate-fade-in delay-300">
            <div className="relative">
              <span className="absolute top-4 left-4 bg-gold text-charcoal px-3 py-1 rounded-sm text-sm font-medium z-10">
                After
              </span>
              <img
                src={developmentImg2}
                alt="Project after renovation"
                className="w-full h-96 object-cover rounded-sm hover-lift"
              />
            </div>
          </div>
          <div className="opacity-0 animate-fade-in delay-400">
            <div className="relative">
              <span className="absolute top-4 left-4 bg-charcoal/80 text-cream px-3 py-1 rounded-sm text-sm font-medium z-10">
                Before
              </span>
              <img
                src={developmentImg3}
                alt="Project before transformation"
                className="w-full h-96 object-cover rounded-sm hover-lift"
              />
            </div>
          </div>
          <div className="opacity-0 animate-fade-in delay-500">
            <div className="relative">
              <span className="absolute top-4 left-4 bg-gold text-charcoal px-3 py-1 rounded-sm text-sm font-medium z-10">
                After
              </span>
              <img
                src={developmentImg4}
                alt="Project after transformation"
                className="w-full h-96 object-cover rounded-sm hover-lift"
              />
            </div>
          </div>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className={`opacity-0 animate-fade-in-up`}
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            >
              <div className="mb-4">
                <span className="font-playfair text-6xl font-bold text-gold/20">
                  {step.number}
                </span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-sm p-8 md:p-12 opacity-0 animate-fade-in delay-700">
          <h3 className="font-playfair text-2xl md:text-3xl font-semibold text-charcoal mb-8 text-center">
            Why Choose Michael Chandler
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <CheckCircle className="h-6 w-6 text-gold flex-shrink-0" />
                <span className="font-inter text-charcoal">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
