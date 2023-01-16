import styles from './styles.module.css'
import useSWR from 'swr'
import Image from 'next/image'
import formatPrice from '../../utils/formatPrice'
import Link from 'next/link'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'

export default function ProductsCards ({ keyword }): React.ReactElement {
  const { data, isLoading, error } = useSWR(`/api/recommender/${keyword}`)

  if (isLoading) return <Loader />
  if (error) return <ErrorMessage />

  return (
    <ul className={styles.container}>
      {
        data?.data.map(product => {
          const price = formatPrice(product.lowestPrice.price)
          const triggeredName = product.name.replace(`${product.brand} `, '').trim().replaceAll(' ', '%20')
          console.log(triggeredName)
          const url = `/yerba-mate/${product.brand}/${triggeredName}`
          return (
            <li key={product._id} className={styles.card}>
              <Link className={styles.cardContent} href={url}>
                <div className={styles.titleContainer}>
                  <h3 className={styles.title}>{product.name}</h3>
                </div>
                <div className={styles.imageContainer}>
                  <Image className={styles.image} src={product.image} fill alt={product.name} />
                </div>
                <div className={styles.priceContainer}>
                  <span>Mejor precio:</span>
                  <span className={styles.price}> {price}</span>
                </div>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}
