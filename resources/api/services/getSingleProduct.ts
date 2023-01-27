import { Product, IProduct } from '../models/Product'
import { Price } from '../models/Price'
import { Vendor } from '../models/Vendor'
import './connectToMongo'

interface responseObject {
  data: IProduct[]
  limit: number
  page: number
  totalPages: number
  totalProducts: number
}

export default async function getSingleProduct (name: string): Promise<responseObject | any> {
  const queryParameters = {
    path: 'prices',
    model: Price,
    select: 'price kgPrice link outOfStock wholesalePrices',
    populate: {
      path: 'vendor',
      model: Vendor,
      select: 'delivery name'
    }
  }
  try {
    const product = await Product
      .find({ name })
      .populate(queryParameters)
    return product
  } catch (err) {
    return err
  }
}
