import '../app/globals.css';
import { ApolloWrapper } from "../app/graphql/apollo-wrapper";
import { DarkModeProvider } from '../app/DarkModeContext';

function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <ApolloWrapper>
        <Component {...pageProps} />
      </ApolloWrapper>
    </DarkModeProvider>
  );
}

export default MyApp;
