import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



//  app congig 
const app = express();
const port = process.env.PORT || 4000;
console.log('Starting server...');
console.log('JEST_WORKER_ID:', process.env.JEST_WORKER_ID);
console.log('NODE_ENV:', process.env.NODE_ENV);

connectDB();
connectCloudinary();


// middlewares
app.use(express.json());
app.use(cors());



//  api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);




app.get('/', (req, res) => {
    res.send('API Is Working Properly');
});


if (!process.env.JEST_WORKER_ID && process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log('Server is running on port : ' + port));
}

export default app;
