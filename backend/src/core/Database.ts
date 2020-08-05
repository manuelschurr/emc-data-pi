import DateTime from "../helpers/dateTime";
import { Patient } from "../models/Patient";

const sqlite3 = require('sqlite3').verbose();

// SQL command to create the table, if it is not existing
let createTableSql = `CREATE TABLE IF NOT EXISTS Patients(
   PatientId          INTEGER,
   CreateDat          DATE,
   UpdateDat          DATE,
   SurName            VARCHAR(50),
   FirstName          VARCHAR(50),
   Gender             CHARACTER(1),
   DateOfBirth        DATE,
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

// SQL command to insert a patient into the relation
let insertPatientSql = `INSERT INTO Patients(
   PatientId,
   CreateDat,
   UpdateDat,
   SurName,
   FirstName,
   Gender,
   DateOfBirth,
   PreExistingIllness,
   Miscellaneous,
   A_IsSelected,
   A_Text,
   B_IsSelected,
   B_Text,
   C_IsSelected,
   C_Text,
   D_IsSelected,
   D_Text,
   E_IsSelected,
   E_Text
) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

// SQL command to update a patient in the relation
let updatePatientSql = `UPDATE Patients
                        SET
                        UpdateDat = ?,
                        SurName = ?,
                        FirstName = ?,
                        Gender = ?,
                        DateOfBirth = ?,
                        PreExistingIllness = ?,
                        Miscellaneous = ?,
                        A_IsSelected = ?,
                        A_Text = ?,
                        B_IsSelected = ?,
                        B_Text = ?,
                        C_IsSelected = ?,
                        C_Text = ?,
                        D_IsSelected = ?,
                        D_Text = ?,
                        E_IsSelected = ?,
                        E_Text  = ?
                        WHERE PatientId = ?`;

// SQL command to update a patient in the relation
let checkPatientDataSql = `SELECT COUNT(*) FROM Patients WHERE PatientId = ?`;                        

// opening the connection to the database
// note: we are connecting to a disk file database 'emcdata.db'
// using the opening mode OPEN_READWRITE, default is OPEN_READWRITE | OPEN_CREATE
// but the database should already be created by the setup script
let db = new sqlite3.Database('/home/pi/DB/emcdata.db', sqlite3.OPEN_READWRITE, (err: any) => {
   if (err) {
      return console.error(err.message);
   }
   console.log('Connected to the EMC database.');
});

// running the command to create the database
db.serialize(() => {
   // Queries scheduled here will be serialized.
   db.run(createTableSql, function (err: any) {
      if (err) {
         return console.log(err.message);
      }
      console.log("Table 'Patients' created successfully.")
   });
});

module Database {
   export function insertPatientData(pat: Patient) {
      const currentDate = DateTime.getCurrentDateAsTimeStamp();
      db.run(insertPatientSql, [pat.patientId, currentDate, currentDate, pat.surName, pat.firstName, pat.gender, pat.dateOfBirth, pat.preExistingIllness,
      pat.miscellaneous, pat.AIsSelected, pat.AText, pat.BIsSelected, pat.BText, pat.CIsSelected, pat.CText, pat.DIsSelected,
      pat.DText, pat.EIsSelected, pat.EText], function (err: any) {
         if (err) {
            return console.log(err.message);
         }
         console.log("1 row inserted.");
      });
   }

   export function updatePatientData(pat: Patient) {
      db.run(updatePatientSql, [DateTime.getCurrentDateAsTimeStamp(), pat.surName, pat.firstName, pat.gender, pat.dateOfBirth, pat.preExistingIllness,
      pat.miscellaneous, pat.AIsSelected, pat.AText, pat.BIsSelected, pat.BText, pat.CIsSelected, pat.CText, pat.DIsSelected,
      pat.DText, pat.EIsSelected, pat.EText, pat.patientId], function (err: any) {
         if (err) {
            return console.log(err.message);
         }
         console.log("1 row updated.");
      });
   }

   export function checkIfPatientDataExists(patientId: number, callback: Function) {
      let countPatientData = 0;
      console.log("DB: LookupPatientID: " + patientId);

      db.get(checkPatientDataSql, [patientId], function(err: any, result:any) {
         countPatientData =  result["COUNT(*)"];
         callback(countPatientData);
      });
   }

   export function closeDbConnection() {
      db.close((err: any) => {
         if (err) {
            return console.error(err.message);
         }
         console.log('Close the database connection.');
      });
   }
}

export default Database
