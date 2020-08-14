import Logger from "../../core/Logger";
import DateTime from "../../helpers/dateTime";
import { DB_CONNECTION } from '../index';
import Patient from "../model/Patient";

// SQL command to find a patient
const QUERY_PATIENT_SQL = `SELECT DISTINCT 
   PatientId patientId,
   AmbulanceId ambulanceId,
   CreateDat createDat,
   UpdateDat updateDat,
   Name name,
   Gender gender,
   Age age,
   PreExistingIllness preExistingIllness,
   Miscellaneous miscellaneous,
   A_IsSelected AIsSelected,
   A_Text AText,
   B_IsSelected BIsSelected,
   B_Text BText,
   C_IsSelected CIsSelected,
   C_Text CText,
   D_IsSelected DIsSelected,
   D_Text DText,
   E_IsSelected EIsSelected,
   E_Text EText
  FROM Patient
WHERE PatientId = ?
  AND AmbulanceId = ?`;

// SQL command to insert a patient in the relation
const INSERT_PATIENT_SQL = `INSERT INTO Patient(
   PatientId,
   AmbulanceId,
   CreateDat,
   UpdateDat,
   Name,
   Gender,
   Age,
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
const UPDATE_PATIENT_SQL = `UPDATE Patient SET
   UpdateDat = ?,
   Name = ?,
   Gender = ?,
   Age = ?,
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
WHERE PatientId = ?
  AND AmbulanceId = ?`;

// SQL command to check if a patient already exists (to determine what function we have to call afterwards)
const CHECK_PATIENT_SQL = `SELECT COUNT(*) FROM Patient WHERE PatientId = ? AND AmbulanceId = ?`;                        


export default class PatientRepo {
   public static queryPatient(patientId: number, ambulanceId: number, callback: Function) {
      DB_CONNECTION.get(QUERY_PATIENT_SQL, [patientId, ambulanceId], (err, row) => {
         if (err) {
            return Logger.error(err.message);
         }
         callback(row);
      })
   }

   public static insertPatient(patient: Patient) {
      const currentDate = DateTime.getCurrentDateAsTimeStamp();
      DB_CONNECTION.run(INSERT_PATIENT_SQL, [patient.patientId, patient.ambulanceId, currentDate, currentDate, patient.name, patient.gender,
      patient.age, patient.preExistingIllness, patient.miscellaneous, patient.AIsSelected, patient.AText, patient.BIsSelected, patient.BText,
      patient.CIsSelected, patient.CText, patient.DIsSelected, patient.DText, patient.EIsSelected, patient.EText], function (err) {
         if (err) {
            return Logger.error(err.message);
         }
         Logger.info('1 row inserted');
      });
   }

   public static updatePatient(patient: Patient) {
      DB_CONNECTION.run(UPDATE_PATIENT_SQL, [DateTime.getCurrentDateAsTimeStamp(), patient.name, patient.gender, patient.age, patient.preExistingIllness,
      patient.miscellaneous, patient.AIsSelected, patient.AText, patient.BIsSelected, patient.BText, patient.CIsSelected, patient.CText, patient.DIsSelected,
      patient.DText, patient.EIsSelected, patient.EText, 
         patient.patientId, patient.ambulanceId], function (err) {
         if (err) {
            return Logger.error(err.message);
         }
         Logger.info('1 row updated');
      });
   }

   public static checkIfPatientDataExists(patientId: number, ambulanceId: number, callback: Function) {
      DB_CONNECTION.get(CHECK_PATIENT_SQL, [patientId, ambulanceId], function(err, result) {
         if (err) {
            return Logger.error(err.message);
         }
         callback(result["COUNT(*)"]);
      });
   }
}
