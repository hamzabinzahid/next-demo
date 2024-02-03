import React from 'react'
import { SidebarProduct } from './sidebarProduct'
import ProductsGridChild from '../ProductGridChild'

const Sidebar = (props) => {
    return (
        <div className="flex flex-col fixed">

            {props.data.map((cat, index) => (
                <div key={index}>
                    {/* <SidebarProduct imgPath={cat.image} width={500} height={500} title={cat.name} cat_id={cat.id} slug={cat.slug} altText={} /> */}
                    <ProductsGridChild imgPath={cat.image} width={500} height={500} title={cat.name} cat_id={cat.id} slug={cat.slug} sideBarStatus={false} />
                </div>
            ))}

            {/* <SidebarProduct src='/assets/images/p2.png' width={200} height={200} altText={"Sidebar Product Image"} />
            <SidebarProduct src='/assets/images/p3.png' width={200} height={200} altText={"Sidebar Product Image"} />
            <SidebarProduct src='/assets/images/p4.png' width={200} height={200} altText={"Sidebar Product Image"} />
            <SidebarProduct src='/assets/images/p5.png' width={200} height={200} altText={"Sidebar Product Image"} />
            <SidebarProduct src='/assets/images/p6.png' width={200} height={200} altText={"Sidebar Product Image"} /> */}
        </div>
    )
}

export default Sidebar