import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { appEnv } from '../config/env';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: appEnv.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy], // <- добавляем JwtStrategy сюда
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
