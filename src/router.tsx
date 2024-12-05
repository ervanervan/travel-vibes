import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboardpage from "./pages/Dashboardpage";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import Profilepage from "./pages/Profilepage";
import Articlepage from "./pages/Articlepage";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/dashboard", element: <Dashboardpage /> },
      { path: "/register", element: <Registerpage /> },
      { path: "/login", element: <Loginpage /> },
      { path: "/profile", element: <Profilepage /> },
      { path: "/article", element: <Articlepage /> },
    ],
  },
]);
