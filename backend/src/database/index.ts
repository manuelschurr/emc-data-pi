import Database from "better-sqlite3";
import { db } from "../config";
import Logger from "../core/Logger";
import AmbulanceHelper from '../helpers/ambulance.helper';

// SQL command to create the patient table, if it is not existing
const CREATE_PATIENT_TABLE_SQL = `CREATE TABLE IF NOT EXISTS Patient(
   PatientId          INTEGER PRIMARY KEY,
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

// SQL command to create the ambulance table, if it is not existing
const CREATE_AMBULANCE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS Ambulance(
   AmbulanceId INTEGER PRIMARY KEY,
   Identifier  VARCHAR(50) NOT NULL,
   PatientId   INTEGER 
)`;

// opening the connection to the database
// note: connecting to a disk file given in the .env file
export const DB_CONNECTION = new Database(db.path, { verbose: Logger.debug });

// SQLite does not have a separate Boolean storage class.
// Instead, Boolean values are stored as integers 0 (false) and 1 (true)
// => return 1 if boolValue is TRUE, 0 otherwise
export function booleanToNumber(boolValue: boolean): number {
   return boolValue ? 1 : 0;
}

// running the command to create the patient table
let stmt = DB_CONNECTION.prepare(CREATE_PATIENT_TABLE_SQL);
let info = stmt.run();
Logger.info('Table \'Patient\' created successfully');

// running the command to create the ambulance table
stmt = DB_CONNECTION.prepare(CREATE_AMBULANCE_TABLE_SQL);
info = stmt.run();
Logger.info('Table \'Ambulance\' created successfully');

// call the method to create an ambulance tuple after creation of database tables
AmbulanceHelper.createAmbulanceEntry();

// if the Node process ends, close the sqlite connection
process.on('SIGINT', () => {
   DB_CONNECTION.close();
   Logger.info('SQLite connection disconnected through app termination');
   process.exit(0);
});
