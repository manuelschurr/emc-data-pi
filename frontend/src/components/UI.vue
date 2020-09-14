<template>
  <!-- This component contains the main UI and loads in some of the other components being then used here  -->
  <div id="rtwForm">
    <!-- Header -->
    <div class="container-fluid bg-dark text-white" style="text-align: left">
      <p>
        <b>Patienten-Stammdaten</b>
      </p>
    </div>
    <!-- Main Body -->
    <!-------------------------------------------- Left Half of the Screen ----------------------------------------------------->
    <form class="text-fields-left" id="left-text-fields">
      <!-- "Name" field -->
      <div id="NameFeld" class="form-group row labelLeft">
        <label for="text" class="col-2 col-form-label">Name</label>
        <div class="col-10">
          <div class="input-group">
            <div class="input-group-prepend"></div>
            <input id="nameInput" v-model="nameOf" type="text" class="form-control" />
          </div>
        </div>
      </div>

      <!-- "Alter" field -->
      <div class="form-group row labelLeft">
        <label for="text1" class="col-2 col-form-label">Alter</label>
        <div class="col-2">
          <input v-model="alter" id="text1" name="text1" type="text" class="form-control" />
        </div>
      </div>

      <!-- "Geschlecht" selection field -->
      <div class="form-group row labelLeft">
        <label class="col-2">Geschlecht</label>
        <div class="col-2">
          <div class="custom-control custom-radio custom-control-inline">
            <input
              v-model="geschlecht"
              value="M"
              name="radio"
              id="radio_0"
              type="radio"
              class="custom-control-input"
            />
            <label for="radio_0" class="custom-control-label">m</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input
              v-model="geschlecht"
              value="W"
              name="radio"
              id="radio_1"
              type="radio"
              class="custom-control-input"
            />
            <label for="radio_1" class="custom-control-label">w</label>
          </div>
        </div>
      </div>
      <!-- "Vorerkrankung" field -->
      <div class="form-group row labelLeft">
        <label class="col-2 col-form-label" for>Vorerkrankung</label>
        <div class="col-10">
          <div class="input-group">
            <input v-model="vorerkrankung" id name type="text" class="form-control" />
          </div>
        </div>
      </div>
      <!-- "Sonstiges" text area -->
      <div class="form-group row labelLeft">
        <label for="textarea" class="col-2 col-form-label labelTop">Sonstiges</label>
        <div class="col-10">
          <textarea
            v-model="sonstiges"
            id="textarea"
            name="textarea"
            cols="40"
            rows="14"
            class="form-control"
          ></textarea>
        </div>
      </div>
      <!------- Voice message recording import binding the patientId to the taken audios -------->
      <Recording :patientId="this.patientId" />
    </form>
    <!-------------------------------------------- Right Half of the Screen ----------------------------------------------------->
    <div>
      <!------- Camera import binding the patientId to the taken images -------->
      <Camera :patientId="this.patientId" />
      <!-- ABCDE Scheme -->
      <form class="text-fields-right" id="right-text-fields" autocomplete="off">
        <!------------------- A ---------------------->
        <div class="form-group row">
          <label class="col-1 col-form-label" for="text">
            <b>A</b>
          </label>
          <div class="col-11">
            <div class="input-group">
              <div class="input-group-prepend">
                <button
                  class="input-group-text btn btn-success"
                  type="button"
                  @click="
                    Avalue = true;
                    colorizeRow();
                  "
                  style="background-color: #22bf45; color: white"
                >
                  <i class="fa fa-check"></i>
                </button>
              </div>
              <input v-model="Ainput" id="ARow" name="text" type="text" class="form-control" />
              <div class="input-group-append">
                <button
                  class="input-group-text btn btn-danger"
                  type="button"
                  @click="
                    Avalue = false;
                    colorizeRow();
                  "
                  style="background-color: #C82333; color: white"
                >
                  <i class="fa fa-close"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!------------------- B ---------------------->
        <div class="form-group row">
          <label class="col-1 col-form-label" for="text">
            <b>B</b>
          </label>
          <div class="col-11">
            <div class="input-group">
              <div class="input-group-prepend">
                <button
                  class="input-group-text btn btn-success"
                  style="background-color: #22bf45; color: white"
                  type="button"
                  @click="
                    Bvalue = true;
                    colorizeRow();
                  "
                >
                  <i class="fa fa-check"></i>
                </button>
              </div>
              <input v-model="Binput" id="BRow" name="text" type="text" class="form-control" />
              <div class="input-group-append">
                <button
                  class="input-group-text btn btn-danger"
                  style="background-color: #C82333; color: white"
                  type="button"
                  @click="
                    Bvalue = false;
                    colorizeRow();
                  "
                >
                  <i class="fa fa-close"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!------------------- C ---------------------->
        <div class="form-group row">
          <label class="col-1 col-form-label" for="text">
            <b>C</b>
          </label>
          <div class="col-11">
            <div class="input-group">
              <div class="input-group-prepend">
                <button
                  class="input-group-text btn btn-success"
                  style="background-color: #22bf45; color: white"
                  type="button"
                  @click="
                    Cvalue = true;
                    colorizeRow();
                  "
                >
                  <i class="fa fa-check"></i>
                </button>
              </div>
              <input v-model="Cinput" id="CRow" name="text" type="text" class="form-control" />
              <div class="input-group-append">
                <button
                  class="input-group-text btn btn-danger"
                  style="background-color: #C82333; color: white"
                  type="button"
                  @click="
                    Cvalue = false;
                    colorizeRow();
                  "
                >
                  <i class="fa fa-close"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!------------------- D ---------------------->
        <div class="form-group row">
          <label class="col-1 col-form-label" for="text">
            <b>D</b>
          </label>
          <div class="col-11">
            <div class="input-group">
              <div class="input-group-prepend">
                <button
                  class="input-group-text btn btn-success"
                  style="background-color: #22bf45; color: white"
                  type="button"
                  @click="
                    Dvalue = true;
                    colorizeRow();
                  "
                >
                  <i class="fa fa-check"></i>
                </button>
              </div>
              <input v-model="Dinput" id="DRow" name="text" type="text" class="form-control" />
              <div class="input-group-append">
                <button
                  class="input-group-text btn btn-danger"
                  style="background-color: #C82333; color: white"
                  type="button"
                  @click="
                    Dvalue = false;
                    colorizeRow();
                  "
                >
                  <i class="fa fa-close"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!------------------- E ---------------------->
        <div class="form-group row">
          <label class="col-1 col-form-label" for="text">
            <b>E</b>
          </label>
          <div class="col-11">
            <div class="input-group">
              <div class="input-group-prepend">
                <button
                  class="input-group-text btn btn-success"
                  style="background-color: #22bf45; color: white"
                  type="button"
                  @click="
                    Evalue = true;
                    colorizeRow();
                  "
                >
                  <i class="fa fa-check"></i>
                </button>
              </div>
              <input v-model="Einput" id="ERow" name="text" type="text" class="form-control" />
              <div class="input-group-append">
                <button
                  class="input-group-text btn btn-danger"
                  style="background-color: #C82333; color: white"
                  type="button"
                  @click="
                    Evalue = false;
                    colorizeRow();
                  "
                >
                  <i class="fa fa-close"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- Bootstrap Button Group to display submit & finish buttons next to each other and at bottom of screen -->
    <div class="btn-group confirmButtons fixed-bottom" style="margin:10px auto" role="group">
      <!-- Submit button being sent when no data is being processed-->
      <div id="submitButton" class="submit-button btn-lg btn-block" v-if="!loading">
        <button
          @click="this.manualSubmitData"
          id="SubmitButton"
          name="submit"
          type="submit"
          class="btn btn-success btn-lg btn-block"
        >
          <b>Senden</b>
        </button>
      </div>
      <!-- Submit button with spinner to indicate when data is being processed -->
      <div class="submit-button btn-lg btn-block" v-if="loading">
        <button
          id="SubmitButton"
          name="submit"
          type="submit"
          class="btn btn-success btn-lg btn-block"
        >
          <span
            id="btnMsg"
            class="spinner-border spinner-border-sm"
            style="display: inline-block"
            role="status"
            aria-hidden="true"
          ></span>
          Daten werden gesendet...
        </button>
      </div>
      <!-- "Patient abschließen" button - finish button when no data is being processed-->
      <div id="finishButton" class="finish-button btn-lg btn-block" v-if="!finishing">
        <button
          @click="this.finishPatient"
          id="finishButton"
          name="submit"
          type="reset"
          class="btn btn-danger btn-lg btn-block"
        >
          <b>Patient abschließen / Neuer Patient</b>
        </button>
      </div>
      <!-- Finish button with spinner indicating when data is being processed -->
      <div class="finish-button btn-lg btn-block" v-if="finishing">
        <button
          id="finishButton"
          name="finish"
          type="submit"
          class="btn btn-danger btn-lg btn-block"
        >
          <span
            id="btnMsg"
            class="spinner-border spinner-border-sm"
            style="display: inline-block"
            role="status"
            aria-hidden="true"
          ></span>
          Patient wird abgeschlossen...
        </button>
      </div>
    </div>
    <!-- Logo Uniklinik - deactivated for now -->
    <!-- <div class="logo">
            <img src="../assets/logo.png" class="img-fluid" alt="Logo Uniklinik" />
    </div>-->
  </div>
