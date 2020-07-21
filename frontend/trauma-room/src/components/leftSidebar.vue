<template>
  <div>
    <div class="btn-group-vertical" role="group">
      <button
        @click="setSelection($event)"
        id="btn-puls"
        class="btn btn-secondary"
      >
        Puls Oxy <br />
        Puls: 192 <br />
        SpO2: 98
      </button>
      <button
        @click="setSelection($event)"
        id="btn-stream"
        class="btn btn-secondary"
      >
        Live Bild
      </button>
      <button
        @click="setSelection($event)"
        id="btn-position"
        class="btn btn-secondary"
      >
        Position <br />
        ETA: {{ arrivalTime ? arrivalTime : "-" | secToTime }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showComponent: false,
      pastEvent: null,
      selection: []
    };
  },
  props: {
    arrivalTime: Number
  },
  methods: {
    setSelection(event) {
      if (!this.showComponent || event.currentTarget.id !== this.pastEvent) {
        //this.selection.push(event.currentTarget.id);
        this.$root.$emit("selectedComponent", event.currentTarget.id);
        this.showComponent = true;
        this.pastEvent = event.currentTarget.id;
      } else if (event.currentTarget.id == this.pastEvent) {
        this.$root.$emit("selectedComponent", null);
        this.showComponent = false;
        this.pastEvent = event.currentTarget.id;
      }
    }
  },
  filters: {
    secToTime: function(value) {
      var seconds = Math.floor(value % 60).toString();
      var minutes = Math.floor(value / 60).toString();
      if (seconds.length === 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    }
  }
};
</script>