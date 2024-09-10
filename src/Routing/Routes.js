import Dashboard from "../wrapper/dashboard/Dashboard";
import InputReviews from "../wrapper/input_reviews/InputReviews";
import Login from "../wrapper/login/Login";
import ShowTestimonials from "../wrapper/show_testimonials/ShowTestimonials";
import Signup from "../wrapper/signup/Signup";
import SpaceReviewListing from "../wrapper/space_review_listing/SpaceReviewListing";

export const publicRoutes = [
  { path: "/signin", component: <Login /> },
  { path: "/signup", component: <Signup /> },
  { path: "/", component: <Login /> },
];

export const privateRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/:id/:name", component: <InputReviews /> },
  { path: "/spaces/:id", component: <SpaceReviewListing /> },
  { path: "/show-testimonials/:userId/:id", component: <ShowTestimonials /> },
];
