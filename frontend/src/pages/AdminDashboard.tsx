import {
  Users,
  Wrench,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2,547",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Active Mechanics",
      value: "156",
      change: "+5%",
      icon: Wrench,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Bookings",
      value: "8,234",
      change: "+18%",
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Revenue",
      value: "$52,340",
      change: "+23%",
      icon: DollarSign,
      color: "text-secondary",
      bg: "bg-orange-100",
    },
  ];

  const recentBookings = [
    {
      id: "BK234",
      user: "Alice Johnson",
      mechanic: "Mike Johnson",
      issue: "Engine Check",
      status: "in-progress",
      time: "10 mins ago",
    },
    {
      id: "BK235",
      user: "Bob Smith",
      mechanic: "Sarah Williams",
      issue: "Battery Issue",
      status: "completed",
      time: "25 mins ago",
    },
    {
      id: "BK236",
      user: "Carol White",
      mechanic: "David Chen",
      issue: "Flat Tire",
      status: "pending",
      time: "1 hour ago",
    },
  ];

  const topMechanics = [
    { name: "Mike Johnson", bookings: 234, rating: 4.8, revenue: "$18,500" },
    { name: "Sarah Williams", bookings: 312, rating: 4.9, revenue: "$24,200" },
    { name: "David Chen", bookings: 189, rating: 4.7, revenue: "$15,800" },
    { name: "James Martinez", bookings: 156, rating: 4.6, revenue: "$12,400" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 md:pb-8">
      <div className="animate-in fade-in slide-in-from-top duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users, mechanics, and bookings
            </p>
          </div>
          <Button>
            <TrendingUp className="size-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="animate-in fade-in zoom-in duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${stat.bg} size-12 rounded-lg flex items-center justify-center`}>
                      <Icon className={`size-6 ${stat.color}`} />
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {stat.change}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="animate-in fade-in slide-in-from-left duration-500" style={{ animationDelay: "400ms" }}>
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Bookings</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold mb-1">{booking.user}</h4>
                        <p className="text-sm text-muted-foreground">
                          {booking.issue}
                        </p>
                      </div>
                      <Badge
                        className={
                          booking.status === "completed"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : booking.status === "in-progress"
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        }
                      >
                        {booking.status === "completed" && (
                          <CheckCircle2 className="size-3 mr-1" />
                        )}
                        {booking.status === "in-progress" && (
                          <Clock className="size-3 mr-1" />
                        )}
                        {booking.status === "pending" && (
                          <AlertCircle className="size-3 mr-1" />
                        )}
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Mechanic: {booking.mechanic}</span>
                      <span>{booking.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Mechanics */}
        <div className="animate-in fade-in slide-in-from-right duration-500" style={{ animationDelay: "500ms" }}>
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Mechanics</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMechanics.map((mechanic, index) => (
                  <div
                    key={mechanic.name}
                    className="p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">{mechanic.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{mechanic.bookings} bookings</span>
                          <span>⭐ {mechanic.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{mechanic.revenue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "600ms" }}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <Users className="size-6" />
                  <span>Manage Users</span>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <Wrench className="size-6" />
                  <span>Manage Mechanics</span>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="size-6" />
                  <span>View Bookings</span>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <TrendingUp className="size-6" />
                  <span>Analytics</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
