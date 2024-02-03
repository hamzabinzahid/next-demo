import { ProductsByCategory } from "../../../lib/ProductsByCategory";
import CategoryProductsTemplate from "./CategoryProductsTemplate";
ProductsByCategory
import { notFound } from 'next/navigation'
import { GoBackButton } from '/app/components/goBackButton'
import { getAllCategories } from "../../../lib/getAllCategories";

const ProductFromCategory = async ({ params }) => {
    const { catid } = params
    const data = await ProductsByCategory(catid);
    if (!data) notFound()
    let content = <CategoryProductsTemplate products={data} />
    return (
        <>
            <GoBackButton />
            {content}
        </>
    )
}

export const generateStaticParams = async () => {
    const data = await getAllCategories();
    let catIds = [];
    for (const cid of data) {
        catIds.push({ catid: cid.id.toString() });
    }

    return catIds;
}

export default ProductFromCategory