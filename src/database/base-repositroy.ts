import { Model } from 'mongoose';
import { IGenericRepository } from '@paymais/libs';
import { ObjectId } from 'mongodb';

export class BaseRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  async getAll(param: Partial<any>): Promise<T[]> {
    const transFormedQuery = this.queryTransformer(
      param.where,
      param?.paginate?.nextCursor,
    );
    return this._repository
      .find(transFormedQuery)
      .limit(param?.paginate?.limit || 5)
      .populate(this?._populateOnFind)
      .exec();
  }

  async get(query: Partial<any>): Promise<T> {
    return this._repository.findOne(query);
  }

  async create<N>(item: N): Promise<T> {
    return this._repository.create(item);
  }

  async update<N>(id: string, item: N) {
    return this._repository.findByIdAndUpdate(id, item, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.update(id, { isDeleted: true });
  }

  queryTransformer(query, cursor) {
    if (cursor) {
      return { ...query, _id: { $gt: new ObjectId(cursor) } };
    }
    return query;
  }
}
