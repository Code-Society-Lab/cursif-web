import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, gql, useSuspenseQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';
import Loader from '@components/loader';

export const AuthContext = createContext({});

const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      firstName
      lastName
    }
  }
`;

/*
 * The AuthProvider component serves as a higher-level context provider for managing user
 * authentication in your application. It uses Apollo Client to make a GraphQL  query to fetch
 * current user data when the component is mounted and provides the authenticated user
 * information to the rest of your application via the AuthContext.
 *
 * # Usage
 * To use the AuthProvider, you should wrap your application's root component (layout.tsx)
 * with it. This ensures that the authentication context is available throughout
 * your application. To access the user called `useUser`.
 *
 * # Example
  * // web/src/app/layout.tsx
  * ```
  * import { AuthProvider, useAuth } from '@redwoodjs/auth'
  *
  * export default function RootLayout({ children }: { children: React.ReactNode }) {
  *   return (
  *     <ApolloWrapper>
  *       <html lang="en">
  *         <body className="min-w-[350px]">
  *           {children}
  *         </body>
  *       </html>
  *     </ApolloWrapper>
  *   );
  * }
  * ```
  *
  * // web/src/pages/index.tsx
  * ```
  * import { useAuth } from '@redwoodjs/auth'
  *
  *  "use client"
  *
  *  import React from 'react';
  *  import { useAuth } from '@components/auth-provider';
  *
  *  export default function Page(): JSX.Element {
  *    const { user } = useAuth();
  *
  *    return (
  *      <div>
  *        <div>USERNAME: {user?.username}</div>
  *      </div>
  *    );
  *  }
  * ```
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { data, loading, error } = useQuery(GET_ME, {
    onCompleted: ({ me }) => {
      setUser(me);
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
      router.push("/login");
    }
  });

  if (loading)
    return <Loader />;

  if (error) 
    return null;

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}