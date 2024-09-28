import React from "react";
import { Navigate } from "react-router-dom";

const Home = React.lazy(() => import("../views/home/home"));
const Entire = React.lazy(() => import("../views/entire/entire"));
const Detail = React.lazy(() => import("../views/detail/detail"));
const NotFound = React.lazy(() => import("../views/other/notfound"));

const routes = [
  {
    path: "/",
    element: <Navigate to={"/home"}></Navigate>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/entire",
    element: <Entire></Entire>,
  },
  {
    path: "/detail",
    element: <Detail></Detail>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
];

export default routes;