</template>

<!------------------------------ Script ------------------------------> 
<script>
// Camera and Recording components import
import Camera from "./Camera.vue";
import Recording from "./Recording.vue";
// axios import for REST API
import axios from "axios";

export default {
  name: "UI",
  // imported components are loaded here
  components: {
    Camera,
    Recording,
  },
  // component-wide definition of variables that are accessed throughout the component's runtime
  data() {
    return {
      submitted: false,
      // flag indicating that data is being sent when active
      loading: false,
      // flag indicating that patient is being finished when active
      finishing: false,
      // declare patientId
      patientId: 0,
      nameOf: "",
      alter: "",
      geschlecht: "",
      vorerkrankung: "",
      sonstiges: "",
      Avalue: null,
      Ainput: "",
      Bvalue: null,
      Binput: "",
      Cvalue: null,
      Cinput: "",
      Dvalue: null,
      Dinput: "",
      Evalue: null,
      Einput: "",
      isRecording: false,
      // declare dataObj
      dataObj: "",
      // submit: false,
      // finish: false,
    };
  },
  /**
   * On mount the patient ID is retreived
   */
  created() {
    // axios get on patientID
    var vm = this;
    axios({
      method: "get",
      url: "http://localhost:3000/patient/findNextPatientId",
    })
      .then((response) => {
        console.log(response);
        vm.patientId = response.data.data;
        console.log(`patientId: ${vm.patientId}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  // Watcher to make sure changed data is automatically transmitted every 10 seconds
  watch: {
    submitted: {
      handler() {
        console.log("watcher: " + this.submitted);
        if (this.submitted) {
          this.interval = setInterval(() => {
            this.submitData(false);
          }, 10000);
        } else {
          clearInterval(this.interval);
        }
      },
    },
  },
  methods: {
    /**
     * Manually submitting data: loading submit data with parameter true
     */
    manualSubmitData() {
      this.submitData(true);
    },
    /**
     * Method submitting the data to the backend
     */
    submitData(manual) {
      // set loading to true so that loading spinner is shown
      this.loading = true;
      // Data object where all the required data is set to be then submitted
      this.dataObj = {
        patientId: this.patientId,
        name: this.nameOf,
        gender: this.geschlecht,
        age: parseInt(this.alter === "" ? 0 : this.alter),
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
      // data is submitted in JSON format
      let dataJSON = JSON.stringify(this.dataObj);
      var vm = this;
      console.log("Sending " + dataJSON);
      // POST of the data object to backend
      axios({
        method: "post",
        url: "http://localhost:3000/patient/create",
        headers: {
          "Content-Type": "application/json",
        },
        data: dataJSON,
      })
        .then((response) => {
          vm.patientId = response.data.data.patient.patientId;
          console.log(response);
          vm.loading = false;
          // modals must only be shown when there is a manual user interaction to send the data
          if (manual) {
            vm.$modal.show("sentModal");
          }
          vm.submitted = true;
        })
        .catch(function (error) {
          console.log(error);
          vm.loading = false;
          // modals must only be shown when there is a manual user interaction to send the data
          if (manual) {
            vm.$modal.show("errorModal");
          }
        });
    },
    /**
     * Finishing the patient, i.e. sending all the data to backend and clearing all the input fields
     */
    finishPatient() {
      // set finishing flag to true
      this.finishing = true;
      // data object containing all the data to be sent
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
      // sending data as JSON
      let dataJSON = JSON.stringify(this.dataObj);
      console.log("Abgeschlossenes JSON Obj " + dataJSON);
      var vm = this;
      // axios POSt to backend
      axios({
        method: "post",
        url: "http://localhost:3000/patient/finish",
        headers: {
          "Content-Type": "application/json",
        },
        data: dataJSON,
      })
        .then((response) => {
          console.log(response);
          // set finish flag to true when patient was finished successfully
          vm.finishing = false;
          // displaying finish modal then
          vm.$modal.show("finishModal");
          vm.submitted = false;
        })
        .catch(function (error) {
          // set finish flag to false when patient was not finished successfully
          vm.finishing = false;
          // displaying error modal then
          vm.$modal.show("errorModal");
          console.log(error);
        });
    },
    /**
     * Seting the colors of the rows of the ABCDE-scheme depending on whether
     * good (green) or bad (red) in the corresponding rows has been pressed
     */
    colorizeRow() {
      if (this.Avalue === true) {
        document.getElementById("ARow").style.backgroundColor = "#22BF45";
        document.getElementById("ARow").style.color = "white";
      } else if (this.Avalue === false) {
        document.getElementById("ARow").style.backgroundColor = "#C82333";
        document.getElementById("ARow").style.color = "white";
      }
      if (this.Bvalue === true) {
        document.getElementById("BRow").style.backgroundColor = "#22BF45";
        document.getElementById("BRow").style.color = "white";
      } else if (this.Bvalue === false) {
        document.getElementById("BRow").style.backgroundColor = "#C82333";
        document.getElementById("BRow").style.color = "white";
      }
      if (this.Cvalue === true) {
        document.getElementById("CRow").style.backgroundColor = "#22BF45";
        document.getElementById("CRow").style.color = "white";
      } else if (this.Cvalue === false) {
        document.getElementById("CRow").style.backgroundColor = "#C82333";
        document.getElementById("CRow").style.color = "white";
      }
      if (this.Dvalue === true) {
        document.getElementById("DRow").style.backgroundColor = "#22BF45";
        document.getElementById("DRow").style.color = "white";
      } else if (this.Dvalue === false) {
        document.getElementById("DRow").style.backgroundColor = "#C82333";
        document.getElementById("DRow").style.color = "white";
      }
      if (this.Evalue === true) {
        document.getElementById("ERow").style.backgroundColor = "#22BF45";
        document.getElementById("ERow").style.color = "white";
      } else if (this.Evalue === false) {
        document.getElementById("ERow").style.backgroundColor = "#C82333";
        document.getElementById("ERow").style.color = "white";
      }
    },
  },
};
</script>

<!------------------------------ Style (scoped limits css to this component only) ------------------------------>
<style scoped>
#rtwForm {
  height: 100%;
}
.labelLeft {
  padding-left: 10px;
}
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

/* logo is deactivated for now
.logo {
    position: relative;
    bottom: 0vw;
    left: 1vw;
    width: 7%;
    height: 7%;
} */

.submit-button {
  width: 50vw;
  position: absolute;
  bottom: 1%;
}
.finish-button {
  width: 50vw;
  position: absolute;
  bottom: 1%;
  left: 50vw;
}
</style>
