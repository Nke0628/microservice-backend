import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { multiBusinessTerm } from '../Entity/multiBusinessTerm';
import { multiBusinessTermList } from '../Entity/multiBusinessTermList';

@Injectable()
export class MultiBusinessTermRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async fetchAll(): Promise<multiBusinessTermList> {
    const res = await this.prismaService.multiTerm.findMany({
      include: {
        business_term: true,
      },
    });
    const dataList: multiBusinessTerm[] = [];
    res.map((data) => {
      const multiTerm = multiBusinessTerm.create(
        data.id,
        data.business_term.term_name,
        data.business_term.start_date,
        data.business_term.end_date,
        data.start_date,
        data.end_date,
      );
      dataList.push(multiTerm);
    });
    return multiBusinessTermList.create(dataList);
  }
  async findById(id: number): Promise<multiBusinessTerm> {
    const data = await this.prismaService.multiTerm.findUnique({
      where: {
        id,
      },
      include: {
        business_term: true,
      },
    });
    return multiBusinessTerm.create(
      data.id,
      data.business_term.term_name,
      data.business_term.start_date,
      data.business_term.end_date,
      data.start_date,
      data.end_date,
    );
  }
}
