import React from 'react'
import Image from 'next/image'

// type SidebarProductProps = {
//     src: string,
//     height: number,
//     width: number,
//     altText: string,
// }

export const SidebarProduct = (props) => {
    return (
        <div className="my-2">
            <Image src={props.imgPath} className='w-12 lg:w-16' alt={props.title}
                width={props.width}
                height={props.height}
            />
        </div>
    )
}
