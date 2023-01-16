import { NextApiRequest, NextApiResponse } from 'next'
import { productsController } from '../../../resources/api/controllers/productsController'

export default async function handleProducts (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    await productsController(req, res)
  } else {
    res.status(405)
  }
}
