import React from "react";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import { Helmet } from "react-helmet";
const LandingPage = () => {
  return (
    <>
       <Helmet>
        <title>NBTA DX</title>
      </Helmet>
      <Navbar /> 
      <HeroSection />
      <FeatureSection />
      <Footer/>
    </>
  );
};

export default LandingPage;
