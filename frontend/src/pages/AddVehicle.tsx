import { type FormEvent, useEffect, useState } from "react";
import { Car, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { addVehicle, getVehicles } from "../services/api";

type Vehicle = {
  vehicle_id: string;
  vehicle_name: string;
  vehicle_number: string;
};

export function AddVehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const fetchVehicles = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      window.location.href = "/";
      return;
    }

    const user = JSON.parse(storedUser);
    const data = await getVehicles(user.user_id);
    setVehicles(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      window.location.href = "/";
      return;
    }

    const user = JSON.parse(storedUser);
    const res = await addVehicle({
      user_id: user.user_id,
      vehicle_name: vehicleName,
      vehicle_number: vehicleNumber,
    });

    if (res.status === "success") {
      alert("Vehicle added");
      setVehicleName("");
      setVehicleNumber("");
      fetchVehicles();
    } else {
      alert("Error adding vehicle");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-8">
      <div className="animate-in fade-in slide-in-from-top duration-500">
        <h1 className="mb-2">My Vehicles</h1>
        <p className="text-muted-foreground">Manage your registered vehicles</p>
      </div>

      {/* Add New Vehicle Form */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="size-6" />
              Add New Vehicle
            </CardTitle>
            <CardDescription>Enter your vehicle details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-name">Vehicle Name</Label>
                  <Input
                    id="vehicle-name"
                    placeholder="e.g., Toyota Camry"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle-number">Registration Number</Label>
                  <Input
                    id="vehicle-number"
                    placeholder="e.g., ABC 1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full md:w-auto">
                <Plus className="size-4 mr-2" />
                Add Vehicle
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Existing Vehicles */}
      <div>
        <h2 className="mb-6">Registered Vehicles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.vehicle_id}
              className="animate-in fade-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Car className="size-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold mb-1">
                        {vehicle.vehicle_name}
                      </h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="font-mono font-bold text-foreground">
                          {vehicle.vehicle_number}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
