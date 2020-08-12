// Importing from Modules
import axios, { AxiosRequestConfig } from 'axios';
import GPS from "gps";
import { centralServerAddress } from '../config';
import Logger from "../core/Logger";
import DateTime from "../helpers/dateTime";

// normally we do import ... from '...'
// however, the serialport module does not seem to provide this
// that's why we need to do some classical const ... = require('...')
// import SerialPort from 'serialport';
const SerialPort = require("serialport");

// import SerialPortParser from "@serialport/parser-readline";
// the import above is not working because of the following error:
// Could not find a declaration file for module '@serialport/parser-readline'. 
// Try `npm install @types/serialport__parser-readline`
// However the npm install can not find the type - that's why we are using the require here
const SerialPortParser = require("@serialport/parser-readline");

// SerialPort needs to point to the GNSS module
const port = new SerialPort("/dev/ttyS0", {baudRate: 115200});
// GPSListener needed to read the NMEA sentence sent by the module
const gpsListener = new GPS();
// SerialPortParser needed to retrieve data from the module
const parser = port.pipe(new SerialPortParser());

// GPSListener updated by SerialPortParser
gpsListener.on("data", data => {
   // all information needed is in the data record with the type 'GGA'
   if (data.type == "GGA"){
      // the quality of the record is != null, if a connection is established
      if(data.quality != null) {
         var gnss = JSON.stringify({"ambulanceId": 1, "timestamp": DateTime.getCurrentDateAsTimeStamp(), "longitude":data.lon, "latitude":data.lat});
         // Logger.info(gnss);

         var config = {
            method: 'post',
            url: centralServerAddress + '/ambulance/createGnss',
            headers: { 
               'Content-Type': 'application/json'
            },
           data : gnss
         } as AxiosRequestConfig;

         axios(config)
            .then(response => {
               Logger.info(response.data);
            })
            .catch(error => {
               Logger.error(error);
            });
      }
   }
});

// gets the (raw) data from the SerialPort and passes it to the GPSListener
parser.on("data",  (data: string) => {   
   gpsListener.update(data);
});
