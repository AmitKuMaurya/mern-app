import {Router} from "express";
import { createProduct, deleteProduct, listProducts, updateProduct } from "../controller/products.controller";
import { Authentication } from "../middleware/auth.middleware";
export const productRouter   = Router();

productRouter.post('/create',Authentication ,createProduct);
productRouter.get('/list',Authentication ,listProducts);
productRouter.patch('/update',Authentication ,updateProduct);
productRouter.delete('/delete',Authentication ,deleteProduct);
