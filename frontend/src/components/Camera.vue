<template>
  <!-- Here Camera and Modal configuration takes place -->
  <div>
    <!-- Screenshot Modal -->
    <!-- Modal Window to show and confirm screenshot taken -->
    <!-- <modal id="screenshotModal" name="screenshotModal"></modal> -->
    <!-- Video -->
    <div class="videoAndButton">
      <div class="stream">
        <video ref="video" width="640" height="320" poster="../assets/videoIcon2.png">
          <source="" type="video/mp4" />
          <p>Ihr Browser verhindert das Abspielen von Video Tags. Sie sollten einen anderen Browser verwenden.</p>
        </video>
      </div>
      <!-- Start and Stop Stream Buttons -->
      <!-- Video Stream Start - Button -->
      <div class="streamButtons">
        <button
          type="button"
          id="button_play"
          class="btn btn-dark btn-lg"
          v-on:click="capture()"
          style="margin-right: 0.5vw"
        >
          <i class="fa fa-camera"></i>
        </button>
        <!-- Video Stream Pause - Button -->
        <!-- <button type="button" id="button_stop" class="btn btn-danger btn-lg" onclick="buttonStopPress()">
                <i class="fa fa-stop"></i>
        </button>-->
      </div>
      <Modals />
    </div>
  </div>
</template>

<script>
import axios from "axios";
// importing and using lib for modal windows
import Vue from "vue";
import VModal from "vue-js-modal";
import moment from "moment";
Vue.use(VModal);
//Vue.use(VModal, { dynamicDefault: { draggable: true, resizable: true } });
import Modals from "./Modals.vue";
export default {
  components: {
    Modals,
  },
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
    };
  },
  methods: {
    init() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          const videoPlayer = document.querySelector("video");
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        });
      } else {
        alert("Video abspielen nicht möglich...");
      }
    },
    /**
     * Method to capture content of video on click of button
     * and to store it in backend to further process it to trauma-room
     */
    capture() {
      this.video = this.$refs.video;
      this.canvas = document.createElement("canvas");
      this.canvas.setAttribute("width", "1280");
      this.canvas.setAttribute("height", "840");
      var context = this.canvas.getContext("2d");
      context.drawImage(this.video, 0, 0, 1280, 840);
      this.canvas.toBlob(function (blob) {
        const formData = new FormData();
        const time = moment().format("YYYY-MM-DD_HH-mm-ss");
        formData.append("img", blob, `${time}.jpg`);
        var vm = this;
        axios({
          method: "post",
          url: "http://localhost:3000/img",
          headers: {
            "content-type": "multipart/form-data",
          },
          data: formData,
        })
          .then((response) => {
            console.log(response);
            // show success message
            vm.$modal.show("screenshotModal");
          })
          .catch(function (error) {
            console.log(error);
            vm.$modal.show("errorModal");
          });
      });

      // this.canvas = this.$refs.canvas;
      // this.captures.push(this.canvas.toDataURL("image/png"));
      // this.$root.$emit("selectScreenshots", this.captures);
      // this.$modal.show("screenshotModal");
      // this.$modal.show(
      //     {
      //         template: `<div class="modal-header">
      //     <h5 class="modal-title">
      //         <b>Erfolg!</b>
      //     </h5>
      // </div>
      // <div class="modal-body" style="text-align: center; align: center; margin: auto">
      //     <p style="margin: 25px auto">
      //         <b>Bild wurde erfolgreich an den Schockraum gesendet.</b>
      //     </p>
      //     <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
      // </div>
      // <div class="modal-footer">
      //     <button type="button" class="btn btn-block btn-lg btn-secondary" data-dismiss="screenshotModal" v-on:click="hideScreenshotModal()">Schließen</button>
      // </div>`,
      //     },
      //     {
      //         height: "auto",
      //     }
      // );
    },
  },
  beforeMount() {
    this.init();
  },
};
</script>

<style scoped>
.stream {
  display: inline-block;
}
/*
.camera {
  width: 100vw;
  height: 100vh;
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
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #21282e;
}
*/
</style>

