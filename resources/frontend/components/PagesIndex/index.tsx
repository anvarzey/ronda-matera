import styles from './styles.module.css'
import useIndexes from "../../hooks/useIndexes"
import { useRouter } from 'next/router'
import ChevronIcon from '../Icons/ChevronIcon'

export default function PagesIndex ({ actual, total }): React.ReactElement {
  const { actualPage, pages, totalPages } = useIndexes(actual, total)
  const router = useRouter()

  const handleNavigation = (num) => {
    const actualURL = router.asPath
    const pageRegex = /(?<=(&|\?))page(?==)/
    let newURL = ''
    if (pageRegex.test(actualURL)) {
      const valueRegex = /(?<=page=)\d+/
      newURL = actualURL.replace(valueRegex, num)
    } else {
      const { query } = router
      newURL = Object.keys(query).length >= 1
        ? actualURL.concat('&page=', num)
        : actualURL.concat('?page=', num)
    }
    router.push(newURL)
  }

  const handlePrevious = (): void => {
    if (actual > 1) {
      const actualURL = router.asPath
      const pageRegex = /(?<=(&|\?))page(?==)/
      let newURL = ''
      if (pageRegex.test(actualURL)) {
        const valueRegex = /(?<=page=)\d+/
        newURL = actualURL.replace(valueRegex, actual - 1)
      } else {
        const { query } = router
        newURL = Object.keys(query).length >= 1
          ? actualURL.concat('&page=', actual - 1)
          : actualURL.concat('?page=', actual - 1)
      }
      router.push(newURL)
    }
  }

  const handleNext = (): void => {
    if (actual < totalPages) {
      const actualURL = router.asPath
      const pageRegex = /(?<=(&|\?))page(?==)/
      let newURL = ''
      if (pageRegex.test(actualURL)) {
        const valueRegex = /(?<=page=)\d+/
        newURL = actualURL.replace(valueRegex, actual + 1)
      } else {
        const { query } = router
        newURL = Object.keys(query).length >= 1
          ? actualURL.concat('&page=', actual + 1)
          : actualURL.concat('?page=', actual + 1)
      }
      router.push(newURL)
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
              ? <li key={num} className={styles.actual}>
                {num}
              </li>
              : <li onClick={() => handleNavigation(num)} key={num} className={styles.normal}>
                {num}
              </li>
          )
        })
      }
      <li onClick={handleNext} className={styles.nextBtn}>
        <ChevronIcon />
      </li>
    </ul>
  )
}
