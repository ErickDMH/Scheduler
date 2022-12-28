import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utils/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';

type AppPropsWithLayout = AppProps & {
  emotionCache: EmotionCache
}
const clientSideEmotionCache = createEmotionCache();
export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppPropsWithLayout) {

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
