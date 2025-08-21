import React from "react";

export default function Footer() {
  return (
    <footer className="bg-info text-dark py-3 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        
        {/* Copyright */}
        <p className="mb-2 mb-md-0">
          © {new Date().getFullYear()} Hospital Management System. All rights reserved.
        </p>
        
        {/* Social Media Links */}
        <div>
          <a href="#" className="text-dark me-3 text-decoration-none" style={{fontSize: "1.2rem"}}>Facebook</a>
          <a href="#" className="text-dark me-3 text-decoration-none" style={{fontSize: "1.2rem"}}>Twitter</a>
          <a href="#" className="text-dark me-3 text-decoration-none" style={{fontSize: "1.2rem"}}>Instagram</a>
          <a href="#" className="text-dark text-decoration-none" style={{fontSize: "1.2rem"}}>LinkedIn</a>
        </div>

      </div>
    </footer>
  );
}
