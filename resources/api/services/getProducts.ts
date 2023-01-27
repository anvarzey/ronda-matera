import { Product, IProduct } from '../models/Product'
import './connectToMongo'
import { Query } from '../utils/queryMaker'

interface Queries {
  query: Query | string
  limit: number
  sortQuery: string | {}
  beginFrom: number
  page: number
}

interface Response {
  data: IProduct[]
  limit: number
  page: number
  totalPages: number
  totalProducts: number
}

export default async function getProducts (queries: Queries): Promise<Response | any> {
  const {
    query,
    limit,
    sortQuery,
    beginFrom,
    page
  } = queries
  try {
    const totalProducts = await Product.find(query).countDocuments()
    const totalPages = totalProducts / limit >= 1
      ? Math.ceil(totalProducts / limit)
      : totalProducts / limit > 0 && totalProducts / limit < 1
        ? 1
        : 0
    const productsList = await Product
      .find(query)
      .sort(sortQuery)
      .skip(beginFrom)
      .limit(limit)

    const responseObject = {
      data: productsList,
      limit,
      page,
      totalPages,
      totalProducts
    }
    return responseObject
  } catch (err) {
    return err
  }
}
