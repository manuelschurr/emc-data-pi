<template>
  <div>
    <b-container fluid>
      <b-row align-h="start">
        <b-col>
          Patient Data
        </b-col>
      </b-row>
      <b-row align-h="start">
        <b-col cols="10">
          <b-form inline>
            <b-col align-self="start">
              <b-form-group
                id="name-group-1"
                label="Name:"
                label-for="patientName"
              >
                {{ patient.name }}
              </b-form-group>

              <b-form-group
                id="geschlecht-group-2"
                label="Geschlecht:"
                label-for="patientGeschlecht"
              >
                {{ patient.gender }}
              </b-form-group>
              <b-form-group
                id="age-group-3"
                label="Alter:"
                label-for="patientAlter"
              >
                {{ patient.dateOfBirth }}
              </b-form-group>
              <b-form-group
                id="vorerkrankungen-group-4"
                label="Vorerkrankungen:"
                label-for="patientVorerkrankungen"
              >
                {{ patient.preExistingIllness.text }}
              </b-form-group>
            </b-col>
            <b-col align-self="start" cols="8">
              <b-form-group
                id="sonstiges-group-5"
                label="Sonstiges:"
                label-for="patientSonstiges"
              >
                <b-form-textarea
                  id="textarea-plaintext"
                  plaintext
                  :value="patient.miscellaneaous.text"
                  rows="4"
                  no-resize
                  style="width:300%"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form>
        </b-col>
        <b-col cols="2">
          <b-button-group>
            <b-button
              @click="openABCDE(patient.status.a.notes, $event)"
              id="btn-a"
              :class="classABCDE(patient.status.a.isSelected)"
            >
              A</b-button
            >
            <b-button
              @click="openABCDE(patient.status.b.notes, $event)"
              id="btn-b"
              :class="classABCDE(patient.status.b.isSelected)"
              >B</b-button
            >
            <b-button
              @click="openABCDE(patient.status.c.notes, $event)"
              id="btn-c"
              :class="classABCDE(patient.status.c.isSelected)"
              >C</b-button
            >
            <b-button
              @click="openABCDE(patient.status.d.notes, $event)"
              id="btn-d"
              :class="classABCDE(patient.status.d.isSelected)"
              >D</b-button
            >
            <b-button
              @click="openABCDE(patient.status.e.notes, $event)"
              id="btn-e"
              :class="classABCDE(patient.status.e.isSelected)"
              >E</b-button
            >
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
      patient: {
        rtwId: 123,
        name: "Test Name",
        dateOfBirth: "15.01.20",
        gender: "Test Geschlecht",
        preExistingIllness: {
          text: "Diabetis"
        },
        miscellaneaous: {
          text:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        },
        status: {
          a: {
            isSelected: true,
            notes: "Notes zu A"
          },
          b: {
            isSelected: false,
            notes: "Notes zu B"
          },
          c: {
            isSelected: true,
            notes: "Notes zu C"
          },
          d: {
            isSelected: false,
            notes: "Notes zu D"
          },
          e: {
            isSelected: false,
            notes: "Notes zu E"
          }
        }
      },
      showABCDE: false,
      pastEvent: null
    };
  },
  methods: {
    openABCDE(output, event) {
      if (!this.showABCDE || event.currentTarget.id !== this.pastEvent) {
        this.$root.$emit("textABCDE", output);
        this.showABCDE = true;
        this.pastEvent = event.currentTarget.id;
      } else if (event.currentTarget.id == this.pastEvent) {
        this.$root.$emit("textABCDE", "");
        this.showABCDE = false;
        this.pastEvent = event.currentTarget.id;
      }
    },
    classABCDE(status) {
      let classABCDE = "";
      if (status) {
        classABCDE = "notOkABCDE";
      } else {
        classABCDE = "okABCDE";
      }
      return classABCDE;
    }
  }
};
</script>

<style scoped>
.okABCDE {
  background-color: lightgreen;
}
.notOkABCDE {
  background-color: red;
}
.space {
  padding-right: 15px;
}
</style>
