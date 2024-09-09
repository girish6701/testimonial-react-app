import React from "react";
import Signup from "./wrapper/signup/Signup";
import Login from "./wrapper/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./wrapper/dashboard/Dashboard";
import InputReviews from "./wrapper/input_reviews/InputReviews";
import SpaceReviewListing from "./wrapper/space_review_listing/SpaceReviewListing";
import ShowTestimonials from "./wrapper/show_testimonials/ShowTestimonials";

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
