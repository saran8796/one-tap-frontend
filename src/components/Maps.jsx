import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import _restaurantIcon from "../assets/shop.png";
import _homeIcon from "../assets/3d-house.png";
import _bikeIcon from "../assets/bike.png";

export default function Maps({ shopcord, deliverycord }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState(
    "Preparing your order..."
  );

  const [currentLocation] = useState({
    lat: 12.824041240608073,
    lng: 79.7122800321034,

    // lat: shopcord.lat,
    // lng: shopcord.lng
  });

  const [deliveryLocation] = useState({
    lat: 12.812289171563517,
    lng: 79.7212150568176,

    // lat: deliverycord.lat,
    // lng: deliverycord.lng
  });

  const zoom = 17;
  maptilersdk.config.apiKey = "aeT5KKDAoXuo3xVXAPJf";

  // Custom icon elements
  // Custom icon elements with anchor point control
  const createCustomIconElement = (
    iconSrc,
    size = 30,
    className = "",
    anchorBottom = false
  ) => {
    const element = document.createElement("div");
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.backgroundImage = `url(${iconSrc})`;
    element.style.backgroundSize = "cover";
    element.style.backgroundRepeat = "no-repeat";
    element.style.backgroundPosition = "center";

    // Set anchor point to bottom center for proper pin placement
    if (anchorBottom) {
      element.style.transformOrigin = "center bottom"; // This makes it rotate from the bottom
    }

    if (className) {
      element.className = className;
    }

    // Add error handling for missing images
    const img = new Image();
    img.onerror = () => {
      console.warn(`Failed to load icon: ${iconSrc}`);
      // Fallback to colored circle
      element.style.backgroundImage = "none";
      element.style.backgroundColor = "#ff0000";
      element.style.display = "flex";
      element.style.alignItems = "center";
      element.style.justifyContent = "center";
      element.innerHTML =
        '<span style="color: white; font-size: 12px;">!</span>';
    };
    img.src = iconSrc;

    return element;
  };

  // Calculate bearing (direction) between two coordinates
  const calculateBearing = (startLng, startLat, endLng, endLat) => {
    const startLngRad = startLng * (Math.PI / 180);
    const startLatRad = startLat * (Math.PI / 180);
    const endLngRad = endLng * (Math.PI / 180);
    const endLatRad = endLat * (Math.PI / 180);

    const y = Math.sin(endLngRad - startLngRad) * Math.cos(endLatRad);
    const x =
      Math.cos(startLatRad) * Math.sin(endLatRad) -
      Math.sin(startLatRad) *
        Math.cos(endLatRad) *
        Math.cos(endLngRad - startLngRad);

    let bearing = Math.atan2(y, x) * (180 / Math.PI);
    bearing = (bearing + 360) % 360; // Normalize to 0-360 degrees

    return bearing;
  };

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [currentLocation.lng, currentLocation.lat],
      zoom: zoom,
      language: "en",
      pitch: 60,
      bearing: -20,
    });

    map.current.on("load", async () => {
      await addMarkers();
      await calculateRealRoute();
    });
  }, []);

  const addMarkers = () => {
    // Restaurant marker with custom icon
    const restaurantIcon = createCustomIconElement(
      _restaurantIcon, // Shop icon URL
      80
    );

    new maptilersdk.Marker({
      element: restaurantIcon,
      offset: [0, -13], // Center the bottom of the icon at the coordinate
    })
      .setLngLat([currentLocation.lng, currentLocation.lat])
      .setPopup(new maptilersdk.Popup().setHTML("<h3>🍕 Restaurant</h3>"))
      .addTo(map.current);

    // Delivery location marker with custom icon
    const homeIcon = createCustomIconElement(
      _homeIcon, // Home icon URL
      30
    );

    new maptilersdk.Marker({
      element: homeIcon,
      offset: [0, -10], // Center the bottom of the icon at the coordinate
    })
      .setLngLat([deliveryLocation.lng, deliveryLocation.lat])
      .setPopup(new maptilersdk.Popup().setHTML("<h3>🏠 Delivery Point</h3>"))
      .addTo(map.current);
  };

  // Updated delivery person simulation with bike icon
  // Updated delivery person simulation with bike icon
  const startRealPathSimulation = (coordinates) => {
    let currentIndex = 0;

    // Create bike/delivery person icon with bottom anchor
    const bikeIcon = createCustomIconElement(
      _bikeIcon, // Bike icon URL
      60,
      "",
      true // Set anchor to bottom
    );

    const deliveryPersonMarker = new maptilersdk.Marker({
      element: bikeIcon,
      // Optional: You can also set offset if needed
      offset: [0, -15], // Adjust this based on your icon size
    })
      .setLngLat(coordinates[0])
      .addTo(map.current);

    const intervalTime = 1000;

    const interval = setInterval(() => {
      if (currentIndex >= coordinates.length - 1) {
        clearInterval(interval);
        setDeliveryStatus("Package delivered! 🎉");
        return;
      }

      const previousIndex = currentIndex;
      currentIndex++;

      const [prevLng, prevLat] = coordinates[previousIndex];
      const [currentLng, currentLat] = coordinates[currentIndex];

      // Calculate rotation based on direction
      const bearing = calculateBearing(
        prevLng,
        prevLat,
        currentLng,
        currentLat
      );

      // Apply rotation to bike icon
      bikeIcon.style.transform = `rotate(${bearing}deg)`;

      // Update delivery person position
      deliveryPersonMarker.setLngLat([currentLng, currentLat]);

      setCurrentStep(currentIndex);
      const progress = (currentIndex / coordinates.length) * 100;
      updateDeliveryStatus(progress);
    }, intervalTime);
  };

  // ... rest of your existing functions (calculateRealRoute, drawRouteOnMap, etc.) remain the same
  const calculateRealRoute = async () => {
    try {
      setDeliveryStatus("Calculating best route...");

      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${currentLocation.lng},${currentLocation.lat};${deliveryLocation.lng},${deliveryLocation.lat}?overview=full&geometries=geojson`
      );

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates;

        console.log("Route coordinates:", coordinates);

        setRouteCoordinates(coordinates);
        drawRouteOnMap(coordinates);
        startRealPathSimulation(coordinates);

        setDeliveryStatus("Driver is on the way! 🚗");
      } else {
        throw new Error("No route found from OSRM");
      }
    } catch (error) {
      console.error("Error calculating route with OSRM:", error);
      createCurvedPathFallback();
    }
  };

  const createCurvedPathFallback = () => {
    setDeliveryStatus("Using optimized path...");

    const startLng = currentLocation.lng;
    const startLat = currentLocation.lat;
    const endLng = deliveryLocation.lng;
    const endLat = deliveryLocation.lat;

    const intermediatePoints = [];
    const numPoints = 30;

    for (let i = 1; i < numPoints - 1; i++) {
      const t = i / numPoints;
      const curvature = Math.sin(t * Math.PI) * 0.001;

      const lng = startLng + (endLng - startLng) * t + curvature;
      const lat = startLat + (endLat - startLat) * t + curvature;

      intermediatePoints.push([lng, lat]);
    }

    const curvedRoute = [
      [startLng, startLat],
      ...intermediatePoints,
      [endLng, endLat],
    ];

    setRouteCoordinates(curvedRoute);
    drawRouteOnMap(curvedRoute);
    startRealPathSimulation(curvedRoute);
  };

  const drawRouteOnMap = (coordinates) => {
    if (map.current.getSource("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    }

    map.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      },
    });

    map.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#008CFF",
        "line-width": 6,
        "line-opacity": 0.75,
      },
    });

    const bounds = new maptilersdk.LngLatBounds();
    coordinates.forEach((coord) => {
      bounds.extend(coord);
    });
    map.current.fitBounds(bounds, {
      padding: 50,
      duration: 1000,
      //   maxZoom: 17, // Add maximum zoom level
      //   minZoom: 12, // Add minimum zoom level (optional)
      zoom: 15, // Force specific zoom level (alternative approach)
    });
  };

  const updateDeliveryStatus = (progress) => {
    if (progress > 90) {
      setDeliveryStatus("Almost there! 🏠");
    } else if (progress > 70) {
      setDeliveryStatus("In your neighborhood... 🚗");
    } else if (progress > 40) {
      setDeliveryStatus("On the way... 📦");
    } else if (progress > 10) {
      setDeliveryStatus("Driver picked up your order ✅");
    }
  };

  const calculateProgress = () => {
    if (routeCoordinates.length === 0) return 0;
    return Math.min(
      100,
      Math.round((currentStep / routeCoordinates.length) * 100)
    );
  };

  return (
    <div className="map-wrap">
      {/* <div className="delivery-overlay">
        <div className="delivery-card">
          <h3>🚚 Order Tracking</h3>
          <p className="status">{deliveryStatus}</p>
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <span className="progress-text">{calculateProgress()}%</span>
          </div>
          <div className="location-info">
            <div className="location">
              <span className="dot start"></span>
              <span>Restaurant</span>
            </div>
            <div className="location">
              <span className="dot end"></span>
              <span>Delivery Point</span>
            </div>
          </div>
        </div>
      </div> */}

      <div ref={mapContainer} className="map" />
    </div>
  );
}
