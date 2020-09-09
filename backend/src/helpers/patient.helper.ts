import axios from "axios";
import { centralServerAddress } from "../config";
import AxiosBaseConfig from "../core/AxiosConfig";
import Logger from "../core/Logger";
import Patient from "../database/model/Patient";
import AmbulanceRepo from "../database/repository/AmbulanceRepo";
import PatientRepo from "../database/repository/PatientRepo";

export default class PatientHelper {
   public static async createOrUpdatePatientInformation(patient: Patient) {
      // call function to check if patient data exists locally (in sqlite database)
      let isPatientExisting = PatientRepo.checkIfPatientDataExists(patient.patientId);
      Logger.debug(`Checking if patient is existing: ${isPatientExisting}`);

      // it does not matter if the patient is created or updated - the ambulance is getting an update
      // creating an ambulance object with the information stored locally
      let ambulance = AmbulanceRepo.queryAmbulance();
      Logger.debug("Querying ambulance information: " + JSON.stringify(ambulance));

      // setting the ambulanceId to know in which ambulance the patient is transported
      patient.ambulanceId = ambulance.ambulanceId;

      // if a patient exists, then call update function
      if (isPatientExisting) {
         // updating the patient tuple locally
         Logger.debug("Patient will be updated: " + JSON.stringify(patient));
         PatientRepo.updatePatient(patient);

         // sending a PUT request to the central server with axios
         axios
            .put(`${centralServerAddress}/patient/update/${patient.patientId}`, patient, AxiosBaseConfig.getInstance())
            .catch(error => {
               Logger.error(error);
            });
      }
      // if isPatientExisting is false, a patient tuple needs to be created
      else {
         // if a patient needs to be created, the next patientId needs to be retrieved
         await axios
            .get(`${centralServerAddress}/patient/findNextPatientId`, AxiosBaseConfig.getInstance())
            .then(response => {
               patient.patientId = response.data.data;
            })
            .catch(error => {
               Logger.error(error);
            });

         // with the new information a patient tuple can be created locally
         Logger.debug("Patient will be created: " + JSON.stringify(patient));
         PatientRepo.insertPatient(patient);

         // the new patient needs to be sent to the central server (with a POST request)
         axios
            .post(`${centralServerAddress}/patient/create`, patient, AxiosBaseConfig.getInstance())
            .catch(error => {
               Logger.error(error);
            });;
      }

      // setting the patientId to know who is transported in this ambulance
      ambulance.patientId = patient.patientId;

      // update the ambulance locally
      Logger.debug("Ambulance will be updated: " + JSON.stringify(ambulance));
      AmbulanceRepo.updateAmbulance(ambulance);

      // sending a PUT request to the central server with axios
      axios
         .put(`${centralServerAddress}/ambulance/update/${ambulance.ambulanceId}`, ambulance, AxiosBaseConfig.getInstance())
         .catch(error => {
            Logger.error(error);
         });
   }

   public static async finishPatient(patient: Patient) {
      // get the local ambulance and set the patientId to 0 (= no patient is transported in the ambulance)
      let ambulance = AmbulanceRepo.queryAmbulance();
      ambulance.patientId = 0;

      // explicitly setting the ambulanceId
      patient.ambulanceId = 0;

      // updating the patient tuple locally
      Logger.debug("Patient will be updated: " + JSON.stringify(patient));
      PatientRepo.updatePatient(patient);

      // sending a PUT request to the central server with axios
      await axios
         .put(`${centralServerAddress}/patient/update/${patient.patientId}`, patient, AxiosBaseConfig.getInstance())
         .catch(error => {
            Logger.error(error);
         });

      // update the ambulance locally
      Logger.debug("Ambulance will be updated: " + JSON.stringify(ambulance));
      AmbulanceRepo.updateAmbulance(ambulance);

      // sending a PUT request to the central server with axios
      await axios
         .put(`${centralServerAddress}/ambulance/update/${ambulance.ambulanceId}`, ambulance, AxiosBaseConfig.getInstance())
         .catch(error => {
            Logger.error(error);
         });
   }
}
