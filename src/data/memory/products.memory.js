import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class ProductManager {
  static #products = [];

  static create(data) {
    try {
      const newProduct = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };

      if (data.title && data.photo && data.price && data.stock) {
        ProductManager.#products.push(newProduct);
        return newProduct;
      } else {
        throw new Error("Los campos title, photo, price, stock son obligatorios");
      }
    } catch (error) {
      throw error;
    }
  }

  static read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("No se encontraron productos");
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      throw error;
    }
  }

  static readOne(id) {
    try {
      const product = ProductManager.#products.find((product) => product.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  static destroy(id) {
    try {
      const productIndex = ProductManager.#products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }
      ProductManager.#products.splice(productIndex, 1);
      return "Producto eliminado";
    } catch (error) {
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const product = await this.readOne(id);
      for (let key in data) {
        if (key in product) {
          product[key] = data[key];
        }
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductManager;

