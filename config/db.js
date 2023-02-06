import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error connecting to database: ' + err))