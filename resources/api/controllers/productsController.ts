import { NextApiRequest, NextApiResponse } from 'next'
import queryMaker from '../utils/queryMaker'
import getProducts from '../services/getProducts'

export async function productsController (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const limit = req.query.limit !== undefined ? Number(req.query.limit) : 15
  const page = req.query.page !== undefined ? Number(req.query.page) - 1 : 0
  const query = queryMaker(req.query)
  const { sort } = req.query || undefined

  const sortOptions = {
    nameUp: { name: 1 },
    nameDown: { name: -1 },
    priceUp: { 'lowestPrice.price': 1 },
    priceDown: { 'lowestPrice.price': -1 }
  }

  const sortQuery = sort !== undefined && Object.hasOwn(sortOptions, sort)
    ? sortOptions[sort]
    : {}

  const beginFrom = page * limit

  const queries = {
    query,
    limit,
    sortQuery,
    beginFrom,
    page: page + 1
  }
  try {
    const responseObject = await getProducts(queries)
    res.status(200).json(responseObject)
  } catch (err) {
    res.status(500).send(err)
  }
}
