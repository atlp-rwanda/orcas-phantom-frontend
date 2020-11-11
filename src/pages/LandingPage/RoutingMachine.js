import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control(
      {
        waypoints: [L.latLng(-1.943418750146427,30.05729019641876),L.latLng(-1.9587065202047713,30.119042694568634)],
        lineOptions: {styles: [{color: 'blue', weight: 2}],addWaypoints: false},
        draggableWaypoints: false,
        routeWhileDragging: false
      }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
