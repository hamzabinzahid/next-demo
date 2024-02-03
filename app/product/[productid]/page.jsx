import ProductDetailTemplate from "./ProductDetailTemplate"
import { getProductDetails } from '../../../lib/getProductDetails'
import { getAllProducts } from '../../../lib/getAllProducts'
import { GoBackButton } from '/app/components/goBackButton'
import { notFound } from "next/navigation"

const ProductDetails = async ({ params }) => {
    const { productid } = params;
    const data = await getProductDetails(productid)
    if (!data) notFound()

    const addons = (data.addons).length > 0 ? data.addons : [];
    const sizes = (data.sizes).length > 0 ? data.sizes : [];
    let content = <ProductDetailTemplate pDetail={data} addons={addons} sizes={sizes} />

    return (
        <>
            <GoBackButton />
            {content}
        </>
    )
}

export const generateStaticParams = async () => {
    const data = await getAllProducts();
    let productIds = [];
    for (const pid of data) {
        productIds.push({ productid: pid.id.toString() });
    }

    // return [
    //     { productid: '1' },
    //     { productid: '3' },
    //     { productid: '4' },
    //     { productid: '6' },
    //     { productid: '8' },
    //     { productid: '9' },
    //     { productid: '10' },
    //     { productid: '11' },
    //     { productid: '12' },
    //     { productid: '13' },
    //     { productid: '14' },
    //     { productid: '15' },
    //     { productid: '16' },
    //     { productid: '19' }
    // ]

    return productIds;
    return data.map((ct) => {
        { productid: ct.id.toString() }
    })
}

export default ProductDetails