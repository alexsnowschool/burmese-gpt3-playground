import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="မြန်မာလို့ ရည်စားစာတိုလေးတွေ ရေးကြမယ်။ | @alexsnowschool" key="title"/>
        <meta property="og:description" content="build with alexsnowschool" key="description"/>
        <meta
          property="og:image"
          content="https://github.com/alexsnowschool/burmese-gpt3-playground/blob/main/assets/burmese_ai.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
