import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { SWRConfig } from 'swr'

export default function App ({ Component, pageProps }: AppProps): ReactElement {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}
