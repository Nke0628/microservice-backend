import { Injectable } from '@nestjs/common';
import { RegisterReportSettingsRequest } from 'src/proto/generated/microservice_backend/v1/multi_evaluation';
import { Optional } from 'typescript-optional';
import { ReportSettingRepository } from '../domain/report-setting/domain/infrastructure/report-setting.repository';
import { ReportSetting } from '../domain/report-setting/domain/model/report-setting';

@Injectable()
export class SaveReportSettingUseCase {
  constructor(
    private readonly reportSettingRepository: ReportSettingRepository,
  ) {}
  public async execute(
    request: RegisterReportSettingsRequest,
  ): Promise<ReportSetting> {
    // STEP1 レポート設定取得
    const reportSetting = await this.reportSettingRepository.fetchByTermId(
      request.termId,
    );

    // STEP2 レポート設定が取得できない場合は初期レポート設定を生成
    const reportSettingDomain = Optional.ofNullable(reportSetting).orElse(
      ReportSetting.initialCreate(request.termId),
    );

    // STEP3 レポート設定保存
    reportSettingDomain.sava(request.userId, request.reportSettingDetails);

    // STEP4 レポート設定DB保存
    await this.reportSettingRepository.save(reportSettingDomain);

    // STEP5 レポート設定際取得
    return await this.reportSettingRepository.fetchByTermId(request.termId);
  }
}
