import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./util_components/AuthContext";
import PrivateRoutes from "./Routing/PrivateRoutes";
import { privateRoutes, publicRoutes } from "./Routing/Routes";
import PublicRoutes from "./Routing/PublicRoutes";
import InputReviews from "./wrapper/input_reviews/InputReviews";

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

          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
