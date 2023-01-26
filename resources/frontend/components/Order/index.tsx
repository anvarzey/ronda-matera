import styles from './styles.module.css'
import OrderIcon from '../Icons/OrderIcon'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Order (): React.ReactElement {
  const [show, setShow] = useState(false)

  const router = useRouter()

  const handleClick = (): void => {
    setShow(!show)
  }

  const handleFilter = (value: string): void => {
    const basePath = router.asPath
    const regex = /sort=\w+(?=&?)/g

    const isSorted = regex.test(basePath)

    if (value === 'aleatorio') {
      if (isSorted) {
        const regexToDelete = /(\?|&)sort=\w+/g
        const withoutSort = basePath.replace(regexToDelete, '')
        router.push(withoutSort).catch(err => err)
        return
      } else {
        return
      }
    }

    if (isSorted) {
      const regexToReplace = /(?<=sort=)\w+(?=&?)/g
      const newPath = basePath.replace(regexToReplace, value)
      router.push(newPath).catch(err => err)
    } else {
      if (basePath.includes('?') && basePath.includes('=')) {
        router.push(basePath + '&sort=' + value).catch(err => err)
      } else {
        router.push(basePath + '?sort=' + value).catch(err => err)
      }
    }
  }
  return (
    <div className={styles.orderContainer}>
      <div onClick={handleClick} className={styles.orderTitle} aria-expanded={show}>
        <OrderIcon />
        <span>
          Ordenar por
        </span>
      </div>
      <ul className={styles.orderList} aria-hidden={!show}>
        <li onClick={() => handleFilter('aleatorio')}>
          Aleatorio
        </li>
        <li onClick={() => handleFilter('priceUp')}>
          Precio: de menor a mayor
        </li>
        <li onClick={() => handleFilter('priceDown')}>
          Precio: de mayor a menor
        </li>
        <li onClick={() => handleFilter('nameUp')}>
          Nombre: A-Z
        </li>
        <li onClick={() => handleFilter('nameDown')}>
          Nombre: Z-A
        </li>
      </ul>
    </div>
  )
}
