
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


const MapComponent = props => {
  // eslint-disable-next-line react/prop-types
  const position = [props.lat, props.lng];

  
  return (
    <div data-testid="map-component">
      <Map center={position} zoom={15}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup><i className="fa fa-building fa-lg"></i> Remera</Popup>
        </Marker>
      </Map>
    </div>
  )
}

export default MapComponent;
