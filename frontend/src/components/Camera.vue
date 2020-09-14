<template>
  <!-- In this component the camera configuration takes place, also the modals are being imported for further processing -->
  <div>
    <!-- Video Element -->
    <div class="videoAndButton">
      <div class="stream">
        <video ref="video" width="448" height="252" poster="../assets/videoIcon3.png">
          <source="" type="video/mp4" />
          <!-- Show this message, in case the video cannot be played -->
          <p>Ihr Browser verhindert das Abspielen von Video Tags. Sie sollten einen anderen Browser verwenden.</p>
        </video>
      </div>
      <!-- Camera Buttons -->
      <div class="streamButtons" style="text-align: center;">
        <!-- Camera Start - Button -->
        <button
          type="button"
          id="button_start"
          style="margin: 10px;padding: 20px 30px;font-size: 20px; border-radius: 10px;"
          class="btn btn-success btn-xl"
          v-on:click="init()"
          v-if="!cameraRunning"
        >
          <i class="fa fa-play"></i>
        </button>
        <!-- Camera Stop - Button -->
        <button
          type="button"
          id="button_stop"
          style="margin: 10px;padding: 20px 30px;font-size: 20px; border-radius: 10px;"
          class="btn btn-danger btn-lg"
          v-on:click="deactivteCam()"
          v-if="cameraRunning"
        >
          <i class="fa fa-stop"></i>
        </button>
        <!-- Screenshot Button -->
        <button
          type="button"
          id="button_play"
          style="margin: 10px;padding: 20px 30px;font-size: 20px; border-radius: 10px;"
          class="btn btn-dark btn-lg"
          v-on:click="capture()"
          v-if="!screenshotProcessing"
        >
          <i class="fa fa-camera"></i>
        </button>
        <!-- Spinner indicating when a screenshot is being processed -->
        <button
          type="button"
          id="button_play"
          style="margin: 10px;padding: 20px 30px;font-size: 20px; border-radius: 10px;"
          class="btn btn-dark btn-lg"
          v-if="screenshotProcessing"
        >
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>
        <!-- Screenshot message indicating whether screenshot was sent successfully or not -->
        <div class="screenshotMsg" style="position: absolute; right: 10px; top: 30px;">
          <div id="screenshotMessage"></div>
        </div>
      </div>
      <!-- usage of imported modal component -->
      <Modals />
    </div>
  </div>
</template>

