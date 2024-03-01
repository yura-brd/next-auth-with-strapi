import { DefaultSession } from 'next-auth';
import { IUserInfo } from '@/types/user.types';


export type ExtendedUser = DefaultSession["user"] & {
  // start from social
  email?:string;
  image?:string
  name: string
  // end from social

  userInfo: IUserInfo
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}