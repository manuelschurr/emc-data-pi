<template>
    <div id="modals">
        <!-- Modal window to be displayed as a confirmation when data has successfully been sent -->
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
        <!-- Modal window to be displayed as a confirmation when patient has successfully been finished, shall only be closable via confirmation button -->
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
    </div>
</template>

<script>
export default {
    methods: {
        /**
         * Method to hide the sent modal when the close button is clicked within
         */
        hideSentModal() {
            this.$modal.hide("sentModal");
        },
    },
};
</script>