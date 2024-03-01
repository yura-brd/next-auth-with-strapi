import { IUserInfo } from '@/types/user.types';

export type providerType = 'google' | 'credentials' | 'github';

export type IOptionsRegisterUser = {
  email: string;
  password: string;
  username: string;
};
export type IOptionsCredentials = {
  identifier: string;
  password: string;
};

export interface IResponseLogin {
  jwt: string;
  user: IUserInfo
}





export type loginOrRegisterType = IOptionsCredentials | IOptionsRegisterUser;