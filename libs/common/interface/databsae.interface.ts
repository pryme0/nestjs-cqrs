export abstract class IGenericRepository<T> {
  abstract getAll(param): Promise<T[]>;

  abstract get(query: Partial<T>): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract remove(id: string, item: T);
}
