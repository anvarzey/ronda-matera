import Product from '../Product'
import styles from './styles.module.css'

export default function ProductsList ({ data }): React.ReactElement {
  const products = data.data
  if (products.length === 0) {
    return (
      <div className={styles.container}>
        <h3>
          Su búsqueda no ha generado resultados.
        </h3>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {
        products?.map(product => {
          return (
            <Product key={product._id} product={product} />
          )
        })
      }
    </div>
  )
}
