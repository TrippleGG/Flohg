import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AgreementsService } from './agreements.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Agreements')
@Controller('agreements')
export class AgreementsController {
  constructor(private readonly agreementsService: AgreementsService) {}

  @Post(':id/escrow/hold')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hold escrow payment' })
  async holdEscrow(@Param('id') id: string, @CurrentUser() user: User) {
    return this.agreementsService.holdEscrow(id, user.id);
  }

  @Post(':id/release')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Release escrow payment' })
  async release(@Param('id') id: string, @CurrentUser() user: User) {
    return this.agreementsService.releaseEscrow(id, user.id);
  }
}
