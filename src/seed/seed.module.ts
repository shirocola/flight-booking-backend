import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from '../users/user.module';
import { FlightsModule } from '../flights/flights.module';

@Module({
  imports: [UsersModule, FlightsModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
