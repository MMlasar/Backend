import fs from "fs";
import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils";

class ProductManager {
  static #products = [];

  constructor(filePath) {
    this.path = filePath;
    this.conf = "utf-8";
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    if (exist) {
      ProductManager.#products = JSON.parse(
        fs.readFileSync(this.path, this.conf)
      );
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  create = async (data) => {
    try {
      data._id = crypto.randomBytes(12).toString("hex");
      ProductManager.#products.push(data);
      await fs.promises.writeFile(this.path, JSON.stringify(ProductManager.#products, null, 2));
      return data;
    } catch (error) {
      throw error;
    }
  };

  read({ filter, options }) {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("There are no products");
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = ProductManager.#products.find((each) => each._id === id);
      if (!one) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.readOne(id);
      notFoundOne(one);
      ProductManager.#products = ProductManager.#products.filter(
        (each) => each._id !== id
      );
      await fs.promises.writeFile(this.path, JSON.stringify(ProductManager.#products, null, 2));
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let one = await this.readOne(id);

      if (!one) {
        throw new Error("Product not found!");
      } else {
        one.title = data.title || one.title;
        one.photo = data.photo || one.photo;
        one.price = data.price || one.price;
        one.stock = data.stock || one.stock;

        await fs.promises.writeFile(this.path, JSON.stringify(ProductManager.#products, null, 2));
        
        return "Product updated";
      }
    } catch (error) {
      throw error;
    }
  }
}

const products = new ProductManager("./src/data/fs/files/products.json");
export default products;
