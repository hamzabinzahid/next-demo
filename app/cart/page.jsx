"use client"
import React, { useEffect, useState } from 'react'
import "/public/css/product-counter.css";
import { GoBackButton } from '../components/goBackButton';
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CartPage = () => {

    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [totalBill, setTotalBill] = useState(0);;

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        console.log(cartItems);
        if (cartItems) {
            setCart(cartItems);
            updateTotalBill(cartItems);
        }
    }, [])

    const updateTotalBill = (cartItems) => {
        let total = 0;
        let cartCount = 0;
        for (let index = 0; index < cartItems.length; index++) {
            const element = cartItems[index];
            total += element.tprice;
            cartCount += element.quantity;
        }
        setTotalBill(total);
    }

    const quantityOnChange = (e, id) => {
        const value = e.target.value;
        const updatedCart = cart.map(item => {
            if (item.id === id && value >= 1) {
                const newQuantity = value;
                const newPrice = newQuantity * item.sprice;
                return { ...item, quantity: newQuantity, tprice: newPrice };
            }
            return item;
        });
        setCart(updatedCart);
        updateTotalBill(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const changeQuantity = (id, flag) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && (flag === 0 ? item.quantity > 1 : true)) {
                const newQuantity = flag === 0 ? item.quantity - 1 : parseInt(item.quantity + 1);
                const newPrice = newQuantity * item.sprice;
                return { ...item, quantity: newQuantity, tprice: newPrice };
            }
            return item;
        });
        setCart(updatedCart);
        updateTotalBill(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const removeEntry = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        updateTotalBill(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    return (
        <>
            <GoBackButton />

            <div className="px-2 flex flex-col flex-1 pt-10 pr-4 pl-6 lg:px-16 pb-32 lg:pb-40">

                {/* Heading */}
                <div className="text-xl font-bold uppercase">Your Products</div>

                {/* Main Card */}
                {cart.length == 0 ? (
                    <div className='w-100 pt-20 flex flex-col items-center justify-center'>
                        <div className="text-4xl font-medium">OOPPSS</div>
                        <div className='italic'>You do not have any items in the list</div>
                    </div>
                ) : (
                    cart.slice().reverse().map((ct, index) => {
                        return <div key={index} className="w-full py-2 lg:py-4 px-5 lg:px-8 my-2 bg-white rounded shadow-sm">

                            {/* Name and Price */}
                            <div className="w-full flex justify-between border-b border-b-gray-200 py-4">
                                <div className="flex flex-col">
                                    <div>{ct.quantity}x {ct.quantity > 1 ? (ct.product_name + 's') : (ct.product_name)}</div>
                                </div>
                                <div className="mt-auto">£ {ct.tprice} </div>
                            </div>

                            {/* Addons */}
                            {ct.addons != null ? (
                                <div className="w-full grid grid-cols-1 lg:grid-col-2 border-b border-b-gray-200 py-4">
                                    <div className="grid grid-cols-2">
                                        {ct.addons.map((addon, index) => {
                                            return addon.status != 1 ? (
                                                addon.status === 0 ? (
                                                    <div key={index}>No {addon.addon_name}</div>
                                                ) : (
                                                    <div key={index}>Extra {addon.addon_name}</div>
                                                )
                                            ) : (
                                                ""
                                            )
                                        })}
                                    </div>
                                </div>
                            ) : ("")}

                            {/* Product Actions */}
                            <div className="w-full flex justify-between items-center py-4">
                                <button className="lg:mx-5 px-4 py-2 lg:px-8 lg:py-3 bg-red-700 text-white rounded-md" onClick={() => { removeEntry(ct.id) }}>Remove</button>
                                <div className="input-group plus-minus-input flex justify-center">
                                    <div className="input-group-button bg-fuchsia-800 px-3 py-0 text-sm lg:text-sm flex items-center rounded-tl-md rounded-bl-md text-white">
                                        <button type="button" data-quantity="minus" data-field="quantity" onClick={() => changeQuantity(ct.id, 0)}>
                                            <Minus size={15} />
                                        </button>
                                    </div>

                                    <input
                                        className="input-group-field  text-center py-2 border border-gray-300 w-1/4"
                                        type="number"
                                        name="quantity"
                                        value={ct.quantity}
                                        onChange={(e) => quantityOnChange(e, ct.id)}
                                    />

                                    <div className="input-group-button bg-fuchsia-800 px-3 py-0 text-sm lg:text-sm flex items-center rounded-tr-md rounded-br-md text-white">
                                        <button type="button" data-quantity="plus" data-field="quantity" onClick={() => changeQuantity(ct.id, 1)}>
                                            <Plus size={15} />
                                        </button>
                                    </div>
                                </div>
                                <a
                                    href="/addons.html"
                                    className="lg:mx-5 px-4 py-2 lg:px-8 lg:py-3 bg-green-600 text-white rounded-md"
                                >
                                    Edit
                                </a>
                            </div>
                        </div>
                    })
                )}
            </div>

            <div className="flex flex-col justify-center py-4 px-5 lg:px-12 bg-white fixed w-full bottom-0 font-semibold text-center"
                style={{
                    boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                }}>

                <div className="ml-auto px-2 pb-2 text-base">Total £ {totalBill}</div>
                <div className="grid grid-cols-2 justify-center w-full font-semibold text-center">
                    <button className="flex items-center justify-center border border-fuchsia-800 px-4 py-2 lg:py-3 mx-2 rounded" onClick={() => { router.back() }}>Back</button>

                    <a href="" className="flex items-center justify-center bg-fuchsia-800 text-white px-4 py-2 lg:py-2 mx-2 rounded">Proceed To Checkout</a>
                </div>
            </div>
        </>
    )
}

export default CartPage