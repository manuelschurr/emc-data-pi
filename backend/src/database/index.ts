import sqlite3 from 'sqlite3';
import { db } from "../config";
import Logger from "../core/Logger";

// SQL command to create the table, if it is not existing
const CREATE_PATIENT_TABLE_SQL = `CREATE TABLE IF NOT EXISTS Patient(
   PatientId          INTEGER,
   AmbulanceId        INTEGER,
   CreateDat          DATE,
   UpdateDat          DATE,
   Name               VARCHAR(150),
   Gender             CHARACTER(1),
   Age                INTEGER,
   PreExistingIllness TEXT,
   Miscellaneous      TEXT,
   A_IsSelected       BOOLEAN,
   A_Text             TEXT,
   B_IsSelected       BOOLEAN,
   B_Text             TEXT,
   C_IsSelected       BOOLEAN,
   C_Text             TEXT,
   D_IsSelected       BOOLEAN,
   D_Text             TEXT,
   E_IsSelected       BOOLEAN,
   E_Text             TEXT
)`;

// opening the connection to the database
// note: we are connecting to a disk file database 'emcdata.db'
// using the default opening mode OPEN_READWRITE | OPEN_CREATE
// but the database should already be created by the setup script
export const DB_CONNECTION = new sqlite3.Database(db.path, (err) => {
   if (err) {
      return Logger.error(err.message);
   }
   Logger.info('Connected to the EMC databse');
});

// running the command to create the patient table
// queries scheduled here will be serialized
DB_CONNECTION.serialize(() => {
   DB_CONNECTION.run(CREATE_PATIENT_TABLE_SQL, function (err) {
      if (err) {
         return Logger.error(err.message);
      }
      Logger.info('Table \'Patient\' created successfully');
   });
});


// if the Node process ends, close the sqlite connection
process.on('SIGINT', () => {
   DB_CONNECTION.close((err) => {
      if (err) {
         return Logger.error(err.message);
      }
      Logger.info('SQLite connection disconnected through app termination');
      process.exit(0);
   });
});
