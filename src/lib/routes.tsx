import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/templates/app-layout/app-layout.component";
import HomePage from "@/components/pages/home/home.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
