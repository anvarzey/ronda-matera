import { useRouter } from 'next/router'
import CloseCircleIcon from '../Icons/CloseCircleIcon'
import styles from './styles.module.css'

export default function RecentSearch (): React.ReactElement {
  const router = useRouter()
  const { query } = router

  const handleUndoSearch = (): void => {
    const query = router.asPath
    const regex = /(\?|&)search=\w+(&?)/g
    const newURL = query.replace(regex, '')
    router.push(newURL)
  }

  return (
    <div className={styles.container}>
      <span className={styles.sentence}>
        Buscaste "{query.search}"&nbsp;
      </span>
      <span onClick={handleUndoSearch} className={styles.undoSearch}>
        <CloseCircleIcon />
      </span>
    </div>
  )
}
