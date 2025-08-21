import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactUs = () => {
  return (
    <div>

      {/* Hero Section */}
      <div className="bg-success text-white text-center py-5">
        <h1 className="display-4 fw-bold">Get in Touch</h1>
        <p className="lead">We are here to help you 24/7 with all your medical queries.</p>
      </div>

      {/* Contact Info Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Our Contact Information</h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="card shadow-sm p-4 h-100">
                <h5 className="fw-bold">Address</h5>
                <p>123 Health Street, Wellness City, Country</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-4 h-100">
                <h5 className="fw-bold">Email</h5>
                <p>contact@hospital.com</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-4 h-100">
                <h5 className="fw-bold">Phone</h5>
                <p>+123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Send Us a Message</h2>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="name" placeholder="John Doe" required/>
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="john@example.com" required/>
            </div>
            <div className="col-12">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input type="text" className="form-control" id="subject" placeholder="Subject" required/>
            </div>
            <div className="col-12">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="5" placeholder="Your message here..." required></textarea>
            </div>
            <div className="col-12 text-center mt-3">
              <button type="submit" className="btn btn-light btn-lg fw-bold">Send Message</button>
            </div>
          </form>
        </div>
      </div>

      {/* Map / Location Section */}
      <div className="bg-warning text-dark py-5 text-center">
        <h2 className="fw-bold mb-4">Find Us Here</h2>
        <p className="mb-4">Our hospital is located in the heart of Wellness City, easily accessible by all transport.</p>
        <div className="ratio ratio-16x9 mx-auto" style={{maxWidth: "800px"}}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835433024513!2d144.9630577153182!3d-37.81362797975152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f3f0c9ef%3A0x5045675218ce6e0!2sHospital!5e0!3m2!1sen!2sus!4v1692633600000!5m2!1sen!2sus" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            title="Hospital Location"
          ></iframe>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-dark text-white text-center py-5">
        <h2 className="fw-bold">Need Immediate Assistance?</h2>
        <p className="fs-5">Call us now and our team will assist you immediately.</p>
        <a href="tel:+1234567890" className="btn btn-warning btn-lg fw-bold">Call Now</a>
      </div>

    </div>
  );
};

export default ContactUs;
