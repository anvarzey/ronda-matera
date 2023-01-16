import { NextApiRequest, NextApiResponse } from 'next'
import singleProductController from '../../../resources/api/controllers/singleProductController'

export default async function SingleProduct (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    await singleProductController(req, res)
  } else {
    res.status(400).json({ message: 'Http method not allowed' })
  }
}
