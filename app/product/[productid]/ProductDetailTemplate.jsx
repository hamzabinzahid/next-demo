"use client"
import "/public/css/product-counter.css";
import { Minus, Plus } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import GlobalConfig from '/app/app.config.js'
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { GoBackButton } from "/app/components/goBackButton";

const ProductDetailTemplate = (props) => {
    const router = useRouter();

    const [productDetails, SetProductDetails] = useState([]);
    const [productsize, SetProductSize] = useState([]);
    const [productaddons, SetProductAddons] = useState([]);
    const [cart, setCart] = useState([]);

    // Error States
    const [productError, setProductError] = useState(null);
    const [addonsError, setAddonsError] = useState(false);

    // Handle Product Quantity
    const [quantity, setQuantity] = useState(1);
    const quantityOnChange = (e) => {
        setQuantity(e.target.value);
    }

    const addQuantity = (e) => {
        setQuantity(quantity + 1);
    }

    const minusQuantity = (e) => {
        if (quantity >= 2) {
            setQuantity(quantity - 1);
        }
    }

    const AddStatusToAddonsArray = (addons) => {
        const updatedAddons = addons.map(addon => ({
            ...addon,
            status: 1,
        }));

        return updatedAddons;
    }

    const goBack = () => {
        router.back();
    }

    const generateRecordId = () => {
        if (cart.length === 0) {
            return 1;
        } else {
            const mostRecentID = cart[cart.length - 1].id;
            return mostRecentID + 1;
        }
    }

    const addToCart = () => {
        const Recordid = generateRecordId();
        const recordToAdd = {
            id: Recordid,
            product_id: productDetails.pid,
            product_name: productDetails.product_name,
            quantity: quantity,
            addons: productaddons,
            sprice: productDetails.product_price,
            tprice: productDetails.product_price * quantity,
        }

        // Updating Cart
        setCart((prevCart) => [...prevCart, recordToAdd]);
        localStorage.setItem('cart', JSON.stringify([...cart, recordToAdd]));

        // Resetting The Sessions
        localStorage.removeItem('productDetails');
        localStorage.removeItem('addons');

        router.push('/');
    }

    const initialSettings = async () => {
        const coreProductData = props.pDetail;

        // Dealing With Core Product Details
        SetProductDetails(coreProductData);
        localStorage.setItem('productDetails', JSON.stringify(coreProductData));

        // Dealing With Product Sizes
        SetProductSize(props.sizes);

        // Dealing With Product Addons
        const addons = props.addons;
        if (addons && addons.length > 1) {
            const updatedAddonsArray = await AddStatusToAddonsArray(coreProductData.addons);
            SetProductAddons(updatedAddonsArray);
            localStorage.setItem('addons', JSON.stringify(updatedAddonsArray));
        } else {
            setAddonsError(true);
        }

        localStorage.setItem('productDetailsFetchStatus', JSON.stringify(false));
    }

    useEffect(() => {
        SetProductAddons([])
        const status = JSON.parse(localStorage.getItem('productDetailsFetchStatus'));
        if (status) {
            initialSettings()
        } else {
            const coreProductDetails = JSON.parse(localStorage.getItem('productDetails'));
            SetProductDetails(coreProductDetails);

            const addonsList = JSON.parse(localStorage.getItem('addons'));
            SetProductAddons(addonsList);
        }

        // Initializing Cart State
        let cartItems = JSON.parse(localStorage.getItem("cart"));
        setCart(cartItems);

    }, []);

    return (
        <>
            <div className="px-2 flex flex-col flex-1 mt-10 lg:mt-0 pr-4 pl-6 lg:px-16">
                <div className="flex flex-col md:flex-row w-full pb-5 lg:px-5 lg:py-5 border-b border-b-gray-300 items-center">

                    <div className="product-img">
                        <img src={GlobalConfig.siteurl + 'assets/' + productDetails.product_image} alt={productDetails.product_name} className="w-40 md:w-52" height={50} width={50} />
                    </div>

                    <div className="flex flex-col product-desc p-0 lg:p-5 justify-center">

                        {/* Name and Price */}
                        <div className="flex flex-col w-full">
                            <p className="text-4xl lg:text-6xl">{productDetails.product_name}</p>
                            <p className="text-2xl lg:text-4xl font-semibold">£ {productDetails.product_price}</p>
                        </div>

                        {addonsError ? (
                            <div className="lg:mt-5">
                                This Product is Not Customisable
                            </div>
                        ) : (

                            <>
                                <div className="flex items-start mt-5 lg:items-end lg:mt-0">
                                    <div className="desc">Want to customise your {productDetails.product_name}?</div>
                                    <Link href={'/customise'} className="mx-5 px-8 py-3 bg-fuchsia-800 text-white rounded-md">Customise</Link>
                                </div>

                                <div className="grid grid-cols-2 gap-0 mt-5">
                                    {productaddons.length > 1 ? (
                                        productaddons.map((addon, index) => {
                                            return addon.status != 1 ? (
                                                addon.status === 0 ? (
                                                    <div key={index}>No {addon.addon_name}</div>
                                                ) : (
                                                    <div key={index}>Extra {addon.addon_name}</div>
                                                )
                                            ) : (
                                                ""
                                            )
                                        })
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </>


                        )}

                    </div>
                </div>

                <div className="input-group plus-minus-input flex justify-center mt-10">
                    <div className="input-group-button bg-fuchsia-800 px-5 py-1 text-md lg:text-xl flex items-center rounded-tl-md rounded-bl-md text-white">
                        <button type="button" data-quantity="minus" data-field="quantity" onClick={minusQuantity}>
                            <Minus size={25} />
                        </button>
                    </div>
                    <input
                        className="input-group-field text-2xl lg:text-4xl text-center py-3 w-1/5 border border-gray-300"
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={quantityOnChange}
                    />
                    <div className="input-group-button bg-fuchsia-800 px-5 py-1 text-md lg:text-xl flex items-center rounded-tr-md rounded-br-md text-white">
                        <button type="button" data-quantity="plus" data-field="quantity" onClick={addQuantity}>
                            <Plus size={25} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 justify-center py-4 px-5 bg-white fixed w-full bottom-0 font-semibold text-center" >
                <button className="flex items-center justify-center bg-fuchsia-800 text-white px-4 py-3 mx-2 rounded" onClick={goBack}>Cancel</button>
                <button onClick={addToCart} className="flex items-center justify-center bg-fuchsia-800 text-white px-4 py-2 mx-2 rounded">Add To Order</button>
            </div>
        </>
    )
}

export default ProductDetailTemplate