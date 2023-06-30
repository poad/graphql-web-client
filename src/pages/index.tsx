'use client';
import { useState } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { TextField } from '@mui/material';
import dynamic from 'next/dynamic';
import { GraphiQLInterface } from 'graphiql';
import 'graphiql/graphiql.min.css'

const GraphiQLProvider = dynamic(() => import('graphiql'), { ssr: false });

export default function Home(): JSX.Element {
  const [url, setUrl] = useState<string>();

  const fetcher = createGraphiQLFetcher({
    url: url || 'https://beta.pokeapi.co/graphql/v1beta',
    fetch,
  });

  return (
    <>
      <Head>
        <title>GraphQL Client</title>
        <meta name='description' content='GraphQL Client' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box sx={{ w: '100vmax', h: '100vmin' }} alignItems='flex-start'>
        <TextField
          name={'endpoint'}
          placeholder='GraphQL endpoint'
          sx={{ minWidth: 'calc(100vmax - 2rem)', fontSize: '14', padding: '0', marginTop: '1rem', marginLeft: '1rem' }}
          value={url}
          onChange={async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => setUrl(event.target.value)}
        />

        <div style={{ height: '90vh', width: '100vmax' }}>
          <GraphiQLProvider fetcher={fetcher}>
            <GraphiQLInterface />
          </GraphiQLProvider>
        </div>
      </Box>
    </>
  );
}
