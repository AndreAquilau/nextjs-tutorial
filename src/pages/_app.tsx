import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme/theme';
import Logo from '../assets/img/usuario.svg';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyles />
      <Logo />
    </ThemeProvider>
  );
};

export default MyApp;