<script>
// axios import for requests to backend/server
import axios from "axios";
// importing and using librariers for modal windows
import Vue from "vue";
import VModal from "vue-js-modal";
import Modals from "./Modals.vue";
Vue.use(VModal);
// moment import for proper naming of files with timestamd
import moment from "moment";
export default {
  components: {
    Modals,
  },
  data() {
    // component-wide definition of variables that are accessed throughout the component's runtime
    return {
      video: {},
      canvas: {},
      captures: [],
      screenshotProcessing: false,
      successCounter: 0,
      failCounter: 0,
      cameraRunning: false,
    };
  },
  // patientId is hand over by the UI component and further on used here as well
  props: { patientId: Number },
  methods: {
    /**
     * Method to start the camera
     */
    init() {
      // set cameraRunning flag to true, as the camera is now running
      this.cameraRunning = true;
      // create JSON object to make PUT request to backend where the flag is then set as well
      var videoFlag = JSON.stringify({ isVideoRunning: true });
      // boolean flag isVideoRunning to true and PUT to backend
      axios({
        method: "put",
        url: "http://localhost:3000/ambulance/changeGnss",
        headers: {
          "Content-Type": "application/json",
        },
        data: videoFlag,
      })
        .then((response) => {
          console.log("VideoRunning PUT: " + response);
        })
        .catch(function (error) {
          console.log("VideoRunning PUT: " + error);
        });
      // starting video context
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
     * Method to turn off the camera
     */
    deactivteCam() {
      // pick video element of template
      const video = document.querySelector("video");
      // A video's MediaStream object is available through its srcObject attribute
      const mediaStream = video.srcObject;
      // Through the MediaStream, one can get the MediaStreamTracks with getTracks():
      const tracks = mediaStream.getTracks();
      // Tracks are returned as an array which can be stopped like this
      tracks[0].stop();
      // Or alternatively all can be stopped like this
      tracks.forEach((track) => track.stop());
      // set cameraRunning flag to false, as camera has been turned off
      this.cameraRunning = false;
      // axios PUT video not running anymore
      var videoFlag = JSON.stringify({ isVideoRunning: false });
      // boolean flag isVideoRunning to false as video now not runnign anymore and PUT to backend
      axios({
        method: "put",
        url: "http://localhost:3000/ambulance/changeGnss",
        headers: {
          "Content-Type": "application/json",
        },
        data: videoFlag,
      })
        .then((response) => {
          console.log("VideoRunning PUT: " + response);
        })
        .catch(function (error) {
          console.log("VideoRunning PUT: " + error);
        });
    },

    /**
     * Method to capture the content of the video on click of button
     * and to store it in backend to further process it to trauma-room
     */
    capture() {
      // can only capture a photo if the camera is actually running
      if (this.cameraRunning === true) {
        // Accessing video, making screenshot to canvas and sending it to backend
        this.video = this.$refs.video;
        // setting flag to true to display loading spinner
        this.screenshotProcessing = true;
        // Pausing video until it has been processed for the user to see the actual screenshot for some time
        this.video.pause();
        // Dialogue to show when screenshot is being sent/has not been sent
        var screenshotMessage = document.getElementById("screenshotMessage");
        // creation of a canvas context to draw the screenshot on it
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width", "1180");
        this.canvas.setAttribute("height", "840");
        var context = this.canvas.getContext("2d");
        context.drawImage(this.video, 0, 0, 1180, 840);
        var vm = this;
        // convertion of binary screenshot data to blob for further processing
        this.canvas.toBlob(function (blob) {
          // naming of image consists of patientId + timestamp
          const patId = vm.patientId ? vm.patientId : 0;
          const formData = new FormData();
          const time = moment().format("YYYY-MM-DD_HH-mm-ss");
          formData.append("img", blob, `${patId}-${time}.jpg`);
          // the form data object containing the image is send to the backend via POST
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
              // increment successCounter indicating that one more file is successfully sent
              vm.successCounter += 1;
              // disable processing spinner by setting the flag to false
              vm.screenshotProcessing = false;
              // show success message when there is a response from POST
              screenshotMessage.innerHTML =
                '<strong><p style="color:green">Bild <br> erfolgreich <br> versendet <br> (Dateien: ' +
                vm.successCounter +
                " )</p></strong>";
              // start video again only after some time during which the actual screenshot can be observed
              setTimeout(() => {
                // still holding video to see screenshot and after 5 seconds playing again
                vm.video.play();
                // remove screenshotmessage again then
                //screenshotMessage.innerHTML = "";
              }, 5000);
              //vm.$modal.show("screenshotModal");
            })
            .catch(function (error) {
              console.log(error);
              // increment failCounter indicating that one more file has not been successfully sent
              vm.failCounter += 1;
              // disable processing spinner
              vm.screenshotProcessing = false;
              // displaying error message
              screenshotMessage.innerHTML =
                '<strong><p style="color:red">Letzter Screenshot <br> nicht erfolgreich <br> versendet <br> (Dateien: ' +
                vm.failCounter +
                " )</p></strong>";
              // start video again after screenshot not being sent
              vm.video.play();
            });
        });
      }
      // if the camera is not running no screenshot can be taken
      else {
        alert(
          "Kamera läuft nicht. Bitte die Kamera einschalten, um Bilder zu machen!"
        );
      }
    },
  },
};
</script>

<style scoped>
/* styling properties */
.stream {
  display: inline-block;
}
</style>

