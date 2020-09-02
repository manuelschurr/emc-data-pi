import * as fs from 'fs';
import * as https from 'https';
import { certPath, environment } from '../config';
import Logger from './Logger';

try {
   var certificate = fs.readFileSync(certPath).toString();
} catch (error) {
   Logger.error(error);
}

export const HttpsAgent = new https.Agent({ ca: certificate, keepAlive: false, rejectUnauthorized: environment === "development" ? false : true });
