
import { User } from "../models/User.js";

const adminController = {

  update_lock_user: async (req, res, next) => {
    try {
      const { id } = req.params; 
      const updatedUser = await User.findOne({_id: id});
      updatedUser.is_lock = !updatedUser.is_lock
      await updatedUser.save()
      res.status(200).json({ user: updatedUser});
    } catch (error) {
      next(error)
    }
  },
    get_users: async(req, res, next) => {
      try{
        let queries = {}
        if(req.query.is_lock ){
          queries.active = req.query.is_lock
        }
        const users = await User.find(queries);
        return (
            res.status(200).json({
            succes: true,
            response: companies
          })
        );
      }catch(error){
      next(error)
    }},

    delete_user: async (req, res, next) => {
      try {
        const { id } = req.params;
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
          succes: true,
          response: "User deleted",
        });
      } catch (error) {
        next(error)
      }
    },

};

export default adminController;