import { NextApiRequest, NextApiResponse } from 'next'
import getSingleProduct from '../services/getSingleProduct'

export default async function singleProductController (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  let name

  if (req.query.name === undefined) {
    res.status(400)
  } else {
    name = Array.isArray(req.query.name) ? req.query.name[0].replaceAll('-', ' ') : req.query.name.replaceAll('-', ' ')

    try {
      const productInfo = await getSingleProduct(name)
      res.status(200).json(productInfo)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
