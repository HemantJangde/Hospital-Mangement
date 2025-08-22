import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-info text-dark py-4 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">

        {/* Copyright */}
        <p className="mb-3 mb-md-0 text-center text-md-start">
          © {new Date().getFullYear()} Hospital Management System. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="d-flex justify-content-center justify-content-md-end gap-3">
          <a href="#" className="text-dark fs-5 hover-opacity" title="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="text-dark fs-5 hover-opacity" title="Twitter">
            <FaTwitter />
          </a>
          <a href="#" className="text-dark fs-5 hover-opacity" title="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className="text-dark fs-5 hover-opacity" title="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Inline CSS for hover effect */}
      <style jsx>{`
        .hover-opacity:hover {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
      `}</style>
    </footer>
  );
}
