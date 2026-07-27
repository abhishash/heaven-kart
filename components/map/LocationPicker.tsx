"use client";

import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import { MapPin, LocateFixed } from "lucide-react";
// @ts-ignore
import "maplibre-gl/dist/maplibre-gl.css";

const osmStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution:
        "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
};

interface Props {
  onLocationChange?: (
    lat: number,
    lng: number,
    address?: string
  ) => void;
  initialLatitude?: number;
  initialLongitude?: number;
  initialAddress?: string;
}

interface LocationPickerProps extends Props {
  height?: number | string
}

export default function LocationPicker({
  onLocationChange,
  height = "240px",
  initialLatitude,
  initialLongitude,
  initialAddress,
}: LocationPickerProps) {
  const [loading, setLoading] = useState(false);

  const [viewState, setViewState] = useState({
    latitude: initialLatitude ?? 27.1767,
    longitude: initialLongitude ?? 78.0081,
    zoom: 15,
  });

  const [marker, setMarker] = useState({
    latitude: initialLatitude ?? 27.1767,
    longitude: initialLongitude ?? 78.0081,
  });

  const getAddress = async (
    lat: number,
    lng: number
  ) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await response.json();

      onLocationChange?.(
        lat,
        lng,
        data.display_name
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateLocation = async (
    latitude: number,
    longitude: number
  ) => {
    setMarker({
      latitude,
      longitude,
    });

    setViewState({
      latitude,
      longitude,
      zoom: 16,
    });

    await getAddress(latitude, longitude);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await updateLocation(
          position.coords.latitude,
          position.coords.longitude
        );

        setLoading(false);
      },
      () => {
        setLoading(false);
        alert("Unable to fetch your current location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const getCoordinatesFromAddress = async (query: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&limit=1`
      );
      const results = await response.json();

      if (results?.length > 0) {
        const result = results[0];
        await updateLocation(Number(result.lat), Number(result.lon));
      } else {
        console.warn("Unable to geocode initial address, keeping default map center.");
      }
    } catch (error) {
      console.log(error);
      console.warn("Error geocoding initial address, keeping default map center.");
    }
  };

  useEffect(() => {
    if (initialLatitude != null && initialLongitude != null) {
      updateLocation(initialLatitude, initialLongitude);
      return;
    }

    if (initialAddress) {
      getCoordinatesFromAddress(initialAddress);
      return;
    }

    getCurrentLocation();
  }, [initialLatitude, initialLongitude, initialAddress]);

  const mapHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div className="space-y-4">



      <div className="overflow-hidden relative rounded-t-2xl border shadow-sm">

        
        {/* Current Location Button */}
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={loading}
          className="absolute rounded-full w-fit border shadow-xl border-primary right-4 top-4 z-10 flex items-center gap-2 bg-white
                px-2 py-2 text-sm font-semibold text-slate-700
               transition-all hover:shadow-xl
               disabled:opacity-60"
        >
          <LocateFixed
            className={`h-5 w-5 text-green-600 ${loading ? "animate-spin" : ""}`}
          />
        </button>
        <Map
          key={`${viewState.latitude}-${viewState.longitude}-${viewState.zoom}`}
          initialViewState={viewState}
          mapStyle={osmStyle as any}
          style={{
            width: "100%",
            height: height,
          }}
        >
          <Marker
            className="custom-marker"
            longitude={marker.longitude}
            latitude={marker.latitude}
            draggable
            anchor="bottom"
            onDragEnd={(e) => {
              const { lng, lat } = e.lngLat;

              setMarker({
                latitude: lat,
                longitude: lng,
              });

              setViewState((prev) => ({
                ...prev,
                latitude: lat,
                longitude: lng,
              }));

              getAddress(lat, lng);
            }}
          >
            <div className="flex flex-col items-center cursor-grab active:cursor-grabbing select-none">

              {/* Brand Badge */}
              <div className="mb-2 rounded-full bg-white px-4 py-2 shadow-xl border border-green-100">
                <span className="text-sm font-bold tracking-wide">
                  <span className="text-slate-800">Heaven</span>
                  <span className="text-green-600">Kart</span>
                </span>
              </div>
              <MapPin className="h-12 w-12 text-white fill-green-500" />


            </div>
          </Marker>

        </Map>

      </div>

    </div>
  );
}