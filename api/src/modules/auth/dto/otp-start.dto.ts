import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpStartDto {
  @ApiProperty({ example: '+2348012345678' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
