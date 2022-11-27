import '../styles/globals.css'
import "../styles/estilos.css"
import type { AppProps } from 'next/app'
import 'normalize.css/normalize.css';
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
