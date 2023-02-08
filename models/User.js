import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {   
        first_name: {type: String, required: true},
        last_name: {type: String},
        email: {type: String, required: true},
        password: {type: String, required: true},
        is_buyer: {type: Boolean, required: true},
        is_admin: {type: Boolean, required: true},
        is_online: {type: Boolean, required: true},
        is_verified: {type: Boolean, required: true},
        verify_code: {type: String, required: true},
        is_lock: {type: Boolean, required: true},
    },{
        timestamps: true
    }
)

export const User = mongoose.model('users',schema)