import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";

import { getUserByEmail } from "./data/users";


import redis from "@/lib/redis"; // Adjust the path according to your project structure

async function saveSessionToRedis(session) {
  const sessionKey = `session:${session.user.email2}`;
  await redis.set(sessionKey, JSON.stringify(session), 'EX', 60 * 60); // Set session to expire in 1 hour
}

async function getSessionFromRedis(sessionId) {
  const sessionKey = `session:${sessionId}`;
  const session = await redis.get(sessionKey);
  return session ? JSON.parse(session) : null;
}

// const redis = new Redis({
//     url:'redis://localhost:6379', // Your Upstash Redis URL
//     token: process.env.UPSTASH_REDIS_TOKEN, // Your Upstash Redis token
//   });


// Determine the Redis URL based on the environment
// const redisUrl = process.env.NODE_ENV === 'development'
//   ? 'redis://localhost:6379' // Local Redis for development
//   : process.env.UPSTASH_REDIS_URL; // Upstash Redis for production

// Initialize the Redis client
// const redis = new Redis({
//   url: redisUrl
//   // Use the token only for Upstash Redis
// //   token: process.env.NODE_ENV === 'development' ? undefined : process.env.UPSTASH_REDIS_TOKEN,
// });

// const redis = new Redis({
//     url: 'https://learning-lemming-24006.upstash.io',
//     token: 'AV3GAAIjcDE4MmM4ODQ4N2I2NTg0MGMyYmFhYWIzMTM0ZGMyMjE5YXAxMA',
//   })

// console.log("redis----", redis)
// export default redis;  

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                console.log("authorize credentials", credentials)
                if (credentials === null) return null;
                
                try {
                    const user = getUserByEmail(credentials?.email);
                    console.log("user fetch", user);
                    if (user) {
                        const isMatch = user?.password === credentials.password;

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Email or Password is not correct");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],

    // adapter: UpstashRedisAdapter(redis), 
    session: {
      strategy: 'jwt',
    },

    callbacks: {
        async session({ session, token }) {
          // Here, add additional properties to the session object

          console.log('session, token-----2', session, token)
        //   session.user.email2 = token.email2;
        // //   session.user.role = token.role; // Example additional data
        //   return session;


            // const savedSession = await getSessionFromRedis(token.email2);
            // if (savedSession) {
            //     return savedSession;
            // }
            session.user.email2 = token.email2;
            session.user.role = token.role;

            //   session.user.role = token.role; // Example additional data
            return session;
            // return session;
        },
        async jwt({ token, user }) {

            console.log('token, user-----1', token, user)
          // If the user is logging in, add user data to token
          if (user) {
            token.email2 = user.email2;
            token.role="admin";
            // const session = {
            //     user: {
            //       email2: user.email2,
            //       role: 'admin',
            //     },
            //     expires: Date.now() + 60 * 60 * 1000, // 1 hour expiration
            //   };
            //   await saveSessionToRedis(session);


            // token.role = user.role;
          }
          return token;
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
});
