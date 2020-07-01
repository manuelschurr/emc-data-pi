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
        ETA: 5 min
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
  }
};
</script>