import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L, { Icon } from "leaflet";
import PropTypes from "prop-types";
// import originIcon from "App/assets/images/origin.svg";
// import destinationIcon from "App/assets/images/destination.svg";
import busStopsData from "./busStopData.json";
import busStopIcon from "../../App/assets/images/bus-stop.png";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';



const stopIcon = new Icon({
  iconUrl: busStopIcon,
  iconSize: [25, 40],
});

const MapComponent = () => {
  function onEachFeature(feature, layer) {
    layer.setIcon(stopIcon);
    layer.bindPopup(`<p>Name: ${feature.properties.name}</p>`);
  }

  const [map, setMap] = useState();

  useEffect(() => {
    if (!map) return;

    delete L.Icon.Default.prototype._getIconUrl;
    let DefaultIcon = L.icon({
      ...L.Icon.Default.prototype.options,
      iconUrl: icon,
      iconRetinaUrl: iconRetina,
      shadowUrl: iconShadow,
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    const busStopMarker = L.geoJSON(busStopsData, {
      onEachFeature: onEachFeature,
    });

    busStopMarker.addTo(map);
    map.fitBounds(busStopMarker.getBounds());
  });

  return (
    <div data-testid="map-component">
      <MapContainer
        center={[-1.9440138579421542, 30.061919689178463]}
        zoom={12}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );

  // if (props.origin !== undefined && props.destination !== undefined) {
  //   const origin = {
  //     ...props.origin,
  //   };

  //   const destination = {
  //     ...props.destination,
  //   };

  //   const origIcon = L.icon({
  //     iconUrl: originIcon,
  //     iconSize: [38, 95],
  //     shadowSize: [50, 64],
  //     iconAnchor: [22, 94],
  //     shadowAnchor: [4, 62],
  //     popupAnchor: [-3, -76],
  //   });

  //   const destIcon = L.icon({
  //     iconUrl: destinationIcon,
  //     iconSize: [38, 95],
  //     shadowSize: [50, 64],
  //     iconAnchor: [22, 94],
  //     shadowAnchor: [4, 62],
  //     popupAnchor: [-3, -76],
  //   });

  //   return (
  //     <div data-testid="map-component">
  //       <MapContainer center={destination} zoom={15}>
  //         <TileLayer
  //           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //         />
  //         <Marker position={origin} icon={origIcon}>
  //           <Popup>
  //             <i className="fa fa-building fa-lg"></i> Origin: Remera
  //           </Popup>
  //         </Marker>
  //         <Marker position={destination} icon={destIcon}>
  //           <Popup>
  //             <i className="fa fa-building fa-lg"></i> Destination: Down Town
  //           </Popup>
  //         </Marker>
  //         {busStopsData.features.map(bstop=>(<Marker
  //           key={bstop.properties.name}
  //           position={[bstop.geometry.coordinates[1],bstop.geometry.coordinates[0]]}
  //           icon={stopIcon}
  //         >
  //           <Popup>{bstop.properties.name}</Popup>
  //         </Marker>))}
  //       </MapContainer>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div data-testid="map-component">
  //       <MapContainer center={[-1.9440138579421542,30.061919689178463]} zoom={12}>
  //         <TileLayer
  //           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //         />
  //         {busStopsData.features.map(bstop=>(<Marker
  //           key={bstop.properties.name}
  //           position={[bstop.geometry.coordinates[1],bstop.geometry.coordinates[0]]}
  //           icon={stopIcon}
  //         >
  //           <Popup>{bstop.properties.name}</Popup>
  //         </Marker>))}
  //       </MapContainer>
  //     </div>
  //   );
  // }
};

MapComponent.propTypes = {
  origin: PropTypes.object,
  destination: PropTypes.object,
};

export default MapComponent;
