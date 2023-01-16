import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function useFilter () {
  const router = useRouter()
  const { query } = router
  const [brands, setBrands] = useState<string[]>([])
  const [blends, setBlends] = useState<string[]>([])
  const [formats, setFormats] = useState<string[]>([])
  const [search, setSearch] = useState<string[]>([])
  const [sort, setSort] = useState<string[]>([])
  const [otherQueries, setOtherQueries] = useState('')

  useEffect(() => {
    let tempStr = ''
    if (!Object.hasOwn(query, 'search') && search.length >= 1) {
      setSearch([])
    }
    if (!Object.hasOwn(query, 'sort') && sort.length >= 1) {
      setSort([])
    }
    for (const element in query) {
      switch (element) {
        case 'blend':
          setBlends(query.blend.split(','))
          break
        case 'brand':
          setBrands(query.brand.split(','))
          break
        case 'format':
          setFormats(query.format.split(','))
          break
        case 'page':
          break
        case 'search':
          setSearch(query.search.split(','))
          break
        case 'sort':
          setSort(query.sort.split(','))
          break
        default:
          if (tempStr.length >= 1) {
            tempStr = `${tempStr}&${element}=${query[element]}`
          } else {
            tempStr = `${element}=${query[element]}`
          }
          break
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
