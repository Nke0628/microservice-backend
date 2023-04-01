/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "sample";

export interface SampleDataById {
  id: number;
}

export interface SamepleData {
  id: number;
  name: string;
}

export const SAMPLE_PACKAGE_NAME = "sample";

export interface AppServiceClient {
  findOne(request: SampleDataById): Observable<SamepleData>;
}

export interface AppServiceController {
  findOne(request: SampleDataById): Promise<SamepleData> | Observable<SamepleData> | SamepleData;
}

export function AppServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AppService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AppService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const APP_SERVICE_NAME = "AppService";
