import axios, { AxiosRequestConfig } from "axios";
import { centralServerAddress, centralServerAuthPassword, centralServerAuthUser } from "../config";
import { HttpsAgent } from "./HttpsAgent";
import Logger from "./Logger";

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

   // axios properties
   headers?: any;
   httpsAgent?: any;

   /**
    * The Singleton's constructor should always be private to prevent direct
    * construction calls with the `new` operator.
    */
   private constructor() {
   }

   /**
    * The static method that controls the access to the singleton instance.
    * This implementation let you subclass the Singleton class while keeping
    * just one instance of each subclass around.
    */
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
      // get token from central server
      await axios
         .post(`${centralServerAddress}/user/login`, { username: centralServerAuthUser, password: centralServerAuthPassword }, this.axios_config)
         .then(response => {
            this.token = response.data.token;
         })
         .catch(error => {
            Logger.error(error);
         });

      // set header for config
      this.headers = {
         'Content-Type': 'application/json',
         'x-access-token': this.token
      };
      
      //set https agent for secure connection
      this.httpsAgent = HttpsAgent;
   }
}
