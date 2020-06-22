<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="1"> <b>Patient Data</b></b-col>
        <b-col cols="7">
          <b-form inline>
            <b-col align-self="start">
              <b-form-group
                id="name-group-1"
                label="Name:"
                label-for="patientName"
              >
                Test Name
              </b-form-group>

              <b-form-group
                id="geschlecht-group-2"
                label="Geschlecht:"
                label-for="patientGeschlecht"
              >
                Test Geschlecht
              </b-form-group>
              <b-form-group
                id="age-group-3"
                label="Alter:"
                label-for="patientAlter"
              >
                Test Alter
              </b-form-group>
              <b-form-group
                id="vorerkrankungen-group-4"
                label="Vorerkrankungen:"
                label-for="patientVorerkrankungen"
              >
                Test Vorerkrankungen
              </b-form-group>
            </b-col>
            <b-col align-self="start">
              <b-form-group
                id="sonstiges-group-5"
                label="Sonstiges:"
                label-for="patientSonstiges"
              >
                <b-form-textarea
                  id="textarea-plaintext"
                  plaintext
                  :value="patientSonstiges"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form>
        </b-col>
        <b-col cols="3">
          <b-button-group>
            <b-button @click="openABCDE('a')">A</b-button>
            <b-button @click="openABCDE('b')">B</b-button>
            <b-button @click="openABCDE('c')">C</b-button>
            <b-button @click="openABCDE('d')">D</b-button>
            <b-button @click="openABCDE('e')">E</b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patientSonstiges:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    };
  },
  methods: {
    openABCDE(output) {
      this.$root.$emit("textABCDE", output);
    }
  }
};
</script>
