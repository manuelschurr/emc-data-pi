<template>
  <div class="small">
    Puls Oxy
    <puls-oxy-line v-if="loaded" :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import PulsOxyLine from "./pulsOxyLine.vue";
export default {
  name: 'LineChartContainer',
  components: { PulsOxyLine },
  data: () => ({
    loaded: false,
    chartdata: null
  }),
  async mounted () {
    this.loaded = false
    try {
      const { userlist } = await fetch('/api/userlist')
      this.chartdata = userlist
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style>
.small {
  max-width: 700px;
  max-height: 300px;
}
</style>