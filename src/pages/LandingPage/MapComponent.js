import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import 'leaflet-routing-machine';
import PropTypes from 'prop-types';
import { AppContext } from 'context/AppProvider';

import busStopsData from './busStopData.json';
import busStopIcon from '../../App/assets/images/bus-stop6.svg';
import busIcon from '../../App/assets/images/busIcon.png';

import routeData from './routeData.json';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const stopIcon = new Icon({
  iconUrl: busStopIcon,
  iconSize: [ 50, 60 ]
});

const myBusIcon = new Icon({
  iconUrl: busIcon,
  iconSize: [ 30, 40 ]
});

const route1 = [
  [  -1.940194,30.044583 ],
  [  -1.940414, 30.044096],
  [  -1.940849,30.044167 ],
  [  -1.940994,30.043862 ],
  [  -1.942049 ,30.044243],
  [  -1.940667,30.047484 ],
  [  -1.939557,30.05191 ],
  [  -1.939189,30.054943 ],
  [  -1.939774,30.058225 ],
  [  -1.939559,30.060061 ],
  [  -1.939839,30.060921 ],
  [  -1.940546,30.061556 ],
  [  -1.943607,30.061987 ],
  [  -1.943853,30.061495 ],
  [ -1.944448, 30.061697 ],
  [  -1.945481,30.065424 ],
  [  -1.947905,30.070923 ],
  [  -1.950996,30.072855 ],
  [  -1.953442,30.073534 ],
  [  -1.953388,30.073836 ],
  [  -1.950287,30.074603 ],
  [  -1.948599,30.075817 ],
  [  -1.946472,30.075649 ],
  [  -1.945473,30.076591 ],
  [  -1.945882,30.07898 ],
  [  -1.946633,30.080753 ],
  [  -1.949848,30.083493 ],
  [  -1.95104,30.084873 ],
  [  -1.95057,30.085795 ],
  [  -1.951021,30.088211 ],
  [  -1.951804,30.090027 ],
  [  -1.953068,30.091706 ],
  [  -1.952737,30.092403 ],
  [  -1.950149,30.092515 ],
  [  -1.950407,30.093218 ],
  [  -1.951445,30.093694 ],
  [  -1.952887,30.095107 ],
  [  -1.95388,30.095531 ],
  [  -1.954182,30.095708 ],
  [  -1.953156,30.100189 ],
  [  -1.953432,30.101827 ],
  [  -1.954202,30.102715 ],
  [  -1.958468 ,30.105294],
  [  -1.959385,30.106621 ],
  [  -1.960026,30.108891 ],
  [  -1.960132,30.109225 ],
  [  -1.959558,30.109231 ],
  [  -1.958365,30.110861 ],
  [  -1.955736,30.117293 ],
  [  -1.954117,30.118465 ],
  [  -1.949436,30.124995 ],
  [  -1.949492,30.12516 ],
  [  -1.949477,30.12524 ]
];

const MapComponent = () => {
  const { state } = useContext(AppContext);
  const onEachFeature = (feature, layer) => {
    layer.setIcon(stopIcon);
    layer.bindPopup(`<p>Name: ${feature.properties.name}</p>`);
  };
  const { BaseLayer } = LayersControl;

  const [ map, setMap ] = useState();
  const bus = {
    name: 'KBS',
    PlateNumber: 'RAC 500 D',
    currentLocation: [ -1.9407488044824783, 30.04462480545044 ]
  };

  useEffect(() => {
    if (!map) return;

    delete L.Icon.Default.prototype._getIconUrl;
    let DefaultIcon = L.icon({
      ...L.Icon.Default.prototype.options,
      iconUrl: icon,
      iconRetinaUrl: iconRetina,
      shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    L.Routing
      .control({
        waypoints: [
          L.latLng(-1.9407488044824783, 30.04462480545044),
          L.latLng(-1.949678094153609, 30.125600695610046)
        ],
        lineOptions: {
          styles: [ { color: 'red', opacity: 0.8, weight: 3 } ]
        },
        addWaypoints: false,
        draggableWaypoints: false
      })
      .addTo(map);
      
    routeData.forEach((route) => {
      const wayPoints = [];
      route.routes.geometry.coordinates.forEach((coords) => {
        wayPoints.push(coords);
      });

      L.Routing
        .control({
          createMarker: () => {
            return null;
          },
          waypoints: wayPoints.map((arr) => {
            return L.latLng(arr[1], arr[0]);
          }),
          lineOptions: {
            styles: [ { color: 'blue', opacity: 0.8, weight: 3 } ]
          },
          addWaypoints: false,
          draggableWaypoints: false
        })
        .addTo(map);
    });

    const busStopMarker = L.geoJSON(busStopsData, {
      onEachFeature: onEachFeature
    });

    busStopMarker.addTo(map);
    map.fitBounds(busStopMarker.getBounds());

    const busMarker = L.marker(bus.currentLocation, { icon: myBusIcon });

    busMarker.addTo(map)
      .bindPopup(`Bus Name:${bus.name} Plate Number:${bus.PlateNumber} `)
      .bindTooltip(`Current Location: ${bus.currentLocation}`)

    for (let i = 0; i < route1.length; i++) {
      task(i);
    }

    function task(i) {
      setTimeout(function() {
        busMarker.setLatLng(route1[i]) ;
      }, 3000 * i);
    }
  });

  return (
    <div data-testid="map-component">
      <MapContainer center={[ -1.9440138579421542, 30.061919689178463 ]} zoom={12} whenCreated={setMap}>
        <LayersControl>
          <BaseLayer
            name="dark"
            checked={typeof state.isSwitched == 'undefined' ? false : state.isSwitched ? true : false}
          >
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://api.mapbox.com/styles/v1/johnsonwambere/cki47ba4y7ct319qrb5fu8e0z/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9obnNvbndhbWJlcmUiLCJhIjoiY2tpM293dHVqMWM0czJ4bXNicnR1NGpodSJ9.dMW6nSid_3t3l6sUjB6XyQ"
            />
          </BaseLayer>
        </LayersControl>

        <LayersControl>
          <BaseLayer
            name="light"
            checked={typeof state.isSwitched == 'undefined' ? true : state.isSwitched ? false : true}
          >
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
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
  handleSwitch: PropTypes.func
};

export default MapComponent;
