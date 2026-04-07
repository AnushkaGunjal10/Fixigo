import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { AddVehicle } from "./pages/AddVehicle";
import { IssueSelection } from "./pages/IssueSelection";
import { NearbyMechanics } from "./pages/NearbyMechanics";
import { BookingPage } from "./pages/BookingPage";
import { BookingTracking } from "./pages/BookingTracking";
import { MechAgent } from "./pages/MechAgent";
import { Profile } from "./pages/Profile";
import { AdminDashboard } from "./pages/AdminDashboard";
import ViewBookings from "./pages/ViewBookings";
import AdminAddMechanic from "./pages/AdminAddMechanic";
import MechanicDashboard from "./pages/MechanicDashboard";
import MechanicLogin from "./pages/MechanicLogin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/app",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "add-vehicle", Component: AddVehicle },
      { path: "issues", Component: IssueSelection },
      { path: "mechanics", Component: NearbyMechanics },
      { path: "book/:mechanicId", Component: BookingPage },
      { path: "tracking/:bookingId", Component: BookingTracking },
      { path: "bookings", Component: ViewBookings },
      { path: "assistant", Component: MechAgent },
      { path: "profile", Component: Profile },
      { path: "admin", Component: AdminDashboard },
      { path: "admin/add-mechanic", Component: AdminAddMechanic },
    ],
  },
  {
    path: "/mechanic",
    Component: MechanicDashboard,
  },
  {
    path: "/mechanic-login",
    Component: MechanicLogin,
  },
]);
