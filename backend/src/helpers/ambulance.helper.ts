import axios from "axios";
import { ambulanceIdentifier, centralServerAddress } from "../config";
import Logger from "../core/Logger";
import Ambulance from "../database/model/Ambulance";
import AmbulanceRepo from "../database/repository/AmbulanceRepo";


export default class AmbulanceHelper {
   // creating the entry for the ambulance information, if there is non existing
   public static async createAmbulanceEntry() {
      // creating the config for the axios-calls
      let axios_ambulance_config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      // check if an ambulance tuple is existing
      let isAmbulanceExisting = AmbulanceRepo.checkIfAmbulanceDataExists();
      Logger.debug(`Checking if ambulance is existing: ${isAmbulanceExisting}`);

      // if an ambulance tuple is not existing, a tuple needs to be created
      // if an ambulance tuple exists, nothing needs to be done
      if (!isAmbulanceExisting) {
         let ambulance = new Ambulance();

         // if an ambulance needs to be created, the next ambulanceId needs to be retrieved
         await axios
            .get(`${centralServerAddress}/ambulance/findNextAmbulanceId`)
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
            .post(`${centralServerAddress}/ambulance/create`, ambulance, axios_ambulance_config)
            .catch(error => {
               Logger.error(error);
            });;
      }
   }
}
