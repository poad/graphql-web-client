import React, { useState } from 'react';
import Head from 'next/head';
import {
  VStack, Box, Flex, useColorMode,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Main } from 'components/Main';
import { Container } from 'components/Container';
import { Footer } from 'components/Footer';
import { DarkModeSwitch } from 'components/DarkModeSwitch';
import { gql, GraphQLClient } from 'graphql-request';
import dynamic from 'next/dynamic';
import EndpointInput from 'components/EndpointInput';
import GitHubProjectLink from 'components/GitHubProjectLink';
import Headers from 'components/Headers';

const GraphQLEditor = dynamic(() => import('components/GraphQLEditor'), {
  ssr: false,
});

const JsonEditor = dynamic(() => import('components/JsonEditor'), {
  ssr: false,
});

const Home = (): JSX.Element => {
  type Inputs = {
    [x: string]: string,
  };

  const { colorMode } = useColorMode();
  const [result, setReault] = useState<string>('');
  const [query, setQuery] = useState<string>('# Looks like you do not have any tables.\n# Click on the "Data" tab on top to create tables\n# Try out GraphQL queries here after you create tables');
  const [variables, setVariables] = useState<string>('');
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {

    const client = new GraphQLClient(data.endpoint, {
      headers,
    });

    const graphql = gql`${query}`;

    client.request(graphql, variables)
      .then((res) => setReault(JSON.stringify(res, undefined, 2)))
      .catch((err) => {
        setReault(JSON.stringify(err, undefined, 2));
      });
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const bgColor = { light: 'gray.50', dark: 'gray.900' };
  const btnColor = { light: 'green', dark: 'gray' };
  const toggleColor = { light: 'gray.300', dark: 'gray.600' };
  const thColor = { light: 'gray.400', dark: 'gray.700' };

  const onChangeQuery = (
    code: string | undefined,
  ) => setQuery(code || '');

  const onChangeVariables = (
    vars: string | undefined,
  ) => setVariables(vars || '');

  return (
    <Container paddingLeft='0' marginLeft='0' paddingRight='0' marginRight='0' w='100%' maxW='100%'>
      <Head>
        <title>GraphQL Client</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Main paddingLeft='0' marginLeft='0' paddingRight='0' marginRight='0' w='100%' maxW='100%'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack
            spacing={4}
            align='stretch'
            mt='4'
            borderWidth='1px'
            borderRadius='lg'
            paddingTop='6'
            paddingLeft='4'
            paddingRight='4'
            paddingBottom='6'
            bgColor={bgColor[colorMode]}
          >
            <Flex>
              <EndpointInput
                register={register}
                errors={errors}
                btnColor={btnColor[colorMode]}
                isSubmitting={isSubmitting}
              />
            </Flex>

            <Headers
              accordionBgColor={toggleColor[colorMode]}
              thBgColor={thColor[colorMode]}
              onChange={setHeaders} />

            <Flex>
              <VStack
                spacing={4}
                align='stretch'
                w='50%'
                pr='1'
              >
                <Box
                  id='query-editor'
                  h='20rem'
                  minH='20rem'
                  borderWidth='1px'
                  borderRadius='lg'>
                  <GraphQLEditor
                    height='100%'
                    value={query}
                    onValueChange={onChangeQuery}
                    theme={colorMode}
                    padding='1rem'
                    insertSpaces
                  />
                </Box>

                <VStack
                  align='stretch'
                  w='100%'
                >
                  <Box textAlign='left' bg={toggleColor[colorMode]} padding='0.5rem'>Variables</Box>

                  <Box
                    id='variables-editor'
                    h='11rem'
                    minH='11rem'
                    borderWidth='1px'
                    borderRadius='lg'
                  >
                    <JsonEditor
                      height='100%'
                      value={variables}
                      onValueChange={onChangeVariables}
                      theme={colorMode}
                      padding='1rem'
                      insertSpaces
                    />
                  </Box>
                </VStack>
              </VStack>

              <Box
                h='35rem'
                minH='35rem'
                pl='1'
                borderWidth='1px'
                borderRadius='lg'
                w='50%'
              >
                <JsonEditor
                  height='35rem'
                  value={result}
                  theme={colorMode}
                  padding='1rem'
                  readonly
                />
              </Box>
            </Flex>
          </VStack>
        </form>
      </Main>
      <DarkModeSwitch />
      <GitHubProjectLink />

      <Footer>
      </Footer>
    </Container>
  );
};

export default Home;
