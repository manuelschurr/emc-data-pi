<template>
    <div style="background-color: #fafafa">
        <!-- Header -->
        <div class="container-fluid bg-dark text-white" style="text-align: left">
            <p>
                <b>Patienten-Stammdaten</b>
            </p>
        </div>
        <!-- Main Body -->
        <!-- Left Half of Screen -->
        <form class="text-fields-left">
            <!-- Name Feld -->
            <div id="NameFeld" class="form-group row">
                <label for="text" class="col-2 col-form-label">Name</label>
                <div class="col-10">
                    <div class="input-group">
                        <div class="input-group-prepend"></div>
                        <input v-model="nameOf" type="text" class="form-control" />
                    </div>
                </div>
            </div>

            <!-- Alter Feld -->
            <div class="form-group row">
                <label for="text1" class="col-2 col-form-label">Alter</label>
                <div class="col-2">
                    <input v-model="alter" id="text1" name="text1" type="text" class="form-control" />
                </div>
            </div>

            <!-- Geschlecht Auswahl-Feld -->
            <div class="form-group row">
                <label class="col-2">Geschlecht</label>
                <div class="col-2">
                    <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="geschlecht" value="m" name="radio" id="radio_0" type="radio" class="custom-control-input" />
                        <label for="radio_0" class="custom-control-label">m</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="geschlecht" value="w" name="radio" id="radio_1" type="radio" class="custom-control-input" />
                        <label for="radio_1" class="custom-control-label">w</label>
                    </div>
                </div>
            </div>
            <!-- Vorerkrankung Textfeld -->
            <div class="form-group row">
                <label class="col-2 col-form-label" for>Vorerkrankung</label>
                <div class="col-10">
                    <div class="input-group">
                        <input v-model="vorerkrankung" id name type="text" class="form-control" />
                    </div>
                </div>
            </div>
            <!-- Sonstiges Textarea -->
            <div class="form-group row">
                <label for="textarea" class="col-2 col-form-label labelTop">Sonstiges</label>
                <div class="col-10">
                    <textarea v-model="sonstiges" id="textarea" name="textarea" cols="40" rows="13" class="form-control"></textarea>
                </div>
            </div>
            <!-- Voice Record - Row + Button -->
            <div class="form-group row">
                <label for="Audio" class="col-2 col-form-label labelTop">Audio</label>
                <div class="col-1">
                    <button type="button" id="button_stop" class="btn btn-warning btn-lg">
                        <i class="fa fa-microphone"></i>
                    </button>
                </div>
            </div>
        </form>
        <!-------------------------------------------- Right Middle Half of Screen ----------------------------------------------------->
        <div>
            <!------- Camera Import -------->
            <Camera />
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
                                <div class="input-group-text btn btn-success" type="button" onclick style="background-color: #22bf45; color: white">
                                    <i class="fa fa-check"></i>
                                </div>
                            </div>
                            <input v-model="Ainput" id="A" name="text" placeholder="Text hier eingeben" type="text" class="form-control" />
                            <div class="input-group-append">
                                <div class="input-group-text btn btn-danger" type="button" onclick style="background-color: #C82333; color: white">
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
                                <div class="input-group-text btn btn-success" style="background-color: #22bf45; color: white" type="button" onclick>
                                    <i class="fa fa-check"></i>
                                </div>
                            </div>
                            <input v-model="Binput" id="B" name="text" placeholder="Text hier eingeben" type="text" class="form-control" />
                            <div class="input-group-append">
                                <div class="input-group-text btn btn-danger" style="background-color: #C82333; color: white" type="button" onclick>
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
                                <div class="input-group-text btn btn-success" style="background-color: #22bf45; color: white" type="button" onclick>
                                    <i class="fa fa-check"></i>
                                </div>
                            </div>
                            <input v-model="Cinput" id="C" name="text" placeholder="Text hier eingeben" type="text" class="form-control" />
                            <div class="input-group-append">
                                <div class="input-group-text btn btn-danger" style="background-color: #C82333; color: white" type="button" onclick>
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
                                <div class="input-group-text btn btn-success" style="background-color: #22bf45; color: white" type="button" onclick>
                                    <i class="fa fa-check"></i>
                                </div>
                            </div>
                            <input v-model="Dinput" id="D" name="text" placeholder="Text hier eingeben" type="text" class="form-control" />
                            <div class="input-group-append">
                                <div class="input-group-text btn btn-danger" style="background-color: #C82333; color: white" type="button" onclick>
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
                                <div class="input-group-text btn btn-success" style="background-color: #22bf45; color: white" type="button" onclick>
                                    <i class="fa fa-check"></i>
                                </div>
                            </div>
                            <input v-model="Einput" id="E" name="text" placeholder="Text hier eingeben" type="text" class="form-control" />
                            <div class="input-group-append">
                                <div class="input-group-text btn btn-danger" style="background-color: #C82333; color: white" type="button" onclick>
                                    <i class="fa fa-close"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- loading UI in here then add submit button -->
        <div class="submit-button btn-lg btn-block">
            <button @click="this.submitData" id="SubmitButton" name="submit" type="submit" class="btn btn-success btn-lg btn-block">
                <b>Senden</b>
            </button>
        </div>
        <!-- Logo Uniklinik -->
        <div class="logo">
            <img src="./images/logo.png" class="img-fluid" alt="Logo Uniklinik" />
        </div>
        <!-- Final div -->
    </div>
</template>

<!------------------------------ Script ------------------------------> 
<script>
// Camera import
import Camera from "./Camera.vue";
export default {
    name: "UI",
    components: {
        Camera,
    },
    // return input of text fields
    data() {
        return {
            nameOf: "",
            alter: "",
            geschlecht: "",
            vorerkrankung: "",
            sonstiges: "",
            Ainput: "",
            Binput: "",
            Cinput: "",
            Dinput: "",
            Einput: "",
        };
    },
    methods: {
        /**
         * Methode zum Versenden der Daten an Backend ueber Submit Button
         */
        submitData() {
            console.log(
                "Name " +
                    this.nameOf +
                    " Alter " +
                    this.alter +
                    " Geschlecht " +
                    this.geschlecht +
                    " Vorerkrankung " +
                    this.vorerkrankung +
                    " Sonstiges " +
                    this.sonstiges +
                    " A: " +
                    this.Ainput +
                    " B: " +
                    this.Binput +
                    " C: " +
                    this.Cinput +
                    " D: " +
                    this.Dinput +
                    " E: " +
                    this.Einput
            );
        },
    },
};
</script>

<!------------------------------ Style (scoped limits css to this component only) ------------------------------>
<style scoped>
.text-fields-left {
    float: left;
    width: 50vw;
}

.text-fields-right {
    padding: 1vw;
}

.stream {
    display: inline-block;
}

.logo {
    position: absolute;
    bottom: 0vw;
    left: 1vw;
    width: 7%;
    height: 7%;
}

.submit-button {
    display: inline-block;
    position: relative;
}

/*
.microTextArea {
  position: absolute;
  left: 40vw;
  bottom: 19.3vw;
}
*/
</style>
