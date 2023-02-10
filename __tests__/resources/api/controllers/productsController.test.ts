import { createMocks, RequestMethod, createRequest, createResponse } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import { productsController } from '../../../../resources/api/controllers/productsController'
import getProducts from '../../../../resources/api/services/getProducts'

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock('../../../../resources/api/services/getProducts', () => jest.fn())

afterEach(() => {
  jest.clearAllMocks()
})

describe('Products controller', () => {
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
  test('getProducts should be called once', async () => {
  
    const { req, res } = mockRequestResponse()
    await productsController(req, res)

    expect(getProducts).toHaveBeenCalledTimes(1)
  })
    
    test('on calling controller without custom queries, getProducts should be called with default queries', async () => {
      const { req, res } = mockRequestResponse()
      await productsController(req, res)
      
      const queries = {
            query: {},
      limit: 15,
      sortQuery: '',
      beginFrom: 0,
      page: 1
    }
    
    expect(getProducts).toHaveBeenCalledWith(queries)
  })
})

describe('Products controller called with custom queries', () => {
  function mockRequestResponse (method: RequestMethod = 'GET'): { req: ApiResponse, res: ApiRequest } {
    const {
      req,
      res
    }: { req: ApiResponse, res: ApiRequest } = createMocks({ method })
    req.headers = {
      'Content-Type': 'application/json'
    }

    req.query = {
      limit: 20,
      page: 3
    }

    return { req, res }
  }

  test('getProducts should be called with these queries', async () => {
    const { req, res } = mockRequestResponse()
    await productsController(req, res)

    const queries = {
      query: {},
      limit: 20,
      sortQuery: '',
      beginFrom: 40,
      page: 3
    }

    expect(getProducts).toHaveBeenCalledWith(queries)
  }) })

  describe('Products controller called with custom queries', () => {
    function mockRequestResponse (method: RequestMethod = 'GET'): { req: ApiResponse, res: ApiRequest } {
      const {
        req,
        res
      }: { req: ApiResponse, res: ApiRequest } = createMocks({ method })
      req.headers = {
        'Content-Type': 'application/json'
      }
  
      req.query = {
        brand: 'Amanda'
      }
  
      return { req, res }
    }

  test('getProducts should be called with these queries', async () => {
    const { req, res } = mockRequestResponse()
    await productsController(req, res)

    const queries = {
      beginFrom: 0,
      query: {
        brand: 'Amanda'
      },
      limit: 15,
      page: 1,
      sortQuery: ''
    }

    expect(getProducts).toHaveBeenCalledWith(queries)
  })

  test('getProducts should be called with these queries', async () => {
    const { req, res } = mockRequestResponse()
    await productsController(req, res)

    expect(getProducts).toHaveBeenCalledTimes(1)
  })
})
