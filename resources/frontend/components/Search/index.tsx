import SearchIcon from '../Icons/SearchIcon'
import styles from './styles.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Search (): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleChange = (e): void => {
    const { value } = e.target
    setSearchQuery(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery !== '') {
      router.push('/yerba-mate?search=' + searchQuery)
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
