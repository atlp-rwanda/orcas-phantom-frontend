import React, { useEffect, useState,useContext } from "react";
import { MapContainer, TileLayer,LayersControl } from "react-leaflet";
import L, { Icon } from "leaflet";
import PropTypes from "prop-types";
import { AppContext } from 'context/AppProvider';

import busStopsData from "./busStopData.json";
import busStopIcon from "../../App/assets/images/bus-stop6.svg";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';



const stopIcon = new Icon({
  iconUrl: busStopIcon,
  iconSize: [60, 70],
});

const MapComponent = () => {
  const { state } = useContext(AppContext);
  const onEachFeature=(feature, layer) =>{
    layer.setIcon(stopIcon);
    layer.bindPopup(`<p>Name: ${feature.properties.name}</p>`);
  }
  const {BaseLayer}=LayersControl;


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
        <LayersControl >
          <BaseLayer  name="dark" checked={typeof(state.isSwitched)=='undefined'? false : (state.isSwitched?true:false)} >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.mapbox.com/styles/v1/johnsonwambere/cki47ba4y7ct319qrb5fu8e0z/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9obnNvbndhbWJlcmUiLCJhIjoiY2tpM293dHVqMWM0czJ4bXNicnR1NGpodSJ9.dMW6nSid_3t3l6sUjB6XyQ"
            />
          </BaseLayer> 
        </LayersControl>
          
        <LayersControl >
          <BaseLayer   name="light"  checked={typeof(state.isSwitched)=='undefined'? true : (state.isSwitched?false:true)}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.mapbox.com/styles/v1/johnsonwambere/cki4c7pl47hzk19oysw68nwmg/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9obnNvbndhbWJlcmUiLCJhIjoiY2tpM293dHVqMWM0czJ4bXNicnR1NGpodSJ9.dMW6nSid_3t3l6sUjB6XyQ"
            />
          </BaseLayer>
        </LayersControl>
      </MapContainer>
    </div>
  );

};

MapComponent.propTypes = {
  origin: PropTypes.object,
  destination: PropTypes.object,
  data: PropTypes.object,
  setState: PropTypes.func,
  handleSwitch:PropTypes.func,

};

export default MapComponent;

