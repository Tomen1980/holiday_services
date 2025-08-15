import holidayRepository from "../../repositories/holiday/holiday.repository.js";
import { ApiResponse } from "../../utils/api-response.js";
import { ApiError } from "../../utils/error-response.js";
import { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";


class HolidayService {
  async getHolidays(year = null, month = null, date = null, startDate = null, endDate = null) {

      let whereClause = {};
      
    if (startDate && endDate) {
      whereClause.startDate = {
        gte: startOfDay(startDate),
        lte: endOfDay(endDate)
      };
    }
    else if (date) {
      whereClause.startDate = {
        gte: startOfDay(date),
        lte: endOfDay(date)
      };
    }
      else if (year && month) {
        // Filter berdasarkan tahun + bulan
        const start = startOfMonth(new Date(year, month - 1, 1));
        const end = endOfMonth(new Date(year, month - 1, 1));
        whereClause.startDate = {
          gte: start,
          lte: end
        };
      } 
      else if (year) {
        // Filter berdasarkan tahun saja
        const start = startOfYear(new Date(year, 0, 1));
        const end = endOfYear(new Date(year, 0, 1));
        whereClause.startDate = {
          gte: start,
          lte: end
        };
      } 
      else if (month) {
        // Filter bulan saja (tanpa tahun → semua tahun yang punya bulan tsb)
        whereClause.AND = [
          { startDate: { gte: startOfMonth(new Date(2000, month - 1, 1)) } },
          { startDate: { lte: endOfMonth(new Date(2100, month - 1, 1)) } }
        ];
      }
      
      return holidayRepository.findAll(whereClause);
  }


  async createHoliday(value) {
    const createdHoliday = await holidayRepository.create(value);
    
  }

  async updateHoliday(body, holidayId) {
    try {
      await holidayRepository.update(holidayId, body);
    }
    catch (error) {
      throw new ApiError("Failed to update holiday", 500);
    }
  }

  async deleteHoliday(holidayId) {
    try{
      await holidayRepository.delete(Number(holidayId));
    }catch (error) {
      throw new ApiError("Failed to delete holiday", 500);
    }
  }

  
}

export default new HolidayService();