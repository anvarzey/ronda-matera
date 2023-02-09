import mongoose from 'mongoose'
const { MONGO_URI, MONGO_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test' ? MONGO_TEST : MONGO_URI

if (NODE_ENV !== 'test') {
  mongoose.set('strictQuery', false)

  mongoose.connect(connectionString)
    .then(() => {
      console.log('Database connected')
    })
    .catch(err => console.error(err))
}
