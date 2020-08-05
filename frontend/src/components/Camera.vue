<template>
    <div>
        <!-- Video -->
        <div class="stream">
            <video width="320" height="180" controls poster="../assets/videoIcon2.png">
                <source="" type="video/mp4" />
                <p>Ihr Browser verhindert das Abspielen von Video Tags. Sie sollten einen anderen Browser verwenden.</p>
            </video>
        </div>
        <!-- Start and Stop Stream Buttons -->
        <!-- Video Stream Start - Button -->
        <div class="streamButtons">
            <button type="button" id="button_play" class="btn btn-primary btn-lg" onclick="buttonPlayPress()" style="margin-right: 0.5vw">
                <i class="fa fa-video-camera"></i>
            </button>
            <!-- Video Stream Pause - Button -->
            <button type="button" id="button_stop" class="btn btn-danger btn-lg" onclick="buttonStopPress()">
                <i class="fa fa-stop"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
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
                alert("Cannot...");
            }
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

