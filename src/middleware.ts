import { auth } from '@/auth';
import {ROUTE_LINKS } from '@/consts/main.consts';
import { authRoutes, CALLBACK_URL_KEY, DEFAULT_LOGIN_REDIRECT, PRIVATE_ROUTE_START } from '@/consts/routes.consts';


export default auth((req)=> {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;


  const {pathname} = nextUrl;

  const isAuthRoute = authRoutes.includes(pathname);
  const isPrivateRoute = pathname.startsWith(PRIVATE_ROUTE_START);


  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  if (isPrivateRoute && !isLoggedIn) {

    const { searchParams, pathname: pathnameRedirect} = nextUrl;

    // start create redirect url
    const callbackUrl = searchParams.get(CALLBACK_URL_KEY);
    let callbackUrlRes: string | null = null;
    if (callbackUrl) {
      callbackUrlRes = callbackUrl;
    } else if (pathnameRedirect) {
      callbackUrlRes = pathnameRedirect;
    }

    const newUrl = new URL(ROUTE_LINKS.auth.login, nextUrl.href);
    if (callbackUrlRes) {
      newUrl.searchParams.set(CALLBACK_URL_KEY, callbackUrlRes)
    }
    // end create redirect url

    return Response.redirect(newUrl);
  }

  if (pathname === '/auth') {
    return Response.redirect(new URL(ROUTE_LINKS.auth.login, nextUrl));
  }
  // return null;

})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}