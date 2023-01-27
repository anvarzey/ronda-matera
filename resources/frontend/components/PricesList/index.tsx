import formatPrice from '../../utils/formatPrice'
import styles from './styles.module.css'

interface Price {
  _id: string
  product: {
    _id: string
    name: string
    description: string
    image: string
    lowestPrice: {
      vendorName: string
      price: number
      kgPrice: number
      link: string
      wholesalePrices: [{
        minimum: number
        price: number
        priceKg: number
      }]
    }
  }
  price: number
  kgPrice: number
  link: string
  outOfStock: boolean
  vendor: {
    name: string
    delivery: {
      peninsula: {
        cost: number
        freeFrom: number
      }
      canarias: {
        cost: number
        freeFrom: number
      }
      baleares: {
        cost: number
        freeFrom: number
      }
    }
  }
  wholesalePrices: [{
    minimum: number
    price: number
    priceKg: number
  }]
}

export default function PricesList ({ prices }: { prices: Price[] }): React.ReactElement {
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
