import { User } from '../models/User.js' 
import bcryptjs from 'bcryptjs' //modulo para hashear la contraseña
import crypto from 'crypto' //modulo para generar codigos aleatorios
import jwt from 'jsonwebtoken' //modulo para utilizar los metodos de jwt
import defaultResponse from '../config/response.js'
import { Buyer } from '../models/Buyer.js'
import transporter from '../config/mailingConfig.js'

const newBuyer = async (user_id) => {
    const data = {
        user_id,
        address: ' ',
        city: ' ',
        country: ' ',
        pursaches: []
    }
    await Buyer.create(data)
}

const sendMail = async (verify_code, mail) => {
    const frontPath = process.env.FRONT
    const message = {
        from: `"Vinland - Land of vinyls" ${process.env.EMAIL_MAILING}`,
        to: mail,
        subject: "User Validation",
        text: "Validate your user pressing in the next link",
        html: `<p>Press in the next link to validate your user <a href="${frontPath}/verify/${verify_code}">Press Here</a></p>`
    } // Mensaje a enviar
    await transporter.sendMail(message) // Envio del mail
}

const controller = {

    signup: async (req, res, next) => {
        req.body.is_online = false //agrego las propiedades que el cliente NO envió
        req.body.is_admin = false
        req.body.is_buyer = true
        req.body.is_lock = false
        req.body.is_verified = false
        req.body.verify_code = crypto.randomBytes(10).toString('hex') //defino el codigo de verificacion por mail
        req.body.password = bcryptjs.hashSync(req.body.password, 10) //encripto o hasheo la contraseña
        try {
            //await accountVerificationEmail(req,res) //envío mail de verificación (SPRINT-4)
            const newUser = await User.create(req.body) //crea el usuario
            await newBuyer(newUser._id)
            await sendMail(req.body.verify_code, req.body.email)
            req.body.success = true
            req.body.sc = 201 //agrego el codigo de estado
            req.body.data = 'user created' //agrego el mensaje o información que necesito enviarle al cliente
            return defaultResponse(req,res) //retorno la respuesta default
        } catch (error) {
            console.log(error)
            next(error) //respuesta del manejador de errores
        }
    },

    signin: async (req, res, next) => {
        let { password } = req.body
        let { user } = req
        try {
            const verified = bcryptjs.compareSync(password, user.password) //comparo contraseña
            if(verified) {
                await User.findOneAndUpdate( //busco y actualizo
                    { email: user.email }, //parametro de busqueda
                    { is_online: true }, //parametro a modificar
                    { new: true } //especificacion que reemplace el documento de origen
                )
                let token = jwt.sign( //creo la firma de jwt
                    { id: user.id }, //parametro a convertir en token
                    process.env.KEY_JWT, //parámetro secreto, necesario para la conversion
                    { expiresIn: 60*60*24 } //tiempo de expiracion en segundos
                )
                //console.log(token)
                user = { //protejo mas datos sensibles
                    email: user.email,
                    is_admin: user.is_admin,
                    is_buyer: user.is_author,
                    is_lock: user.is_lock,
                    /* is_verified: user.is_verified */
                }
                req.body.success = true
                req.body.sc = 200
                req.body.data = { user,token }
                return defaultResponse(req,res)
            }
                req.body.success = false
                req.body.sc = 400
                req.body.data = 'invalid credentials'                
            return defaultResponse(req,res)
        } catch (error) {
            next(error) //respuesta del catch
        }
    },

    signin_token: async (req, res, next) => {
        let { user } = req
        try {
            req.body.success = true
            req.body.sc = 200
            req.body.data = { user }
            return defaultResponse(req,res)
        } catch (error) {
            next(error)
        }
    },

    signout: async (req, res, next) => {
        const { email } = req.user
        try {
            //si tiene éxito debe cambiar online de true a false
            await User.findOneAndUpdate(
                { email }, //parametro de busqueda
                { is_online: false }, //parametro a modificar
                { new: true } //especificacion que reemplace el documento de origen

            )
            req.body.success = true
            req.body.sc = 200
            req.body.data = 'come back soon!'
            return defaultResponse(req,res)
        } catch (error) {
            next(error)
        }
    },

    read: async(req,res,next) => {
        try {
            let all = await User.find()
            if (all) {
                req.body.success = true
                req.body.sc = 200
                req.body.data = { all }
                return defaultResponse(req,res)
            } else {
                req.body.success = false
                req.body.sc = 404
                req.body.data = 'no users yet'
                return defaultResponse(req,res)
            }            
        } catch(error) {
            next(error)
        }        
    },

    verify: async(req, res, next) => {
        const { verify_code } = req.params
        try {
            await User.findOneAndUpdate({ verify_code }, { is_verified: true })
            req.body.success = true
            req.body.sc = 201 
            req.body.data = 'user verified'
            return defaultResponse(req,res)
        } catch (error) {
            next(error)
        }
    },
    read_one: async(req, res, next) => {
        try{
            const user = await User.findOne({_id: req.user.id})
            console.log(user);
            req.body.success = true;
            req.body.sc = 201;
            req.body.data = user;
            return defaultResponse(req, res);
        }
        catch(error){
            next(error)
        }
    },
    edit_one: async(req, res, next) => {
        let userInfo = req.body
        console.log(userInfo);
        console.log(req.user.id);
        try{
            const user = await User.findOneAndUpdate({_id: req.user.id}, req.body, {new: true})
            console.log(user);
            req.body.success = true;
            req.body.sc = 201;
            req.body.data = user;
            return defaultResponse(req, res);
        }
        catch(error){
            console.log(error);
        }
    }
}

export default controller