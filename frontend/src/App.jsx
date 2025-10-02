import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Problems from "./pages/Problems";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProblem from "./pages/CreateProblem";
import ProblemDetails from "./pages/ProblemDetails";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Problems />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateProblem />} />
          <Route path="/problems/:id" element={<ProblemDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
