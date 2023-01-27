import mongoose, { model, Schema, Types } from 'mongoose'

export interface IProduct {
  _id: string
  name: string
  description: string
  image: string
  lowestPrice: {
    vendorName: string
    price: number
    kgPrice: number
    link: string
    wholesalePrices: [{
      minimum: number
      price: number
      priceKg: number
    }]
  }
  bestPrice: Types.ObjectId
  format: string
  brand: string
  prices: [Types.ObjectId]
  outOfStock: boolean
  blend: string
}

const productSchema = new Schema<IProduct>({
  name: String,
  description: String,
  image: String,
  lowestPrice: {
    vendorName: String,
    price: Number,
    kgPrice: Number,
    link: String,
    wholesalePrices: [{
      minimum: Number,
      price: Number,
      priceKg: Number
    }]
  },
  bestPrice: {
    type: Schema.Types.ObjectId,
    ref: 'Price'
  },
  format: String,
  brand: String,
  prices: [{
    type: Schema.Types.ObjectId,
    ref: 'Price'
  }],
  outOfStock: Boolean,
  blend: String
})

export let Product: typeof mongoose.models.Product | IProduct

if (mongoose.models.Product !== undefined && mongoose.models.Product !== null) {
  Product = mongoose.models.Product
} else {
  Product = model<IProduct>('Product', productSchema)
}
