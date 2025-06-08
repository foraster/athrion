const uuid = require("uuid");
const path = require("path");
const { Product, ProductInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const { Sequelize } = require("sequelize");

class ProductController {
  async create(req, res, next) {
    try {
      let { title, price_cents, description, category, subcategory } = req.body;
      if (!title || !price_cents || !description || !category) {
        return next(
          ApiError.badRequest(
            "The title, price, description and category must be provided"
          )
        );
      }
      const { image } = req.files;
      if (!image) {
        next(ApiError.badRequest("Image must be provided"));
      }
      let fileName = uuid.v4() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));
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
    const products = await Product.findAll();
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
      let { title, price_cents, description, category, subcategory } = req.body;
      if (!title || !price_cents || !description || !category) {
        return next(
          ApiError.badRequest(
            "The title, price, description and category must be provided"
          )
        );
      }

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
 
      product.update({
        title,
        price_cents,
        category,
        subcategory,
        description: parsedDescription,
        image: fileName,
      })

      return res.json(product);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal("Unexpected error"));
    }
  }
}

module.exports = new ProductController();
