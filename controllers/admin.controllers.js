
import { User } from "../models/User.js";

const adminController = {

  updateLockUser: async (req, res, next) => {
    try {
      const { id } = req.params; 
      const updatedUser = await User.findOne({_id: id});
      updatedUser.is_lock = !updatedUser.is_lock
      await updatedUser.save()
      res.status(200).json({ user: updatedUser});
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
    getUsers: async(req, res, next) => {
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
      console.log(error)
      next(error)
    }},

    deleteUser: async (req, res) => {
      try {
        const { id } = req.params;
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
          succes: true,
          response: "User deleted",
        });
      } catch (error) {
        console.log(error);
      }
    },

};

export default adminController;