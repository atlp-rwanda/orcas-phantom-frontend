import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control(
      
      {lineOptions : {
        styles: [
          {color: 'black', opacity: 0.15, weight: 9},
          {color: 'white', opacity: 0.8, weight: 6},
          {color: 'green', opacity: 1, weight: 2}
        ]
      }},
      
      {
        waypoints: [L.latLng(-1.943418750146427,30.05729019641876),
          L.latLng(-1.9407648885051247,30.059945583343506)]
      }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
