import { NextApiRequest, NextApiResponse } from 'next'
import recommenderController from '../../../resources/api/controllers/Recommender/recommenderController'

export default async function handleRecommender (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    await recommenderController(req, res)
  } else {
    res.status(405)
  }
}
