import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import GraphiQL, { FetcherParams } from 'graphiql';
import NoSSR from 'react-no-ssr';
import 'graphiql/graphiql.min.css';

interface GraphQLEditorProps extends BoxProps {
  endpoint: string,
  method: string,
  headers: { [key: string]: string },
}

const isURL = (text: string): boolean => {
  try {
    new URL(text);
    return true;
  } catch (err) {
    return false;
  }
}

const GraphQLEditor = ({ endpoint, method, headers, ...props }: GraphQLEditorProps): JSX.Element => {
  const fetcher = async (graphQLParams: FetcherParams) => {
    const data = await fetch(
      endpoint,
      {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(graphQLParams),
        credentials: 'same-origin',
      },
    );
    return data.json().catch(() => data.text());
  };

  return (
    <Box visibility={isURL(endpoint) ? 'visible' : 'hidden'} {...props}>
      <NoSSR>
        <GraphiQL
          fetcher={fetcher}
        />
      </NoSSR>
    </Box>
  );
};

export default GraphQLEditor;
