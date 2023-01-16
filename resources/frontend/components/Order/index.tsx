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
        router.push(withoutSort)
        return
      } else {
        return
      }
    }

    if (isSorted) {
      const regexToReplace = /(?<=sort=)\w+(?=&?)/g
      const newPath = basePath.replace(regexToReplace, value)
      router.push(newPath)
    } else {
      if (basePath.includes('?') && basePath.includes('=')) {
        router.push(basePath + '&sort=' + value)
      } else {
        router.push(basePath + '?sort=' + value)
      }
    }
    // console.log(basePath)
  }
  return (
    <div className={styles.orderContainer}>
      <div onClick={handleClick} className={styles.orderTitle} aria-expanded={show}>
        <OrderIcon />
        <span>
          Ordenar por
        </span>
      </div>
      {/* <select className={styles.orderOptions}>
        <option value='' />
        <option value=''>
          Precio: de menor a mayor
        </option>
        <option value=''>
          Precio: de mayor a menor
        </option>
        <option value=''>
          Nombre: A-Z
        </option>
        <option value=''>
          Nombre: Z-A
        </option>
      </select> */}
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