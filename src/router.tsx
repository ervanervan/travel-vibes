import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboardpage from "./pages/Dashboardpage";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import Profilepage from "./pages/Profilepage";
import Articlepage from "./pages/Articlepage";
import App from "./App";
import Categorypage from "./pages/Categorypage";
import Commentpage from "./pages/Commentpage";
import DashboardHome from "./pages/Dashboardhome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <Homepage /> }],
  },
  { path: "/login", element: <Loginpage /> },
  { path: "/register", element: <Registerpage /> },
  { path: "/profile", element: <Profilepage /> },
  {
    path: "/dashboard",
    element: <Dashboardpage />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "articles", element: <Articlepage /> },
      { path: "categories", element: <Categorypage /> },
      { path: "comments", element: <Commentpage /> },
    ],
  },
]);
