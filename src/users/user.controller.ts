import { Controller, Get, Put, Delete, Param, Body, UseGuards, NotFoundException, Req, Logger, ForbiddenException } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { Booking } from '../bookings/booking.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@Req() req): Promise<User> {
    const userId = req.user.userId;
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      this.logger.warn(`User with ID ${userId} not found`);
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('me/bookings')
  async getUserBookings(@Req() req): Promise<Booking[]> {
    const userId = req.user.userId;
    const bookings = await this.usersService.findUserBookings(userId);
    if (!bookings || bookings.length === 0) {
      throw new NotFoundException('No bookings found for this user');
    }
    return bookings;
  }

  @Put('me')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const userId = req.user.userId;
    const updatedUser = await this.usersService.updateUser(userId, updateUserDto);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number, @Req() req): Promise<void> {
    const user = await this.usersService.findOneById(id);

    // Check if the user is deleting their own account
    if (user.id !== req.user.userId && !req.user.roles?.includes('admin')) {
      throw new ForbiddenException('You do not have permission to perform this action.');
    }

    await this.usersService.deleteUser(id);
  }
}
