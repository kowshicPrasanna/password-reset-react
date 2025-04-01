import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "https://password-reset-node-tyml.onrender.com/users/update-password",
        { token , password }
      );

      if (response.status === 200) {
        alert("Password reset successful! Please log in.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="block mt-3 mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white p-2 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
