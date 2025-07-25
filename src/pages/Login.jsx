import { useState, useEffect } from "react";
import { loginUser } from "../auth/authUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUserGraduate, FaLock, FaEnvelope, FaGoogle, FaGithub } from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // ✅ Use theme context

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginUser(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast(`Coming soon: ${provider} login`, { icon: "🚀" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <MoonLoader color="#3B82F6" size={60} />
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Theme selector */}
            <div className="absolute top-4 right-4">
              <select
                className="select select-sm select-bordered"
                value={theme}
                onChange={(e) => toggleTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="cupcake">Cupcake</option>
                <option value="bumblebee">Bumblebee</option>
                <option value="emerald">Emerald</option>
                <option value="corporate">Corporate</option>
                <option value="synthwave">Synthwave</option>
                <option value="retro">Retro</option>
                <option value="cyberpunk">Cyberpunk</option>
                <option value="valentine">Valentine</option>
                <option value="halloween">Halloween</option>
                <option value="garden">Garden</option>
                <option value="forest">Forest</option>
                <option value="aqua">Aqua</option>
                <option value="lofi">Lofi</option>
                <option value="pastel">Pastel</option>
                <option value="fantasy">Fantasy</option>
                <option value="wireframe">Wireframe</option>
                <option value="black">Black</option>
                <option value="luxury">Luxury</option>
                <option value="dracula">Dracula</option>
                <option value="cmyk">CMYK</option>
                <option value="autumn">Autumn</option>
                <option value="business">Business</option>
                <option value="acid">Acid</option>
                <option value="lemonade">Lemonade</option>
                <option value="night">Night</option>
                <option value="coffee">Coffee</option>
                <option value="winter">Winter</option>
                <option value="dim">Dim</option>
                <option value="nord">Nord</option>
                <option value="sunset">Sunset</option>
                <option value="caramellatte">Caramellatte</option>
                <option value="abyss">abyss</option>
                <option value="silk">Silk</option>
              </select>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-2">
                <FaUserGraduate className="text-5xl text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Student Portfolio</h2>
              <p className="text-sm opacity-70">Showcase your achievements in style</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <label className="input-group">
                  <span className="bg-base-200">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    placeholder="student@school.edu"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <label className="input-group">
                  <span className="bg-base-200">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="cursor-pointer label">
                  <input type="checkbox" className="checkbox checkbox-sm mr-2" />
                  <span className="label-text">Remember me</span>
                </label>
                <a href="#" className="link link-hover link-primary">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6">OR</div>

            {/* Social Login */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="btn btn-outline btn-circle"
                aria-label="Login with Google"
              >
                <FaGoogle className="text-xl" />
              </button>
              <button
                onClick={() => handleSocialLogin("GitHub")}
                className="btn btn-outline btn-circle"
                aria-label="Login with GitHub"
              >
                <FaGithub className="text-xl" />
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 text-sm">
              <p>
                Don't have an account?{" "}
                <a href="/signup" className="link link-primary">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 text-center text-xs opacity-50">
          <p>Demo: student@demo.com / demo123</p>
        </div>
      </div>
    </div>
  );
}