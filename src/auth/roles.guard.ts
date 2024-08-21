import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Allow the action if no roles are specified (public route)
    if (!roles) {
      return true;
    }

    // Check if the user is trying to delete their own account
    const userId = parseInt(request.params.id, 10);
    if (userId === user.id) {
      return true;
    }

    // Check if the user has the required roles
    const hasRole = roles.some(role => user.roles?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('You do not have permission to perform this action.');
    }

    return true;
  }
}
