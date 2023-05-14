'use client';
import { ReactNode, useState, useMemo, createContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getDesignTokens from './styles/theme';
import './styles/globals.css';
import { PaletteMode } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

export default function Layout({ children }: { children: ReactNode }) {
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
    <html lang='en'>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </head>
      <body>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
}
