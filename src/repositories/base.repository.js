export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(where = {}) {
    return this.model.findMany({ where });
  }

  async findById(id) {
    return this.model.findUnique({ where: { id } });
  }

  async findOne(where) {
    return this.model.findFirst({ where });
  }

  async create(data) {
    return this.model.create({ data });
  }

  async update(id,data) {
    return this.model.update({ where: { id }, data });
  }

  async delete(id) {
    return this.model.delete({ where: { id } });
  }
}
