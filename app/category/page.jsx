import React from 'react'
import { getAllCategories } from '../../lib/getAllCategories'
import DisplayCategoriesTemplate from './_components/DisplayCategoriesTemplate'

const ShowCategoriesPage = async () => {
    const data = await getAllCategories();
    return (
        <div>
            <DisplayCategoriesTemplate categories={data} />
        </div>
    )
}

export default ShowCategoriesPage