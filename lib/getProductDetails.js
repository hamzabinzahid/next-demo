import GlobalConfig from "/app/app.config.js"

export const getProductDetails = async (pid) => {
    const res = await fetch(GlobalConfig.siteurl + `api/get-product/${pid}`, { cache: 'no-store' });
    if (!res.ok) return undefined
    return res.json()
}
