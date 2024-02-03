import GlobalConfig from "/app/app.config.js"

export const getAllCategories = async () => {
    const res = await fetch(GlobalConfig.siteurl + 'api/categories');
    if (!res.ok) return undefined;
    return res.json()
}
