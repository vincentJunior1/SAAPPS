<template>
  <div class="maps">
    <h1>Page Maps</h1>
    <GmapMap
      :center="coordinate"
      :zoom="10"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :position="coordinate"
        :clickable="true"
        :draggable="true"
        @click="clickMarker"
        icon="https://img.icons8.com/color/48/000000/map-pin.png"
      />
    </GmapMap>
  </div>
</template>
<script>
export default {
  name: 'Maps',
  data() {
    return {
      coordinate: {
        lat: 10,
        lng: 10
      }
    }
  },
  created() {
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      })
      .catch(error => {
        alert(error)
      })
  },
  methods: {
    clickMarker(position) {
      console.log('clicked marker')
      console.log(position)
      console.log(position.latLng.lat())
      console.log(position.latLng.lng())
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
    }
  }
}
</script>
