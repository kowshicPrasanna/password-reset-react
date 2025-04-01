import { Routes, Route } from "react-router";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
