import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { MultiBusinessTerm } from '../entity/multi-business-term';
import { MultiBusinessTermList } from '../entity/multi-busines-term-list';

@Injectable()
export class MultiBusinessTermRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async fetchAll(): Promise<MultiBusinessTermList> {
    const res = await this.prismaService.multiTerm.findMany({
      include: {
        business_term: true,
      },
    });
    const dataList: MultiBusinessTerm[] = [];
    res.map((data) => {
      const multiTerm = MultiBusinessTerm.create(
        data.id,
        data.business_term.term_name,
        data.business_term.start_date,
        data.business_term.end_date,
        data.start_date,
        data.end_date,
      );
      dataList.push(multiTerm);
    });
    return MultiBusinessTermList.create(dataList);
  }
  async findById(id: number): Promise<MultiBusinessTerm> {
    const data = await this.prismaService.multiTerm.findUnique({
      where: {
        id,
      },
      include: {
        business_term: true,
      },
    });
    return MultiBusinessTerm.create(
      data.id,
      data.business_term.term_name,
      data.business_term.start_date,
      data.business_term.end_date,
      data.start_date,
      data.end_date,
    );
  }
}
