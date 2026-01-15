import express from 'express';
 import {createProduct, getProducts,getproductmeta} from '../controllers/product.controller.js';

const router = express.Router();
router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/meta/search', getproductmeta);
export default router;