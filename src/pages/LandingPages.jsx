import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Feature from "@/components/Feature";
import Testimonials from "@/components/Testimonials";
import FaQ from "@/components/FaQ";
import Footer from "@/components/Footer";

const LandingPages = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Feature />
      <Testimonials />
      <FaQ />
      <Footer />
    </>
  );
};

export default LandingPages;
