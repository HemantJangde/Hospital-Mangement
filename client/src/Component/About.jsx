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

      
      <div className="bg-primary text-white py-5 text-center responsive-min-vh"
   >
        <div className="container "
            style={{paddingTop:'170px',
      paddingBottom:'180px'}} 
        >
          <h2 className="fw-bold mb-3">Our Mission</h2>
          <p className="fs-6 fs-md-5 px-2 px-md-5">
            To provide world-class healthcare services with compassion and excellence,
            ensuring every patient receives the care they deserve.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-light py-5 text-center" data-aos="fade-up">
        <div className="container">
          <h2 className="fw-bold mb-3">Our Vision</h2>
          <p className="fs-6 fs-md-5 px-2 px-md-5">
            To become the most trusted and innovative healthcare provider in the region,
            delivering seamless medical care through advanced technology and skilled professionals.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-success text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" data-aos="fade-up">
            Our Core Values
          </h2>

          <div className="row g-4 justify-content-center">
            <div className="col-12 col-sm-6 col-md-3" data-aos="zoom-in">
              <div className="card bg-dark text-white p-4 shadow h-100">
                <h5 className="fw-bold">Compassion</h5>
                <p className="mb-0">
                  We care for every patient like family.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3" data-aos="zoom-in" data-aos-delay="150">
              <div className="card bg-dark text-white p-4 shadow h-100">
                <h5 className="fw-bold">Integrity</h5>
                <p className="mb-0">
                  We maintain transparency and honesty in all our actions.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3" data-aos="zoom-in" data-aos-delay="300">
              <div className="card bg-dark text-white p-4 shadow h-100">
                <h5 className="fw-bold">Excellence</h5>
                <p className="mb-0">
                  We strive for the highest standards in medical care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="bg-warning text-dark py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" data-aos="fade-up">
            Our Milestones
          </h2>

          <div className="row g-4 justify-content-center">
            <div className="col-6 col-md-3" data-aos="flip-left">
              <div className="card bg-primary text-white p-4 shadow h-100">
                <h3 className="fw-bold">10k+</h3>
                <p className="mb-0">Patients Treated</p>
              </div>
            </div>

            <div className="col-6 col-md-3" data-aos="flip-left" data-aos-delay="150">
              <div className="card bg-success text-white p-4 shadow h-100">
                <h3 className="fw-bold">50+</h3>
                <p className="mb-0">Expert Doctors</p>
              </div>
            </div>

            <div className="col-12 col-md-3" data-aos="flip-left" data-aos-delay="300">
              <div className="card bg-dark text-white p-4 shadow h-100">
                <h3 className="fw-bold">25+</h3>
                <p className="mb-0">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="bg-primary text-white text-center py-5" data-aos="zoom-in">
        <div className="container">
          <h2 className="fw-bold mb-3">Join Us in Our Journey</h2>
          <p className="fs-6 fs-md-5 mb-4">
            Experience healthcare excellence with our dedicated team of professionals.
          </p>
          <a
            href="/appointments"
            className="btn btn-light btn-lg fw-bold w-100 w-md-auto"
          >
            Book an Appointment
          </a>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
