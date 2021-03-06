<template>
  <div>
    <div v-if="lat && lng">
      <GmapMap
        :center="{ lat: lat, lng: lng }"
        :zoom="12"
        :style="{ width: width, height: height }"
      >
        <GmapMarker :position="{ lat: lat, lng: lng }" />
      </GmapMap>
      <v-layout row>
        <v-spacer></v-spacer>
        <span class="subheading">{{ lat }} / {{ lng }}</span>
      </v-layout>
    </div>
    <div v-else class="Map not available, no coordinates."></div>
  </div>
</template>

<script>
export default {
  name: "MapSingleMarker",
  props: {
    lat: {
      type: Number,
      default: null,
    },
    lng: {
      type: Number,
      default: null,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
};
</script>
