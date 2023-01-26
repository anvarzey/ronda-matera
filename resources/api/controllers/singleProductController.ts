import { NextApiRequest, NextApiResponse } from 'next'
import getSingleProduct from '../services/getSingleProduct'

export default async function singleProductController (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const name = req.query.name.replaceAll('-', ' ')

  try {
    const productInfo = await getSingleProduct(name)
    res.status(200).json(productInfo)
  } catch (err) {
    res.status(500).json(err)
  }
}
