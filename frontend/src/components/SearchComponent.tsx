import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {ProductService} from '../api/ProductService'
import productStore from "../stores/ProductStore";
import ProductTable from "./ProductsTable";

interface SearchComponentProps {
  onError: (message: string, status: number) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = observer(({onError}) => {
    const [inputValue, setInputValue] = useState("");
    const productService = new ProductService()

    const handleSearch = async () => {
        productStore.setSearchCode(inputValue);
        try {
       const products = await productService.searchByCode(inputValue);
        productStore.setProducts(products)
    } catch (err: any) {
      onError(err.statusText, err.status);
    }
       
    };

    return (
        <div>
            <h1>Product Search</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter search code"
            />
            <button onClick={handleSearch}>Search</button>

            <h2>Search Results</h2>
            <ProductTable products={productStore.products} />
        </div>
    );
});

export default SearchComponent;
