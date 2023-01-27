import { useRouter } from 'next/router'
import CloseCircleIcon from '../Icons/CloseCircleIcon'
import styles from './styles.module.css'

export default function RecentSearch (): React.ReactElement {
  const router = useRouter()
  const { query } = router

  const handleUndoSearch = (): void => {
    const query = router.asPath
    const regex = /(\?|&)search=((\w+|\+)(-?))+/gi
    const newURL = query.replace(regex, '').trim()

    router.push(newURL).catch(error => error)
  }

  const searchQuery = query.search === undefined ? '' : typeof query.search === 'string' ? query.search : query.search[0]

  const parsedQuery = searchQuery.replaceAll('-', ' ')

  return (
    <div className={styles.container}>
      <span className={styles.sentence}>
        Buscaste "{parsedQuery}"&nbsp;
      </span>
      <span onClick={handleUndoSearch} className={styles.undoSearch}>
        <CloseCircleIcon />
      </span>
    </div>
  )
}
