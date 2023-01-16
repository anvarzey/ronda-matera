import questions from '../../utils/questionnaire.json'
import { useState } from 'react'
import styles from './styles.module.css'
import CloseCircleIcon from '../Icons/CloseCircleIcon'
import CloseIcon from '../Icons/CloseIcon'

export default function Quiz ({ handleKeyword, handleQuitQuiz }): React.ReactElement {
  const [actual, setActual] = useState('1')

  const handleClick = (answer: string): void => {
    const { action } = questions[actual].answers[answer]
    if (action === 'go on') {
      const { next } = questions[actual].answers[answer]
      setActual(next)
    } else if (action === 'show') {
      const { keyword } = questions[actual].answers[answer]
      handleKeyword(keyword)
    }
  }
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Quiz</h3>
      <div className={styles.quizContainer}>
        <button className={styles.stopBtn} onClick={handleQuitQuiz}>
          Finalizar
        </button>
        <h3 className={styles.question}>
          {
            questions[actual].question
          }
        </h3>
        <ul className={styles.optionsContainer}>
          {
            questions[actual].options.map(answer => {
              return (
                <li key={answer}>
                  <button onClick={() => handleClick(answer)} className={styles.option}>
                    {answer}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
