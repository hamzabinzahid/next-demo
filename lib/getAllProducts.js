import React, { cache } from 'react'
import GlobalConfig from "/app/app.config.js"

export const getAllProducts = async () => {
    const res = await fetch(GlobalConfig.siteurl + `api/all-products`, { cache: 'no-store' });
    if (!res.ok) return undefined
    return res.json()
}
