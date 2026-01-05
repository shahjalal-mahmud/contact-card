import { useState, useEffect } from "react";
import { loginUser } from "../auth/authUtils";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaLock,
  FaEnvelope,
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { MoonLoader } from "react-spinners";
// import ThemeSelector from "../components/ThemeSelector";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/CustomToast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    if (error) {
      addToast(error, "error");
      setError("");
    }
  }, [error, addToast]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginUser(email, password);
      addToast("Login successful! Welcome back!", "success");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    addToast(`Coming soon: ${provider} login`, "info");
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
      {/* <div className="absolute top-4 right-4">
        <ThemeSelector />
      </div> */}

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
                Campus Connect
              </h2>
              <p className="text-sm opacity-70 mt-1">Your gateway to academic excellence</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">University Email</span>
                </label>
                <div className="flex items-center border border-base-300 rounded-lg bg-base-100 focus-within:ring-2 ring-primary overflow-hidden">
                  <span className="px-3 text-base-content/70">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    placeholder="student@university.edu"
                    className="input border-0 focus:outline-none focus:ring-0 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input border-0 focus:outline-none focus:ring-0 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="px-3 text-base-content/50 hover:text-base-content transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center text-sm">
                <label className="cursor-pointer label p-0">
                  <input type="checkbox" className="checkbox checkbox-sm checkbox-primary mr-2" />
                  <span className="label-text">Remember me</span>
                </label>
                <a href="#" className="link link-hover link-primary text-sm">
                  Forgot password?
                </a>
              </div>

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
                    <span className="group-hover:scale-105 transition-transform">Login</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6 text-base-content/50">or continue with</div>

            {/* Social Login */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="btn btn-outline btn-circle text-primary hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Login with Google"
              >
                <FaGoogle className="text-xl" />
              </button>
              <button
                onClick={() => handleSocialLogin("GitHub")}
                className="btn btn-outline btn-circle text-primary hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Login with GitHub"
              >
                <FaGithub className="text-xl" />
              </button>
            </div>


            {/* Footer */}
            <div className="text-center mt-8 text-sm">
              <p className="text-base-content/70">
                New to Campus Connect?{" "}
                <a href="/signup" className="link link-primary font-medium">
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}