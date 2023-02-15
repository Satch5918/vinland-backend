import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		buyer_id: { type: mongoose.Types.ObjectId, required: true },
		status: { type: String, required: true },
		products: { type: [{product_id: {type: mongoose.Types.ObjectId, required: true, ref: 'products'}, quantity: {type: Number, required: true}}], require: true },
		total: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

export const Purchase = mongoose.model('purchases', schema)