"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '/app/components/sidebar/sidebar'
import ProductsGrid from '/app/components/productsGrid'
import GlobalConfig from "/app/app.config.js"

const CategoryProductsTemplate = (props) => {
    const [products, setProducts] = useState([]);
    const [productsError, setProductsError] = useState(null);
    const [category, SetCategory] = useState([]);

    useEffect(() => {
        setProducts(props.products);
        const pcat = localStorage.getItem('ProductCategories');
        SetCategory(JSON.parse(pcat));
        localStorage.setItem('productDetailsFetchStatus', JSON.stringify(true));
    }, []);

    return (
        <>
            <div className="px-2 flex flex-1 mt-10 lg:mt-16 pr-4 pl-6 lg:px-16">
                <Sidebar data={category} />
                <ProductsGrid gridData={products} flag={1} />
            </div>
        </>
    )
}

export default CategoryProductsTemplate