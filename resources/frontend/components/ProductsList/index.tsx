import Product from '../Product'
import styles from './styles.module.css'

interface Price {
  price: number
  kgPrice: number
  link: string
  outOfStock: boolean
  wholesalePrices: [{
    minimum: number
    price: number
    priceKg: number
  }]
}

interface ResponseData {
  data: [
    {
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
      bestPrice: Price
      format: string
      brand: string
      prices: Price[]
      outOfStock: boolean
      blend: string
    }
  ]
}

export default function ProductsList ({ data }: { data: ResponseData }): React.ReactElement {
  const products = data.data
  if (products.length < 1) {
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
