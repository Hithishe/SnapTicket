import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PassengerPage from "./components/PassengerPage";
import AdminPage from "./components/AdminPage";
import UserDetails from "./components/UserDetails"; // Add this

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/passenger" element={<PassengerPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/passenger/:aadhar" element={<UserDetails />} /> {/* ← Add this */}
      </Routes>
    </Router>
  );
};

export default App;
