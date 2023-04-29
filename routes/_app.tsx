// routes/_app.tsx

import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";

export default function App({ Component }: AppProps) {
  return (
    <html data-custom="data">
      <Head>
        <title>Fresh</title>
        <link rel="stylesheet" href={asset("style.css")} />
      </Head>
      <body>
        <h1>Pokelist</h1>
        <Component />
      </body>
    </html>
  );
}