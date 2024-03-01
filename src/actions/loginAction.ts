'use server'

import { signIn } from '@/auth';
import { loginOrRegisterType, providerType } from '@/types/auth.types';
import { saveErrorServer } from '@/lib/errors';
import { DEFAULT_LOGIN_REDIRECT } from '@/consts/routes.consts';
import { AuthError } from 'next-auth';

export const loginAction = async (provider: providerType, options?: loginOrRegisterType, callbackUrl?: string | null) => {
  try {
    return await signIn(provider, {
      ...options,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  } catch (error: any) {
    saveErrorServer(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: 'Invalid credentials'
          }
        default:
          return {
            error: error?.cause?.err?.message || 'Something went wrong'
          }
      }

    }
    throw error;

    // if (error.cause && error.cause.err) {
    //   const errorMessage = error.cause.err.message;
    //   throw new Error(errorMessage || 'Error');
    // } else {
    //   throw error;
    // }
  }
}

