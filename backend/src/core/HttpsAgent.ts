import * as https from 'https';
import { environment } from '../config';

export const HttpsAgent = new https.Agent({ keepAlive: false, rejectUnauthorized: environment === "development" ? false : true });
