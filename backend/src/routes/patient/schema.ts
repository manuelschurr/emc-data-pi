import Joi from '@hapi/joi';

export default {
   findPatient: Joi.object().keys({
      patientId: Joi.number().required(),
   }),
   patient: Joi.object().keys({
      patientId: Joi.number(),
      ambulanceId: Joi.number(),
      name: Joi.string().required().max(150),
      gender: Joi.string().required().max(1),
      age: Joi.number().required(),
      preExistingIllness: Joi.string().required(),
      miscellaneous: Joi.string().required(),
      AIsSelected: Joi.boolean().required(),
      AText: Joi.string().required(),
      BIsSelected: Joi.boolean().required(),
      BText: Joi.string().required(),
      CIsSelected: Joi.boolean().required(),
      CText: Joi.string().required(),
      DIsSelected: Joi.boolean().required(),
      DText: Joi.string().required(),
      EIsSelected: Joi.boolean().required(),
      EText: Joi.string().required(),
   })
};
