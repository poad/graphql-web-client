'use client';
import Box, { BoxProps } from '@mui/material/Box';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.min.css';

export type ColorMode = 'light' | 'dark';

interface GraphQLEditorProps extends BoxProps {
  endpoint: string;
  method: string;
  headers: { [key: string]: string };
  colorMode: ColorMode;
}

export default function GraphQLEditor({
  endpoint,
  method,
  headers,
  colorMode,
  ...props
}: GraphQLEditorProps): JSX.Element {
  const fetcher = async (graphQLParams: unknown) => {
    const data = await fetch(endpoint, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(graphQLParams),
      credentials: 'same-origin',
    });
    return data.json().catch(() => data.text());
  };

  return (
    <Box>
      <Box {...props}>
        <GraphiQL
          fetcher={fetcher}
          shouldPersistHeaders
          editorTheme='github-dark'
        />
      </Box>
    </Box>
  );
}
