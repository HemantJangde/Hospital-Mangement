import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
  }, []);

  return (
    <div>

      {/* Mission Section */}
      <div className="bg-primary text-white py-5 text-center" data-aos="fade-down">
        <h2 className="fw-bold mb-3">Our Mission</h2>
        <p className="fs-5 px-3">
          To provide world-class healthcare services with compassion and excellence, 
          ensuring every patient receives the care they deserve.
        </p>
      </div>

      {/* Vision Section */}
      <div className="bg-light py-5 text-center" data-aos="fade-up">
        <h2 className="fw-bold mb-3">Our Vision</h2>
        <p className="fs-5 px-3">
          To become the most trusted and innovative healthcare provider in the region, 
          delivering seamless medical care through advanced technology and skilled professionals.
        </p>
      </div>

      {/* Values Section */}
      <div className="bg-success text-white py-5 text-center">
        <h2 className="fw-bold mb-4" data-aos="fade-up">Our Core Values</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-3" data-aos="zoom-in" data-aos-delay="100">
            <div className="card bg-dark text-white p-4 shadow h-100 value-card">
              <h5 className="fw-bold">Compassion</h5>
              <p>We care for every patient like family.</p>
            </div>
          </div>
          <div className="col-md-3 mb-3" data-aos="zoom-in" data-aos-delay="200">
            <div className="card bg-dark text-white p-4 shadow h-100 value-card">
              <h5 className="fw-bold">Integrity</h5>
              <p>We maintain transparency and honesty in all our actions.</p>
            </div>
          </div>
          <div className="col-md-3 mb-3" data-aos="zoom-in" data-aos-delay="300">
            <div className="card bg-dark text-white p-4 shadow h-100 value-card">
              <h5 className="fw-bold">Excellence</h5>
              <p>We strive for the highest standards in medical care.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="bg-warning text-dark py-5 text-center">
        <h2 className="fw-bold mb-4" data-aos="fade-up">Our Milestones</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-3" data-aos="flip-left">
            <div className="card bg-primary text-white p-4 shadow h-100 milestone-card">
              <h3 className="fw-bold">10k+</h3>
              <p>Patients Treated</p>
            </div>
          </div>
          <div className="col-md-3 mb-3" data-aos="flip-left" data-aos-delay="100">
            <div className="card bg-success text-white p-4 shadow h-100 milestone-card">
              <h3 className="fw-bold">50+</h3>
              <p>Expert Doctors</p>
            </div>
          </div>
          <div className="col-md-3 mb-3" data-aos="flip-left" data-aos-delay="200">
            <div className="card bg-dark text-white p-4 shadow h-100 milestone-card">
              <h3 className="fw-bold">25+</h3>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="bg-primary text-white text-center py-5" data-aos="zoom-in">
        <h2 className="fw-bold mb-3">Join Us in Our Journey</h2>
        <p className="fs-5 mb-4">Experience healthcare excellence with our dedicated team of professionals.</p>
        <a href="/appointments" className="btn btn-light btn-lg fw-bold btn-animate">Book an Appointment</a>
      </div>

    </div>
  );
};

export default AboutUs;
