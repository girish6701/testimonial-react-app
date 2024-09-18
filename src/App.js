import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./util_components/AuthContext";
import PrivateRoutes from "./Routing/PrivateRoutes";
import { privateRoutes, publicRoutes } from "./Routing/Routes";
import PublicRoutes from "./Routing/PublicRoutes";
import InputReviews from "./wrapper/input_reviews/InputReviews";
import ShowTestimonials from "./wrapper/show_testimonials/ShowTestimonials";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {publicRoutes?.map((elem) => (
            <Route
              path={elem["path"]}
              element={<PublicRoutes>{elem["component"]}</PublicRoutes>}
            />
          ))}

          {privateRoutes?.map((elem) => (
            <Route
              path={elem["path"]}
              element={<PrivateRoutes>{elem["component"]}</PrivateRoutes>}
            />
          ))}

          <Route path="/:id/:name" element={<InputReviews />} />
          <Route path="/show-testimonials/:id?" element={<ShowTestimonials />} />

          <Route
            path="*"
            element={<p className="text-center h4">404 Not Found</p>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
