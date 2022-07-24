import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import { createStyles, withStyles } from '@mui/styles';

interface MainProps extends BoxProps {
  title: string
}

const Center = withStyles(() => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))(Box);

export const Main = (props: MainProps): JSX.Element => (
  <Center sx={{ w: '80%', minW: '85%' }}>
    <Stack sx={{ w: '100%' }}>
      <Typography variant='h1' sx={{
        pt: '1rem', noOfLines: 1, fontSize: '36pt', mb: '1rem',
      }}>
        {props.title}
      </Typography>
      <Box
        id='main'
        sx={{
          w: '80%',
          spacing: '1.5rem',
          h: 'inherit',
          pt: '1rem',
          px: '1rem',

        }}
        {...props}
        className='line-numbers'
      />
    </Stack>
  </Center>
);
