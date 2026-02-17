import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { appEnv } from '../config/env';

/*
  Берём JWT из Authorization: Bearer TOKEN
  Проверяем подпись и срок действия
  В validate возвращаем объект пользователя (req.user)
*/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appEnv.jwtSecret,
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload); // <- добавь для отладки
    return { userId: payload.sub }; // <- важно
  }
}
