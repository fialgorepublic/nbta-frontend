import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import SignIn from "./sign-in/SignIn";
import ErrorPage from "./error-page";
import Home from "./dashboard/pages/Home";
import AllInvestor from "./dashboard/pages/investors/list";
import NewInvestor from "./dashboard/pages/investors/create";
import EditInvestor from "./dashboard/pages/investors/update";
import AllInvestments from "./dashboard/pages/investments/all";
import NewInvestment from "./dashboard/pages/investments/create";
import Earning from "./dashboard/pages/earnings/create";
import VerifyKyc from "./dashboard/pages/investors/verify-kyc";
import { Toaster } from "react-hot-toast";
import LandingPage from "./landingPage";
import { UserProvider } from "./contextStore/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/investors",
        element: <AllInvestor />,
      },
      {
        path: "/investors/new",
        element: <NewInvestor />,
      },
      {
        path: "/investors/:id/edit",
        element: <EditInvestor />,
      },
      {
        path: "/investors/:id/verify-kyc",
        element: <VerifyKyc />,
      },
      {
        path: "/investments",
        element: <AllInvestments />,
      },
      {
        path: "investments/new",
        element: <NewInvestment />,
      },
      {
        path: "/earnings",
        element: <Earning />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Toaster
      position="top-center"
      reverseOrder={false}
      containerClassName="overflow-auto"
    />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </>
);

reportWebVitals();
