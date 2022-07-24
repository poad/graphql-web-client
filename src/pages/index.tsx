import React, { useState } from 'react';
import Head from 'next/head';
import {
  Stack, Grid,
} from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Main } from 'components/Main';
import { Container } from 'components/Container';
import { Footer } from 'components/Footer';
import EndpointInput from 'components/EndpointInput';
import GitHubProjectLink from 'components/GitHubProjectLink';
import Headers from 'components/Headers';
import 'graphiql/graphiql.min.css';
import GraphQLEditor, { ColorMode } from 'components/GraphQLEditor';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

interface HomeProps {
  mode: ColorMode,
}

const Home = ({ mode }: HomeProps): JSX.Element => {
  const [endpoint, setEndpoint] = useState<string>('');
  const [method, setMethod] = useState<string>('POST');
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const handleEndpointChange = (value: string) => setEndpoint(value);
  const handleMethodChange = (value: string) => setMethod(value);

  return (
    <Container
      paddingLeft='0'
      marginLeft='0'
      paddingRight='0'
      marginRight='0'
    >
      <Head>
        <title>GraphQL Client</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Main
        title="GraphQL Online Client"
        paddingLeft='0'
        marginLeft='0'
        paddingRight='0'
        marginRight='0'
        sx={{ w: '100%', maxW: '100%', bgcolor: 'background.default' }}
        theme={theme}
        colorMode={colorMode}
      >
        <Stack
          spacing={4}
          sx={{
            align: 'stretch',
            marginTop: '4',
            borderWidth: '1px',
            borderRadius: 'lg',
            padding: '6 4',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <EndpointInput
                value={endpoint}
                onChange={handleEndpointChange}
                onSelect={handleMethodChange}
              />
              <Headers
                onChange={setHeaders}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                bgcolor: 'text.secondary',
                pb: '1rem'
              }}
            >
              <GraphQLEditor
                endpoint={endpoint}
                method={method}
                headers={headers}
                sx={{ height: '70vh' }}
                colorMode={mode}
              />
            </Grid>
          </Grid>
        </Stack>
      </Main>
      <Footer>
        <GitHubProjectLink />
      </Footer>
    </Container>
  );
};

const ToggleColorMode = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Home mode={mode} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default ToggleColorMode;

