import { Module } from '@nestjs/common';
import { WeightsService } from './weights.service';
import { WeightsController } from './weights.controller';
import { DbModule } from '../infrastructure/db/db.module';

@Module({
  imports: [DbModule],
  providers: [WeightsService],
  controllers: [WeightsController],
})
export class WeightsModule {}
