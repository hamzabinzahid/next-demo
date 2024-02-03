"use client"
import { Minus, Plus } from 'lucide-react'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import GlobalConfig from '/app/app.config.js'
import Image from 'next/image';
import { GoBackButton } from '../components/goBackButton';

const CustomiseProduct = () => {

    const router = useRouter();

    // Some working is left on disable the plus minus button for product addon

    // const [addons, setAddons] = useState([]);
    const [temp, setTemp] = useState([]);
    const [addonError, setaddonError] = useState(null);

    const searchForRecord = (id) => {
        return temp.find((addon) => addon.id === id);
    }

    const updateTempState = (upr, id) => {
        const recordIndex = temp.findIndex((addon) => addon.id === id);

        setTemp((prevAddons) => {
            const updatedAddons = [...prevAddons];
            updatedAddons[recordIndex] = upr;
            return updatedAddons;
        });
    }

    const changeAddonStatus = async (id, flag) => {
        const record = await searchForRecord(id);
        if (flag == 1) {
            if (record && (record.status == 0 || record.status == 1)) {
                const st = record.status + 1;
                const updatedRecord = { ...record, status: st }
                updateTempState(updatedRecord, id);
            }
        } else {
            if (record && (record.status == 1 || record.status == 2)) {
                const st = record.status - 1;
                const updatedRecord = { ...record, status: st }
                updateTempState(updatedRecord, id);
            }
        }

        // localStorage.setItem('addons', JSON.stringify(addons));
    }

    const initializeTempState = () => {
        const storedData = localStorage.getItem('addons');
        if (storedData) {
            setTemp(JSON.parse(storedData));
        }
    };

    const goBack = () => {
        router.back();
    }

    const saveChanges = () => {
        localStorage.setItem('addons', JSON.stringify(temp));
        router.back();
    }

    useEffect(() => {
        initializeTempState();
    }, [])

    return (
        <>
            <GoBackButton />
            <div className="flex-grow px-2 flex flex-col pt-10 pr-4 pl-6 lg:px-16 lg:pb-24">

                {temp.map((ad, index) => {
                    return <div key={index} className="flex w-full py-5 lg:px-5 lg:py-4 border-b border-b-gray-100 items-center justify-between">

                        <div className="flex p-0 lg:p-5 justify-center items-center">

                            <div className="bg-fuchsia-800 px-3 py-2 text-md flex items-center text-white rounded mx-1">
                                <button type="button" data-quantity="minus" data-field="quantity" onClick={() => changeAddonStatus(ad.id, 0)}>
                                    <Minus size={20} />
                                </button>
                            </div>

                            {/* Quantity Status Button */}
                            <p className="border border-gray-400 px-6 lg:px-8 py-2 rounded mx-4 flex items-center font-semibold min-w-32 justify-center" style={{ userSelect: "none" }}>
                                {ad.status != 1 ? (
                                    ad.status == 0 ? (
                                        "No"
                                    ) : (
                                        "Extra"
                                    )
                                ) : (
                                    "Regular"
                                )}
                            </p>

                            <div className="bg-fuchsia-800 px-3 py-2 text-md flex items-center text-white rounded mx-1">
                                <button type="button" data-quantity="plus" data-field="quantity" onClick={() => changeAddonStatus(ad.id, 1)}>
                                    <Plus size={20} />
                                </button>
                            </div>

                            {/* AddOn Name */}
                            <p className="font-semibold text-base lg:text-b lg:ml-5 uppercase">{ad.addon_name}</p>
                        </div>

                        <div className="product-img">
                            <Image src={GlobalConfig.siteurl + 'assets/' + ad.addon_image} alt="" className="w-10 md:w-20" width={50} height={50} />
                        </div>

                    </div>
                })}

            </div>

            {/* Actions Buttons */}
            <div div className="grid grid-cols-2 justify-center py-4 px-5 bg-white fixed w-full bottom-0 font-semibold text-center">
                <button onClick={goBack} className="bg-fuchsia-800 text-white px-4 py-3 mx-2 rounded flex items-center justify-center">Cancel
                </button>

                <button onClick={saveChanges} className="bg-fuchsia-800 text-white px-4 py-2 mx-2 rounded flex items-center justify-center"
                >Apply Changes</button>
            </div>

            {addonError ? (
                <div className="fixed px-5 py-10 bg-slate-950 bg-opacity-60 top-0 w-full flex justify-center min-h-screen">
                    <div className="px-5 py-3 bg-red-800 w-fit h-fit text-white capitalize">
                        You have reached the maximum limit
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    )
}

export default CustomiseProduct