import mongoose, { model, Schema, Types } from 'mongoose'

export interface IVendor {
  name: string
  products: [{
    productName: string
    price: Types.ObjectId
  }]
  delivery: {
    peninsula: {
      cost: number
      freeFrom: number
    }
    canarias: {
      cost: number
      freeFrom: number
    }
    baleares: {
      cost: number
      freeFrom: number
    }
  }
}

const vendorSchema = new Schema<IVendor>({
  name: String,
  products: [{
    productName: String,
    price: {
      type: Schema.Types.ObjectId,
      ref: 'Price'
    }
  }],
  delivery: {
    peninsula: {
      cost: Number,
      freeFrom: Number
    },
    canarias: {
      cost: Number,
      freeFrom: Number
    },
    baleares: {
      cost: Number,
      freeFrom: Number
    }
  }
})

export let Vendor

if (mongoose.models.Vendor){
  Vendor = mongoose.models.Vendor
} else {
  Vendor = model('Vendor', vendorSchema)
}
