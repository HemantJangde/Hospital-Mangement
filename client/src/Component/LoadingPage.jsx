import "./LoadingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoadingPage({ text = "Setting things up..." }) {
  return (
    <div className="loading-container d-flex align-items-center justify-content-center text-center">
      <div>
        <div className="spinner mx-auto mb-3"></div>

        <p className="loading-text fs-6 fs-sm-5 fs-md-4">
          {text}
        </p>
      </div>
    </div>
  );
}
