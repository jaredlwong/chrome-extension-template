import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";

import { createHashRouter, RouterProvider } from "react-router-dom";

import "./tailwind.css";

const router = createHashRouter([
  {
    path: "/popup",
    element: <App title="popup" />,
  },
  {
    path: "/page",
    element: <App title="page" />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
