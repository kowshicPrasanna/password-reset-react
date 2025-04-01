import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
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
        const response = await axios.post(
          "https://password-reset-node-tyml.onrender.com/users/register",
          values
        );
        if (response.status === 200) {
          setSuccessMessage("Registered Successfully.Login to proceed...");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-end"
      style={{ backgroundImage: "url('/loginBG.jpg')" }}
    >
      {/* Register Form Container */}
      <div className="bg-black bg-opacity-80 p-10 rounded-lg shadow-lg w-88 mx-auto">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Registration Now
        </h2>
        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-3 rounded-lg bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-950"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>

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

          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-3 rounded-lg bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-950"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <span className="text-sm text-red-500">
              {formik.errors.password}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-300 text-black font-semibold py-3 rounded-lg transition duration-300 cursor-pointer mt-3"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
