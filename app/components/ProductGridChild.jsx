import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GlobalConfig from "/app/app.config.js"

const ProductsGridChild = (props) => {
    // let productTitle = props.title.toLowerCase();
    return (
        <>
            {
                props.sideBarStatus ? (
                    <div className="border-none h-fit mb-9 flex justify-center" >
                        {/* <Link href={`/${props.slug}/${props.cat_id}`}> */}
                        <Link href={props.href}>
                            <div className="w-fit">
                                <div className="card-img-top flex justify-center">
                                    <Image src={GlobalConfig.siteurl + 'assets/' + props.imgPath} className="w-24 lg:w-56 object-contain" alt={"props.altText"}
                                        width={props.width}
                                        height={props.height}
                                    />
                                </div>

                                <div className="px-3">
                                    <p className="mt-1 text-center text-lg lg:text-xl md:mt-2">
                                        {props.title}
                                    </p>
                                </div>

                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className="my-2">
                        <Image src={GlobalConfig.siteurl + 'assets/' + props.imgPath} className='w-12 lg:w-16' alt={props.title}
                            width={props.width}
                            height={props.height}
                        />
                    </div>
                )
            }

            {/* if (props.sideBarStatus == 0) {
                <div className="my-2">
                    <Image src={GlobalConfig.siteurl + 'assets/' + props.imgPath} className='w-12 lg:w-16' alt={props.title}
                        width={props.width}
                        height={props.height}
                    />
                </div>
            }elseif(props.sideBarStatus == 0){
                <div className="border-none h-fit mb-9 flex justify-center" >
                    <Link href={`/${props.slug}/${props.cat_id}`}>
                        <div className="w-fit">
                            <div className="card-img-top flex justify-center">
                                <Image src={GlobalConfig.siteurl + 'assets/' + props.imgPath} className="w-24 lg:w-56 object-contain" alt={"props.altText"}
                                    width={props.width}
                                    height={props.height}
                                />
                            </div>

                            <div className="px-3">
                                <p className="mt-1 text-center text-lg lg:text-xl md:mt-2">
                                    {props.title}
                                </p>
                            </div>

                        </div>
                    </Link>
                </div>
            } */}
        </>
    )
}

export default ProductsGridChild