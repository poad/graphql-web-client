'use client';
import { ReactNode } from 'react';
import './globals.css';

export default function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>GraphQL Client</title>
        <meta name='description' content='GraphQL Client' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>{children}</body>
    </html>
  );
}
