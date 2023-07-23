import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { MultiEvaluation } from '../model/multi-evaluation';
import { MultiEvaluationList } from '../model/multi-evaluation-list';
import { MultiEvaluationMapper } from '../mapper/mulit-evaluation.mapper';
import { Optional } from 'typescript-optional';
import { MultiEvaluation as MultiEvaluationModel } from '@prisma/client';
import { MultiEvaluationSearchCondition } from 'src/multi-evaluation/presentation/search-condition/multi-evaluation-search-condition';

@Injectable()
export class MultiEvaluationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: number): Promise<Optional<MultiEvaluation>> {
    const multiEvaluationModel =
      await this.prismaService.multiEvaluation.findUnique({
        where: {
          id,
        },
      });
    return Optional.ofNullable(multiEvaluationModel).map((model) =>
      MultiEvaluationMapper.toDomain(model),
    );
  }

  async create(multiEvaluation: MultiEvaluation): Promise<MultiEvaluation> {
    return await this.prismaService.$transaction(async (prisma) => {
      const multiEvaluationModel = await prisma.multiEvaluation.create({
        data: {
          user_id: multiEvaluation.getUserId,
          target_user_id: multiEvaluation.getTargetUserId,
          multi_term_id: multiEvaluation.getMultiTermId,
          score: multiEvaluation.getScore,
          good_comment: multiEvaluation.getGoodComment,
          improvement_comment: multiEvaluation.getImprovementComment,
        },
      });
      return MultiEvaluationMapper.toDomain(multiEvaluationModel);
    });
  }

  async fetchByTermIdAndUserId(
    multiTermId: number,
    userId: number,
  ): Promise<MultiEvaluationList> {
    const multiEvaluationModel =
      await this.prismaService.multiEvaluation.findMany({
        where: {
          multi_term_id: multiTermId,
          user_id: userId,
        },
      });
    return MultiEvaluationMapper.toDomainList(multiEvaluationModel);
  }

  async search(
    searchCondition: MultiEvaluationSearchCondition,
  ): Promise<[MultiEvaluationList, number]> {
    const queryParameterList = [];

    // ベースクエリ
    let sql = 'select MultiEvaluation.* from MultiEvaluation ';
    sql += 'inner join User ON MultiEvaluation.user_id = User.id ';

    // 対象者
    sql += 'where User.id in (?) ';
    queryParameterList.push(searchCondition.getUserId.join(','));

    // 所属
    if (searchCondition.getName) {
      sql += 'And User.name like ? ';
      queryParameterList.push('%' + searchCondition.getName + '%');
    }

    // 役職
    if (searchCondition.getName) {
      sql += 'And User.name like ? ';
      queryParameterList.push('%' + searchCondition.getName + '%');
    }

    // レポート提出状況
    if (searchCondition.isSelectedReportStatusList()) {
      let existFirstWhereCondition = false;
      sql += 'And (  ';
      if (searchCondition.isSelectedUnSubmitted()) {
        sql += '( User.name is NUll OR MultiEvaluation.score = 1 ) ';
        existFirstWhereCondition = true;
      }
      if (searchCondition.isSelectedAccepted()) {
        sql += existFirstWhereCondition ? 'OR ' : '';
        sql += '( User.name is NUll OR MultiEvaluation.score = 1 ) ';
        existFirstWhereCondition = true;
      }
      sql += ' )';
    }

    // WARNING
    // $queryRawUnsafeを使用しているので、入力値は必ずパラメータ化して渡してください。
    // 入力値を直接SQL文中で変数展開する場合SQLインジェクションになります。
    const multiEvaluationModel = await this.prismaService.$queryRawUnsafe<
      MultiEvaluationModel[]
    >(sql, ...queryParameterList);

    return [MultiEvaluationMapper.toDomainList(multiEvaluationModel), 1];
  }
}
