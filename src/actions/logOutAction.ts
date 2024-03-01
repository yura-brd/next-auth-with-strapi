'use server'

import { signOut } from '@/auth';
import { DEFAULT_LOGOUT_REDIRECT } from '@/consts/routes.consts';
export const logOutAction = async () => {
  return await signOut({ redirect:true, redirectTo: DEFAULT_LOGOUT_REDIRECT });
}