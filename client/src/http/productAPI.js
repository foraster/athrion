import { $host } from ".";

export const createProduct = async (product) => {
    const {data} = await $host.post('api/product', product)
    return data
}

export const fetchProductsByCategory = async (category = null) => {
    let url = `api/product/sorted?`
    if (category) {
        url += `category=${category}`
    }
    const {data} = await $host.get(url);
    return data
}

export const fetchProducts = async () => {
    const {data} = await $host.get('api/product');
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const deleteProduct = async (id) => {
    const {data} = await $host.delete('api/product/delete/' + id)
    return data
}

export const updateProduct = async (id, product) => {
    const {data} = await $host.post('api/product/update/' + id, product)
    return data
}