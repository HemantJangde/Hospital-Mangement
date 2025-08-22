import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div>

      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="display-4 fw-bold">Welcome to Our Hospital</h1>
        <p className="lead">Advanced Healthcare, Compassionate Care, Trusted Professionals</p>
        <div className="mt-4">
          <a href="/appointments" className="btn btn-light btn-lg me-3 fw-bold">Book Appointment</a>
          
          <a href="/contact" className="btn btn-outline-light btn-lg fw-bold">Contact Us</a>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Our Services</h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="card shadow-sm p-4 h-100" style={{backgroundColor: "#0d6efd", color: "white"}}>
                <h5 className="fw-bold">24/7 Emergency Care</h5>
                <p>Always ready to handle any medical emergency.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-4 h-100" style={{backgroundColor: "#198754", color: "white"}}>
                <h5 className="fw-bold">Advanced Diagnostics</h5>
                <p>High-quality diagnostic services for accurate results.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-4 h-100" style={{backgroundColor: "#ffc107", color: "black"}}>
                <h5 className="fw-bold">Expert Medical Team</h5>
                <p>Skilled doctors and nurses providing compassionate care.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements / Stats Section */}
      <div className="bg-secondary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Our Achievements</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <h3 className="fw-bold">10k+</h3>
              <p>Patients Served</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold">50+</h3>
              <p>Expert Doctors</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold">25+</h3>
              <p>Years of Experience</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold">15</h3>
              <p>Departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team / Doctors Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Meet Our Doctors</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm text-center p-4 h-100 bg-primary text-white">
                <h5 className="fw-bold">Dr. John Doe</h5>
                <p>Chief Medical Officer</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm text-center p-4 h-100 bg-success text-white">
                <h5 className="fw-bold">Dr. Jane Smith</h5>
                <p>Head of Surgery</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm text-center p-4 h-100 bg-warning text-dark">
                <h5 className="fw-bold">Dr. Alan Brown</h5>
                <p>Chief Nurse</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">What Our Patients Say</h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner text-center">
              <div className="carousel-item active">
                <p className="fs-5 fst-italic">"Excellent service and very caring staff! Highly recommended."</p>
                <h5 className="fw-bold mt-2">- Mary Johnson</h5>
              </div>
              <div className="carousel-item">
                <p className="fs-5 fst-italic">"The doctors are very professional and supportive throughout."</p>
                <h5 className="fw-bold mt-2">- Robert Smith</h5>
              </div>
              <div className="carousel-item">
                <p className="fs-5 fst-italic">"Amazing facilities and smooth appointment process!"</p>
                <h5 className="fw-bold mt-2">- Linda Williams</h5>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-warning text-dark text-center py-5">
        <h2 className="fw-bold">Book Your Appointment Today</h2>
        <p className="fs-5">Get world-class healthcare with our experienced medical team.</p>
        <a href="/appointments" className="btn btn-dark btn-lg fw-bold">Book Now</a>
      </div>

    </div>
  );
};

export default HomePage;
