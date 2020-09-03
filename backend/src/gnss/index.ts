import axios from "axios";
import GPS from "gps";
import { centralServerAddress } from "../config";
import { HttpsAgent } from "../core/HttpsAgent";
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

// config for the post request
const axios_gnss_config = {
   headers: {
      'Content-Type': 'application/json'
   },
   httpsAgent: HttpsAgent
};

// GPSListener updated by SerialPortParser
gpsListener.on("data", data => {
   // if the ambulanceId could not be read, the data cannot be used
   // ambulance information needs to be retrieved again
   if (typeof ambulance === 'undefined' || typeof ambulance.ambulanceId === 'undefined' || ambulance.ambulanceId === null) {
      Logger.warn("Could not retrieve ambulance information. Query will be run again.");
      ambulance = AmbulanceRepo.queryAmbulance();
   }
   else {
      // all information needed is in the data record with the type 'GGA'
      if (data.type == "GGA") {
         // the quality of the record is != null, if a connection is established
         if (data.quality != null) {
            var gnss = JSON.stringify({ "ambulanceId": ambulance.ambulanceId, "timestamp": new Date(), "longitude": data.lon, "latitude": data.lat });
            Logger.debug(gnss);

            // send data to central server
            axios.post(`${centralServerAddress}/ambulance/createGnss`, gnss, axios_gnss_config);
         }
         // the quality of the record is null, if a connection is not established
         else {
            Logger.error("GNSS connection is not established - cannot retrieve GPS data");
         }
      }
   }
});

// gets the (raw) data from the SerialPort and passes it to the GPSListener
parser.on("data", (data: string) => {
   try {
      gpsListener.update(data);
   } catch (error) {
      Logger.error(error);
   }
});
