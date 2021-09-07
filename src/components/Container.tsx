import React, { useEffect, useState } from 'react';
import { Flex, useColorMode, FlexProps } from '@chakra-ui/react';

export const Container = (props: FlexProps): JSX.Element => {
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    setHeight(document.documentElement.clientHeight);
  }, []);

  const { colorMode } = useColorMode();

  const bgColor = { light: 'gray.200', dark: 'gray.900' };

  const color = { light: 'black', dark: 'white' };
  return (
    <Flex
      id='container'
      direction='column'
      alignItems='center'
      verticalAlign='center'
      justifyContent='flex-start'
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
      w='100%'
      maxW='100%'
      margin='0'
      padding='0'
      h={height}
    />
  );
};
