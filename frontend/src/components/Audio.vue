<template>
    <!-- This component is currently not being used - ignore this here, this is just a manual setup of the voice message feature, but instead, we are using @codekraft-studio/vue-record! -->
    <!-- Voice Record - Row -->
    <div class="form-group row">
        <label for="Audio" class="col-2 col-form-label labelTop">Audio</label>
        <div class="col-1">
            <!-- Voice Record - Button that runs the recording method when being clicked -->
            <button @click="recordAudio()" type="button" id="button_record" style="float: left" class="btn btn-warning btn-lg button">
                <!-- Font Awesome Icon exemplifying the recording button -->
                <i class="fa fa-microphone"></i>
            </button>
            <!-- Voice Stop - Button that runs the stop recording method when being clicked -->
            <button @click="stopAudio()" type="button" id="button_stop" class="btn btn-danger btn-lg button">
                <!-- Font Awesome Icon exemplifying the stopping button -->
                <i class="fa fa-stop"></i>
            </button>
            <!-- Audio Element -->
            <div id="audio" class="audio" controls>
                <!-- <audio controls src="./audios/sample.mp3" type="audio/*">
                    <p>Ihr Browser unterstützt keine Audio-Tags, bitte einen moderneren Browser verwenden.</p>
                </audio>-->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // globally initializing the recorder
    data() {
        return {
            recorder: null,
        };
    },
    methods: {
        /**
         * this method accesses the microphone and starts to record from it
         */
        recordAudio() {
            // setting up microphone context
            var device = navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            // Array to push each audio file into
            var items = [];
            // starting microphone context
            device.then((stream) => {
                this.recorder = new MediaRecorder(stream);
                this.recorder.ondataavailable = (e) => {
                    // pushing each audio file into array
                    items.push(e.data);
                    if (this.recorder.state == "inactive") {
                        // making an audio blob for further processing
                        var blob = new Blob(items, { type: "audio/webm" });
                        // creating an audio element that is appended in the html template
                        var audio = document.getElementById("audio");
                        var mainaudio = document.createElement("audio");
                        mainaudio.setAttribute("controls", "controls");
                        // appending the recorded audio as child of the audio element to be displayed
                        audio.appendChild(mainaudio);
                        mainaudio.innerHTML =
                            '<source src="' +
                            URL.createObjectURL(blob) +
                            '" type="audio/webm" />';
                    }
                };
                this.recorder.start();
            });
        },
        /**
         * this method stops the recording context
         */
        stopAudio() {
            this.recorder.stop();
        },
    },
};
</script>