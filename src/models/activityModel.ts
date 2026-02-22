/* GET */
export interface Activity {
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

/* POST */
export interface RequestBody {
    fecha: string,
    hora_inicio: string,
    hora_fin: string,
    area_id: number
}

/* VALORES QUE RECIBE EL FORMULARIO */
export interface FormValues {
    date: Date;
    startTime: string;
    endTime: string;
    area: string;
}