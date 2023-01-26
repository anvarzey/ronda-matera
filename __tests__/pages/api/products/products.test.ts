import { createMocks, RequestMethod, createRequest, createResponse } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import handleProducts from '../../../../pages/api/products/index'
import { productsController } from '../../../../resources/api/controllers/productsController'

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock('../../../../resources/api/controllers/productsController')

describe('GET products', () => {
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
    const { req, res } = mockRequestResponse()
    await handleProducts(req, res)

    expect(productsController).toHaveBeenCalledTimes(1)
  })

  test('should return a 405 error when the request\'s method is not GET', async () => {
    const { req, res } = mockRequestResponse('POST')
    await handleProducts(req, res)

    expect(res.statusCode).toBe(405)
  })
})
