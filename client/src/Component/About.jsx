import React from "react";

const AboutUs = () => {
  return (
    <div>

      {/* Mission Section */}
      <div className="bg-primary text-white py-5 text-center">
        <h2 className="fw-bold mb-3">Our Mission</h2>
        <p className="fs-5 px-3">
          To provide world-class healthcare services with compassion and excellence, 
          ensuring every patient receives the care they deserve.
        </p>
      </div>

      {/* Vision Section */}
      <div className="bg-light py-5 text-center">
        <h2 className="fw-bold mb-3">Our Vision</h2>
        <p className="fs-5 px-3">
          To become the most trusted and innovative healthcare provider in the region, 
          delivering seamless medical care through advanced technology and skilled professionals.
        </p>
      </div>

      {/* Values Section */}
      <div className="bg-success text-white py-5 text-center">
        <h2 className="fw-bold mb-4">Our Core Values</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-3">
            <div className="card bg-dark text-white p-4 shadow h-100">
              <h5 className="fw-bold">Compassion</h5>
              <p>We care for every patient like family.</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card bg-dark text-white p-4 shadow h-100">
              <h5 className="fw-bold">Integrity</h5>
              <p>We maintain transparency and honesty in all our actions.</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card bg-dark text-white p-4 shadow h-100">
              <h5 className="fw-bold">Excellence</h5>
              <p>We strive for the highest standards in medical care.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="bg-warning text-dark py-5 text-center">
        <h2 className="fw-bold mb-4">Our Milestones</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-3">
            <div className="card bg-primary text-white p-4 shadow h-100">
              <h3 className="fw-bold">10k+</h3>
              <p>Patients Treated</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card bg-success text-white p-4 shadow h-100">
              <h3 className="fw-bold">50+</h3>
              <p>Expert Doctors</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card bg-dark text-white p-4 shadow h-100">
              <h3 className="fw-bold">25+</h3>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="bg-primary text-white text-center py-5">
        <h2 className="fw-bold mb-3">Join Us in Our Journey</h2>
        <p className="fs-5 mb-4">Experience healthcare excellence with our dedicated team of professionals.</p>
        <a href="/appointments" className="btn btn-light btn-lg fw-bold">Book an Appointment</a>
      </div>

    </div>
  );
};

export default AboutUs;
