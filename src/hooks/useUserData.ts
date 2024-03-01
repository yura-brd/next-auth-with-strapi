import { useSession } from 'next-auth/react';
import { IUserInfo } from '@/types/user.types';

export const useUserData = ():  IUserInfo | null => {
  const { data } = useSession();
  if (!data || !data.user.userInfo) {
    return null;
  }

  return data.user.userInfo;
};