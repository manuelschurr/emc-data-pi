<template>
  <div>
    <!-- Header -->
    <div class="container-fluid bg-dark text-white">
      <p>
        <b>Patienten-Stammdaten</b>
      </p>
    </div>
    <!-- Main Body -->
    <!-- Left Half of Screen -->
    <form class="text-fields-left">
      <!-- Name Feld -->
      <div class="form-group row">
        <label for="text" class="col-2 col-form-label">Name</label>
        <div class="col-10">
          <div class="input-group">
            <div class="input-group-prepend"></div>
            <input id="text" name="text" type="text" class="form-control" />
          </div>
        </div>
      </div>

      <!-- Alter Feld -->
      <div class="form-group row">
        <label for="text1" class="col-2 col-form-label">Alter</label>
        <div class="col-2">
          <input id="text1" name="text1" type="text" class="form-control" />
        </div>
      </div>

      <!-- Geschlecht Auswahl-Feld -->
      <div class="form-group row">
        <label class="col-2">Geschlecht</label>
        <div class="col-2">
          <div class="custom-control custom-radio custom-control-inline">
            <input name="radio" id="radio_0" type="radio" class="custom-control-input" value />
            <label for="radio_0" class="custom-control-label">m</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input name="radio" id="radio_1" type="radio" class="custom-control-input" value />
            <label for="radio_1" class="custom-control-label">w</label>
          </div>
        </div>
      </div>
      <!-- Vorerkrankung Textfeld -->
      <div class="form-group row">
        <label class="col-2 col-form-label" for>Vorerkrankung</label>
        <div class="col-10">
          <div class="input-group">
            <input id name type="text" class="form-control" />
            <div class="input-group-append">
              <div class="input-group-text">
                <!-- Microphone Button -->
                <i class="fa fa-microphone"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Sonstiges Textarea -->
      <div class="form-group row">
        <label for="textarea" class="col-2 col-form-label">Sonstiges</label>
        <div class="col-10">
          <textarea id="textarea" name="textarea" cols="40" rows="10" class="form-control"></textarea>
        </div>
      </div>
    </form>
    <!-- Right Middle Half of Screen -->
    <div>
      <!-- Video Placeholder -->
      <div class="stream">
        <img src="./images/videoIcon.png" class="img-fluid" alt="Video Placeholder Image" />
      </div>
      <!-- ABCDE Schema -->
      <div class="text-fields-right">
        <!-- A -->
        <div class="form-group row">
          <label class="col-1 col-form-label" for="text">
            <b>A</b>
          </label>
          <div class="col-11">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text" style="background-color: #22bf45">
                  <i class="fa fa-check"></i>
                </div>
              </div>
              <input
                id="text"
                name="text"
                placeholder="Text hier eingeben"
                type="text"
                class="form-control"
              />
              <div class="input-group-append">
                <div class="input-group-text" style="background-color: #C82333">
                  <i class="fa fa-close"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- B -->
        <div class="form-group row">
          <label class="col-1 col-form-label" for="text">
            <b>B</b>
          </label>
          <div class="col-11">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text" style="background-color: #22bf45">
                  <i class="fa fa-check"></i>
                </div>
              </div>
              <input
                id="text"
                name="text"
                placeholder="Text hier eingeben"
                type="text"
                class="form-control"
              />
              <div class="input-group-append">
                <div class="input-group-text" style="background-color: #C82333">
                  <i class="fa fa-close"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- C -->
        <div class="form-group row">
          <label class="col-1 col-form-label" for="text">
            <b>C</b>
          </label>
          <div class="col-11">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text" style="background-color: #22bf45">
                  <i class="fa fa-check"></i>
                </div>
              </div>
              <input
                id="text"
                name="text"
                placeholder="Text hier eingeben"
                type="text"
                class="form-control"
              />
              <div class="input-group-append">
                <div class="input-group-text" style="background-color: #C82333">
                  <i class="fa fa-close"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- D -->
        <div class="form-group row">
          <label class="col-1 col-form-label" for="text">
            <b>D</b>
          </label>
          <div class="col-11">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text" style="background-color: #22bf45">
                  <i class="fa fa-check"></i>
                </div>
              </div>
              <input
                id="text"
                name="text"
                placeholder="Text hier eingeben"
                type="text"
                class="form-control"
              />
              <div class="input-group-append">
                <div class="input-group-text" style="background-color: #C82333">
                  <i class="fa fa-close"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- E -->
        <div class="form-group row">
          <label class="col-1 col-form-label" for="text">
            <b>E</b>
          </label>
          <div class="col-11">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text" style="background-color: #22bf45">
                  <i class="fa fa-check"></i>
                </div>
              </div>
              <input
                id="text"
                name="text"
                placeholder="Text hier eingeben"
                type="text"
                class="form-control"
              />
              <div class="input-group-append">
                <div class="input-group-text" style="background-color: #C82333">
                  <i class="fa fa-close"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Logo Uniklinik -->
    <div class="logo">
      <img src="./images/logo.png" class="img-fluid" alt="Logo Uniklinik" />
    </div>
    <!-- Submit Button -->
    <div class="submit-button btn-lg btn-block">
      <button name="submit" type="submit" class="btn btn-success btn-lg btn-block">
        <b>Senden</b>
      </button>
    </div>
    <!-- Final div -->
  </div>
</template>

<!------------------------------ Script ------------------------------> 
<script>
export default {
  name: "UI"
};
</script>

<!------------------------------ Style (scoped limits css to this component only) ------------------------------>
<style scoped>
.text-fields-left {
  float: left;
  width: 50vw;
}

.text-fields-right {
  padding: 2vw;
  float: top;
}

.stream {
  display: inline-block;
  width: 17%;
  margin: 0 auto;
  position: relative;
}

.logo {
  display: inline-block;
  position: absolute;
  bottom: 0vw;
  left: 1vw;
  width: 10%;
  height: 10%;
}

.submit-button {
  display: inline-block;
  position: relative;
}
</style>
