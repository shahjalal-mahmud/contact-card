// src/pages/LandingPage.jsx
import React from "react";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-r from-primary to-secondary text-white">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="/portfolio-demo.png"
            alt="Portfolio Preview"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Your Personal Digital Portfolio</h1>
            <p className="py-6">
              Create and manage your own beautiful, dynamic portfolio for free. Showcase your
              skills, achievements, and personality in just a few clicks.
            </p>
            <div className="flex gap-4">
              <button className="btn btn-primary">Sign Up</button>
              <button className="btn btn-outline text-white border-white">
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About / Info Section */}
      <section className="py-16 px-6 lg:px-20 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8">What is This?</h2>
        <p className="max-w-3xl mx-auto text-center text-lg">
          This platform allows students, professionals, and organizations to have their
          own customizable, dynamic portfolio without coding. Share it via a short link or NFC card.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Student Personal Portfolio",
            "Professional Portfolio",
            "Full Dynamic Website with Template",
            "Full Dynamic Portfolio with Customization",
            "Organization Portfolio",
            "Faculty/Teacher Portfolio for Universities",
          ].map((service, idx) => (
            <div key={idx} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">{service}</h3>
                <p>
                  {service} designed to look modern, responsive, and unique to your needs.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 lg:px-20 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Customizable Profile Info",
            "Profile Picture & CV Upload",
            "Save Contact Button",
            "Short & Shareable Link",
            "NFC Card & QR Code",
            "Bug Reporting & Feedback",
          ].map((feature, idx) => (
            <div key={idx} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">{feature}</h3>
                <p>
                  {feature} to make your portfolio truly personal and functional.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">Feedback</h2>
        <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl p-6">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write your feedback here..."
          />
          <button className="btn btn-primary mt-4">Submit Feedback</button>
        </div>
      </section>

      {/* Request New Feature Section */}
      <section className="py-16 px-6 lg:px-20 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-12">Request a New Feature</h2>
        <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl p-6">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Feature title"
          />
          <textarea
            className="textarea textarea-bordered w-full mt-4"
            placeholder="Describe your feature idea..."
          />
          <button className="btn btn-secondary mt-4">Submit Request</button>
        </div>
      </section>

      {/* Report a Bug Section */}
      <section className="py-16 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">Report a Bug</h2>
        <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl p-6">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Bug title"
          />
          <textarea
            className="textarea textarea-bordered w-full mt-4"
            placeholder="Describe the bug..."
          />
          <button className="btn btn-error mt-4 text-white">Report Bug</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <aside>
          <p>
            © {new Date().getFullYear()} MyBrand — Digital Portfolio Service
          </p>
        </aside>
        <nav>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Service</a>
        </nav>
      </footer>
    </div>
  );
}
