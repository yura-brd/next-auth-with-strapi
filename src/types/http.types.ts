import { IResponseLogin } from '@/types/auth.types';

export interface IErrorHttp {
  status: number,
  name: string,
  message: string,
  details: Record<string, any>
}
export interface IResponseLoginResponse {
  data: null | IResponseLogin
  error: null | IErrorHttp

}