import { useEffect } from "react";
import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

type MechanicLocation = {
  mechanic_id: string;
  name: string;
  phone?: string;
  location?: string;
  availability?: string;
  available?: string;
  latitude?: string | number;
  longitude?: string | number;
};

type MapViewProps = {
  mechanics: MechanicLocation[];
  selectedMechanicId?: string;
  onSelectMechanic?: (mechanicId: string) => void;
};

function MapCenter({
  selectedMechanic,
}: {
  selectedMechanic?: MechanicLocation;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedMechanic?.latitude && selectedMechanic.longitude) {
      map.setView([Number(selectedMechanic.latitude), Number(selectedMechanic.longitude)], 14);
    }
  }, [map, selectedMechanic]);

  return null;
}

const markerIcon = divIcon({
  className: "",
  html: '<div style="background:#1e3a8a;border:3px solid white;border-radius:9999px;box-shadow:0 6px 16px rgba(0,0,0,.25);height:22px;width:22px;"></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const selectedMarkerIcon = divIcon({
  className: "",
  html: '<div style="background:#f59e0b;border:4px solid white;border-radius:9999px;box-shadow:0 8px 20px rgba(0,0,0,.35);height:30px;width:30px;"></div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const isMechanicAvailable = (mechanic: MechanicLocation) => {
  const status = mechanic.availability ?? mechanic.available ?? "Available";
  return status.toLowerCase() === "available" || status !== "0";
};

export default function MapView({
  mechanics,
  selectedMechanicId,
  onSelectMechanic,
}: MapViewProps) {
  const mechanicsWithLocation = mechanics.filter(
    (mechanic) => mechanic.latitude && mechanic.longitude,
  );
  const selectedMechanic = mechanicsWithLocation.find(
    (mechanic) => String(mechanic.mechanic_id) === selectedMechanicId,
  );

  return (
    <MapContainer
      center={[18.5204, 73.8567]}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <MapCenter selectedMechanic={selectedMechanic} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {mechanicsWithLocation.map((mechanic) => (
        <Marker
          key={mechanic.mechanic_id}
          position={[Number(mechanic.latitude), Number(mechanic.longitude)]}
          icon={
            String(mechanic.mechanic_id) === selectedMechanicId
              ? selectedMarkerIcon
              : markerIcon
          }
          eventHandlers={{
            click: () => onSelectMechanic?.(String(mechanic.mechanic_id)),
          }}
        >
          <Popup>
            <b>{mechanic.name}</b>
            <br />
            Location: {mechanic.location ?? "Not available"}
            <br />
            Phone: {mechanic.phone ?? "Not available"}
            <br />
            Status: {isMechanicAvailable(mechanic) ? "Available" : "Busy"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
