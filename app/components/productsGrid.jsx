import React from 'react'
import ProductsGridChild from "./ProductGridChild"

const ProductsGrid = (props) => {
  return (
    <div className="flex-1 p-2 grid overflow-y-auto pl-20 pr-8 lg:pl-32 lg:pr-0">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

        {props.gridData.map((cat, index) => (
          <div key={index}>
            <ProductsGridChild imgPath={cat.image} width={500} height={500} title={cat.name} cat_id={cat.id} slug={cat.slug} sideBarStatus={true} href={props.flag === 0 ? `category/${cat.id}` : `/product/${cat.id}`} />
          </div>
        ))}

      </div>
    </div>
  )
}

export default ProductsGrid