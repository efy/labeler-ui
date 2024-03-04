import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, Container } from '@mantine/core';
import { theme } from '../theme';
import { Notifications } from '@mantine/notifications';

import '@mantine/notifications/styles.css';

export const metadata = {
  title: 'Text Labeler',
  description: 'Label text for fun',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <Container mt={300} maw={600}>
            {children}
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
