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
                        <input v-model="geschlecht" value="M" name="radio" id="radio_0" type="radio" class="custom-control-input" />
                        <label for="radio_0" class="custom-control-label">m</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="geschlecht" value="W" name="radio" id="radio_1" type="radio" class="custom-control-input" />
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
                    <textarea v-model="sonstiges" id="textarea" name="textarea" cols="40" rows="10" class="form-control"></textarea>
                </div>
            </div>
            <!-- Sprachnachricht Audio Import an dieser Stelle -->
            <!-- <Audio /> -->
            <Recording />
        </form>
        <!-------------------------------------------- Right Middle Half of Screen ----------------------------------------------------->
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
                                <button class="input-group-text btn btn-success" type="button" @click="Avalue = true; colorizeRow()" style="background-color: #22bf45; color: white">
                                    <i class="fa fa-check"></i>
                                </button>
                            </div>
                            <input v-model="Ainput" id="ARow" name="text" type="text" class="form-control" />
                            <div class="input-group-append">
                                <button class="input-group-text btn btn-danger" type="button" @click="Avalue = false; colorizeRow()" style="background-color: #C82333; color: white">
                                    <i class="fa fa-close"></i>
                                </button>
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
                                <button class="input-group-text btn btn-success" style="background-color: #22bf45; color: white" type="button" @click="Bvalue = true; colorizeRow()">
                                    <i class="fa fa-check"></i>
                                </button>
                            </div>
                            <input v-model="Binput" id="BRow" name="text" type="text" class="form-control" />
                            <div class="input-group-append">
                                <button class="input-group-text btn btn-danger" style="background-color: #C82333; color: white" type="button" @click="Bvalue = false; colorizeRow()">
                                    <i class="fa fa-close"></i>
                                </button>
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
                                <button class="input-group-text btn btn-success" style="background-color: #22bf45; color: white" type="button" @click="Cvalue = true; colorizeRow()">
                                    <i class="fa fa-check"></i>
                                </button>
                            </div>
                            <input v-model="Cinput" id="CRow" name="text" type="text" class="form-control" />
                            <div class="input-group-append">
                                <button class="input-group-text btn btn-danger" style="background-color: #C82333; color: white" type="button" @click="Cvalue = false; colorizeRow()">
                                    <i class="fa fa-close"></i>
                                </button>
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
                                <button class="input-group-text btn btn-success" style="background-color: #22bf45; color: white" type="button" @click="Dvalue = true; colorizeRow()">
                                    <i class="fa fa-check"></i>
                                </button>
                            </div>
                            <input v-model="Dinput" id="DRow" name="text" type="text" class="form-control" />
                            <div class="input-group-append">
                                <button class="input-group-text btn btn-danger" style="background-color: #C82333; color: white" type="button" @click="Dvalue = false; colorizeRow()">
                                    <i class="fa fa-close"></i>
                                </button>
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
                                <button class="input-group-text btn btn-success" style="background-color: #22bf45; color: white" type="button" @click="Evalue = true; colorizeRow()">
                                    <i class="fa fa-check"></i>
                                </button>
                            </div>
                            <input v-model="Einput" id="ERow" name="text" type="text" class="form-control" />
                            <div class="input-group-append">
                                <button class="input-group-text btn btn-danger" style="background-color: #C82333; color: white" type="button" @click="Evalue = false; colorizeRow()">
                                    <i class="fa fa-close"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- loading UI in here then add submit button -->
        <div id="submitButton" class="submit-button btn-lg btn-block" v-if="!loading">
            <button @click="this.submitData" id="SubmitButton" name="submit" type="submit" class="btn btn-success btn-lg btn-block">
                <b>Senden</b>
            </button>
        </div>
        <!-- Button with Spinner to be shown when data is being processed -->
        <div class="submit-button btn-lg btn-block" v-if="loading">
            <button id="SubmitButton" name="submit" type="submit" class="btn btn-success btn-lg btn-block">
                <span class="spinner-border spinner-border-sm" style="display: inline-block" role="status" aria-hidden="true"></span>
                Daten werden gesendet...
            </button>
        </div>
        <!-- Success Message when data has successfully been sent -->
        <div id="successMsg" v-if="successMsg">
            <p style="color: green">
                <b>Daten erfolgreich gesendet!</b>
            </p>
        </div>
        <!-- Logo Uniklinik - deactivated for now -->
        <!-- <div class="logo">
            <img src="./images/logo.png" class="img-fluid" alt="Logo Uniklinik" />
        </div>-->
        <!-- Final div -->
    </div>
</template>

<!------------------------------ Script ------------------------------> 
<script>
// Camera import
import Camera from "./Camera.vue";
// import Audio from "./Audio.vue";
import Recording from "./Recording.vue";
import axios from "axios";

