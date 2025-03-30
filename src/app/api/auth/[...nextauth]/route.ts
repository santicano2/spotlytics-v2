import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-top-read",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
};

// ✅ Exporta NextAuth como el handler de la API
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
