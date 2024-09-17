import Dashboard from "../wrapper/dashboard/Dashboard";
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
  { path: "/dashboard/:id?", component: <Dashboard /> },
  { path: "/spaces/:id", component: <SpaceReviewListing /> },
  { path: "/show-testimonials/:id", component: <ShowTestimonials /> },
];
