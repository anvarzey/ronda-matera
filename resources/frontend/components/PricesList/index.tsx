import formatPrice from '../../utils/formatPrice'
import styles from './styles.module.css'

export default function PricesList ({ prices }): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.comparator}>
        Comparador de precios:
      </div>
      <div className={styles.titles}>
        <span>
          Precio:
        </span>
        <span>
          Precio por kg:
        </span>
        <span>
          Vendedor:
        </span>
      </div>
      <ul className={styles.listContainer}>
        {
          prices?.map((price, i) => {
            const unitPrice = formatPrice(price.price)
            const kiloPrice = formatPrice(price.kgPrice)
            const classesList = i === 0
              ? `${styles.priceContainer} ${styles.firstPrice}`
              : `${styles.priceContainer}`
            return (
              <li className={classesList} key={price._id}>
                <div className={styles.price}>
                  {unitPrice}*
                </div>
                <div>
                  <div>
                    {kiloPrice}
                  </div>
                </div>
                <div>{price.vendor.name}</div>
                <div className={styles.btnContainer}>
                  <a target='_blank' href={price.link} className={styles.btn} rel='noopener noreferrer'>
                    Ver en página del vendedor
                  </a>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
