import api from "./axiosService"

interface OrdenCompra{
    fecha:string;
    monto:number;
    user:number;
}

export const createOrdenCompra = async(ordenCompra:OrdenCompra)=>{
    const response = await api.post("/v1/core/orden-compra/",ordenCompra,{withCredentials:true})
    return response.data
}