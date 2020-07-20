<template>
  <div>
    Puls Oxy
    <br />Puls
    <puls-oxy-line class="small" v-if="loaded" :chart-data="pulseData" :chart-labels="pulseLabels" />
    <br />SpO2
    <puls-oxy-line class="small" v-if="loaded" :chart-data="spo2Data" :chart-labels="spo2Labels" />
  </div>
</template>

<script>
import PulsOxyLine from "./pulsOxyLine.vue";
// import io from "socket.io-client";
// var socket = io.connect("http://localhost:4000");
export default {
  name: "LineChartContainer",
  components: { PulsOxyLine },
  data() {
    return {
      loaded: false,
      pulseData: [],
      pulseLabels: [], 
      spo2Data: [],
      spo2Labels: [],   
  }},
  mounted() {
    this.fillData()
  },
  created() {
    // this.getRealtimeData()
  },
  methods: {
    fillData() {
      //  this.pulseData = response.data.pulseData.map(download => download.pulseData)
      //  this.pulseLabels = response.data.pulseData.map(download => download.day)
      this.pulseData = ['68', '89', '81']
      this.pulseLabels = ['2017-05-13', '2017-05-14', '2017-05-15']
      this.spo2Data = ['99', '95', '101']
      this.spo2Labels = ['2017-05-13', '2017-05-14', '2017-05-15']
      this.loaded = true
      // this.chartdata = {
      //   datasets: [
      //     {
      //       label: "Puls",
      //       backgroundColor: "#1A73E8",
      //       data: [fetchedData]
      //     },
      //     {
      //       label: "SpO2",
      //       backgroundColor: "#2b7518",
      //       data: [fetchedData]          }
      //   ]
      // };
    },
    getRealtimeData() {
      // socket.on("newdata", fetchedData => {
      //   this.fillData(fetchedData)
      // })
    },
  },
  // async mounted () {
  //   this.loaded = false
  //   try {
  //     const { userlist } = await fetch('/api/userlist')
  //     this.chartdata = userlist
  //     this.loaded = true
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
};
</script>

<style>
.small {
  max-width: 600px;
  max-height: 220px;
}
</style>
