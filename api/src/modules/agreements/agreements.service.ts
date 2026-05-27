import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agreement } from './entities/agreement.entity';

@Injectable()
export class AgreementsService {
  constructor(
    @InjectRepository(Agreement)
    private readonly agreementRepository: Repository<Agreement>,
  ) {}

  async holdEscrow(id: string, userId: string): Promise<Agreement> {
    const agreement = await this.agreementRepository.findOne({ where: { id } });
    if (!agreement) {
      throw new NotFoundException(`Agreement ${id} not found`);
    }

    agreement.escrowStatus = 'held';
    return this.agreementRepository.save(agreement);
  }

  async releaseEscrow(id: string, userId: string): Promise<Agreement> {
    const agreement = await this.agreementRepository.findOne({ where: { id } });
    if (!agreement) {
      throw new NotFoundException(`Agreement ${id} not found`);
    }

    if (agreement.escrowStatus !== 'held') {
      throw new BadRequestException('Escrow is not held');
    }

    agreement.escrowStatus = 'released';
    agreement.releasedAt = new Date();

    return this.agreementRepository.save(agreement);
  }
}
