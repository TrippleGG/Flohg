import { IsString, IsNumber, IsOptional, IsObject, IsArray, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Painting Service' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Need someone to paint my living room' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'painting' })
  @IsString()
  categoryId: string;

  @ApiProperty({ example: 'house-painting', required: false })
  @IsOptional()
  @IsString()
  subcategoryId?: string;

  @ApiProperty({ example: { 'room-size': 'large', 'paint-color': 'blue' } })
  @IsObject()
  attributes: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  photos?: string[];

  @ApiProperty({ example: 6.5244, description: 'Latitude' })
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @ApiProperty({ example: 3.3792, description: 'Longitude' })
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;

  @ApiProperty({ example: '123 Main Street, Lagos' })
  @IsString()
  addressText: string;

  @ApiProperty({ example: 'Near the market', required: false })
  @IsOptional()
  @IsString()
  landmark?: string;

  @ApiProperty({ example: 'Lagos Island', required: false })
  @IsOptional()
  @IsString()
  lga?: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  budgetProposed: number;

  @ApiProperty({ example: 'negotiable', enum: ['fixed', 'negotiable'] })
  @IsString()
  priceType: string;
}
