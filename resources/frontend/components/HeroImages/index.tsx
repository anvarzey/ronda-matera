import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import images from './images.json'

export default function HeroImages (): React.ReactElement {
  const [current, setCurrent] = useState(2)

  useEffect(() => {
    const interval = setInterval(() => {
      if (current >= images.length) {
        setCurrent(() => 1)
      } else {
        setCurrent(() => current + 1)
      }
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [current])

  return (
    <div className={styles.imageContainer}>
      <div className={styles.opacityLayer} />
      {
        images.map(image => {
          return (
            <Image key={image.id} className={styles.image} src={image.url} alt={image.alt} aria-hidden={image.id !== current} fill />
          )
        })
      }
    </div>
  )
}
