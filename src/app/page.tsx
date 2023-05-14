'use client';
import { useState, createContext, useMemo } from 'react';
import Head from 'next/head';
import { Stack, Grid, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Container } from '../components/Container';
import EndpointInput from '../components/EndpointInput';
import GitHubProjectLink from '../components/GitHubProjectLink';
import Headers from '../components/Headers';
import GraphQLEditor from '../components/GraphQLEditor';
import 'graphiql/graphiql.min.css';
import { createStyles, withStyles } from '@mui/styles';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

const Center = withStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
)(Box);

export default function Home(): JSX.Element {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const [endpoint, setEndpoint] = useState<string>('');
  const [method, setMethod] = useState<string>('POST');
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});

  const handleEndpointChange = (value: string) => setEndpoint(value);
  const handleMethodChange = (value: string) => setMethod(value);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
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

          <Box>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position='static'>
                <Toolbar>
                  <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    GraphQL Online Client
                  </Typography>
                  <IconButton
                    onClick={colorMode.toggleColorMode}
                    color='inherit'
                    sx={{ display: 'inline' }}
                  >
                    {theme.palette.mode === 'dark' ? (
                      <Brightness7 />
                    ) : (
                      <Brightness4 />
                    )}
                  </IconButton>
                </Toolbar>
              </AppBar>
            </Box>
            <Center sx={{ w: '80%', minW: '85%' }}>
              <Stack sx={{ w: '100%' }}>
                <Box
                  id='main'
                  sx={{
                    w: '80%',
                    spacing: '1.5rem',
                    h: 'inherit',
                    pt: '1rem',
                    px: '1rem',
                    bgcolor: 'background.default',
                  }}
                  paddingLeft='0'
                  marginLeft='0'
                  paddingRight='0'
                  marginRight='0'
                  className='line-numbers'
                />

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
                      <Headers onChange={setHeaders} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        bgcolor: 'text.secondary',
                        pb: '1rem',
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
              </Stack>
            </Center>
          </Box>
          <Box>
            <GitHubProjectLink />
          </Box>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
