<template>
  <div class="camera">
    <video autoplay controls class="feed"></video>
    <button class="snap" v-on:click="$emit('takePicture')">
      <b>Screenshot</b>
    </button>
  </div>
</template>

<script>
export default {
  name: "camera",
  methods: {
    init() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          const videoPlayer = document.querySelector("video");
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        });
      } else {
        alert("Cannot...");
      }
    }
  },
  beforeMount() {
    this.init();
  }
};
</script>

<style scoped>
.camera {
  width: 70vw;
  height: 30vh;
  padding: 25px;
  box-sizing: border-box;
}

.feed {
  display: block;
  width: 100%;
  max-width: 1280px;
  box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  background-color: #171717;
}

.snap {
  margin-top: 15px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #8c92ad;
}
</style>