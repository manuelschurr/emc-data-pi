import axios from "axios";
import { ambulanceIdentifier, centralServerAddress } from "../config";
import AxiosBaseConfig from "../core/AxiosConfig";
import Logger from "../core/Logger";
import Ambulance from "../database/model/Ambulance";
import AmbulanceRepo from "../database/repository/AmbulanceRepo";
import PatientRepo from "../database/repository/PatientRepo";


export default class AmbulanceHelper {
   // creating the entry for the ambulance information, if there is non existing
   public static async createAmbulanceEntry() {
      // check if an ambulance tuple is existing
      let isAmbulanceExisting = AmbulanceRepo.checkIfAmbulanceDataExists();
      Logger.debug(`Checking if ambulance is existing: ${isAmbulanceExisting}`);

      // if an ambulance tuple is not existing, a tuple needs to be created
      // if an ambulance tuple exists, the ambulance information will be resetted
      // (because the application could have experienced an unexpected shutdown)
      if (!isAmbulanceExisting) {
         let ambulance = new Ambulance();

         // if an ambulance needs to be created, the next ambulanceId needs to be retrieved
         await axios
            .get(`${centralServerAddress}/ambulance/findNextAmbulanceId`, await AxiosBaseConfig.getInstance())
            .then(response => {
               ambulance.ambulanceId = response.data.data;
            })
            .catch(error => {
               Logger.error(error);
            });

         // default values
         ambulance.identifier = ambulanceIdentifier;
         ambulance.patientId = 0;

         // with the new information an ambulance tuple can be created locally
         Logger.debug("Ambulance will be created: " + JSON.stringify(ambulance));
         AmbulanceRepo.insertAmbulance(ambulance);

         // the new ambulance information needs to be sent to the central server (with a POST request)
         axios
            .post(`${centralServerAddress}/ambulance/create`, ambulance, await AxiosBaseConfig.getInstance())
            .catch(error => {
               Logger.error(error);
            });;
      }
      else {
         // get the local ambulance and set the patientId to 0 (= no patient is transported in the ambulance)
         let ambulance = AmbulanceRepo.queryAmbulance();
         ambulance.patientId = 0;

         // update the ambulance locally
         Logger.debug("Ambulance will be updated: " + JSON.stringify(ambulance));
         AmbulanceRepo.updateAmbulance(ambulance);

         // update the ambulance information in the central server (with a PUT request)
         await axios
            .put(`${centralServerAddress}/ambulance/update/${ambulance.ambulanceId}`, ambulance, await AxiosBaseConfig.getInstance())
            .catch(error => {
               Logger.error(error);
            });
      }

      // update the patient information
      let patient = PatientRepo.queryLatestActivePatient();

      if (patient) {
         patient.ambulanceId = 0;

         // update the patient locally
         Logger.debug("Patient will be updated: " + JSON.stringify(patient));
         PatientRepo.updatePatient(patient);

         // sending a PUT request to the central server with axios to update the old patient
         await axios
            .put(`${centralServerAddress}/patient/update/${patient.patientId}`, patient, await AxiosBaseConfig.getInstance())
            .catch(error => {
               Logger.error(error);
            });
      }
   }
}
