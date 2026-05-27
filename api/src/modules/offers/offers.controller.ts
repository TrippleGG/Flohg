import { Controller, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Make an offer on a task' })
  async create(@Body() createOfferDto: CreateOfferDto, @CurrentUser() user: User) {
    return this.offersService.create(createOfferDto, user.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Counter, withdraw, or accept an offer' })
  async update(
    @Param('id') id: string,
    @Body() updateOfferDto: UpdateOfferDto,
    @CurrentUser() user: User,
  ) {
    return this.offersService.updateOffer(id, updateOfferDto, user.id);
  }
}
