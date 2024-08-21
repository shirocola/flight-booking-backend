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
      // Log detailed error internally for auditing
      const userExists = await this.authService.doesUserExist(loginDto.username);
      if (!userExists) {
        this.logger.warn(`Login attempt failed: User ${loginDto.username} not found`);
      } else {
        this.logger.warn(`Login attempt failed: Invalid credentials for user ${loginDto.username}`);
      }

      // Return a generic 401 Unauthorized error to the client
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User ${loginDto.username} logged in successfully`);
    return this.authService.login(user);
  }
}
