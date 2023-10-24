import ReactDOM from 'react-dom/client'
import './index.css'
import ActivityForm from './pages/ActivityForm/ActivityForm.jsx';
import ActivityType from './pages/ActivityType/ActivityType.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/Signup/SignUp.jsx';
import UserPage from './pages/UserPage/User.jsx'
import History from './pages/History/History';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Profile from './pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/userhome",
    element: <UserPage />,
  },
  {
    path: "/activitytype",
    element: <ActivityType />,
  },
  {
    path: "/activityform",
    element: <ActivityForm />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(<CookiesProvider>
  <RouterProvider router={router}></RouterProvider></CookiesProvider>
);