import SearchIcon from '../Icons/SearchIcon'
import styles from './styles.module.css'
import { useRouter } from 'next/router'
import { ChangeEvent, SyntheticEvent, useState } from 'react'

export default function Search (): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setSearchQuery(value)
  }

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault()
    if (searchQuery !== '') {
      const parsedSearchQuery = searchQuery.split(' ').filter(word => word !== '').join('-')
      router.push('/yerba-mate?search=' + parsedSearchQuery).catch(error => error)
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input onChange={handleChange} className={styles.input} type='text' placeholder='Buscar' />
      <button className={styles.btn}>
        <SearchIcon />
      </button>
    </form>
  )
}
