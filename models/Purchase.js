import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		buyer_id: { type: mongoose.Types.ObjectId, require: true },
		status: { type: String, require: true },
		products: { type: Array, require: true },
		total: { type: Number, require: true },
	},
	{
		timestamps: true,
	}
);

export const Purchase = mongoose.model('purchases', schema)