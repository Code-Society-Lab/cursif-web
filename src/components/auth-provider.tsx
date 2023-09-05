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

export function AuthProvider({ children }) {
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