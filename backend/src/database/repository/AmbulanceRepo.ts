import Logger from "../../core/Logger";
import { DB_CONNECTION } from '../index';
import Ambulance from "../model/Ambulance";

// SQL command to query an ambulance in the relation (only one should be existing)
const QUERY_AMBULANCE_SQL = `SELECT DISTINCT 
   AmbulanceId ambulanceId,
   Identifier identifier
  FROM Ambulance`;

// SQL command to insert an ambulance in the relation
const INSERT_AMBULANCE_SQL = `INSERT INTO Ambulance(
   AmbulanceId,
   Identifier,
   PatientId
) VALUES(?,?,?)`;

// SQL command to update an ambulance in the relation
const UPDATE_AMBULANCE_SQL = `UPDATE Ambulance SET
   Identifier = ?,
   PatientId = ?
WHERE AmbulanceId = ?`;

// SQL command to check if an ambulance already exists (to determine what function we have to call afterwards)
const CHECK_AMBULANCE_SQL = `SELECT COUNT(*) FROM Ambulance`;


export default class AmbulanceRepo {
   public static queryAmbulance(): Ambulance {
      const stmt = DB_CONNECTION.prepare(QUERY_AMBULANCE_SQL);
      const ambulance = stmt.get() as Ambulance;
      return ambulance;
   }

   public static insertAmbulance(ambulance: Ambulance) {
      const stmt = DB_CONNECTION.prepare(INSERT_AMBULANCE_SQL);
      const info = stmt.run(ambulance.ambulanceId, ambulance.identifier, ambulance.patientId);
      Logger.debug(`${info.changes} ambulance row(s) inserted`);
   }

   public static updateAmbulance(ambulance: Ambulance) {
      const stmt = DB_CONNECTION.prepare(UPDATE_AMBULANCE_SQL);
      const info = stmt.run(ambulance.identifier, ambulance.patientId, ambulance.ambulanceId); // ambulanceId is used in the where clause
      Logger.debug(`${info.changes} ambulance row(s) updated`);
   }

   public static checkIfAmbulanceDataExists(): boolean {
      const stmt = DB_CONNECTION.prepare(CHECK_AMBULANCE_SQL);
      const result = stmt.get();

      return result['COUNT(*)'] === 1;
   }
}
