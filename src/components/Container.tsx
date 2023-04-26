import React, { useEffect, useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

export const Container = (props: BoxProps): JSX.Element => {
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    setHeight(document.documentElement.clientHeight);
  }, []);

  // const { colorMode } = useColorMode();

  // const bgColor = { light: 'gray.200', dark: 'gray.900' };

  // const color = { light: 'black', dark: 'white' };
  return (
    <Box
      id='container'
      alignItems='center'
      // bg={bgColor[colorMode]}
      // color={color[colorMode]}
      {...props}
      sx={{
        flexDirection: 'column',
        verticalAlign: 'center',
        justifyContent: 'flex-start',
        w: '100%',
        maxW: '100%',
        margin: '0',
        padding: '0',
        h: height,
      }}
    />
  );
};
