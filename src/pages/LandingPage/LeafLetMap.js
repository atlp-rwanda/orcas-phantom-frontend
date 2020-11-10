import React, { useState, useRef, useEffect } from "react";
import { Map, TileLayer ,Tooltip, Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import Routing from "./RoutingMachine";
import busIcon from 'App/assets/images/busIcon.png';

const LeafletMap = ()=>{

  const bus = {
    plate: 'RAC 500 B',
    currentPosition:[-1.9402716450742195,30.055361688137054],
    busName: 'coaster'
  }
  const myBusIcon = L.icon({
    iconUrl: busIcon,
    iconSize:     [24, 35],
    iconAnchor:   [12, 20],
  });
  
  const initialMapState={
    lat: 57.74,
    lng: 11.94,
    zoom: 13,
    isMapInit: false,
    map: null
  }
 
  const [mapState,setMapState]=useState(initialMapState);
  const mapRef =  useRef(null)

  useEffect(() => {
    console.log(mapRef.current)
    setMapState({...mapState, isMapInit: true});
  }, []);
  
  const position = [mapState.lat, mapState.lng];
  return (
    <Map center={position} zoom={mapState.zoom} ref={mapRef} >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {mapState.isMapInit && <Routing map={mapRef.current}/>}
      <Marker position={bus.currentPosition} icon={myBusIcon}>
        <Popup><i className="fa fa-building fa-lg"></i> Bus Plate: {bus.plate}, busName: {bus.busName}</Popup>
        <Tooltip>Tooltip for {bus.plate}</Tooltip>
      </Marker>
    </Map>
  );
}
export default LeafletMap
