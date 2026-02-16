import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DB_PROVIDER } from '../infrastructure/db/db.provider';
import * as bcrypt from 'bcrypt';

/*
  createUser — регистрация, пароль хешируется
  findByEmail — ищем пользователя по email
  validateUser — проверка email + пароль
*/


@Injectable()
export class UsersService {
  constructor(@Inject(DB_PROVIDER) private readonly db: Kysely<any>) {}

  async createUser(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();
    await this.db
      .insertInto('users')
      .values({ id, email, password_hash: hash })
      .execute();
    return { id, email };
  }

  async findByEmail(email: string) {
    return this.db.selectFrom('users').selectAll().where('email', '=', email).executeTakeFirst();
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password_hash);
    return match ? user : null;
  }
}
