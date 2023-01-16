import Link from 'next/link'
import styles from './styles.module.css'

export default function ErrorMessage (): React.ReactElement {
  return (
    <div>
      <p>
        Ha ocurrido un error. Por favor, inténtalo de nuevo.
      </p>
      <p>
        Si el error persiste, <Link className={styles.link} href='/'>vuelve al inicio</Link>. Lo sentimos.
      </p>
    </div>
  )
}
