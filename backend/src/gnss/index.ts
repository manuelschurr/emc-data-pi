import axios from "axios";
import GPS from "gps";
import { centralServerAddress } from "../config";
import AxiosBaseConfig from "../core/AxiosConfig";
import Logger from "../core/Logger";
import AmbulanceRepo from "../database/repository/AmbulanceRepo";

// normally import ... from "..." is used for the modules
// however, the serialport module does not seem to provide the needed declaration
// that's why require() is used (which lacks the compilation checking)
// import SerialPort from 'serialport';
const SerialPort = require("serialport");

// import SerialPortParser from "@serialport/parser-readline";
// the import above is not working because of the following error:
// Could not find a declaration file for module '@serialport/parser-readline'. 
// Try `npm install @types/serialport__parser-readline`
// However the npm install can not find the type - that's why require() is used
const SerialPortParser = require("@serialport/parser-readline");

// SerialPort needs to point to the GNSS module
const port = new SerialPort("/dev/ttyS0", { baudRate: 115200 });

// GPSListener needed to read the NMEA sentence sent by the module
const gpsListener = new GPS();

// SerialPortParser needed to retrieve data from the module
const parser = port.pipe(new SerialPortParser());

// query ambulance information - ambulanceId needed
var ambulance = AmbulanceRepo.queryAmbulance();

// turn the process on/off, currently depending on the usage of the camera
var isGnssEnabled = true;

// GPSListener updated by SerialPortParser
gpsListener.on("data", async data => {
   // if the ambulanceId could not be read, the data cannot be used
   // ambulance information needs to be retrieved again
   // may only occur during the very first startup of the application
   if (typeof ambulance === 'undefined' || typeof ambulance.ambulanceId === 'undefined' || ambulance.ambulanceId === null) {
      Logger.warn("Could not retrieve ambulance information. Query will be run again.");
      ambulance = AmbulanceRepo.queryAmbulance();
   }
   else {
      // all information needed is in the data record with the type 'GGA'
      if (data.type == "GGA") {
         // checking the quality of the GNSS record, data is only sent if quality is sufficient
         if (checkGnssRecord(data)) {
            var gnss = JSON.stringify({ "ambulanceId": ambulance.ambulanceId, "timestamp": new Date(), "longitude": data.lon, "latitude": data.lat });
            Logger.debug(gnss);

            // send data to central server
            axios.post(`${centralServerAddress}/ambulance/createGnss`, gnss, await AxiosBaseConfig.getInstance());
         }
         // if quality of GNSS is not sufficient, notify via Logger
         else {
            Logger.warn("Quality of GNSS record is not sufficient");
         }
      }
   }
});

// gets the (raw) data from the SerialPort and passes it to the GPSListener
parser.on("data", (data: string) => {
   if (isGnssEnabled) {
      try {
         gpsListener.update(data);
      } catch (error) {
         Logger.error(error);
      }
   }
});

/**
* This method is used to assure the quality of the GNSS data.
* The following criteria needs to be fulfilled:
* - quality of data record needs to be != null
* - Latitude in degrees has to be between -90 and +90
* - Longitude in degrees has to be between -180 and +180
*/
function checkGnssRecord(data: any) : boolean {
   return data.quality != null &&
   ( data.lat < 90 && data.lat > -90) &&
   ( data.lon < 180 && data.lon > -180);
}

/**
* The GNSS device can be enabled/disabled with this function.
* True = enabled, false = disabled
*/
export function setIsGnssEnabled(gnssToggle : boolean) {
   isGnssEnabled = gnssToggle;
}
