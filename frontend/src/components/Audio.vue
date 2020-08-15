<template>
    <!-- Voice Record - Row + Button -->
    <div class="form-group row">
        <label for="Audio" class="col-2 col-form-label labelTop">Audio</label>
        <div class="col-1">
            <button @click="recordAudio()" type="button" id="button_record" style="float: left" class="btn btn-warning btn-lg button">
                <i class="fa fa-microphone"></i>
            </button>
            <button @click="stopAudio()" type="button" id="button_stop" class="btn btn-danger btn-lg button">
                <i class="fa fa-stop"></i>
            </button>
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
    data() {
        return {
            recorder: null,
        };
    },
    methods: {
        recordAudio() {
            var device = navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            var items = [];
            device.then((stream) => {
                this.recorder = new MediaRecorder(stream);
                this.recorder.ondataavailable = (e) => {
                    items.push(e.data);
                    if (this.recorder.state == "inactive") {
                        console.log("Recording");
                        var blob = new Blob(items, { type: "audio/webm" });
                        var audio = document.getElementById("audio");
                        var mainaudio = document.createElement("audio");
                        mainaudio.setAttribute("controls", "controls");
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
        stopAudio() {
            this.recorder.stop();
        },
    },
};
</script>