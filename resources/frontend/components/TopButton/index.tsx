import { useEffect, useState } from 'react'
import ArrowIcon from '../Icons/ArrowIcon'
import styles from './styles.module.css'

export default function TopButton (): React.ReactElement {
  const [visible, setVisible] = useState(false)

  const handleTopBtn = (): void => {
    const heightToAppear = 120
    const scrollNum = document.body.scrollTop || document.documentElement.scrollTop
    if (scrollNum > heightToAppear) {
      !visible && setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleTopBtn)
    return () =>
      window.removeEventListener('scroll', handleTopBtn)
  }, [])

  const handleScrollUp = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  return (
    <>
      {
        visible &&
        <div onClick={handleScrollUp} className={styles.btn}>
          <ArrowIcon />
        </div>
      }
    </>
  )
}
