import mongoose, { model, Schema, Types } from 'mongoose'

export interface IPrice {
  product: Types.ObjectId
  price: number
  kgPrice: number
  link: string
  outOfStock: boolean
  vendor: Types.ObjectId
  wholesalePrices: [{
    minimum: number
    price: number
    priceKg: number
  }]
}

const priceSchema = new Schema<IPrice>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  price: Number,
  kgPrice: Number,
  link: String,
  outOfStock: Boolean,
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  wholesalePrices: [{
    minimum: Number,
    price: Number,
    kgPrice: Number
  }]
})

export let Price: IPrice | typeof mongoose.models.Price

if (mongoose.models.Price !== undefined && mongoose.models.Price !== null) {
  Price = mongoose.models.Price
} else {
  Price = model('Price', priceSchema)
}
