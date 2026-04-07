import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Wrench,
  MapPin,
  AlertTriangle,
  Car,
  Bell,
  Calendar,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { getBookings } from "../services/api";

type Booking = {
  booking_id: string;
  mechanic_name: string;
  service: string;
  status: string;
};

const getStatusClassName = (status: string) => {
  if (status === "Pending") return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
  if (status === "Accepted") return "bg-green-100 text-green-700 hover:bg-green-100";
  if (status === "Rejected") return "bg-red-100 text-red-700 hover:bg-red-100";
  return "bg-slate-100 text-slate-700 hover:bg-slate-100";
};

export function Dashboard() {
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);

  const user = {
    name: "John Doe",
    vehicles: 2,
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        window.location.href = "/";
        return;
      }

      const currentUser = JSON.parse(storedUser);
      const data = await getBookings(currentUser.user_id);
      setActiveBookings(Array.isArray(data) ? data : []);
    };

    fetchBookings();
  }, []);

  const alerts = [
    {
      id: 1,
      type: "insurance",
      message: "Insurance renewal due on April 15, 2026",
      icon: Bell,
      color: "text-secondary",
    },
    {
      id: 2,
      type: "service",
      message: "Next service due in 500 km",
      icon: Calendar,
      color: "text-blue-600",
    },
  ];

  const quickActions = [
    {
      title: "Book Mechanic",
      description: "Find and book a mechanic instantly",
      icon: Wrench,
      link: "/app/issues",
      color: "bg-primary text-white hover:bg-primary/90",
    },
    {
      title: "View Nearby Mechanics",
      description: "Browse mechanics in your area",
      icon: MapPin,
      link: "/app/mechanics",
      color: "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      title: "Emergency Help",
      description: "Get immediate assistance",
      icon: AlertTriangle,
      link: "/app/issues",
      color: "bg-secondary text-black hover:bg-secondary/90",
    },
    {
      title: "Add Vehicle",
      description: "Register a new vehicle",
      icon: Car,
      link: "/app/add-vehicle",
      color: "bg-slate-700 text-white hover:bg-slate-800",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 md:pb-8">
      {/* Welcome Section */}
      <div className="animate-in fade-in slide-in-from-top duration-500">
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Welcome back, {user.name}!</CardTitle>
            <CardDescription className="text-white/90">
              You have {user.vehicles} vehicles registered
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div key={action.title} className="animate-in fade-in slide-in-from-bottom duration-500">
                <Link to={action.link}>
                  <Card className={`${action.color} border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer h-full hover:scale-105 duration-300`}>
                    <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                      <Icon className="size-12" />
                      <div>
                        <h3 className="font-bold mb-1">{action.title}</h3>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Bookings */}
      {activeBookings.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="mb-6">Active Bookings</h2>
          <div className="grid gap-4">
            {activeBookings.map((booking) => (
              <Card key={booking.booking_id} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Wrench className="size-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">{booking.mechanic_name}</h3>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        Current status
                      </div>
                      <Badge className={getStatusClassName(booking.status)}>
                        {booking.status}
                      </Badge>
                      <Link to={`/app/tracking/${booking.booking_id}`}>
                        <Button>Track</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Alerts & Reminders */}
      <div className="animate-in fade-in slide-in-from-bottom duration-1000">
        <h2 className="mb-6">Alerts & Reminders</h2>
        <div className="grid gap-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <Card key={alert.id} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-center gap-4">
                  <Icon className={`size-8 ${alert.color}`} />
                  <p className="flex-1">{alert.message}</p>
                  <Button variant="outline">View</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
