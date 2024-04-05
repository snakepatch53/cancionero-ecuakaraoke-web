// songs -> para obtener todas las canciones
// songs/search -> para buscar canciones
// clients -> para obtener todos los clientes
// clients/dni -> para buscar un cliente por dni
// orders -> para obtener todos los pedidos
// combo/storage-order -> para crear un pedido

const isProduction = import.meta.env.MODE == "production";
export const API_URL = isProduction
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_LOCAL;

const _API_URL = API_URL + "api/v1/";

import { fetchAdapter } from "./../services/apiConfig";

export async function getSongs(pageUrl) {
    const response = await fetchAdapter({
        resource: pageUrl ? pageUrl : _API_URL + "songs",
        // printResponse: true,
    });
    return response;
}

export async function getOrders(pageUrl) {
    const response = await fetchAdapter({
        resource: pageUrl ? pageUrl : _API_URL + "orders",
        // printResponse: true,
    });
    return response;
}

export async function showSongs(id) {
    const response = await fetchAdapter({
        resource: _API_URL + "songs/" + id,
        // printResponse: true,
    });
    return response;
}

export async function searchSongs(pageUrl, search) {
    const response = await fetchAdapter({
        resource: pageUrl ? pageUrl : _API_URL + "songs/search/" + search,
        // printResponse: true,
    });
    return response;
}

export async function storageOrder(data) {
    const response = await fetchAdapter({
        resource: _API_URL + "combo/storage-order",
        data,
        method: "POST",
    });
    return response;
}
