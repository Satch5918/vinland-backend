import { Product } from "../models/Products.js";
import defaultResponse from "../config/response.js";

const controller = {
  create: async (req, res, next) => {
    try {
      const {
        gender,
        name,
        photo,
        price,
        stock,
        demo,
        description,
        artist,
        date,
        sales,
      } = req.body;
      await Product.create({
        gender,
        name,
        photo,
        price,
        stock,
        demo,
        description,
        artist,
        date,
        sales,
      });
      req.body.success = true;
      req.body.sc = 201;
      req.body.data = "new product";
      return defaultResponse(req, res);
    } catch (err) {
      next(err);
    }
  },
  updated: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true });
      req.body.success = true;
      req.body.sc = 200;
      req.body.data = "update product";
      return defaultResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  destroyed: async (req, res) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete({ _id: id });
      req.body.success = true;
      req.body.sc = 200;
      req.body.data = "delete product";
      return defaultResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
