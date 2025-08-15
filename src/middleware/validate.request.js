// middlewares/validateRequest.js
import {ApiResponse} from "../utils/api-response.js";

export default function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map(err => err.message);
      return ApiResponse.validationError(res, errorMessage);
    }

    req.validatedData = value;
    next();
  };
}
