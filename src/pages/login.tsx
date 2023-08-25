// pages/login.js (or login.tsx)
import { ApolloWrapper } from "../app/graphql/apollo-wrapper";
import '../app/globals.css';
import LoginScreen from '../app/graphql/screens/LoginScreen';

function LoginPage() {
  return (
    <ApolloWrapper>
      <LoginScreen />
    </ApolloWrapper>
  );
}

export default LoginPage;
