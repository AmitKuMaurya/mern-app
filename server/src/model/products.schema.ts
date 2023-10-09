
import { Schema, Types, model } from 'mongoose';

interface IProduct {
  productName: string;
  quantity: number;
  price: number;
  // discountType: 'flat' | 'percentage';
  discount : string;
  // userId :  string;
  productThumbnail: string;
}

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  // discountType: { type: String, enum: ['flat', 'percentage'], required: true },
  discount: { type : String, require : true},
  productThumbnail: { type: String, required: true },
  userId : { type : Types.ObjectId, required : true, ref : 'user'}
},{
    timestamps : true
});

const ProductModel =  model<IProduct>('product', ProductSchema);
export default ProductModel;