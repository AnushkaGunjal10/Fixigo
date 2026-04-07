import { type FormEvent, useState } from "react";
import { Wrench } from "lucide-react";
import { addMechanic } from "../services/api";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function AdminAddMechanic() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();

    const res = await addMechanic({
      name,
      phone,
      location,
      latitude,
      longitude,
    });

    if (res.status === "success") {
      alert("Mechanic added!");
      setName("");
      setPhone("");
      setLocation("");
      setLatitude("");
      setLongitude("");
    } else {
      alert("Error adding mechanic");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 md:pb-8">
      <div>
        <h1 className="mb-2">Add Mechanic</h1>
        <p className="text-muted-foreground">Create a mechanic profile for booking and map display</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="size-5" />
            Mechanic Details
          </CardTitle>
          <CardDescription>Latitude and longitude are used for nearest mechanic and map features</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mechanic-name">Name</Label>
              <Input
                id="mechanic-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mechanic-phone">Phone</Label>
              <Input
                id="mechanic-phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="mechanic-location">Location</Label>
              <Input
                id="mechanic-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mechanic-latitude">Latitude</Label>
              <Input
                id="mechanic-latitude"
                type="number"
                step="any"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mechanic-longitude">Longitude</Label>
              <Input
                id="mechanic-longitude"
                type="number"
                step="any"
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full md:w-auto">
                Add Mechanic
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
