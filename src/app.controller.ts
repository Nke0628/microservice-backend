import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import {
  AppServiceController,
  SamepleData,
  SampleDataById,
} from './proto/sample';

@Controller()
export class AppController implements AppServiceController {
  @GrpcMethod('AppService')
  findOne(
    request: SampleDataById,
  ): SamepleData | Promise<SamepleData> | Observable<SamepleData> {
    const itmes = [
      { id: 1, name: 'john' },
      { id: 2, name: 'Doe' },
    ] as SamepleData[];
    const filterdItem = itmes.filter((item) => item.id === request.id);
    return filterdItem.length > 0 ? filterdItem[0] : ({} as SamepleData);
  }
}
