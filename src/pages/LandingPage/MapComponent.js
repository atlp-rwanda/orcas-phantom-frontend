import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import originIcon from 'App/assets/images/origin.svg';
import destinationIcon from 'App/assets/images/destination.svg';


const MapComponent = (props) => {
  const samplePosition = {
    lat: -1.9297648,
    lng: 29.9871554
  };

  if (props.origin !== undefined && props.destination !== undefined) {
    const origin = {
      ...props.origin
    };

    const destination = {
      ...props.destination
    };

    const origIcon = L.icon({
      iconUrl: originIcon,
      iconSize:     [38, 95],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
    });

    const destIcon = L.icon({
      iconUrl: destinationIcon,
      iconSize:     [38, 95],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
    });

    return (
      <div data-testid="map-component">
        <Map center={destination} zoom={15}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={origin} icon={origIcon}>
            <Popup><i className="fa fa-building fa-lg"></i> Origin: Remera</Popup>
          </Marker>
          <Marker position={destination} icon={destIcon}>
            <Popup><i className="fa fa-building fa-lg"></i> Destination: Down Town</Popup>
          </Marker>
        </Map>
      </div>
    );
  } else {
    return (
      <div data-testid="map-component">
        <Map center={samplePosition} zoom={12}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }
}

MapComponent.propTypes = {
  origin: PropTypes.object,
  destination: PropTypes.object
}

export default MapComponent;
