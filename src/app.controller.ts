import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prsima.service';
import {
  EvaluationServiceController,
  FetchMultiTermsRequest,
  FetchMultiTermsResponese,
} from './proto/sample';

@Controller()
export class AppController implements EvaluationServiceController {
  constructor(private readonly prisma: PrismaService) {}
  @GrpcMethod('EvaluationService')
  async fetchMultiTerms(
    request: FetchMultiTermsRequest,
  ): Promise<FetchMultiTermsResponese> {
    const res = await this.prisma.businessTerm.findFirst({
      where: {
        id: 1,
      },
    });
    const res2 = await this.prisma.multiTerm.findFirst({
      where: {
        id: 1,
      },
    });
    const ret: FetchMultiTermsResponese = {
      id: res.id,
      businessTermName: res.term_name,
      businessTermStartDate: res.start_date.toLocaleString(),
      businessTermEndDate: res.end_date.toString(),
      multiTermStartDate: res2.start_date.toString(),
      multiTermEndDate: res2.end_date.toString(),
    };
    return ret;
  }
}
