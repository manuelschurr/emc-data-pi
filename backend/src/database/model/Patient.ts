export const enum Gender {
   M = 'M',
   F = 'F',
   D = 'D'
};

export default class Patient {
   patientId: number;
   ambulanceId: number;
   createdAt: Date;
   updatedAt: Date;
   name: string;
   gender: string;
   age: number;
   preExistingIllness: string;
   miscellaneous: string;
   AIsSelected: boolean;
   AText: string;
   BIsSelected: boolean;
   BText: string;
   CIsSelected: boolean;
   CText: string;
   DIsSelected: boolean;
   DText: string;
   EIsSelected: boolean;
   EText: string;
}
