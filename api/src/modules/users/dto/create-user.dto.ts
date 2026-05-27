import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
