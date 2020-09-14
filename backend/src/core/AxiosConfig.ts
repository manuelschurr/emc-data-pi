import axios, { AxiosRequestConfig } from "axios";
import { centralServerAddress, centralServerAuthPassword, centralServerAuthUser } from "../config";
import { HttpsAgent } from "./HttpsAgent";
import Logger from "./Logger";

// base class to use for axios calls, relevant properties are already set
// using a singleton since this config should only exist once
export default class AxiosBaseConfig implements AxiosRequestConfig {
   private static INSTANCE: AxiosBaseConfig;

   // private properties
   private token: string;
   private axios_config = {
      headers: {
         'Content-Type': 'application/json'
      },
      httpsAgent: HttpsAgent
   } as AxiosRequestConfig;

   // properties from interface AxiosRequestConfig
   headers?: any;
   httpsAgent?: any;

   // private singleton constructor to prevent direct construction with the new operator
   private constructor() {
   }

   // controlling the access to the singleton instance
   public static async getInstance(): Promise<AxiosBaseConfig> {
      if (!AxiosBaseConfig.INSTANCE) {
         AxiosBaseConfig.INSTANCE = new AxiosBaseConfig();
         await this.INSTANCE.create();
      }

      return AxiosBaseConfig.INSTANCE;
   }

   public getToken() : string {
      return this.token;
   }

   async create() {
      // doing a login to get the token from central server
      await axios
         .post(`${centralServerAddress}/user/login`, { username: centralServerAuthUser, password: centralServerAuthPassword }, this.axios_config)
         .then(response => {
            this.token = response.data.data.token;
         })
         .catch(error => {
            Logger.error(error);
         });

      // set header for base config
      this.headers = {
         'Content-Type': 'application/json',
         'x-access-token': this.token
      };
      
      // set https agent for secure connection
      this.httpsAgent = HttpsAgent;
   }
}
