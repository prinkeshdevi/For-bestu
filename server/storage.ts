import { db, hasDatabase } from "./db";
import { dummy, type Dummy } from "../shared/schema";

export interface IStorage {
  getDummies(): Promise<Dummy[]>;
}

export class DatabaseStorage implements IStorage {
  async getDummies(): Promise<Dummy[]> {
    return await db!.select().from(dummy);
  }
}

export class MemoryStorage implements IStorage {
  private dummies: Dummy[] = [];

  async getDummies(): Promise<Dummy[]> {
    return this.dummies;
  }
}

export const storage = hasDatabase ? new DatabaseStorage() : new MemoryStorage();
