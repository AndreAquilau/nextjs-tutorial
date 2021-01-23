## First Project in NextJS

#### Starting Project
```bash
npx create-next-app name-project
```
```bash
yarn add --dev typescript @types/react @types/node
```

#### Create Files Config

> .editorconfig
```editorconfig
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

> .vscode/settings.json
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
#### Modify _app.js for _app.tsx
> Modify Content
```tsx
import React from 'react';
import {AppProps} from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
}

export default MyApp;
```
#### Modify index.tsx
> Modify Content
```tsx
import React from 'react';
import Head from 'next/head';

const  Home: React.FC =  (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1>Hello World</h1>
      </main>
    </div>
  );
}

export default Home;
```
#### Config Eslint
```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'prettier/react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {},
};
```
#### Eslintignore
```eslintignore
node_modules
.next
/*.js
```
#### Config Prettier
```js
module.exports = {
  "trailingComma": "all",
  "tabWidth": 2,
  "singleQuote": true,
  "semi": true,
  "printWidth": 80
}
```

#### NextJS Template Integration Styled-Components
[Git Vercel-NextJS](https://github.com/vercel/next.js/tree/master/examples/with-styled-components)
```bash
yarn add styled-components && yarn add -D @types/styled-components
```
>babel.config.js
```js
module.exports ={
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```
> create file _document.tsx in pages
```tsx
import React from 'react';
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
```
#### Define Theme Styled-Components
> theme.ts
```ts
export default {
  title: 'default',
  colors: {
    white: '#fff',
    black: '#000',
    gray: '#f5f5f5',
  },
};
```
> styled.d.ts
```ts
import 'styled-components';
import theme from './theme/theme';

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```
> _app.ts
```ts
import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default MyApp;
```
> style/global.ts
```css
body {
  background: ${(props) => props.theme.colors.black}
}
```

### Config Document Global
> in _document.tsx add method render
```tsx
import React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Main,
  NextScript,
  Head,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### Next Plugin Imports Images
#### Install next-images
[next-images link](https://www.npmjs.com/package/next-images)
```bash
yarn add next-images && yarn add -D @types/next-images
```
>next.config.js
```js
// next.config.js
const withImages = require('next-images')
module.exports = withImages({
  esModule: true,
})
```
>next.env.d.ts
```ts
/// <reference types="next" />
/// <reference types="next/types/global" />

+ /// <reference types="next-images" />
```
#### Install Plugin inline-react-svg
```bash
yarn add -D babel-plugin-inline-react-svg
```
>babel.config.js
```js
module.exports = {
  "presets": ["next/babel"],
  "plugins": [
    ["styled-components", { "ssr": true }],
    \\\ + 'inline-react-svg'
  ]
}
```
> _app.tsx
```tsx
import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme/theme';
\\\+ import Logo from '../assets/img/usuario.svg';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyles />
      \\\+ <Logo />
    </ThemeProvider>
  );
};

export default MyApp;
```
### References
[next-images](https://www.npmjs.com/package/next-images)
[nextjs](https://nextjs.org/)
[styled-components - nextjs](https://styled-components.com/docs/advanced#nextjs)
[git vercel/nextjs](https://github.com/vercel/next.js/tree/master/examples/with-styled-components)
[Rocketseat - Youtube ReactJS? Next.js, TypeScript, ESLint e Styled Components ](https://www.youtube.com/watch?v=1nVUfZg2dSA)

