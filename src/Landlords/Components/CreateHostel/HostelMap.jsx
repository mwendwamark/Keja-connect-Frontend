// import React, { useRef, useEffect, useState, useCallback } from "react";
// import MapGL, { Marker, NavigationControl } from "react-map-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import "mapbox-gl/dist/mapbox-gl.css";

// const MAPBOX_TOKEN = "pk.eyJ1IjoibnRoZWkiLCJhIjoiY205aWs4dXNiMDJ4dDJ2cjBzdjBvNGF4ZSJ9.HreBgE2wY7eWfnfk-3vYuQ";

// const HostelMap = ({ latitude, longitude, setCoordinates }) => {
//   const mapRef = useRef();
//   const geocoderContainerRef = useRef();
//   const [viewport, setViewport] = useState({
//     latitude: latitude || -1.286389, // Default to Nairobi
//     longitude: longitude || 36.817223,
//     zoom: 14,
//   });
//   const [marker, setMarker] = useState({
//     latitude: latitude || -1.286389,
//     longitude: longitude || 36.817223,
//   });

//   useEffect(() => {
//     if (latitude && longitude) {
//       setViewport((v) => ({ ...v, latitude, longitude }));
//       setMarker({ latitude, longitude });
//     }
//   }, [latitude, longitude]);

//   // Add MapboxGeocoder control manually for react-map-gl v6
//   useEffect(() => {
//     if (!mapRef.current) return;
//     const map = mapRef.current.getMap();
//     if (!map || !geocoderContainerRef.current) return;

//     // Clean up old geocoder if any
//     if (map._geocoder) {
//       map.removeControl(map._geocoder);
//       map._geocoder = null;
//     }

//     const geocoder = new MapboxGeocoder({
//       accessToken: MAPBOX_TOKEN,
//       marker: false,
//       mapboxgl: map,
//       placeholder: "Search for location...",
//       collapsed: true
//     });
//     geocoder.on("result", (e) => {
//       const coords = e.result.geometry.coordinates;
//       setMarker({ latitude: coords[1], longitude: coords[0] });
//       setViewport((v) => ({ ...v, latitude: coords[1], longitude: coords[0] }));
//       setCoordinates({ latitude: coords[1], longitude: coords[0] });
//     });
//     map._geocoder = geocoder;
//     map.addControl(geocoder);
//     // Put geocoder in custom container
//     geocoderContainerRef.current.appendChild(geocoder.onAdd(map));
//     return () => {
//       if (map._geocoder) {
//         map.removeControl(map._geocoder);
//         map._geocoder = null;
//       }
//     };
//   }, [mapRef, setCoordinates]);

//   const onMapClick = useCallback((event) => {
//     const [lng, lat] = event.lngLat;
//     setMarker({ latitude: lat, longitude: lng });
//     setCoordinates({ latitude: lat, longitude: lng });
//   }, [setCoordinates]);

//   return (
//     <div style={{ height: "400px", width: "100%", position: "relative" }}>
//       <div ref={geocoderContainerRef} style={{ position: "absolute", top: 10, left: 10, zIndex: 1, width: 300 }} />
//       <MapGL
//         ref={mapRef}
//         {...viewport}
//         width="100%"
//         height="400px"
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         mapboxApiAccessToken={MAPBOX_TOKEN}
//         onViewportChange={setViewport}
//         onClick={onMapClick}
//       >
//         <Marker
//           latitude={marker.latitude}
//           longitude={marker.longitude}
//           offsetLeft={-20}
//           offsetTop={-10}
//           draggable
//           onDragEnd={e => {
//             setMarker({ latitude: e.lngLat[1], longitude: e.lngLat[0] });
//             setCoordinates({ latitude: e.lngLat[1], longitude: e.lngLat[0] });
//           }}
//         />
//         <NavigationControl style={{ position: "absolute", top: 10, right: 10 }} />
//       </MapGL>
//     </div>
//   );
// };

// export default HostelMap;


import React, { useRef, useEffect, useState, useCallback } from "react";
import MapGL, { Marker, NavigationControl } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoibnRoZWkiLCJhIjoiY205aWs4dXNiMDJ4dDJ2cjBzdjBvNGF4ZSJ9.HreBgE2wY7eWfnfk-3vYuQ";

const HostelMap = ({ latitude, longitude, setCoordinates }) => {
  const mapRef = useRef();
  const geocoderContainerRef = useRef();
  const geocoderRef = useRef(null);
  
  const [viewport, setViewport] = useState({
    latitude: latitude || -1.286389, // Default to Nairobi
    longitude: longitude || 36.817223,
    zoom: 14,
  });
  
  const [marker, setMarker] = useState({
    latitude: latitude || -1.286389,
    longitude: longitude || 36.817223,
  });

  useEffect(() => {
    if (latitude && longitude) {
      setViewport((v) => ({ ...v, latitude, longitude }));
      setMarker({ latitude, longitude });
    }
  }, [latitude, longitude]);

  // Add MapboxGeocoder control safely
  useEffect(() => {
    // Make sure map and container are available
    if (!mapRef.current || !geocoderContainerRef.current) return;
    
    const map = mapRef.current.getMap();
    if (!map) return;

    // Create geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,
      marker: false,
      mapboxgl: map,
      placeholder: "Search for location...",
      collapsed: true
    });
    
    // Save reference
    geocoderRef.current = geocoder;
    
    // Handle results
    geocoder.on("result", (e) => {
      const coords = e.result.geometry.coordinates;
      setMarker({ latitude: coords[1], longitude: coords[0] });
      setViewport((v) => ({ ...v, latitude: coords[1], longitude: coords[0] }));
      setCoordinates({ latitude: coords[1], longitude: coords[0] });
    });

    // Add to container
    try {
      const geocoderUI = geocoder.onAdd(map);
      geocoderContainerRef.current.appendChild(geocoderUI);
    } catch (err) {
      console.error("Error adding geocoder:", err);
    }

    // Cleanup function
    return () => {
      try {
        if (geocoderRef.current && geocoderContainerRef.current) {
          const geocoderElement = geocoderContainerRef.current.querySelector('.mapboxgl-ctrl-geocoder');
          if (geocoderElement) {
            geocoderContainerRef.current.removeChild(geocoderElement);
          }
          geocoderRef.current = null;
        }
      } catch (err) {
        console.error("Error during geocoder cleanup:", err);
      }
    };
  }, [mapRef, setCoordinates]);

  const onMapClick = useCallback((event) => {
    const [lng, lat] = event.lngLat;
    setMarker({ latitude: lat, longitude: lng });
    setCoordinates({ latitude: lat, longitude: lng });
  }, [setCoordinates]);

  return (
    <div style={{ height: "400px", width: "100%", position: "relative" }}>
      <div 
        ref={geocoderContainerRef} 
        style={{ position: "absolute", top: 10, left: 10, zIndex: 1, width: 300 }} 
      />
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="400px"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={setViewport}
        onClick={onMapClick}
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          offsetLeft={-20}
          offsetTop={-10}
          draggable
          onDragEnd={e => {
            setMarker({ latitude: e.lngLat[1], longitude: e.lngLat[0] });
            setCoordinates({ latitude: e.lngLat[1], longitude: e.lngLat[0] });
          }}
        >
          <div style={{ color: "red", fontWeight: "bold" }}>📍</div>
        </Marker>
        <NavigationControl style={{ position: "absolute", top: 10, right: 10 }} />
      </MapGL>
    </div>
  );
};

export default HostelMap;