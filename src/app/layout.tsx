'use client';
import type { ReactNode } from 'react';
import './globals.css';
import StyledJsxRegistry from './registry';

export default function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>GraphQL Client</title>
        <meta name="description" content="GraphQL Client" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}
