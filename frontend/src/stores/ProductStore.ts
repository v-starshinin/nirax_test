import { makeAutoObservable } from "mobx";
import { Product } from "../types/Product";

class ProductStore {
    products: Product[] = [];
    searchResults: Product[] = [];
    searchCode: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setSearchCode(code: string) {
        this.searchCode = code;
    }

    setProducts(products: Product[]) {
        this.products = products;
    }
}

const productStore = new ProductStore();
export default productStore;
