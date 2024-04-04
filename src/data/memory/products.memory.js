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
        throw new Error("Los campos title, photo, price, stock son obligatorias");
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
      notFoundOne(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  static destroy(id) {
    try {
      const productIndex = ProductManager.#products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        throw new Error("No se encontró el producto");
      } else {
        ProductManager.#products.splice(productIndex, 1);
        return "Producto eliminado";
      }
    } catch (error) {
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const one = await this.readOne(id);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const products = new ProductManager();
export default products;

