import { Product } from "../models/Products.js";
import defaultResponse from "../config/response.js";

const controller = {
  create: async (req, res, next) => {
    try {
      const {
        genre,
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
        genre,
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
  read_All: async (req, res, next) => {
    try {
      const products = await Product.find().populate(
        "genre",
        "name -_id"
      ).select(
        "-_id -demo -sales  -description -createdAt -updatedAt -__v"
      )
      req.body.success = true;
      req.body.sc = 201;
      req.body.data = products;
      return defaultResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  read_one: async (req, res) => {
    const { id } = req.params;
    try {
      let products = await Product.findById(id, "-_id -demo -sales  -description -createdAt -updatedAt -__v").populate(
        "genre",
        "name -_id"
      );
      req.body.success = true;
      req.body.sc = 201;
      req.body.data = products;
      return defaultResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  read_bestseller: async (req, res, next) => {
    try {
      const products = await Product.find().populate(
        "genre",
        "name -_id"
      ).select(
        "-_id -demo -sales  -description -createdAt -updatedAt -__v"
      ).sort('-sales').limit(2)
      req.body.success = true;
      req.body.sc = 201;
      req.body.data = products;
      return defaultResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  read_ultimos: async (req, res, next) => {
    try {
      const products = await Product.find().populate(
        "genre",
        "name -_id"
      ).select(
        "-_id -demo -sales  -description -createdAt -updatedAt -__v"
      ).sort('-createdAt').limit(2)
      req.body.success = true;
      req.body.sc = 201;
      req.body.data = products;
      return defaultResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
};
export default controller;
