import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpVerifyDto {
  @ApiProperty({ example: '+2348012345678' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  code: string;
}
