import multer from "multer";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import ProductModel from "../model/products.schema";
import { IProduct } from "../interface/product.interface";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { user } = req;
      
    const {
      productName,
      productThumbnail,
      price,
      quantity,
      discount,
    }: IProduct = req.body;

    const createProducts = await ProductModel.create({
      productName,
      productThumbnail,
      price,
      quantity,
    //   discountType,
      discount,
      userId: user,
    });

    await createProducts.save();

    res.status(201).send({ createdProduct: createProducts });
  } catch (err) {
    res.status(501).send({ err: "Internal Server Error" });
  }
};

export const listProducts = async (req: Request, res: Response) => {
  try {
    let query = ProductModel.find();

    // Sort by name in ascending or descending order
    if (req.query.sort === 'asc') {
      query = query.sort('productName');
    } else if (req.query.sort === 'desc') {
      query = query.sort('-productName');
    }

    // Search by product name
    if (req.query.search) {
      query = query.regex('productName', new RegExp(req.query.search as string, 'i'));
    }

    // Pagination
    const page = parseInt(req.query?.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const products = await query.exec();

    res.status(200).json({
      msg : "products Fetched !",
      products : products
    });
  } catch (err) {
    res.status(501).send({ err: "Internal Server Error" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { productName, price, productThumbnail, quantity, discount }: IProduct =
      req.body;
    const { user } = req;
    const doesExist = await ProductModel.findOne({ _id: id });
    if (!doesExist)
      return res.status(404).send({ msg: `Products ${id} id doesn't exist !` });

    const updateProduct = await ProductModel.updateOne(
      {
        $and: [{ _id: id }, { userId: user }],
      },
      { $set: {  productName, price, productThumbnail, quantity, discount } },
      { new: true }
    );

    res.status(201).send({
      msg: "Product got upadted yet!",
      updatedProduct: updateProduct,
    });
  } catch (err) {
    res.status(501).send({ err: "Internal Server Error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const doesExist = await ProductModel.findOne({ _id: id });
    if (!doesExist)
      return res.status(404).send({ msg: `Products ${id} id doesn't exist !` });
    const deleteProduct = await ProductModel.deleteOne({
      $and: [{ _id: id }, { userId: user }],
    });
    res.status(201).send({
      msg: "Product deleted yet!",
      deletedProduct: deleteProduct,
    });
  } catch (err) {
    res.status(501).send({ err: "Internal Server Error" });
  }
};
