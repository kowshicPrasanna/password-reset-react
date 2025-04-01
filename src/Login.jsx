import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 4) {
        errors.password = "Password must be at least 4 characters long";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const loginRep = await axios.post(
          "https://password-reset-node-tyml.onrender.com/users/login",
          values
        );
        if (loginRep.status === 200) {
          console.log("Login Success");
          const token = loginRep.data.token;
          const email = loginRep.data.email;
          window.localStorage.setItem("user_token", token);
          window.localStorage.setItem("user_email", email);
          alert("Login Successful!");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('/loginBG.jpg')" }}
    >
      {/* Login Form Container */}
      <div className="bg-black bg-opacity-80 p-10 rounded-lg shadow-lg w-96 mx-auto">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Welcome
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 rounded-lg bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-950"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <span className="text-sm text-red-500">{formik.errors.email}</span>
          </div>
          <div className="mb-4 relative">
            <label className="block text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full p-3 rounded-lg bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-950 pr-12"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {/* Eye Icon Button */}
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <span className="text-sm text-red-500">
              {formik.errors.password}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-300 text-black font-semibold py-3 rounded-lg transition duration-300 cursor-pointer mt-3"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center pt-[1rem]">
          <button
            className="cursor-pointer font-bold text-red-800"
            onClick={async () => {
              if (!formik.values.email) {
                alert(
                  "Please enter your email before requesting a password reset."
                );
                return;
              }
              try {
                const response = await axios.post(
                  "https://password-reset-node-tyml.onrender.com/users/reset-password",
                  { email: formik.values.email }
                );
                if (response.status === 200) {
                  alert("Password reset link has been sent to your email.");
                }
              } catch (error) {
                console.error("Error sending reset password request:", error);
                alert("Failed to send reset link. Please try again.");
              }
            }}
          >
            Forget Password?
          </button>
        </div>
        <div className="flex items-center justify-center pt-[1rem]">
          <p className="font-semibold pr-[0.5rem] text-white">New User ? </p>{" "}
          <button
            onClick={() => navigate("/register")}
            className="cursor-pointer font-bold text-red-800"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
