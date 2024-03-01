import Credentials from "next-auth/providers/credentials"
import Google from 'next-auth/providers/google';
import { NextAuthConfig } from 'next-auth';
import { LoginSchema, RegisterSchema } from '@/schemas';
import { $api } from '@/lib/$api';
import { IResponseLogin } from '@/types/auth.types';
import { IResponseLoginResponse } from '@/types/http.types';



export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      async authorize(credentials) {
        if ('identifier' in credentials) {
          // login
          const validatedLogin = LoginSchema.safeParse(credentials);
          if (validatedLogin.success) {
            const response: IResponseLogin | IResponseLoginResponse = await $api('auth/local', {
              method: 'POST',
              body: validatedLogin.data
            });

            if (response && 'user' in response && response.user.username) {
              return {
                ...response.user,
                jwt: response.jwt
              };
            } else {
              if ('error' in response) {
                throw new Error(response?.error?.message || 'Error')
              } else {
                throw new Error('Error')
              }
            }
          }
        } else {
          // register
          const validatedRegister = RegisterSchema.safeParse(credentials);
          if (validatedRegister.success) {
            const response: IResponseLogin | IResponseLoginResponse = await $api('auth/local/register', {
              method: 'POST',
              body: validatedRegister.data
            });

            if (response && 'user' in response) {
              return {
                ...response.user,
                jwt: response.jwt
              };

            } else if(response.error) {
              throw new Error(response.error.message)
            } else {
              return null;
            }
          }
        }
        return null;
      }
    }),
  ],
} satisfies NextAuthConfig