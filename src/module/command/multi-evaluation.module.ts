import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MultiTermRepository } from './domain/multi-term/infrastructure/multi-term.respository';
import { MultiEvaluationRepository } from './domain/multi-evaluation/infrastructure/multi-evaluation.repository';
import { UserRepository } from './domain/user/infrastructure/user.repository';
import { MultiEvaluationController } from './presentation/multi-evaluation.cotroller';
import { ReportSettingRepository } from './domain/report-setting/domain/infrastructure/report-setting.repository';
import { ManagerNormaApplyRepository } from './domain/norma-apply/infrastructure/manager-norma-apply.repository';
import { FindManagerNormaApplyByUserIdAndMultiTermIdUseCase } from './usecase/find-manager-norma-apply.usecase';
import { SaveReportSettingUseCase } from './usecase/save-report-setting.usecase';
import { SearchMultiEvaluationUseCase } from './usecase/search-multi-evaluation.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [MultiEvaluationController],
  providers: [
    SaveReportSettingUseCase,
    FindManagerNormaApplyByUserIdAndMultiTermIdUseCase,
    SearchMultiEvaluationUseCase,
    UserRepository,
    MultiTermRepository,
    MultiEvaluationRepository,
    ManagerNormaApplyRepository,
    ReportSettingRepository,
  ],
})
export class MultiEvaluaionModule {}
