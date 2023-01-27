import styles from './styles.module.css'
import useIndexes from '../../hooks/useIndexes'
import { useRouter } from 'next/router'
import ChevronIcon from '../Icons/ChevronIcon'

export default function PagesIndex ({ actual, total }: { actual: number, total: number }): React.ReactElement {
  const { actualPage, pages, totalPages } = useIndexes(actual, total)
  const router = useRouter()

  const handleNavigation = (num: number): void => {
    const actualURL = router.asPath
    const pageRegex = /(?<=(&|\?))page(?==)/
    let newURL = ''
    if (pageRegex.test(actualURL)) {
      const valueRegex = /(?<=page=)\d+/
      newURL = actualURL.replace(valueRegex, String(num))
    } else {
      const { query } = router
      newURL = Object.keys(query).length >= 1
        ? actualURL.concat('&page=', String(num))
        : actualURL.concat('?page=', String(num))
    }
    router.push(newURL).catch(error => error)
  }

  const handlePrevious = (): void => {
    if (actual > 1) {
      const actualURL = router.asPath
      const pageRegex = /(?<=(&|\?))page(?==)/
      let newURL = ''
      if (pageRegex.test(actualURL)) {
        const valueRegex = /(?<=page=)\d+/
        newURL = actualURL.replace(valueRegex, String(actual - 1))
      } else {
        const { query } = router
        newURL = Object.keys(query).length >= 1
          ? actualURL.concat('&page=', String(actual - 1))
          : actualURL.concat('?page=', String(actual - 1))
      }
      router.push(newURL).catch(error => error)
    }
  }

  const handleNext = (): void => {
    let newURL = ''
    if (totalPages !== undefined) {
      if (actual < totalPages) {
        const actualURL = router.asPath
        const pageRegex = /(?<=(&|\?))page(?==)/
        if (pageRegex.test(actualURL)) {
          const valueRegex = /(?<=page=)\d+/
          newURL = actualURL.replace(valueRegex, String(actual + 1))
        } else {
          const { query } = router
          newURL = Object.keys(query).length >= 1
            ? actualURL.concat('&page=', String(actual + 1))
            : actualURL.concat('?page=', String(actual + 1))
        }
        router.push(newURL).catch(error => error)
      }
    }
  }

  return (
    <ul className={styles.container}>
      <li onClick={handlePrevious} className={styles.previousBtn}>
        <ChevronIcon />
      </li>
      {
        pages.map(num => {
          return (
            actualPage === num
              ? (
                <li key={num} className={styles.actual}>
                  {num}
                </li>)
              : (
                <li onClick={() => handleNavigation(num)} key={num} className={styles.normal}>
                  {num}
                </li>)
          )
        })
      }
      <li onClick={handleNext} className={styles.nextBtn}>
        <ChevronIcon />
      </li>
    </ul>
  )
}
