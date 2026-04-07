import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Calendar, Clock, MapPin, Star, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { bookMechanic, getBookings, getMechanics } from "../services/api";
import MapView from "../components/MapView";

type Mechanic = {
  mechanic_id: string;
  name: string;
  phone?: string;
  location?: string;
  specialization?: string;
  availability?: string;
  available?: string;
  latitude?: string | number;
  longitude?: string | number;
};

type UserLocation = {
  lat: number;
  lng: number;
};

const estimateCost = (service: string) => {
  const normalizedService = service.toLowerCase();

  if (normalizedService.includes("engine")) return "₹1500 - ₹3000";
  if (normalizedService.includes("tyre")) return "₹300 - ₹800";
  if (normalizedService.includes("brake")) return "₹500 - ₹1200";
  return "₹200 - ₹1000";
};

const getSuggestion = (service: string) => {
  const normalizedService = service.toLowerCase();

  if (normalizedService.includes("engine")) {
    return "⚠️ Check battery before booking. It might save cost.";
  }

  if (normalizedService.includes("tyre")) {
    return "💡 Try inflating the tyre first or use a puncture kit if available.";
  }

  if (normalizedService.includes("brake")) {
    return "🚨 Brake issue is critical. Book immediately.";
  }

  return "🔧 General service recommended.";
};

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const earthRadiusKm = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

const isMechanicAvailable = (mechanic?: Mechanic) => {
  if (!mechanic) return false;

  const status = mechanic.availability ?? mechanic.available ?? "Available";
  return status.toLowerCase() === "available" || status !== "0";
};

