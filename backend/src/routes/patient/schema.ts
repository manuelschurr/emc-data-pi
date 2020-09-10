import Joi from '@hapi/joi';

export default {
   findPatient: Joi.object().keys({
      patientId: Joi.number().required(),
   }),
   patient: Joi.object().keys({
      patientId: Joi.number(),
      ambulanceId: Joi.number(),
      name: Joi.string().allow('').max(150),
      gender: Joi.string().allow('').max(1),
      age: Joi.number().min(0).max(130),
      preExistingIllness: Joi.string().allow(''),
      miscellaneous: Joi.string().allow(''),
      AIsSelected: Joi.boolean().allow(null),
      AText: Joi.string().allow(''),
      BIsSelected: Joi.boolean().allow(null),
      BText: Joi.string().allow(''),
      CIsSelected: Joi.boolean().allow(null),
      CText: Joi.string().allow(''),
      DIsSelected: Joi.boolean().allow(null),
      DText: Joi.string().allow(''),
      EIsSelected: Joi.boolean().allow(null),
      EText: Joi.string().allow(''),
   })
};
