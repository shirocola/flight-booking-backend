import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('protected')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProtectedController {
  @Get('admin')
  @Roles('admin')
  getAdminResource() {
    return 'This is an admin-only resource';
  }

  @Get('user')
  @Roles('user', 'admin')
  getUserResource() {
    return 'This is a resource available to users and admins';
  }
}
