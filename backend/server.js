import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
 import { connectDB } from './db/connect.js';
 import dotenv from 'dotenv';
 import productRoutes from './routes/product.routes.js';
 
const app = express();
const PORT = process.env.PORT || 3000;
 
// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use('/api', productRoutes);
 connectDB();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});