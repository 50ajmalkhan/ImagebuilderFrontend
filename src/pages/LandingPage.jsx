import React from 'react';
import HeroSection from '../components/Landing/HeroSection';
import FeatureSection from '../components/Landing/FeatureSection';
import TestimonialSection from '../components/Landing/TestimonialSection';
import ShowcaseSection from '../components/Landing/ShowcaseSection';
import CTASection from '../components/Landing/CTASection';

const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeatureSection />
      <ShowcaseSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;