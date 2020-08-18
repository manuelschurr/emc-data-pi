<template>
    <div>
        <!-- Voice Record - Row + Button -->
        <div class="form-group row">
            <label for="Audio" class="col-2 col-form-label labelTop">Audio</label>
            <VueRecordAudio mode="press" @result="onResult" />
            <!-- Container, um die Recordings anzuzeigen -->
            <div id="audio" class="audio" controls></div>
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
// Sprachnachricht Funktionalitaet
import Vue from "vue";
import VueRecord from "@codekraft-studio/vue-record";
// REST
import axios from "axios";

Vue.use(VueRecord);
export default {
    data() {
        return {
            audio: [],
        };
    },
    methods: {
        onResult(data) {
            var audio = document.getElementById("audio");
            var mainaudio = document.createElement("audio");
            mainaudio.setAttribute("controls", "controls");
            audio.appendChild(mainaudio);
            var audioFile = URL.createObjectURL(data);
            mainaudio.innerHTML =
                '<source src="' + audioFile + '" type="audio/webm" />';
            this.audio.push(data);
            /**
             * sending audio to PI
             */
            console.log("Sending the blob data:", data);
            console.log("Downloadable audio", window.URL.createObjectURL(data));
            axios({
                method: "post",
                url: "http://localhost:3000/audio",
                headers: {
                    "Content-Type": "audio/webm",
                },
                data: this.audio,
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // removeRecord(index) {
        //     this.recordings.splice(index, 1);
        //     // mainaudio.innerHTML =
        //     //     '<source src="' +
        //     //     URL.createObjectURL(data) +
        //     //     '" type="audio/webm" />';
        //     console.log("index removed");
        // },
    },
};
</script>