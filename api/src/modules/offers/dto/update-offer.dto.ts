import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfferDto {
  @ApiProperty({ enum: ['counter', 'withdraw', 'accept'] })
  @IsString()
  action: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;
}
