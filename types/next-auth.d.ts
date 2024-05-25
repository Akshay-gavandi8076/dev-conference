// declare global {
//   interface User {
//     id: string
//   }

//   module 'next-auth' {
//     interface Session {
//       user: User
//     }
//   }
// }

// import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
// import { JWT } from 'next-auth/jwt'

// declare module 'next-auth' {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       /** The user's postal address. */
//       id: string
//     } & DefaultSession['user']
//   }
// }

//   interface User extends DefaultUser {
//     id: string
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id?: string
//   }
// }
