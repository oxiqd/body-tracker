import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WeightsModule } from 'src/weights/weight.module';

@Module({
  imports: [AuthModule, WeightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
