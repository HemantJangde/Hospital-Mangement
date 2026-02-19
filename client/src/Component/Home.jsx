import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
  }, []);

  return (
    <div>

      {/* Hero Section */}
      <div
        className="bg-primary text-white text-center  responsive-min-vh d-flex align-items-center"
   >
        <div className="container">
          <h1 className="fw-bold display-6 display-md-4">
            Welcome to Our Hospital
          </h1>
          <p className="lead fs-6 fs-md-5">
            Advanced Healthcare, Compassionate Care, Trusted Professionals
          </p>

          <div className="mt-4 d-flex flex-column flex-md-row justify-content-center gap-3">
            <a
              href="/appointments"
              className="btn btn-light btn-lg fw-bold w-100 w-md-auto"
            >
              Book Appointment
            </a>
            <a
              href="/contact"
              className="btn btn-outline-light btn-lg fw-bold w-100 w-md-auto"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4" data-aos="fade-up">
            Our Services
          </h2>

          <div className="row g-4 text-center">
            <div className="col-12 col-md-4" data-aos="zoom-in">
              <div className="card h-100 shadow-sm p-4 bg-primary text-white">
                <h5 className="fw-bold">24/7 Emergency Care</h5>
                <p className="mb-0">
                  Always ready to handle any medical emergency.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4" data-aos="zoom-in" data-aos-delay="150">
              <div className="card h-100 shadow-sm p-4 bg-success text-white">
                <h5 className="fw-bold">Advanced Diagnostics</h5>
                <p className="mb-0">
                  High-quality diagnostic services for accurate results.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4" data-aos="zoom-in" data-aos-delay="300">
              <div className="card h-100 shadow-sm p-4 bg-warning text-dark">
                <h5 className="fw-bold">Expert Medical Team</h5>
                <p className="mb-0">
                  Skilled doctors and nurses providing compassionate care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-secondary text-white py-5" data-aos="fade-up">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Our Achievements</h2>

          <div className="row g-4">
            <div className="col-6 col-md-3">
              <h3 className="fw-bold">10k+</h3>
              <p className="mb-0">Patients Served</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="fw-bold">50+</h3>
              <p className="mb-0">Expert Doctors</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="fw-bold">25+</h3>
              <p className="mb-0">Years of Experience</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="fw-bold">15</h3>
              <p className="mb-0">Departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4" data-aos="fade-up">
            Meet Our Doctors
          </h2>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card h-100 shadow-sm text-center p-4 bg-primary text-white">
                <h5 className="fw-bold">Dr. John Doe</h5>
                <p className="mb-0">Chief Medical Officer</p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 shadow-sm text-center p-4 bg-success text-white">
                <h5 className="fw-bold">Dr. Jane Smith</h5>
                <p className="mb-0">Head of Surgery</p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 shadow-sm text-center p-4 bg-warning text-dark">
                <h5 className="fw-bold">Dr. Alan Brown</h5>
                <p className="mb-0">Chief Nurse</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">What Our Patients Say</h2>

          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <p className="fst-italic fs-6 fs-md-5">
                  "Excellent service and very caring staff!"
                </p>
                <h6 className="fw-bold">– Mary Johnson</h6>
              </div>
              <div className="carousel-item">
                <p className="fst-italic fs-6 fs-md-5">
                  "The doctors are very professional and supportive."
                </p>
                <h6 className="fw-bold">– Robert Smith</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-warning text-dark text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Book Your Appointment Today</h2>
          <p className="fs-6 fs-md-5">
            Get world-class healthcare with our experienced medical team.
          </p>
          <a href="/appointments" className="btn btn-dark btn-lg fw-bold">
            Book Now
          </a>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
