import { useState } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Headers from '../components/Headers';
import Button from '@mui/material/Button';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { DynamicEditor } from '../components/DynamicEditor';

type FormProps = {
  endpoint: string;
};

export default function Home(): JSX.Element {
  const [values, setValues] = useState<FormProps>();
  const [headers, setHeaders] = useState<Record<string, string>>();
  const [displayEditor, setDisplayEditor] = useState(false);

  function Content() {
    const onSubmit = (data: FormProps) => {
      setValues(data);
      setDisplayEditor(true);
    };
    const defaultValues: FormProps = { endpoint: '' };

    if (displayEditor && values && values.endpoint.length > 0) {
      return <DynamicEditor url={values.endpoint} headers={headers} />;
    }
    return (
      <Box sx={{ w: '100vw' }}>
        <FormContainer defaultValues={defaultValues} onSuccess={onSubmit}>
          <Box sx={{ w: '100vw' }}>
            <TextFieldElement
              name={'endpoint'}
              placeholder='GraphQL endpoint'
              sx={{ minWidth: '94vw', fontSize: '14', padding: '0' }}
            />
            <Headers onChange={setHeaders} />
          </Box>
          <Button type={'submit'}>Continue</Button>
        </FormContainer>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>GraphQL Client</title>
        <meta name='description' content='GraphQL Client' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Content />
    </>
  );
}
