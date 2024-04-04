import fs from "fs";
import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils";

class ProductManager {
  static #products = [];

  constructor() {
    this.path = "./src/data/fs/files/products.json";
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
        this.products.push(data);
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        return data;
    } catch (error) {
        throw error;
    }
};

  read({filter,options}) {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("there aren't products");
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      throw error;
    }
  }

 async readOne(id) {
    try {
      const one = this.products.find((each)=> each._id === id);
      if (!one) {
        const error = new Error ("NOT FOUND!");
        error.statuscode = 404;
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
        this.products = this.products.filter((each) => each._id !== id);
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
    } catch (error) {
        throw error;
    }
}

 async update(id,data){
    try {
     const one= this.readOne(id);

      if(!one){
        throw new Error("No se encontro producto!")
      }else{
          one.title= data.title || one.title,
          one.photo= data.photo || one.photo,
          one.price= data.price || one.price,
          one.stock= data.stock || one.stock,

        fs.writeFileSync(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );

        return "producto actualizada"
      }

    } catch (error) {
      return error.message;
    }
  }
}

const products = new ProductManager("./src/data/fs/files/products.json");
export default products;
