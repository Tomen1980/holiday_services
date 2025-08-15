import { ApiResponse } from "../utils/api-response.js";

// middleware/validateApiKey.js
export default function validateApiKey(expectedKey) {
  return (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return ApiResponse.notFound(res, "API key is missing in the request headers");
    }

    if (apiKey !== expectedKey) {
      return ApiResponse.unauthorized(res, "Invalid API key");
    }

    next();
  };
}
