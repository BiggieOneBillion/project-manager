// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

// import NextAuth from 'next-auth';
// import authConfig from './auth.config';

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   if (!req.auth) {
//     const url = req.url.replace(req.nextUrl.pathname, '/');
//     return Response.redirect(url);
//   }
// });

// export const config = { matcher: ['/dashboard/:path*'] };

// import { NextRequest, NextResponse } from 'next/server';
// import { verifyToken } from './app/api-settings/jwt';

// export function middleware(req: NextRequest) {
//   const authHeader = req.headers.get('authorization');

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return NextResponse.json(
//       { error: 'Unauthorized: No token provided' },
//       { status: 401 }
//     );
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     // Verify the token using the secret key
//     const decoded = verifyToken(token);

//     // console.log(decoded);

//     // Optionally, attach the decoded data to the request headers
//     const reqWithUser = NextResponse.next();
//     reqWithUser.headers.set('user', JSON.stringify(decoded));

//     return reqWithUser;
//   } catch (error) {
//     return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
//   }
// }

// export const config = {
//   matcher: ['/api/:path*']
// };
