import React, { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";
import { AppContext } from "context/AppProvider";

// import busStopsData from "./busStopData.json";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

const MapComponent = () => {
  // const onEachFeature = (feature, layer) => {
  //   layer.setIcon(stopIcon);
  //   layer.bindPopup(`<p>Name: ${feature.properties.name}</p>`);
  // };
  const { setMapState, busStopMarker } = useContext(AppContext);
  const [map, setMap] = useState();

  useEffect(() => {
    if (!map) return;
    setMapState(map);
    delete L.Icon.Default.prototype._getIconUrl;
    let DefaultIcon = L.icon({
      ...L.Icon.Default.prototype.options,
      iconUrl: icon,
      iconRetinaUrl: iconRetina,
      shadowUrl: iconShadow,
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    if (busStopMarker) {
      busStopMarker.addTo(map);
      map.fitBounds(busStopMarker.getBounds());
    }
  });

  // L.marker([30.044665829767986, -1.9404906047698116]).addTo(map);

  // console.log(state.sampleLocation)

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
};

MapComponent.propTypes = {
  origin: PropTypes.object,
  destination: PropTypes.object,
};

export default MapComponent;
