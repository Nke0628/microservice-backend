import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { MultiBusinessTerm } from '../entity/multi-business-term';
import { MultiBusinessTermList } from '../entity/multi-busines-term-list';
import { FetchAllRequest } from 'src/proto/generated/multi_evaluation';

@Injectable()
export class MultiBusinessTermRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async fetchAll(arg: FetchAllRequest): Promise<MultiBusinessTermList> {
    const res = await this.prismaService.multiTerm.findMany({
      take: arg.take,
      orderBy: {
        start_date: arg.orderBy ? 'asc' : 'desc',
      },
      include: {
        business_term: true,
      },
    });
    const dataList: MultiBusinessTerm[] = [];
    res.map((data) => {
      const multiTerm = MultiBusinessTerm.create(
        {
          businessTermName: data.business_term.term_name,
          businessTermStartDate: data.business_term.start_date,
          businessTermEndDate: data.business_term.end_date,
          MultiTermStartDate: data.start_date,
          MultiTermEndDate: data.end_date,
        },
        data.id,
      );
      dataList.push(multiTerm);
    });
    return MultiBusinessTermList.create(dataList);
  }
}
