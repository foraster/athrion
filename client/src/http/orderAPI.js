import { $host } from ".";

export const fetchAllOrders = async () => {
    const {data} = await $host.get('api/order')
    return data
}

export const fetchOrderByUserId = async (userId) => {
    const {data} = await $host.get('api/order/user/' + userId)
    return data
}

export const fetchOneOrder = async (orderId) => {
    const {data} = await $host.get('api/order/' + orderId)
    return data
}

export const createOrder = async (userId, totalPriceCents, products) => {
    const orderId = await $host.post('api/order/create', {
    userId,
    totalPriceCents,
    products
  })
    return orderId
}

export const updateOrderStatus = async (orderId, status) => {
    const {data} = await $host.post('api/order/' + orderId, {status})
    return data;
}