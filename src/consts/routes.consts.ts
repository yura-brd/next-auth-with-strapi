import { ROUTE_LINKS } from '@/consts/main.consts';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = ROUTE_LINKS.dashboard.main;
export const DEFAULT_LOGOUT_REDIRECT: string = ROUTE_LINKS.main;


/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes : string[] = [
  ROUTE_LINKS.auth.login,
  ROUTE_LINKS.auth.register,
  ROUTE_LINKS.auth.reset,
  ROUTE_LINKS.auth.error,
  ROUTE_LINKS.auth.newPassword,
];

export const PRIVATE_ROUTE_START: string = ROUTE_LINKS.dashboard.main;

export const CALLBACK_URL_KEY = 'callbackUrl';