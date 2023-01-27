import questions from '../../utils/questionnaire.json'
import { MouseEventHandler, useState } from 'react'
import styles from './styles.module.css'
// import CloseCircleIcon from '../Icons/CloseCircleIcon'
// import CloseIcon from '../Icons/CloseIcon'

type Questions = typeof questions

type Answers = Questions[keyof Questions]['answers']

type Answer = Questions[keyof Questions]

// type Cachito = {
//   [P in keyof Answers]: null extends Answers[P] ? never : P
// }[keyof Answers]

type Cachito<Answers> = {
  [Property in keyof Answers]-?: Answers[Property];
}

/*
    TO DO: FIX TYPES OF ANSWERS 
*/

// interface Answer {
//   action: string
//   next?: keyof typeof questions
//   keyword?: string
// }

// interface Answer1 {
//   Si?: Answer
//   No?: Answer
// }

// interface Answer2 {
//   Saborizada?: {
//     action: string
//     keyword: string
//   }
//   Compuesta?: {
//     action: string
//     keyword: string
//   }
//   Regular?: {
//     action: string
//     next: string
//   }
// }

// interface Answer3 {
//   Normal?: {
//     action: string
//     keyword: string
//   }
//   Intensa?: {
//     action: string
//     keyword: string
//   }
// }

// interface ANSWR {
//   Si?: Answer
//   No?: Answer
//   |
//   Saborizada?: {
//     action: string
//     keyword: string
//   }
//   Compuesta?: {
//     action: string
//     keyword: string
//   }
//   Regular?: {
//     action: string
//     next: string
//   }
//   |
//   Normal?: {
//     action: string
//     keyword: string
//   }
//   Intensa?: {
//     action: string
//     keyword: string
//   }
// }

export default function Quiz ({ handleKeyword, handleQuitQuiz }: { handleKeyword: Function, handleQuitQuiz: MouseEventHandler<HTMLButtonElement> }): React.ReactElement {
  const [actual, setActual] = useState<keyof Questions>('1')

  const handleClick = (answer: keyof Answers): void => {
    const question = questions[actual]
    if (question !== undefined) {
      const answers: Answers = question.answers
      const answerObject: Cachito = answers[answer]
      const action = answerObject?.action
      if (action === 'go on') {
        const next = answerObject === undefined ? undefined : Object.hasOwn(answerObject, 'next') ? answerObject.next : undefined
        if (next !== undefined) setActual(next)
      } else if (action === 'show') {
        const keyword = answerObject?.keyword
        handleKeyword(keyword)
      }
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
            questions[actual].options?.map(answer => {
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
