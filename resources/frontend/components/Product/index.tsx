import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'
import formatPrice from '../../utils/formatPrice'
import parseFormats from '../../utils/parseFormats'

export default function Product ({ product }): React.ReactElement {
  const bestPrice = formatPrice(product.lowestPrice.price)
  const triggeredName = product.name.split(' ').filter(word => word !== product.brand).join('-')
  const url = `/yerba-mate/${product.brand}/${triggeredName}`

  const {
    blend,
    format,
    image,
    name
  } = product

  const formatParsed = parseFormats(format, name)

  return (
    <Link href={url} className={styles.container}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={image} fill alt={name} />
      </div>
      <div className={styles.textContainer}>
        <h4 className={styles.productName}>
          {name}
        </h4>
        <div>
          Formato:&nbsp;
          <span>{formatParsed}</span>
        </div>
        <div>
          Tipo de yerba:&nbsp;
          <span>{blend}</span>
        </div>
        <div className={styles.priceContainer}>
          Desde:&nbsp;
          <span className={styles.price}>{bestPrice}</span>
        </div>
      </div>
    </Link>
  )
}
