import React from 'react'

export const metadata = {
    title: "Customer Cart - Caspian Pizza",
    description: "This is the initial phase of development",
};

const CartLayout = ({ children }) => {
    return (
        <div className='main-container min-h-screen bg-gray-100'>
            {children}
        </div>
    )
}

export default CartLayout