import { Controller, Post, Body, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      this.logger.warn(`Failed login attempt for username: ${loginDto.username}`);
      throw new UnauthorizedException('Invalid credentials');
    }
    this.logger.log(`User ${loginDto.username} logged in successfully`);
    return this.authService.login(user);
  }
}
