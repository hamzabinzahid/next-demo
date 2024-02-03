"use client"
import { useRouter } from 'next/navigation'
import { MoveLeft } from 'lucide-react'
import React from 'react'

export const GoBackButton = () => {
    const router = useRouter();
    return (
        <div className="flex w-100 justify-end px-12 pt-10">
            <button className="flex items-center" onClick={() => { router.back() }} >
                <div className="icon px-2">
                    <MoveLeft size={15} />
                </div>
                <div className="title">go back</div>
            </button>
        </div>
    )
}
