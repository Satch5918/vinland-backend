import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {   
        user_id: {type: mongoose.Types.ObjectId, ref:"users", required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},
        purchases: {type: [mongoose.Types.ObjectId], required: true},
        phone: {type: String},
        
    },{
        timestamps: true
    }
)

export const Buyer = mongoose.model('buyers',schema)