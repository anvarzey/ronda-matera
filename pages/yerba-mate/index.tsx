import Head from 'next/head'
import Header from '../../resources/frontend/components/Header'
import styles from './styles.module.css'
import Filters from '../../resources/frontend/components/Filters'
import ProductsList from '../../resources/frontend/components/ProductsList'
import Order from '../../resources/frontend/components/Order'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import MobileNavbar from '../../resources/frontend/components/MobileNavbar'
import PagesIndex from '../../resources/frontend/components/PagesIndex'
import Search from '../../resources/frontend/components/Search'
import RecentSearch from '../../resources/frontend/components/RecentSearch'
import TopButton from '../../resources/frontend/components/TopButton'
import ErrorMessage from '../../resources/frontend/components/ErrorMessage'
import Loader from '../../resources/frontend/components/Loader'

export default function YerbaMateHandler (): React.ReactElement {
  const router = useRouter()
  const { query } = router
  let queryString = ''
  for (const element in query) {
    const actual = query[element]
    if (actual !== undefined && actual !== null && !Array.isArray(actual)) {
      queryString = queryString.concat(element, '=', actual, '&')
    }
  }
  queryString = '?' + queryString.slice(0, queryString.length - 1)

  const apiURL = queryString === '?'
    ? '/api/products'
    : '/api/products' + queryString

  const { data, error, isLoading } = useSWR(apiURL)

  return (
    <>
      <Head>
        <title>Yerba Mate - Ronda Matera</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <Header />
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <main className={styles.body}>
        <h1 className={styles.title}>Yerba Mate</h1>
        {
          query.search !== undefined && <RecentSearch />
        }
        <div className={styles.gridContainer}>
          <Filters />
          <Order />
          {
            data !== undefined && data !== null
              ? <PagesIndex actual={data.page} total={data.totalPages} />
              : <PagesIndex actual={1} total={1} />
          }
          {
            isLoading
              ? (
                <div className={styles.loaderContainer}>
                  <Loader />
                </div>)
              : error !== undefined && error !== null
                ? <ErrorMessage />
                : <ProductsList data={data} />
          }
        </div>
      </main>
      <TopButton />
      <MobileNavbar actual='yerba' />
    </>
  )
}
