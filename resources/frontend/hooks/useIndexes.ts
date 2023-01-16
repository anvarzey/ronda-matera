interface Result {
  actualPage: number | undefined
  pages: number[] | []
  totalPages: number | undefined
}

export default function useIndexes (actualPage: number, totalPages: number): Result {
  const min = 1
  const max = 5
  const behindDiff = actualPage - min
  const aheadDiff = totalPages - actualPage

  let startingPage
  let endingPage
  const pages = []

  if (actualPage > totalPages || totalPages < 1 || actualPage < 1) {
    startingPage = undefined
    endingPage = undefined

    return {
      actualPage: undefined,
      pages,
      totalPages: undefined
    }
  }

  if (totalPages < max) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return {
      actualPage,
      pages,
      totalPages
    }
  }

  if (behindDiff >= 2) {
    if (aheadDiff >= 2) {
      startingPage = actualPage - 2
      endingPage = actualPage + 2
      for (let i = startingPage; i <= endingPage; i++) {
        pages.push(i)
      }
      return { actualPage, pages, totalPages }
    } else {
      endingPage = aheadDiff + actualPage
      const toBack = aheadDiff === 1 ? 3 : 4
      startingPage = endingPage - toBack > min ? actualPage - toBack : min
      for (let i = startingPage; i <= endingPage; i++) {
        pages.push(i)
      }
      return { actualPage, pages, totalPages }
    }
  }

  if (actualPage === min && totalPages === min) {
    startingPage = actualPage
    endingPage = actualPage
  } else {
    startingPage = min
    endingPage = min + 4
    for (let i = startingPage; i <= endingPage; i++) {
      pages.push(i)
    }
    return { actualPage, pages, totalPages }
  }

  return { actualPage, pages, totalPages }
}
