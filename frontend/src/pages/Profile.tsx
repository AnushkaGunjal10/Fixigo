import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Edit, Car, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { getBookings } from "../services/api";

type Booking = {
  booking_id: string;
  mechanic_name: string;
  service: string;
  status: string;
  created_at?: string;
};

const getStatusClassName = (status: string) => {
  if (status === "Pending") return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
  if (status === "Accepted") return "bg-green-100 text-green-700 hover:bg-green-100";
  if (status === "Rejected") return "bg-red-100 text-red-700 hover:bg-red-100";
  return "bg-slate-100 text-slate-700 hover:bg-slate-100";
};

export function Profile() {
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, NY",
    memberSince: "January 2026",
  };

  const vehicles = [
    { id: 1, type: "Car", brand: "Toyota", model: "Camry", number: "ABC 1234", year: "2020" },
    { id: 2, type: "Bike", brand: "Honda", model: "CBR", number: "XYZ 5678", year: "2021" },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        window.location.href = "/";
        return;
      }

      const currentUser = JSON.parse(storedUser);
      const data = await getBookings(currentUser.user_id);
      setBookingHistory(Array.isArray(data) ? data : []);
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 md:pb-8">
      <div className="animate-in fade-in slide-in-from-top duration-500">
        <h1 className="mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - User Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="animate-in fade-in slide-in-from-left duration-500">
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="size-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <User className="size-12 text-primary" />
                </div>
                <h2 className="mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Member since {user.memberSince}
                </p>
                <Button className="w-full">
                  <Edit className="size-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="animate-in fade-in slide-in-from-left duration-500" style={{ animationDelay: "100ms" }}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="size-5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p>{user.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Vehicles and History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicles */}
          <div className="animate-in fade-in slide-in-from-right duration-500">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Vehicles</CardTitle>
                  <Button variant="outline" size="sm">
                    Add New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="p-4 border rounded-lg hover:border-primary transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Car className="size-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold mb-1">
                            {vehicle.brand} {vehicle.model}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {vehicle.type} • {vehicle.year}
                          </p>
                          <p className="text-sm font-mono font-bold mt-1">
                            {vehicle.number}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking History */}
          <div className="animate-in fade-in slide-in-from-right duration-500" style={{ animationDelay: "100ms" }}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Booking History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div
                      key={booking.booking_id}
                      className="p-4 border rounded-lg hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold">{booking.service}</h4>
                            <Badge className={getStatusClassName(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {booking.mechanic_name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          {booking.created_at ?? "Date unavailable"}
                        </div>
                        <div>ID: {booking.booking_id}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="animate-in fade-in slide-in-from-right duration-500" style={{ animationDelay: "200ms" }}>
            <div className="grid grid-cols-3 gap-4">
              <Card className="shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {bookingHistory.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {vehicles.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Vehicles</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">$240</div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
