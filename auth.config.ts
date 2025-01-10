import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import axios from 'axios';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        }
      },
      async authorize(credentials, _req) {
        console.log('NEXT REQ---', _req.url.split('/').splice(0, 3).join('/'));

        try {
          const request = await axios.post(
            `${_req.url.split('/').splice(0, 3).join('/')}/api/auth-custom`,
            { email: credentials?.email as string }
          );
          return request.data.data;
        } catch (e) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
