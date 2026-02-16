import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DB_PROVIDER } from '../infrastructure/db/db.provider';

@Injectable()
export class WeightsService {
  constructor(@Inject(DB_PROVIDER) private readonly db: Kysely<any>) {}

  async addWeight(userId: string, date: string, weight: number) {
    const id = crypto.randomUUID();
    await this.db
      .insertInto('weights')
      .values({ id, user_id: userId, date, weight })
      .execute();
    return { id, userId, date, weight };
  }

  async getUserWeights(userId: string) {
    return this.db
      .selectFrom('weights')
      .selectAll()
      .where('user_id', '=', userId)
      .orderBy('date', 'asc')
      .execute();
  }
}
