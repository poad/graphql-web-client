'use client';
import {
  ReactElement,
  useEffect,
  useRef,
  useState,
  createContext,
  useMemo,
} from 'react';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { editor, KeyMod, KeyCode, languages } from 'monaco-editor';
import { Fetcher, createGraphiQLFetcher } from '@graphiql/toolkit';
import * as JSONC from 'jsonc-parser';
import {
  DEFAULT_EDITOR_OPTIONS,
  MONACO_GRAPHQL_API,
  STORAGE_KEY,
  MODEL,
} from './constants';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

async function getSchema(fetcher: Fetcher): Promise<IntrospectionQuery> {
  const data = await fetcher({
    query: getIntrospectionQuery(),
    operationName: 'IntrospectionQuery',
  });

  const introspectionJSON =
    'data' in data && (data.data as unknown as IntrospectionQuery);

  if (!introspectionJSON) {
    if ('message' in data && data.message) {
      throw new Error(data.message.toString());
    }
    throw new Error(
      'this demo does not support subscriptions or http multipart yet',
    );
  }
  return introspectionJSON;
}

function debounce<F extends (...args: unknown[]) => unknown>(
  duration: number,
  fn: F,
) {
  let timeout = 0;
  return (...args: Parameters<F>) => {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      timeout = 0;
      fn(args);
    }, duration);
  };
}

// set these early on so that initial variables with comments don't flash an error
languages.json.jsonDefaults.setDiagnosticsOptions({
  allowComments: true,
  trailingCommas: 'ignore',
});

type CodeEditor = editor.IStandaloneCodeEditor | null;

export default function Editor({
  url,
  headers,
}: { url: string; headers?: Record<string, string> }): ReactElement {
  const operationsRef = useRef<HTMLDivElement>(null);
  const variablesRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const [operationsEditor, setOperationsEditor] = useState<CodeEditor>(null);
  const [variablesEditor, setVariablesEditor] = useState<CodeEditor>(null);
  const [responseEditor, setResponseEditor] = useState<CodeEditor>(null);
  const [schema, setSchema] = useState<IntrospectionQuery | null>(null);
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState<'vs-light' | 'vs-dark'>('vs-dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setTheme((prevMode) =>
          prevMode === 'vs-light' ? 'vs-dark' : 'vs-light',
        );
      },
    }),
    [],
  );
  const fetcher = createGraphiQLFetcher({ url, headers });

  const queryAction: editor.IActionDescriptor = {
    id: 'graphql-run',
    label: 'Run Operation',
    contextMenuOrder: 0,
    contextMenuGroupId: 'graphql',
    keybindings: [
      // eslint-disable-next-line no-bitwise
      KeyMod.CtrlCmd | KeyCode.Enter,
    ],
    async run() {
      const result = await fetcher({
        query: MODEL.operations.getValue(),
        variables: JSONC.parse(MODEL.variables.getValue()),
      });
      // TODO: this demo only supports a single iteration for http GET/POST,
      // no multipart or subscriptions yet.
      // @ts-expect-error
      const data = await result.next();
      MODEL.response.setValue(JSON.stringify(data.value, null, 2));
    },
  };

  /**
   * Create the models & editors
   */
  useEffect(() => {
    if (!operationsEditor && operationsRef.current) {
      const codeEditor = editor.create(operationsRef.current, {
        model: MODEL.operations,
        ...DEFAULT_EDITOR_OPTIONS,
      });
      codeEditor.addAction(queryAction);
      MODEL.operations.onDidChangeContent(
        debounce(300, () => {
          localStorage.setItem(
            STORAGE_KEY.operations,
            MODEL.operations.getValue(),
          );
        }),
      );
      setOperationsEditor(codeEditor);
    }
    if (!variablesEditor && variablesRef.current) {
      const codeEditor = editor.create(variablesRef.current, {
        model: MODEL.variables,
        ...DEFAULT_EDITOR_OPTIONS,
      });
      codeEditor.addAction(queryAction);
      MODEL.variables.onDidChangeContent(
        debounce(300, () => {
          localStorage.setItem(
            STORAGE_KEY.variables,
            MODEL.variables.getValue(),
          );
        }),
      );
      setVariablesEditor(codeEditor);
    }
    if (!responseEditor && responseRef.current) {
      setResponseEditor(
        editor.create(responseRef.current, {
          model: MODEL.response,
          ...DEFAULT_EDITOR_OPTIONS,
          readOnly: true,
          smoothScrolling: true,
        }),
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- only run once on mount
  /**
   * Handle the initial schema load
   */
  useEffect(() => {
    if (schema || loading) {
      return;
    }
    setLoading(true);
    void getSchema(fetcher).then(async (introspectionJSON) => {
      MONACO_GRAPHQL_API.setSchemaConfig([
        { introspectionJSON, uri: 'myschema.graphql' },
      ]);
      setSchema(introspectionJSON);
      setLoading(false);
    });
  }, [schema, loading]);
  /**
   * Handle the initial schema load
   */
  useEffect(() => {
    if (responseEditor) {
      responseEditor.updateOptions({
        theme,
      });
    }
  }, [theme]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <Box sx={{ flexGrow: 1 }}>
          <IconButton
            onClick={colorMode.toggleColorMode}
            color='inherit'
            sx={{ display: 'inline' }}
          >
            {theme === 'vs-dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        <div className='pane'>
          <div ref={operationsRef} className='left-editor' />
          <div ref={variablesRef} className='left-editor' />
        </div>
        <div ref={responseRef} className='pane' />
      </ColorModeContext.Provider>
    </>
  );
}
