import { createMocks, RequestMethod, createRequest, createResponse } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import handleRecommender from '../../../../pages/api/recommender/[advice]'
import recommenderController from '../../../../resources/api/controllers/Recommender/recommenderController'

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock('../../../../resources/api/controllers/Recommender/recommenderController')

describe('', () => {
  function mockRequestResponse (method: RequestMethod = 'GET'): { req: ApiResponse, res: ApiRequest } {
    const {
      req,
      res
    }: { req: ApiResponse, res: ApiRequest } = createMocks({ method })
    req.headers = {
      'Content-Type': 'application/json'
    }
    return { req, res }
  }

  test('should call productsController when receives a GET method', async () => {
    const { req, res } = mockRequestResponse('POST')
    await handleRecommender(req, res)

    expect(res.statusCode).toBe(405)
  })
})
