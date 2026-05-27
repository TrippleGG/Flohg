import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto, providerId: string): Promise<Offer> {
    const offer = this.offerRepository.create({
      ...createOfferDto,
      providerId,
      status: 'pending',
    });
    return this.offerRepository.save(offer);
  }

  async updateOffer(id: string, updateDto: UpdateOfferDto, userId: string): Promise<Offer> {
    const offer = await this.offerRepository.findOne({ where: { id } });
    if (!offer) {
      throw new NotFoundException(`Offer ${id} not found`);
    }

    if (updateDto.action === 'accept') {
      if (offer.taskRequesterId !== userId) {
        throw new BadRequestException('Only task requester can accept offer');
      }
      offer.status = 'accepted';
    } else if (updateDto.action === 'counter') {
      offer.amount = updateDto.amount;
      offer.status = 'countered';
    } else if (updateDto.action === 'withdraw') {
      offer.status = 'withdrawn';
    }

    return this.offerRepository.save(offer);
  }
}
