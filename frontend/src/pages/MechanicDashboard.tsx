import { useEffect, useState } from "react";
import { getMechanicBookings, updateStatus } from "../services/api";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

type MechanicBooking = {
  booking_id: string;
  user_name: string;
  service: string;
  status: string;
  booking_date?: string;
  booking_time?: string;
};

const getStatusClassName = (status: string) => {
  if (status === "Pending") return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
  if (status === "Accepted") return "bg-green-100 text-green-700 hover:bg-green-100";
  if (status === "Rejected") return "bg-red-100 text-red-700 hover:bg-red-100";
  return "bg-slate-100 text-slate-700 hover:bg-slate-100";
};

export default function MechanicDashboard() {
  const [bookings, setBookings] = useState<MechanicBooking[]>([]);

  const fetchBookings = async () => {
    const storedMechanic = localStorage.getItem("mechanic");

    if (!storedMechanic) {
      window.location.href = "/";
      return;
    }

    const mechanic = JSON.parse(storedMechanic);
    const data = await getMechanicBookings(mechanic.mechanic_id);
    setBookings(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAction = async (id: string, status: string) => {
    await updateStatus(id, status);
    fetchBookings();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <div>
        <h2>Mechanic Dashboard</h2>
        <p className="text-muted-foreground">Accept or reject assigned bookings</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Schedule</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.booking_id} className="border-t">
                    <td className="p-3">{booking.user_name}</td>
                    <td className="p-3">{booking.service}</td>
                    <td className="p-3">
                      {booking.booking_date ?? "Date not set"} {booking.booking_time ?? ""}
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusClassName(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAction(booking.booking_id, "Accepted")}
                          disabled={booking.status === "Accepted"}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleAction(booking.booking_id, "Rejected")}
                          disabled={booking.status === "Rejected"}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
