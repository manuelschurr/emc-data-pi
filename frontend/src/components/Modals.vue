<template>
    <!-- In this component the configuration of the modals (similar to popups) takes place which are then called for success/error messages -->
    <div id="modals">
        <!-- Modal window to be displayed as a confirmation when the master data has successfully been sent -->
        <modal id="sentModal" name="sentModal">
            <div class="modal-header">
                <h5 class="modal-title">
                    <b>Erfolg!</b>
                </h5>
            </div>
            <div class="modal-body" style="text-align: center; align: center; margin: auto">
                <img src="./images/logo.png" width="30%" style="margin: 8px auto" />
                <h3 style="margin: 13px auto">
                    <b>Patientendaten erfolgreich gesendet!</b>
                </h3>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-block btn-lg btn-secondary" data-dismiss="sentModal" @click="hideSentModal()">Schließen</button>
            </div>
        </modal>
        <!-- Modal window to be displayed as a confirmation when the patient has successfully been finished, shall only be closable via confirmation button -->
        <modal id="finishModal" name="finishModal" v-bind:click-to-close="false">
            <div class="modal-header">
                <h5 class="modal-title">
                    <b>Erfolg!</b>
                </h5>
            </div>
            <div class="modal-body" style="text-align: center; align: center; margin: auto">
                <img src="./images/logo.png" width="30%" style="margin: 8px auto" />
                <h3 style="margin: 13px auto">
                    <b>Patient erfolgreich abgeschlossen!</b>
                </h3>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-lg btn-dark btn-block" onclick="window.location.reload();">Neuer Patient</button>
            </div>
        </modal>
        <!-- Error Modal Window to be displayed when data was not successfully sent or when patient has not successfully been finished -->
        <modal id="errorModal" name="errorModal">
            <div class="modal-header">
                <h5 class="modal-title">
                    <b>Fehler!</b>
                </h5>
            </div>
            <div class="modal-body" style="text-align: center; align: center; margin: auto">
                <h3 style="margin: 25px auto">
                    <b>Aktion nicht erfolgreich. Bitte kontaktieren Sie Ihren Administrator.</b>
                </h3>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-lg btn-dark btn-block" @click="hideErrorModal()">Schließen</button>
            </div>
        </modal>
        <!-- Modal Window to show and confirm screenshot taken -->
        <modal id="screenshotModal" name="screenshotModal">
            <div class="modal-header">
                <h5 class="modal-title">
                    <b>Erfolg!</b>
                </h5>
            </div>
            <div class="modal-body" style="text-align: center; align: center; margin: auto">
                <p style="margin: 25px auto">
                    <b>Bild wurde erfolgreich an den Schockraum gesendet.</b>
                </p>
                <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-block btn-lg btn-secondary" data-dismiss="screenshotModal" v-on:click="hideScreenshotModal()">Schließen</button>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    methods: {
        /**
         * The modals also have to be closed somehow, here: through clicking
         * the corresponding "Schließen" button calling this method
         */
        hideSentModal() {
            this.$modal.hide("sentModal");
        },
        hideErrorModal() {
            this.$modal.hide("errorModal");
        },
        hideScreenshotModal() {
            this.$modal.hide("screenshotModal");
        },
    },
};
</script>