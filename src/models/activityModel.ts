export interface Activity {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    area: {
        id: number;
        name: string
    };
}

/* TIPO QUE SE ESPERA EN VISTA DE ADMIN */
export interface Actividad {
    id: number;
    area: {
        id: number;
        name: string;
    };
    user: {
        id: number;
        first_name: string;
        last_name: string;
    };
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    aprobado: boolean;
}

/* VALORES PARA MANDAR AL BACKEND */
export interface FormValues {
    date: Date;
    startTime: string;
    endTime: string;
    area: string;
}

export interface RequestBody {
    fecha: string,
    hora_inicio: string,
    hora_fin: string,
    area_id: number
}

export interface ResumenMensualUser {
    horas_acumuladas: number;
    total_acumulado: number;
    horas_aprobadas: number;
}