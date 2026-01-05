// src/pages/LandingPage.jsx
import React from "react";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Features from "../components/landing/Features";
import Feedback from "../components/landing/Feedback";
import Request from "../components/landing/Request";
import Footer from "../components/landing/Footer";
import Report from "../components/landing/Report";
import Services from "../components/landing/Services"

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <Hero />

      {/* About / Info Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Features Section */}
      <Features />

      {/* Feedback Section */}
      <Feedback />

      {/* Request New Feature Section */}
      <Request />

      {/* Footer */}
      <Footer />
    </div>
  );
}
