import { AppProps } from 'next/app';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getDesignTokens from '../styles/theme';
import '../styles/globals.css';
import { PaletteMode } from '@mui/material';


const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const App = ({ Component }: AppProps): JSX.Element => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
