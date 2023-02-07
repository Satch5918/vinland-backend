import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {   
        first_name: {type: String, require: true},
        last_name: {type: String},
        email: {type: String, require: true},
        password: {type: String, require: true},
        is_buyer: {type: Boolean, require: true},
        is_admin: {type: Boolean, require: true},
        is_online: {type: Boolean, require: true},
        is_verified: {type: Boolean, require: true},
        verify_code: {type: String, require: true},
        login_attemps: {type: Number,  require: true},
        is_lock: {type: Boolean, require: true},
    },{
        timestamps: true
    }
)

export const User = mongoose.model('users',schema)