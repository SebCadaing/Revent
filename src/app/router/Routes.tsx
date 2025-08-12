import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import Homepage from "../../feature/home/Homepage";
import EventDashboard from "../../feature/events/dashboard/EventDashboard";
import EventDetails from "../../feature/events/details/EventDetails";
import EventForm from "../../feature/events/form/EventForm";
import LoginForm from "../../feature/account/LoginForm";
import RegisterForm from "../../feature/account/RegisterForm";
import ProfilePage from "../../feature/profiles/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "events", element: <EventDashboard /> },
      { path: "events/:id", element: <EventDetails /> }, //events/eventId
      { path: "manage/:id", element: <EventForm /> },
      { path: "createEvent", element: <EventForm /> },
      { path: "login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "profiles/:id", element: <ProfilePage /> },
    ],
  },
]);
