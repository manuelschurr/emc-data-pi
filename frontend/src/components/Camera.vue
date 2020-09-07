<template>
    <!-- Here Camera and Modal configuration takes place -->
    <div>
        <!-- Screenshot Modal -->
        <!-- Modal Window to show and confirm screenshot taken -->
        <!-- <modal id="screenshotModal" name="screenshotModal"></modal> -->
        <!-- Video -->
        <div class="videoAndButton">
            <div class="stream">
                <!-- <video ref="video" width="448" height="252" controls poster="../assets/videoIcon2.png"> -->
                <video ref="video" width="448" height="252" poster="../assets/videoIcon2.png">
                    <source="" type="video/mp4" />
                    <p>Ihr Browser verhindert das Abspielen von Video Tags. Sie sollten einen anderen Browser verwenden.</p>
                </video>
            </div>
            <!-- Start and Stop Stream Buttons -->
            <!-- Video Stream Start - Button -->
            <div class="streamButtons">
                <button type="button" id="button_play" class="btn btn-dark btn-lg" v-on:click="capture()" style>
                    <i class="fa fa-camera"></i>
                </button>
                <div class="screenshotMsg" style="position: absolute; right: 10px; top: 30px;">
                    <div id="screenshotMessage"></div>
                </div>
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
                navigator.mediaDevices
                    .getUserMedia({ video: true })
                    .then((stream) => {
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
            // Pausing video until it has been processed for user to see the actual screenshot
            // Accessing video and taking screenshot of it and then POST it to backend
            this.video = this.$refs.video;
            this.video.pause();
            // Dialogue to show when screenshot is being sent (should also show the sent screenshot somehow)
            var screenshotMessage = document.getElementById(
                "screenshotMessage"
            );
            // Test
            var screenshotSpinner = document.createElement("div");
            screenshotSpinner.setAttribute(
                "class",
                "d-flex align-items-center"
            );
            screenshotSpinner.setAttribute("style", "float:left; margin:10px");
            screenshotSpinner.innerHTML =
                '<div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>';
            screenshotMessage.appendChild(screenshotSpinner);
            this.canvas = document.createElement("canvas");
            var context = this.canvas.getContext("2d");
            context.drawImage(this.video, 0, 0, 640, 480);
            // convert it to a usable data URL
            const screenshotURL = this.canvas.toDataURL();
            // new Form Data Object to append to POST to backend
            const formData = new FormData();
            formData.append("img", screenshotURL);
            var vm = this;
            axios({
                method: "post",
                url: "http://localhost:3000/img",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            })
                .then((response) => {
                    console.log(response);
                    // // show success message
                    // vm.$modal.show("screenshotModal");
                    // display success message
                    screenshotSpinner.innerHTML =
                        "Screenshot <br> erfolgreich <br> versendet.";
                    // start video again after some time where screenshot can be observed
                    setTimeout(() => {
                        // still holding video to see screenshot and after 5 seconds playing again
                        vm.video.play();
                        // remove screenshotmessage again then
                        screenshotSpinner.innerHTML = "";
                    }, 5000);
                })
                .catch(function (error) {
                    console.log(error);
                    vm.$modal.show("errorModal");
                    // Unten auskommentieren nachher, Modal reicht hier!
                    // screenshotSpinner.innerHTML =
                    //     "Screenshot <br> nicht <br> versendet.";
                    // hide Spinner again
                    // No screenshot taken, play video again
                    screenshotSpinner.innerHTML = "";
                    vm.video.play();
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

