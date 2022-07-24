import React, { useState } from 'react';
import Head from 'next/head';
import {
  Stack, Grid,
} from '@mui/material';
import { Main } from 'components/Main';
import { Container } from 'components/Container';
import { Footer } from 'components/Footer';
import EndpointInput from 'components/EndpointInput';
import GitHubProjectLink from 'components/GitHubProjectLink';
import Headers from 'components/Headers';
import 'graphiql/graphiql.min.css';
import GraphQLEditor from 'components/GraphQLEditor';

const Home = (): JSX.Element => {
  const [endpoint, setEndpoint] = useState<string>('');
  const [method, setMethod] = useState<string>('POST');
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});

  const handleEndpointChange = (value: string) => setEndpoint(value);
  const handleMethodChange = (value: string) => setMethod(value);

  return (
    <Container paddingLeft='0' marginLeft='0' paddingRight='0' marginRight='0' sx={{ w: '100%', maxW: '100%' }}>
      <Head>
        <title>GraphQL Client</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Main title="GraphQL Online Client" paddingLeft='0' marginLeft='0' paddingRight='0' marginRight='0' sx={{ w: '100%', maxW: '100%' }}>
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
            >
              <GraphQLEditor
                endpoint={endpoint}
                method={method}
                headers={headers}
                sx={{ height: '70vh' }} />
            </Grid>
          </Grid>
        </Stack>
      </Main>
      <GitHubProjectLink />

      <Footer>
      </Footer>
    </Container>
  );
};

export default Home;
