import React from 'react'
import  ProductCard  from "../ProductListing/ProductCard";
import { productListData } from "../ProductListing/products";


function ProductListing() {
    return (
        <div>
            <div style={{ maxWidth: "70%", margin: "20px auto" }}>
                <h3>
                    Showing results for <i>smart phones</i>
                </h3>
                {productListData.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    )
}

export default ProductListing