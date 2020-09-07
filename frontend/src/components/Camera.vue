<template>
    <!-- Here Camera and Modal configuration takes place -->
    <div>
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
                <button type="button" id="button_play" class="btn btn-dark btn-lg" v-on:click="capture()" v-if="!screenshotProcessing">
                    <i class="fa fa-camera"></i>
                </button>
                <button type="button" id="button_play" class="btn btn-dark btn-lg" v-if="screenshotProcessing">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
            screenshotProcessing: false,
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
            // Accessing video, making screenshot to canvas and sending it to backend
            this.video = this.$refs.video;
            // setting flag to true to display loading spinner
            this.screenshotProcessing = true;
            // Pausing video until it has been processed for user to see the actual screenshot
            this.video.pause();
            // Dialogue to show when screenshot is being sent (should also show the sent screenshot somehow)
            var screenshotMessage = document.getElementById(
                "screenshotMessage"
            );
            this.canvas = document.createElement("canvas");
            this.canvas.setAttribute("width", "1280");
            this.canvas.setAttribute("height", "840");
            var context = this.canvas.getContext("2d");
            var vm = this;
            context.drawImage(this.video, 0, 0, 1280, 840);
            this.canvas.toBlob(function (blob) {
                const formData = new FormData();
                const time = moment().format("YYYY-MM-DD_HH-mm-ss");
                formData.append("img", blob, `${time}.jpg`);
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
                        // disable processing spinner
                        vm.screenshotProcessing = false;
                        // show success message
                        screenshotMessage.innerHTML =
                            '<strong><p style="color:green">Letzter Screenshot <br> erfolgreich <br> versendet!</p></strong>';
                        // start video again after some time where screenshot can be observed
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
                        // disable processing spinner
                        vm.screenshotProcessing = false;
                        screenshotMessage.innerHTML =
                            '<strong><p style="color:red">Letzter Screenshot <br> nicht erfolgreich <br> versendet!</p></strong>';
                        // start video again after screenshot not being sent
                        vm.video.play();
                        //vm.$modal.show("errorModal");
                    });
            });
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
</style>

