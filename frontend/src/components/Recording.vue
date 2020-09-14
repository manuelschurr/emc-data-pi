<template>
  <!-- This component handels the Audio -->
  <div>
    <!-- Voice Record - Row + Button -->
    <div class="form-group row">
      <label for="Audio" class="col-2 col-form-label labelTop">Audio</label>
      <VueRecordAudio mode="press" @result="onResult" />
      <!-- Container, where audio files can be stored -->
      <div id="audio" class="audio" controls></div>
      <!-- Container for success/error message -->
      <div id="audioMessage"></div>
    </div>
  </div>
</template>

<script>
// moment import for proper naming of files with timestamd
import moment from "moment";
// Voice message is of an external library: "@codekraft-studio/vue-record"
import Vue from "vue";
import VueRecord from "@codekraft-studio/vue-record";
Vue.use(VueRecord);
// axios import for REST
import axios from "axios";

export default {
  data() {
    // component-wide definition of variables that are accessed throughout the component's runtime
    return {
      audio: [],
      successCounter: 0,
      failCounter: 0,
    };
  },
  // patientId is hand over by the UI component and further on used here as well
  props: { patientId: Number },
  methods: {
    /**
     * this method instanciates the voice message as a blob and sends it to the backend via POST
     */
    onResult(data) {
      /**
       * sending audio to PI via the form data object containing
       */
      var vm = this;
      const formData = new FormData();
      const time = moment().format("YYYY-MM-DD_HH-mm-ss");
      const patId = vm.patientId ? vm.patientId : 0;
      // creating form data object containing the audio blob to be sent to backend
      formData.append("audio", data, `${patId}-${time}.webm`);
      var audioMessage = document.getElementById("audioMessage");
      // give audioMessage some distance to button
      audioMessage.setAttribute("style", "padding: 1px;");
      // setting up the audioSpinner to show that the sending of the audio message is processed
      var audioSpinner = document.createElement("div");
      audioSpinner.setAttribute("class", "d-flex align-items-center");
      audioSpinner.innerHTML =
        '<strong>Sende Audio...</strong><div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>';
      audioMessage.appendChild(audioSpinner);
      console.log("Sending the blob data:", data);
      console.log("Downloadable audio", window.URL.createObjectURL(data));
      // POSTing the audio to the backend
      axios({
        method: "post",
        url: "http://localhost:3000/audio",
        headers: {
          "Content-Type": "audio/webm",
        },
        data: formData,
      })
        .then(function (response) {
          console.log(response);
          // on success, displaying success message with number of files successfully sent
          vm.successCounter += 1;
          audioMessage.innerHTML =
            '<strong><p style="color:green">Audio erfolgreich versendet (Dateien: ' +
            vm.successCounter +
            ")</p></strong>";
        })
        .catch(function (error) {
          console.log(error);
          // on error, displaying error message with number of files not successfully sent
          vm.failCounter += 1;
          audioMessage.innerHTML =
            '<strong><p style="color:red">Audio nicht erfolgreich versendet (Dateien: ' +
            vm.failCounter +
            ")</p></strong>";
        });
    },
  },
};
</script>