export default {
    name: "UI",
    components: {
        Camera,
        Recording,
        //Audio,
    },
    // return input of text fields
    data() {
        return {
            // data not loading initially
            loading: false,
            successMsg: false,
            // declare patientId
            patientId: "",
            nameOf: "",
            alter: "",
            geschlecht: "",
            vorerkrankung: "",
            sonstiges: "",
            Avalue: "",
            Ainput: "",
            Bvalue: "",
            Binput: "",
            Cvalue: "",
            Cinput: "",
            Dvalue: "",
            Dinput: "",
            Evalue: "",
            Einput: "",
            isRecording: false,
            // decalre dataObj
            dataObj: "",
        };
    },
    methods: {
        /**
         * Methode zum Versenden der Daten an Backend ueber Submit Button
         */
        submitData() {
            // set loading to true so that spinner is shown
            this.loading = true;
            this.successMsg = false;
            // JSON Objekt aus Data der Textfelder/User Input
            // if patient ID exists, then send it as well to be able to update patients
            if (this.patientId != 0) {
                this.dataObj = {
                    patientId: this.patientId,
                    name: this.nameOf,
                    gender: this.geschlecht,
                    age: this.alter,
                    preExistingIllness: this.vorerkrankung,
                    miscellaneous: this.sonstiges,
                    AIsSelected: this.Avalue,
                    AText: this.Ainput,
                    BIsSelected: this.Bvalue,
                    BText: this.Binput,
                    CIsSelected: this.Cvalue,
                    CText: this.Cinput,
                    DIsSelected: this.Dvalue,
                    DText: this.Dinput,
                    EIsSelected: this.Evalue,
                    EText: this.Einput,
                };
                // JSON Objekt aus Data der Textfelder/User Input
                // if patient ID not existing yet, new patient
            } else {
                this.dataObj = {
                    name: this.nameOf,
                    gender: this.geschlecht,
                    age: this.alter,
                    preExistingIllness: this.vorerkrankung,
                    miscellaneous: this.sonstiges,
                    AIsSelected: this.Avalue,
                    AText: this.Ainput,
                    BIsSelected: this.Bvalue,
                    BText: this.Binput,
                    CIsSelected: this.Cvalue,
                    CText: this.Cinput,
                    DIsSelected: this.Dvalue,
                    DText: this.Dinput,
                    EIsSelected: this.Evalue,
                    EText: this.Einput,
                };
            }
            let dataJSON = JSON.stringify(this.dataObj);
            console.log("Sending " + dataJSON);
            axios({
                method: "post",
                url: "http://localhost:3000/patient/create",
                headers: {
                    "Content-Type": "application/json",
                },
                data: dataJSON,
            })
                .then(function (response) {
                    // var patientID = ..... response vom PI --> die response methode hier setted dann die PatientID, die dann im data return Objekt ist
                    // patientID dann aus dataObj raus und in data (return) Objekt rein
                    // ambulanceID kann komplett raus, wird backend seitig realisiert
                    this.patientId = response.data.data.patient.patientId;
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            // Timer to reset button & display success message when data was sent
            if (dataJSON) {
                setTimeout(() => {
                    this.loading = false;
                    this.successMsg = true;
                }, 2000);
            } else {
                alert("Daten konnten nicht gesendet werden...");
            }
        },
        /**
         * ABCDE Farben
         */
        colorizeRow() {
            if (this.Avalue === true) {
                document.getElementById("ARow").style.backgroundColor =
                    "#22BF45";
                document.getElementById("ARow").style.color = "white";
            } else if (this.Avalue === false) {
                document.getElementById("ARow").style.backgroundColor =
                    "#C82333";
                document.getElementById("ARow").style.color = "white";
            }
            if (this.Bvalue === true) {
                document.getElementById("BRow").style.backgroundColor =
                    "#22BF45";
                document.getElementById("BRow").style.color = "white";
            } else if (this.Bvalue === false) {
                document.getElementById("BRow").style.backgroundColor =
                    "#C82333";
                document.getElementById("BRow").style.color = "white";
            }
            if (this.Cvalue === true) {
                document.getElementById("CRow").style.backgroundColor =
                    "#22BF45";
                document.getElementById("CRow").style.color = "white";
            } else if (this.Cvalue === false) {
                document.getElementById("CRow").style.backgroundColor =
                    "#C82333";
                document.getElementById("CRow").style.color = "white";
            }
            if (this.Dvalue === true) {
                document.getElementById("DRow").style.backgroundColor =
                    "#22BF45";
                document.getElementById("DRow").style.color = "white";
            } else if (this.Dvalue === false) {
                document.getElementById("DRow").style.backgroundColor =
                    "#C82333";
                document.getElementById("DRow").style.color = "white";
            }
            if (this.Evalue === true) {
                document.getElementById("ERow").style.backgroundColor =
                    "#22BF45";
                document.getElementById("ERow").style.color = "white";
            } else if (this.Evalue === false) {
                document.getElementById("ERow").style.backgroundColor =
                    "#C82333";
                document.getElementById("ERow").style.color = "white";
            }
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

/* .logo {
    position: relative;
    bottom: 0vw;
    left: 1vw;
    width: 7%;
    height: 7%;
} */

.submit-button {
    display: inline-block;
    position: relative;
}
.spinner {
    display: inline-block;
    margin: 5px auto;
}

/*
.microTextArea {
  position: absolute;
  left: 40vw;
  bottom: 19.3vw;
}
*/
</style>
