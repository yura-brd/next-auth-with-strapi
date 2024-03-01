import NextAuth from "next-auth"
import authConfig from './auth.config';
import { JWT } from '@auth/core/jwt';
import { $api } from '@/lib/$api';
import { IResponseLogin } from '@/types/auth.types';
import { ROUTE_LINKS } from '@/consts/main.consts';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  //unstable_update
} = NextAuth({
  pages: {
    signIn: ROUTE_LINKS.auth.login,
    error: ROUTE_LINKS.auth.error,
  },
  // events: {
    // async linkAccount({ user }) { }
  // },
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    // async signIn({ user, account }): Promise<boolean> {
    //   return true;
    // },

    async jwt({ token, user, account }): Promise<JWT | null> {
      const isSignIn = !!user && !!account;
      if (isSignIn) {
        if (account?.provider === "credentials") {
          if ('jwt' in user) {
            token.jwt = user.jwt;
            token.userInfo = user;
          }
          return token;
        } else {
          const data: IResponseLogin = await $api(`auth/${account.provider}/callback`, {
            method: 'GET',
            body: {
              access_token: account.access_token
            }
          });
          if (!data.user) {
            return null;
          }

          token.jwt = data.jwt;
          token.userInfo = data.user;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.userInfo = token.userInfo as any;
      }
      return session;
    },
  },
  ...authConfig,
});