import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder';
import './App.css';

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([28.6139, 77.2090], 5); // Delhi default

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false,
      })
        .on('markgeocode', function (e) {
          const center = e.geocode.center;
          L.marker(center).addTo(map).bindPopup(e.geocode.name).openPopup();
          map.setView(center, 10);
        })
        .addTo(map);

      mapRef.current = map;
    }
  }, []);

  return (
    <div className = "box">
      <h2 className = "title">Map</h2>
      <div
        id="map"
        style={{ height: '500px', width: '100%', borderRadius: '10px' }}
      ></div>
    </div>
  );
}

export default Map;
