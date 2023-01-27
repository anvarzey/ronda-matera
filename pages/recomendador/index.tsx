import Head from 'next/head'
import Header from '../../resources/frontend/components/Header'
import Quiz from '../../resources/frontend/components/Quiz'
import { MouseEventHandler, useState } from 'react'
import styles from './styles.module.css'
import MobileNavbar from '../../resources/frontend/components/MobileNavbar'
import ProductsCards from '../../resources/frontend/components/ProductsCards'
import TopButton from '../../resources/frontend/components/TopButton'

export default function RecomendadorHandler (): React.ReactElement {
  const [startQuiz, setStartQuiz] = useState(false)
  const [advice, setAdvice] = useState<string | undefined>(undefined)

  const handleStartQuiz = (): void => {
    setStartQuiz(true)
  }
  const handleQuitQuiz: MouseEventHandler<HTMLButtonElement> = (): void => {
    setStartQuiz(false)
    setAdvice(undefined)
  }

  const handleKeyword = (keyword: string): void => {
    setAdvice(keyword)
  }

  return (
    <>
      <Head>
        <title>Recomendador - Ronda Matera</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <Header />
      <main className={styles.body}>
        <h1 className={styles.title}>El Recomendador</h1>
        <div className={styles.textContainer}>
          <p className={styles.paragraph}>
            En este espacio te recomendamos algunas yerba mate por si quieres probar algo <b>distinto</b> o es la <b>primera</b> que vas a comprar.
          </p>
          <p className={styles.paragraph}>
            Solo tienes que presionar <b>comenzar</b> y responder algunas preguntas, <b>El Recomendador</b> tendrá opciones para ti.
          </p>
        </div>
        <section>
          {
            advice === undefined
              ? startQuiz
                ? <Quiz handleKeyword={handleKeyword} handleQuitQuiz={handleQuitQuiz} />
                : <button className={styles.startBtn} onClick={handleStartQuiz}>Comenzar</button>
              : (
                <>
                  <button className={styles.restartBtn} onClick={handleQuitQuiz}>Volver a empezar</button>
                  <ProductsCards keyword={advice} />
                </>)
          }
        </section>
      </main>
      <TopButton />
      <MobileNavbar actual='recommended' />
    </>
  )
}
