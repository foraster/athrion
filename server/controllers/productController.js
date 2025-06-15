const uuid = require("uuid");
const path = require("path");
const { Product, ProductInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const { Sequelize } = require("sequelize");
const fs = require('fs');

class ProductController {
  async create(req, res, next) {
    try {
      let { title, price_cents, description, category, subcategory, isActive, stock_quantity } = req.body;
      if (!title || !price_cents || !description || !category) {
        return next(
          ApiError.badRequest(
            "The title, price, description and category must be provided"
          )
        );
      }
      stock_quantity = parseInt(stock_quantity) || 0;
      let fileName = '../static/placeholder.jpg';
      const image = req.files?.image;

        if (image) {
          fileName = uuid.v4() + ".jpg";
          await image.mv(path.resolve(__dirname, "..", "static", fileName));
        }
      let parsedDescription;
      try {
        parsedDescription = JSON.parse(description);
      } catch (e) {
        return next(ApiError.badRequest("Invalid JSON in description"));
      }

      const product = await Product.create({
        title,
        price_cents,
        category,
        subcategory,
        image: fileName,
        description: parsedDescription,
        isActive,
        stock_quantity
      });

      return res.json(product);
    } catch (e) {
      if (e instanceof Sequelize.UniqueConstraintError) {
        return next(
          ApiError.badRequest(
            `Product with title "${req.body.title}" already exists.`
          )
        );
      }
      console.error(e);
      return next(ApiError.internal("Unexpected error"));
    }
  }

  async getAllSorted(req, res) {
    let { category } = req.query;

    let where = {};
    if (category) {
      where.category = category;
    }

    const products = await Product.findAndCountAll({ where });
    return res.json(products);
  }
  async getAll(req, res) {
  const { active } = req.query;

  const where = {};
  if (active === "true") where.isActive = true;
  if (active === "false") where.isActive = false;

  const products = await Product.findAll({ where });
  return res.json(products);
}

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });
    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;
    const product = await Product.destroy({
      where: { id },
    });
    if (product === 0) {
      return res.status(404).json({ message: "Product was not found" });
    } else if (product === 1) {
      return res
        .status(200)
        .json({ message: "Product was successfully deleted" });
    }
    return res.status(400).json({ message: "Unknown error has occurred" });
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
      });
      if (!product) {
        return next(
          ApiError.notFound(
            "Product with provided ID was not found"
          )
        );
      }
      let { title, price_cents, description, category, subcategory, isActive, stock_quantity  } = req.body;
      if (!title || !price_cents || !description || !category ) {
        return next(
          ApiError.badRequest(
            "The title, price, description and category must be provided"
          )
        );
      }
      stock_quantity = parseInt(stock_quantity) || 0;
      let parsedDescription;
      try {
        parsedDescription = JSON.parse(description);
      } catch (e) {
        return next(ApiError.badRequest("Invalid JSON in description"));
      }

      let fileName = product.image;
      
      if (req.files && req.files.newImage) {
        const imagePath = path.resolve(__dirname, "..", "static", product.image);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Failed to delete previous image:", err);
          }
        });
  
        const newImage = req.files.newImage;
        fileName = uuid.v4() + ".jpg";
        await newImage.mv(path.resolve(__dirname, "..", "static", fileName));
      }
 
      await product.update({
        title,
        price_cents,
        category,
        subcategory,
        description: parsedDescription,
        image: fileName,
        isActive,
        stock_quantity
      })

      return res.json(product);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal("Unexpected error"));
    }
  }

  async changeIsActive(req, res, next) {
    const { isActive } = req.body;
    const { id } = req.params;
    if ( !id || typeof isActive === "undefined" ) {
      return next(ApiError.badRequest("Product ID and status must be provided"));
    }
    try {
      const product = await Product.findOne({ where: {id} });
      if (!product) {
        return next(ApiError.notFound("Product was not found"));
      }
      await product.update({
        isActive: isActive,
      });
      return res.json({ message: "Product successfully updated" });
    } catch (error) {
      console.error(error)
      return next(ApiError.internal("Failed to change product"));
    }
  }
}

module.exports = new ProductController();
