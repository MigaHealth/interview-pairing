import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

import { trpc } from "~/utils/trpc";
import { MantineProvider } from "@mantine/core";
import { Layout } from "~/components/Layout";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        components: {
          Button: {
            styles: (theme) => ({
              root: {
                backgroundColor: theme.colors.dark[9],
                "&:hover": {
                  backgroundColor: theme.colors.gray[4],
                },
              },
            }),
          },
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
};

export default trpc.withTRPC(App);
