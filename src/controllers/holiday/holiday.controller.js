import HolidayService from "../../services/holiday/holiday.service.js";
import { ApiResponse } from "../../utils/api-response.js";

class HolidayController {

 async getHolidays(req, res) {
    const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
    const month = req.query.month ? parseInt(req.query.month) : null;
    const date = req.query.date ? new Date(req.query.date) : null;

    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    const data = await HolidayService.getHolidays(year, month, date, startDate, endDate);
    return ApiResponse.success(res, "Holidays retrieved successfully", data);
  }

  async createHoliday(req, res) {
    const body = req.validatedData;
    await HolidayService.createHoliday(body);
    return ApiResponse.created(res, body, "Holiday created successfully");
  }

  async updateHoliday(req, res) {
    const holidayId = parseInt(req.params.id);
    const body = req.validatedData;
    await HolidayService.updateHoliday(body, holidayId);
    return ApiResponse.success(res, body, "Holiday updated successfully");
  }

  async deleteHoliday(req, res) {
    if (!req.params.id) {
      return ApiResponse.error(res, "Holiday ID is required", 400);
    }
    const holidayId = parseInt(req.params.id);
    await HolidayService.deleteHoliday(holidayId);
    return ApiResponse.success(res, null, "Holiday deleted successfully");
  }
}

export default new HolidayController();
