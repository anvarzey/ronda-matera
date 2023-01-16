import Image from 'next/image'
import Link from 'next/link'
import Search from '../Search'
import styles from './styles.module.css'

export default function Header (): React.ReactElement {
  return (
    <header className={styles.headerContainer}>
      <Link href='/' className={styles.name}>
        <Image src='/logo.png' width={25} height={25} alt='Logo de Ronda Matera' />
        Ronda Matera
      </Link>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <li>
            <Link className={styles.link} href='/yerba-mate'>Yerba mate</Link>
          </li>
          <li>
            <Link className={styles.link} href='/recomendador'>Recomendador</Link>
          </li>
          <li>
            <Link className={styles.link} href='/como-preparar-mate'>Como preparar un mate</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.searchContainer}>
        <Search />
      </div>
    </header>
  )
}
