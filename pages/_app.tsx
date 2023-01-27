import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { SWRConfig } from 'swr'

export default function App ({ Component, pageProps }: AppProps): ReactElement {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) => await fetch(resource, init).then(async (res) => await res.json()).catch(error => error)
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}
