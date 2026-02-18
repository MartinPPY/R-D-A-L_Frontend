export interface Resumen {
    usuarios: number;
    cantidad_horas: number;
    cantidad_orden_compra: number;
}

export interface ResumenPago {
    user_id: number;
    usuario: string;
    monto_acumulado: number;
}