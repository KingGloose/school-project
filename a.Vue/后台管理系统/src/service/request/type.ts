import type { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";

// 针对AxiosRequestConfig配置进行扩展
export interface HYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig | AxiosRequestConfig) => any;
  requestFailureFn?: (err: any) => any;
  responseSuccessFn?: (res: T) => T;
  responseFailureFn?: (err: any) => any;
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYInterceptors<T>;
}
