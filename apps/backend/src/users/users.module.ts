import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbModule } from '../infrastructure/db/db.module';

@Module({
  imports: [DbModule], // <- важно!
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
