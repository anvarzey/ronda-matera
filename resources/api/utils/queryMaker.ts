interface MultipleQuery {
  $in: string[]
}

interface Query {
  brand?: string | MultipleQuery
  blend?: string | MultipleQuery
  format?: string | MultipleQuery
}

export default function queryMaker (queries): Query {
  const filters = [
    'brand',
    'blend',
    'format',
    'search'
  ]

  const query: Query = {}

  for (const prop in queries) {
    if (filters.find(e => e === prop) !== undefined) {
      if (prop === 'search') {
        const searchQuery = {
          $regex: queries[prop],
          $options: 'i'
        }
        query.name = searchQuery
      } else {
        if (queries[prop].includes(',') === true) {
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
