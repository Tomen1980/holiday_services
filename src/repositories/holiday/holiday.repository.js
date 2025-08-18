import prisma from "../../config/prisma.js";
import BaseRepository from "../base.repository.js";

class HolidayRepository extends BaseRepository {
  constructor() {
    super(prisma.holiday);
  }

   async findByYear(year) {
    if (!year) {
      return this.model.findMany({
        orderBy: { startDate: 'asc' }
      });
    }

    const start = startOfYear(new Date(year, 0, 1));
    const end = endOfYear(new Date(year, 0, 1));

    return this.model.findMany({
      where: {
        startDate: {
          gte: start,
          lte: end
        }
      },
      orderBy: { startDate: 'asc' }
    });
  }

  async findByDate(date) {
    return this.model.findUnique({ where: { date: new Date(date) } });
  }

  async createMany(holidays) {
    return this.model.createMany({
      data: holidays,
      skipDuplicates: true // Skip duplicates if any
    });
  }
}

export default new HolidayRepository();
