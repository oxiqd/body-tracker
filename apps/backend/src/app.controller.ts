import { Controller, Get } from '@nestjs/common'
import { db } from './infrastructure/db/db'

// SELECT * FROM users LIMIT 1

@Controller()
export class AppController {
  @Get('test-db')
  async testDb() {
    const result = await db
      .selectFrom('users')
      .selectAll()
      .limit(1)
      .execute()

    return {
      ok: true,
      result,
    }
  }
}
