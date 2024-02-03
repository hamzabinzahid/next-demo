"use client"
import Sidebar from "../../components/sidebar/sidebar"
import ProductsGrid from "../../components/productsGrid";
import { useEffect, useState } from "react";
import GlobalConfig from "../../app.config.js"
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

const DisplayCategoriesTemplate = (props) => {
    const [category, setCategory] = useState([]);
    const [categoryError, setCategoryError] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [totalBill, setTotalBill] = useState(0);

    const cartStateInitialization = () => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            const cartArray = [];
            localStorage.setItem('cart', JSON.stringify(cartArray));
        } else {
            const CartNow = JSON.parse(localStorage.getItem('cart'));

            // Setting the total price
            let total = 0;
            let cartCount = 0;
            for (let index = 0; index < CartNow.length; index++) {
                const element = CartNow[index];
                total += element.tprice;
                cartCount += element.quantity;
            }
            setTotalBill(total);

            // Setting the total items
            setCartCount(cartCount);
        }
    }

    const resetCart = () => {
        localStorage.removeItem("cart");
        setCartCount(0);
        setTotalBill(0);
    }

    useEffect(() => {
        setCategory(props.categories)
        cartStateInitialization();
    }, []);

    useEffect(() => {
        localStorage.setItem('ProductCategories', JSON.stringify(category));
    }, [category]);

    return (
        <>
            <div className="main-container">
                {categoryError ? (
                    <div className="flex justify-center flex-1 p-2 text-lg italic">
                        {categoryError}
                    </div>
                ) : (
                    <div>
                        <div className="px-2 flex flex-1 mt-10 lg:mt-16 pr-4 pl-6 lg:px-16 pb-32 lg:pb-40">

                            <Sidebar data={category} />
                            <ProductsGrid gridData={category} flag={0} />

                        </div>

                        <div className="flex flex-col justify-center pb-0 bg-white fixed w-full bottom-0 font-semibold text-center text-md">

                            <div className="py-2 lg:py-4 px-10 bg-fuchsia-800 text-white flex justify-between">
                                <div>My Order</div>
                                <button onClick={resetCart}>Reset Cart</button>
                            </div>

                            {/* <div className="w-full py-2 lg:py-4 px-3 bg-fuchsia-800 text-white">
              My Order
            </div> */}

                            <div className="flex flex-col lg:flex-row border border-gray-300 justify-between items-center py-2 lg:py-6 lg:px-4 m-3">
                                {/* Details */}
                                <div className="px-5 text-md lg:text-xl" style={{ fontFamily: "system-ui" }}>
                                    {/* Tax : £ 0.06 | Total : £ {totalBill} |{" "} */}
                                    Total : £ {totalBill} |{" "}
                                    <span className="uppercase ml-1">Items</span>
                                    <span className="text-3xl mx-2" style={{ fontFamily: "initial" }}>
                                        {cartCount}
                                    </span>
                                </div>

                                {/* See Order Panel */}
                                <Link href={"/cart"} className="flex mb-1 lg:mb-0 items-center">
                                    <div className="">
                                        View My Order
                                    </div>
                                    <div className="px-2">
                                        <ChevronsRight size={15} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default DisplayCategoriesTemplate