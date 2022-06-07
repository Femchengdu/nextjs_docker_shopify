import 'tailwindcss/tailwind.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Layout from '../components/Layout'
import ShopProvider from '../context/shopContext'
import { useRouter } from 'next/router'
import { MoralisProvider } from "react-moralis"
const serverUrl = process.env.MORALIS_SERVER_URL || process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
const appId = process.env.MORALIS_APPID || process.env.NEXT_PUBLIC_MORALIS_APPID

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <ShopProvider>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </ShopProvider>
    </MoralisProvider>

  )
}

export default MyApp
