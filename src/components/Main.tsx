import React from 'react';
import { Center, VStack, Stack, StackProps, Heading } from '@chakra-ui/react';

export const Main = (props: StackProps): JSX.Element => (
  <Center w='80%' minW='85%'>
    <VStack w='100%'>
      <Heading pt='1rem' size="2xl" isTruncated>GraphQL Online Client</Heading>
      <Stack
        id='main'
        w='80%'
        spacing='1.5rem'
        h='inherit'
        pt='1rem'
        px='1rem'
        {...props}
        className='line-numbers'
      />
    </VStack>
  </Center>
);
