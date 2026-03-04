import type { LucideProps } from "lucide-react";

export interface Resumen {
    title: string;
    value: string;
    description: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}


/* RESUMEN PARA ADMINISTRADOR */
export interface ResumenAdmin {
    usuarios: number;
    cantidad_horas: number;
    cantidad_orden_compra: number;
}

export interface ResumenPago {
    user_id: number;
    usuario: string;
    monto_acumulado: number;
}


/* RESUMEN PARA USUARIO */
export interface ResumenMensualUser {
    horas_acumuladas: number;
    total_acumulado: number;
    horas_aprobadas: number;
    orden_compra: number;
}
