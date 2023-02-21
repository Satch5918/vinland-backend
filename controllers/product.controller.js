import { Product } from "../models/Products.js";
import defaultResponse from "../config/response.js";

const controller = {
  create: async (req, res, next) => {
    try {
      await Product.create(req.body);
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
  read_all: async (req, res, next) => {
    console.log(req.query);
    let queriesToFilter = {}
    let ordering = {}
    let pagination = {
        page:1 ,
        limit: 6 
    }
    if(req.query.name){
      queriesToFilter.name = { "$regex": req.query.name, $options: "i" };
    }
    if (req.query.genre){
      queriesToFilter.genre = req.query.genre.split(",")
    }
    if (req.query.sort){
        ordering = {name: req.query.sort}
    }
    if (req.query.page) {
    pagination.page = req.query.page;
    }
    if (req.query.limit) {
    pagination.limit = req.query.limit;
    }
    try {
      const products = await Product.find(queriesToFilter).populate(
        "genre",
        "name -_id"
      ).select(
        "-demo -sales  -description -createdAt -updatedAt -__v"
      )
        .sort(ordering)
        .skip( pagination.page > 0 ? (pagination.page - 1) * pagination.limit : 0)
        .limit(pagination.limit)
      req.body.success = true;
      req.body.sc = 201;
      req.body.data = products;
      return defaultResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  read_one: async (req, res, next) => {
    const { id } = req.params;
    try {
      let products = await Product.findById(id, "-sales -createdAt -updatedAt -__v").populate(
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
        "-demo -sales  -description -createdAt -updatedAt -__v"
      ).sort('-sales').limit(2)
      if (all) {
        req.body.success = true;
        req.body.sc = 200;
        req.body.data = all;
        return defaultResponse(req, res);
    } else {
        req.body.success = false;
        req.body.sc = 404;
        req.body.data = "not found";
        return defaultResponse(req, res);
    }
    } catch (error) {
      next(error);
    }
  },
  read_last: async (req, res, next) => {
    try {
      const products = await Product.find().populate(
        "genre",
        "name -_id"
      ).select(
        "-demo -sales -createdAt -updatedAt -__v"
      ).sort('-createdAt').limit(4)
      req.body.success = true;
      req.body.sc = 201;
      req.body.data = products;
      return defaultResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
/*   filter_products: async(req, res, next) => {
    console.log(req.query) */

/*     let queryToFilter = {}
    let ordering = {}
    let pagination= {
      page: 1,
      limit: 10
    } */
/*     if(req.query.name){
      queryToFilter.name = { "$regex": req.query.name, $options: "i" };
    }
    if(req.query.genre){
      queryToFilter.genre = req.query.genre.split(',')
    }
    if (req.query.sort){
      ordering = {name: req.query.sort}
    }
    if (req.query.page) {
    pagination.page = req.query.page;
    }
    if (req.query.limit) {
			pagination.limit = req.query.limit;
		} */
/*     try{
      let all = await Product.find(queryToFilter).populate("genre")
      .sort(ordering)
      .skip(pagination.page > 0 ? (pagination.page - 1) * pagination.limit: 0)
      .limit(pagination.limit)
      if(all){
        req.body.success = true;
            req.body.sc = 200;
            req.body.data = all;
            return defaultResponse(req, res);
      }else{
        req.body.success = false;
            req.body.sc = 404;
            req.body.data = "not found";
            return defaultResponse(req, res);
      }
    }
    catch(error){
      next(error)
    } */
  
};
export default controller;