export function BookingPage() {
  const navigate = useNavigate();
  const { mechanicId: routeMechanicId } = useParams();
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [mechanicId, setMechanicId] = useState(routeMechanicId ?? "");
  const [service, setService] = useState("General Service");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [historySuggestion, setHistorySuggestion] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/";
      return;
    }

    const fetchData = async () => {
      const data = await getMechanics();
      setMechanics(Array.isArray(data) ? data : []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      const data = await getBookings(user.user_id);

      if (Array.isArray(data) && data.length > 0) {
        const lastService = data[data.length - 1].service;
        setHistorySuggestion(`Based on your last booking, you may also need: ${lastService}`);
      }
    };

    fetchBookings();
  }, []);

  const selectedMechanic = mechanics.find(
    (mechanicOption) => String(mechanicOption.mechanic_id) === mechanicId,
  );
  const nearestMechanic = useMemo(() => {
    if (!userLocation || mechanics.length === 0) return null;

    let nearest: Mechanic | null = null;
    let minDistance = Infinity;

    mechanics.forEach((mechanicOption) => {
      if (!mechanicOption.latitude || !mechanicOption.longitude) return;

      const distance = getDistance(
        userLocation.lat,
        userLocation.lng,
        Number(mechanicOption.latitude),
        Number(mechanicOption.longitude),
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearest = mechanicOption;
      }
    });

    return nearest ? { mechanic: nearest, distance: minDistance } : null;
  }, [mechanics, userLocation]);
  const searchedMechanics = useMemo(() => {
    const filteredMechanics = mechanics.filter((mechanicOption) => {
      if (showAvailableOnly && !isMechanicAvailable(mechanicOption)) {
        return false;
      }

      return true;
    });

    const sortedMechanics =
      userLocation
        ? [...filteredMechanics].sort((firstMechanic, secondMechanic) => {
            if (
              !firstMechanic.latitude ||
              !firstMechanic.longitude ||
              !secondMechanic.latitude ||
              !secondMechanic.longitude
            ) {
              return 0;
            }

            const firstDistance = getDistance(
              userLocation.lat,
              userLocation.lng,
              Number(firstMechanic.latitude),
              Number(firstMechanic.longitude),
            );
            const secondDistance = getDistance(
              userLocation.lat,
              userLocation.lng,
              Number(secondMechanic.latitude),
              Number(secondMechanic.longitude),
            );

            return firstDistance - secondDistance;
          })
        : filteredMechanics;

    const normalizedSearch = search.toLowerCase();

    return sortedMechanics.filter((mechanicOption) => {
      return (
        mechanicOption.name.toLowerCase().includes(normalizedSearch) ||
        (mechanicOption.location ?? "").toLowerCase().includes(normalizedSearch) ||
        (mechanicOption.specialization ?? "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [mechanics, search, showAvailableOnly, userLocation]);

  useEffect(() => {
    if (!mechanicId && nearestMechanic) {
      setMechanicId(String(nearestMechanic.mechanic.mechanic_id));
    }
  }, [mechanicId, nearestMechanic]);

  const today = new Date().toISOString().split("T")[0];

  const mechanic = {
    id: mechanicId,
    name: selectedMechanic?.name ?? "Select a mechanic",
    phone: selectedMechanic?.phone ?? "Not available",
    rating: selectedMechanic ? 4.8 : "-",
    reviews: selectedMechanic ? 0 : "-",
    distance: selectedMechanic?.location ?? "Not selected",
    specialization: selectedMechanic?.specialization ?? "Choose a mechanic from the list",
    available: isMechanicAvailable(selectedMechanic),
    price: estimateCost(service),
    image: "https://images.unsplash.com/photo-1578935570956-4326d9c62ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZWNoYW5pYyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTQ5NjkzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  };

  const handleBooking = async () => {
    if (selectedDate && selectedTime && mechanicId) {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        window.location.href = "/";
        return;
      }

      const user = JSON.parse(storedUser);

      const res = await bookMechanic({
        user_id: user.user_id,
        mechanic_id: mechanicId,
        service,
        date: selectedDate,
        time: selectedTime,
      });

      if (res.status === "success") {
        alert("Booking Successful");
        navigate(`/app/tracking/${res.booking_id}`);
      } else {
        alert("Error");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-8">
      <div className="animate-in fade-in slide-in-from-top duration-500">
        <h1 className="mb-2">Confirm Booking</h1>
        <p className="text-muted-foreground">Select your preferred date and time</p>
      </div>

      {/* Mechanic Details */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "100ms" }}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Mechanic Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6 items-center">
              <ImageWithFallback
                src={mechanic.image}
                alt={mechanic.name}
                className="size-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">{mechanic.name}</h3>
                <p className="text-muted-foreground mb-3">{mechanic.specialization}</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 text-secondary fill-secondary" />
                    <span className="font-bold">{mechanic.rating}</span>
                    <span className="text-muted-foreground">({mechanic.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{mechanic.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="size-4" />
                    <span>{mechanic.phone}</span>
                  </div>
                  <div className={mechanic.available ? "text-green-700" : "text-red-700"}>
                    Status: {mechanic.available ? "Available" : "Busy"}
                  </div>
                  <div className="font-bold text-primary">{mechanic.price}</div>
                </div>
              </div>
              <Button variant="outline" size="icon">
                <Phone className="size-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "250ms" }}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Mechanic Locations</CardTitle>
            <CardDescription>View available mechanics on the map</CardDescription>
          </CardHeader>
          <CardContent>
            <MapView
              mechanics={searchedMechanics}
              selectedMechanicId={mechanicId}
              onSelectMechanic={setMechanicId}
            />
            {nearestMechanic && (
              <div className="bg-yellow-100 text-yellow-900 p-3 rounded-lg mt-4 flex items-center justify-between gap-4">
                <p>
                  🚀 Nearest Mechanic: <b>{nearestMechanic.mechanic.name}</b>{" "}
                  ({nearestMechanic.distance.toFixed(2)} km away)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMechanicId(String(nearestMechanic.mechanic.mechanic_id))}
                >
                  Select
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Date Selection */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "200ms" }}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Select Mechanic & Service</CardTitle>
            <CardDescription>Choose who you want to book and what service you need</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-[1fr_auto] gap-3">
              <Input
                type="text"
                placeholder="Search by location, name, or service"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAvailableOnly((currentValue) => !currentValue)}
              >
                {showAvailableOnly ? "Show All" : "Show Available Only"}
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mechanic">Mechanic</Label>
              <select
                id="mechanic"
                value={mechanicId}
                onChange={(e) => setMechanicId(e.target.value)}
                className="border-input bg-input-background w-full rounded-md border px-3 py-2"
              >
                <option value="">Select mechanic</option>
                {searchedMechanics.map((mechanicOption) => (
                  <option key={mechanicOption.mechanic_id} value={mechanicOption.mechanic_id}>
                    {mechanicOption.name} - {mechanicOption.location}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="border-input bg-input-background w-full rounded-md border px-3 py-2"
              >
                <option value="Engine Repair">Engine Repair</option>
                <option value="Tyre Puncture">Tyre Puncture</option>
                <option value="Brake Service">Brake Service</option>
                <option value="General Service">General Service</option>
                <option value="Battery Issue">Battery Issue</option>
              </select>
            </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "275ms" }}>
        <Card className="shadow-lg bg-blue-50 border-blue-100">
          <CardContent className="p-4 space-y-2">
            <p>🤖 Suggestion: {getSuggestion(service)}</p>
            {historySuggestion && (
              <p className="text-sm text-muted-foreground">{historySuggestion}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Date & Time Selection */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "200ms" }}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5" />
              Select Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="booking-date">Select Date</Label>
              <Input
                id="booking-date"
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-time" className="flex items-center gap-2">
                <Clock className="size-4" />
                Select Time
              </Label>
              <Input
                id="booking-time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Summary */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "400ms" }}>
        <Card className="shadow-lg bg-slate-50">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mechanic:</span>
              <span className="font-bold">{mechanic.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-bold">{service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-bold">
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Not selected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-bold">{selectedTime || "Not selected"}</span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="text-muted-foreground">Estimated Cost:</span>
              <span className="font-bold text-lg text-primary">{mechanic.price}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirm Button */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "500ms" }}>
        <Button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime || !mechanicId}
          className="w-full py-6 text-lg"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
