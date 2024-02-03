import GlobalConfig from "/app/app.config.js"

export const ProductsByCategory = async (catid) => {
    const res = await fetch(GlobalConfig.siteurl + `api/products-by-category/${catid}`);
    if (!res.ok) return undefined;
    return res.json()
}
