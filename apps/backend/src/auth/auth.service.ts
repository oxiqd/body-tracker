import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

/*
  jwtService.sign({ sub: user.id }) — создаём JWT с идентификатором пользователя
  В дальнейшем можно добавить срок жизни токена
*/

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(email: string, password: string) {
    const user = await this.usersService.createUser(email, password);
    const token = this.jwtService.sign({ sub: user.id });
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) return null;
    const token = this.jwtService.sign({ sub: user.id });
    return { user, token };
  }
}
