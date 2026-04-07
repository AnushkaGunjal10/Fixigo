import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  Phone,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { addReview, getBookings, getReviews } from "../services/api";

type Booking = {
  booking_id: string;
  mechanic_id: string;
  mechanic_name: string;
  service: string;
  status: string;
};

type Review = {
  review_id?: string;
  id?: string;
  rating: string;
  comment: string;
};

const getStatusClassName = (status: string) => {
  if (status === "Pending") return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
  if (status === "Accepted") return "bg-green-100 text-green-700 hover:bg-green-100";
  if (status === "Rejected") return "bg-red-100 text-red-700 hover:bg-red-100";
  return "bg-slate-100 text-slate-700 hover:bg-slate-100";
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

export function BookingTracking() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  const fetchReviews = async (mechanicId: string) => {
    const data = await getReviews(mechanicId);
    setReviews(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    const fetchBooking = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        window.location.href = "/";
        return;
      }

      const user = JSON.parse(storedUser);
      const data = await getBookings(user.user_id);
      const selectedBooking = Array.isArray(data)
        ? data.find((item) => String(item.booking_id) === String(bookingId))
        : null;

      setBooking(selectedBooking ?? null);

      if (selectedBooking?.mechanic_id) {
        fetchReviews(selectedBooking.mechanic_id);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const avgRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + Number(review.rating), 0) / reviews.length).toFixed(1)
    : "No ratings";

  const handleReview = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser || !booking) {
      window.location.href = "/";
      return;
    }

    const user = JSON.parse(storedUser);
    const res = await addReview({
      user_id: user.user_id,
      mechanic_id: booking.mechanic_id,
      rating,
      comment,
    });

    if (res.status === "success") {
      alert("Review submitted");
      setRating("5");
      setComment("");
      fetchReviews(booking.mechanic_id);
    } else {
      alert("Error submitting review");
    }
  };

  if (!booking) {
    return <div className="max-w-4xl mx-auto">Loading booking...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-8">
      <div className="animate-in fade-in slide-in-from-top duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Track Booking</h1>
            <p className="text-muted-foreground">Booking ID: {bookingId}</p>
          </div>
          <Badge className={`${getStatusClassName(booking.status)} text-base px-4 py-2`}>
            {renderStatus(booking.status)}
          </Badge>
        </div>
      </div>

      {/* Mechanic Info */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "200ms" }}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Mechanic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6 items-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578935570956-4326d9c62ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZWNoYW5pYyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTQ5NjkzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt={booking.mechanic_name}
                className="size-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-1">{booking.mechanic_name}</h3>
                <p className="text-muted-foreground">{booking.service}</p>
                <p className="text-sm text-muted-foreground">Average rating: {avgRating}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <Phone className="size-5" />
                </Button>
                <Button size="icon" variant="outline">
                  <MessageCircle className="size-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Details */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "300ms" }}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mechanic:</span>
              <span className="font-bold">{booking.mechanic_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-bold">{booking.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge className={getStatusClassName(booking.status)}>
                {renderStatus(booking.status)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "400ms" }}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Review Mechanic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-[160px_1fr] gap-3">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border-input bg-input-background rounded-md border px-3 py-2"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
              />
            </div>
            <Button onClick={handleReview} disabled={!comment.trim()}>
              Submit Review
            </Button>

            <div className="space-y-2">
              <p className="font-bold">Average Rating: {avgRating}</p>
              {reviews.map((review) => (
                <div key={review.review_id ?? review.id} className="rounded-lg border p-3">
                  <p className="font-bold">Rating: {review.rating}/5</p>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "500ms" }}>
        <Button variant="outline" className="flex-1">
          Cancel Booking
        </Button>
        <Link to="/app/assistant" className="flex-1">
          <Button variant="outline" className="w-full">
            Need Help?
          </Button>
        </Link>
      </div>
    </div>
  );
}
