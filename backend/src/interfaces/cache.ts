export interface Cache {
  del(key: string): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ex?: number): Promise<void>;
}
