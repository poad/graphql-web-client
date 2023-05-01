import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import { createStyles, withStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface MainProps extends BoxProps {
  title: string;
  theme: Theme;
  colorMode: {
    toggleColorMode: () => void;
  };
}

const Center = withStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
)(Box);

export const Main = ({
  title,
  theme,
  colorMode,
  ...props
}: MainProps): JSX.Element => (
  <Box>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            sx={{ display: 'inline' }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    <Center sx={{ w: '80%', minW: '85%' }}>
      <Stack sx={{ w: '100%' }}>
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
  </Box>
);
