export class ApiResponse {
  static success(res, data = null, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static created(res, data = null, message = "Created", statusCode = 201) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static error(res, message = "Error", statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  }

  static notFound(res, message = "Not Found", statusCode = 404) {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }

  static validationError(res, errors, statusCode = 422) {
    return res.status(statusCode).json({
      success: false,
      message: "Validation Error",
      errors
    });
  }

  static unauthorized(res, message = "Unauthorized", statusCode = 401) {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }
}
