// Importing from Modules
import SerialPort = require("serialport");
const SerialPortParser = require("@serialport/parser-readline");
//import SerialPortParser = require("@serialport/parser-readline");
import GPS from "gps";

// Port needs to point to the GNSS module
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
         console.log("Time: " + getCurrentDateAsTimeStamp() + ", Longitude: " + data.lon + ", Latitude: " + data.lat);       
      }
   }
});

// gets the (raw) data from the SerialPort and passes it to the GPSListener
parser.on("data",  (data: string) => {   
   gpsListener.update(data);
});
