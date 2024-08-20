import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@Req() req): Promise<User> {
    const userId = req.user.userId;
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put('me')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const userId = req.user.userId;
    const updatedUser = await this.usersService.updateUser(userId, updateUserDto);
    return updatedUser;
  }

  @Delete(':id')
  @Roles('admin', 'user')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
