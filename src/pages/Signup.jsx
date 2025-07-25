import { useState, useEffect } from "react";
import { registerUser } from "../auth/authUtils";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaLock,
  FaEnvelope,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaIdCard
} from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import ThemeSelector from "../components/ThemeSelector";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/CustomToast";
import { SiGithub, SiGoogle } from "react-icons/si";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    if (error) {
      addToast(error, "error");
      setError("");
    }
  }, [error, addToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(formData.email, formData.password, {
        name: formData.name,
        studentId: formData.studentId
      });
      addToast("Account created successfully! Welcome to your digital portfolio!", "success");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    addToast(`Coming soon: ${provider} signup`, "info");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <MoonLoader color="hsl(var(--p))" size={60} />
        </div>
      )}

      {/* Theme Selector */}
      <div className="absolute top-4 right-4">
        <ThemeSelector />
      </div>

      <div className="w-full max-w-md">
        <div
          className="card bg-base-100 shadow-2xl border border-base-300/50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="card-body p-8">
            {/* Animated Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className={`transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}>
                  <FaUserGraduate className="text-6xl text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Join Campus Connect
              </h2>
              <p className="text-sm opacity-70 mt-1">Create your digital student portfolio</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <div className="flex items-center border border-base-300 rounded-lg bg-base-100 focus-within:ring-2 ring-primary overflow-hidden">
                  <span className="px-3 text-base-content/70">
                    <FaUser className="text-base-content/70"/>
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="input border-0 focus:outline-none focus:ring-0 w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Student ID Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Student ID</span>
                </label>
                <div className="flex items-center border border-base-300 rounded-lg bg-base-100 focus-within:ring-2 ring-primary overflow-hidden">
                  <span className="px-3 text-base-content/70">
                    <FaIdCard className="text-base-content/70"/>
                  </span>
                  <input
                    type="text"
                    name="studentId"
                    placeholder="STD-12345"
                    className="input border-0 focus:outline-none focus:ring-0 w-full"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">University Email</span>
                </label>
                <div className="flex items-center border border-base-300 rounded-lg bg-base-100 focus-within:ring-2 ring-primary overflow-hidden">
                  <span className="px-3 text-base-content/70">
                    <FaEnvelope className="text-base-content/70"/>
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="student@university.edu"
                    className="input border-0 focus:outline-none focus:ring-0 w-full"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex items-center border border-base-300 rounded-lg bg-base-100 focus-within:ring-2 ring-primary overflow-hidden">
                  <span className="px-3 text-base-content/70">
                    <FaLock className="text-base-content/70"/>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="input border-0 focus:outline-none focus:ring-0 w-full"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="px-3 text-base-content/50 hover:text-base-content transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <label className="label">
                  <span className="label-text-alt">Minimum 6 characters</span>
                </label>
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <div className="flex items-center border border-base-300 rounded-lg bg-base-100 focus-within:ring-2 ring-primary overflow-hidden">
                  <span className="px-3 text-base-content/70">
                    <FaLock className="text-base-content/70"/>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="input border-0 focus:outline-none focus:ring-0 w-full"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="px-3 text-base-content/50 hover:text-base-content transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <label className="label cursor-pointer justify-start gap-2 p-0">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  required
                />
                <span className="label-text">
                  I agree to the <Link to="/terms" className="link link-primary">Terms of Service</Link> and <Link to="/privacy" className="link link-primary">Privacy Policy</Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-2 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <span className="group-hover:scale-105 transition-transform">Create Account</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6 text-base-content/50">or sign up with</div>

            {/* Social Signup */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleSocialSignup("Google")}
                className="btn btn-outline btn-circle hover:bg-error/10 hover:text-error transition-colors"
                aria-label="Sign up with Google"
              >
                <SiGoogle className="text-xl text-current" />
              </button>
              <button
                onClick={() => handleSocialSignup("GitHub")}
                className="btn btn-outline btn-circle hover:bg-base-content/10 hover:text-base-content transition-colors"
                aria-label="Sign up with GitHub"
              >
                <SiGithub className="text-xl text-current" />
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-sm">
              <p className="text-base-content/70">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}