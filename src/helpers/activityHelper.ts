export const diferenciaEntreHoras = (inicio: string, fin: string) => {

    const toSeconds = (t: string) => {
        const [h, m, s] = t.split(":").map(Number);
        return h * 3600 + m * 60 + s;
    };

    let diff = toSeconds(fin) - toSeconds(inicio);

    // si cruza medianoche
    if (diff < 0) {
        diff += 24 * 3600;
    }

    // convertir a horas y redondear
    return Math.round(diff / 3600);

}