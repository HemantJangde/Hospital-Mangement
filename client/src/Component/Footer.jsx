import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  // Simple scroll detection to trigger fade-in
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const rect = footer.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`bg-info text-dark py-4 mt-auto footer-animate ${isVisible ? "visible" : ""}`}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">

        <p className="mb-3 mb-md-0 text-center text-md-start">
          © {new Date().getFullYear()} Hospital Management System. All rights reserved.
        </p>

        <div className="d-flex justify-content-center justify-content-md-end gap-3">
          <a href="#" className="social-icon"><FaFacebookF /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
          <a href="#" className="social-icon"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
}
