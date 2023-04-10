import { Injectable } from '@nestjs/common';
import {
  FetchAllRequest,
  FetchAllResponse,
  MultiBusinessTerm,
} from 'src/proto/generated/multi_evaluation';
import { MultiBusinessTermRepository } from '../infrastructure/multi-business-term.respository';

@Injectable()
export class MultiBusinessTermService {
  constructor(
    private readonly multiTermRepository: MultiBusinessTermRepository,
  ) {}
  async fetchAll(arg: FetchAllRequest): Promise<MultiBusinessTerm[]> {
    const responese = await this.multiTermRepository.fetchAll(arg);
    const ret = [];
    responese.getList().map((data) => {
      const temp = {
        id: data.getId,
        businessTermName: data.getBusinessTermName,
        businessTermStartDate: data.getBusinessTermStartDate.toLocaleString(),
        businessTermEndDate: data.getBusinessTermEndDate.toString(),
        multiTermStartDate: data.getMultiTermStartDate.toString(),
        multiTermEndDate: data.getMultiTermEndDate.toString(),
        isCurrentTerm: data.isCurrentTerm(),
      };
      ret.push(temp);
    });
    return ret;
  }
}
