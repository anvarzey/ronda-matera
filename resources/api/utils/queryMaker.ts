interface MultipleQuery {
  $in: string[]
}

interface Query {
  brand?: string | MultipleQuery
  blend?: string | MultipleQuery
  format?: string | MultipleQuery
  name?: {
    $regex: string
    $options: string
  }
  search?: string
}

interface Props {
  brand?: string
  blend?: string
  format?: string
  search?: string
}

export default function queryMaker (queries: Props): Query {
  const filters = [
    'brand',
    'blend',
    'format',
    'search'
  ]

  if (queries === undefined) return {}

  const query: Query = {}

  let prop: keyof Props

  if (filters.find(e => e === prop) !== undefined) {
    for (prop in queries) {
      if (queries[prop] === undefined) return {}
      if (prop === 'search') {
        const searchRegex = queries[prop]?.replaceAll('-', ' ')
        const searchQuery = {
          $regex: searchRegex,
          $options: 'i'
        }
        query.name = searchQuery
      } else {
        if (queries[prop]?.includes(',') === true) {
          const arr = queries[prop].split(',')
          query[prop] = {
            $in: arr
          }
        } else {
          query[prop] = queries[prop]
        }
      }
    }
  }

  return query
}
