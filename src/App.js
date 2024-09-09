import { useState } from "react";
import Login from "./Wrapper/Login/Login";
import Signup from "./Wrapper/Signup/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Wrapper/Dashboard/Dashboard";
import InputReviews from "./Wrapper/InputReviews/InputReviews";
import SpaceReviewListing from "./Wrapper/SpaceReviewListing/SpaceReviewListing";
import ShowTestimonials from "./Wrapper/ShowTestimonials/ShowTestimonials";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:id/:name" element={<InputReviews />} />
          <Route path="/spaces/:id" element={<SpaceReviewListing />} />
          <Route
            path="/show-testimonials/:userId/:id"
            element={<ShowTestimonials />}
          />

          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
