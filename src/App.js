// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutMe from "./components/AboutMe";
import HeroSection from "./components/HeroSection";
import PaalasIntro from "./components/PaalasIntro";
import VideoSection from "./components/VideoSection";
import FormPage from "./components/FormPage";
import CollaborateWithMe from "./components/CollaborateWithMe";
import Footer from "./components/Footer";

 // New form page
import "./App.css";

const Home = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="app-container">
      <HeroSection />
      <main className="main-content">
        <PaalasIntro />
        <AboutMe />
        <VideoSection />
        <CollaborateWithMe />
        <Footer/>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
