import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      this.logger.log(`User ${username} successfully validated`);
      const { password, ...result } = user;
      return result;
    }
    this.logger.log(`User ${username} failed validation`);
    return null;
  }

  async doesUserExist(username: string): Promise<boolean> {
    const user = await this.usersService.findOne(username);
    return !!user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    this.logger.log(`User ${user.username} logged in`);
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES_IN || '60m' }),
    };
  }
}
