import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Response {
  brands: string[]
  blends: string[]
  formats: string[]
  handleBlends: Function
  handleBrands: Function
  handleFormats: Function
  handleQueryString: Function
}

export default function useFilter (): Response {
  const router = useRouter()
  const { query } = router
  const [brands, setBrands] = useState<string[]>([])
  const [blends, setBlends] = useState<string[]>([])
  const [formats, setFormats] = useState<string[]>([])
  const [search, setSearch] = useState<string[]>([])
  const [sort, setSort] = useState<string[]>([])
  const [otherQueries, setOtherQueries] = useState('')

  let actual

  useEffect(() => {
    let tempStr = ''
    if (!Object.hasOwn(query, 'search') && search.length >= 1) {
      setSearch([])
    }
    if (!Object.hasOwn(query, 'sort') && sort.length >= 1) {
      setSort([])
    }
    for (const element in query) {
      if (query[element] !== undefined && query[element] !== null) {
        switch (element) {
          case 'blend':
            if (typeof query.blend === 'string') {
              setBlends(query.blend?.split(','))
            } else if (Array.isArray(query.blend)) {
              setBlends(query.blend[0]?.split(','))
            }
            break
          case 'brand':
            if (typeof query.brand === 'string') {
              setBrands(query.brand?.split(','))
            } else if (Array.isArray(query.brand)) {
              setBrands(query.brand[0]?.split(','))
            }
            break
          case 'format':
            if (typeof query.format === 'string') {
              setFormats(query.format?.split(','))
            } else if (Array.isArray(query.format)) {
              setFormats(query.format[0]?.split(','))
            }
            break
          case 'page':
            break
          case 'search':
            if (typeof query.search === 'string') {
              setSearch(query.search?.split(','))
            } else if (Array.isArray(query.search)) {
              setSearch(query.search[0]?.split(','))
            }
            break
          case 'sort':
            if (typeof query.sort === 'string') {
              setSort(query.sort?.split(','))
            } else if (Array.isArray(query.sort)) {
              setSort(query.sort[0]?.split(','))
            }
            break
          default:
            actual = query[element]
            if (typeof actual === 'string') {
              if (tempStr.length >= 1) {
                tempStr = `${tempStr}&${element}=${actual}`
              } else {
                tempStr = `${element}=${actual}`
              }
            } else if (Array.isArray(actual)) {
              if (tempStr.length >= 1) {
                tempStr = `${tempStr}&${element}=${actual[0]}`
              } else {
                tempStr = `${element}=${actual[0]}`
              }
            }

            break
        }
      }
      if (tempStr.length >= 1) setOtherQueries(tempStr)
    }
  }, [query])

  const handleFormats = (keyword: string): void => {
    if (formats.includes(keyword)) {
      const newArr = formats.filter(element => element !== keyword)
      setFormats(newArr)
    } else {
      setFormats([...formats, keyword])
    }
  }

  const handleBrands = (keyword: string): void => {
    if (brands.includes(keyword)) {
      const newArr = brands.filter(element => element !== keyword)
      setBrands(newArr)
    } else {
      setBrands([...brands, keyword])
    }
  }

  const handleBlends = (keyword: string): void => {
    if (keyword === '') return
    if (blends.includes(keyword)) {
      const newArr = blends.filter(element => element !== keyword)
      setBlends(newArr)
    } else {
      setBlends([...blends, keyword])
    }
  }

  const handleQueryString = (): string => {
    let str = '?'
    if (brands.length >= 1) {
      str = str.concat('brand=', brands.join(','))
    }
    if (blends.length >= 1) {
      if (str[str.length - 1] !== '?') str = str.concat('&')
      str = str.concat('blend=', blends.join(','))
    }
    if (formats.length >= 1) {
      if (str[str.length - 1] !== '?') str = str.concat('&')
      str = str.concat('format=', formats.join(','))
    }
    if (search.length >= 1) {
      if (str[str.length - 1] !== '?') str = str.concat('&')
      str = str.concat('search=', search.join(','))
    }
    if (sort.length >= 1) {
      if (str[str.length - 1] !== '?') str = str.concat('&')
      str = str.concat('sort=', sort.join(','))
    }
    if (otherQueries.length >= 1) {
      if (str[str.length - 1] !== '?') str = str.concat('&')
      str = str.concat(otherQueries)
    }

    if (str === '?') {
      return ''
    } else {
      return str
    }
  }

  return {
    brands,
    blends,
    formats,
    handleBlends,
    handleBrands,
    handleFormats,
    handleQueryString
  }
}
