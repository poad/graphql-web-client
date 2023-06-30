import type { AppProps } from 'next/app';
import { useState, useMemo, createContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getDesignTokens from '../styles/theme';
import '../styles/globals.css';
import { PaletteMode } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>('light');
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const colorMode = useMemo(
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
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
