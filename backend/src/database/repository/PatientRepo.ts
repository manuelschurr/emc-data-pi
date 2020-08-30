import Logger from "../../core/Logger";
import DateTime from "../../helpers/dateTime";
import { booleanToNumber, DB_CONNECTION } from '../index';
import Patient from "../model/Patient";

// SQL command to find a specific patient
const QUERY_SPECIFIC_PATIENT_SQL = `SELECT DISTINCT 
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
WHERE PatientId = ?`;

// SQL command to find the latest active patient
const QUERY_LATEST_ACTIVE_PATIENT_SQL = `SELECT DISTINCT 
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
WHERE AmbulanceId != 0
ORDER BY PatientId DESC`;

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
   AmbulanceId = ?,
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
WHERE PatientId = ?`;

// SQL command to check if a patient already exists (to determine what function we have to call afterwards)
const CHECK_PATIENT_SQL = `SELECT COUNT(*) FROM Patient WHERE PatientId = ?`;


export default class PatientRepo {
   public static querySpecificPatient(patientId: number): Patient {
      const stmt = DB_CONNECTION.prepare(QUERY_SPECIFIC_PATIENT_SQL);
      const patient = stmt.get(patientId) as Patient;
      return patient;
   }

   public static queryLatestActivePatient(): Patient {
      const stmt = DB_CONNECTION.prepare(QUERY_LATEST_ACTIVE_PATIENT_SQL);
      const patient = stmt.get() as Patient;
      return patient;
   }

   public static insertPatient(patient: Patient) {
      const currentDate = DateTime.getCurrentDateAsTimeStamp();
      const stmt = DB_CONNECTION.prepare(INSERT_PATIENT_SQL);
      const info = stmt.run(patient.patientId, patient.ambulanceId, currentDate, currentDate, patient.name, patient.gender, patient.age,
         patient.preExistingIllness, patient.miscellaneous, booleanToNumber(patient.AIsSelected), patient.AText, booleanToNumber(patient.BIsSelected),
         patient.BText, booleanToNumber(patient.CIsSelected), patient.CText, booleanToNumber(patient.DIsSelected), patient.DText,
         booleanToNumber(patient.EIsSelected), patient.EText);
      Logger.debug(`${info.changes} patient row(s) inserted`);
   }

   public static updatePatient(patient: Patient) {
      const stmt = DB_CONNECTION.prepare(UPDATE_PATIENT_SQL);
      const info = stmt.run(DateTime.getCurrentDateAsTimeStamp(), patient.ambulanceId, patient.name, patient.gender, patient.age, patient.preExistingIllness,
         patient.miscellaneous, booleanToNumber(patient.AIsSelected), patient.AText, booleanToNumber(patient.BIsSelected), patient.BText,
         booleanToNumber(patient.CIsSelected), patient.CText, booleanToNumber(patient.DIsSelected), patient.DText, booleanToNumber(patient.EIsSelected),
         patient.EText,
         patient.patientId); // last parameter is where clause
      Logger.debug(`${info.changes} patient row(s) updated`);
   }

   public static checkIfPatientDataExists(patientId: number): boolean {
      patientId = patientId === null || typeof patientId === 'undefined' ? 0 : patientId;
      const stmt = DB_CONNECTION.prepare(CHECK_PATIENT_SQL);
      const result = stmt.get(patientId);

      return result['COUNT(*)'] === 1;
   }
}
