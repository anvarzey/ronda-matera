import Link from 'next/link'
import ChecklistIcon from '../Icons/ChecklistIcon'
import MateIcon from '../Icons/MateIcon'
import ThumbsUpIcon from '../Icons/ThumbsUpIcon'
import styles from './styles.module.css'
import HomeIcon from '../Icons/HomeIcon'

export default function MobileNavbar ({ actual }: { actual: string }): React.ReactElement {
  const PAGES = [
    {
      reference: 'home',
      link: '/',
      name: 'Inicio',
      icon: HomeIcon
    },
    {
      reference: 'yerba',
      link: '/yerba-mate',
      name: 'Yerba mate',
      icon: MateIcon
    },
    {
      reference: 'recommended',
      link: '/recomendador',
      name: 'Recomendador',
      icon: ThumbsUpIcon
    },
    {
      reference: 'prepare',
      link: '/como-preparar-mate',
      name: 'Como preparar',
      icon: ChecklistIcon
    }
  ]

  const LINKS = []
  for (let i = 0; i < PAGES.length; i++) {
    PAGES[i].reference !== actual &&
      LINKS.push(PAGES[i])
  }

  return (
    <nav className={styles.container}>
      <ul className={styles.listContainer}>
        {
          LINKS.map(pageInfo => {
            const Icon = pageInfo.icon
            return (
              <li key={pageInfo.reference} className={styles.listItem}>
                <Link className={styles.link} href={pageInfo.link}>
                  <div className={styles.icon}>
                    <Icon />
                  </div>
                  <div className={styles.name}>
                    {pageInfo.name}
                  </div>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}
