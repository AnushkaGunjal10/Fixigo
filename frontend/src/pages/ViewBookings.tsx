import { useEffect, useState } from "react";
import { getBookings } from "../services/api";

type Booking = {
  booking_id: string;
  mechanic_name: string;
  service: string;
  status: string;
};

const renderStatus = (status: string) => {
  if (status === "Pending") {
    return <span className="animate-pulse text-yellow-600">Waiting for mechanic...</span>;
  }

  if (status === "Accepted") {
    return <span className="text-green-600">Accepted</span>;
  }

  if (status === "Rejected") {
    return <span className="text-red-600">Rejected</span>;
  }

  return <span>{status}</span>;
};

export default function ViewBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        window.location.href = "/";
        return;
      }

      const user = JSON.parse(storedUser);
      const data = await getBookings(user.user_id);
      setBookings(Array.isArray(data) ? data : []);
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-8">
      <div>
        <h2>My Bookings</h2>
        <p className="text-muted-foreground">Track your mechanic bookings</p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-left">
          <thead className="bg-muted">
            <tr>
              <th className="p-3">Mechanic</th>
              <th className="p-3">Service</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_id} className="border-t">
                <td className="p-3">{booking.mechanic_name}</td>
                <td className="p-3">{booking.service}</td>
                <td className="p-3">{renderStatus(booking.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
