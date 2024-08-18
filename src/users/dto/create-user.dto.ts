import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()  // This makes the roles field optional during user creation
  roles?: string[]; // String array to hold the roles
}
