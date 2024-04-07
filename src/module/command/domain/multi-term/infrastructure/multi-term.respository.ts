import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { MultiTermList } from '../model/multi-term-list';
import { MultiTermMapper } from '../mapper/multi-term.mapper';
import { Prisma } from '@prisma/client';

export type MultiTermWithBusinessTerm = Prisma.MultiTermGetPayload<{
  include: { business_term: true };
}>;

@Injectable()
export class MultiTermRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchAll(take: number, orderBy: boolean): Promise<MultiTermList> {
    const multiTermWithBusinessTermEntities =
      await this.prismaService.multiTerm.findMany({
        take: take,
        orderBy: {
          start_date: orderBy ? 'asc' : 'desc',
        },
        include: {
          business_term: true,
        },
      });
    return MultiTermMapper.toDomainList(multiTermWithBusinessTermEntities);
  }
}
