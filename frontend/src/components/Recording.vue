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
            // audioMsg: false,
        };
    },
    methods: {
        onResult(data) {
            var audio = document.getElementById("audio");
            var mainaudio = document.createElement("audio");
            var vm = this;
            // if audio array is empty, display this recording and fill array with it
            if (this.audio.length === 0) {
                mainaudio.setAttribute("controls", "controls");
                audio.appendChild(mainaudio);
                var audioFile = URL.createObjectURL(data);
                mainaudio.innerHTML =
                    '<source src="' + audioFile + '" type="audio/webm" />';
                this.audio.push(audioFile);
                console.log(mainaudio);
            }
            // if audio array is not empty, clear it and fill array with current recording and display it
            else {
                // empty array
                vm.audio = [];
                // empty mainaudio.innerHTML
                audio.innerHTML = "";
                console.log(mainaudio);
                // repeat above steps
                mainaudio.setAttribute("controls", "controls");
                audio.appendChild(mainaudio);
                audioFile = URL.createObjectURL(data);
                mainaudio.innerHTML =
                    '<source src="' + audioFile + '" type="audio/webm" />';
                this.audio.push(audioFile);
            }
            //this.audio.push(data);
            //this.audio.push(audioFile);
            /**
             * sending audio to PI
             */
            const formData = new FormData();
            formData.append("audio", audioFile);
            // var vm = this;
            var audioMessage = document.getElementById("audioMessage");
            // Test
            var audioSpinner = document.createElement("div");
            audioSpinner.setAttribute("class", "d-flex align-items-center");
            audioSpinner.innerHTML =
                '<strong>Sende Audio...</strong><div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>';
            audioMessage.appendChild(audioSpinner);
            console.log("Sending the blob data:", data);
            console.log("Downloadable audio", window.URL.createObjectURL(data));
            axios({
                method: "post",
                url: "https://localhost:3000/audio",
                headers: {
                    "Content-Type": "audio/webm",
                },
                data: formData,
            })
                .then(function (response) {
                    console.log(response);
                    // vm.audioMsg = true;
                    audioMessage.innerHTML =
                        '<strong><p style="color:green">Audio versendet!</p></strong>';
                })
                .catch(function (error) {
                    console.log(error);
                    // vm.audioMsg = false;
                    audioMessage.innerHTML =
                        '<strong><p style="color:red">Audio nicht versendet!</p></strong>';
                });
        },
    },
};
</script>