// validators/holidayValidator.js
import Joi from "joi";

export const createHolidaySchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must have at least 3 characters",
    "any.required": "Title is required"
  }),
  startDate: Joi.date().iso().required().messages({
    "date.base": "Start date must be a valid date",
    "any.required": "Start date is required"
  }),
  endDate: Joi.date().iso().min(Joi.ref("startDate")).required().messages({
    "date.min": "End date cannot be earlier than start date",
    "any.required": "End date is required"
  })
});

export const updateHolidaySchema = Joi.object({
  title: Joi.string().min(3).optional().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must have at least 3 characters"
  }),
   startDate: Joi.date().iso().optional().messages({
    "date.base": "Start date must be a valid date",
    "any.required": "Start date is required"
  }),
  endDate: Joi.date().iso().min(Joi.ref("startDate")).optional().messages({
    "date.min": "End date cannot be earlier than start date",
    "any.required": "End date is required"
  })
});
