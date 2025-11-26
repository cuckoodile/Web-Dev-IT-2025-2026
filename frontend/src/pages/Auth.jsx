import React, { useEffect, useState } from "react";
import login from "../functions/api/auth/login";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState("login");
  const [showPassword, setShowPassowrd] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(-1);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!formData.username || !formData.password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }
    try {
      const res = await login(formData);
      setLoading(false);
      if (res && res.access) {
        alert("Login successful!");
        navigate(-1);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setLoading(false);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-blue-300 h-screen w-screen flex justify-center items-center">
      <div className="w-[40vw] bg-black/40 p-6">
        {(isLogin && (
          // Login
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-3"
          >
            <h1 className="mb-3">Welcome Back!</h1>
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex flex-col gap-3">
              {/* Username */}
              <div className="flex gap-3 justify-between">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="border-b-1"
                />
              </div>

              {/* Password */}
              <div className="flex gap-3 justify-between">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="border-b-1"
                />
              </div>

              {/* Show Password */}
              <div className="flex justify-end items-center gap-1">
                <label htmlFor="showPassword" className="cursor-pointer">
                  Show Password
                </label>
                <input
                  type="checkbox"
                  name="showPassword"
                  id="showPassword"
                  className="cursor-pointer"
                  checked={showPassword}
                  onChange={() => setShowPassowrd((prev) => !prev)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              {/* Cancel */}
              <button
                type="submit"
                className="justify-self-center cursor-pointer border px-3 py-2 rounded-lg mt-3"
                onClick={() => navigate("/")}
              >
                Go Back
              </button>

              {/* Submit */}
              <button
                type="submit"
                className="justify-self-center cursor-pointer border px-3 py-2 rounded-lg mt-3"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        )) || (
          // Register
          <div>
            <p>Register</p>
          </div>
        )}
      </div>
    </div>
  );
}
