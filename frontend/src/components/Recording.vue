<template>
    <div>
        <!-- Voice Record - Row + Button -->
        <div class="form-group row">
            <label for="Audio" class="col-2 col-form-label labelTop">Audio</label>
            <VueRecordAudio mode="press" @result="onResult" />
            <!-- Container, um die Recordings anzuzeigen -->
            <div id="audio" class="audio" controls></div>
            <!-- Bestätigungsnachricht/Errornachricht -->
            <div id="audioMessage"></div>
            <!-- <div v-if="audioMsg">Audio erfolgreich an Schockraum gesendet!</div> -->
            <!-- <div v-if="!audioMsg">Audio nicht erfolgreich an Schockraum gesendet!</div> -->
            <!-- Recording loeschen Moeglichkeit -->
            <!-- <div v-for="(record, index) in recordings" :key="index" class="recorded-item">
                <button @click="removeRecord(index)" class="button btn-dark">
                    <i class="fa fa-trash"></i>
                </button>
            </div>-->
        </div>
    </div>
</template>

<script>
import moment from "moment";
// Sprachnachricht Funktionalitaet von externer open source library
import Vue from "vue";
import VueRecord from "@codekraft-studio/vue-record";
// REST
import axios from "axios";

Vue.use(VueRecord);
export default {
    data() {
        return {
            audio: [],
            successCounter: 0,
            failCounter: 0,
            // audioMsg: false,
        };
    },
    methods: {
        onResult(data) {
            // console.log("Blob Object " + data);
            // creating Audio Element to display all the audios in UI
            // does not make sense as there is no soundcard in PI --> show success/fail message instead
            // var audio = document.getElementById("audio");
            // var mainaudio = document.createElement("audio");
            // mainaudio.setAttribute("controls", "controls");
            // audio.appendChild(mainaudio);
            // var audioFile = URL.createObjectURL(data);
            // mainaudio.innerHTML =
            //     '<source src="' + audioFile + '" type="audio/webm" />';
            // this.audio.push(audioFile);
            // console.log(mainaudio);
            /**
             * sending audio to PI
             */
            const formData = new FormData();
            const time = moment().format("YYYY-MM-DD_HH-mm-ss");
            formData.append("audio", data, `${time}.webm`);
            var audioMessage = document.getElementById("audioMessage");
            // give audioMessage some distance to button
            audioMessage.setAttribute("style", "padding: 1px;");
            // AudioSpinner
            var audioSpinner = document.createElement("div");
            audioSpinner.setAttribute("class", "d-flex align-items-center");
            audioSpinner.innerHTML =
                '<strong>Sende Audio...</strong><div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>';
            audioMessage.appendChild(audioSpinner);
            console.log("Sending the blob data:", data);
            console.log("Downloadable audio", window.URL.createObjectURL(data));
            var vm = this;
            axios({
                method: "post",
                url: "http://localhost:3000/audio",
                headers: {
                    "Content-Type": "audio/webm",
                    //   "Content-Type": "multipart/form-data",
                },
                data: formData,
            })
                .then(function (response) {
                    console.log(response);
                    // vm.audioMsg = true;
                    vm.successCounter += 1;
                    audioMessage.innerHTML =
                        '<strong><p style="color:green">Audio erfolgreich versendet (Dateien: ' +
                        vm.successCounter +
                        ")</p></strong>";
                })
                .catch(function (error) {
                    console.log(error);
                    vm.failCounter += 1;
                    console.log(vm.failCounter);
                    // vm.audioMsg = false;
                    audioMessage.innerHTML =
                        '<strong><p style="color:red">Audio nicht erfolgreich versendet (Dateien: ' +
                        vm.failCounter +
                        ")</p></strong>";
                });
        },
    },
};
</script>