import { Genre } from "../models/Genre.js";
import defaultResponse from "../config/response.js";

const controller = {
	create: async (req, res, next) => {
		try {
			await Genre.create(req.body);
			req.body.success = true;
			req.body.sc = 201;
			req.body.data = " genre created";
			return defaultResponse(req, res);
		} catch (err) {
			next(err);
		}
	},
	read_all: async (req, res, next) => {
		try {
			const genre = await Genre.find().select(
				"-createdAt -updatedAt -__v"
			);
			req.body.success = true;
			req.body.sc = 201;
			req.body.data = genre;
			return defaultResponse(req, res);
		} catch (error) {
			next(error);
		}
	},
	read_one: async (req, res) => {
		const { id } = req.params;
		try {
			let genre = await Genre.findById(id, "-_id -createdAt -updatedAt -__v");
			req.body.success = true;
			req.body.sc = 201;
			req.body.data = genre;
			return defaultResponse(req, res);
		} catch (error) {
			next(error);
		}
	},
};
export default controller;
