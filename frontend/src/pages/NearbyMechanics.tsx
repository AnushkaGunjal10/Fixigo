import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Star, Clock, Phone, Navigation, Filter } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import MapView from "../components/MapView";
import { getMechanics } from "../services/api";

type Mechanic = {
  mechanic_id: string;
  name: string;
  phone?: string;
  location?: string;
  specialization?: string;
  rating?: string;
  reviews?: string;
  availability?: string;
  available?: string;
  response_time?: string;
  price?: string;
  image?: string;
};

const isMechanicAvailable = (mechanic: Mechanic) => {
  const status = mechanic.availability ?? mechanic.available ?? "Available";
  return status.toLowerCase() === "available" || status !== "0";
};

export function NearbyMechanics() {
  const navigate = useNavigate();
  const [view, setView] = useState<"list" | "map">("list");
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [selectedMechanicId, setSelectedMechanicId] = useState("");

  useEffect(() => {
    const fetchMechanics = async () => {
      const data = await getMechanics();
      setMechanics(Array.isArray(data) ? data : []);
    };

    fetchMechanics();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="animate-in fade-in slide-in-from-top duration-500">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="mb-2">Nearby Mechanics</h1>
            <p className="text-muted-foreground">
              {mechanics.length} mechanics available in your area
            </p>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="size-5" />
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <div className="grid gap-4">
            {mechanics.map((mechanic, index) => (
              <div
                key={mechanic.mechanic_id}
                className="animate-in fade-in slide-in-from-left duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="shadow-md hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6 flex-col md:flex-row">
                      {/* Mechanic Image */}
                      <ImageWithFallback
                        src={mechanic.image}
                        alt={mechanic.name}
                        className="size-24 rounded-lg object-cover"
                      />

                      {/* Mechanic Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-xl">{mechanic.name}</h3>
                              {isMechanicAvailable(mechanic) ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                  Available
                                </Badge>
                              ) : (
                                <Badge variant="secondary">Busy</Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">{mechanic.specialization}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Star className="size-4 text-secondary fill-secondary" />
                            <span className="font-bold">{mechanic.rating}</span>
                            <span className="text-muted-foreground">({mechanic.reviews ?? 0})</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="size-4" />
                            <span>{mechanic.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="size-4" />
                            <span>{mechanic.response_time ?? "Available"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="size-4" />
                            <span>{mechanic.phone ?? "Not available"}</span>
                          </div>
                          <div className="flex items-center gap-2 font-bold text-primary">
                            <span>{mechanic.price ?? "Contact for price"}</span>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button
                            className="flex-1"
                            disabled={!isMechanicAvailable(mechanic)}
                            onClick={() => navigate(`/app/book/${mechanic.mechanic_id}`)}
                          >
                            Book Now
                          </Button>
                          <Button variant="outline" size="icon">
                            <Phone className="size-5" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Navigation className="size-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-6">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <MapView
                mechanics={mechanics}
                selectedMechanicId={selectedMechanicId}
                onSelectMechanic={setSelectedMechanicId}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
