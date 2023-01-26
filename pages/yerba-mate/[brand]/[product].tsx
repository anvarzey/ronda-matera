import ErrorMessage from '../../../resources/frontend/components/ErrorMessage'
import formatPrice from '../../../resources/frontend/utils/formatPrice'
import Head from 'next/head'
import Header from '../../../resources/frontend/components/Header'
import Image from 'next/image'
import Loader from '../../../resources/frontend/components/Loader'
import MobileNavbar from '../../../resources/frontend/components/MobileNavbar'
import parseFormats from '../../../resources/frontend/utils/parseFormats'
import PricesList from '../../../resources/frontend/components/PricesList'
import styles from './styles.module.css'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function ProductHandler (): React.ReactElement {
  const router = useRouter()
  const { brand, product } = router.query
  let queryString
  if (brand && product?.includes('Kit')) {
    queryString = product.split('-')
    queryString.splice(1, 0, brand)
    queryString = queryString.join('-')
  } else {
    queryString = brand + '-' + product
  }

  const { data, error, isLoading } = useSWR('/api/singleProduct/' + queryString)

  if (isLoading) {
    return (
      <>
        <Header />
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </>
    )
  }
  if (error) return (
    <>
      <Header />
      <ErrorMessage />
    </>
  )
  const productData = data[0]
  const parsedFormat = parseFormats(productData.format, productData.name)
  const bestPriceFormatted = formatPrice(productData.lowestPrice.price)
  return (
    <>
      <Head>
        <title>{productData.name} - Ronda Matera</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <Header />
      <main className={styles.body}>
        <h1 className={styles.title}>
          {productData.name}
        </h1>
        <div className={styles.imgAndDescContainer}>
          <div className={styles.imageContainer}>
            <Image className={styles.image} src={productData.image} height={240} width={240} alt={productData.name} />
          </div>
          <div className={styles.description}>
            <div className={styles.descriptionTitle}>
              Descripción:
            </div>
            <div className={styles.descriptionText}>
              {productData.description}
            </div>
            <div className={styles.descriptionPrice}>
              Precio más barato:&nbsp;
              <span>
                {bestPriceFormatted}
              </span>
            </div>
          </div>
          <table className={styles.detailsContainer}>
            <thead>
              <tr>
                <th className={styles.detailsTitle} colSpan={2}>
                  Características:
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.oddRow}>
                <td>
                  Formato:
                </td>
                <td>
                  {parsedFormat}
                </td>
              </tr>
              <tr>
                <td>
                  Tipo de yerba:
                </td>
                <td>
                  {productData.blend}
                </td>
              </tr>
              <tr className={styles.oddRow}>
                <td>
                  Marca:
                </td>
                <td>
                  {productData.brand}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PricesList prices={productData.prices} />
        <div className={styles.moreInfo}>
          * Consultar condiciones de envío
        </div>
      </main>
      <MobileNavbar actual='single' />
    </>
  )
}
