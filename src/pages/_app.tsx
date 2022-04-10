import { AppProps } from 'next/app';
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

const App = ({ Component }: AppProps): JSX.Element => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component />
    </ChakraProvider>);
};

export default App;
