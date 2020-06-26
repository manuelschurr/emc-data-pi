<template>
  <l-map :zoom="zoom" :center="center" style="height: 850px;">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerUMM">
      <l-tooltip :options="{ permanent: true, interactive: true }">
            UMM
        </l-tooltip>
    </l-marker>
    <l-marker :lat-lng="markerPatient">
      <l-tooltip :options="{ permanent: true, interactive: true }">
            Patient
        </l-tooltip>
    </l-marker>
  </l-map>
</template>

<script>
//Leaflet components
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  data() {
    return {
      zoom: 13,
      center: L.latLng(49.4874592, 8.4660395),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerUMM: L.latLng(49.49237, 8.48751),
      markerPatient: L.latLng(49.4874592, 8.4660395)
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  }
};
</script>
