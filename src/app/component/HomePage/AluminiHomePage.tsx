
import React from 'react';
import Navbar from "../HomePage/components/Navbar";
import HeroSection from "../HomePage/components/HeroSection";
import AwardeesSection from "../HomePage/components/AwardeesSection";
import GuidelinesSection from  "../HomePage/components/GuidelinesSection";
import EligibilitySection from "../HomePage/components/EligibilitySection";
import ProcessSection from "../HomePage/components/ProcessSection";
import CriteriaSection from "../HomePage/components/CriteriaSection";
import CTASection from  "../HomePage/components/CTASection";
import Footer from "../HomePage/components/Footer";

const AluminiHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white relative pt-5 scrollbarhide ">
      {/* Dotted Grid Background */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #374151 3px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 scrollbarhide">
        <Navbar />
        <HeroSection />
        <AwardeesSection />
        <GuidelinesSection />
        <EligibilitySection />
        <ProcessSection />
        <CriteriaSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default AluminiHomePage;